/* ---- Desktop Nav Dropdown ---- */
function toggleNav(id) {
  var item = document.getElementById(id);
  var isOpen = item.classList.contains('open');
  document.querySelectorAll('.nav-item.open').forEach(function(el) { el.classList.remove('open'); });
  if (!isOpen) item.classList.add('open');
}

document.addEventListener('click', function(e) {
  if (!e.target.closest('.nav-item')) {
    document.querySelectorAll('.nav-item.open').forEach(function(el) { el.classList.remove('open'); });
  }
});

/* ---- Mobile Menu ---- */
var hamburger = document.getElementById('hamburger');
var panel = document.getElementById('mobileMenuPanel');
var overlay = document.getElementById('menuOverlay');

function openMenu() {
  hamburger.classList.add('open');
  panel.classList.add('open');
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeMenu() {
  hamburger.classList.remove('open');
  panel.classList.remove('open');
  overlay.classList.remove('open');
  document.body.style.overflow = '';
}

hamburger.addEventListener('click', function() {
  panel.classList.contains('open') ? closeMenu() : openMenu();
});

overlay.addEventListener('click', closeMenu);

panel.querySelectorAll('a:not(.mobile-call-btn)').forEach(function(link) {
  link.addEventListener('click', closeMenu);
});

document.querySelector('.mobile-call-btn').addEventListener('click', closeMenu);

/* ---- Mobile Accordion ---- */
function toggleAccordion(contentId, btnId) {
  var content = document.getElementById(contentId);
  var btn = document.getElementById(btnId);
  var isOpen = content.classList.contains('open');
  content.classList.toggle('open', !isOpen);
  btn.classList.toggle('open', !isOpen);
}

/* ---- Smooth Scroll (same-page anchors only) ---- */
document.querySelectorAll('a[href^="#"]').forEach(function(a) {
  a.addEventListener('click', function(e) {
    var href = this.getAttribute('href');
    if (href === '#') return;
    var target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    var h = document.querySelector('header').offsetHeight;
    window.scrollTo({ top: target.getBoundingClientRect().top + window.pageYOffset - h, behavior: 'smooth' });
  });
});

/* ---- Active Nav Link ---- */
(function() {
  var path = window.location.pathname.split('/').pop() || 'index.html';

  /* Top-level links (Ana Sayfa, Hizmetler, İletişim) */
  document.querySelectorAll('.nav-item > a, .mobile-nav-link').forEach(function(l) {
    var href = l.getAttribute('href');
    if (!href) return;
    var hrefPage = href.split('#')[0] || 'index.html';
    if (hrefPage === path) l.classList.add('active');
  });

  /* Dropdown links -> highlight parent toggle (Hakkımızda / Projeler) */
  document.querySelectorAll('.nav-dropdown a').forEach(function(l) {
    var hrefPage = l.getAttribute('href').split('#')[0];
    if (hrefPage === path) {
      var navItem = l.closest('.nav-item');
      if (navItem) {
        var btn = navItem.querySelector('button');
        if (btn) btn.classList.add('active');
      }
    }
  });

  document.querySelectorAll('.mobile-accordion-content a').forEach(function(l) {
    var hrefPage = l.getAttribute('href').split('#')[0];
    if (hrefPage === path) {
      var content = l.closest('.mobile-accordion-content');
      var btn = document.getElementById(content.id + 'Btn');
      if (btn) btn.classList.add('active');
    }
  });

  /* Same-page section highlighting on scroll */
  var sections = document.querySelectorAll('main section[id], main div[id]');
  window.addEventListener('scroll', function() {
    var y = window.pageYOffset + 120;
    sections.forEach(function(s) {
      if (y >= s.offsetTop && y < s.offsetTop + s.offsetHeight) {
        var matches = document.querySelectorAll('a[href="#' + s.id + '"], a[href="' + path + '#' + s.id + '"]');
        matches.forEach(function(l) {
          if (l.closest('.nav-item') || l.classList.contains('mobile-nav-link')) {
            document.querySelectorAll('.nav-item > a, .mobile-nav-link').forEach(function(x) {
              if (x.getAttribute('href').charAt(0) === '#' || x.getAttribute('href').split('#')[0] === path) {
                if (x.getAttribute('href').includes('#')) x.classList.remove('active');
              }
            });
            l.classList.add('active');
          }
        });
      }
    });
  }, { passive: true });
})();

/* ---- References Carousel ---- */
document.querySelectorAll('.ref-carousel').forEach(function(carousel) {
  var track = carousel.querySelector('.ref-track');
  var cards = carousel.querySelectorAll('.ref-card');
  var prevBtn = carousel.querySelector('.ref-arrow.prev');
  var nextBtn = carousel.querySelector('.ref-arrow.next');
  var index = 0;

  function visibleCount() {
    if (window.innerWidth <= 480) return 1;
    if (window.innerWidth <= 768) return 2;
    if (window.innerWidth <= 1024) return 3;
    return 5;
  }

  function update() {
    var max = Math.max(0, cards.length - visibleCount());
    if (index > max) index = max;
    if (index < 0) index = 0;
    var cardWidth = cards[0].getBoundingClientRect().width;
    var gap = 24;
    track.style.transform = 'translateX(-' + (index * (cardWidth + gap)) + 'px)';
  }

  nextBtn.addEventListener('click', function() {
    var max = Math.max(0, cards.length - visibleCount());
    index = Math.min(index + 1, max);
    update();
  });

  prevBtn.addEventListener('click', function() {
    index = Math.max(index - 1, 0);
    update();
  });

  window.addEventListener('resize', update);
  update();
});
