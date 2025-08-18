# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is `@owloops/claude-powerline`, a TypeScript package that provides a vim-style powerline statusline for Claude Code with real-time usage tracking, git integration, and custom themes.

The package reads hook data from Claude Code via stdin and outputs formatted statuslines with segments showing directory info, git status, model info, usage costs, context information, and more.

## Development Commands

### Build & Development
- `npm run build` - Build the project using tsup
- `npm run dev` - Build and watch for changes using tsup --watch
- `npm run start` - Run the built CLI tool from dist/index.js

### Testing & Quality
- `npm test` - Run all tests using Jest
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage report
- `npm run lint` - Lint source code using ESLint
- `npm run lint:fix` - Lint and auto-fix issues

### Publishing
- `npm run prepublishOnly` - Runs lint and build before publishing

## Architecture

### Core Components

**Main Entry Point (`src/index.ts`)**
- CLI interface that processes Claude Code hook data from stdin
- Handles font installation via `--install-fonts` flag
- Creates PowerlineRenderer instance and outputs statusline

**PowerlineRenderer (`src/powerline.ts`)**
- Main orchestrator class that generates multi-line statuslines
- Conditionally loads data providers based on enabled segments
- Renders segments using theme colors and powerline separators

**Configuration System (`src/config/`)**
- `loader.ts` - Loads configuration from CLI args, env vars, and config files
- `defaults.ts` - Default configuration with all segment options
- Supports project-local `.claude-powerline.json` and user configs

**Segment System (`src/segments/`)**
- Modular segment providers for different statusline components
- Each segment has its own data provider and rendering logic
- Core segments: directory, git, model, session, block, today, context, metrics, tmux, version

**Theme System (`src/themes/`)**
- Built-in themes: dark, light, nord, tokyo-night, rose-pine
- Custom theme support with hex color definitions
- Color conversion utilities for terminal ANSI codes

**Utilities (`src/utils/`)**
- `claude.ts` - Claude Code integration helpers
- `colors.ts` - ANSI color conversion and manipulation
- `formatters.ts` - Text formatting utilities
- `budget.ts` - Cost tracking and budget calculations
- `logger.ts` - Debug logging functionality

### Key Data Flow

1. Hook data received from Claude Code stdin (session_id, workspace, model info)
2. Configuration loaded from CLI args/env vars/config files
3. PowerlineRenderer conditionally loads data providers for enabled segments
4. Each segment renders its content with theme colors
5. Multi-line statusline output formatted with powerline separators

### Segment Architecture

Each segment follows a provider pattern:
- **Data Provider**: Fetches/calculates segment data (e.g., `UsageProvider`, `GitService`)
- **Segment Config**: TypeScript interface defining segment options
- **Renderer**: Formats segment data with colors and symbols

Example segment types:
- `git` - Shows branch, status, commits ahead/behind
- `session` - Real-time conversation usage (cost/tokens)
- `block` - 5-hour billing window usage
- `today` - Daily usage with budget alerts
- `context` - Context window usage percentage

## Testing

Tests are located in `test/` directory using Jest with ts-jest preset for ESM modules. Test timeout is set to 30 seconds for integration tests that may involve file system operations.

## Build Configuration

- **TypeScript**: Strict mode enabled with ESNext target and module
- **tsup**: Bundles to ESM format with type declarations and source maps
- **ESLint**: TypeScript-aware linting with Prettier integration
- **Jest**: ESM-configured testing with TypeScript support

The package is built as an ES module with a CLI binary at `dist/index.js` that includes the shebang for direct execution.