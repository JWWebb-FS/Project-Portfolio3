# Spotify Artist Search App

A full-stack Spotify artist search app with:

- Backend: Node.js, Express, Sequelize, SQLite, Spotify OAuth
- Frontend: React and Vite
- Search results: real Spotify artist images, names, followers, genres, and Spotify links

This README is written for classmates setting it up quickly. Follow the steps in order.

---

## Quick Setup Checklist

| Step | What you do | Done |
| --- | --- | --- |
| 1 | Install Node.js | [ ] |
| 2 | Download or clone this project | [ ] |
| 3 | Create a Spotify Developer app | [ ] |
| 4 | Create the root `.env` file | [ ] |
| 5 | Install backend packages | [ ] |
| 6 | Install frontend packages | [ ] |
| 7 | Start backend server | [ ] |
| 8 | Start frontend app | [ ] |
| 9 | Log in with Spotify and search | [ ] |

---

## 1. Install Node.js

You need Node.js before anything else.

1. Go to [https://nodejs.org](https://nodejs.org)
2. Download the **LTS** version.
3. Run the installer.
4. Keep clicking **Next** unless you know you need to change something.
5. When it finishes, close and reopen your terminal.

Check that Node installed correctly:

```bash
node -v
```

Then check npm:

```bash
npm -v
```

If both commands show version numbers, you are good.

Example:

```text
v22.12.0
10.9.0
```

---

## 2. Open the Project Folder

Open a terminal in the project root folder.

The root folder is the one that contains:

```text
README.md
server.js
package.json
frontend/
routes/
config/
```

On Windows, you can open the folder in VS Code, then use:

```bash
Terminal -> New Terminal
```

Make sure your terminal is at the root of the project.

---

## 3. Create Your Spotify Developer App

The app needs your own Spotify API keys.

1. Go to [https://developer.spotify.com/dashboard](https://developer.spotify.com/dashboard)
2. Log in with your Spotify account.
3. Click **Create app**.
4. Use any name and description.

Example:

```text
App name: Class Spotify Search
Description: Local project for artist search
```

5. For **Redirect URI**, add this exact URL:

```text
http://127.0.0.1:3001/auth/callback
```

6. Save the app.
7. Open the app settings.
8. Copy your:

```text
Client ID
Client Secret
```

Keep these ready for the next step.

Important: Do not use someone else's Spotify keys. Everyone should use their own.

---

## 4. Create the `.env` File

In the project root, create a file named:

```text
.env
```

It must be next to `server.js`, not inside the `frontend` folder.

Paste this into `.env`:

```env
# Server
PORT=3001

# Database
DATABASE_URL=sqlite:database.sqlite
DB_DIALECT=sqlite

# Spotify API credentials
SPOTIFY_CLIENT_ID=paste_your_client_id_here
SPOTIFY_CLIENT_SECRET=paste_your_client_secret_here

# Spotify login callback
REDIRECT_URI=http://127.0.0.1:3001/auth/callback
```

Now replace these two lines with your real Spotify values:

```env
SPOTIFY_CLIENT_ID=paste_your_client_id_here
SPOTIFY_CLIENT_SECRET=paste_your_client_secret_here
```

Example shape only:

```env
SPOTIFY_CLIENT_ID=abc123yourrealclientid
SPOTIFY_CLIENT_SECRET=xyz789yourrealclientsecret
```

Do not add quotes around the values.

Correct:

```env
SPOTIFY_CLIENT_ID=abc123
```

Incorrect:

```env
SPOTIFY_CLIENT_ID="abc123"
```

---

## 5. Install Backend Packages

In the root project folder, run:

```bash
npm install
```

Wait until it finishes.

If it worked, you should see a `node_modules` folder in the project root.

---

## 6. Install Frontend Packages

Now move into the frontend folder:

```bash
cd frontend
```

Install the frontend packages:

```bash
npm install
```

When that finishes, move back to the root folder:

```bash
cd ..
```

---

## 7. Start the Backend Server

Open Terminal 1 in the root project folder.

Run:

```bash
node server.js
```

You should see something like:

```text
Server is listening on port 3001
Local URL: http://localhost:3001
Network URL: http://192.168.x.x:3001
```

Leave this terminal running.

Do not close it while using the app.

---

## 8. Start the Frontend App

Open Terminal 2.

Move into the frontend folder:

```bash
cd frontend
```

Start the React app:

```bash
npm run dev
```

You should see a Vite URL like:

```text
Local: http://localhost:5173/
```

Open this in your browser:

```text
http://localhost:5173
```

Leave this terminal running too.

---

## 9. Log In and Search

1. Go to:

```text
http://localhost:5173
```

2. Click **Login with Spotify**.
3. Approve the Spotify login screen.
4. Search for an artist.

Try:

```text
Taylor Swift
Drake
Bad Bunny
SZA
The Beatles
```

Artist cards should show:

- Artist image
- Artist name
- Follower count
- Genres
- View on Spotify button

---

## Classmate Testing on the Same Wi-Fi

If someone else wants to test your backend from another computer on the same Wi-Fi, use the **Network URL** printed by the backend.

Example:

```text
Network URL: http://192.168.1.25:3001
```

They should replace `localhost` with your network IP if they are testing from their own machine.

Important: Your backend terminal must stay running.

---

## The Two Commands You Usually Need

Use two terminals.

### Terminal 1: Backend

Run from the root folder:

```bash
node server.js
```

### Terminal 2: Frontend

Run from the `frontend` folder:

```bash
npm run dev
```

---

## Folder Map

```text
Project-Portfolio3/
  .env                 Your private Spotify keys go here
  server.js            Backend server
  package.json         Backend dependencies
  database.sqlite      Local SQLite database
  routes/
    auth.js            Spotify login routes
  frontend/
    package.json       Frontend dependencies
    src/
      Search.jsx       Artist search UI
      App.jsx          App entry logic
```

---

## Common Problems and Fixes

### `node` is not recognized

Node.js is not installed, or the terminal was opened before Node was installed.

Fix:

1. Install Node.js LTS from [https://nodejs.org](https://nodejs.org)
2. Close your terminal.
3. Open a new terminal.
4. Try again:

```bash
node -v
```

### `npm` is blocked on Windows PowerShell

If PowerShell says scripts are disabled, use this instead:

```bash
npm.cmd install
```

And:

```bash
npm.cmd run dev
```

### Spotify says redirect URI is invalid

Your Spotify Developer Dashboard redirect URI must exactly match:

```text
http://127.0.0.1:3001/auth/callback
```

Also make sure your `.env` has:

```env
REDIRECT_URI=http://127.0.0.1:3001/auth/callback
```

### Login works but search fails

Check that the backend is still running:

```bash
node server.js
```

Also check that your `.env` has real Spotify values:

```env
SPOTIFY_CLIENT_ID=your_real_id
SPOTIFY_CLIENT_SECRET=your_real_secret
```

### Port already in use

Something else is using port `3001` or `5173`.

Easy fix:

1. Close old terminals running the project.
2. Stop any running server with `Ctrl + C`.
3. Start the backend again:

```bash
node server.js
```

4. Start the frontend again:

```bash
cd frontend
npm run dev
```

### Blank page or frontend will not load

Make sure you ran the frontend command from inside the `frontend` folder:

```bash
cd frontend
npm run dev
```

### Database error

Make sure your `.env` includes both database lines:

```env
DATABASE_URL=sqlite:database.sqlite
DB_DIALECT=sqlite
```

---

## Full Fresh-Start Command List

Use this if you are starting from nothing.

```bash
# 1. Install backend packages from the root folder
npm install

# 2. Move into frontend
cd frontend

# 3. Install frontend packages
npm install

# 4. Move back to root
cd ..

# 5. Start backend
node server.js
```

Then open a second terminal:

```bash
# 6. Move into frontend
cd frontend

# 7. Start frontend
npm run dev
```

Open:

```text
http://localhost:5173
```

---

## Do Not Commit `.env`

Your `.env` file contains private Spotify keys.

Do not upload it.
Do not paste it in Discord.
Do not send it to classmates.

Everyone should create their own `.env` file locally.
