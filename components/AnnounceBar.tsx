// Top announcement strip shown above the header on the home page.
// Soft blurred gradient (from Figma) sits centered behind the text.
type Props = {
  enabled?: boolean;
  text?: string;
  linkText?: string;
  linkUrl?: string;
  showArrow?: boolean;
};

export default function AnnounceBar({
  enabled = true,
  text = 'NEW: Get Replies Risk-Free And Try Us Out First With A',
  linkText = 'Free Test Campaign',
  linkUrl = '/booking',
  showArrow = true,
}: Props) {
  if (enabled === false) return null;

  return (
    <div className="announce-bar">
      <svg
        className="announce-bar__bg"
        width="1125"
        height="40"
        viewBox="0 0 1125 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <g opacity="0.6">
          <g opacity="0.2" filter="url(#announce_f0)">
            <ellipse cx="562.5" cy="20" rx="458.5" ry="43" fill="#EF7E3D" />
          </g>
          <g opacity="0.2" filter="url(#announce_f1)">
            <ellipse cx="908" cy="20" rx="113" ry="43" fill="#FABE6E" />
          </g>
          <g opacity="0.2" filter="url(#announce_f2)">
            <circle cx="978" cy="20" r="43" fill="#F9B4D1" />
          </g>
        </g>
        <defs>
          <filter id="announce_f0" x="0" y="-127" width="1125" height="294" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
            <feGaussianBlur stdDeviation="52" result="effect1_foregroundBlur" />
          </filter>
          <filter id="announce_f1" x="691" y="-127" width="434" height="294" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
            <feGaussianBlur stdDeviation="52" result="effect1_foregroundBlur" />
          </filter>
          <filter id="announce_f2" x="831" y="-127" width="294" height="294" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
            <feGaussianBlur stdDeviation="52" result="effect1_foregroundBlur" />
          </filter>
        </defs>
      </svg>

      <p className="announce-bar__text">
        {text}{' '}
        <a className="announce-bar__link" href={linkUrl}>
          <span className="announce-bar__link-text">{linkText}</span>
          {showArrow && <span className="announce-bar__arrow" aria-hidden="true">→</span>}
        </a>
      </p>
    </div>
  );
}
