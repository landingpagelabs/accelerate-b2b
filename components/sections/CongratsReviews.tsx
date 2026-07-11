'use client';

import { useState } from 'react';
import { Stars, VerifiedLogo } from './ReviewsSection';
import VideoModal from './VideoModal';

const IMG = '/images/sections/reviews/congrats';
const HEADING = 'When you send the right message to the right person, you get results, see for yourself...';

// Placeholder until real videos are available — nature timelapse from Vimeo ("The Mountain").
// Once real links are provided, swap each into the videoUrl prop of the corresponding VideoCard.
const DEFAULT_VIDEO_URL = 'https://vimeo.com/22439234';

// Image-only result card (e.g. a reply screenshot, no title) → "Replies"
function ImageCard({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="reviews_item image" data-cat="reply">
      <div className="reviews_image">
        <img src={src} alt={alt} />
      </div>
    </div>
  );
}

// Result card with a title on top + an image (grey stat card) → "Results"
function ResultCard({ title, src }: { title: string; src: string }) {
  return (
    <div className="reviews_item image" data-cat="result">
      <div className="reviews_item-title">
        <p className="text-label-extra-small">{title}</p>
      </div>
      <div className="reviews_image">
        <img src={src} alt={title} />
      </div>
    </div>
  );
}

// Text testimonial card (stars + verified + quote + author)
function ReviewCard({
  quote,
  authorName = 'Verified Upwork review',
  authorRole = 'Cold email & outbound client',
  avatar = `${IMG}/upwork-avatar.png`,
}: {
  quote: string;
  authorName?: string;
  authorRole?: string;
  avatar?: string;
}) {
  return (
    <div className="reviews_item no-video" data-cat="testimonial">
      <div className="reviews_item-content">
        <div className="reviews_head">
          <Stars />
          <VerifiedLogo />
        </div>
        <div className="reviews_text text-body-regular">{quote}</div>
        <div className="reviews_avatar-info">
          <div className="reviews_avatar-image">
            <img src={avatar} alt={authorName} />
          </div>
          <div className="reviews_avatar-info-flex">
            <p className="text-label-extra-small">{authorName}</p>
            <p className="text-label-extra-small">{authorRole}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Video testimonial card (thumbnail + quote + author)
function VideoCard({
  thumb,
  quote,
  authorName,
  authorRole,
  avatar,
  videoUrl = DEFAULT_VIDEO_URL,
  onPlay,
}: {
  thumb: string;
  quote: string;
  authorName: string;
  authorRole: string;
  avatar: string;
  videoUrl?: string;
  onPlay: (url: string) => void;
}) {
  return (
    <div className="reviews_item" data-cat="testimonial">
      <button type="button" className="reviews_video" aria-label="Play video" onClick={() => onPlay(videoUrl)}>
        <div className="reviews_video-thumb" style={{ backgroundImage: `url(${thumb})` }} />
      </button>
      <div className="reviews_item-content">
        <div className="reviews_head">
          <Stars />
          <VerifiedLogo />
        </div>
        <div className="reviews_text text-body-regular">{quote}</div>
        <div className="reviews_avatar-info">
          <div className="reviews_avatar-image">
            <img src={avatar} alt={authorName} />
          </div>
          <div className="reviews_avatar-info-flex">
            <p className="text-label-extra-small">{authorName}</p>
            <p className="text-label-extra-small">{authorRole}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

const TABS = [
  { label: 'All', value: 'all' },
  { label: 'Testimonials', value: 'testimonial' },
  { label: 'Results', value: 'result' },
  { label: 'Replies', value: 'reply' },
];

export default function CongratsReviews() {
  const [expanded, setExpanded] = useState(false);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('all');

  return (
    <section className="reviews">
      <div className="padding-global">
        <div className="container-default">
          <div className="reviews_wrapper">
            <div className="reviews_title-wrap">
              <h2 className="title-h2">{HEADING}</h2>
            </div>

            <div className="tabs__switcher reviews_switcher">
              {TABS.map((tab) => (
                <button
                  key={tab.value}
                  type="button"
                  className={`tabs__tab${activeTab === tab.value ? ' tabs__tab--active' : ''}`}
                  onClick={() => { setActiveTab(tab.value); setExpanded(false); }}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className={`reviews_list-wrap${expanded ? ' is-expanded' : ' is-collapsed'}`}>
              <div className={`reviews_list${activeTab !== 'all' ? ` is-filter-${activeTab}` : ''}`}>
                {/* ----- COLUMN 1 ----- */}
                <div className="reviews_col">
                  {/* 1 */}
                  <ImageCard src={`${IMG}/item1-reply.webp`} alt="Positive reply" />
                  {/* 2 */}
                  <VideoCard
                    thumb={`${IMG}/item2-video-thumb.webp`}
                    quote="“Spencer took us from zero to 50,000 emails a month. He made it simple, educating us on what each tool does and why. In very short order we had three opportunities that came solely through the cold email infrastructure he set up. We're only increasing volume now.”"
                    authorName="Matt Hickerson"
                    authorRole="VP of Operations, Forge Origination"
                    avatar={`${IMG}/item2-avatar.png`}
                    onPlay={setActiveVideo}
                  />
                  {/* 3 */}
                  <ResultCard title="95 opportunities in 30 days" src={`${IMG}/item3-95opp.webp`} />
                  {/* 4 */}
                  <ReviewCard quote="“Spencer is extremely knowledgeable, really great feedback on our setup and look forward to working with him again soon!”" />
                  {/* 5 */}
                  <ImageCard src={`${IMG}/item5-reply.png`} alt="Positive reply" />
                  {/* 6 */}
                  <ReviewCard quote="“Spencer is great at what he does with cold email. He knows how to set up the systems and makes recommendations to get the best results from your campaigns. He is always available, professional, and kind. I recommend him to anyone looking for someone to help with their prospecting.”" />
                  {/* 7 */}
                  <ResultCard title="118 opportunities, 1 campaign" src={`${IMG}/item7-118opp.png`} />
                  {/* 8 */}
                  <ReviewCard quote="“It was a pleasure to work with Spencer. Great know-how and communication skills. He went above and beyond and I would definitely ask for his services for other projects.”" />
                  {/* 9 */}
                  <ReviewCard quote="“Working with Spencer on my email outreach campaign was an excellent experience. He is extremely professional, highly responsive, and always goes the extra mile to make sure everything runs smoothly. Communication was clear and consistent throughout, and he delivered exactly what I was looking for. Beyond his skills, he's simply a great guy to work with, reliable, easygoing, and trustworthy. I'd highly recommend Spencer to anyone looking for top-notch outreach support.”" />
                  {/* 10 */}
                  <ResultCard title="11 opportunities per 1K emails" src={`${IMG}/item10-11opp.png`} />
                </div>

                {/* ----- COLUMN 2 ----- */}
                <div className="reviews_col">
                  {/* 1 — same as home */}
                  <VideoCard
                    thumb={`${IMG}/col2-item1-video-thumb.webp`}
                    quote="“Spencer and his team set up an awesome off-market sourcing engine. We ran a test: 5,000 contacts, about 10,000 emails, and 100 positive responses. 16 were a fit, and two went under contract in 30 days, off-market, for minimal cost. They know exactly what they're doing. Highly recommend!”"
                    authorName="Ben Kelly"
                    authorRole="Owner, LH Capital Group"
                    avatar={`${IMG}/col2-item1-avatar.png`}
                    onPlay={setActiveVideo}
                  />
                  {/* 2 — same as home */}
                  <ResultCard title="9.5% reply rate across 261,000 emails" src={`${IMG}/col2-item2-9_5reply.webp`} />
                  {/* 3 — same as home */}
                  <ReviewCard quote="“Thank God for Spencer. I was looking for someone who genuinely knew what they were doing with cold email and someone I trusted, and finding Spencer was like finding a unicorn. He's the real deal: incredibly knowledgeable, responsive, kind, and professional. If you're looking for a cold email expert, you'd be making a mistake not to hire him on the spot.”" />
                  {/* 4 */}
                  <VideoCard
                    thumb={`${IMG}/col2-item4-video.png`}
                    quote="“Spencer has been an instrumental part of our team over the past few months. The results of his work have been undeniable, and our email blasts have dramatically increased. We look forward to building a long-term partnership.”"
                    authorName="Ahmed Saeed"
                    authorRole="Owner, LolaBird Fundraising"
                    avatar={`${IMG}/col2-item4-avatar.png`}
                    onPlay={setActiveVideo}
                  />
                  {/* 5 */}
                  <ImageCard src={`${IMG}/col2-item5.png`} alt="Positive reply" />
                  {/* 6 */}
                  <ResultCard title="31% positive reply rate" src={`${IMG}/col2-item6.png`} />
                  {/* 7 */}
                  <ImageCard src={`${IMG}/col2-item7.png`} alt="Positive reply" />
                  {/* 8 */}
                  <ImageCard src={`${IMG}/col2-item8.png`} alt="Positive reply" />
                  {/* 9 */}
                  <ImageCard src={`${IMG}/col2-item9.png`} alt="Positive reply" />
                  {/* 10 */}
                  <ResultCard title="41% of replies converted" src={`${IMG}/col2-item10.png`} />
                  {/* 11 */}
                  <ResultCard title="Up to 35% reply rate" src={`${IMG}/col2-item11.png`} />
                </div>

                {/* ----- COLUMN 3 ----- */}
                <div className="reviews_col">
                  {/* 1 — same as home */}
                  <VideoCard
                    thumb={`${IMG}/col3-item1-video-thumb.webp`}
                    quote="“If you're looking for help with email deliverability, Spencer is your go-to guy. We had severe trouble with emails landing in spam and bouncing when they shouldn't have. Spencer solved all of it, and our deliverability has never been better. I can't speak highly enough about him!”"
                    authorName="Penny Dawson"
                    authorRole="Owner, LolaBird Fundraising"
                    avatar={`${IMG}/col3-item1-avatar.png`}
                    onPlay={setActiveVideo}
                  />
                  {/* 2 — same as home */}
                  <ResultCard title="618 opportunities" src={`${IMG}/col3-item2-618opp.png`} />
                  {/* 3 — same as home */}
                  <VideoCard
                    thumb={`${IMG}/col3-item3-video-thumb.webp`}
                    quote="“Thank you for being the brains behind our newest email campaigns. We were feeling stuck, and you've been so easy to work with. You've helped us connect with people in a really authentic way, and it's showing. We're seeing the results.”"
                    authorName="Cyndi"
                    authorRole="Verified client review"
                    avatar={`${IMG}/col3-item3-avatar.png`}
                    onPlay={setActiveVideo}
                  />
                  {/* 4 */}
                  <ResultCard title="97 opportunities" src={`${IMG}/col3-item4.png`} />
                  {/* 5 */}
                  <ReviewCard quote="“Spencer worked with us to automate our lead generation workflow. He spent time fully understanding how we ran the process manually, made a solid plan with suggestions and then implemented it. His work ethic and attention to detail made the build part of the project smooth. Spencer went above and beyond with the final delivery. Communication was extremely clear and regular. We always felt we knew what stage the project was at. Most importantly the outcome of the project has been amazing. In a day the automation can produce what would have taken one of our team members a whole year to do. We're over the moon and excited to see the impact that this will have on our business. Thank you for your hard work Spencer.”" />
                  {/* 6 */}
                  <ImageCard src={`${IMG}/col3-item6.png`} alt="Positive reply" />
                  {/* 7 */}
                  <ResultCard title="201 replies, one campaign" src={`${IMG}/col3-item7.png`} />
                  {/* 8 */}
                  <ReviewCard
                    quote="“What took a team member a full year, the automation now does in a day. We're over the moon.”"
                    authorName="Richard Edwards"
                    authorRole="Vibra Media"
                  />
                </div>
              </div>

              <div className="reviews_fade" />

              <div
                className={`reviews_cta${expanded ? ' expanded' : ''}`}
                onClick={() => setExpanded((v) => !v)}
              >
                <div className="reviews_image-2">
                  <img src="/images/sections/reviews/Frame 2147227456.png" alt="" />
                </div>
                <p className="reviews_cta-badge-text d-none">Trusted By 30+ B2B Businesses</p>
                <span className="reviews_cta-divider" />
                <p className="reviews_swap-text">
                  {expanded ? 'Show Less Reviews' : 'Show More Reviews'}
                </p>
                <span className="reviews_cta-icon">
                  <span className={`reviews_cta-minus${expanded ? ' active' : ''}`}>−</span>
                  <span className={`reviews_cta-plus${expanded ? ' hidden' : ''}`}>+</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <VideoModal videoUrl={activeVideo} onClose={() => setActiveVideo(null)} />
    </section>
  );
}
