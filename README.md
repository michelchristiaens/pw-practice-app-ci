# Ngx-Admin Angular 14 application from akveo.com

This is modified and more lightweight version of original application to practice UI Automation with Playwright.

The original repo is here: https://github.com/akveo/ngx-admin

# Playwright testing

This project demonstrates multiple technologies and methodologies:

- Playwright
- TypeScript
- FakerJS
- PageObjectModel
- Fixtures
- DotEnv
- AllureReport
- GitHub Actions
- ArgosCI [![Covered by Argos Visual Testing](https://argos-ci.com/badge.svg)](https://app.argos-ci.com/michelchristiaens/pw-practice-app-ci/reference)
- DockerFile + DockerCompose

# How to run

- git clone https://github.com/michelchristiaens/pw-practice-app-ci.git
- npm install playwright
- npx playwright test
- allure generate allure-results --clean
- allure open
