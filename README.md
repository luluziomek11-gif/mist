# AI WORLD

AI WORLD is a 2D web-based game built with Phaser 3 and TypeScript. The style resembles classic Pokémon games (Nintendo DS era). The game features living AI assistants (Ultron and Edith) that have their own schedules, can move around, communicate with the player, and execute tasks.

## Getting Started

### Prerequisites

- Node.js (v18+)
- npm or yarn

### Installation

1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```

### Running Locally

Start the Vite development server:
```bash
npm run dev
```

### Building for Production

Build the project into a static site (in the `dist/` directory):
```bash
npm run build
```

## Environment Variables

Copy `.env.example` to `.env` and fill in the required API keys before starting to use real AI models (in later stages).

## Architecture

The project is built around the following technologies:
- **TypeScript**: Typed language for reliability.
- **Phaser 3**: 2D game engine used for rendering the tilemap, sprites, and physics.
- **Vite**: Fast frontend build tool.

### Modules:
- `src/main.ts`: Entry point initializing the game.
- `src/game/scenes/MainScene.ts`: Scene managing the world, map, collisions, and entities.
- `src/game/entities/`: Contains classes for the Player and NPCs.
- `public/assets/`: Stores the static assets (images, tilemaps).

## Adding New Content

Please refer to:
- `docs/ADD_CHARACTERS.md`
- `docs/ADD_ROOMS.md`

## Next Stages

- **Stage 2**: NPC Movement systems, pathfinding.
- **Stage 3**: Dialogue clouds and AI model integration.
- **Stage 4**: Central task computer system.
- **Stage 5**: AI World Disk for saving generated projects.
- **Stage 6**: Memory system and optimizations.
