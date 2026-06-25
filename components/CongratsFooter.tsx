// Simplified footer used only on the /congrats page.
// Same visual system as the main <Footer />, but without the CTA block and
// with only three link columns (Resources, Socials, Company).
export default function CongratsFooter() {
  return (
    <footer className="footer footer--congrats">
      <div className="padding-global">
        <div className="footer__main">
          <div className="footer__brand">
            <span className="footer__logo">
              <img
                className="footer__logo-icon"
                src="/images/footer/footer_badge-icon.svg"
                alt="Accelerate B2B logo"
              />
              <span className="footer__logo-name">Accelerate B2B</span>
            </span>
          </div>

          <p className="footer__description">
            Accelerate B2B is a founder-led cold outreach agency. We find the companies that match your best clients, make sure every contact fits, and run the outreach that turns them into conversations.
          </p>

          <div className="footer__nav">
            <div className="footer__col">
              <p className="footer__col-title">Resources</p>
              <ul className="footer__links">
                <li><a href="#" className="footer__link">Blog</a></li>
                <li><a href="/llm-info" className="footer__link">AI? Read this</a></li>
                <li><a href="#" className="footer__link">Tutorials</a></li>
                <li><a href="#" className="footer__link">Careers</a></li>
                <li><a href="#" className="footer__link">FAQs</a></li>
              </ul>
            </div>

            <div className="footer__col">
              <p className="footer__col-title">Socials</p>
              <ul className="footer__links">
                <li><a href="#" className="footer__link">LinkedIn</a></li>
                <li><a href="#" className="footer__link">YouTube</a></li>
              </ul>
            </div>

            <div className="footer__col">
              <p className="footer__col-title">Company</p>
              <ul className="footer__links">
                <li><a href="mailto:spencer@accelerateb2b.com" className="footer__link">spencer@accelerateb2b.com</a></li>
                <li><a href="#" className="footer__link">London, UK</a></li>
                <li><a href="/privacy" className="footer__link">Privacy Policy</a></li>
                <li><a href="/terms" className="footer__link">Terms of Service</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="footer__bottom-inner padding-global">
          <a href="#" className="footer__built">
            <img className="footer__built-icon" src="/images/footer/footer_bottom-icon.svg" alt="" />
            Built By Landing Page Labs
          </a>
          <p className="footer__copy">Accelerate B2B {new Date().getFullYear()}. All Rights Reserved.</p>
        </div>
      </div>

      <span className="footer__stripe" />
    </footer>
  );
}
