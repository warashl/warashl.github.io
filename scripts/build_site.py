#!/usr/bin/env python3
# Copies site/ to _site/ and turns base64 text assets (name.ext.b64 or
# name.ext.b64.N parts) back into binary files.
import base64, re, shutil
from pathlib import Path

src, dst = Path('site'), Path('_site')
if dst.exists():
    shutil.rmtree(dst)
shutil.copytree(src, dst)
groups = {}
for f in dst.rglob('*'):
    m = re.match(r'(.+)\.b64(?:\.(\d+))?$', f.name)
    if f.is_file() and m:
        groups.setdefault(f.with_name(m.group(1)), []).append((int(m.group(2) or 0), f))
for target, parts in groups.items():
    parts.sort()
    data = ''.join(p.read_text().strip() for _, p in parts)
    target.write_bytes(base64.b64decode(data))
    for _, p in parts:
        p.unlink()
    print(target, target.stat().st_size)
(dst / '.nojekyll').write_text('')
