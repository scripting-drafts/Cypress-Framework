# Cypress TypeScript Framework for demoqa

A Cypress framework (TypeScript) targeted at testing https://demoqa.com.  
Includes example end-to-end tests, a simple Page Object Model (POM), custom commands, TypeScript configuration notes, and a GitHub Actions workflow for CI.

Status
- Example tests: cypress/e2e/form.cy.ts, cypress/e2e/elements.cy.ts
- Page objects: cypress/pages/
- Support + commands: cypress/support/
- Cypress configured in cypress.config.ts (baseUrl set to https://demoqa.com)
- CI workflow: .github/workflows/ci.yml

Table of contents
- Overview
- Prerequisites
- Install
- Run tests (local and CI)
- Project layout
- Writing tests (POM + examples)
- Custom commands
- TypeScript notes (Cypress types / tsconfig)
- CI (GitHub Actions)

Overview
This repository is intended as a minimal, practical starting point to author Cypress E2E tests in TypeScript against the demoqa site. It demonstrates:
- How to structure tests and pages using a Page Object Model
- How to add custom Cypress commands with TypeScript definitions
- How to configure Cypress + TypeScript
- A simple CI integration using GitHub Actions

Prerequisites
- Node.js 16+ (or Node 18 recommended)
- Git
- A modern code editor (VS Code recommended)
- Internet access to reach https://demoqa.com

Install
1. Clone the repo:
```bash
git clone https://github.com/scripting-drafts/Cypress-Framework.git
cd Cypress-Framework
```

2. Install dependencies:
```bash
npm ci
```

Run tests locally
- Open interactive Cypress runner:
```bash
npm run cypress:open
```

- Run headless (CI-style):
```bash
npm run cypress:run
# or
npm run test:ci
```

Project layout
- cypress/
  - e2e/                # Example test specs (.cy.ts)
  - pages/              # Page Object Model classes
  - support/
    - e2e.ts            # Cypress support entry
    - commands.ts       # Custom commands & TypeScript augmentation
  - tsconfig.json       # (optional) local tsconfig for tests
- cypress.config.ts     # Cypress configuration (baseUrl, patterns)
- package.json
- tsconfig.json         # root TS config (for non-test code)
- .github/workflows/ci.yml

Writing tests (POM + examples)
- Use the page classes in cypress/pages/* to encapsulate selectors and actions.
- Keep assertions focused and readable. Use POM methods for actions to avoid selector duplication.

Example page class (already included)
```ts
export class PracticeFormPage {
  visit() { cy.visit('/automation-practice-form'); }
  getFirstName() { return cy.get('#firstName'); }
  getLastName() { return cy.get('#lastName'); }
  getEmail() { return cy.get('#userEmail'); }
  submit() { return cy.get('#submit').click(); }
}
```

Custom commands
- Add commands in `cypress/support/commands.ts`.
- Augment Cypress types by declaring `Cypress.Chainable` overloads inside the same file so TypeScript recognizes the commands.

After updating configs:
- Ensure `node_modules/cypress` exists (run `npm ci`)
- Restart your editor or the TypeScript server (VS Code → Command Palette → TypeScript: Restart TS Server)

CI (GitHub Actions)
A simple workflow `.github/workflows/ci.yml` is included. It:
- Checks out the repo
- Installs Node
- Runs `npm ci`
- Runs `npm run test:ci` (Cypress headless)