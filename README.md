# bknd: UI Local, Code Remote

A Cloudflare Workers setup using the "UI local, code remote" approach. This architecture provides:

-  **Flexible Development**: Make configuration adjustments using the bknd Admin UI with full type safety
-  **Automatic Sync**: Configuration changes are automatically synchronized across your codebase
-  **Production Security**: Deploy a locked-down, code-only version that prevents runtime modifications

## How It Works

**Development Mode**: Flexible, UI-driven configuration with real-time synchronization
**Production Mode**: Static configuration with environment-injected secrets and zero runtime modifications

### Architecture

1. **Split Configuration**

   -  `bknd.config.ts` - CLI configuration with platform proxy for Cloudflare resource access
   -  `config.ts` - App configuration that prevents bundling CLI dependencies with your worker

2. **File Synchronization**

   -  Wrangler's `unenv` prevents filesystem access
   -  Built-in `devFsWrite` helpers use STDIO to synchronize configuration files

3. **Mode Switching**
   -  **Development**: "db" mode with UI-driven configuration
   -  **Production**: "code" mode with static configuration and environment secrets

## Scripts

### Development

-  **`dev`** - Vite development server for UI
-  **`dev:cf`** - Cloudflare Workers development server
-  **`predev`** - Auto-generates configuration before development

### Deployment

-  **`deploy`** - Deploy to Cloudflare Workers production
-  **`predeploy`** - Auto-generates production configuration
-  **`preview`** - Test production mode locally

### bknd CLI

-  **`bknd`** - Base CLI command with proxy and TypeScript support
-  **`bknd:types`** - Generate TypeScript definitions
-  **`bknd:config`** - Export configuration to `appconfig.json`
-  **`bknd:secrets`** - Generate `.env.example` template
-  **`bknd:assets`** - Copy UI assets to `public/`

### Utilities

-  **`typegen`** - Generate Wrangler and bknd types
-  **`postinstall`** - Auto-setup after installation (config, types, secrets, assets)

## Quick Start

1. **Install**: `npm install`
2. **Develop**: `npm run dev`
3. **Deploy**: `npm run deploy`

## Deployment Setup

### Before Deploy

-  Create required Cloudflare resources: `npx wrangler d1 create <database-name>`
-  Update `wrangler.json` with your resource IDs

### After Deploy

-  Set environment variables via Wrangler CLI or Cloudflare Dashboard
-  Variables should match those in your generated `.env.example`

### Environment Variables

Generate a template with: `npm run bknd:secrets`
