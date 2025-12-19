# PhotoAI 🎨✨

> Transform your vision into reality with enterprise-grade AI-powered image generation

[![Next.js](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 🌟 Features

- **AI Image Generation** - Create stunning, professional-quality images in seconds
- **Multiple AI Models** - Choose from various AI models for different styles
- **Real-time Preview** - See your creations come to life instantly
- **Image Packs** - Pre-configured collections for specific use cases
- **Professional Dashboard** - Manage all your AI-generated images
- **Dark Theme** - Beautiful black theme throughout the application
- **Responsive Design** - Works perfectly on all devices
- **Clerk Authentication** - Secure user authentication and management

## 🚀 Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **UI Components**: [Shadcn UI](https://ui.shadcn.com/)
- **Authentication**: [Clerk](https://clerk.com/)
- **AI Integration**: [Fal.ai](https://fal.ai/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Package Manager**: [pnpm](https://pnpm.io/)

## 📦 Installation

1. **Clone the repository**
```bash
git clone https://github.com/Suryanshu-Nabheet/PhotoAi.git
cd PhotoAi
```

2. **Install dependencies**
```bash
pnpm install
```

3. **Set up environment variables**
```bash
cp .env.example .env.local
```

Add your environment variables:
```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# Fal.ai API
FAL_KEY=your_fal_api_key
```

4. **Run the development server**
```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## 🏗️ Project Structure

```
photo-ai/
├── app/                      # Next.js app directory
│   ├── api/                 # API routes
│   ├── dashboard/           # Dashboard page
│   ├── page.tsx            # Landing page
│   └── layout.tsx          # Root layout
├── components/
│   ├── landing/            # Landing page components
│   ├── dashboard/          # Dashboard components
│   └── ui/                 # Shadcn UI components
├── lib/                    # Utility functions
├── hooks/                  # Custom React hooks
├── public/                 # Static assets
└── styles/                 # Global styles
```

## 🎨 Features Overview

### Landing Page
- Hero section with gradient underline
- AI-generated image carousel
- FAQ section
- Professional footer with social links

### Dashboard
- **Camera Tab**: View and manage your image gallery
- **Generate Tab**: Create new AI images with custom prompts
- **Packs Tab**: Use pre-configured image generation packs

### Authentication
- Secure sign-in with Clerk
- User profile management
- Protected routes

## 🛠️ Development

### Available Scripts

```bash
# Development
pnpm dev          # Start development server

# Build
pnpm build        # Build for production
pnpm start        # Start production server

# Linting
pnpm lint         # Run ESLint
```

### Adding New Components

We use Shadcn UI for components. To add a new component:

```bash
pnpm dlx shadcn@latest add [component-name]
```

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guidelines](CONTRIBUTING.md) and [Code of Conduct](CODE_OF_CONDUCT.md).

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Suryanshu Nabheet**

- GitHub: [@Suryanshu-Nabheet](https://github.com/Suryanshu-Nabheet)
- LinkedIn: [Suryanshu Nabheet](https://www.linkedin.com/in/suryanshu-nabheet/)
- Twitter: [@suryanshuxdev](https://x.com/suryanshuxdev)
- YouTube: [@suryanshunabheet](https://www.youtube.com/@suryanshunabheet)

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing framework
- [Shadcn](https://ui.shadcn.com/) for the beautiful UI components
- [Clerk](https://clerk.com/) for authentication
- [Fal.ai](https://fal.ai/) for AI image generation
- [Vercel](https://vercel.com/) for hosting

## 📧 Support

For support, email or open an issue in the GitHub repository.

---

<div align="center">
  Made with ❤️ by Suryanshu Nabheet
</div>
