const fs = require('fs');
const { createCanvas } = require('canvas');

const generateSprite = (filename, color, width = 32, height = 32, isTileset = false) => {
    let w = width;
    let h = height;

    if (!isTileset) {
        w = width * 3;  // 3 frames per animation (e.g. walk left, idle, walk right)
        h = height * 4; // 4 directions (down, left, right, up)
    }

    const canvas = createCanvas(w, h);
    const ctx = canvas.getContext('2d');

    if (isTileset) {
        // Floor (0)
        ctx.fillStyle = '#C0C0C0';
        ctx.fillRect(0, 0, 32, 32);
        ctx.strokeStyle = '#A0A0A0';
        ctx.strokeRect(0, 0, 32, 32);

        // Wall (1)
        ctx.fillStyle = '#8B4513';
        ctx.fillRect(32, 0, 32, 32);

        // Couch (2)
        ctx.fillStyle = '#000080';
        ctx.fillRect(64, 0, 32, 32);

        // PC Desk (3)
        ctx.fillStyle = '#696969';
        ctx.fillRect(96, 0, 32, 32);

        // Wall Top (4)
        ctx.fillStyle = '#5C4033';
        ctx.fillRect(128, 0, 32, 32);

    } else {
        // Draw basic character sprite
        for (let row = 0; row < 4; row++) {
            for (let col = 0; col < 3; col++) {
                const x = col * width;
                const y = row * height;

                ctx.fillStyle = color;
                ctx.fillRect(x + 4, y + 8, width - 8, height - 8); // Body

                // Head
                ctx.fillStyle = '#FFC0CB'; // Skin color placeholder
                if(filename.includes('ultron')) {
                    ctx.fillStyle = '#D3D3D3'; // Silver for Ultron
                }
                ctx.fillRect(x + 8, y + 2, width - 16, 12);

                // Eyes (direction based)
                ctx.fillStyle = '#000';
                if(filename.includes('ultron')) ctx.fillStyle = '#FF0000'; // Red eyes for Ultron

                if (row === 0) { // Down
                    ctx.fillRect(x + 10, y + 6, 2, 2);
                    ctx.fillRect(x + 20, y + 6, 2, 2);
                } else if (row === 1) { // Left
                    ctx.fillRect(x + 10, y + 6, 2, 2);
                } else if (row === 2) { // Right
                    ctx.fillRect(x + 20, y + 6, 2, 2);
                } else if (row === 3) { // Up
                    // No eyes
                }
            }
        }
    }

    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync(`public/assets/${filename}.png`, buffer);
    console.log(`Generated ${filename}.png`);
};

generateSprite('player', '#0000FF'); // Blue player
generateSprite('ultron', '#808080'); // Grey body Ultron
generateSprite('edith', '#000000'); // Black suit Edith
generateSprite('tiles', '', 160, 32, true); // 5 tiles
