#!/bin/bash

# Install required tools if not present
if ! command -v convert &> /dev/null; then
    echo "Please install ImageMagick first:"
    echo "brew install imagemagick"
    exit 1
fi

# Convert SVG to different PNG sizes
convert -background none -size 16x16 images/icon.svg images/icon16.png
convert -background none -size 32x32 images/icon.svg images/icon32.png
convert -background none -size 48x48 images/icon.svg images/icon48.png
convert -background none -size 128x128 images/icon.svg images/icon128.png

echo "Icons generated successfully!" 