// scripts/optimizeImages.js
import sharp from 'sharp';
import { mkdir } from 'fs/promises';

/**
 * Optimize images using Sharp
 * @param {string} path - Input image path
 * @param {number} quality - WebP quality (0-100)
 * @param {number[]} imageSizes - Array of widths in pixels
 * @param {boolean} crop - Whether to crop (true) or resize (false)
 * @param {string} out - Output directory
 * @param {string} out_name - Output filename (without extension)
 * @param {number} aspectRatio - Aspect ratio for cropping (width/height). Default 16/9
 */
async function optimize(path, quality, imageSizes, crop, out, out_name, aspectRatio = 16/9) {
  try {
    // Ensure output directory exists
    await mkdir(out, { recursive: true });

    console.log(`\nProcessing: ${path}`);
    console.log(`Output name: ${out_name}`);
    console.log(`Quality: ${quality}`);
    console.log(`Crop: ${crop ? 'yes' : 'no'}`);
    if (crop) {
      console.log(`Aspect ratio: ${aspectRatio.toFixed(2)} (${aspectRatio > 1 ? 'landscape' : 'portrait'})`);
    }

    for (const width of imageSizes) {
      const outputPath = `${out}${out_name}-${width}w.webp`;
      
      let sharpInstance = sharp(path);

      if (crop) {
        // Calculate height based on aspect ratio
        const height = Math.round(width / aspectRatio);

        console.log(`  → Cropping to ${width}x${height}px`);

        sharpInstance = sharpInstance.resize(width, height, {
          fit: 'cover',           // Crop to fill exact dimensions
          position: 'attention'   // Smart crop focusing on important areas
        });
      } else {
        // Resize without cropping (maintains aspect ratio)
        sharpInstance = sharpInstance.resize(width, null, {
          withoutEnlargement: true // Don't upscale small images
        });
      }

      await sharpInstance
        .webp({ quality })
        .toFile(outputPath);

      const stats = await sharp(outputPath).metadata();
      console.log(`  ✓ Created ${outputPath} (${stats.width}x${stats.height})`);
    }

    console.log(`✅ Completed: ${out_name}`);
  } catch (error) {
    console.error(`❌ Error processing ${path}:`, error.message);
  }
}

export { optimize };