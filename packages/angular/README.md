# adCAPTCHA NPM Angular Package 
## Angular | Typescript 

This project demonstrates how to use the adCAPTCHA NPM package with an Angular application.

---

## Installing Dependencies  

Before running the application, install the required dependencies using the following command:  
### `npm install`  

## Build the adCAPTCHA Angular Package  
 
```bash
# Build the adcaptcha package
ng build adcaptcha  
```
This will create a dist folder containing the compiled adcaptcha package.

## Available Scripts  

### `ng serve`  
Starts the application in development mode.  
Open [http://localhost:4200](http://localhost:4200) in your browser to view it.

---

## Setup Instructions  

### 1. Configure Environment Variables  
Set your `PLACEMENT_ID` in the `src/environments` folder.  

- `environment.ts` (for development):
  ```typescript
  export const environment = {
    production: false,
    placementID: 'your-placement-id'
  };
  ```

# Angular

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.12.

## Running unit tests

Run `ng test adcaptcha` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.
