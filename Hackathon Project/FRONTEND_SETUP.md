# 🎨 Frontend Setup Guide

Let's get the visual part of the app running!

## Step 1: Initialize Vite (The Build Tool)
1.  Open your **VS Code Terminal** (Ctrl + `).
2.  Make sure you are in the main folder `d:\Hackathon Project`.
3.  Navigate to the `client` folder:
    ```powershell
    cd client
    ```
4.  Run the creation command:
    ```powershell
    npm create vite@latest . -- --template react
    ```
    *(Note: The `.` is important! It means "install in this current folder".)*

## Step 2: Install Dependencies
We need a few libraries to make it look "Premium" and work with the backend.

Run this single command to install everything we need:

```powershell
npm install
npm install axios react-router-dom framer-motion lucide-react clsx tailwind-merge @tanstack/react-query
npm install -D tailwindcss postcss autoprefixer
```

## Step 3: Setup Tailwind CSS
1.  Initialize Tailwind:
    ```powershell
    npx tailwindcss init -p
    ```
    *(This creates `tailwind.config.js` and `postcss.config.js`)*.

2.  Open `client/tailwind.config.js` and replace the `content: []` line with this:
    ```javascript
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    ```

3.  Open `client/src/index.css` and **replace everything** with:
    ```css
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
    ```

## Step 4: Start the Frontend!
```powershell
npm run dev
```

You should see a new link (usually `http://localhost:5173`). Ctrl+Click it to see your React App!
