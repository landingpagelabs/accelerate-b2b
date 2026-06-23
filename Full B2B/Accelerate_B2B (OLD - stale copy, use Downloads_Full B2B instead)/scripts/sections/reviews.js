document.addEventListener("DOMContentLoaded", function () {

  var msnry;

  function initMasonry(grid) {
    return new Masonry(grid, {
      itemSelector: '.reviews_item',
      columnWidth: 353,
      gutter: 10,
      horizontalOrder: true
    });
  }

  // Tabs
  const tabs = document.querySelectorAll('.reviews_tab');
  const tabContents = [
    document.querySelector('.reviews_tab-all'),
    document.querySelector('.reviews_tab-1'),
    document.querySelector('.reviews_tab-2'),
    document.querySelector('.reviews_tab-3'),
  ];

  // Показати перший таб за замовчуванням
  tabContents.forEach(content => {
    if (content) content.style.display = 'none';
  });
  if (tabContents[0]) tabContents[0].style.display = 'block';

  // Ініціалізація masonry для першого таба
  const firstGrid = tabContents[0] ? tabContents[0].querySelector('.reviews_list') : null;
  if (firstGrid) {
    msnry = initMasonry(firstGrid);
  }

  window.addEventListener("load", function () {
    if (msnry) msnry.layout();
  });

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', function () {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      tabContents.forEach(content => {
        if (content) content.style.display = 'none';
      });

      if (tabContents[index]) {
        tabContents[index].style.display = 'block';

        const grid = tabContents[index].querySelector('.reviews_list');
        if (grid) {
          if (msnry) msnry.destroy();
          msnry = initMasonry(grid);

          setTimeout(() => {
            msnry.layout();
          }, 100);
        }
      }

      // Скидаємо стан Show More при зміні таба
      const cta = document.querySelector('.reviews_cta');
      const swapText = document.querySelector('.reviews_swap-text');
      const ctaMinus = document.querySelector('.reviews_cta-minus');
      const ctaPlus = document.querySelector('.reviews_cta-plus');

      if (cta && cta.classList.contains('expanded')) {
        cta.classList.remove('expanded');
        swapText.textContent = 'Show More Reviews';
        ctaMinus.classList.remove('active');
        ctaPlus.classList.remove('hidden');
      }
    });
  });

  // Show More / Show Less
  const cta = document.querySelector('.reviews_cta');
  const swapText = document.querySelector('.reviews_swap-text');
  const ctaMinus = document.querySelector('.reviews_cta-minus');
  const ctaPlus = document.querySelector('.reviews_cta-plus');

  if (cta) {
    cta.addEventListener('click', function () {
      const activeTab = tabContents.find(content => content && content.style.display === 'block');
      if (!activeTab) return;

      const hiddenItems = activeTab.querySelectorAll('.reviews_list .reviews_item:nth-child(n+10)');
      const isExpanded = cta.classList.contains('expanded');

      if (isExpanded) {
        hiddenItems.forEach(item => item.style.display = 'none');
        swapText.textContent = 'Show More Reviews';
        ctaMinus.classList.remove('active');
        ctaPlus.classList.remove('hidden');
        cta.classList.remove('expanded');
      } else {
        hiddenItems.forEach(item => item.style.display = 'block');
        swapText.textContent = 'Show Less Reviews';
        ctaMinus.classList.add('active');
        ctaPlus.classList.add('hidden');
        cta.classList.add('expanded');
      }

      setTimeout(() => {
        if (msnry) msnry.layout();
      }, 100);
    });
  }
});

(function () {
  const numInput = document.querySelector('.meeting_form-number');
  const thumbFill = document.querySelector('.progress-thumb');
  const track = document.querySelector('.progress-bar');
  const multiSpan = document.querySelector('.progress-multi');

  const MULTIPLIER = 5;
  const MAX = 100;

  function update(val) {
    val = Math.max(0, Math.min(MAX, Math.round(val)));
    const pct = val / MAX;

    thumbFill.style.width = (pct * 100) + '%';

    multiSpan.textContent = val * MULTIPLIER;
    numInput.value = val;
  }

  numInput.addEventListener('input', () => {
    update(parseInt(numInput.value) || 0);
  });

  let dragging = false;

  function getPct(clientX) {
    const rect = track.getBoundingClientRect();
    return Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
  }

  track.addEventListener('mousedown', (e) => {
    dragging = true;
    update(Math.round(getPct(e.clientX) * MAX));
  });

  track.addEventListener('touchstart', (e) => {
    dragging = true;
    update(Math.round(getPct(e.touches[0].clientX) * MAX));
  }, { passive: true });

  document.addEventListener('mousemove', (e) => {
    if (!dragging) return;
    update(Math.round(getPct(e.clientX) * MAX));
  });

  document.addEventListener('touchmove', (e) => {
    if (!dragging) return;
    update(Math.round(getPct(e.touches[0].clientX) * MAX));
  }, { passive: true });

  document.addEventListener('mouseup', () => dragging = false);
  document.addEventListener('touchend', () => dragging = false);

  update(0);
})(); 