#!/usr/bin/env python3
"""Normalize raw client logos into consistent optical size.

1. Trim transparent noise (alpha > 30) or white plate (rgb diff > 16).
2. Scale by area (target 2400 px^2, caps 104x48) so wordmarks and badges
   carry similar visual weight.
3. Save at 2x for retina; write dims.json used by the HTML width/height.

Usage: python3 scripts/normalize-logos.py [raw_dir] [out_dir]
"""
from PIL import Image, ImageChops
import glob, os, sys, json, math

raw_dir = sys.argv[1] if len(sys.argv) > 1 else "assets/clients-db/raw"
out_dir = sys.argv[2] if len(sys.argv) > 2 else "assets/clients-db"
TARGET, MAXW, MAXH = 2400, 104, 48

dims = {}
for f in sorted(glob.glob(os.path.join(raw_dir, "*.png"))):
    im = Image.open(f).convert("RGBA")
    a = im.split()[-1]
    if a.getextrema()[0] > 250:
        diff = ImageChops.difference(im.convert("RGB"), Image.new("RGB", im.size, (255, 255, 255)))
        bbox = diff.convert("L").point(lambda p: 255 if p > 16 else 0).getbbox()
    else:
        bbox = a.point(lambda p: 255 if p > 30 else 0).getbbox()
    im = im.crop(bbox or im.getbbox())
    w, h = im.size
    s = min(math.sqrt(TARGET / (w * h)), MAXW / w, MAXH / h)
    fw, fh = max(1, round(w * s)), max(1, round(h * s))
    name = os.path.basename(f)
    im.resize((fw * 2, fh * 2), Image.LANCZOS).save(os.path.join(out_dir, name), optimize=True)
    dims[name] = {"w": fw, "h": fh}

json.dump(dims, open(os.path.join(out_dir, "dims.json"), "w"), indent=1)
print(f"normalized {len(dims)} logos")
