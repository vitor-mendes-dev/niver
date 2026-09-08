# Convite de Aniversário 🎉

Projeto de convite interativo para aniversário, desenvolvido com React, Vite e Tailwind CSS.

## 🚀 Como rodar localmente

### Pré-requisitos
- Node.js versão 20 ou superior
- npm ou yarn

### Instalação e execução

1. Clone o repositório:
```bash
git clone https://github.com/SEU-USUARIO/SEU-REPOSITORIO.git
cd SEU-REPOSITORIO
```

2. Instale as dependências:
```bash
npm install
```

3. Execute o servidor de desenvolvimento:
```bash
npm run dev
```

4. Abra o navegador em `http://localhost:8080`

## 📦 Build para produção

Para criar a versão otimizada para produção:

```bash
npm run build
```

Os arquivos serão gerados na pasta `dist/`.

## 🌐 Deploy no GitHub Pages

### Configuração inicial (apenas uma vez)

1. **Ative o GitHub Pages no seu repositório:**
   - Vá em `Settings` > `Pages`
   - Em "Source", selecione `GitHub Actions`
   - Salve as configurações

2. **Ajuste a base URL (se necessário):**
   - Se o seu repositório não for `usuario.github.io`, edite `vite.config.ts`
   - Mude `base: "./"` para `base: "/nome-do-repositorio/"`
   - Exemplo: `base: "/niver/"`

### Deploy automático

Após a configuração inicial, o deploy é automático:

1. Faça suas alterações no código
2. Commit e push para a branch `main`:
```bash
git add .
git commit -m "Sua mensagem"
git push origin main
```

3. O GitHub Actions irá automaticamente:
   - Instalar as dependências
   - Fazer o build do projeto
   - Fazer deploy no GitHub Pages

4. Acesse seu site em:
   - `https://SEU-USUARIO.github.io/NOME-DO-REPO/`

### Deploy manual

Você também pode fazer deploy manual através do GitHub:
- Vá em `Actions` no seu repositório
- Selecione o workflow "Deploy to GitHub Pages"
- Clique em "Run workflow"

## 🛠️ Scripts disponíveis

- `npm run dev` - Inicia servidor de desenvolvimento
- `npm run build` - Cria build de produção
- `npm run preview` - Preview do build de produção localmente
- `npm run typecheck` - Verifica tipos TypeScript
- `npm run lint` - Executa o linter
- `npm run format` - Formata o código com Prettier

## 📁 Estrutura do projeto

```
niver/
├── src/
│   ├── components/        # Componentes React
│   │   └── invitation/    # Componentes do convite
│   ├── App.tsx           # Componente principal
│   ├── main.tsx          # Entry point
│   └── styles.css        # Estilos globais
├── public/               # Arquivos estáticos
├── index.html           # HTML base
├── vite.config.ts       # Configuração do Vite
└── package.json         # Dependências

```

## 🎨 Tecnologias utilizadas

- **React 19** - Biblioteca UI
- **Vite** - Build tool e dev server
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Framework CSS utilitário
- **Radix UI** - Componentes acessíveis
- **Lucide React** - Ícones

## 📝 Notas importantes

- O projeto foi convertido de TanStack Start (SSR) para SPA puro para compatibilidade com GitHub Pages
- Não há funcionalidades server-side ou banco de dados
- Todo o conteúdo é estático e roda no navegador do cliente

## 🐛 Problemas comuns

### O site não aparece após o deploy
- Verifique se o GitHub Pages está ativado nas configurações
- Confirme que a branch e o source estão corretos
- Aguarde alguns minutos após o primeiro deploy

### Recursos não carregam (404)
- Verifique a configuração `base` no `vite.config.ts`
- Se seu repo não é `usuario.github.io`, use `base: "/nome-do-repo/"`

### Erro ao fazer build
- Certifique-se de que todas as dependências estão instaladas: `npm install`
- Execute `npm run typecheck` para verificar erros de tipo

## 📄 Licença

Este projeto é privado e de uso pessoal.
