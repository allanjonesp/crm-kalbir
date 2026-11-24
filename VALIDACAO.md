# Validação do piloto — 24/11/2026

## Regras de negócio

Sete testes automatizados passaram: prioridade da carteira e cobertura sem transferência; carga, desempate e limite; rejeição de segunda retirada na mesma sessão; controle de alteração de carteira com motivo e histórico; rejeição de atribuição fora de empresa/loja; contato alternativo e duplicidade normalizada; contagem de estados de espera na carga.

Esses testes verificam o módulo local de regras. Não comprovam segurança de produção, concorrência entre navegadores ou isolamento real de um banco.

## Verificação no navegador

Chrome local: dashboard e navegação renderizados; cadastro fictício por Instagram sem telefone salvo; cancelamento de novo cadastro sem salvar; três atendimentos distribuídos automaticamente; simulação de vendedora com opções de gestão ocultas; alteração da própria disponibilidade para almoço e de volta para disponível; encerramento sem resultado rejeitado e encerramento com resultado e nota aceito; funil permaneceu independente do atendimento encerrado. Lista de clientes e navegação conferidas em viewport de 390 × 844, sem overflow horizontal da página; a tabela tem rolagem própria. Alterações persistiram após recarregar a página.

## Integrações e publicação

Nenhuma conexão de canal, IA, ERP ou banco criada. Código salvo no repositório privado https://github.com/allanjonesp/crm-kalbir. A validação automática da versão 5f5360c passou no GitHub Actions. A conta atual exige upgrade ou repositório público para habilitar GitHub Pages. Publicação permanece desativada e aguarda escolha de visibilidade/hospedagem; nenhum endereço web foi publicado.

## Limites operacionais

Usar somente dados fictícios. Persistência por navegador, sem contas reais, dados compartilhados ou proteção de acesso pelo seletor de perfil. Fonte pronta para abrir no Antigravity e vinculada ao GitHub. Backend e versão web permanecem pendentes.
