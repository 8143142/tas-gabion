import re
import shutil
import urllib.request
from pathlib import Path

html_path = Path(r"D:\Downloads\Instagram.html")
files_dir = Path(r"D:\Downloads\Instagram_files")
dest = Path(__file__).parent / "assets" / "images" / "logo.png"
dest.parent.mkdir(parents=True, exist_ok=True)

html = html_path.read_text(encoding="utf-8", errors="ignore")

url = None
for pattern in [
    r'"profile_pic_url_hd"\s*:\s*"((?:\\.|[^"])*)"',
    r'"profile_pic_url"\s*:\s*"((?:\\.|[^"])*)"',
]:
    m = re.search(pattern, html)
    if m:
        url = m.group(1).replace("\\/", "/")
        break

if url:
    print("Downloading profile pic...")
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req, timeout=30) as resp:
        dest.write_bytes(resp.read())
    print("Saved", dest, dest.stat().st_size, "bytes")
else:
    # fallback: local file with profile id
    for needle in ("18185795056340107", "692650755"):
        if files_dir.exists():
            for f in files_dir.iterdir():
                if needle in f.name and f.suffix.lower() in {".jpg", ".jpeg", ".png", ".webp"}:
                    shutil.copy2(f, dest)
                    print("Copied local", f.name)
                    raise SystemExit(0)
    print("Profile URL not found")
