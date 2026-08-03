/* ============================================================
   MARVIN NÚÑEZ — Scripts del sitio
   ============================================================ */
(function () {
  'use strict';

  /* ---------- Almacenamiento seguro ---------- */
  var store = {
    get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  };

  /* ==========================================================
     1. IDIOMA
     ========================================================== */
  var LANGS = ['es', 'en'];

  function detectLang() {
    var saved = store.get('mn-lang');
    if (saved && LANGS.indexOf(saved) > -1) return saved;
    // El español es siempre el idioma de entrada. El inglés es una opción
    // manual del visitante, nunca se detecta automáticamente del dispositivo.
    return 'es';
  }

  function applyLang(lang) {
    var dict = (window.I18N && window.I18N[lang]) || {};

    // Texto
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      if (dict[key]) el.textContent = dict[key];
    });

    // Atributos: data-i18n-attr="placeholder:news.placeholder,aria-label:nav.menu"
    document.querySelectorAll('[data-i18n-attr]').forEach(function (el) {
      el.getAttribute('data-i18n-attr').split(',').forEach(function (pair) {
        var parts = pair.split(':');
        var attr = (parts[0] || '').trim();
        var key = (parts[1] || '').trim();
        if (attr && dict[key]) el.setAttribute(attr, dict[key]);
      });
    });

    // Bloques exclusivos de un idioma: data-lang="es" / data-lang="en"
    // (se excluyen los botones del propio interruptor .lang-switch, que
    // reutilizan data-lang para otro fin y no deben ocultarse nunca)
    document.querySelectorAll('[data-lang]').forEach(function (el) {
      if (el.closest('.lang-switch')) return;
      el.setAttribute('data-lang-hide', el.getAttribute('data-lang') !== lang ? 'true' : 'false');
    });

    document.documentElement.lang = lang;
    store.set('mn-lang', lang);

    document.querySelectorAll('.lang-switch button').forEach(function (b) {
      b.setAttribute('aria-pressed', b.dataset.lang === lang ? 'true' : 'false');
    });

    document.dispatchEvent(new CustomEvent('langchange', { detail: { lang: lang } }));
  }

  function initLang() {
    applyLang(detectLang());
    document.addEventListener('click', function (e) {
      var btn = e.target.closest('.lang-switch button');
      if (btn && btn.dataset.lang) applyLang(btn.dataset.lang);
    });
    // Un bloque .reveal que empieza oculto por idioma nunca cruza el
    // IntersectionObserver, así que al cambiar de idioma y mostrarlo
    // quedaría transparente para siempre. Lo revelamos a mano.
    document.addEventListener('langchange', function () {
      document.querySelectorAll('.reveal:not(.is-visible)').forEach(function (el) {
        if (getComputedStyle(el).display !== 'none') el.classList.add('is-visible');
      });
    });
  }

  /* ==========================================================
     2. HEADER + MENÚ MÓVIL
     ========================================================== */
  function initHeader() {
    var header = document.querySelector('.site-header');
    if (header) {
      var onScroll = function () {
        header.classList.toggle('is-stuck', window.scrollY > 40);
      };
      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });
    }

    var burger = document.querySelector('.burger');
    var menu = document.getElementById('mobile-menu');
    if (!burger || !menu) return;

    function setMenu(open) {
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      menu.classList.toggle('is-open', open);
      document.body.style.overflow = open ? 'hidden' : '';
    }

    burger.addEventListener('click', function () {
      setMenu(burger.getAttribute('aria-expanded') !== 'true');
    });

    menu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { setMenu(false); });
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') setMenu(false);
    });
  }

  /* ==========================================================
     3. REVEAL AL HACER SCROLL
     ========================================================== */
  function initReveal() {
    var items = document.querySelectorAll('.reveal');
    if (!items.length) return;

    if (!('IntersectionObserver' in window)) {
      items.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

    items.forEach(function (el, i) {
      el.style.transitionDelay = Math.min(i % 6, 5) * 70 + 'ms';
      io.observe(el);
    });
  }

  /* ==========================================================
     4. PESTAÑAS (Música)
     ========================================================== */
  function initTabs() {
    document.querySelectorAll('[data-tabs]').forEach(function (group) {
      var tabs = group.querySelectorAll('.tab');
      tabs.forEach(function (tab) {
        tab.addEventListener('click', function () {
          tabs.forEach(function (t) {
            var panel = document.getElementById(t.getAttribute('aria-controls'));
            var on = t === tab;
            t.setAttribute('aria-selected', on ? 'true' : 'false');
            if (panel) panel.hidden = !on;
          });
        });
      });
    });
  }

  /* ==========================================================
     5. GOOGLE CALENDAR — próximos eventos
     ========================================================== */
  var CAL_ID = 'je8uubih156f9ut71p2jjrle74@group.calendar.google.com';
  var CAL_KEY = 'AIzaSyD-JuRMcup1KuqCHJIH2aDhQFqt-k9iCDQ';

  function t(key, fallback) {
    var lang = document.documentElement.lang || 'es';
    var dict = (window.I18N && window.I18N[lang]) || {};
    return dict[key] || fallback || key;
  }

  function renderEvents(container, items) {
    var lang = document.documentElement.lang === 'en' ? 'en-US' : 'es-ES';
    container.innerHTML = '';

    if (!items || !items.length) {
      container.innerHTML = '<p class="event-empty">' + t('events.empty') + '</p>';
      return;
    }

    items.forEach(function (ev) {
      var start = new Date(ev.start.dateTime || ev.start.date + 'T12:00:00');
      var month = start.toLocaleDateString(lang, { month: 'short' }).replace('.', '').toUpperCase();
      var day = start.toLocaleDateString(lang, { day: '2-digit' });

      var timeStr = ev.start.dateTime
        ? start.toLocaleTimeString(lang, { hour: 'numeric', minute: '2-digit' })
        : '';
      var place = [ev.location || '', timeStr].filter(Boolean).join(' · ');

      var a = document.createElement('a');
      a.className = 'event';
      a.href = ev.htmlLink || '#';
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      a.innerHTML =
        '<div class="event__date">' +
          '<span class="event__month">' + month + '</span>' +
          '<span class="event__day">' + day + '</span>' +
        '</div>' +
        '<div>' +
          '<div class="event__title"></div>' +
          (place ? '<div class="event__place"></div>' : '') +
        '</div>' +
        '<span class="event__go">' + t('events.details') + ' →</span>';

      a.querySelector('.event__title').textContent = ev.summary || 'Evento';
      if (place) a.querySelector('.event__place').textContent = place;

      container.appendChild(a);
    });
  }

  function loadEvents(container) {
    var max = parseInt(container.dataset.max || '5', 10);
    var url = 'https://www.googleapis.com/calendar/v3/calendars/' +
      encodeURIComponent(CAL_ID) + '/events' +
      '?key=' + CAL_KEY +
      '&maxResults=' + max +
      '&orderBy=startTime&singleEvents=true' +
      '&timeMin=' + new Date().toISOString();

    container.innerHTML = '<p class="event-empty">' + t('events.loading') + '</p>';

    fetch(url)
      .then(function (r) { return r.json(); })
      .then(function (data) {
        container._items = data.items || [];
        renderEvents(container, container._items);
      })
      .catch(function () {
        container.innerHTML = '<p class="event-empty">' + t('events.error') + '</p>';
      });
  }

  function initEvents() {
    var containers = document.querySelectorAll('[data-events]');
    if (!containers.length) return;
    containers.forEach(loadEvents);

    // Redibujar fechas al cambiar de idioma
    document.addEventListener('langchange', function () {
      containers.forEach(function (c) {
        if (c._items) renderEvents(c, c._items);
      });
    });
  }

  /* ==========================================================
     6. FORMULARIOS (Formspree, sin recargar)
     ========================================================== */
  function initForms() {
    document.querySelectorAll('form[data-ajax]').forEach(function (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var btn = form.querySelector('button[type="submit"]');
        var original = btn ? btn.textContent : '';
        if (btn) { btn.disabled = true; btn.textContent = t('form.sending'); }

        fetch(form.action, {
          method: form.method || 'POST',
          body: new FormData(form),
          headers: { Accept: 'application/json' }
        })
          .then(function (res) {
            if (!res.ok) throw new Error('bad response');
            var box = document.createElement('div');
            box.className = 'form-success';
            box.innerHTML = '<h3></h3><p class="mt-2"></p>';
            box.querySelector('h3').textContent = t('form.okTitle');
            box.querySelector('p').textContent = t('form.okBody');
            form.replaceWith(box);
          })
          .catch(function () {
            if (btn) { btn.disabled = false; btn.textContent = original; }
            var err = form.querySelector('.form-error');
            if (!err) {
              err = document.createElement('p');
              err.className = 'form-error form-note';
              err.style.color = '#E38B8B';
              form.appendChild(err);
            }
            err.textContent = t('form.error');
          });
      });
    });
  }

  /* ==========================================================
     7. COPIAR AL PORTAPAPELES (Kit de prensa)
     ========================================================== */
  function initCopy() {
    document.querySelectorAll('[data-copy]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var target = document.getElementById(btn.dataset.copy);
        if (!target) return;
        var text = target.innerText.trim();
        var done = function () {
          var prev = btn.textContent;
          btn.textContent = t('press.copied');
          setTimeout(function () { btn.textContent = prev; }, 1800);
        };
        if (navigator.clipboard) {
          navigator.clipboard.writeText(text).then(done).catch(done);
        } else {
          var ta = document.createElement('textarea');
          ta.value = text;
          document.body.appendChild(ta);
          ta.select();
          try { document.execCommand('copy'); } catch (e) {}
          document.body.removeChild(ta);
          done();
        }
      });
    });
  }

  /* ==========================================================
     8. AÑO EN EL FOOTER
     ========================================================== */
  function initYear() {
    document.querySelectorAll('[data-year]').forEach(function (el) {
      el.textContent = new Date().getFullYear();
    });
  }

  /* ---------- Arranque ---------- */
  function init() {
    initLang();
    initHeader();
    initReveal();
    initTabs();
    initEvents();
    initForms();
    initCopy();
    initYear();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
