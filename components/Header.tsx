export default function Header() {
  return (
    <header className="header">
      <div className="padding-global">
        <div className="container-default">
          <div className="header_wrapper">
            <a className="header_logo" href="#">
              <img src="/images/header/Client Logo (1).png" alt="Accelerate B2B" />
            </a>

            <div className="header_right">
              <div className="header_question">
                <div className="header_question-image">
                  <img src="/images/header/Frame 2147228122.png" alt="" />
                </div>
                <p className="text-label-extra-small">Got a question?</p>
              </div>
              <a className="header_link" href="#">
                <p className="text-label-extra-small white">Book Consultation</p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
