'use client';

import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';

const ROWS = [
  {
    label: 'No-cost test campaign?',
    values: ['We prove it before you pay', 'Pay upfront and hope', "It's all on you"],
  },
  {
    label: 'Reach buyers who want it?',
    values: ['Custom, intent-driven data', 'Generic Apollo filters', '$20k+ and months of dev'],
  },
  {
    label: 'Proven across industries?',
    values: ['PE, SaaS, agencies + more', 'Rarely works across industries', 'Only your own business'],
  },
  {
    label: 'Multi-channel, not just email?',
    values: ['Email + LinkedIn, connected', 'Usually one channel', 'Whatever you can manage'],
  },
  {
    label: 'Independently verified proof?',
    values: ['Top-rated & verified on Upwork', 'Just trust their claims', 'No independent proof'],
  },
  {
    label: 'Proven at enterprise level?',
    values: ['Ford, Coupa, RMA Group', 'Varies by provider', 'Costly, hard to hire'],
  },
];

export default function ComparisonTableSection() {
  const rowCount = ROWS.length + 1; // + header row

  return (
    <section className="section_comparison-table">
      <div className="padding-global">
        <div className="container-default">
          <div className="ct_wrapper">
            <h2 className="title-h2">Why Ford, Coupa and dozens of businesses choose us</h2>

            <div className="ct_scroll-wrap">
              <div className="ct_hand">
                <img src="/images/sections/comparison-table/hand-cursor.webp" alt="" />
              </div>
              <SimpleBar className="ct_scroll" autoHide={false}>
              <div className="ct_outer">
                <div className="ct_grid">
                  <div className="ct-card ct-card--white" style={{ gridColumn: 1, gridRow: `2 / ${rowCount + 1}` }} />
                  <div className="ct-card ct-card--orange" style={{ gridRow: `1 / ${rowCount + 1}` }} />
                  <div className="ct-card ct-card--white" style={{ gridColumn: 3, gridRow: `1 / ${rowCount + 1}` }} />
                  <div className="ct-card ct-card--white" style={{ gridColumn: 4, gridRow: `1 / ${rowCount + 1}` }} />

                  {/* Header row */}
                  <div className="ct-cell ct-cell--label ct-cell--header" style={{ gridColumn: 1, gridRow: 1 }} />
                  <div className="ct-cell ct-cell--orange ct-cell--header" style={{ gridColumn: 2, gridRow: 1 }}>
                    <img className="ct-logo-icon" src="/images/sections/comparison-table/client-icon.svg" alt="" />
                    <span className="ct-logo-text">Accelerate B2B</span>
                  </div>
                  <div className="ct-cell ct-cell--white ct-cell--header" style={{ gridColumn: 3, gridRow: 1 }}>
                    <p className="ct-header-text">Other Agencies</p>
                  </div>
                  <div className="ct-cell ct-cell--white ct-cell--header" style={{ gridColumn: 4, gridRow: 1 }}>
                    <p className="ct-header-text">DIY / In-house</p>
                  </div>

                  {/* Data rows */}
                  {ROWS.map((row, i) => {
                    const gridRow = i + 2;
                    const isLast = i === ROWS.length - 1;
                    return (
                      <div key={i} style={{ display: 'contents' }}>
                        <div
                          className={`ct-cell ct-cell--label${isLast ? ' ct-cell--last' : ''}`}
                          style={{ gridColumn: 1, gridRow }}
                        >
                          {row.label}
                        </div>
                        <div
                          className={`ct-cell ct-cell--orange${isLast ? ' ct-cell--last' : ''}`}
                          style={{ gridColumn: 2, gridRow }}
                        >
                          {row.values[0]}
                        </div>
                        <div
                          className={`ct-cell ct-cell--white${isLast ? ' ct-cell--last' : ''}`}
                          style={{ gridColumn: 3, gridRow }}
                        >
                          {row.values[1]}
                        </div>
                        <div
                          className={`ct-cell ct-cell--white${isLast ? ' ct-cell--last' : ''}`}
                          style={{ gridColumn: 4, gridRow }}
                        >
                          {row.values[2]}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              </SimpleBar>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
