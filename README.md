# Aetheria NFT Marketplace

[aureliabutton]

A visually stunning, high-performance NFT marketplace featuring advanced filtering, immersive product showcases, and a seamless digital collecting experience. Designed with a "Cyber-Noir" aesthetic, Aetheria prioritizes visual hierarchy, utilizing high-quality imagery and negative space to showcase digital artwork effectively.

## 🚀 Project Overview

Aetheria is a premium platform designed for digital artists and collectors. It features a sophisticated dark-themed UI with vibrant gradient accents, glassmorphism elements, and smooth micro-interactions.

### Key Features

*   **Immersive Visual Experience**: A "Cyber-Noir" aesthetic featuring deep slate backgrounds, electric violet/cyan accents, and glassmorphic UI elements.
*   **Dynamic Home View**: Full-height hero section, trending auctions, and curated collections with smooth animations.
*   **Advanced Marketplace**: Responsive grid layout with a collapsible sidebar for filtering by price, category, and status.
*   **Detailed Asset Pages**: Dedicated views for NFTs showing high-resolution imagery, ownership history, attribute stats, and purchase actions.
*   **Responsive Design**: Mobile-first architecture ensuring a flawless experience across all devices, utilizing slide-over sheets for mobile filtering.
*   **High Performance**: Built on Cloudflare Workers and React for lightning-fast load times and edge-ready scalability.

## 🛠️ Technology Stack

**Frontend:**
*   **Framework**: React 18 (Vite)
*   **Styling**: Tailwind CSS v3, Shadcn UI, Framer Motion
*   **State Management**: Zustand
*   **Routing**: React Router DOM v6
*   **Icons**: Lucide React

**Backend & Infrastructure:**
*   **Runtime**: Cloudflare Workers
*   **Framework**: Hono
*   **Persistence**: Cloudflare Durable Objects
*   **Language**: TypeScript

## 📦 Prerequisites

Before you begin, ensure you have the following installed:
*   [Node.js](https://nodejs.org/) (v18 or higher)
*   [Bun](https://bun.sh/) (v1.0 or higher)
*   [Wrangler](https://developers.cloudflare.com/workers/wrangler/install-and-update/) (Cloudflare CLI)

## ⚡ Installation & Setup

1.  **Clone the repository**
    ```bash
    git clone https://github.com/your-username/aetheria-nft-market.git
    cd aetheria-nft-market
    ```

2.  **Install dependencies**
    This project uses Bun for package management.
    ```bash
    bun install
    ```

3.  **Start the development server**
    This will start the Vite development server and the Cloudflare Worker proxy.
    ```bash
    bun run dev
    ```
    Open http://localhost:3000 to view the application.

## 🏗️ Project Structure

*   `src/`: Frontend React application code.
    *   `components/`: Reusable UI components (Shadcn UI).
    *   `pages/`: Application views (Home, Marketplace, Detail).
    *   `hooks/`: Custom React hooks.
    *   `lib/`: Utilities and API clients.
*   `worker/`: Cloudflare Worker backend code.
    *   `index.ts`: Worker entry point.
    *   `user-routes.ts`: API route definitions.
    *   `entities.ts`: Durable Object entity definitions.
*   `shared/`: Types and constants shared between frontend and backend.

## 🚀 Deployment

This project is configured to deploy directly to Cloudflare Workers.

### One-Click Deployment

[aureliabutton]

### Manual Deployment

To deploy the application manually using Wrangler:

1.  **Login to Cloudflare**
    ```bash
    npx wrangler login
    ```

2.  **Deploy**
    ```bash
    bun run deploy
    ```

This command builds the frontend assets and deploys the Worker script along with the static assets to Cloudflare's global network.

## 📝 License

This project is licensed under the MIT License.