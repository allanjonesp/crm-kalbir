# Guia do projeto no GitHub e da versão web

## Seus endereços e a pasta de trabalho

- Código e histórico: https://github.com/allanjonesp/crm-kalbir
- Testes e publicação: https://github.com/allanjonesp/crm-kalbir/actions
- Configuração da hospedagem: https://github.com/allanjonesp/crm-kalbir/settings/pages
- Pasta já conectada ao GitHub neste computador: `C:\Users\allan\Documents\Codex\2026-11-23\referenced-chatgpt-conversation-this-is-an\outputs\crm-kalbir`

O endereço da versão web será confirmado em Settings → Pages e no resultado da publicação. A simples existência do repositório não significa que o site esteja publicado.

## 1. Abrir o projeto atual no Antigravity

1. Abra o Antigravity usado para desenvolvimento.
2. Escolha **Open Folder / Abrir pasta**.
3. Selecione a pasta de trabalho indicada acima. Abra a pasta que contém `package.json`, `dist`, `tests` e este guia.
4. Não crie outro repositório e não use **Publish to GitHub** novamente: esta pasta já tem o destino `origin` configurado para `allanjonesp/crm-kalbir`.

O **Git** registra versões no computador; o **GitHub** guarda as versões enviadas pela internet. Salvar um arquivo no editor não o envia automaticamente ao GitHub.

## 2. Fazer alterações e salvar no GitHub

### Pelo painel do Antigravity

1. Antes de começar, use **Pull / Obter** se não houver alterações locais pendentes. Isso traz atualizações feitas em outro computador ou pelo navegador.
2. Faça as alterações e salve os arquivos com **Ctrl+S**.
3. Abra **Source Control / Controle de código-fonte**, normalmente o ícone de ramificação na barra lateral ou **Ctrl+Shift+G**.
4. Confira a lista de arquivos alterados e abra a comparação de cada mudança.
5. Execute os testes antes de enviar.
6. Adicione ao commit apenas os arquivos do projeto que pretende salvar, usando o **+** ao lado dos arquivos quando disponível.
7. Escreva uma mensagem curta, por exemplo: `Melhora filtros da carteira de clientes`.
8. Use **Commit / Confirmar** para registrar a versão local.
9. Use **Push / Enviar** para salvar no GitHub. Algumas versões oferecem **Sync Changes / Sincronizar alterações**, que também pode trazer atualizações remotas: confira a mensagem apresentada antes de confirmar.
10. No repositório, confirme que a mensagem da nova versão aparece no histórico de commits.

Se aparecer a tela de login ou de confirmação do GitHub, faça a autenticação pessoalmente. Não cole senha, código de e-mail ou chave de acesso no chat, em arquivos do projeto ou em mensagens de commit.

### Pelo terminal do projeto

Use estes comandos dentro da pasta do projeto. O terminal integrado do Antigravity normalmente já abre nessa pasta; confira antes.

```text
git status
git pull --ff-only origin main
npm test
git add dist README.md GUIA-GITHUB.md VALIDACAO.md tests package.json server.mjs .gitignore .github
git commit -m "Descreva aqui a melhoria realizada"
git push origin main
```

O `git add` acima lista caminhos conhecidos; revise a saída de `git status` e inclua outros arquivos de código que você tenha criado, se necessário. Não digite comandos de publicação se estiver apenas testando uma ideia que ainda não deseja enviar.

`git pull --ff-only` deve ser feito antes de editar. Se avisar sobre alterações locais ou divergência de histórico, preserve seus arquivos e peça ajuda para conciliar as versões. Não use `git reset --hard`, `git clean` ou envio forçado como tentativa de resolver.

## 3. Testar no computador

Para testar regras e validar o JavaScript:

```text
node --check dist/app.mjs
npm test
```

Para abrir o piloto:

```text
npm start
```

Abra http://127.0.0.1:4173 no navegador. Mantenha o terminal aberto enquanto usa a versão local. **Ctrl+C** encerra o servidor. No Windows, também pode abrir `Iniciar CRM.cmd` e seguir a orientação exibida.

Não é necessário executar `npm install` nesta versão: não há dependências de execução ou de teste para baixar. Node.js e Git precisam estar instalados.

## 4. Atualizar a versão web

A publicação usa o GitHub Pages e precisa estar habilitada uma vez:

1. O repositório deve ter visibilidade e plano compatíveis com Pages. O proprietário autorizou tornar este piloto público para publicação gratuita.
2. Em **Settings → Pages**, selecione **GitHub Actions** como origem.
3. Em **Settings → Secrets and variables → Actions → Variables**, crie a variável de repositório `PAGES_ENABLED` com o valor `true`. Isso é uma chave de configuração pública, não uma senha.
4. Em **Actions → Validar e publicar CRM**, execute **Run workflow** na branch `main`, ou envie uma alteração para `main`.
5. Aguarde os trabalhos **validate** e **deploy** terminarem com sucesso.
6. Abra o endereço exibido na publicação e confira a mudança feita.

Depois de configurado, cada envio para `main` inicia os testes e a publicação. Se os testes falharem, a nova versão não é publicada. Um commit salvo no GitHub não comprova que o site foi atualizado: confira **Actions**.

Criar ou mudar `PAGES_ENABLED` sozinho não dispara uma execução; é necessário usar **Run workflow** ou enviar um commit.

## 5. Abrir em outro computador

No Antigravity, escolha **Clone Repository**, informe `https://github.com/allanjonesp/crm-kalbir.git`, escolha uma pasta e abra o projeto clonado.

Alternativa no terminal, dentro da pasta onde deseja guardar seus projetos:

```text
git clone https://github.com/allanjonesp/crm-kalbir.git
cd crm-kalbir
npm test
npm start
```

Não clone dentro da pasta atual do projeto. Cada computador terá sua própria cópia; traga atualizações antes de começar e envie suas alterações ao terminar.

## 6. Consultar e recuperar versões

O histórico está em **Code → Commits**. Abra um commit para ver o que mudou. Para desfazer uma alteração já enviada, prefira criar uma reversão com orientação, preservando o histórico, em vez de apagar commits ou forçar um envio.

**Code → Download ZIP** baixa uma cópia, mas ela não tem a conexão Git nem o histórico local. Para continuar desenvolvendo e enviando alterações, prefira **Clone Repository**.

## 7. O que está salvo e o que não está

O GitHub guarda o código, os testes e a documentação enviados em commits. Os dados digitados no piloto ficam no navegador e não são sincronizados com o GitHub, com outros dispositivos ou entre vendedoras. A exportação JSON do piloto é separada do código.

Não envie clientes reais, planilhas comerciais, backups de atendimento, arquivos `.env`, tokens, senhas ou chaves de integração para o repositório público. A pasta `.openai` é ignorada e não participa da publicação pelo GitHub Pages. Não há credenciais de Meta, ERP ou IA neste projeto.

## 8. Limites do piloto web

Publicar o site disponibiliza a interface de demonstração. Isso ainda não implanta autenticação real, banco compartilhado, isolamento multiempresa, atendimento automático dos canais ou conexão ao WinThor. O seletor de perfil é uma simulação. Use somente dados fictícios até a etapa de backend e segurança ser implementada e validada.

## Referências oficiais

- [Enviar alterações ao GitHub](https://docs.github.com/en/get-started/using-git/pushing-commits-to-a-remote-repository)
- [Clonar repositório](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository)
- [GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site)
