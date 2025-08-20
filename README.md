# Snake Game

[![CI](https://github.com/vkuprin/snake/actions/workflows/ci.yml/badge.svg)](https://github.com/vkuprin/snake/actions/workflows/ci.yml)
[![Code Quality](https://github.com/vkuprin/snake/actions/workflows/quality.yml/badge.svg)](https://github.com/vkuprin/snake/actions/workflows/quality.yml)
[![Deploy](https://github.com/vkuprin/snake/actions/workflows/deploy.yml/badge.svg)](https://github.com/vkuprin/snake/actions/workflows/deploy.yml)

A classic Snake game built with React 19, TypeScript, and Tailwind CSS. This implementation features modern React patterns, comprehensive testing, and a clean, responsive design.

## 🎮 Game Features

- **Classic Snake Gameplay**: Navigate the snake to eat food and grow longer
- **Automatic Movement**: Snake moves continuously with direction changes via keyboard
- **Scoring System**: Earn 3 points per food item consumed
- **Win/Lose Conditions**:
  - Win by reaching 30 points
  - Lose by hitting walls or yourself
- **Configurable Board Size**: Default 20×20 grid (easily customizable)
- **Responsive Design**: Works on desktop and mobile devices
- **Pause/Resume**: Spacebar to pause and resume gameplay
- **Game Reset**: Reset functionality to start over

## 🚀 Quick Start

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd snake
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to play the game

### Building for Production

```bash
npm run build
npm run preview
```

## 🎯 How to Play

### Controls

- **Arrow Keys** or **WASD**: Change snake direction
- **Spacebar**: Pause/Resume game
- **R**: Reset game
- **Enter**: Start new game (when game over)

### Gameplay Rules

1. **Movement**: The snake moves automatically in the current direction
2. **Direction Changes**: Use controls to change direction (cannot reverse directly)
3. **Food**: Blue squares appear randomly on the board
4. **Growth**: Snake grows by one segment each time food is eaten
5. **Scoring**: Each food item gives +3 points
6. **Game Over**: Occurs when:
   - Snake hits any wall
   - Snake collides with itself
   - Score reaches 30 points (victory!)

## 🏗️ Technical Architecture

### Technology Stack

- **React 19.1.1**: Latest React with functional components and hooks
- **TypeScript**: Full type safety and better development experience
- **Vite**: Fast build tool and development server
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Vitest**: Modern testing framework
- **React Testing Library**: Component testing utilities

### Project Structure

```
src/
├── components/          # React components
│   ├── GameBoard.tsx   # Game board rendering
│   ├── GameControls.tsx # Control buttons and status
│   ├── ScoreDisplay.tsx # Score and progress display
│   └── SnakeGame.tsx   # Main game component
├── hooks/              # Custom React hooks
│   ├── useSnakeGame.ts # Game state management
│   └── useKeyboardControls.ts # Keyboard input handling
├── types/              # TypeScript type definitions
│   └── game.ts         # Game-related types
├── utils/              # Utility functions
│   └── gameLogic.ts    # Core game logic
└── test/               # Test configuration
    └── setup.ts        # Test setup file
```

### Key Design Patterns

1. **Custom Hooks**: Game logic separated into reusable hooks
2. **Type Safety**: Comprehensive TypeScript types for all game entities
3. **Component Composition**: Small, focused components with clear responsibilities
4. **Immutable State**: Game state updates follow immutable patterns
5. **Event-Driven Architecture**: Keyboard events and game loop separation
6. **Modern TypeScript**: Uses `const` objects with `as const` instead of enums

## 🧪 Testing

The project includes comprehensive unit tests covering:

- **Game Logic**: Core game mechanics and rules
- **Components**: UI component behavior and rendering
- **Hooks**: Custom hook functionality and state management
- **User Interactions**: Keyboard controls and button clicks

### Running Tests

```bash
# Run all tests once
npm run test:run

# Run tests in watch mode
npm test

# Run tests with UI
npm run test:ui
```

### Test Coverage

- **57 tests** covering all major functionality
- **Game Logic**: Movement, collision detection, scoring
- **Components**: Rendering, user interactions, state display
- **Hooks**: State management, keyboard controls

## ⚙️ Configuration

### Game Configuration

The game can be easily configured by modifying the `DEFAULT_CONFIG` in `src/utils/gameLogic.ts`:

```typescript
export const DEFAULT_CONFIG: GameConfig = {
  boardSize: 20, // Board dimensions (20×20)
  tickInterval: 200, // Movement speed in milliseconds
  maxScore: 30, // Score needed to win
};
```

### Board Size Customization

To change the board size, simply pass a custom config to the `SnakeGame` component:

```typescript
<SnakeGame config={{ boardSize: 15, tickInterval: 150, maxScore: 45 }} />
```

## 🎨 Styling

The game uses Tailwind CSS for styling with a clean, modern design:

- **Responsive Layout**: Adapts to different screen sizes
- **Color Scheme**:
  - Snake Head: Green (darker)
  - Snake Body: Green (lighter)
  - Food: Blue
  - Board: Light gray with borders
- **Interactive Elements**: Hover effects on buttons
- **Game Over Modal**: Overlay with game results

## 🔧 Development

### Available Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run preview`: Preview production build
- `npm run lint`: Run ESLint
- `npm run format`: Format code with Prettier
- `npm run format:check`: Check code formatting
- `npm run typecheck`: Run TypeScript type checking
- `npm test`: Run tests in watch mode
- `npm run test:run`: Run tests once
- `npm run test:ui`: Run tests with UI

### Code Quality

- **ESLint**: Configured with React and TypeScript rules
- **Prettier**: Code formatting with consistent style
- **TypeScript**: Strict mode enabled for maximum type safety
- **Testing**: Comprehensive test suite with high coverage
- **Modern Patterns**: Uses const objects instead of enums for better type safety

## 🚀 CI/CD

The project includes comprehensive GitHub Actions workflows:

### Continuous Integration (`ci.yml`)

- **Multi-Node Testing**: Tests on Node.js 18 and 20
- **Format Check**: Ensures code follows Prettier formatting
- **Linting**: ESLint checks for code quality
- **Type Checking**: TypeScript compilation verification
- **Unit Tests**: Full test suite execution
- **Build Verification**: Production build validation
- **Artifact Upload**: Build files saved for deployment

### Code Quality (`quality.yml`)

- **Comprehensive Quality Checks**: All quality gates in one job
- **Test Coverage**: Unit tests with coverage reporting
- **Security Audit**: npm audit for vulnerabilities
- **Dependency Check**: Outdated package detection
- **Build Size Analysis**: Monitor build output size

### Deployment (`deploy.yml`)

- **GitHub Pages**: Automatic deployment to GitHub Pages
- **Quality Gates**: Only deploys if all checks pass
- **Production Build**: Optimized build for deployment
- **Manual Trigger**: Can be triggered manually via workflow_dispatch

### Running CI Locally

```bash
# Run all quality checks locally
npm run format:check
npm run lint
npm run typecheck
npm run test:run
npm run build
```

## 📝 Assumptions and Design Decisions

1. **Board Size**: Default 20×20 provides good balance of challenge and playability
2. **Movement Speed**: 200ms interval gives responsive but manageable gameplay
3. **Scoring**: 3 points per food item creates meaningful progression
4. **Win Condition**: 30 points provides achievable but challenging goal
5. **Food Placement**: Random placement excluding snake positions
6. **Direction Changes**: Prevented direct reversal to avoid accidental self-collision
7. **Auto-Start**: Game starts automatically when component mounts
8. **Type Safety**: Uses const objects with `as const` instead of enums for better TypeScript patterns

## 🚀 Future Enhancements

Potential improvements for future versions:

- **Difficulty Levels**: Multiple speed and board size options
- **High Scores**: Local storage for best scores
- **Sound Effects**: Audio feedback for actions
- **Animations**: Smooth movement transitions
- **Multiplayer**: Local or online multiplayer support
- **Power-ups**: Special food items with different effects
- **Themes**: Multiple visual themes and color schemes

## 📄 License

This project is open source and available under the MIT License.
