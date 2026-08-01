// Comparison and problem-led landing pages.
//
// These are deliberately kept separate from FEATURE_PAGES. Feature pages target
// broad category terms ("day planner app") that a young domain cannot realistically
// win yet. The pages below target lower-competition, higher-intent queries:
// alternative/comparison searches and specific-problem searches where the
// searcher already knows what they want.
//
// House rule for the comparison pages: every claim about another product must be
// verifiable from that product's own App Store listing or website, and the
// comparison must name things the other product does better. Overstating a
// competitor's weaknesses is both dishonest and a liability.
import { SCREENSHOTS } from '../seo/constants';

export type ComparisonRow = {
  capability: string;
  /** How the compared product handles it. Null renders as "not offered". */
  them: string | null;
  /** How Fezer handles it. Null renders as "not offered" -- used deliberately,
   *  since a comparison table that never concedes a row is not credible. */
  us: string | null;
};

export type ComparisonPageContent = {
  path: string;
  /** Short label used in footer / related-link lists. */
  navLabel: string;
  title: string;
  metaDescription: string;
  /** Slug of the pre-generated card in /public/og. */
  ogSlug: string;
  h1: string;
  intro: string;
  /** Optional honest framing shown directly under the hero. */
  fairness?: {
    heading: string;
    paragraphs: string[];
  };
  sections: {
    heading: string;
    paragraphs: string[];
  }[];
  table?: {
    heading: string;
    lede: string;
    /** Column header for the compared product. */
    themLabel: string;
    rows: ComparisonRow[];
    footnote: string;
  };
  screenshot: {
    src: string;
    alt: string;
    caption: string;
  };
  verdict: {
    heading: string;
    /** Who genuinely should not pick Fezer. Builds trust and reduces bad installs. */
    chooseThem: { label: string; points: string[] };
    chooseUs: { label: string; points: string[] };
  };
  faq: { q: string; a: string }[];
  related: { path: string; label: string }[];
};

export const COMPARISON_PAGES: ComparisonPageContent[] = [
  // ---------------------------------------------------------------------------
  {
    path: '/structured-alternative',
    navLabel: 'vs Structured',
    title: 'Structured Alternative for iPhone -  Fezer',
    metaDescription:
      'Looking for a Structured alternative? Fezer plans your day in time blocks like Structured, then tracks the day and shows planned time against actual time. Free, no account, all on-device.',
    ogSlug: 'structured-alternative',
    h1: 'A Structured alternative that also records how the day went',
    intro:
      'Structured is a genuinely good visual day planner, and for a lot of people it is the right answer. Fezer overlaps with it on time blocking, then adds the part most planners leave out: tracking what actually happened and putting it next to the plan.',
    fairness: {
      heading: 'Where Structured is stronger',
      paragraphs: [
        'Structured has been shipping since 2020, has well over a hundred thousand App Store ratings, and runs on iPhone, iPad, Apple Watch and Mac with iCloud sync between them. It is localised into more than two dozen languages, has serious accessibility work behind it, and its paid tier connects Google, Apple and Outlook calendars plus Reminders. If you need your planner on your wrist and your desktop, or you need your existing calendars pulled in automatically, Structured does things Fezer does not do today.',
        'Fezer is new, English-only, iPhone and iPad only, and deliberately does not sync anywhere. Those are real trade-offs, and they are the direct consequence of the design choice described below.',
      ],
    },
    sections: [
      {
        heading: 'The gap both apps start from',
        paragraphs: [
          'A visual timeline is a big improvement over a list. You stop staring at twenty undifferentiated tasks and start seeing a day with a shape. Structured does this well and Fezer does it too.',
          'But a timeline is still only a statement of intent. It shows the day you meant to have. Once the day is over, the plan is either quietly edited to match what happened or abandoned, and either way the information that would have made tomorrow’s plan better is gone.',
        ],
      },
      {
        heading: 'What Fezer adds: a second column',
        paragraphs: [
          'Fezer’s Schedule has three modes. Plan is the timeline you would recognize from Structured. Track records what you actually did -  one tap to begin, checkpoints along the way, one tap to end. Compare puts the two side by side in the same view, hour for hour.',
          'That third mode is the whole point. When you can see that "Deep work, 9:00-11:00" reliably starts at 9:40 and ends at 10:20, you stop writing two-hour blocks you never honour. The plan gets calibrated by evidence rather than by how you felt about last week.',
        ],
      },
      {
        heading: 'Goals that claim real hours',
        paragraphs: [
          'Fezer also carries a goal layer that sits above the day. You organize work into fronts, break each into goals and steps, then commit a step directly onto the schedule as a block. The chain runs goal to step to a specific hour on a specific day, and the time you spend on it is tracked against it.',
          'The effect is that your goals compete for hours in a visible way, instead of living in a separate list that never touches the calendar.',
        ],
      },
      {
        heading: 'Privacy is a design constraint, not a setting',
        paragraphs: [
          'Fezer has no accounts and no server. There is nothing to sign up for, and your schedule, goals, notes and attachments never leave the device. That is why there is no sync: there is nowhere for the data to sync to.',
          'This is a genuine trade-off rather than a straight upgrade. You gain a planner that cannot leak, and you give up multi-device continuity. If continuity matters more to you, Structured’s iCloud sync is the better fit and you should use it.',
        ],
      },
    ],
    table: {
      heading: 'Feature comparison',
      lede: 'Structured details are taken from its App Store listing and its own site as of July 2026. Both apps are free to download; Structured sells a Pro subscription.',
      themLabel: 'Structured',
      rows: [
        {
          capability: 'Visual day timeline',
          them: 'Yes -  drag-and-drop timeline, colours and icons',
          us: 'Yes -  draggable time blocks with deadline pins',
        },
        {
          capability: 'Repeating routines',
          them: 'Structured Pro',
          us: 'Free -  daily, weekdays, weekly or biweekly',
        },
        {
          capability: 'Calendar import (Google, Apple, Outlook)',
          them: 'Structured Pro',
          us: null,
        },
        {
          capability: 'Time tracking of what you actually did',
          them: null,
          us: 'Yes -  one-tap sessions with checkpoints',
        },
        {
          capability: 'Planned vs. actual comparison',
          them: null,
          us: 'Yes -  Compare mode, side by side',
        },
        {
          capability: 'Goals broken into steps and scheduled',
          them: 'Sub-tasks within a task',
          us: 'Fronts, goals and steps committed onto the day',
        },
        {
          capability: 'Vision board',
          them: null,
          us: 'Yes -  boards per goal and life area',
        },
        {
          capability: 'Focus / Pomodoro timer',
          them: 'Yes -  focus timer free, timed intervals in Pro',
          us: 'Tracked sessions rather than a fixed Pomodoro cycle',
        },
        {
          capability: 'AI planning assistance',
          them: 'Structured Pro',
          us: null,
        },
        {
          capability: 'Apple Watch and Mac apps',
          them: 'Yes',
          us: null,
        },
        {
          capability: 'Sync across devices',
          them: 'Yes -  via iCloud',
          us: null,
        },
        {
          capability: 'Account required',
          them: 'No account needed to start',
          us: 'No account, ever',
        },
        {
          capability: 'Data stored off-device',
          them: 'Yes -  iCloud sync, calendar connections',
          us: 'No -  everything stays on your iPhone or iPad',
        },
        {
          capability: 'Price',
          them: 'Free tier plus Pro subscription',
          us: 'Free',
        },
      ],
      footnote:
        'Both products change often. If something here has gone out of date, tell us through the feedback link in the footer and we will correct it.',
    },
    screenshot: {
      src: SCREENSHOTS.timeBlocking,
      alt: 'Fezer Compare mode showing planned time blocks in one column and tracked time in another',
      caption: 'Compare mode -  the planned day and the tracked day in the same view.',
    },
    verdict: {
      heading: 'Which one should you actually use?',
      chooseThem: {
        label: 'Stay with Structured if',
        points: [
          'You want your planner on Apple Watch or Mac as well as iPhone.',
          'You need Google, Apple or Outlook calendar events pulled in automatically.',
          'You want AI to draft your schedule and reschedule what you missed.',
          'You use the app in a language other than English.',
          'Syncing across devices matters more to you than keeping data off servers.',
        ],
      },
      chooseUs: {
        label: 'Try Fezer if',
        points: [
          'You want to know where your hours actually went, not just where you meant to send them.',
          'Your time blocks keep drifting and you want a feedback loop that fixes them.',
          'You want goals that claim real hours on a real day.',
          'You would rather your plans never left your device.',
          'You want repeating routines without a subscription.',
        ],
      },
    },
    faq: [
      {
        q: 'Is Fezer free?',
        a: 'Yes. Fezer is free on the App Store with no subscription, no ads and no account. Repeating blocks, time tracking, Compare mode, goals and vision boards are all included.',
      },
      {
        q: 'Can Fezer import my Google or Apple Calendar?',
        a: 'Not today. Fezer does not connect to external calendars, because it has no server component and does not request access to your calendar accounts. If automatic calendar import is essential to you, Structured Pro handles it well.',
      },
      {
        q: 'Does Fezer sync between my iPhone and iPad?',
        a: 'No. Fezer stores everything locally on each device and never sends it anywhere, so there is no sync between devices. This is deliberate -  it is the same design decision that means your data cannot be exposed by a server breach.',
      },
      {
        q: 'What does Compare mode actually show?',
        a: 'Two columns for the same day: the blocks you planned, and the sessions you actually tracked, aligned on the same hourly timeline. You can see which blocks started late, which ran over and which never happened.',
      },
      {
        q: 'Can I switch from Structured to Fezer easily?',
        a: 'There is no automatic import. Most people rebuild their recurring blocks once -  a morning routine, standing focus blocks, regular commitments -  which takes a few minutes, and repeating blocks carry them forward from then on.',
      },
      {
        q: 'Is Fezer available on Android?',
        a: 'Not yet. Fezer is currently an iPhone and iPad app. You can request Android access from the button on the homepage and we will let you know when there is something to try.',
      },
    ],
    related: [
      { path: '/time-blocking-app', label: 'How time blocking works in Fezer' },
      { path: '/plan-vs-actual-time-tracking', label: 'See planned time against actual time' },
      { path: '/offline-planner-app', label: 'Why Fezer keeps everything on your device' },
    ],
  },

  // ---------------------------------------------------------------------------
  {
    path: '/offline-planner-app',
    navLabel: 'Offline & private',
    title: 'Offline Day Planner App for iPhone -  No Account -  Fezer',
    metaDescription:
      'Fezer is an offline day planner for iPhone and iPad. No account, no sign-up, no cloud sync and no tracking. Your schedule, goals and notes stay on your device.',
    ogSlug: 'offline-planner-app',
    h1: 'A planner with no account, no cloud and no tracking',
    intro:
      'Most planner apps want an email address before they will show you a calendar. Fezer does not have accounts at all. You install it, you open it, you plan. Nothing you write is transmitted anywhere, because there is nowhere for it to go.',
    sections: [
      {
        heading: 'What "no account" actually means here',
        paragraphs: [
          'It is not a privacy mode you switch on, or a paid tier. Fezer ships without any authentication system, without a backend and without analytics inside the app. There is no user record for you because there is no user table.',
          'The practical consequences: nothing to sign up for, nothing to log into, no password to lose, no session to expire, and no company database that can be breached with your schedule in it.',
        ],
      },
      {
        heading: 'It works with the network off',
        paragraphs: [
          'Because nothing needs a server, Fezer works exactly the same on a plane, on the underground, in a dead zone or with the device in airplane mode for a week. There is no offline mode with reduced functionality and no queue of changes waiting to sync.',
          'Your schedule, tracked sessions, goals, notes, photos and file attachments are all read from and written to local storage on the device.',
        ],
      },
      {
        heading: 'Your day is unusually revealing data',
        paragraphs: [
          'A full calendar is one of the more sensitive things you can hand to a company. It shows where you are and when, who you meet, what you are working on, how you sleep, when you exercise, when you see a doctor, and what you are trying to change about your life.',
          'That data is routinely used for advertising profiles, sold through data brokers, requested by third parties, and exposed in breaches. The most reliable way to keep a schedule private is for it never to be uploaded in the first place.',
        ],
      },
      {
        heading: 'The honest trade-offs',
        paragraphs: [
          'Keeping everything on-device costs you real conveniences, and it would be misleading to pretend otherwise. There is no sync between your iPhone and your iPad. There is no web version. There is no automatic import of your Google or Outlook calendar. If you lose the device without a backup, the data goes with it -  though an encrypted iPhone backup does capture it.',
          'If those trade-offs are unacceptable for how you work, a cloud planner is the better tool and you should use one. Fezer is built for people who would rather give up sync than give up custody of their calendar.',
        ],
      },
      {
        heading: 'What Fezer does with the privacy it buys you',
        paragraphs: [
          'Because the data never leaves, Fezer can be relaxed about how much of it you keep. Track every session with checkpoints, attach photos and documents to steps, keep long notes on goals, build vision boards -  none of it increases your exposure, because none of it is uploaded.',
          'The website you are reading does use Google Analytics, which is separate from the app. The app itself contains no analytics, no advertising identifiers and no third-party trackers.',
        ],
      },
    ],
    screenshot: {
      src: SCREENSHOTS.timeBlocking,
      alt: 'Fezer running a full day schedule on iPhone with no account and no network connection',
      caption: 'A full planner, tracker and goal system with nothing stored off the device.',
    },
    verdict: {
      heading: 'Is an offline planner right for you?',
      chooseThem: {
        label: 'Use a cloud planner if',
        points: [
          'You need the same schedule on a phone, a laptop and a browser.',
          'You share calendars with a team, a partner or an assistant.',
          'You want existing Google or Outlook events imported automatically.',
          'You would rather trust a provider’s backups than manage your own.',
        ],
      },
      chooseUs: {
        label: 'Use Fezer if',
        points: [
          'You do not want to create yet another account.',
          'Your calendar contains things you would not want on someone else’s server.',
          'You want an app that works identically with no signal.',
          'You are tired of productivity apps that mine the data you feed them.',
          'You want it to be free without being the product.',
        ],
      },
    },
    faq: [
      {
        q: 'Does Fezer need an internet connection?',
        a: 'No. Every feature works offline, permanently. Fezer does not make network requests to run, so airplane mode and dead zones change nothing about how it behaves.',
      },
      {
        q: 'Do I have to create an account to use Fezer?',
        a: 'No. Fezer has no accounts, no sign-up and no login. You install the app and start planning immediately.',
      },
      {
        q: 'Where is my data stored?',
        a: 'On your device only. Your schedule, tracked time, goals, steps, notes, photos and attachments are written to local storage on the iPhone or iPad and are never uploaded.',
      },
      {
        q: 'Does Fezer track my usage or show ads?',
        a: 'No. The app contains no analytics SDK, no advertising identifiers and no third-party trackers. There are no ads.',
      },
      {
        q: 'What happens to my data if I delete the app?',
        a: 'It is deleted with the app, because that is the only place it exists. There is no server copy to request removal of and no account to close.',
      },
      {
        q: 'Can I back up or move my data to a new phone?',
        a: 'Fezer data is included in a standard encrypted iPhone backup through iCloud Backup or Finder, so restoring a device restores your planner. There is no live sync between two devices in use at the same time.',
      },
    ],
    related: [
      { path: '/day-planner-app', label: 'See Fezer as a full day planner' },
      { path: '/structured-alternative', label: 'How Fezer compares with Structured' },
      { path: '/privacypolicy', label: 'Read the full privacy policy' },
    ],
  },

  // ---------------------------------------------------------------------------
  {
    path: '/plan-vs-actual-time-tracking',
    navLabel: 'Plan vs. actual',
    title: 'Planned vs. Actual Time Tracking on iPhone -  Fezer',
    metaDescription:
      'Fezer shows the day you planned next to the day you actually had. Time block your schedule, track real sessions, then compare planned time against actual time to fix your estimates.',
    ogSlug: 'plan-vs-actual-time-tracking',
    h1: 'Put the day you planned next to the day you had',
    intro:
      'Planners tell you what you intended. Time trackers tell you what happened. Almost nothing puts the two in the same view -  which is exactly where the useful information lives. Fezer’s Compare mode is built around that gap.',
    sections: [
      {
        heading: 'Why plans stop working after a week',
        paragraphs: [
          'The usual failure is not laziness, it is calibration. You block ninety minutes for something that reliably takes three hours. You schedule deep work at 9:00 when you have never once started before 9:40. You leave no gap between commitments because on paper they fit exactly.',
          'None of that is visible from the plan alone, and it is not visible from a time tracker alone either. It only appears when the intended day and the real day are drawn on the same axis.',
        ],
      },
      {
        heading: 'How the loop works',
        paragraphs: [
          'Plan mode is where you lay the day out in blocks, with repeating blocks carrying your routines forward. Track mode records reality -  tap Begin to start a session, add checkpoints as the work changes shape, tap End and the session lands on the timeline as a tracked block.',
          'Compare mode then draws both columns against the same hours. Planned on one side, tracked on the other. Overruns, late starts, blocks that never happened and work that was never planned at all are all immediately legible.',
        ],
      },
      {
        heading: 'What the comparison tends to reveal',
        paragraphs: [
          'Three patterns show up for almost everyone. Setup and transition time is invisible in planning and substantial in reality. Estimates for creative or open-ended work are wrong by a consistent multiple rather than randomly. And the work that quietly consumes the day is usually work that was never on the plan.',
          'Once you can see your own multiplier, estimating stops being guesswork. A block you would have written as an hour becomes ninety minutes because you have a week of evidence saying so.',
        ],
      },
      {
        heading: 'Analytics across days and weeks',
        paragraphs: [
          'Single days are noisy. Fezer’s Analytics view aggregates tracked time by front and by goal across a day or a week, so you can see where the hours are really going at a level above individual blocks.',
          'This is where the goal layer pays off: because steps are committed onto the schedule and tracked against their goal, you get an honest read on which goals are actually receiving time and which have been getting intentions.',
        ],
      },
      {
        heading: 'Not a timesheet',
        paragraphs: [
          'This is deliberately not billing software. There are no clients, no invoices, no rates, no exports for a manager and no team dashboards. Nobody else sees any of it, because it never leaves your device.',
          'The only audience for the comparison is you, and the only purpose is making the next plan more accurate than the last one.',
        ],
      },
    ],
    screenshot: {
      src: SCREENSHOTS.timeTracker,
      alt: 'Fezer time tracker with a running session and the planned block it belongs to',
      caption: 'One tap starts a tracked session; it lands beside the block you planned.',
    },
    verdict: {
      heading: 'Who this is for',
      chooseThem: {
        label: 'Probably not for you if',
        points: [
          'You need to bill clients or produce timesheets for an employer.',
          'You want a team to share tracked time with.',
          'You want tracking to happen automatically in the background.',
          'You are looking for a pure to-do list rather than a schedule.',
        ],
      },
      chooseUs: {
        label: 'Worth trying if',
        points: [
          'Your time estimates are consistently wrong and you want to know by how much.',
          'You already time block but the blocks have drifted into fiction.',
          'You suspect a large part of your week goes somewhere you cannot name.',
          'You want the feedback loop without handing your schedule to a server.',
        ],
      },
    },
    faq: [
      {
        q: 'What is planned vs. actual time tracking?',
        a: 'It is comparing the time you scheduled for something against the time it actually took. Rather than only recording hours, you record them against an intention, which turns tracking into feedback you can plan with.',
      },
      {
        q: 'Does Fezer track my time automatically?',
        a: 'No. Sessions start and stop when you tap Begin and End. Automatic tracking requires monitoring what you are doing, which would mean collecting far more about you than Fezer is willing to collect.',
      },
      {
        q: 'What are checkpoints?',
        a: 'Notes you add inside a running session to mark that the work changed shape -  finished a draft, got interrupted, switched to something else. They give a long session internal structure so you can see how it actually unfolded.',
      },
      {
        q: 'Can I see planned against actual time for a whole week?',
        a: 'Yes. Compare mode works day by day, and the Analytics view aggregates tracked time by front and by goal across a day or a week.',
      },
      {
        q: 'Is this the same as a Pomodoro timer?',
        a: 'No. A Pomodoro timer imposes a fixed cycle of work and break intervals. Fezer records sessions of whatever length actually happened, so the record reflects your real working rhythm rather than a prescribed one.',
      },
      {
        q: 'Can I export my tracked time?',
        a: 'Not currently. Fezer is built as a personal feedback loop rather than a reporting tool, and everything stays on the device.',
      },
    ],
    related: [
      { path: '/time-tracker', label: 'How the personal time tracker works' },
      { path: '/time-blocking-app', label: 'Build the day out of time blocks' },
      { path: '/structured-alternative', label: 'How Fezer compares with Structured' },
    ],
  },
];
