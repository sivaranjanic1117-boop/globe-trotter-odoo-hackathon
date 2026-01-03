# 🛠️ Backend Setup Guide (Read Me First!)

Since this is your first time setting up a Backend environment, follow these steps exactly. You only need to do **Step 1** and **Step 2** once on your computer.

## Step 1: Install Node.js (The Engine)
Node.js is the "engine" that runs JavaScript outside of the browser. You cannot run the server without it.

1.  **Download**: Go to [nodejs.org](https://nodejs.org/).
2.  **Version**: Download the **LTS (Long Term Support)** version (Recommended for most users).
3.  **Install**: Run the installer (clicking "Next", "Next", "Finish").
    *   **Important**: If asked, make sure "Add to PATH" is checked (it usually is by default).
4.  **Verify**:
    *   Open a **NEW** terminal (Command Prompt or PowerShell).
    *   Type `node -v` and press Enter. You should see a version number (e.g., `v20.x.x`).
    *   Type `npm -v` and press Enter. You should see a version number.

## Step 2: Install PostgreSQL (The Database)
You need a database to store the user's trips and data.

1.  **Download**: Go to [postgresql.org/download/windows/](https://www.postgresql.org/download/windows/).
2.  **Install**: Run the installer.
    *   **Password**: It will ask you to set a password for the "superuser" (postgres). **Write this down!** (e.g., "password123").
    *   **Port**: Leave it as `5432`.
3.  **Verify**:
    *   Search for "pgAdmin 4" in your Windows Start menu and open it. This is the dashboard for your database.

## Step 3: Install Project Tools (Express.js, Prisma)
These are "libraries" that live inside your project folder, not on your whole computer.

1.  **Open VS Code** to your project folder (`d:\Hackathon Project`).
2.  **Open the Terminal** (Ctrl + `).
3.  **Navigate to Server**:
    ```powershell
    cd server
    ```
4.  **Install Dependencies**:
    ```powershell
    npm install
    ```
    *(This command reads the `package.json` file I made for you and downloads Express, Prisma, CORS, etc., automatically)*.

## Step 4: Connect the Database
1.  Open the file `server/.env`.
2.  Find the line `DATABASE_URL="..."`.
3.  Change `password` to the password you created in Step 2.
    *   Example: `postgresql://postgres:password123@localhost:5432/globetrotter?schema=public`

## Step 5: Start the Server!
```powershell
npm run dev
```
If you see **"Server running on http://localhost:3000"**, YOU DID IT! 🎉
