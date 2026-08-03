#!/usr/bin/env python3
"""
Build the MON block lockups as true vector SVGs.

MONC's existing mark, reproduced faithfully and extended to MONG:

    [mon]c   tailor made consulting     white  — the original, unchanged
    [mon]G   tailor made investments    gold G — the new sibling

Blue block, white lowercase "mon", terminal letter alongside, tagline centred
beneath the block. Ground is black.

Letterforms are real Montserrat outlines pulled from the woff2 next/font
downloads, so output is self-contained paths with no font dependency.

Run:  python3 scripts/build-logo-block.py
"""

import glob
import os
import sys

from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.boundsPen import BoundsPen

# ----------------------------- TUNING --------------------------------------
FAMILY = "Montserrat"
WORD_WEIGHT = 700
TAG_WEIGHT = 400

# Proportions are multiples of the x-height so they survive any change of face.
TRACK_WORD = -0.035   # a geometric sans set large sets too loose by default
PAD_X = 0.30          # block padding left of the word
PAD_Y = 0.30          # block padding above x-height and below baseline
TERM_UPPER_SCALE = 0.86
                      # Uppercase terminals only. A capital is cap-height
                      # (~700) against the lowercase x-height (~538), so at
                      # full size it dominates the word. Scaled down it still
                      # reads as a capital but carries the same optical weight
                      # as the letters before it. Lowercase terminals — like
                      # MONC's original "c" — are never scaled.
BLOCK_EDGE = 0.5      # Where the block's right edge falls inside the natural
                      # n-to-terminal gap. 0 = hard against the n, 1 = hard
                      # against the terminal letter, 0.5 = midway.
                      #
                      # The terminal letter is NOT pushed away from the word.
                      # "monc" is set as one continuous string at the same
                      # tracking as "mon", exactly as the original does — the
                      # block simply stops after the n. Adding a gap here is
                      # what made the earlier version look spaced apart.
TAG_WIDTH = 0.92      # tagline width as a fraction of the BLOCK (not the whole
                      # mark) — matches the original, where it sits under the
                      # block rather than spanning to the terminal letter
TAG_TRACK = 0.02      # positive tracking, ems of the tagline size
TAG_GAP = 0.12        # space between the block's bottom edge and the tagline's
                      # cap line. Kept tight — the tagline belongs to the mark,
                      # and distance reads as two unrelated elements.

# MONC's own colours, sampled from the original artwork. Deliberately NOT the
# MON GLOBAL board palette — see the note at the bottom of this file.
BLUE = "#203878"      # the block
WHITE = "#FFFFFF"     # "mon", the tagline, and MONC's terminal letter
GOLD = "#C89D5B"      # MONG's terminal letter only
BLACK = "#000000"     # ground, when baked in
# MON GLOBAL only. The stacked cut adopts the post system's navy so the mark
# and the twelve posts stop being two different blues (see
# ../../social/design.md 1b). MONC is untouched and keeps BLUE/BLACK.
MONG_NAVY = "#0B132B"
MONG_PAPER = "#F7F6F2"
MONG_GOLD_DEEP = "#8A6A34"   # gold is 2.30:1 on paper — unusable

LOCKUPS = [
    # term_col is what distinguishes the two businesses. MONC is the original
    # and stays entirely white; MONG takes gold on the terminal letter.
    {"slug": "monc-block", "term": "c", "term_col": WHITE,
     "tag": "tailor made consulting"},
    # Stacked: no terminal letter beside the block and no separate block rect —
    # the ground IS the block. "GLOBAL" sits under "mon", tracked to the same
    # optical width. Chosen 2026-08-02; see ../../social/design.md 1b.
    {"slug": "mong-block", "term": "G", "term_col": GOLD,
     "tag": "tailor made investments",
     "stacked": "GLOBAL", "ground": MONG_NAVY, "word_col": MONG_PAPER},
]

PAD = 40
# ---------------------------------------------------------------------------


def find_font(required):
    needed = {ord(c) for c in required if c != " "}
    best = None
    for path in glob.glob(".next/**/*.woff2", recursive=True):
        try:
            f = TTFont(path, lazy=True)
            fam = next((r.toUnicode() for r in f["name"].names if r.nameID == 1), "")
            ok = needed <= set(f.getBestCmap())
            n = len(f.getGlyphOrder())
            f.close()
            if FAMILY in fam and ok and (best is None or n > best[1]):
                best = (path, n)
        except Exception:
            continue
    return best[0] if best else None


REQUIRED = "mon" + "".join(l["term"] for l in LOCKUPS) + \
           "".join(l["tag"] for l in LOCKUPS)
src = find_font(REQUIRED)
if not src:
    sys.exit(
        f"No {FAMILY} woff2 under .next/ covering the needed characters. Run "
        "`npm run dev` once so next/font downloads it, then re-run."
    )


def instance(weight):
    f = TTFont(src)
    if "fvar" in f:
        loc = {}
        for ax in f["fvar"].axes:
            if ax.axisTag == "wght":
                loc["wght"] = max(ax.minValue, min(weight, ax.maxValue))
        if loc:
            f = instantiateVariableFont(f, loc, inplace=True, updateFontNames=False)
    return f


word_f, tag_f = instance(WORD_WEIGHT), instance(TAG_WEIGHT)


def glyph(font, ch):
    cmap, hmtx, gs = font.getBestCmap(), font["hmtx"], font.getGlyphSet()
    g = cmap[ord(ch)]
    pen = SVGPathPen(gs)
    gs[g].draw(pen)
    return pen.getCommands(), hmtx[g][0]


def bounds(font, ch):
    gs = font.getGlyphSet()
    bp = BoundsPen(gs)
    gs[font.getBestCmap()[ord(ch)]].draw(bp)
    return bp.bounds


XH = getattr(word_f["OS/2"], "sxHeight", 0) or bounds(word_f, "x")[3]
TR = TRACK_WORD * XH


def run(font, text, track):
    out, x = [], 0.0
    for ch in text:
        if ch == " ":
            x += glyph(font, "n")[1] * 0.55 + track
            continue
        d, a = glyph(font, ch)
        out.append((d, x))
        x += a + track
    return out, (x - track if out else 0.0)


pad_x, pad_y = PAD_X * XH, PAD_Y * XH
block_top, block_bot = XH + pad_y, -pad_y
block_h = block_top - block_bot
block_mid = (block_top + block_bot) / 2


# Proportions lifted from the approved avatar (../../social/logo.py, G1):
# descriptor cap-height and the gap under "mon", both relative to x-height.
STACK_DESC_CAP = 0.44
STACK_GAP = 0.156
# Descriptor width as a fraction of "mon"'s ink width, measured off the
# approved avatar. Not 1.0 — running it full width makes it read heavier than
# the word above it.
STACK_DESC_WIDTH = 0.85


def build_stacked(lockup, filename, with_tag=True, on_black=True):
    """MON GLOBAL's stacked cut: 'mon' with the descriptor set beneath it.

    Deliberately not the block-plus-terminal construction. That lockup is 3.4:1
    with the gold letter outboard, so a circular avatar crop clips exactly the
    letter that identifies the brand. Stacking makes it square-safe.

    `with_tag` is accepted and ignored: the descriptor has replaced the tagline,
    so the compact and full cuts are the same drawing. Both are still written so
    every caller of the four filenames keeps working.
    """
    desc, ground = lockup["stacked"], lockup["ground"]
    # `light` inverts for placement on paper: the word goes navy and the
    # descriptor drops to gold-deep, because gold on paper fails contrast.
    light = filename.endswith("-light.svg")
    word_col = ground if light else lockup["word_col"]
    desc_col = MONG_GOLD_DEEP if light else GOLD

    word, word_raw = run(word_f, "mon", TR)
    wb_first = bounds(word_f, "m")
    ink_l = word[0][1] + wb_first[0]
    ink_r = word[2][1] + bounds(word_f, "n")[2]
    mon_w = ink_r - ink_l

    # Set the descriptor, then scale it to match "mon"'s ink width exactly, so
    # the pair reads as one block rather than two stacked words.
    # Scale is UNIFORM — set by cap height alone. The width target is then hit
    # by solving for tracking, not by scaling x and y differently, which would
    # stretch the letterforms and is the one thing that always looks amateur.
    d_cap = bounds(word_f, "G")[3]
    d_scale = (STACK_DESC_CAP * XH) / d_cap
    target_raw = (STACK_DESC_WIDTH * mon_w) / d_scale
    _, natural = run(word_f, desc, 0.0)
    d_track = (target_raw - natural) / (len(desc) - 1)
    dg, d_raw = run(word_f, desc, d_track)

    gap = STACK_GAP * XH
    d_base = -gap - STACK_DESC_CAP * XH

    top, bottom = XH, d_base
    total_w = mon_w
    vb_w, vb_h = total_w + PAD * 2, (top - bottom) + PAD * 2

    o = [f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {vb_w:.0f} '
         f'{vb_h:.0f}" role="img" aria-label="mon {desc}">']
    if on_black:
        o.append(f'<rect width="{vb_w:.0f}" height="{vb_h:.0f}" fill="{ground}"/>')
    o.append(f'<g transform="translate({PAD - ink_l:.2f} {top + PAD:.0f}) scale(1 -1)">')
    for d, ox in word:
        o.append(f'<path transform="translate({ox:.2f} 0)" d="{d}" fill="{word_col}"/>')
    # centre the descriptor under the word
    d_x = ink_l + (mon_w - d_raw * d_scale) / 2
    o.append(f'<g transform="translate({d_x:.2f} {d_base:.2f}) scale({d_scale:.5f})">')
    for d, ox in dg:
        o.append(f'<path transform="translate({ox:.2f} 0)" d="{d}" fill="{desc_col}"/>')
    o.append("</g></g></svg>")

    os.makedirs("public/brand", exist_ok=True)
    out = f"public/brand/{filename}"
    with open(out, "w") as fh:
        fh.write("\n".join(o))
    return out, mon_w, 0.0, 0.0


def build(lockup, filename, with_tag=True, on_black=True):
    if lockup.get("stacked"):
        return build_stacked(lockup, filename, with_tag, on_black)
    term, term_col, tag = lockup["term"], lockup["term_col"], lockup["tag"]

    # Set "mon" + the terminal letter as ONE continuous string at one tracking,
    # so the terminal is spaced exactly like the letters before it. The block
    # then stops after the n; the letter is never pushed away from the word.
    laid, _ = run(word_f, "mon" + term, TR)
    laid = [(d, ox + pad_x) for d, ox in laid]   # shift so block left edge = 0
    word, (term_d, term_ox) = laid[:3], laid[3]
    term_glyphs = [(term_d, term_ox)]

    tb = bounds(word_f, term)
    nb = bounds(word_f, "n")
    n_ink_end = word[2][1] + nb[2]        # right edge of the n's ink
    term_ink_start = term_ox + tb[0]      # left edge of the terminal's ink

    # Block edge lands inside the natural gap between them.
    natural_gap = term_ink_start - n_ink_end
    block_w = n_ink_end + natural_gap * BLOCK_EDGE

    # Uppercase terminals are scaled down and optically centred; lowercase
    # ones are left exactly as the continuous layout placed them, because at
    # x-height the shared baseline already IS the correct alignment.
    if term.isupper():
        ts = TERM_UPPER_SCALE
        # keep the ink gap identical to the unscaled layout's
        term_tx = n_ink_end + natural_gap - tb[0] * ts
        term_dy = block_mid - ((tb[1] + tb[3]) / 2) * ts
    else:
        ts = 1.0
        term_tx, term_dy = term_ox, 0.0

    mark_w = term_tx + tb[2] * ts   # right edge of the terminal's ink

    # Tagline spans the BLOCK and is centred on it, as in the original.
    tag_glyphs, tag_raw = run(tag_f, tag, TAG_TRACK * 1000)
    tag_scale = (block_w * TAG_WIDTH) / tag_raw
    tag_w = tag_raw * tag_scale
    tag_x = (block_w - tag_w) / 2
    tag_base = block_bot - TAG_GAP * XH - tag_scale * XH

    term_bottom = min(tb[1] * ts + term_dy, block_bot)
    top = max(block_top, tb[3] * ts + term_dy)
    bottom = min(tag_base, term_bottom) if with_tag else term_bottom
    total_w = max(mark_w, tag_x + tag_w) if with_tag else mark_w

    vb_w, vb_h = total_w + PAD * 2, (top - bottom) + PAD * 2

    o = [
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {vb_w:.0f} '
        f'{vb_h:.0f}" role="img" aria-label="mon{term} — {tag}">',
    ]
    if on_black:
        o.append(f'<rect width="{vb_w:.0f}" height="{vb_h:.0f}" fill="{BLACK}"/>')
    o.append(f'<g transform="translate({PAD:.0f} {top + PAD:.0f}) scale(1 -1)">')
    o.append(f'<rect x="0" y="{block_bot:.1f}" width="{block_w:.1f}" '
             f'height="{block_h:.1f}" fill="{BLUE}"/>')
    for d, ox in word:
        o.append(f'<path transform="translate({ox:.2f} 0)" d="{d}" fill="{WHITE}"/>')
    o.append(f'<g transform="translate({term_tx:.2f} {term_dy:.2f}) scale({ts})">')
    o.append(f'<path d="{term_d}" fill="{term_col}"/>')
    o.append("</g>")
    if with_tag:
        o.append(f'<g transform="translate({tag_x:.2f} {tag_base:.2f}) scale({tag_scale:.5f})">')
        for d, ox in tag_glyphs:
            o.append(f'<path transform="translate({ox:.2f} 0)" d="{d}" fill="{WHITE}"/>')
        o.append("</g>")
    o.append("</g></svg>")

    os.makedirs("public/brand", exist_ok=True)
    out = f"public/brand/{filename}"
    with open(out, "w") as fh:
        fh.write("\n".join(o))
    return out, mark_w, tag_w, term_dy


print(f"source : {src.split('/')[-1][:34]}")
print(f"x-height {XH:.0f}  block height {block_h:.0f}  tracking {TR:.0f}\n")

for lk in LOCKUPS:
    out, w, tw, dy = build(lk, f"{lk['slug']}.svg")
    build(lk, f"{lk['slug']}-transparent.svg", on_black=False)
    build(lk, f"{lk['slug']}-compact.svg", with_tag=False)
    build(lk, f"{lk['slug']}-compact-transparent.svg", with_tag=False, on_black=False)
    if lk.get("stacked"):
        build(lk, f"{lk['slug']}-light.svg", on_black=False)
    align = f"centred {dy:+.0f}" if dy else "baseline"
    print(f"mon{lk['term']}  mark {w:.0f}  tagline {tw:.0f} "
          f"terminal {align}")
    print(f"       -> {out} (+ -transparent, -compact, -compact-transparent)")

# NOTE ON PALETTE: this uses MONC's own blue (#203878), not the MON GLOBAL
# board's navy (#0B132B). They are different blues and will read as a mistake
# if a MONC and a MON GLOBAL document ever sit side by side. Worth resolving
# deliberately — but not by quietly changing the original mark.
