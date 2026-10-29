const fs = require('fs');
const path = require('path');
const { createCanvas } = require('canvas');

const dir = path.join(__dirname, 'public/assets');
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
}

// 3 frames per direction: stand, step left, step right
// 4 directions: down (row 0), left (row 1), right (row 2), up (row 3)
const sheetWidth = 3 * 32;
const sheetHeight = 4 * 32;

function drawPixelMap(ctx, ox, oy, scale, pixelMap, palette) {
    for (let r = 0; r < pixelMap.length; r++) {
        for (let c = 0; c < pixelMap[r].length; c++) {
            const char = pixelMap[r][c];
            if (char !== ' ' && palette[char]) {
                ctx.fillStyle = palette[char];
                ctx.fillRect(ox + c * scale, oy + r * scale, scale, scale);
            }
        }
    }
}

// A simple 16x16 character design
const charMapDown = [
    "                ",
    "      HHHH      ",
    "     HHHHHH     ",
    "     HSSSSH     ",
    "     HSEESH     ",
    "     HSSSSH     ",
    "      SSSS      ",
    "     TBBBBT     ",
    "    TTBBBBTT    ",
    "    TTBBBBTT    ",
    "    SSBBBBSS    ",
    "      PPPP      ",
    "      PPPP      ",
    "      P  P      ",
    "     LL  LL     ",
    "                "
];

// Reusable parts to modify per frame
function drawCharacter(ctx, x, y, type, direction, frame) {
    // 0 = down, 1 = left, 2 = right, 3 = up
    // frame: 0 = stand, 1 = step1, 2 = step2

    const scale = 2; // 16x16 to 32x32

    let palette;
    if (type === 'player') {
        palette = {
            'H': '#8B4513', // Hair
            'S': '#FFC0CB', // Skin
            'E': '#000000', // Eye
            'T': '#0000FF', // Sleeve
            'B': '#0000FF', // Shirt
            'P': '#555555', // Pants
            'L': '#000000'  // Shoes
        };
    } else if (type === 'ultron') {
        palette = {
            'H': '#888888', // Head top
            'S': '#AAAAAA', // Metal skin
            'E': '#FF0000', // Red eyes
            'T': '#777777', // Arm
            'B': '#999999', // Body
            'P': '#666666', // Legs
            'L': '#444444'  // Feet
        };
    } else if (type === 'edith') {
        palette = {
            'H': '#4A2511', // Brown Hair
            'S': '#FFE4E1', // Skin
            'E': '#0000FF', // Glasses/Eyes
            'T': '#FFFFFF', // White sleeve
            'B': '#FFFFFF', // White shirt
            'P': '#1E90FF', // Blue jeans
            'L': '#333333'  // Shoes
        };
    }

    // This is highly simplified. A real generator would have different maps for different directions and frames.
    // To give a basic sense of animation, we'll just offset things or draw slightly different maps.

    ctx.save();
    ctx.translate(x, y);

    // Just drawing the down-facing map for everything for now, but flipping/modifying slightly to show effort
    // In a real scenario we'd use full pixel maps for all directions. Let's do a quick directional map generator.

    let map = charMapDown.map(row => row.split(''));

    if (direction === 1) { // Left
        // Move eyes to the left
        map[4] = "     H E  H     ".split('');
    } else if (direction === 2) { // Right
        // Move eyes to the right
        map[4] = "     H  E H     ".split('');
    } else if (direction === 3) { // Up
        // No eyes
        map[4] = "     HSSSSH     ".split('');
    }

    // Animation frames (leg movement)
    if (frame === 1) {
        map[14] = "     LL         ".split('');
    } else if (frame === 2) {
        map[14] = "         LL     ".split('');
    }

    // Draw the map
    drawPixelMap(ctx, 0, 0, scale, map.map(r => r.join('')), palette);

    if (type === 'edith') {
        // Draw glasses
        ctx.fillStyle = '#000000';
        ctx.fillRect(8*scale, 4*scale, 2*scale, scale);
        ctx.fillRect(11*scale, 4*scale, 2*scale, scale);
        ctx.fillRect(10*scale, 4*scale, scale, scale); // bridge
    }

    ctx.restore();
}

function generateSpriteSheet(name, type) {
    const canvas = createCanvas(sheetWidth, sheetHeight);
    const ctx = canvas.getContext('2d');

    // Clear transparent
    ctx.clearRect(0, 0, sheetWidth, sheetHeight);

    // 4 directions
    for (let dir = 0; dir < 4; dir++) {
        // 3 frames (stand, step1, step2) -> in our logic, step1, stand, step2 is a good order, but phaser uses frames 0,1,2
        for (let frame = 0; frame < 3; frame++) {
            drawCharacter(ctx, frame * 32, dir * 32, type, dir, frame);
        }
    }

    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync(path.join(dir, `${name}.png`), buffer);
    console.log(`Generated ${name}.png`);
}

generateSpriteSheet('player', 'player');
generateSpriteSheet('ultron', 'ultron');
generateSpriteSheet('edith', 'edith');

// Generate Tiles
function generateTiles() {
    const canvas = createCanvas(128, 128); // 4x4 tiles of 32x32
    const ctx = canvas.getContext('2d');

    // 0: Floor (Wood planks)
    ctx.fillStyle = '#D2B48C';
    ctx.fillRect(0, 0, 32, 32);
    ctx.fillStyle = '#C19A6B';
    for (let i=0; i<32; i+=8) {
        ctx.fillRect(0, i, 32, 2);
    }

    // 1: Wall (Brick)
    ctx.fillStyle = '#B22222';
    ctx.fillRect(32, 0, 32, 32);
    ctx.fillStyle = '#8B0000';
    for (let y=0; y<32; y+=8) {
        ctx.fillRect(32, y, 32, 2);
        for (let x=0; x<32; x+=8) {
            let offset = (y % 16 === 0) ? 0 : 4;
            ctx.fillRect(32 + x + offset, y, 2, 8);
        }
    }

    // 2: Furniture (Desk/Table)
    ctx.fillStyle = '#D2B48C'; // floor background
    ctx.fillRect(64, 0, 32, 32);
    ctx.fillStyle = '#8B4513';
    ctx.fillRect(64+4, 4, 24, 24); // table top
    ctx.fillStyle = '#5C3317';
    ctx.fillRect(64+6, 6, 20, 20);

    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync(path.join(dir, 'tiles.png'), buffer);
    console.log(`Generated tiles.png`);
}

generateTiles();
