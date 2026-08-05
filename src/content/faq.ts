// Site-wide FAQ. Rendered on /faq and mirrored into FAQPage JSON-LD in
// seo/meta.ts -- Google requires the marked-up questions and answers to match
// the visible page content, so edit here and nowhere else.

export type FaqItem = { q: string; a: string };
export type FaqGroup = { heading: string; items: FaqItem[] };

export const FAQ_GROUPS: FaqGroup[] = [
  {
    heading: 'The basics',
    items: [
      {
        q: 'What is Fezer?',
        a: 'Fezer is a day planner, time tracker and goal planner for iPhone and iPad. You plan your day in time blocks, track what actually happens with one tap, and compare the two side by side. Above the day sits a goal layer -  fronts, goals, steps and vision boards -  whose steps commit directly onto your schedule.',
      },
      {
        q: 'How much does Fezer cost?',
        a: 'Nothing. Fezer is free on the App Store with no subscription, no ads and no in-app purchases. Every feature -  repeating blocks, time tracking, Compare mode, goals, analytics and vision boards -  is included. There is no premium tier being saved for later.',
      },
      {
        q: 'Do I need to create an account?',
        a: 'No. Fezer has no accounts, no sign-up and no login. You install the app and start planning. There is no user record of you anywhere, because there is no server for one to live on.',
      },
      {
        q: 'What do I need to run Fezer?',
        a: 'An iPhone or iPad running iOS or iPadOS 26.5 or later. The app is a small download -  about 3.5 MB -  and is currently available in English.',
      },
      {
        q: 'Is Fezer available on Android, Mac or the web?',
        a: 'Not today. Fezer runs on iPhone and iPad only, and because everything is stored on-device there is no web version. You can request Android access from the button on the homepage and we will let you know when there is something to try.',
      },
    ],
  },
  {
    heading: 'Privacy and your data',
    items: [
      {
        q: 'Where is my data stored?',
        a: 'On your device, and only there. Your schedule, tracked sessions, goals, steps, notes, photos and attachments are written to local storage on your iPhone or iPad and are never uploaded. The App Store privacy label reads "Data Not Collected" because there is nothing collected.',
      },
      {
        q: 'Does Fezer work offline?',
        a: 'Yes -  permanently and completely. Fezer makes no network requests to function, so airplane mode, dead zones and week-long disconnection change nothing about how it behaves.',
      },
      {
        q: 'Does Fezer sync between my iPhone and iPad?',
        a: 'No. Each device keeps its own local data and nothing is transmitted anywhere, so there is no sync between devices. This is a deliberate design decision, not a missing feature: the same architecture that prevents sync is what guarantees your schedule cannot leak from a server.',
      },
      {
        q: 'How do I back up my data or move it to a new phone?',
        a: 'Fezer data is included in a standard iPhone backup through iCloud Backup or a computer, so restoring a device from backup restores your planner with it. There is no separate export or live sync between two devices in use at the same time.',
      },
      {
        q: 'How do I delete my data?',
        a: 'Delete the app. Your data exists only on your device, so removing the app removes all of it. There is no server copy to request deletion of and no account to close.',
      },
    ],
  },
  {
    heading: 'Features',
    items: [
      {
        q: 'What is Compare mode?',
        a: 'The view that puts your planned day and your actual day side by side on the same hourly timeline -  planned blocks in one column, tracked sessions in the other. Late starts, overruns, blocks that never happened and work that was never planned all become visible at a glance, which is what makes the next day’s plan more realistic than the last.',
      },
      {
        q: 'How does time tracking work?',
        a: 'One tap on Begin starts a session; checkpoints let you drop notes or photos along the way; End lands the session on your schedule as a tracked block. Sessions can attach to a front, goal or step so the time counts toward something. There is no automatic background tracking -  that would require monitoring you, which Fezer will not do.',
      },
      {
        q: 'Can Fezer import my Google, Apple or Outlook calendar?',
        a: 'No. Fezer has no server component and does not connect to external calendar accounts, so meetings from other calendars are not pulled in. If automatic calendar import is essential to how you work, a cloud planner is the better tool for you.',
      },
      {
        q: 'Does Fezer have repeating blocks for routines?',
        a: 'Yes -  a block can repeat every day, on weekdays, every week or every two weeks, so your morning routine and standing commitments rebuild themselves and you only plan the exceptions.',
      },
      {
        q: 'What are fronts?',
        a: 'Fronts are the areas of your life -  health, family, work, a side project -  and every goal belongs to one. Because tracked time rolls up by front, your weekly analytics show which areas of your life actually received hours and which were quietly starved.',
      },
    ],
  },
  {
    heading: 'Support',
    items: [
      {
        q: 'How do I report a bug or request a feature?',
        a: 'Use the Send feedback link in the footer of this site -  it takes a message, an optional email if you want a reply, and an optional screenshot. Feedback goes straight to the developer and genuinely shapes what gets built next.',
      },
      {
        q: 'Who makes Fezer?',
        a: 'Fezer is built by an independent developer, not a company with a data business. That is part of why the app can afford to be free and collect nothing: there are no investors expecting your data to become the product.',
      },
    ],
  },
];

/** Flat list used for FAQPage JSON-LD. */
export const FAQ_ITEMS: FaqItem[] = FAQ_GROUPS.flatMap((group) => group.items);
