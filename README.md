# Desafio Técnico QA — Automação Web + API com Playwright

Automação de 2 fluxos Web (TodoMVC) e 2 fluxos de API (GitHub REST), usando **Playwright** + **TypeScript**.

## Stack

- [Playwright Test](https://playwright.dev/) — test runner e cliente HTTP/browser
- TypeScript
- Node.js

## Pré-requisitos

- Node.js instalado (versão 18 ou superior)

Nenhuma outra dependência precisa estar previamente instalada — o restante é resolvido pelos comandos abaixo.

## Instalação

Clone o repositório e instale as dependências:

```bash
git clone https://github.com/MelissaBG/desafio-tecnico-qa.git
cd desafio-tecnico-qa
npm install
```

Instale os browsers usados pelo Playwright:

```bash
npx playwright install
```

## Rodando os testes

Rodar todos os cenários (web + API):

```bash
npx playwright test
```

Rodar apenas os testes Web (TodoMVC):

```bash
npx playwright test --project=web
```

Rodar apenas os testes de API (GitHub):

```bash
npx playwright test --project=api
```

Rodar os testes Web com o navegador visível (útil para acompanhar a execução):

```bash
npx playwright test --project=web --headed
```

## Relatório de execução

Após rodar os testes, é possível visualizar o relatório HTML com o detalhamento de cada passo:

```bash
npx playwright show-report
```

## Estrutura do projeto

```
tests/
├── web/
│   ├── todo-page.ts             # Page Object com as ações da página TodoMVC
│   ├── add-tasks.spec.ts        # W1 — adicionar tarefas e validar contador
│   └── complete-filter.spec.ts  # W2 — concluir tarefa e validar filtros
└── api/
    ├── github-service.ts        # Service Layer com as chamadas à API do GitHub
    ├── user-valid.spec.ts       # A1 — GET /users/{username} existente (200)
    └── user-invalid.spec.ts     # A2 — GET /users/{username} inexistente (404)

playwright.config.ts
tsconfig.json
```

## Cenários automatizados

### Web — TodoMVC

**W1 — Adicionar tarefas**
Adiciona duas tarefas e valida que ambas aparecem na lista e que o contador "items left" reflete a quantidade correta.

**W2 — Concluir e filtrar**
Marca uma tarefa como concluída e valida que ela aparece no filtro *Completed* e não aparece no filtro *Active*.

### API — GitHub REST

**A1 — Usuário válido**
`GET /users/octocat` — valida status `200` e a presença dos campos `login`, `id` e `public_repos` no corpo da resposta.

**A2 — Usuário inexistente**
`GET /users/{username inexistente}` — valida status `404`.

## Decisões tomadas


- **`baseURL` separado por `project`**: o `playwright.config.ts` define dois projects (`web` e `api`), cada um com seu próprio `baseURL` e `testDir`, já que web e API têm domínios e propósitos diferentes. Isso permite rodar cada suíte isoladamente (`--project=web` / `--project=api`) sem misturar configurações.
- **Locators por papel/atributo semântico**: os testes priorizam `getByPlaceholder`, `getByRole` e `getByTestId` em vez de seletores CSS, seguindo a recomendação do próprio Playwright de refletir como um usuário real identifica os elementos.
- **`page.goto('')` em vez de `page.goto('/')`**: como o `baseURL` do TodoMVC inclui um subcaminho com hash routing (`/todomvc/#/`), usar `'/'` faria o Playwright navegar para a raiz do domínio, ignorando esse subcaminho. String vazia preserva o `baseURL` completo.
- **Validação de contrato, não de snapshot**: no teste de usuário válido, os campos do corpo são validados com `toHaveProperty` (existência do campo), não com `toEqual` (valor exato), já que dados como `public_repos` podem mudar com o tempo sem que isso represente uma quebra real da API.
- **Sem autenticação na API do GitHub**: os testes usam a API pública sem token, conforme indicado no desafio. Isso está sujeito ao limite de 60 requisições/hora por IP.
- **Page Object para os testes web**: a interação com o TodoMVC (adicionar tarefa, marcar como concluída, filtrar) foi extraída para a classe `TodoPage` (`tests/web/todo-page.ts`). Os arquivos `.spec.ts` chamam métodos de negócio (`addTodo`, `completeTodo`, `filterBy`) em vez de repetir locators e ações de baixo nível — isso elimina duplicação entre W1 e W2 e centraliza qualquer mudança futura na estrutura da página em um único lugar. As asserções (`expect`) permanecem nos arquivos de teste; o Page Object só executa ações.
- **Service Layer para os testes de API**: seguindo o mesmo princípio do Page Object, a classe `GitHubService` (`tests/api/github-service.ts`) encapsula a chamada HTTP (`GET /users/{username}`) atrás de um método de negócio (`getUser`). Os specs não conhecem o endpoint diretamente — apenas pedem "o usuário X" e validam a resposta. Isso centraliza qualquer mudança de rota, header ou autenticação futura em um único lugar, em vez de espalhada por cada arquivo de teste.
- **Validação de contrato com Zod**: além de checar o status HTTP, o teste de usuário válido valida o corpo da resposta contra um schema (`GitHubUserSchema`, definido junto ao `GitHubService`) usando `GitHubUserSchema.parse(body)`. Diferente de `toHaveProperty`, que só confirma a existência de uma chave, o `.parse()` valida o **tipo** de cada campo e lança erro se algo não bater — por exemplo, se `id` deixasse de ser `number`. Isso torna o teste sensível a quebras de contrato reais da API, não só à ausência de campos.