# Cypress TypeScript Framework for demoqa

A Cypress framework (TypeScript) targeted at testing https://demoqa.com.  
Includes example end-to-end tests, a simple Page Object Model (POM), custom commands, TypeScript configuration notes, and a GitHub Actions workflow for CI.

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

CI (GitHub Actions)
- Checks out the repo
- Installs Node
- Runs `npm ci`
- Runs `npm run test:ci` (Cypress headless)