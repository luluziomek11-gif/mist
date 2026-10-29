# Adding New Characters

To add a new NPC character to the game:

1. **Sprite Sheet Asset:**
   - Place the character's spritesheet (e.g. `new_char.png`) into `public/assets/`.
   - The spritesheet should have frames for 4 directions (down, left, right, up), similar to the Pokémon DS style.

2. **Load Asset:**
   - Open `src/game/scenes/MainScene.ts`.
   - In the `preload()` method, load the spritesheet:
     ```typescript
     this.load.spritesheet('new_char', 'assets/new_char.png', { frameWidth: 32, frameHeight: 32 });
     ```

3. **Define Animations:**
   - Still in `MainScene.ts`, inside `create()`, define animations for the new character:
     ```typescript
     this.anims.create({
       key: 'new_char_down',
       frames: this.anims.generateFrameNumbers('new_char', { start: 0, end: 2 }),
       frameRate: 10,
       repeat: -1
     });
     // Do the same for left, right, up
     ```

4. **Spawn Entity:**
   - Instantiate an NPC in the scene:
     ```typescript
     const newChar = new NPC(this, xPos, yPos, 'new_char');
     this.physics.add.collider(newChar, this.wallsLayer); // Ensure collisions with walls
     // If interacting with player:
     this.physics.add.collider(newChar, this.player);
     ```

5. **AI Profile (Future):**
   - In future stages, when AI models are integrated, you will add a new character profile containing their system prompt, traits, and available functions in the `src/ai/profiles/` directory.
