// scripts/batchOptimize.js
import { optimize } from './optimizeImages.js';

/**
 * Batch optimization configuration
 * Each entry: [path, quality, sizes, crop, out, out_name]
 */
const imagesToOptimize = [
  [
    'client/src/assets/images/fiji-high-quality-spread.jpg',
    90,
    [1200, 800, 400],
    true,
    'client/public/images/',
    'hero-bg'
  ],
  [
    'client/src/assets/images/high-quality-fiji-woman-spread.jpg',
    80,
    [1200, 800, 400],
    true,
    'client/public/images/',
    'about-bg'
  ],
  [
    'client/src/assets/images/cert-beauty-spa-therapy.png',
    60,
    [128],
    false,
    'client/public/images/',
    'cert-beauty_spa_therapy'
  ],
  [
    'client/src/assets/images/cert-nail-technology.png',
    60,
    [128],
    false,
    'client/public/images/',
    'cert-nail_technology'
  ],
  [
    'client/src/assets/images/cert-massage-therapy.png',
    60,
    [128],
    false,
    'client/public/images/',
    'cert-massage_therapy'
  ]
];

async function batchOptimize() {
  console.log('🚀 Starting batch image optimization...\n');
  console.log(`Processing ${imagesToOptimize.length} images...\n`);

  for (const [path, quality, sizes, crop, out, out_name] of imagesToOptimize) {
    await optimize(path, quality, sizes, crop, out, out_name);
  }

  console.log('\n🎉 All images optimized successfully!');
}

batchOptimize();