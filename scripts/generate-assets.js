// Generates the placeholder app icon / splash / adaptive-icon PNGs.
// Zero dependencies — encodes PNGs directly with node's zlib.
// Usage: node scripts/generate-assets.js
const zlib = require('zlib');
const fs = require('fs');
const path = require('path');

const NAVY = [30, 58, 138, 255]; // #1e3a8a
const WHITE = [255, 255, 255, 255];
const CLEAR = [0, 0, 0, 0];

const CRC_TABLE = (() => {
  const t = new Int32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c;
  }
  return t;
})();

function crc(buf) {
  let c = 0xffffffff;
  for (let n = 0; n < buf.length; n++)
    c = CRC_TABLE[(c ^ buf[n]) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const body = Buffer.concat([Buffer.from(type, 'ascii'), data]);
  const crcBuf = Buffer.alloc(4);
  crcBuf.writeUInt32BE(crc(body));
  return Buffer.concat([len, body, crcBuf]);
}

function encodePng(width, height, pixelAt) {
  const raw = Buffer.alloc(height * (1 + width * 4));
  let off = 0;
  for (let y = 0; y < height; y++) {
    raw[off++] = 0; // filter: none
    for (let x = 0; x < width; x++) {
      const [r, g, b, a] = pixelAt(x, y);
      raw[off++] = r;
      raw[off++] = g;
      raw[off++] = b;
      raw[off++] = a;
    }
  }
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 6; // color type RGBA
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk('IHDR', ihdr),
    chunk('IDAT', zlib.deflateSync(raw, { level: 9 })),
    chunk('IEND', Buffer.alloc(0)),
  ]);
}

// Home plate: a square top over a triangular point, centred at (cx, cy) with
// overall width w. Returns a coverage test for pixel (x, y).
function makePlate(cx, cy, w) {
  const half = w / 2;
  const squareTop = cy - w * 0.45;
  const squareBottom = cy + w * 0.05;
  const point = cy + w * 0.55;
  return (x, y) => {
    if (y >= squareTop && y <= squareBottom) return Math.abs(x - cx) <= half;
    if (y > squareBottom && y <= point) {
      const t = (y - squareBottom) / (point - squareBottom);
      return Math.abs(x - cx) <= half * (1 - t);
    }
    return false;
  };
}

function writePng(name, width, height, pixelAt) {
  const file = path.join(__dirname, '..', 'assets', name);
  fs.writeFileSync(file, encodePng(width, height, pixelAt));
  console.log('wrote', name, `${width}x${height}`);
}

// cy is nudged up by 0.05*w so the plate (whose visual midpoint sits below
// its geometric centre) lands optically centred.
const iconPlate = makePlate(512, 486, 520);
writePng('icon.png', 1024, 1024, (x, y) => (iconPlate(x, y) ? WHITE : NAVY));

// Android adaptive icon: foreground/monochrome are the plate on transparency
// (kept inside the safe zone), background a solid navy square.
const adaptivePlate = makePlate(512, 492, 400);
writePng('android-icon-foreground.png', 1024, 1024, (x, y) =>
  adaptivePlate(x, y) ? WHITE : CLEAR,
);
writePng('android-icon-monochrome.png', 1024, 1024, (x, y) =>
  adaptivePlate(x, y) ? WHITE : CLEAR,
);
writePng('android-icon-background.png', 1024, 1024, () => NAVY);

// Splash icon: navy plate on transparency (splash background set in app.json).
const splashPlate = makePlate(512, 490, 440);
writePng('splash-icon.png', 1024, 1024, (x, y) =>
  splashPlate(x, y) ? NAVY : CLEAR,
);

const faviconPlate = makePlate(24, 23, 26);
writePng('favicon.png', 48, 48, (x, y) => (faviconPlate(x, y) ? WHITE : NAVY));
