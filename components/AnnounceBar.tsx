// Top announcement strip shown above the header on the home page.
// Solid peach bar (from Figma) with a white pill CTA button on the right.
type Props = {
  enabled?: boolean;
  text?: string;
  linkText?: string;
  linkUrl?: string;
  showArrow?: boolean;
};

export default function AnnounceBar({
  enabled = true,
  text = 'NEW: Get Your Pilot Campaign Launched Risk-Free (Limited Spots) | Launch A',
  linkText = 'Free Test Campaign',
  linkUrl = '#apply-form',
  showArrow = true,
}: Props) {
  if (enabled === false) return null;

  return (
    <div className="announce-bar">
      <p className="announce-bar__text">{text}</p>
      <a className="announce-bar__cta" href={linkUrl}>
        <span className="announce-bar__cta-text">{linkText}</span>
        {showArrow && (
          <svg
            className="announce-bar__cta-icon"
            width="13"
            height="13"
            viewBox="0 0 13 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path d="M1.625 7.08594H11.375H11.1042" stroke="#1A1A1A" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="square" />
            <path d="M8.125 10.8763C8.125 8.70964 9.75 7.6263 11.375 7.35547V6.8138C9.75 6.54297 8.125 5.45964 8.125 3.29297" stroke="#1A1A1A" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="square" />
          </svg>
        )}
      </a>
    </div>
  );
}
