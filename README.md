# playwright-automation
demo project


# Steps and decisions made while developing test suites
IDE used: VS Code
    * offers official powerful Playwright VS code extention

Create Playwright Project: npm init playwright@latest

Language Choses: TypeScript 
    * Native Playwrite Test Runner - parallelism, tracing
    * Strong typing
    * Huge Community support and ecosystem

Run Playwrite tests:
    * npm playwright test (by default runs in headless mode)

Refactor generated project to open test site:
    * Good article for freely available test sites https://www.linkedin.com/pulse/best-test-demo-sites-practicing-software-automation-mark-nicoll-bjsme
    * Chose https://www.saucedemo.com for e2e testing demo

Support running againsts different env:
    * npm install dotenv
    * added support for .env files for local testing
        * env-based config + no hardcoded credentials
        * ready to integrate with CI/CD
