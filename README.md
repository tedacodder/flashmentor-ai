# FlashMentor-AI

**FlashMentor-AI** is a modern AI-powered study assistant that generates flashcards, quizzes, and personalized learning prompts from user-provided content. The application is built as a **single-page React + Vite + TypeScript** project, with a dedicated service layer for AI integration using Gemini (or compatible LLM APIs).

It is lightweight, fast, and designed to help students learn efficiently through structured flashcards and interactive views.

---

## Table of Contents

1. [Features](#features)
2. [Tech Stack](#tech-stack)
3. [Getting Started](#getting-started)

   * [Prerequisites](#prerequisites)
   * [Installation](#installation)
   * [Configuration](#configuration)
4. [Usage](#usage)
5. [Project Structure](#project-structure)
6. [Contributing](#contributing)
7. [License](#license)

---

## Features

* Dashboard overview with study progress and statistics
* AI-guided tutoring sessions with explanations
* Take AI-generated quizzes from study material
* Generate, review, and manage AI-powered flashcards
* User profile management (view and edit profile)
* Landing page with introduction and app overview
* User login functionality
* User registration / sign-up functionality
* AI service integration for flashcard and quiz generation

---

## Tech Stack

| Layer              | Technology                         |
| ------------------ | ---------------------------------- |
| Frontend Framework | React                              |
| Language           | TypeScript                         |
| Build Tool         | Vite                               |
| AI Integration     | Gemini (or any compatible LLM API) |
| Package Manager    | npm                                |

---

## Getting Started

### Prerequisites

* **Node.js** v16+
* **npm** or **yarn**
* **Gemini AI API key**

> ⚠️ Make sure your API key is restricted to prevent abuse when exposed in frontend applications.

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/tedacodder/flashmentor-ai.git
cd flashmentor-ai
npm install
```

### Configuration

Create a `.env` file in the project root with the following:

```env
GEMINI_API_KEY=your_api_key_here
```

> **Important:** By default, Vite only exposes variables prefixed with `VITE_` to the frontend. To use `GEMINI_API_KEY` safely, you can either access it via a backend proxy or use a workaround in development like:

```ts
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY;
```

Restart the dev server after creating or updating `.env`:

```bash
npm run dev
```

---

## Usage

1. Run the development server:

```bash
npm run dev
```

2. Open your browser at the URL provided (usually `http://localhost:5173`).
3. Navigate through the views:

   * `Landing` – Home page
   * `Dashboard` – Overview of flashcards and quizzes
   * `FlashcardsView` – Review generated flashcards
   * `QuizView` – Take AI-generated quizzes
   * `Tutor` – AI-guided learning sessions
   * `Login` / `SignUp` / `Profile` – User account management
4. Input text or study material to generate flashcards via the **AI service**.

---

## Project Structure

```
flashmentor-ai/
├── views/                  # Page-level UI components (screens)
│   ├── Dashboard.tsx
│   ├── Tutor.tsx
│   ├── QuizView.tsx
│   ├── FlashcardsView.tsx
│   ├── Profile.tsx
│   ├── Landing.tsx
│   ├── Login.tsx
│   └── SignUp.tsx
│
├── App.tsx                 # Root app component and router
├── index.tsx               # React DOM entrypoint
├── index.html              # HTML shell
├── geminiService.ts        # AI/LLM integration and flashcard generation logic
├── types.ts                # Shared TypeScript interfaces and types
├── metadata.json           # Project metadata
├── vite.config.ts          # Vite configuration
├── tsconfig.json           # TypeScript configuration
├── package.json
├── package-lock.json
└── .gitignore
```

**Notes:**

* `views/` contains all major UI screens.
* `geminiService.ts` handles all AI API interactions, keeping the UI clean.
* `types.ts` defines consistent interfaces used throughout the project.

---

## Contributing

We welcome contributions:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/YourFeature`
3. Implement changes and ensure type safety
4. Submit a pull request with a clear description of your changes

---

## License

This project is open-source. Add or update the LICENSE file as needed.

---

## Future Roadmap

* Spaced repetition for flashcards
* Persistent user data storage (backend integration)
* Multi-model AI support (OpenAI, Gemini, etc.)
* Quiz scoring and analytics
* Enhanced UI/UX with responsive and mobile-friendly design
