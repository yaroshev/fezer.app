# Fezer — App Store listing rebuild

Everything below is **staged in App Store Connect as a draft**. Nothing has been
submitted for review.

## Why the listing needed rebuilding

Measured against the iTunes Search API on 2026‑07‑31, Fezer Planner ranked
**outside the top 100** for every relevant term except one:

| Search term | Rank before |
|---|---|
| day planner | not in top 100 |
| daily planner | not in top 100 |
| time blocking | not in top 100 |
| time tracker | not in top 100 |
| goal planner | not in top 100 |
| vision board | not in top 100 |
| schedule planner | not in top 100 |
| plan my day | not in top 100 |
| productivity planner | not in top 100 |
| life planner | not in top 100 |
| time blocking planner | **86** |

Root causes, all fixable in metadata:

- **Description used 95 of 4,000 characters.** A single sentence. Apple indexes
  the description for web search, and users judge the app by it.
- **Keywords used 43 of 100 characters**, and spent them on `fezer` (already in
  the app name, so it was indexed twice for nothing) plus three broad,
  high‑competition heads.
- **App name used 13 of 30 characters** — no keyword surface at all.
- **Subtitle** repeated the promotional text verbatim, wasting a second
  30‑character indexed field.
- **Screenshots were raw device captures with no captions.** Most users never
  swipe past screenshot 1–3; uncaptioned screens make them work out the value
  proposition themselves.

## What changed

| Field | Before | After | Limit |
|---|---|---|---|
| Name | Fezer Planner (13) | Fezer: Time Block Day Planner (29) | 30 |
| Subtitle | Own Your Day (12) | Time tracker & goal planner (27) | 30 |
| Keywords | 43 chars, 1 wasted on app name | 93 chars, zero overlap with name/subtitle | 100 |
| Promo text | Own Your Day (12) | Vision board announcement (119) | 170 |
| Description | 95 chars | 3,175 chars, 8 scannable sections | 4,000 |
| What's New | 37 chars | 507 chars | 4,000 |
| Screenshots | 4 uncaptioned | 6 caption‑led | 10 |

Keyword field now reads:

```
timeblocking,schedule,focus,routine,vision,board,deep,work,weekly,agenda,habit,todo,hours,log
```

No spaces after commas (each one costs a character), no plurals (Apple stems
them), no words already carried by the name or subtitle. Apple builds phrases by
combining across all three fields, so `vision` + `board` covers "vision board",
`deep` + `work` covers "deep work", and so on.

## Screenshots

`screenshots/iphone-6.9/` — 1290 × 2796 (6.9" slot)
`screenshots/iphone-6.5/` — 1242 × 2688 (6.5" slot, currently uploaded)

| # | Caption | Purpose |
|---|---|---|
| 1 | Know what's next. Track it in one tap. | Lead with the core promise |
| 2 | Build tomorrow from time blocks | Primary keyword, primary feature |
| 3 | Plan vs. what actually happened | The differentiator vs. every other planner |
| 4 | Goals that reach your calendar | Second use case |
| 5 | A vision board with a plan behind it | Newest feature, distinct search intent |
| 6 | No account. No cloud. No tracking. | Privacy close |

Regenerate with `make_screenshots.py` (in the session outputs folder) after any
UI change — captions and crops are data at the top of the file.

## Apple Search Ads — custom product pages

Three CPPs are staged, each with an intent‑matched lead screenshot so the ad
creative echoes the search term:

| Reference name | Lead caption | Bid against |
|---|---|---|
| Search Ads - Time Blocking | The time blocking planner that lasts | time blocking, time block planner, timeboxing |
| Search Ads - Time Tracking | Find out where your day goes | time tracker, track my time, where does my time go |
| Search Ads - Goals & Vision Board | Turn goals into hours on your day | goal planner, vision board, goal tracker |

Lead images live in `cpp/iphone-6.9/` and `cpp/iphone-6.5/`.

## Before you submit

1. **A new build is required.** Build 2 (version string 1.0.1) is already
   attached to version 1.0.0, so the 1.0.1 version page has no build. Upload a
   fresh build from Xcode before adding 1.0.1 for review.
2. **Version 1.0.0 is still sitting in "Ready for Distribution"** on manual
   release. It will never go live if you ship 1.0.1 instead — that is
   deliberate, so the app never launches on the old listing.
3. **CPP keyword chips still show the old keyword set** (`fezer`,
   `productivity`, `time management`, `focus`). Those come from the live
   version. Once 1.0.1 is live, revisit each CPP and tick the new keywords.
4. **Secondary category is empty.** Adding one (Lifestyle is the natural fit
   given goals and vision boards) gives a second category chart to rank in.
   Left unset — your call.
5. **Consider an app preview video.** The listing has 0 of 3. A 15–30s capture of
   Plan → Track → Compare would be the next largest conversion lever after
   screenshots.

## Recovery

The four original screenshots were removed from the 1.0.1 draft. They remain on
version 1.0.0 and are still hosted at:

```
https://is1-ssl.mzstatic.com/image/thumb/PurpleSource221/v4/17/bf/a6/17bfa669-aead-2fdc-51be-3fe2412cf2e0/Untitled_-_July_11_U002c_2026_at_18.33.21.jpeg/2000x2000bb.png
https://is1-ssl.mzstatic.com/image/thumb/PurpleSource211/v4/ab/1e/98/ab1e987b-a88c-94c7-3195-5448a561669c/Untitled_-_July_11_U002c_2026_at_18.33.21__U00282_U0029.jpeg/2000x2000bb.png
https://is1-ssl.mzstatic.com/image/thumb/PurpleSource221/v4/b0/8a/f7/b08af753-5d17-efd8-7df1-99c2bab4dc36/Untitled_-_July_11_U002c_2026_at_18.33.21.jpeg/2000x2000bb.png
https://is1-ssl.mzstatic.com/image/thumb/PurpleSource211/v4/79/70/e8/7970e8e2-bd8b-ec2d-335f-95f618a20a7d/Untitled_-_July_11_U002c_2026_at_18.33.21__U00281_U0029.jpeg/2000x2000bb.png
```
