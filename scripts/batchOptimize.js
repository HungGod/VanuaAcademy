// scripts/batchOptimize.js
import { optimize } from './optimizeImages.js';

/**
 * Batch optimization configuration
 * Each entry: [path, quality, sizes, crop, out, out_name]
 */
const imagesToOptimize = [
  [
    'assets/images/fiji-high-quality-spread.jpg',
    90,
    [1200, 800, 400],
    true,
    'client/public/images/',
    'hero-bg'
  ],
  [
    'assets/images/high-quality-fiji-woman-spread.jpg',
    80,
    [1200, 800, 400],
    true,
    'client/public/images/',
    'about-bg'
  ],
  [
    'assets/images/cert-beauty-spa-therapy.png',
    60,
    [128],
    false,
    'client/public/images/',
    'cert-beauty_spa_therapy'
  ],
  [
    'assets/images/cert-nail-technology.png',
    60,
    [128],
    false,
    'client/public/images/',
    'cert-nail_technology'
  ],
  [
    'assets/images/cert-massage-therapy.png',
    60,
    [128],
    false,
    'client/public/images/',
    'cert-massage_therapy'
  ],
  [
    'assets/images/cert-makeup-artistry.png',
    60,
    [128],
    false,
    'client/public/images/',
    'cert-makeup_artistry'
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