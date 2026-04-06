// ── STARFIELD ──
(function () {
  const c = document.getElementById('stars-canvas');
  const ctx = c.getContext('2d');
  let stars = [];
 
  function resize() {
    c.width = window.innerWidth;
    c.height = window.innerHeight;
  }
 
  function initStars() {
    stars = Array.from({ length: 180 }, () => ({
      x: Math.random() * c.width,
      y: Math.random() * c.height,
      r: Math.random() * 1.2 + .2,
      o: Math.random(),
      s: (Math.random() - .5) * .003,
    }));
  }
 
  function drawStars() {
    ctx.clearRect(0, 0, c.width, c.height);
    stars.forEach(s => {
      s.o += s.s;
      if (s.o < 0 || s.o > 1) s.s *= -1;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${s.o})`;
      ctx.fill();
    });
    requestAnimationFrame(drawStars);
  }
 
  resize();
  initStars();
  drawStars();
  window.addEventListener('resize', () => { resize(); initStars(); });
})();
 
// ── SCROLL REVEAL ──
const reveals = document.querySelectorAll('.reveal');
const obs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      obs.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
reveals.forEach(r => obs.observe(r));