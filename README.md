# To-Do Dashboard

A modern, responsive task management dashboard built with Vue 3, Pinia, Tailwind CSS, and Supabase.

Usage
- **Sign Up / Sign In: Access via /auth/signup or /auth/signin.
- **Dashboard: Manage your tasks at /dashboard.
- **Analytics, Message, Export, Settings: Use the sidebar to navigate.
- **Sidebar: Click the chevron to collapse/expand. The main view resizes automatically.
- **Session Persistence: You remain logged in after refreshing the page.

## Features

- **User Authentication:** Sign up, sign in, and password recovery using Supabase Auth.
- **Task Management:** Create, edit, delete, and favorite tasks.
- **Task Status:** Organize tasks by status: To Do, In Progress, Completed.
- **Filtering & Search:** Filter tasks by search, date, and favorites.
- **Analytics:** Visual analytics with charts and images.
- **Export & Messaging:** Dedicated views for exporting data and messaging.
- **Settings:** Toggle dashboard features in the settings view.
- **Responsive Sidebar:** Collapsible sidebar with smooth transitions.
- **Persistent Sessions:** User stays logged in across page reloads.
- **404 Page:** Friendly not-found page for invalid routes.

## Tech Stack

- [Vue 3](https://vuejs.org/)
- [Pinia](https://pinia.vuejs.org/) (state management)
- [Vue Router](https://router.vuejs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Supabase](https://supabase.com/) (auth & database)
- [Vite](https://vitejs.dev/) (build tool)

