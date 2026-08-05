// What's new -- app releases and notable website additions, newest first.
// App entries must match what actually shipped on the App Store; do not
// pre-announce unreleased features here.

export type ChangelogEntry = {
  /** ISO date, used for display and sorting. */
  date: string;
  /** 'app' renders with the version badge; 'site' marks website updates. */
  kind: 'app' | 'site';
  version?: string;
  title: string;
  items: string[];
};

export const CHANGELOG: ChangelogEntry[] = [
  {
    date: '2026-08-04',
    kind: 'site',
    title: 'Guides, FAQ, press kit and the launch video',
    items: [
      'New guides section: practical, tool-agnostic guides to time blocking, time estimation, weekly reviews and turning goals into a schedule.',
      'New comparison pages for people switching from Sunsama, TickTick, Tiimo and Todoist.',
      'A site-wide FAQ answering the most common questions in one place.',
      'A press kit with the fact sheet, downloadable assets and the "Introducing Fezer" video.',
    ],
  },
  {
    date: '2026-07-26',
    kind: 'site',
    title: 'fezer.app launches',
    items: [
      'Launched this website with feature pages for day planning, time blocking, time tracking, goals, vision boards and weekly planning.',
      'First comparison page (Fezer vs. Structured) and the offline-and-private deep dive.',
      'Android beta request form and the footer feedback form.',
    ],
  },
  {
    date: '2026-07-25',
    kind: 'app',
    version: '1.0.0',
    title: 'Fezer 1.0 on the App Store',
    items: [
      'First public release for iPhone and iPad.',
      'Schedule with Plan, Track and Compare modes -  time blocks, deadline pins and repeating blocks.',
      'One-tap time tracking with checkpoints, landing tracked sessions beside the plan.',
      'Goals organized into fronts, broken into steps, committed onto the schedule as deadlines or blocks.',
      'Vision boards for fronts and goals, with typed pins and focus lenses.',
      'Analytics across day, week, month and year, broken down by front and goal.',
      'Everything on-device: no account, no server, no analytics, free.',
    ],
  },
];
