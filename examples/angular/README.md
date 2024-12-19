# adCAPTCHA NPM Angular Package Example  
## Angular | Typescript 

This project demonstrates how to use the adCAPTCHA NPM package with an Angular application.

---

## Build the adCAPTCHA Angular Package  
 
```bash
# Navigate to the angular package directory
cd packages/angular  

# Build the adcaptcha package
ng build adcaptcha  
```

This will create a dist folder containing the compiled adcaptcha package, which will be installed and used in the example application.

## Installing Dependencies  

Before running the application, install the required dependencies using the following command:  
### `npm install`  

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
