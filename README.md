# PhotoAI

**Created & Engineered by Suryanshu Nabheet**

A state-of-the-art, enterprise-grade SaaS platform for AI model training and image generation. Built with a focus on scalability, security, and clean architecture.

---

## 🚀 Instant Setup

### 1. Download & Install

```bash
git clone https://github.com/Suryanshu-Nabheet/PhotoAi.git
cd PhotoAi
pnpm install
```

### 2. Configure Secrets

```bash
cp .env.example .env
```

Edit `.env` and add your keys:

- **Clerk** (Authentication)
- **FAL.ai** (AI Engine)

### 3. Launch

```bash
pnpm prisma migrate dev
pnpm dev
```

That's it. The entire database system is automated.
Open [http://localhost:3000](http://localhost:3000).

---

## � Features

- **Custom Face Training**: Train your own LoRA models with 10 photos.
- **Professional Generation**: 5 Hardcoded styles (Headshots, Cinematic, Fashion, etc.).
- **Zero-Config Database**:
  - Automatically creates a local database on startup.
  - **No external setup required**.
  - All data stays on your machine (`dev.db`).
- **Enterprise Security**: Clerk authentication & full data isolation per user.

---

## 🛠 Tech Architecture

- **Core**: Next.js 15, TypeScript, Tailwind CSS
- **AI Engine**: FAL.ai (Flux/Stable Diffusion)
- **Database**: Prisma ORM + SQLite (Auto-managed)
- **Auth**: Clerk

## 📂 Data Privacy & Storage

This application follows a **"Local-First, Cloud-Compatible"** storage policy.

- **Local**: By default, all trained models and images are stored in `dev.db` on your machine. This file is **never committed** to Git.
- **Clean**: The code is structured to keep your repository spotless. Only source code is tracked; user data remains private.

---

## 📄 License & Attribution

**Designed and Developed by Suryanshu Nabheet.**
All rights reserved © 2025.

This codebase is polished, production-ready, and structured for immediate deployment.
