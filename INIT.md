# Claude Powerline - Project Overview 🚀

## 🏗️ Architecture & Structure

### Main Folder Layout
```
claude-statusline/
├── src/                    # Core source code
│   ├── config/            # Configuration management
│   ├── segments/          # Statusline segment implementations
│   ├── themes/            # Theme definitions and styling
│   ├── utils/             # Utility functions and helpers
│   ├── index.ts           # Main entry point
│   └── powerline.ts       # Core powerline logic
├── test/                  # Test suite (Jest)
├── images/                # Screenshots and visual assets
├── dist/                  # Built output (generated)
└── docs/                  # Documentation (if exists)
```

### Key Files
- **`package.json`** - Project metadata, dependencies, scripts
- **`.claude-powerline.json`** - Default configuration with custom theme
- **`tsconfig.json`** - TypeScript configuration
- **`tsup.config.ts`** - Build configuration (tsup bundler)
- **`jest.config.js`** - Testing configuration

## ✨ Current Features

### Core Functionality
- **Vim-style powerline statusline** for Claude Code
- **Real-time usage tracking** with cost monitoring
- **Git integration** with branch status, commits, working tree
- **Performance metrics** including response times and session data
- **Multi-line layouts** to prevent cutoff issues

### Statusline Segments
1. **Directory** - Current working directory with basename option
2. **Model** - Claude model information
3. **Session** - Session duration and type
4. **Today** - Daily usage tracking with budget alerts
5. **Block** - Cost tracking with burn rate monitoring
6. **Version** - Claude version display
7. **Metrics** - Response times, duration, message counts
8. **Context** - Context usage with auto-compact
9. **Git** - Comprehensive git status (branch, commits, working tree)
10. **Tmux** - Tmux session integration (optional)

### Themes & Customization
- **5 built-in themes**: Dark, Light, Nord, Tokyo Night, Rose Pine
- **Custom theme support** with transparent backgrounds
- **Powerline and minimal styles** with configurable separators
- **Color customization** for all segments

## 🔄 Recent Development

### Latest Version: 1.6.2 (2025-08-17)
- Bug fixes for npm downloads badge
- Streamlined documentation
- Comprehensive segments demo
- Enhanced example configurations

### Recent Features (v1.5.0+)
- Today and block usage segments with timezone fixes
- Version segment for Claude version display
- Transparent background support in custom themes
- Enhanced cost calculation and burn rate monitoring
- Multi-path Claude discovery with environment support

## 🛠️ Tech Stack

### Core Technologies
- **Language**: TypeScript 5.0+
- **Runtime**: Node.js 18+
- **Module System**: ES Modules (ESM)
- **Build Tool**: tsup (TypeScript bundler)

### Development Tools
- **Testing**: Jest with ts-jest
- **Linting**: ESLint 9.x with TypeScript support
- **Formatting**: Prettier
- **Release**: Semantic Release with changelog generation

### Key Dependencies
- **Core**: Node.js built-ins for file system, process management
- **Git**: Native git command integration
- **Theming**: Custom color system with powerline styling
- **Caching**: TTL-based caching for performance optimization

## 📊 Development Status

### Active Areas
- **Performance optimization** with caching and timeouts
- **Configuration management** improvements
- **Theme system** enhancements
- **Testing coverage** expansion
- **Documentation** updates and examples

### Overall Progress
- **Stable Release**: Currently at v1.6.2
- **Active Development**: Regular updates and bug fixes
- **Community**: Featured in Awesome Claude Code collection
- **Documentation**: Comprehensive README with examples
- **Testing**: Jest test suite with coverage reporting

## 📋 Development Workflow

### Available Scripts
```bash
npm run build          # Build production bundle
npm run dev            # Watch mode development
npm run start          # Run built version
npm run lint           # ESLint checking
npm run lint:fix       # Auto-fix linting issues
npm run test           # Run test suite
npm run test:watch     # Watch mode testing
npm run test:coverage  # Generate coverage report
```

### Build Process
1. **TypeScript compilation** via tsup
2. **ESM bundle generation** for distribution
3. **Type definitions** included in build
4. **Pre-publish validation** (lint + build)

## 🎯 Key Development Patterns

### Segment Architecture
- **Modular design** with individual segment files
- **Configuration-driven** enabling/disabling
- **Performance optimized** with caching strategies
- **Theme-aware** styling system

### Configuration System
- **JSON-based** configuration files
- **Environment-aware** Claude path discovery
- **Default fallbacks** for missing settings
- **Runtime validation** of configuration

### Testing Strategy
- **Unit tests** for individual segments
- **Integration tests** for core functionality
- **Configuration tests** for various setups
- **Performance tests** for caching and timeouts

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Claude Code installed
- Powerline fonts (installable via CLI)

### Quick Start
```bash
# Install powerline fonts
npx -y @owloops/claude-powerline --install-fonts

# Run with default configuration
npx @owloops/claude-powerline

# Customize via .claude-powerline.json
```

### Development Setup
```bash
git clone <repository>
npm install
npm run dev          # Watch mode
npm run test         # Run tests
npm run build        # Production build
```

---

**Project**: Claude Powerline  
**Version**: 1.6.2  
**Status**: Active Development  
**License**: MIT  
**Maintainer**: Owloops
