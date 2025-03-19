# Firewall SDK

The `firewallb-sdk` is a JavaScript library designed to integrate with your web application to block malicious IPs and protect sensitive content. It validates user IP addresses against a firewall API and prevents unauthorized access.

## Features

- **IP Validation**: Validates whether a user's IP is blocked by the firewall API.
- **ProtectedPage Component**: Wraps content and ensures that only authorized users can access it.
- **Easy Setup**: Simple configuration through environment variables.

## Installation

To install the `firewallb-sdk`, use npm:

### Using npm

`npm install firewallb-sdk`

---

## Configuration & Usage

### Step 1: Set Environment Variables

Before using the `firewallb-sdk`, you need to configure your environment variables. These variables contain your API key and app ID, which are essential for connecting your app to the firewall service.

In your project's root directory, create or update the `.env` file with the following configuration:

```
REACT_APP_FIREWALL_API_KEY="your-api-key"
REACT_APP_FIREWALL_APP_ID="your-app-id"
```

- `REACT_APP_FIREWALL_API_KEY`: Your unique API key provided by the firewall service.
- `REACT_APP_FIREWALL_APP_ID`: The app ID associated with your firewall service account.

Ensure these variables are correctly set in your `.env` file. They will be used by the SDK to authenticate and make requests to the firewall service.

### Important Notes:

- The `REACT_APP_` prefix is required for environment variables to be accessible in React applications created with Create React App or Vite.
- Do not commit your `.env` file to version control (e.g., Git) for security reasons. Add it to your `.gitignore` file.

---

### Step 2: Set Configuration in Your App

Once the environment variables are set, configure the SDK using the `setConfig` function. This function will allow the SDK to access the firewall service with the provided API key and app ID.

In your main app file (e.g., `App.js` or `App.jsx`), use the following code to configure the firewall SDK:

```
import React from "react";
import { setConfig, ProtectedPage } from "firewallb-sdk";

// Set the configuration for the firewall
setConfig({
  API_KEY: process.env.REACT_APP_FIREWALL_API_KEY,
  APP_ID: process.env.REACT_APP_FIREWALL_APP_ID,
});

function App() {
  return (
    <div className="App">
      <ProtectedPage>
        <h1>Protected Content</h1>
        <p>This content is protected by the firewall SDK.</p>
      </ProtectedPage>
    </div>
  );
}

export default App;
```

This code will initialize the SDK with the API key and app ID from your environment variables.

---

### Step 3: Use `ProtectedPage` to Protect Content

Once the SDK is configured, you can use the `ProtectedPage` component to protect content within your application. Here's how:

```
<ProtectedPage>
  <h1>Protected Content</h1>
  <p>This content is protected by the firewall SDK.</p>
</ProtectedPage>
```

The `ProtectedPage` component ensures that only authorized users can access the content inside it, while unauthorized users will be blocked.

---

## Final Notes

- Make sure to test your app after integration to ensure the firewall SDK is working as expected.
- If you encounter any issues with the firewall or SDK setup, please check the API key and app ID in the environment variables.

---

This guide covers the basic steps to configure and use the `firewallb-sdk` in your React application. Let us know if you need further assistance!

---
