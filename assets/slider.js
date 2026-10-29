// Picture slider: adds arrows, dots and auto-advance to every .slider.
// Without this script the pictures can still be swiped/scrolled sideways.
document.querySelectorAll('.slider').forEach(function (slider) {
  var track = slider.querySelector('.slides');
  var slides = track.children;
  var count = slides.length;
  if (count < 2) return;

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var current = 0;

  // Controls: ← · dots · →
  var nav = document.createElement('div');
  nav.className = 'slider-nav';

  function button(label, text, onClick) {
    var b = document.createElement('button');
    b.type = 'button';
    b.setAttribute('aria-label', label);
    b.textContent = text;
    b.addEventListener('click', function () { stop(); onClick(); });
    return b;
  }

  var dots = [];
  nav.appendChild(button('Previous picture', '←', function () { go(current - 1); }));
  for (var i = 0; i < count; i++) {
    (function (n) {
      var dot = button('Show picture ' + (n + 1), '', function () { go(n); });
      dot.className = 'dot';
      dots.push(dot);
      nav.appendChild(dot);
    })(i);
  }
  nav.appendChild(button('Next picture', '→', function () { go(current + 1); }));
  slider.appendChild(nav);

  function go(n) {
    current = (n + count) % count;
    track.scrollTo({ left: current * track.clientWidth, behavior: reduceMotion ? 'auto' : 'smooth' });
    mark();
  }

  function mark() {
    dots.forEach(function (d, n) {
      d.setAttribute('aria-current', n === current ? 'true' : 'false');
    });
  }

  // Keep the dots in sync when someone swipes (checked once scrolling settles)
  var settle = null;
  track.addEventListener('scroll', function () {
    clearTimeout(settle);
    settle = setTimeout(function () {
      var n = Math.round(track.scrollLeft / track.clientWidth);
      if (n !== current) { current = n; mark(); }
    }, 150);
  });

  // Auto-advance every 5 s; pauses on hover/focus, stops once someone uses the controls
  var timer = null;
  function start() { if (!reduceMotion && !timer) timer = setInterval(function () { go(current + 1); }, 5000); }
  function pause() { clearInterval(timer); timer = null; }
  var stopped = false;
  function stop() { stopped = true; pause(); }
  slider.addEventListener('mouseenter', pause);
  slider.addEventListener('focusin', pause);
  slider.addEventListener('mouseleave', function () { if (!stopped) start(); });
  track.addEventListener('touchstart', stop, { passive: true });

  mark();
  start();
});
