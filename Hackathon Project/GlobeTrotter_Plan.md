# GlobeTrotter Implementation Plan (Hackathon Winner Edition)

## Goal
Build **GlobeTrotter**, a premium, full-stack travel planning application.
**Key Pivot**: Moving to a custom **Node.js/Express Backend** with **PostgreSQL** to demonstrate "Backend API Design" and "Data Modeling" skills (Hackathon Criteria).

## Tech Stack (The "Grand Title" Stack)
-   **Frontend**: React (Vite) + Tailwind CSS + Framer Motion (Animations).
-   **Backend**: Node.js + Express.js. (Demonstrates API design skills).
-   **Database**: PostgreSQL.
-   **ORM**: Prisma. (Trendy, type-safe, excellent for data modeling).
-   **State Management**: TanStack Query (React Query) - *Good for caching/offline support criteria*.

## User Review Required
> [!IMPORTANT]
> **Database Requirement**: You must have PostgreSQL installed locally OR have a connection URL ready. I will set up the code to connect to it via `DATABASE_URL`.

## Architecture
We will run two processes:
1.  **Client**: Port 5173 (Vite)
2.  **Server**: Port 3000 (Express API)

## Database Schema (Prisma)
We will define this in `schema.prisma` to strictly model the data:

```prisma
model User {
  id        String   @id @default(uuid())
  email     String   @unique
  password  String   // Hashed
  fullName  String?
  trips     Trip[]
}

model Trip {
  id          String   @id @default(uuid())
  title       String
  description String?
  startDate   DateTime
  endDate     DateTime
  budget      Float?
  userId      String
  user        User     @relation(fields: [userId], references: [id])
  stops       Stop[]
}

model Stop {
  id        String   @id @default(uuid())
  city      String
  tripId    String
  trip      Trip     @relation(fields: [tripId], references: [id])
  activities Activity[]
}

model Activity {
  id        String   @id @default(uuid())
  name      String
  cost      Float
  stopId    String
  stop      Stop     @relation(fields: [stopId], references: [id])
}
```

## Development Phases

### Phase 1: Backend Core (The Foundation)
#### [NEW] [Server Setup]
- Initialize `server/` directory.
- Setup Express app with CORS and JSON parsing.
- Initialize Prisma (`npx prisma init`).

#### [NEW] [API Routes]
- `POST /api/auth/signup`: User registration.
- `POST /api/auth/login`: JWT generation.
- `GET /api/trips`: Fetch user's trips.
- `POST /api/trips`: Create new trip.

### Phase 2: Frontend "Wow" Factors
#### [NEW] [UI Architecture]
- Setup `client/` directory (Vite).
- Install **Tailwind CSS** + **Framer Motion**.
- Create `Login` and `Signup` pages with smooth entry animations.
- Create `Dashboard` with a modern "Card" layout for trips.

### Phase 3: The Itinerary Builder (Complex Logic)
#### [NEW] [Builder Module]
- **Drag-and-Drop Interface**: Use `dnd-kit` to reorder stops.
- **Dynamic Forms**: Add cities and activities dynamically.
- **Real-time Budgeting**: Update total cost chart as activities are added (Client-side calculation for speed).

### Phase 4: Verification & Polish
- **Validation**: Add `zod` schema validation on both Client and Server (Robustness criteria).
- **Responsive Check**: Ensure mobile view works perfectly.

## Verification Plan
1.  **Backend**: Test API endpoints using `curl` or Postman (mock).
2.  **Database**: Verify `npx prisma studio` opens and shows data models.
3.  **Frontend**: Manual walkthrough of the Trip Creation flow.
