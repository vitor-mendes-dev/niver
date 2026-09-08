# GUIA DE INSTALAÇÃO E DEPLOY

## ✅ Conversão completa para SPA!

O projeto foi convertido de TanStack Start (SSR) para React SPA puro, compatível com GitHub Pages.

## 🚀 Próximos passos

### 1. Reinstalar as dependências

```bash
# Apagar node_modules e package-lock.json antigos
rm -rf node_modules package-lock.json

# Instalar novas dependências
npm install
```

### 2. Testar localmente

```bash
npm run dev
```

Abra `http://localhost:8080` no navegador para ver o convite funcionando.

### 3. Preparar repositório Git

Se ainda não tem um repositório Git:

```bash
git init
git add .
git commit -m "Convite de aniversário - versão SPA"
```

### 4. Criar repositório no GitHub

1. Vá em https://github.com/new
2. Dê um nome ao repositório (ex: `convite-niver`)
3. Deixe como **público** (necessário para GitHub Pages gratuito)
4. NÃO inicialize com README (você já tem)
5. Clique em "Create repository"

### 5. Conectar e fazer push

```bash
# Substitua SEU-USUARIO e SEU-REPO pelos seus dados
git remote add origin https://github.com/SEU-USUARIO/SEU-REPO.git
git branch -M main
git push -u origin main
```

### 6. Ativar GitHub Pages

1. Vá em `Settings` > `Pages` do seu repositório
2. Em "Build and deployment":
   - Source: **GitHub Actions**
3. Salve

### 7. Ajustar base URL (se necessário)

**IMPORTANTE:** Se o seu repositório NÃO for `usuario.github.io`:

1. Edite `vite.config.ts`
2. Encontre a linha: `base: "./",`
3. Substitua por: `base: "/nome-do-seu-repo/",`
4. Exemplo: se o repo é `convite-niver`, use `base: "/convite-niver/",`
5. Commit e push:

```bash
git add vite.config.ts
git commit -m "Ajustar base URL para GitHub Pages"
git push
```

### 8. Deploy automático

Após o push, o GitHub Actions irá automaticamente:
- Fazer build do projeto
- Deploy no GitHub Pages

Aguarde 1-2 minutos e acesse:
- `https://SEU-USUARIO.github.io/SEU-REPO/`

## 📋 Checklist rápido

- [ ] `npm install` executado com sucesso
- [ ] `npm run dev` funciona localmente
- [ ] Repositório criado no GitHub
- [ ] Push feito para o GitHub
- [ ] GitHub Pages ativado (source: GitHub Actions)
- [ ] base URL ajustado no vite.config.ts (se não for usuario.github.io)
- [ ] Site acessível no GitHub Pages

## 🐛 Problemas comuns

### "Page not found" após deploy
- Verifique se GitHub Pages está ativado
- Confirme que escolheu "GitHub Actions" como source
- Aguarde alguns minutos e tente novamente

### CSS ou imagens não carregam (404)
- Ajuste o `base` no `vite.config.ts` com o nome do seu repo
- Faça commit e push novamente

### Build falha no GitHub Actions
- Execute `npm run build` localmente para ver o erro
- Verifique se não há erros de TypeScript: `npm run typecheck`

## 📁 O que foi removido

Para compatibilidade com GitHub Pages, foram removidos:
- ❌ TanStack Start (SSR)
- ❌ TanStack Router
- ❌ Autenticação
- ❌ Banco de dados
- ❌ Server functions
- ❌ Dependências Nitro/Vercel

## ✨ O que foi mantido

- ✅ Todo o visual do convite (InvitationApp)
- ✅ React 19
- ✅ Tailwind CSS
- ✅ Componentes Radix UI
- ✅ Animações e interatividade
- ✅ TypeScript

## 💡 Dicas

- O site será 100% estático (roda no navegador)
- Pode demorar alguns minutos para o primeiro deploy
- Cada push na branch `main` dispara deploy automático
- Você pode ver o progresso em "Actions" no GitHub

Pronto para começar! 🎉
