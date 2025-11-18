# Catálogo de Carros

Listagem de carros, onde ao clicar no card consigo ver detalhes e preencher um formulário de contato.

## Tecnologias

- React 19.2.0
- TypeScript 5.9.3
- Vite 7.2.2
- Tailwind CSS 4.1.17
- React Router DOM 7.9.6
- TanStack Query 5.90.2
- Zustand 5.0.8
- React Hook Form 7.66.1
- Zod 4.1.12

## Estrutura do Projeto

```
src/
├── assets/          # Estilos globais e assets
├── core/            # Componentes e lógica compartilhada
│   ├── components/  # Componentes UI reutilizáveis
│   ├── contexts/    # Contextos globais
│   ├── lib/         # Configurações de bibliotecas
│   ├── types/       # Tipos TypeScript globais
│   └── utils/       # Funções utilitárias
├── domain/          # Domínios de negócio
├── layouts/         # Layouts de página
├── pages/           # Páginas da aplicação
└── router/          # Configuração de rotas
```

## Instalação

```bash
npm install
```

## Configuração

1. Copie o arquivo `.env.example` para `.env`:
```bash
cp .env.example .env
```

2. Configure as variáveis de ambiente no arquivo `.env`

## Desenvolvimento

```bash
npm run dev
```

Acesse http://localhost:5173

## Build

```bash
npm run build
```

## Preview

```bash
npm run preview
```

## Lint

```bash
npm run lint
```

## Funcionalidades

- **Listagem de carros**: Exibição de todos os veículos disponíveis no catálogo
- **Detalhes do veículo**: Visualização completa das informações do carro
- **Formulário de contato**: Manifestação de interesse e contato com a empresa

## Padrões de Código

- Componentes funcionais com TypeScript
- Hooks personalizados para lógica reutilizável
- Tailwind CSS para estilização
- Path mapping com `@/` para imports
- Validação com Zod
- Gerenciamento de estado com Zustand
- Server state com TanStack Query