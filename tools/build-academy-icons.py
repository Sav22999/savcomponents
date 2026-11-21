"""Builds the icons of SavComponents Academy from the SavComponents logo (docs/logo.svg): the same four leaning tiles with the S cut
out of them, a little smaller, and a graduation cap resting on them, leaning like the tiles.
Writes academy/icons/ (SVG and PWA PNGs), the Android launcher icons and the Google Play icon. Needs Pillow:
python3 tools/build-academy-icons.py"""
import base64
import io
import math
import re
from pathlib import Path
from PIL import Image, ImageChops, ImageDraw

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / 'academy' / 'icons'
LOGO = (ROOT / 'docs' / 'logo.svg').read_text()
MASK_B64 = re.search(r'base64,([A-Za-z0-9+/=]+)', LOGO).group(1)

# the logo: four tiles (logo space 0..512), turned by this matrix; the light one is raised
M = (0.984808, 0.173648, -0.173648, 0.984808, 48.3431, -40.5647)
TILES = [((81, 81), (76, 162, 240)), ((81, 265), (76, 162, 240)), ((265, 265), (76, 162, 240)), ((281, 65), (125, 211, 255))]
SIDE = 166
# where the logo sits in the icon: smaller and lower, to leave room for the cap
K, TX, TY = 0.8, 51, 92
INK, INK_SIDE, TASSEL = (27, 36, 64), (44, 56, 92), (255, 200, 87)
BG = (234, 246, 255)      # behind the maskable and store icons (and the Android adaptive icon)
SS = 4


def logo_pt(x, y):
    a, b, c, d, e, f = M
    return (a * x + c * y + e, b * x + d * y + f)


def place(x, y):
    return (x * K + TX, y * K + TY)


def rot(points, cx, cy, deg):
    t = math.radians(deg)
    return [(cx + (x - cx) * math.cos(t) - (y - cy) * math.sin(t), cy + (x - cx) * math.sin(t) + (y - cy) * math.cos(t)) for x, y in points]


# the cap, in icon space: centred on the top edge of the top-left tile and leaning 10 degrees like the tiles
_cx, _cy = place(*logo_pt(81 + SIDE / 2, 81 + SIDE / 2))
CAP_X, CAP_Y = _cx, _cy - SIDE * K / 2 - 6
BOARD = rot([(CAP_X, CAP_Y - 44), (CAP_X + 112, CAP_Y), (CAP_X, CAP_Y + 44), (CAP_X - 112, CAP_Y)], CAP_X, CAP_Y, 10)
BASE = rot([(CAP_X - 62, CAP_Y + 18), (CAP_X + 62, CAP_Y + 18), (CAP_X + 62, CAP_Y + 62), (CAP_X + 30, CAP_Y + 76), (CAP_X, CAP_Y + 80),
            (CAP_X - 30, CAP_Y + 76), (CAP_X - 62, CAP_Y + 62)], CAP_X, CAP_Y, 10)
CORD = rot([(CAP_X + 96, CAP_Y + 6), (CAP_X + 104, CAP_Y + 6), (CAP_X + 104, CAP_Y + 74), (CAP_X + 96, CAP_Y + 74)], CAP_X, CAP_Y, 10)
KNOT = rot([(CAP_X + 100, CAP_Y + 86)], CAP_X, CAP_Y, 10)[0]


def svg():
    p = lambda pts: ' '.join(f'{x:.1f},{y:.1f}' for x, y in pts)
    tiles = ''.join(f'<rect x="{x}" y="{y}" width="{SIDE}" height="{SIDE}" fill="rgb{c}"/>' for (x, y), c in TILES)
    return f'''<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" role="img" aria-label="SavComponents Academy">
  <defs><mask id="s" maskUnits="userSpaceOnUse" x="0" y="0" width="512" height="512"><image width="512" height="512" xlink:href="data:image/png;base64,{MASK_B64}"/></mask></defs>
  <g transform="translate({TX} {TY}) scale({K})"><g mask="url(#s)"><g transform="matrix({' '.join(str(v) for v in M)})">{tiles}</g></g></g>
  <polygon points="{p(BASE)}" fill="rgb{INK_SIDE}" stroke="#fff" stroke-width="7" stroke-linejoin="round" paint-order="stroke"/>
  <polygon points="{p(BOARD)}" fill="rgb{INK}" stroke="#fff" stroke-width="7" stroke-linejoin="round" paint-order="stroke"/>
  <polygon points="{p(CORD)}" fill="rgb{TASSEL}"/>
  <circle cx="{KNOT[0]:.1f}" cy="{KNOT[1]:.1f}" r="13" fill="rgb{TASSEL}"/>
</svg>
'''


def mark(scale=1.0):
    """The Academy mark on transparent, 512 box (drawn larger, then reduced), shrunk around the centre by scale."""
    n = 512 * SS
    logo = Image.new('RGBA', (n, n), (0, 0, 0, 0))
    d = ImageDraw.Draw(logo)
    for (x, y), c in TILES:
        d.polygon([tuple(v * SS for v in logo_pt(px, py)) for px, py in [(x, y), (x + SIDE, y), (x + SIDE, y + SIDE), (x, y + SIDE)]], fill=c + (255,))
    m = Image.open(io.BytesIO(base64.b64decode(MASK_B64))).convert('RGBA').resize((n, n), Image.LANCZOS)
    lum = m.convert('L')
    lum = ImageChops.multiply(lum, m.getchannel('A'))
    logo.putalpha(ImageChops.multiply(logo.getchannel('A'), lum))
    # the logo, smaller and lower
    out = Image.new('RGBA', (n, n), (0, 0, 0, 0))
    small = logo.resize((round(n * K), round(n * K)), Image.LANCZOS)
    out.alpha_composite(small, (round(TX * SS), round(TY * SS)))
    d = ImageDraw.Draw(out)
    up = lambda pts: [(x * SS, y * SS) for x, y in pts]
    # a thin light rim, so the cap reads on dark backgrounds too
    for shape in (BASE, BOARD):
        d.line(up(shape) + [up(shape)[0]], fill=(255, 255, 255, 255), width=7 * SS, joint='curve')
    d.polygon(up(BASE), fill=INK_SIDE + (255,))
    d.polygon(up(BOARD), fill=INK + (255,))
    d.polygon(up(CORD), fill=TASSEL + (255,))
    d.ellipse([(KNOT[0] - 13) * SS, (KNOT[1] - 13) * SS, (KNOT[0] + 13) * SS, (KNOT[1] + 13) * SS], fill=TASSEL + (255,))
    if scale != 1.0:
        s = out.resize((round(n * scale), round(n * scale)), Image.LANCZOS)
        out = Image.new('RGBA', (n, n), (0, 0, 0, 0))
        out.alpha_composite(s, ((n - s.width) // 2, (n - s.height) // 2))
    return out


def png(size, bg=None, scale=1.0, shape='square'):
    n = 512 * SS
    img = Image.new('RGBA', (n, n), (0, 0, 0, 0))
    if bg:
        mask = Image.new('L', (n, n), 0)
        if shape == 'round': ImageDraw.Draw(mask).ellipse([0, 0, n - 1, n - 1], fill=255)
        elif shape == 'rounded': ImageDraw.Draw(mask).rounded_rectangle([0, 0, n - 1, n - 1], radius=112 * SS, fill=255)
        else: mask.paste(255, (0, 0, n, n))
        img.paste(Image.new('RGBA', (n, n), bg + (255,)), (0, 0), mask)
    img.alpha_composite(mark(scale))
    return img.resize((size, size), Image.LANCZOS)


if __name__ == '__main__':
    OUT.mkdir(parents=True, exist_ok=True)
    (OUT / 'icon.svg').write_text(svg())
    # PWA: the mark as it is (like the SavComponents favicon), and a maskable one with its background and room around it
    png(192).save(OUT / 'icon-192.png')
    png(512).save(OUT / 'icon-512.png')
    png(512, BG, 0.74).save(OUT / 'maskable-512.png')
    play = ROOT / 'academy-android' / 'store'
    play.mkdir(parents=True, exist_ok=True)
    png(512, BG, 0.8).save(play / 'play-store-icon-512.png')
    res = ROOT / 'academy-android' / 'app' / 'src' / 'main' / 'res'
    for dpi, k in {'mdpi': 1, 'hdpi': 1.5, 'xhdpi': 2, 'xxhdpi': 3, 'xxxhdpi': 4}.items():
        folder = res / f'mipmap-{dpi}'
        folder.mkdir(parents=True, exist_ok=True)
        png(round(48 * k), BG, 0.84, 'rounded').save(folder / 'ic_launcher.png')
        png(round(48 * k), BG, 0.8, 'round').save(folder / 'ic_launcher_round.png')
        png(round(108 * k), None, 0.6).save(folder / 'ic_launcher_foreground.png')
    print('icons written to', OUT, 'and', res)
