# 🎮 Front-End Developer Recruitment Test Project

Welcome to the **Front-End Developer Recruitment Test**! This project involves building a fully responsive game discovery website using the [RAWG Video Games Database API](https://rawg.io/apidocs). It is designed to evaluate your front-end skills using modern tools and libraries.

---

## 📌 Tech Stack

Please use **only** the following technologies:

- ⚛️ React (Functional Components + Hooks)
- 🧠 Redux (State Management)
- 🔐 Clerk Auth (Authentication)
- 🎨 Bootstrap & React-Bootstrap
- 💅 Vanilla CSS

---

## 📂 Project Features & Steps

### 1. 🏠 Main Page Layout

Create the main layout with:

- **Header**  
  - Logo  
  - Search bar  
  - “Library/Bookmark” (favorites section)

- **Sidebar (Filters Menu)**  
  - Filter options for:
    - Category
    - Tags
    - Release Year
    - Popularity

- **Main Hero Section (Game Cards Grid)**  
  - Game image  
  - Description  
  - Tags  
  - Category  
  - Ratings

---

### 2. 🧮 Filtering

- Filters must dynamically update the game list.
- Add loading spinners or skeletons while fetching data
- Enable filtering by:
  - Category
  - Tags
  - Release Year
  - Popularity

---

### 3. 🔍 Real-Time Search

- Implement a responsive search bar.
- Game list should update in **real time** as the user types.

---

### 4. 📄 Pagination

- Handle large game lists using **pagination**.
- Users should be able to navigate between pages easily.

---

### 5. 📘 Game Detail Page

When a game card is clicked, redirect to a detailed view showing:

- Game Title
- Full Description
- Screenshots
- Ratings
- Pricing (if available)
- System Requirements

---

### 6. 🔐 Clerk Authentication

- Implement user sign up, login, logout using [Clerk](https://clerk.com).
- Access to the “Library/Bookmark” must be **restricted to authenticated users**.

---

### 7. ❤️ State Management (Redux)

- Use Redux to manage:
  - Favorite/Bookmarked games
- Features:
  - Add/Remove games from favorites
  - Persistence across sessions (local storage or backend)

---

## 📱 Responsiveness

Your application **must** be fully responsive and function seamlessly across devices (mobile, tablet, desktop).

---

## 🧑‍💻 Best Practices

- Use **functional components and hooks** only (no class components).
- Keep code clean, modular, and maintainable.
- Use proper state management across components.
- Organize files with a scalable folder structure.
- Handle edge cases and loading/error states properly.

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Ayushrak/GAME_WEBSITE.git

```
###  2. Install dependencies

npm install
3. Environment variables
Create a .env file in the root with the following:

```
VITE_RAWG_API_KEY=your_rawg_api_key
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
```
🔑 You can obtain the RAWG API key at rawg.io/apidocs

🔐 Clerk setup guide: Clerk Docs

4. Run the app locally

npm run dev


🔗 Useful Resources
RAWG API Docs

Clerk Auth Docs

Redux Toolkit

React-Bootstrap

🧪 Bonus Ideas (Optional)
Add loading spinners or skeletons while fetching data

Add dark mode support

Implement infinite scrolling as an alternative to pagination

Allow sorting (A-Z, rating, etc.)

🎯 Goal
Showcase your skills with React, Redux, Clerk Auth, and component design by delivering a smooth, functional, and well-styled application.

Good luck, and have fun building! 🚀🎮




# 🎮 GameVerse - Game Discovery Platform

A fully responsive front-end web application to discover video games using the RAWG API.

Built with **React**, **Redux**, **React-Bootstrap**, **Clerk Auth**, and **Vanilla CSS**.

---

