# Product Hunt: diagnosis and replacement copy

Launch page: https://www.producthunt.com/products/fezer
Launched: 26 July 2026 · Current state: 1 upvote, 6 followers, 3 comments

---

## 1. Why the launch doesn't show up in Search Console or GA4

Two separate causes. Neither is a bug on your side.

### It will never count as a normal backlink

Every outbound link on your Product Hunt page carries this:

```html
rel="noreferrer noopener ugc"
```

`ugc` marks it as user-generated content. Google treats that as a hint not to pass
ranking credit, so it does not behave like an editorial backlink. Search Console's
Links report also runs weeks behind and is inconsistent about surfacing `ugc` and
`nofollow` links at all.

**Implication:** Product Hunt is worth doing for traffic, credibility and the
secondary coverage it attracts — not for link equity. Don't judge it by the Links
report.

### It's silently landing in GA4 as "Direct"

This one is fixable and it matters more.

`noreferrer` strips the HTTP `Referer` header, so GA4 never learns the visit came
from Product Hunt. On top of that, your listing points at:

```
https://fezer.app/?ref=producthunt
```

`ref=` is not a parameter GA4 recognises. It gets ignored, the session has no
referrer, and it is bucketed as **Direct**.

Your GA4 shows 76 Direct sessions out of 102 in the last 90 days. An unknown but
probably meaningful chunk of that is Product Hunt traffic you currently cannot see.

**Fix — change the website URL in your PH listing to:**

```
https://fezer.app/?utm_source=producthunt&utm_medium=referral&utm_campaign=launch
```

GA4 reads `utm_*` regardless of the referrer header, so those sessions will show up
correctly attributed. Use the same pattern everywhere you post:

| Where | URL |
|---|---|
| Product Hunt | `https://fezer.app/?utm_source=producthunt&utm_medium=referral&utm_campaign=launch` |
| Hacker News | `https://fezer.app/?utm_source=hackernews&utm_medium=referral&utm_campaign=showhn` |
| Reddit (per subreddit) | `https://fezer.app/?utm_source=reddit&utm_medium=referral&utm_campaign=r_productivity` |
| AlternativeTo | `https://fezer.app/?utm_source=alternativeto&utm_medium=referral&utm_campaign=listing` |

Without this you are flying blind on exactly the distribution work that matters most.

---

## 2. The actual reason the launch underperformed

**Your gallery contains one image: the app icon on a plain background.**

That is almost certainly the whole story. Product Hunt is a visual feed. People
scroll a list of thumbnails and decide in about a second. A product with no
screenshots reads as unfinished, and the copy never gets a chance.

You have four polished screenshots sitting in `public/images/` that were never
uploaded.

### Gallery, in priority order

1. **An animated GIF or short video of Compare mode.** Planned column on the left,
   tracked column on the right, scrolling through a real day. This is the single
   most distinctive thing about the product and nothing else in the category shows
   it. It should be the first item in the gallery — PH autoplays the first asset.
2. `fezer-time-blocking-planner.webp` — the planned day
3. `fezer-time-tracker.webp` — a live tracked session
4. `fezer-goal-planner.webp` — fronts, goals and steps
5. `fezer-vision-board-app.webp` — vision board

Convert the `.webp` files to PNG or JPG first; PH's uploader is unreliable with
WebP. Target 1270×760 for gallery images.

---

## 3. Replacement copy

### Tagline (60 char limit)

Current: `Plan your time. Track reality. Move goals forward.`

That is fine but abstract — it could describe a dozen apps. Stronger options, each
naming the actual mechanism:

```
See the day you planned next to the day you had
```
```
Time blocking that shows you where the hours really went
```
```
The planner that records whether your plan survived
```

**Recommended:** the first one. It is concrete, it is the feature nobody else has,
and it creates a question the reader wants answered.

### Description (260 char limit)

Current is your meta description copied verbatim — written for Google, not for a
feed. Replace with:

```
Most planners show the day you meant to have. Fezer also records the day you
actually had, and puts them side by side. Time blocks, one-tap tracking, goals
that claim real hours. Free, no account, everything stays on your iPhone.
```

### First comment (the maker comment)

Your current one is solid — the "full loop" framing is good and the privacy
paragraph lands. Two things hold it back: it opens with product mechanics instead
of a reason to care, and it ends without asking for anything, so nobody replies.

Comments drive ranking on Product Hunt. Rewrite:

```
Hey Product Hunt 👋

I kept a beautiful time-blocked schedule for about two years. It was fiction.

Every morning I'd block 9:00–11:00 for deep work. Every day I'd actually start
around 9:40 and lose the thread by 10:20. I never noticed the pattern, because
once a day is over the plan just gets quietly edited or abandoned. The evidence
that would have made the next plan better disappears.

So I built the missing half. Fezer has three modes on the same timeline:

• Plan — lay the day out in time blocks, routines repeat automatically
• Track — one tap to begin a session, checkpoints as the work changes shape
• Compare — both columns side by side, hour for hour

That third one is the entire point. After a week you can see your own multiplier:
the block you'd have written as an hour is actually ninety minutes, every time.
Estimating stops being guesswork.

There's also a goal layer above the day — fronts, goals, steps — and you commit a
step straight onto the schedule, so goals claim real hours instead of sitting in a
backlog.

On privacy: Fezer has no accounts and no server. Not a setting, an architecture.
Nothing you write leaves the device. The honest cost is no sync between devices
and no calendar import — if those matter more to you, use something else, and I
mean that.

Free on iPhone and iPad. No subscription, no ads, no tracking.

I'd genuinely like to know: when you look back at last week, could you say where
the hours went? I couldn't, and that's why this exists.
```

The closing question is doing real work — it is answerable by anyone, it is about
them rather than the product, and every reply raises the comment count.

### Topics / tags

Currently only `Productivity`. Add all that apply — each one is another surface
you appear on:

`Productivity` · `Time Tracking` · `Task Management` · `iOS` · `Privacy` · `Calendar`

---

## 4. What to do about the launch that already happened

The launch is 5 days old, so the front-page window has closed. You have two options:

**Option A — fix in place.** Upload the gallery, swap the copy and the UTM URL.
The page keeps accruing SEO value and anyone who finds it later converts far
better. Low effort, no downside. Do this regardless.

**Option B — relaunch later.** Product Hunt allows a product to launch again after
a meaningful update, typically 6+ months apart. Save it for a real milestone —
Android, or iPad-specific features — and go in with the gallery, a video, and
people lined up in advance. A relaunch with 200 upvotes is worth more than three
launches with 5.

Do A now. Plan B for whenever the next substantial release lands.

---

## 5. One thing outside Product Hunt

Your App Store listing reports `minimumOsVersion: 26.5`. For comparison, Structured
ships at `17.0`.

Every person who finds you through any of this work and taps through to the App
Store on anything but the newest iOS will be told they cannot install it. If that
floor is not a hard technical requirement, lowering it is likely worth more than
every item in this document combined.
