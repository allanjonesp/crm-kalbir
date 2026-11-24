# Kalbir CRM — piloto 0.1

Aplicação de demonstração com dados fictícios, baseada nas referências visuais e nos requisitos da operação Kalbir. Interface em português e sem dependências de execução no servidor.

**[Guia passo a passo para trabalhar no Antigravity, salvar no GitHub e atualizar o site](GUIA-GITHUB.md).**

## Executar

Com Node.js instalado, dê dois cliques em `Iniciar CRM.cmd` e acesse http://127.0.0.1:4173. Mantenha a janela aberta durante o uso. Alternativamente, abra esta pasta no Antigravity e execute `npm start`. Para validar as regras: `npm test`.

## Implementado

- Visão geral, trabalho, fila, clientes/carteiras, oportunidades, equipe, canais e histórico.
- Cadastro com os campos das fotos: nome, contato, empresa, telefone, e-mail, identificação no canal, código externo, segmentos, loja, rota, dias preferidos e observações.
- Distribuição manual e automática; prioridade da carteira, cobertura de ausência, carga, desempate e limite.
- Alteração de carteira por gestor/gerente com motivo; responsabilidade do atendimento separada da carteira.
- Notas e interações manuais, retornos, estados e resultado ao encerrar; reabertura.
- Oportunidades independentes do atendimento, valores e origem de preços informados manualmente.
- Perfis simulados e exportação JSON; persistência local no navegador.

## Limites desta entrega

Esta versão NÃO é pronta para operação com dados pessoais ou acesso compartilhado. Não há autenticação, autorização no servidor, banco compartilhado, isolamento multiempresa em produção, garantia de concorrência entre navegadores nem auditoria inviolável. A seleção de perfil é uma ferramenta de demonstração, não um login. Cada navegador tem uma cópia independente dos dados. A verificação de concorrência nesta versão limita-se ao estado da mesma sessão. O módulo de regras já carrega empresa/loja para preparar a evolução, sem alegar segurança real.

WhatsApp, Instagram, Messenger, e-mail, SMS, telefonia, IA e WinThor não estão conectados. Abrir WhatsApp/e-mail usa links externos e não envia automaticamente. Não há gravação de chamadas, importação do ERP, emissão de orçamento ou consulta de preços/estoque. Métricas contam registros locais, não mensagens reais. Os exemplos sem contato não permitem envio; dados fictícios não devem ser confundidos com clientes reais.

## Próxima etapa de produto

1. Revisar esta demonstração com a equipe e ajustar os fluxos.
2. Definir hospedagem, custos, banco e autenticação; implementar permissões e isolamento no servidor.
3. Validar concorrência entre usuários, retenção, backup/restauração, exportação e auditoria.
4. Homologar com dados controlados antes de uso operacional.
5. Conectar canais e WinThor somente quando aprovado. Preservar opção inicial de WhatsApp sem plataforma paga.

## Versão web no GitHub

O fluxo `.github/workflows/pages.yml` verifica a sintaxe e executa os testes após alterações em `main`. A publicação da pasta `dist` no GitHub Pages fica desativada até a variável de repositório `PAGES_ENABLED` ser definida como `true`. Para habilitar, configure Settings → Pages → Source → GitHub Actions e Settings → Secrets and variables → Actions → Variables → `PAGES_ENABLED=true`. A disponibilidade depende do plano e da visibilidade escolhida. Não há dependências para instalar nem segredos necessários a esse fluxo.

O site é uma demonstração e os dados são locais a cada navegador; publicá-lo não cria um serviço multiusuário. Não inserir dados pessoais reais. Não há licença de código aberto concedida neste repositório.
