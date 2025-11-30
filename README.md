# WordPress Plugins and WooCommerce Site Automation Testing Using Playwright and Typescript

## Overview
This repository contains a complete automation-ready test suite for:
- FlexTable WordPress Plugin
- WooCommerce Checkout & User Account Flow

The test cases are structured for easy implementation using Playwright, Cypress, Selenium, or any automation framework.
They cover login, plugin validation, table creation, frontend validation, checkout flows, and order history.

## Features
- WordPress Admin Login Automation
- Plugin Install, Activate, Validate
- FlexTable Table Creation (Google Sheets)
- Shortcode Rendering Verification
- UI Layout & Styling Validations
- Table Deletion & Frontend Cleanup
- WooCommerce End-to-End Checkout
- Order History Validation
- Supports scalable automation frameworks

## Prerequisites
Make sure you have the following installed:
- [Node.js](https://nodejs.org/en/download/) (v18 or higher)
- npm or yarn
- Git
- Visual Studio Code (recommended)

## Setup Instructions
### 1. Clone the Repository
git clone https://github.com/SagorKumarSaha/Food_Ordering_Website_AutomationTesting_Playwright.git <br>
cd Food_Ordering_Website_AutomationTesting_Playwright
### 2. Install Dependencies
npm install
### 3. Install Playwright Browsers
npx playwright install

## Configure environment variables
Create .env file from .env.example file:
- ADMIN_USERNAME=admin-username
- ADMIN_PASSWORD=admin-password

## Running Tests
### 1. Run All Tests
npx playwright test
### 1. Run All Tests using 1 worker for sequential run (recommended)
npx playwright test --project=chromium --workers=1
### 2. Run Tests in Headed Mode
npx playwright test --headed
### 3. Run Specific Test File
npx playwright test tests/E2E_Test.spec.ts
### 4. Run in Specific Browser
npx playwright test --project=chromium <br>
npx playwright test --project=firefox <br>
npx playwright test --project=webkit

- **To Execute Tests in Multiple Browsers, Need to modify "playwright.config.ts" file**
- **The first test execution may take longer than usual, while subsequent runs generally complete more quickly**

## Reporting
### To generate and view the HTML report:
npx playwright show-report
### Reports are automatically created under:
/playwright-report
