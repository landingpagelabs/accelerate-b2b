const tabs = document.querySelectorAll('.tabs__tab');
const panels = ['tabs_all', 'tab_1', 'tab_2', 'tab_3'];

const wrap = document.querySelector('.tabs__more-wrap');
const btn = wrap ? wrap.querySelector('.tabs__more') : null;

function getActivePanel() {
  return panels
    .map(p => document.querySelector('.' + p))
    .find(el => el && el.style.display === 'grid');
}

function resetMoreBtn() {
  if (!wrap) return;
  wrap.classList.remove('is-expanded');
}

function resetAllPanels() {
  panels.forEach(p => {
    const el = document.querySelector('.' + p);
    if (!el) return;

    el.style.display = 'none';
    el.classList.remove('is-expanded');

    el.querySelectorAll('.tabs__card:nth-child(n+5)').forEach(card => {
      card.style.display = '';
    });

    const fade = el.querySelector('.tabs__fade');
    if (fade) {
      fade.style.opacity = '';
    }
  });
}

function initMoreBtn() {
  if (!wrap) return;

  wrap.addEventListener('click', () => {
    const activePanel = getActivePanel();

    const expanded = wrap.classList.toggle('is-expanded');
    const isExpanded = wrap.classList.contains('is-expanded');

    // fade — усі .tabs__fade на сторінці
    document.querySelectorAll('.tabs__fade').forEach(el => {
      el.style.opacity = isExpanded ? '0' : '1';
    });

    if (!activePanel) return;

    activePanel.classList.toggle('is-expanded', expanded);

    // show/hide extra cards
    activePanel.querySelectorAll('.tabs__card:nth-child(n+5)').forEach(card => {
      card.style.display = expanded ? 'grid' : '';
    });
  });
}

tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('tabs__tab--active'));
    tab.classList.add('tabs__tab--active');

    resetAllPanels();
    resetMoreBtn();

    const el = document.querySelector('.' + panels[index]);
    if (el) {
      el.style.display = 'grid';
    }
  });
});

// INIT FIRST TAB
panels.forEach((p, i) => {
  const el = document.querySelector('.' + p);
  if (!el) return;

  el.style.display = i === 0 ? 'grid' : 'none';
});

initMoreBtn();