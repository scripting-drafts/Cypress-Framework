# Cypress TypeScript Framework for demoqa

This repository is a starter Cypress framework (TypeScript) for testing https://demoqa.com.

## What is included
- Cypress configured for TypeScript (`cypress.config.ts` + `tsconfig.json`)
- Example end-to-end tests covering the Practice Form and Elements pages
- Page Object Model under `cypress/pages/`
- Custom commands in `cypress/support/commands.ts`
- GitHub Actions workflow to run tests on push/PR
- README with install and run instructions

## Install
```bash
git clone https://github.com/scripting-drafts/Cypress-Framework.git
cd Cypress-Framework
npm ci