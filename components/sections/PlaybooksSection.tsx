const ICONS: Record<string, JSX.Element> = {
  website: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5.05807 3.57233L15.7394 7.47533C16.7757 7.85403 16.7457 9.32983 15.6949 9.66613L11.1272 11.1278L9.66557 15.6952C9.32927 16.7461 7.85327 16.776 7.47477 15.7396L3.57277 5.05743C3.23477 4.13213 4.13287 3.23423 5.05807 3.57233Z" fill="#FF6B2C" stroke="#FF6B2C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  lookalike: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16.317 4.051L10.317 2.051C10.112 1.983 9.889 1.983 9.684 2.051L3.684 4.051C3.276 4.187 3 4.569 3 5V12C3 16.792 9.557 17.94 9.836 17.986C9.89 17.995 9.945 18 10 18C10.055 18 10.11 17.996 10.164 17.986C10.443 17.94 17 16.792 17 12V5C17 4.569 16.726 4.188 16.317 4.051ZM10.001 6C11.38 6 12.501 7.122 12.501 8.5C12.501 9.878 11.38 11 10.001 11C8.622 11 7.501 9.878 7.501 8.5C7.501 7.122 8.622 6 10.001 6ZM10.001 15.981C9.424 15.86 7.479 15.383 6.192 14.297C7.115 13.184 8.482 12.499 10.001 12.499C11.52 12.499 12.887 13.184 13.81 14.297C12.523 15.382 10.578 15.859 10.001 15.981Z" fill="#316BFF" />
    </svg>
  ),
  tech: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3.10156 10.4922C3.65056 11.9142 6.52556 13.0002 9.99956 13.0002C13.4736 13.0002 16.3486 11.9142 16.8976 10.4922" stroke="#12A557" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3.10156 14.4922C3.65056 15.9142 6.52556 17.0002 9.99956 17.0002C13.4736 17.0002 16.3486 15.9142 16.8976 14.4922" stroke="#12A557" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 9C13.866 9 17 7.65685 17 6C17 4.34315 13.866 3 10 3C6.13401 3 3 4.34315 3 6C3 7.65685 6.13401 9 10 9Z" fill="#12A557" stroke="#12A557" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  news: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16.5 7H15.5C15.2239 7 15 7.22386 15 7.5V16.5C15 16.7761 15.2239 17 15.5 17H16.5C16.7761 17 17 16.7761 17 16.5V7.5C17 7.22386 16.7761 7 16.5 7Z" fill="#316BFF" stroke="#316BFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10.5 11H9.5C9.22386 11 9 11.2239 9 11.5V16.5C9 16.7761 9.22386 17 9.5 17H10.5C10.7761 17 11 16.7761 11 16.5V11.5C11 11.2239 10.7761 11 10.5 11Z" fill="#316BFF" stroke="#316BFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4.5 15H3.5C3.22386 15 3 15.2239 3 15.5V16.5C3 16.7761 3.22386 17 3.5 17H4.5C4.77614 17 5 16.7761 5 16.5V15.5C5 15.2239 4.77614 15 4.5 15Z" fill="#316BFF" stroke="#316BFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6 3H10V7" stroke="#316BFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 3L3 10" stroke="#316BFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  jobs: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7 7V4C7 3.4477 7.4477 3 8 3H12C12.5523 3 13 3.4477 13 4V7" stroke="#12A557" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M18 9.6599V9.5C18 7.5703 16.4297 6 14.5 6H5.5C3.5703 6 2 7.5703 2 9.5V9.6599C7.316 11.4215 12.684 11.4215 18 9.6599Z" fill="#12A557" />
      <path d="M10 12.9929C7.3298 12.9929 4.6592 12.5798 2 11.7627V13.5002C2 15.4299 3.5703 17.0002 5.5 17.0002H14.5C16.4297 17.0002 18 15.4299 18 13.5002V11.7627C15.3408 12.5798 12.6702 12.9929 10 12.9929Z" fill="#12A557" />
    </svg>
  ),
  linkedin: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 2H6C3.794 2 2 3.794 2 6V14C2 16.206 3.794 18 6 18H14C16.206 18 18 16.206 18 14V6C18 3.794 16.206 2 14 2ZM7.278 8.052L8.799 7.3L9.551 5.779C9.719 5.438 10.28 5.438 10.447 5.779L11.199 7.3L12.72 8.052C12.891 8.136 12.998 8.31 12.998 8.5C12.998 8.69 12.891 8.864 12.72 8.948L11.199 9.7L10.447 11.221C10.363 11.391 10.189 11.499 9.999 11.499C9.809 11.499 9.635 11.391 9.551 11.221L8.799 9.7L7.278 8.948C7.107 8.864 7 8.69 7 8.5C7 8.31 7.107 8.136 7.278 8.052ZM14 16H6C5.755 16 5.523 15.95 5.307 15.869C6.006 13.849 7.858 12.5 10 12.5C12.142 12.5 13.994 13.849 14.693 15.869C14.476 15.95 14.244 16 14 16Z" fill="#FF6B2C" />
    </svg>
  ),
};

const ArrowIcon = (
  <svg className="playbooks__arrow" width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2.375 9.5H16.625H16.2292" stroke="#212121" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="square" />
    <path d="M11.875 15.0418C11.875 11.8752 14.25 10.2918 16.625 9.896V9.10433C14.25 8.7085 11.875 7.12516 11.875 3.9585" stroke="#212121" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="square" />
  </svg>
);

export default function PlaybooksSection({ section }: { section: any }) {
  const cards: any[] = section.cards || [];

  return (
    <section className="section_playbooks">
      <div className="padding-global">
        <div className="playbooks__container">
          <h2 className="title-h2 playbooks__title">{section.heading}</h2>
          <ul className="playbooks__grid">
            {cards.map((card: any, i: number) => (
              <li key={i} className="playbooks__card">
                <div className="playbooks__head">
                  <span className="playbooks__icon">{ICONS[card.icon] || ICONS.website}</span>
                  <h3 className="playbooks__card-title">{card.title}</h3>
                </div>
                <div className="playbooks__body">
                  <div className="playbooks__text">{card.description}</div>
                  <a
                    className="playbooks__link"
                    href={card.buttonUrl || '#'}
                  >
                    <span>{card.buttonText || 'View The Playbook'}</span>
                    {ArrowIcon}
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
