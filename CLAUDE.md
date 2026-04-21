# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
pnpm dev      # Start dev server
pnpm build    # Production build
pnpm lint     # Run ESLint
pnpm start    # Start production server
```

No test runner is configured in this project.

## Architecture Overview

This is an iSchool management platform with three user portals: Admin/Teacher (`(management)`), Parent (`(main)`), and Public (`(home)`). Routes use Next.js App Router layout groups.

### Route Groups & Access Control

- `(home)` — Public pages: home, login, parent registration
- `(management)` — Protected: dashboard, students, assessments, check-in, admin management
- `(main)` — Parent portal: student info, payment
- `(password)` — Forgot/reset password flows

Role-based access is enforced in `src/proxy.ts` (the middleware). Roles: `TEACHER`, `ADMIN`, `SUPER_ADMIN`, `PARENT`.

### API Layer Pattern

All API work follows this chain: **Types → Service → Hook → Component**

- **`src/lib/api/client.ts`** — Base HTTP client using native fetch; handles auth token injection, query params, JSON/FormData, and throws `ApiError` on failure; redirects on `401 INVALID_TOKEN` / `TOKEN_EXPIRED`
- **`src/lib/api/api-server.ts`** — Server-side variant that auto-injects token from NextAuth session; use in Server Components and Server Actions
- **`src/lib/api/<domain>/<domain>.service.ts`** — Domain service objects (e.g., `studentService`, `teacherService`)
- **`src/lib/api/<domain>/<domain>.type.ts`** — TypeScript types for the domain
- **`src/lib/api/<domain>/hook/use<Domain>.ts`** — React Query hooks; always gate fetching with `enabled: !!session?.user?.accessToken`
- **`src/lib/actions/<domain>.action.ts`** — Server Actions for mutations that call `revalidatePath` / `redirect` after success

### Auth

NextAuth v5 (beta) is configured in `src/lib/auth/auth.ts`. Sessions include `accessToken`, `role`, `firstName`, `lastName`, `profileImageUrl`, `teacher`, and `parent`.

- Client: `useSession()` from `next-auth/react`
- Server: `auth()` from `@/lib/auth/auth`
- Helper: `getCurrentUser()` validates session and redirects if invalid

### Key Libraries

| Library | Purpose |
|---|---|
| `@tanstack/react-query` v5 | Server state / data fetching |
| `react-hook-form` + `zod` | Forms and schema validation |
| `next-auth` v5 beta | Authentication |
| `shadcn/ui` + Radix UI | Component primitives |
| Tailwind CSS v4 | Styling |
| Sonner | Toast notifications |
| Stripe | Payment processing |

### Environment

Validated at startup via Zod schemas in `src/config/`. Required vars:
- `NEXT_PUBLIC_BACKEND_URL` — Backend API base URL
- `AUTH_SECRET` — NextAuth secret
