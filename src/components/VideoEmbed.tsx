import React from 'react';
import { Play } from 'lucide-react';
import { INTRO_VIDEO, trackEvent } from '../seo/constants';

/**
 * Click-to-load YouTube embed for the launch video. The initial render is a
 * local poster image and a play button -- no request reaches YouTube until the
 * visitor chooses to play, at which point the youtube-nocookie iframe loads
 * with autoplay. Keeps page weight down and matches the site's privacy stance.
 */
export default function VideoEmbed({ location }: { location: string }) {
  const [playing, setPlaying] = React.useState(false);

  const play = () => {
    setPlaying(true);
    trackEvent('video_play', { video_title: INTRO_VIDEO.title, link_location: location });
  };

  return (
    <div className="mx-auto w-full max-w-[300px] sm:max-w-[320px]">
      <div className="relative aspect-[9/16] overflow-hidden rounded-3xl border border-neutral-200/80 bg-neutral-900 shadow-xl shadow-[#0d2b57]/10 dark:border-neutral-800">
        {playing ? (
          <iframe
            src={`${INTRO_VIDEO.embedUrl}?autoplay=1&playsinline=1&rel=0`}
            title={INTRO_VIDEO.title}
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        ) : (
          <button
            type="button"
            onClick={play}
            className="group absolute inset-0 h-full w-full cursor-pointer"
            aria-label={`Play video: ${INTRO_VIDEO.title}`}
          >
            <img
              src={INTRO_VIDEO.cover}
              alt="Cover frame of the Introducing Fezer video showing the app on an iPhone"
              width={720}
              height={1280}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            />
            <span className="absolute inset-0 bg-black/10 transition-colors group-hover:bg-black/20" />
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/95 text-[#0d2b57] shadow-lg transition-transform duration-300 group-hover:scale-110">
                <Play className="ml-1 h-7 w-7" fill="currentColor" aria-hidden="true" />
              </span>
            </span>
            <span className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent px-4 pb-4 pt-10 text-left">
              <span className="block text-sm font-semibold text-white">{INTRO_VIDEO.title}</span>
              <span className="block text-xs text-white/80">29 seconds · YouTube</span>
            </span>
          </button>
        )}
      </div>
    </div>
  );
}
