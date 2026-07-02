# Gray Arcade — asset shot-list

The engine needs **isolated sprites on transparent backgrounds**, not scene
illustrations. Generate each slot below as its own image (any size — the prep
script downscales with nearest-neighbor and snaps colors to the theme
palette), name it exactly as listed, drop it in this folder, then run:

```
node scripts/prep-sprites.mjs --theme cosmic
```

Only files present are processed; everything else keeps its programmatic
fallback. Art direction reference: the 8 concept images (purple-indigo space,
gold rings, crystal spikes, tech walkway, round astronaut with jetpack).

| File | Target size | Prompt guidance |
|---|---|---|
| `runner.png` | sheet, 32px frames | Horizontal sprite sheet, **4 square frames side by side**: run pose A, run pose B, jump (legs tucked), stumble (leaning forward). Small round astronaut robot, white suit, cyan visor, tiny jetpack flame, side view **facing right**. Transparent background. Generate at e.g. 2048×512 (4× 512px frames). |
| `ring_a.png` | 56×88 | One vertical glowing gold ring/hoop seen at a slight angle, baked outer glow, pixel-art style, transparent background. |
| `ring_b.png` | 56×88 | Same ring, second variant — slightly brighter core / different flicker state. |
| `rock_1.png` … `rock_4.png` | 28×28 each | Small magenta-pink crystal spike cluster on a dark rock base (like the concept art hazards), four distinct shapes, transparent background. |
| `gate.png` | 84×116 | Launch gate: portal arch / pad with gold energy glow, pixel-art, transparent background. |
| `ufo.png` | 20×10 | Tiny flying saucer, side view: gray metal body, cyan dome, transparent background. (Belly lights are drawn by the engine — leave them off.) |
| `bg_far.png` | 960×240 | Seamless horizontally-tiling plate: deep purple-indigo space, distant ringed planet(s), faint nebula. Left and right edges must match. Can be cropped/painted from the concept scenes. |
| `bg_mid.png` | 960×240 | Tiling plate: nebula wisps + medium stars, more contrast than far. Transparent or very dark. |
| `bg_near.png` | 960×240 | Tiling plate: sparse bright stars, occasional 2px twinkles, mostly empty. |

Not yet wired (needs engine work first — ask before generating):
`critter_1..3.png` (alien critter debris variant), `rocket.png` (launch
finale), `ground.png` (tech-walkway floor strip).

Notes
- Transparent PNG only; no baked-in text or UI.
- The prep script force-snaps every pixel to the active theme palette, so
  slight color drift in generations is fine.
- Keep silhouettes readable at the target size — bold shapes beat detail.
