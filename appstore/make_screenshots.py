"""Generate App Store screenshots for Fezer Planner.

Caption-led layout: eyebrow + headline + subline over a tinted gradient,
with the device frame bleeding off the bottom edge.
"""
import os
from PIL import Image, ImageDraw, ImageFont, ImageFilter

SRC = "/sessions/trusting-charming-cannon/mnt/fezerwebsite/public/images"
OUT = "/sessions/trusting-charming-cannon/mnt/fezerwebsite/appstore/screenshots"

F = "/usr/share/fonts/truetype/lato"
FONT_BLACK = f"{F}/Lato-Black.ttf"
FONT_BOLD = f"{F}/Lato-Bold.ttf"
FONT_REG = f"{F}/Lato-Regular.ttf"

INK = (11, 17, 32)
MUTED = (98, 108, 128)

SLIDES = [
    dict(
        img="fezer-time-tracker.webp", top=0.00, xcrop=(0.0, 1.0),
        eyebrow="NOW", accent=(0, 102, 255), tint=(233, 241, 255),
        head="Know what's next.\nTrack it in one tap.",
        sub="LIVE, NOW, NEXT and DUE badges keep one commitment\nin front of you. Tap Begin to start tracking it.",
    ),
    dict(
        img="fezer-time-blocking-planner.webp", top=0.00, xcrop=(0.0, 1.0),
        eyebrow="PLAN", accent=(88, 76, 220), tint=(238, 235, 255),
        head="Build tomorrow\nfrom time blocks",
        sub="Draggable blocks that repeat daily, on weekdays\nor weekly. Your routines build themselves.",
    ),
    dict(
        img="fezer-time-blocking-planner.webp", top=0.28, xcrop=(0.22, 1.0),
        eyebrow="COMPARE", accent=(20, 145, 90), tint=(230, 246, 237),
        head="Plan vs. what\nactually happened",
        sub="Planned and tracked side by side, so tomorrow's plan\nstarts from evidence instead of optimism.",
    ),
    dict(
        img="fezer-goal-planner.webp", top=0.00, xcrop=(0.0, 1.0),
        eyebrow="GOALS", accent=(200, 122, 10), tint=(255, 243, 226),
        head="Goals that reach\nyour calendar",
        sub="Break a goal into steps, then Commit each one as\na deadline or a block of real time.",
    ),
    dict(
        img="fezer-vision-board-app.webp", top=0.02, xcrop=(0.0, 1.0),
        eyebrow="VISION", accent=(210, 60, 130), tint=(255, 235, 244),
        head="A vision board with\na plan behind it",
        sub="Pin what you want beside the goals and the\nhours that will actually get you there.",
    ),
]

CLOSER = dict(
    eyebrow="PRIVATE BY DESIGN",
    head="No account.\nNo cloud.\nNo tracking.",
    sub="Your schedule, your hours and your vision boards\nstay on your device. That is the only place they exist.",
    accent=(90, 160, 255),
)

SIZES = [("6.9", 1290, 2796), ("6.5", 1242, 2688)]


def rounded_mask(size, radius):
    m = Image.new("L", size, 0)
    ImageDraw.Draw(m).rounded_rectangle([0, 0, size[0] - 1, size[1] - 1],
                                        radius=radius, fill=255)
    return m


def gradient(size, top, bottom):
    w, h = size
    g = Image.new("RGB", (1, h))
    d = ImageDraw.Draw(g)
    for y in range(h):
        t = y / max(h - 1, 1)
        d.point((0, y), fill=tuple(int(top[i] + (bottom[i] - top[i]) * t) for i in range(3)))
    return g.resize(size, Image.LANCZOS)


def glow(canvas, center, radius, color, strength=0.55):
    w, h = canvas.size
    layer = Image.new("RGB", (w, h), color)
    mask = Image.new("L", (w, h), 0)
    ImageDraw.Draw(mask).ellipse(
        [center[0] - radius, center[1] - radius, center[0] + radius, center[1] + radius],
        fill=int(255 * strength))
    mask = mask.filter(ImageFilter.GaussianBlur(radius * 0.45))
    canvas.paste(layer, (0, 0), mask)


def draw_text_block(d, x, y, lines, font, fill, leading):
    for ln in lines:
        d.text((x, y), ln, font=font, fill=fill)
        y += leading
    return y


def build(slide, W, H, closer=False):
    s = W / 1290.0
    px = lambda v: int(round(v * s))

    tint = (11, 17, 32) if closer else slide["tint"]
    if closer:
        canvas = gradient((W, H), (16, 24, 43), (7, 11, 22))
        glow(canvas, (int(W * 0.5), int(H * 0.62)), px(700), (40, 80, 180), 0.5)
        ink, muted = (255, 255, 255), (150, 162, 186)
    else:
        canvas = gradient((W, H), tint, (255, 255, 255))
        glow(canvas, (int(W * 0.75), px(260)), px(620), slide["accent"], 0.10)
        ink, muted = INK, MUTED

    d = ImageDraw.Draw(canvas)
    f_eyebrow = ImageFont.truetype(FONT_BOLD, px(38))
    f_head = ImageFont.truetype(FONT_BLACK, px(104 if not closer else 118))
    f_sub = ImageFont.truetype(FONT_REG, px(44))

    left = px(96)
    head_lines = slide["head"].split("\n")
    sub_lines = slide["sub"].split("\n")
    head_lead = px(116 if not closer else 132)
    text_h = px(78) + len(head_lines) * head_lead + px(28) + len(sub_lines) * px(62)

    # ---- device geometry (computed first so text can be centred above it) ----
    frame = fx = fy = None
    if not closer:
        src = Image.open(os.path.join(SRC, slide["img"])).convert("RGB")
        x0, x1 = slide["xcrop"]
        src = src.crop((int(src.width * x0), int(src.height * slide["top"]),
                        int(src.width * x1), src.height))

        screen_w = px(1000)
        screen_h = int(screen_w * src.height / src.width)
        src = src.resize((screen_w, screen_h), Image.LANCZOS)
        src.putalpha(rounded_mask((screen_w, screen_h), px(56)))

        bezel = px(16)
        fw, fh = screen_w + bezel * 2, screen_h + bezel * 2
        frame = Image.new("RGBA", (fw, fh), (0, 0, 0, 0))
        ImageDraw.Draw(frame).rounded_rectangle([0, 0, fw - 1, fh - 1],
                                                radius=px(72), fill=(24, 26, 34, 255))
        frame.alpha_composite(src, (bezel, bezel))

        fx = (W - fw) // 2
        # always bleed past the bottom edge
        fy = max(px(700), H + px(120) - fh)
        top_zone = fy
    else:
        top_zone = H

    # fixed header baseline keeps the caption line consistent across the set
    y = px(180) if not closer else max(px(150), (top_zone - text_h) // 2)

    # eyebrow with letterspacing
    cx = left
    for ch in slide["eyebrow"]:
        d.text((cx, y), ch, font=f_eyebrow, fill=slide["accent"])
        cx += d.textlength(ch, font=f_eyebrow) + px(6)
    y += px(78)

    y = draw_text_block(d, left, y, head_lines, f_head, ink, head_lead)
    y += px(28)
    draw_text_block(d, left, y, sub_lines, f_sub, muted, px(62))

    if closer:
        return canvas

    # shadow
    fw, fh = frame.size
    sh = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    ImageDraw.Draw(sh).rounded_rectangle(
        [fx + px(16), fy + px(30), fx + fw - px(16), min(fy + fh, H - 1)], radius=px(72),
        fill=(20, 30, 60, 90))
    sh = sh.filter(ImageFilter.GaussianBlur(px(38)))
    canvas.paste(Image.new("RGB", (W, H), (20, 30, 60)), (0, 0), sh.split()[3])

    canvas.paste(frame, (fx, fy), frame)
    return canvas


def main():
    for label, W, H in SIZES:
        outdir = os.path.join(OUT, f"iphone-{label}")
        os.makedirs(outdir, exist_ok=True)
        for i, sl in enumerate(SLIDES, 1):
            img = build(sl, W, H)
            p = os.path.join(outdir, f"{i:02d}-{sl['eyebrow'].lower()}.png")
            img.save(p, optimize=True)
            print("wrote", p, img.size)
        img = build(CLOSER, W, H, closer=True)
        p = os.path.join(outdir, "06-private.png")
        img.save(p, optimize=True)
        print("wrote", p, img.size)


if __name__ == "__main__":
    main()
