# Adding New Rooms

To expand the AI WORLD by adding a new room:

1. **Tilemap Expansion:**
   - The game currently uses a programmatically generated, simple tilemap structure inside `src/game/scenes/MainScene.ts` (using arrays).
   - To add a new room, expand the `level` array by adding new rows and columns representing floors, walls, and furniture.
   - For example:
     ```typescript
     const level = [
       [1, 1, 1, 1, 1],
       [1, 0, 0, 0, 1],
       [1, 0, 2, 0, 1],
       [1, 1, 1, 1, 1]
     ];
     ```
   - Make sure your new walls connect seamlessly to existing corridors.

2. **Tiled Integration (Recommended for Future):**
   - As the game grows, we recommend migrating away from the hardcoded `level` array.
   - Use [Tiled Map Editor](https://www.mapeditor.org/) to build your `.json` map format.
   - Export the map, place it in `public/assets/`, and update the tile loading logic in `MainScene.ts` using `this.load.tilemapTiledJSON(...)`.

3. **Collision Adjustment:**
   - Verify that all new walls and furniture tiles have collisions correctly configured.
   - `this.wallsLayer.setCollisionByExclusion([-1, 0]);` usually handles this if `0` is floor.

4. **Doors / Transitions:**
   - If rooms are separated by closed doors, add interaction logic to the player to open doors or use separate scenes for completely separate areas. (Currently, the game uses one continuous scene).
