export const CHANNELS=['WhatsApp','Instagram Direct','Messenger','E-mail','SMS','Telefone'];
export const SEGMENTS=['Açaiteria','Churrascaria','Comércio','Confeitaria','Consumidor final','Conveniência','Cozinha industrial','Distribuidora','Frios','Indústria','Lanchonete','Licitação','Limpeza','Mercantil','Mercearia','Padaria','Panificação','Pizzaria','Ração','Sorveteria','Sushi'];
export const STAGES=['Qualificação','Necessidade','Preparação de orçamento','Negociação','Aguardando confirmação','Ganho','Perdido'];
export const OPEN=['Em atendimento','Aguardando cliente','Aguardando ação interna'];
export const canManage=u=>['gestor','gerente'].includes(u.role);
export const inScope=(u,x)=>u.tenantId===x.tenantId&&(u.role==='gestor'||u.storeId===x.storeId);
export const load=(s,id)=>s.tickets.filter(t=>t.assigneeId===id&&OPEN.includes(t.status)).length;
export function chooseAgent(s,client,now=Date.now()){
 const pool=s.users.filter(u=>u.tenantId===client.tenantId&&u.storeId===client.storeId&&u.role==='vendedora'&&u.availability==='Disponível'&&load(s,u.id)<u.capacity);
 const owner=pool.find(u=>u.id===client.ownerId); if(owner)return owner;
 return pool.sort((a,b)=>load(s,a.id)-load(s,b.id)||(a.lastAssigned||0)-(b.lastAssigned||0)||a.id.localeCompare(b.id))[0]||null;
}
export function assign(s,ticketId,userId,actor,reason='Distribuição'){
 const t=s.tickets.find(t=>t.id===ticketId);const u=s.users.find(u=>u.id===userId);
 if(!t||!u||!inScope(actor,t))throw Error('Atendimento fora do seu acesso.');
 if(!canManage(actor)&&(t.status!=='Em fila'||actor.id!==userId))throw Error('Somente a gestão pode transferir atendimentos.');
 if(u.role!=='vendedora'||u.tenantId!==t.tenantId||u.storeId!==t.storeId||u.availability!=='Disponível')throw Error('Selecione uma vendedora disponível da loja.');
 if(t.assigneeId===userId)throw Error('Atendimento já atribuído a esta pessoa.');
 if(load(s,userId)>=u.capacity)throw Error('A vendedora atingiu o limite de atendimentos.');
 t.assigneeId=userId;t.status='Em atendimento';t.updatedAt=Date.now();u.lastAssigned=Date.now();
 audit(s,actor,reason,`${t.id} → ${u.name}`);return t;
}
export function claim(s,ticketId,actor){const t=s.tickets.find(t=>t.id===ticketId);if(!t||t.status!=='Em fila'||t.assigneeId)throw Error('Este atendimento já saiu da fila.');return assign(s,ticketId,actor.id,actor,'Atendimento puxado');}
export function changeOwner(s,clientId,ownerId,actor,reason){
 const c=s.clients.find(c=>c.id===clientId);if(!c||!inScope(actor,c)||!canManage(actor))throw Error('Você não pode alterar esta carteira.');
 if(!reason?.trim())throw Error('Informe o motivo da alteração.');
 const owner=s.users.find(u=>u.id===ownerId);if(ownerId&&(!owner||owner.role!=='vendedora'||!inScope(actor,owner)||owner.storeId!==c.storeId))throw Error('Responsável inválida.');
 c.ownerId=ownerId||'';audit(s,actor,'Carteira alterada',`${c.name}: ${owner?.name||'Sem responsável'} — ${reason.trim()}`);
}
export function validateClient(c){
 if(!c.name?.trim())throw Error('Informe o nome.');
 if(!c.phone?.trim()&&!c.email?.trim()&&!c.handle?.trim())throw Error('Informe telefone, e-mail ou identificação no canal.');
 if(c.email&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(c.email))throw Error('Confira o e-mail informado.');
 if(c.phone&&normalizePhone(c.phone).length<10)throw Error('Informe telefone com DDD.');
 if(!CHANNELS.includes(c.channel))throw Error('Canal inválido.');
}
export function normalizePhone(p){let n=(p||'').replace(/\D/g,'');if(n.length===10||n.length===11)n='55'+n;return n;}
export function duplicates(s,c){const p=normalizePhone(c.phone);return s.clients.filter(x=>x.tenantId===c.tenantId&&x.id!==c.id&&((p&&normalizePhone(x.phone)===p)||(c.email&&x.email?.toLowerCase()===c.email.toLowerCase())||(c.handle&&x.channel===c.channel&&x.handle?.toLowerCase()===c.handle.toLowerCase())));}
export function audit(s,actor,action,detail){s.audit.unshift({id:crypto.randomUUID(),tenantId:actor.tenantId,storeId:actor.storeId,actor:actor.name,action,detail,at:Date.now()});}
export function seed(){
 const now=Date.now(),tenantId='kalbir',storeId='loja-1';
 const base={tenantId,storeId};
 const clients=[
 ['c1','Padaria Aurora','Marina Alves','Padaria','v1','WhatsApp'],['c2','Mercadinho Boa Praça','Pedro Lima','Mercearia','v2','Telefone'],['c3','Pizzaria Forno da Vila','Clara Souza','Pizzaria','v1','Instagram Direct'],['c4','Confeitaria Doce Encontro','Rita Costa','Confeitaria','','WhatsApp'],['c5','Restaurante Jardim','Caio Melo','Cozinha industrial','v2','E-mail'],['c6','Açaí Estação','Bia Rocha','Açaiteria','','Messenger'],['c7','Empório do Bairro','Daniel Reis','Comércio','v1','SMS'],['c8','Sorveteria Brisa','Lia Dias','Sorveteria','','WhatsApp']
 ].map((a,i)=>({...base,id:a[0],name:a[1],contact:a[2],segments:[a[3]],ownerId:a[4],channel:a[5],phone:'',email:a[5]==='E-mail'?'compras@example.com':'',handle:['Instagram Direct','Messenger'].includes(a[5])?'@cliente_exemplo_'+(i+1):'',status:i<3?'Cliente ativo':'Novo',externalCode:'',company:a[1],route:'',days:[],notes:'Cadastro fictício para avaliação do piloto.',origin:i%2?'Cadastro manual':'Redes sociais',doNotContact:false,createdAt:now-86400000*(i+1)}));
 return {version:1,users:[{...base,id:'g1',name:'Allan',role:'gestor',availability:'Disponível',capacity:0},{...base,id:'m1',name:'Gerente da loja',role:'gerente',availability:'Disponível',capacity:0},{...base,id:'v1',name:'Vendedora 01',role:'vendedora',availability:'Disponível',capacity:5,lastAssigned:now-3600000},{...base,id:'v2',name:'Vendedora 02',role:'vendedora',availability:'Disponível',capacity:5,lastAssigned:now-7200000}],clients,
 tickets:[['t101','c1','Em atendimento','v1','Reposição de embalagens',90],['t102','c2','Aguardando cliente','v2','Confirmar quantidades do pedido',70],['t103','c3','Aguardando ação interna','v1','Consultar preço atualizado',45],['t104','c4','Em fila','','Primeiro contato: linha de confeitaria',32],['t105','c5','Em atendimento','v2','Preparar proposta de reposição',20],['t106','c6','Em fila','','Informações sobre compra no atacado',14],['t107','c8','Em fila','','Cotação de descartáveis',8]].map(a=>({...base,id:a[0],clientId:a[1],status:a[2],assigneeId:a[3],subject:a[4],priority:a[1]==='c4'?'Alta':'Normal',createdAt:now-a[5]*60000,updatedAt:now-a[5]*60000,nextAt:'',nextAction:'',result:'',activities:[]})),
 opportunities:[['o1','c1','Reposição semanal','Negociação',2450,'v1'],['o2','c3','Embalagens para delivery','Preparação de orçamento',1680,'v1'],['o3','c5','Abastecimento mensal','Qualificação',4200,'v2'],['o4','c2','Itens de mercearia','Aguardando confirmação',980,'v2']].map(a=>({...base,id:a[0],clientId:a[1],title:a[2],stage:a[3],value:a[4],ownerId:a[5],nextAction:'Confirmar necessidade e condições',nextAt:'',priceSource:'Estimativa demonstrativa — sem consulta ao ERP'})),audit:[]};
}
