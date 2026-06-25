// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Theme toggle (persists in localStorage). Light is default.
(function () {
  var root = document.documentElement;
  var btn = document.getElementById('theme-toggle');
  var stored = localStorage.getItem('theme');

  function apply(theme) {
    if (theme === 'dark') {
      root.setAttribute('data-theme', 'dark');
      btn.textContent = 'lights on';
      btn.setAttribute('aria-pressed', 'true');
    } else {
      root.removeAttribute('data-theme');
      btn.textContent = 'lights off';
      btn.setAttribute('aria-pressed', 'false');
    }
  }

  var initial = stored
    ? stored
    : (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

  apply(initial);

  btn.addEventListener('click', function () {
    var isDark = root.getAttribute('data-theme') === 'dark';
    var next = isDark ? 'light' : 'dark';
    apply(next);
    localStorage.setItem('theme', next);
  });
})();

// Smooth scroll for in-page nav links
document.querySelectorAll('.jumps a[href^="#"]').forEach(function (link) {
  link.addEventListener('click', function (e) {
    var target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// Subtle film-grain texture, drawn once as a small tile and repeated via CSS background.
// Avoids painting a full-viewport pixel buffer, which is wasteful and can jank on resize.
(function () {
  var canvas = document.getElementById('grain');
  if (!canvas) return;

  var TILE = 128;
  canvas.width = TILE;
  canvas.height = TILE;

  var ctx = canvas.getContext('2d');
  if (!ctx) return;

  var imageData = ctx.createImageData(TILE, TILE);
  var data = imageData.data;

  for (var i = 0; i < data.length; i += 4) {
    var v = Math.floor(Math.random() * 255);
    data[i] = v;
    data[i + 1] = v;
    data[i + 2] = v;
    data[i + 3] = 255;
  }

  ctx.putImageData(imageData, 0, 0);

  var url = canvas.toDataURL();
  canvas.style.backgroundImage = 'url(' + url + ')';
  canvas.style.backgroundRepeat = 'repeat';
})();
