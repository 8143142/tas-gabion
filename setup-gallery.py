"""Copy gallery photos from Instagram_files (largest post images)."""
import shutil
from pathlib import Path

SRC_DIR = Path(r"D:\Downloads\Instagram_files")
DEST = Path(__file__).parent / "assets" / "images"
DEST.mkdir(parents=True, exist_ok=True)

labels = [
    "01-fence.jpg",
    "02-wall.jpg",
    "03-light.jpg",
    "04-gazebo.jpg",
    "05-gazebo-site.jpg",
    "06-gazebo-round.jpg",
    "07-bench.jpg",
]

# Real post photos are much larger than avatars/icons (~5–10 KB)
photos = sorted(
    [f for f in SRC_DIR.glob("*.jpg") if f.stat().st_size > 150_000],
    key=lambda p: p.stat().st_size,
    reverse=True,
)

for dest_name, src in zip(labels, photos):
    out = DEST / dest_name
    shutil.copy2(src, out)
    print(f"OK {dest_name} <- {src.name} ({src.stat().st_size // 1024} KB)")

print(f"Copied {min(len(labels), len(photos))} gallery images")
