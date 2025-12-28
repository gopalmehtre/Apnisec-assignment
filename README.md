# ApniSec Assignment

A full-stack web application built with **Next.js**, **TypeScript**, **Prisma**, and **Tailwind CSS**. This project features authentication, user management, and an issue tracking system, with a clear separation between frontend and backend logic.

---

## Table of Contents

- [Project Structure](#project-structure)
- [Folder & File Details](#folder--file-details)
- [Getting Started](#getting-started)
- [Scripts](#scripts)
- [Technologies Used](#technologies-used)
- [License](#license)

---

## Project Structure

```
.
├── prisma/                # Database schema and migrations
│   ├── schema.prisma
│   └── migrations/
├── public/                # Static assets
├── src/
│   ├── app/               # Next.js app directory (frontend & API routes)
│   ├── backend/           # Backend logic (controllers, services, etc.)
│   ├── components/        # React UI components
│   └── lib/               # Shared libraries (API, Prisma client)
├── package.json           # Project dependencies and scripts
├── tsconfig.json          # TypeScript configuration
├── tailwind.config.js     # Tailwind CSS configuration
├── postcss.config.js      # PostCSS configuration
├── next.config.ts         # Next.js configuration
├── eslint.config.mjs      # ESLint rules for code quality
└── README.md              # Project documentation
```

---

## Folder & File Details

### Root Files

- **package.json**: Lists dependencies and scripts.
- **tsconfig.json**: TypeScript settings.
- **next.config.ts**: Next.js custom configuration.
- **tailwind.config.js**: Tailwind CSS setup.
- **postcss.config.js**: PostCSS plugins.
- **eslint.config.mjs**: ESLint rules for code quality.
- **README.md**: Project documentation.

### prisma/
- **schema.prisma**: Defines your database models and relations.
- **migrations/**: Contains migration history and SQL files for schema changes.

### public/
- Static files (e.g., images, favicon).

### src/app/
- **globals.css**: Global styles.
- **layout.tsx**: Root layout for all pages.
- **page.tsx**: Home page.
- **dashboard/**, **login/**, **profile/**, **register/**: Page directories for respective routes.
- **api/**: Next.js API routes (REST endpoints).
	- **auth/**: Authentication endpoints (login, logout, register, me).
	- **issues/**: Issue management endpoints.
	- **users/**: User profile endpoint.

### src/backend/
- **controllers/**: Handle HTTP requests and responses.
	- **AuthController.ts**: Auth logic (login, register, logout).
	- **IssueController.ts**: Issue CRUD operations.
	- **UserController.ts**: User profile and management.
- **services/**: Business logic (auth, email, issues, users).
	- **AuthService.ts**: Auth-related business logic.
	- **EmailService.ts**: Email sending logic.
	- **IssueService.ts**: Issue-related business logic.
	- **userService.ts**: User-related business logic.
- **repositories/**: Data access layer (Prisma queries).
	- **IssueRepository.ts**: Issue DB operations.
	- **userRepository.ts**: User DB operations.
- **middlewares/**: Express-style middleware (auth, rate limiting).
	- **AuthMiddleware.ts**: Protects routes, checks JWT.
	- **RateLimiter.ts**: Rate limiting logic.
- **validators/**: Input validation logic.
	- **AuthValidator.ts**: Auth input validation.
	- **IssueValidator.ts**: Issue input validation.
	- **UserValidator.ts**: User input validation.
- **types/**: TypeScript type definitions.
	- **auth.types.ts**: Auth types.
	- **issue.types.ts**: Issue types.
	- **user.types.ts**: User types.
- **utils/**: Utility functions (JWT, password hashing, response formatting).
	- **jwtUtil.ts**: JWT creation/verification.
	- **PasswordUtil.ts**: Password hashing/validation.
	- **ResponseUtil.ts**: Standardized API responses.
- **errors/**: Custom error classes.
	- **AppError.ts**: Custom error handling.

### src/components/
- **auth/**: Login and registration forms.
	- **LoginForm.tsx**: Login form UI and logic.
	- **RegisterForm.tsx**: Registration form UI and logic.
- **dashboard/**: Issue cards, forms, and lists.
	- **IssueCard.tsx**: Displays a single issue.
	- **IssueForm.tsx**: Form to create/edit issues.
	- **IssueList.tsx**: List of issues.
- **home/**: Landing page features, hero, and services.
	- **Feature.tsx**: Feature highlights.
	- **Hero.tsx**: Hero section.
	- **Services.tsx**: Services offered.
- **layout/**: Navbar and footer.
	- **Footer.tsx**: Footer UI.
	- **Navbar.tsx**: Navigation bar UI.
- **ui/**: Reusable UI elements (button, card, input).
	- **Button.tsx**: Button component.
	- **Card.tsx**: Card component.
	- **Input.tsx**: Input field component.

### src/lib/
- **api.ts**: API client utilities.
- **prisma.ts**: Prisma client instance.

---

## Getting Started

1. **Install dependencies:**
	 ```bash
	 npm install
	 ```

2. **Set up environment variables:**
	 - Copy `.env.example` to `.env` and fill in required values.

3. **Run database migrations:**
	 ```bash
	 npx prisma migrate dev
	 ```

4. **Start the development server:**
	 ```bash
	 npm run dev
	 ```

5. **Open [http://localhost:3000](http://localhost:3000) in your browser.**

---

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npx prisma studio` - Open Prisma Studio (DB GUI)

---

## Technologies Used

- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Prisma](https://www.prisma.io/)
- [Tailwind CSS](https://tailwindcss.com/)

---

## Author
- Gopal Mehtre
