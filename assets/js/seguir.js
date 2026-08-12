/* ============================================================
   MARVIN NÚÑEZ — Flujo guiado /seguir/ (desde el código QR)
   ============================================================ */
(function () {
  'use strict';

  var steps = document.querySelectorAll('.seguir__step');
  var dots = document.querySelectorAll('.seguir__dot');
  if (!steps.length) return;

  var current = 0;
  var pending = false;

  function track(name, params) {
    if (typeof window.gtag === 'function') window.gtag('event', name, params || {});
  }

  function show(i) {
    steps.forEach(function (s, idx) { s.classList.toggle('is-active', idx === i); });
    dots.forEach(function (d, idx) { d.classList.toggle('is-active', idx <= i); });
    current = i;
    track('seguir_paso_visto', { paso: i + 1 });
  }

  function next() {
    if (current < steps.length - 1) show(current + 1);
  }

  steps.forEach(function (step, i) {
    step.querySelectorAll('[data-platform]').forEach(function (a) {
      a.addEventListener('click', function () {
        track('seguir_click', { paso: i + 1, plataforma: a.getAttribute('data-platform') });
        pending = true;
      });
    });

    var skip = step.querySelector('[data-skip]');
    if (skip) {
      skip.addEventListener('click', function () {
        track('seguir_saltar', { paso: i + 1 });
        next();
      });
    }
  });

  // Cuando el visitante vuelve de la app (Instagram, Spotify, etc.)
  // avanzamos solo al siguiente paso.
  document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === 'visible' && pending) {
      pending = false;
      setTimeout(next, 500);
    }
  });

  show(0);
})();
