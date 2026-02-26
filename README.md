# Playwright Automation

Demo project for end-to-end test automation using Playwright.

---

## Steps and Decisions Made While Developing Test Suites

### IDE Used

**VS Code**

* Offers an official and powerful Playwright VS Code extension
* Provides debugging, test explorer, and integrated terminal support

---

### Create Playwright Project

```bash
npm init playwright@latest
```

---

### Language Chosen: TypeScript

**Reasons:**

* Native Playwright Test Runner support (parallelism, tracing, reporting)
* Strong typing improves code quality and maintainability
* Huge community support and ecosystem

---

### Run Playwright Tests

```bash
npx playwright test
```

**Notes:**

* Runs in headless mode by default
* Supports parallel execution

---

### Refactor Generated Project to Use Test Site

**Reference article:**
https://www.linkedin.com/pulse/best-test-demo-sites-practicing-software-automation-mark-nicoll-bjsme

**Chosen test site:**
https://www.saucedemo.com

**Reason:**

* Freely available
* Designed for automation practice
* Suitable for end-to-end testing demos

---

### Support Running Against Different Environments

Install dotenv:

```bash
npm install dotenv
```

**Added support for `.env` files for local testing:**

Benefits:

* Environment-based configuration
* No hardcoded credentials
* Easy integration with CI/CD pipelines
* Improves security and flexibility

---

## Summary

This project demonstrates:

* Playwright setup using TypeScript
* Structured test automation approach
* Environment-based configuration
* Real-world test site integration
* CI/CD-ready test framework
