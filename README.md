# 📋 TaskFlow - Sistema de Gestão de Projetos

<div align="center">

![TaskFlow Logo](https://img.shields.io/badge/TaskFlow-Sistema%20Empresarial-purple?style=for-the-badge)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)
![Tailwind](https://img.shields.io/badge/Tailwind-v4-38B2AC?style=for-the-badge&logo=tailwind-css)

**Plataforma completa para organização de tarefas, acompanhamento de projetos e gestão de equipes**

[Demo](#) • [Documentação](#funcionalidades) • [Instalação](#instalação)

</div>

---

## 🎯 Sobre o Projeto

TaskFlow é um sistema de gerenciamento de projetos estilo Kanban, desenvolvido com foco em **produtividade empresarial** e **experiência do usuário**. Oferece uma interface moderna, intuitiva e totalmente responsiva para organizar tarefas e acompanhar o progresso de projetos.

### ✨ Destaques

- 🎨 **Design Corporativo** - Interface profissional e minimalista
- 🌓 **Dark Mode** - Tema escuro/claro com persistência
- 🎯 **Sistema de Prioridades** - 4 níveis com indicadores visuais
- 📅 **Datas de Vencimento** - Controle de prazos com alertas
- 🔄 **Drag & Drop** - Reorganize tarefas facilmente
- 💾 **Persistência Local** - Dados salvos no navegador
- 📱 **Totalmente Responsivo** - Funciona em todos os dispositivos
- ⚡ **Alta Performance** - Otimizado com React 19

---

## 🚀 Funcionalidades

### 📊 Dashboard
- Visão geral de todos os projetos
- Estatísticas em tempo real (quadros, tarefas, conclusões)
- Busca rápida de projetos
- Cards informativos com métricas

### 📋 Boards (Quadros)
- Criação ilimitada de quadros
- Listas customizáveis (To Do, Doing, Done, etc)
- Arrastar e soltar tarefas entre listas
- Edição inline de títulos

### ✅ Tarefas
- **Título e descrição** detalhada
- **Prioridades visuais:**
  - 🔴 Alta (vermelho)
  - 🟡 Média (amarelo)
  - 🟢 Baixa (verde)
  - ⚪ Nenhuma (cinza)
- **Datas de vencimento** com status:
  - 🔴 Atrasada
  - 🟡 Vence hoje/amanhã
  - 🟢 No prazo
- Edição completa via modal
- Timestamps de criação/atualização

### 🎨 Interface
- Design corporativo e profissional
- Animações suaves com Framer Motion
- Ícones Lucide React
- Modo escuro com transições elegantes
- Feedback visual em todas as ações

---

## 🛠️ Tecnologias

### Core
- **[React 19](https://react.dev/)** - Biblioteca UI
- **[TypeScript](https://www.typescriptlang.org/)** - Tipagem estática
- **[Vite](https://vitejs.dev/)** - Build tool ultrarrápido

### Estado & Roteamento
- **[Zustand](https://zustand-demo.pmnd.rs/)** - Gerenciamento de estado
- **[React Router DOM](https://reactrouter.com/)** - Navegação SPA

### Estilização
- **[Tailwind CSS v4](https://tailwindcss.com/)** - Framework CSS utility-first
- **[Framer Motion](https://www.framer.com/motion/)** - Animações

### Drag & Drop
- **[@dnd-kit](https://dndkit.com/)** - Sistema moderno de drag and drop

### Ícones & UI
- **[Lucide React](https://lucide.dev/)** - Ícones modernos

---

## 📦 Instalação

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn

### Passo a passo

1. **Clone o repositório**
```bash
git clone https://github.com/JezzXL/taskflow.git
cd taskflow
```

2. **Instale as dependências**
```bash
npm install
```

3. **Inicie o servidor de desenvolvimento**
```bash
npm run dev
```

4. **Acesse no navegador**
```
http://localhost:5173
```

### Scripts disponíveis

```bash
npm run dev          # Inicia servidor de desenvolvimento
npm run build        # Build para produção
npm run preview      # Preview da build de produção
npm run lint         # Executa linter
```

---

## 📁 Estrutura do Projeto

```
taskflow/
├── src/
│   ├── assets/              # Imagens e recursos estáticos
│   ├── components/          # Componentes reutilizáveis
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Modal.tsx
│   │   └── ThemeProvider.tsx
│   ├── features/            # Features por domínio
│   │   ├── boards/
│   │   │   └── BoardList.tsx
│   │   └── tasks/
│   │       └── TaskCard.tsx
│   ├── pages/               # Páginas da aplicação
│   │   ├── Login.tsx
│   │   ├── Dashboard.tsx
│   │   └── Board.tsx
│   ├── store/               # Zustand store
│   │   └── useStore.ts
│   ├── types/               # TypeScript types
│   │   └── index.ts
│   ├── utils/               # Funções auxiliares
│   │   ├── helpers.ts
│   │   └── dateHelpers.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── public/
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

## 🎨 Design System

### Paleta de Cores

```css
/* Light Mode */
Background: #F8FAFC
Cards: #FFFFFF
Text: #1F2937
Accent: #334155

/* Dark Mode */
Background: #0F172A
Cards: #1E293B
Text: #F8FAFC
Accent: #64748B

/* Prioridades */
Alta: #DC2626 (Red)
Média: #EAB308 (Yellow)
Baixa: #16A34A (Green)
```

### Typography
- **Font Family:** Inter
- **Weights:** 300, 400, 500, 600, 700, 800, 900

---

## 💾 Persistência de Dados

Os dados são salvos automaticamente no **localStorage** do navegador:

```javascript
// Chaves utilizadas
'taskflow-data'   // Boards, listas e tarefas
'taskflow-user'   // Dados do usuário
'taskflow-theme'  // Preferência de tema
```

### Migração de Dados

O sistema possui migração automática que:
- Adiciona campos novos em tarefas antigas
- Converte datas para objetos Date
- Define valores padrão para prioridade

---

## 🔐 Autenticação

⚠️ **Nota:** A autenticação atual é **simplificada** para demonstração.

Para ambiente de produção, recomenda-se implementar:
- JWT Tokens
- Backend com API REST
- Hash de senhas (bcrypt)
- Refresh tokens
- OAuth 2.0 (Google, GitHub, etc)

---

## 🌐 Deploy

### Vercel (Recomendado)

```bash
npm install -g vercel
vercel
```

### Netlify

```bash
npm run build
# Faça upload da pasta dist/
```

### Outras opções
- GitHub Pages
- Railway
- Render
- AWS S3 + CloudFront

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Siga os passos:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'feat: adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

### Padrões de Commit

Seguimos [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: nova funcionalidade
fix: correção de bug
docs: documentação
style: formatação
refactor: refatoração
test: testes
chore: manutenção
```

---

## 📝 Licença

Este projeto está sob a licença **MIT**. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 👨‍💻 Autor

Desenvolvido com 💜 por **Davyd Willian**

- GitHub: [@JezzXL](https://github.com/JezzXL)
- LinkedIn: [Davyd Willian](https://www.linkedin.com/in/davydwillianp/)
- Email: davydsantos.gt@gmail.com

---

## 🙏 Agradecimentos

- [React Team](https://react.dev/) - Pela incrível biblioteca
- [Tailwind Labs](https://tailwindcss.com/) - Pelo framework CSS
- [Lucide](https://lucide.dev/) - Pelos ícones lindos
- [dnd-kit](https://dndkit.com/) - Pelo sistema de drag and drop

---

## 📸 Screenshots

### Login
![Login](./screenshots/login.png)

### Dashboard
![Dashboard](./screenshots/dashboard.png)

### Board
![Board](./screenshots/board.png)

### Dark Mode
![Dark Mode](./screenshots/dark-mode.png)

---

## 🗺️ Roadmap

- [ ] Sistema de comentários nas tarefas
- [ ] Tags/labels personalizadas
- [ ] Busca global avançada
- [ ] Gráficos e métricas de produtividade
- [ ] Notificações de tarefas
- [ ] Sistema de anexos
- [ ] Modo colaborativo multi-usuário
- [ ] API Backend
- [ ] Aplicativo mobile
- [ ] Integrações (Slack, Discord, etc)

---

<div align="center">

**⭐ Se este projeto foi útil, considere dar uma estrela!**

Feito com ❤️ e ☕

</div>