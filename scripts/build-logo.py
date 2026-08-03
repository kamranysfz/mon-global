#!/usr/bin/env python3
"""
Build the MON identity system as true vector SVGs.

One parent wordmark, MON, with the second line naming the business and a
shared "tailor made ___" tagline that binds the two together:

    MON / GLOBAL       tailor made investments   (Turkish property & citizenship)
    MON / CONSULTANCY  tailor made consulting    (Dubai business setup)

Letterforms are real outlines — display serif for MON and the descriptor, body
sans for the tagline — extracted from the woff2 files next/font already
downloads. Output is self-contained paths with no font dependency.

Run:  python3 scripts/build-logo.py
"""

import glob
import math
import os
import sys

from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont
from fontTools.pens.svgPathPen import SVGPathPen

# ----------------------------- TUNING --------------------------------------
SERIF_FAMILY = "Cormorant"    # MON + descriptor
SANS_FAMILY = "Montserrat"    # tagline
SERIF_WEIGHT = 600            # Cormorant's hairlines thin out at header size
SANS_WEIGHT = 400

TRACK = 34            # letterspacing between M / ring / N, font units
STROKE_RATIO = 0.116  # ring stroke as a fraction of cap height
GAP_A, GAP_B, GAP_HALF = 45.0, 225.0, 5.5   # split-ring gap geometry, degrees

SUB_SCALE = 0.30      # descriptor cap height relative to MON — IDENTICAL
                      # across lockups, so the marks read as one system
SUB_DROP = 300        # descriptor baseline below MON, font units

TAG_SCALE = 0.155     # tagline size relative to MON
TAG_DROP = 560        # tagline baseline below MON
TAG_TRACK = 120       # tagline letterspacing, font units (pre-scale)
PAD = 40

# Descriptor width as a fraction of MON. Tracking is solved to hit this rather
# than guessed. CONSULTANCY has 11 letters against GLOBAL's 6, so it needs the
# full measure to avoid cramped tracking.
# "tag" is a list of lines. MON GLOBAL keeps its own two-line tagline; MON
# CONSULTANCY moves from "tailor made consulting" to "tailor made investments".
LOCKUPS = [
    {"slug": "mon-global", "sub": "GLOBAL", "ratio": 0.76,
     "tag": ["Beyond Borders.", "Beyond Expectations."]},
    {"slug": "mon-consultancy", "sub": "CONSULTANCY", "ratio": 1.0,
     "tag": ["tailor made investments"]},
]

NAVY, PAPER, GOLD = "#0B132B", "#F7F6F2", "#C89D5B"
TAG_ON_LIGHT, TAG_ON_DARK = "#5B616B", "#E9E6DF"
# ---------------------------------------------------------------------------


def find_font(substring, required):
    """Pick the woff2 for `substring` that actually covers `required`.

    next/font splits each family into several woff2 files by unicode-range, so
    "the one with the most glyphs" is not necessarily the one holding basic
    Latin. Select on real coverage instead, with glyph count as the tiebreak.
    """
    needed = {ord(c) for c in required if c != " "}
    best = None
    for path in glob.glob(".next/**/*.woff2", recursive=True):
        try:
            f = TTFont(path, lazy=True)
            fam = next((r.toUnicode() for r in f["name"].names if r.nameID == 1), "")
            covers = needed <= set(f.getBestCmap())
            n = len(f.getGlyphOrder())
            f.close()
            if substring in fam and covers and (best is None or n > best[1]):
                best = (path, n)
        except Exception:
            continue
    return best[0] if best else None


def load(substring, weight, required):
    path = find_font(substring, required)
    if not path:
        sys.exit(
            f"No {substring} woff2 under .next/ covering {required!r}. Run "
            "`npm run dev` once so next/font downloads it, then re-run."
        )
    f = TTFont(path)
    if "fvar" in f:
        loc = {}
        for ax in f["fvar"].axes:
            if ax.axisTag == "wght":
                loc["wght"] = max(ax.minValue, min(weight, ax.maxValue))
            elif ax.axisTag == "opsz":
                loc["opsz"] = max(ax.minValue, min(72, ax.maxValue))
        if loc:
            f = instantiateVariableFont(f, loc, inplace=True, updateFontNames=False)
    return f, path


# Every character the lockups actually need, so font selection is verified
# against real requirements rather than assumed.
SERIF_CHARS = "MON" + "".join(lk["sub"] for lk in LOCKUPS)
SANS_CHARS = "".join(lk["tag"] for lk in LOCKUPS)

serif, serif_path = load(SERIF_FAMILY, SERIF_WEIGHT, SERIF_CHARS)
sans, sans_path = load(SANS_FAMILY, SANS_WEIGHT, SANS_CHARS)

s_cmap, s_hmtx, s_gs = serif.getBestCmap(), serif["hmtx"], serif.getGlyphSet()
n_cmap, n_hmtx, n_gs = sans.getBestCmap(), sans["hmtx"], sans.getGlyphSet()
CAP = getattr(serif["OS/2"], "sCapHeight", 0) or 700
STROKE = CAP * STROKE_RATIO
SANS_UPM = sans["head"].unitsPerEm
SANS_NORM = 1000 / SANS_UPM   # normalise sans to the serif's 1000 upm


def sglyph(ch):
    g = s_cmap[ord(ch)]
    pen = SVGPathPen(s_gs); s_gs[g].draw(pen)
    return pen.getCommands(), s_hmtx[g][0]


def nglyph(ch):
    g = n_cmap[ord(ch)]
    pen = SVGPathPen(n_gs); n_gs[g].draw(pen)
    return pen.getCommands(), n_hmtx[g][0] * SANS_NORM


# ---- MON: shared across every lockup --------------------------------------
x, letters = 0.0, []
d, adv = sglyph("M"); letters.append((d, x)); x += adv + TRACK
o_adv = s_hmtx[s_cmap[ord("O")]][0]
ring_cx, ring_cy = x + o_adv / 2, CAP / 2
x += o_adv + TRACK
d, adv = sglyph("N"); letters.append((d, x)); x += adv
MON_W = x
R = CAP / 2 - STROKE / 2


def arc(a0, a1, cx=None, cy=None):
    cx = ring_cx if cx is None else cx
    cy = ring_cy if cy is None else cy
    p = lambda deg: (cx + R * math.cos(math.radians(deg)),
                     cy - R * math.sin(math.radians(deg)))
    x0, y0 = p(a0); x1, y1 = p(a1)
    large = 1 if (a1 - a0) % 360 > 180 else 0
    # sweep-flag 0 because y is flipped relative to SVG's default
    return f"M {x0:.2f} {y0:.2f} A {R:.2f} {R:.2f} 0 {large} 0 {x1:.2f} {y1:.2f}"


GOLD_ARC = arc(GAP_A + GAP_HALF, GAP_B - GAP_HALF)
DARK_ARC = arc(GAP_B + GAP_HALF, GAP_A - GAP_HALF)

VB_W = MON_W + PAD * 2
# Two heights: the compact wordmark (UI, headers, favicon rows) and the full
# lockup with the tagline (covers, print, anything large). They are separate
# files on purpose — ../social/build.py composes the cover from the compact
# wordmark plus its own tagline text, so baking one in would print it twice,
# and at header size the tagline is unreadable anyway.
VB_H_PLAIN = CAP + SUB_DROP + 20 + PAD * 2
VB_H_TAG = CAP + TAG_DROP + 60 + PAD * 2


def build(lockup, letter_col, tag_col, filename, with_tag=False):
    sub_text, ratio, tag = lockup["sub"], lockup["ratio"], lockup["tag"]
    VB_H = VB_H_TAG if with_tag else VB_H_PLAIN

    # descriptor: solve tracking to the target width
    advs = [sglyph(c)[1] for c in sub_text]
    track = ((MON_W * ratio) / SUB_SCALE - sum(advs)) / (len(advs) - 1)
    sub, sx = [], 0.0
    for ch, a in zip(sub_text, advs):
        sub.append((sglyph(ch)[0], sx)); sx += a + track
    sub_w = (sx - track) * SUB_SCALE
    sub_x = (MON_W - sub_w) / 2

    # tagline: fixed tracking, centred
    tg, tx = [], 0.0
    for ch in tag:
        if ch == " ":
            tx += nglyph("n")[1] * 0.6 + TAG_TRACK
            continue
        d, a = nglyph(ch)
        tg.append((d, tx)); tx += a + TAG_TRACK
    tag_w = (tx - TAG_TRACK) * TAG_SCALE
    tag_x = (MON_W - tag_w) / 2

    o = [
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {VB_W:.0f} '
        f'{VB_H:.0f}" role="img" aria-label="MON {sub_text.title()} — {tag}">',
        f'<g transform="translate({PAD:.0f} {CAP + PAD:.0f}) scale(1 -1)">',
    ]
    for d, ox in letters:
        o.append(f'<path transform="translate({ox:.2f} 0)" d="{d}" fill="{letter_col}"/>')
    o.append(f'<path d="{DARK_ARC}" fill="none" stroke="{letter_col}" stroke-width="{STROKE:.1f}"/>')
    o.append(f'<path d="{GOLD_ARC}" fill="none" stroke="{GOLD}" stroke-width="{STROKE:.1f}"/>')

    o.append(f'<g transform="translate({sub_x:.2f} {-SUB_DROP}) scale({SUB_SCALE})">')
    for d, ox in sub:
        o.append(f'<path transform="translate({ox:.2f} 0)" d="{d}" fill="{GOLD}"/>')
    o.append("</g>")

    if with_tag:
        inner = TAG_SCALE * SANS_NORM
        o.append(f'<g transform="translate({tag_x:.2f} {-TAG_DROP}) scale({inner:.5f})">')
        for d, ox in tg:
            o.append(f'<path transform="translate({ox / SANS_NORM:.2f} 0)" d="{d}" fill="{tag_col}"/>')
        o.append("</g>")
    o.append("</g></svg>")

    os.makedirs("public/brand", exist_ok=True)
    out = f"public/brand/{filename}"
    with open(out, "w") as fh:
        fh.write("\n".join(o))
    return out, track, sub_w, tag_w


def build_monogram(letter_col, filename):
    """Ring-only mark for favicons and avatars, where the wordmark dies.
    Shared by both businesses — it is the parent brand's mark."""
    size = CAP + STROKE
    c = size / 2
    o = [
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {size:.0f} '
        f'{size:.0f}" role="img" aria-label="MON">',
        f'<path d="{arc(GAP_B + GAP_HALF, GAP_A - GAP_HALF, c, c)}" fill="none" '
        f'stroke="{letter_col}" stroke-width="{STROKE:.1f}"/>',
        f'<path d="{arc(GAP_A + GAP_HALF, GAP_B - GAP_HALF, c, c)}" fill="none" '
        f'stroke="{GOLD}" stroke-width="{STROKE:.1f}"/>',
        "</svg>",
    ]
    out = f"public/brand/{filename}"
    with open(out, "w") as fh:
        fh.write("\n".join(o))
    return out


print(f"serif : {serif_path.split('/')[-1][:34]}  cap={CAP} MON_W={MON_W:.0f}")
print(f"sans  : {sans_path.split('/')[-1][:34]}  upm={SANS_UPM}\n")

for lk in LOCKUPS:
    # compact wordmark — the default, used by the site and the social renderer
    out, track, sub_w, tag_w = build(lk, NAVY, TAG_ON_LIGHT, f"{lk['slug']}.svg")
    build(lk, PAPER, TAG_ON_DARK, f"{lk['slug']}-reversed.svg")
    # full lockup with the tagline — covers, print, large applications
    build(lk, NAVY, TAG_ON_LIGHT, f"{lk['slug']}-lockup.svg", with_tag=True)
    build(lk, PAPER, TAG_ON_DARK, f"{lk['slug']}-lockup-reversed.svg", with_tag=True)
    print(f"{lk['sub']:12s} {sub_w / MON_W * 100:3.0f}% of MON, tracking {track:4.0f}"
          f"  |  tagline {tag_w / MON_W * 100:3.0f}%  \"{lk['tag']}\"")
    print(f"             -> {out} (+ -reversed, -lockup, -lockup-reversed)")

build_monogram(NAVY, "mon-mark.svg")
build_monogram(PAPER, "mon-mark-reversed.svg")
print("\nshared mark -> public/brand/mon-mark.svg (+ -reversed)")

# DEPRECATED ALIASES. The ring belongs to the parent brand, not to MON GLOBAL,
# so it was renamed mon-global-mark -> mon-mark. ../social/build.py still reads
# the old names; these keep that render working until it migrates. Delete both
# lines once nothing references them.
build_monogram(NAVY, "mon-global-mark.svg")
build_monogram(PAPER, "mon-global-mark-reversed.svg")
print("legacy alias -> mon-global-mark.svg (+ -reversed) — remove after "
      "social/build.py migrates")
