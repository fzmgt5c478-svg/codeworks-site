(function () {
  var label = document.getElementById('cw-theme-label');
  function paintLabel() {
    if (label) label.textContent = document.documentElement.getAttribute('data-theme') === 'dark' ? 'Light' : 'Dark';
  }
  window.cwToggleTheme = function () {
    var next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    try { localStorage.setItem('cw-theme', next); } catch (e) {}
    paintLabel();
  };
  window.cwToggleMenu = function () {
    var p = document.getElementById('cw-panel'), b = document.getElementById('cw-products');
    if (!p) return;
    var open = p.classList.toggle('is-open');
    if (b) b.setAttribute('aria-expanded', open ? 'true' : 'false');
  };
  window.cwToggleNav = function () {
    var n = document.getElementById('cw-nav');
    if (n) n.classList.toggle('is-open');
  };

  // Enquiry form. Set ENDPOINT to a POST URL when the backend exists; until then
  // the form opens a prefilled mail draft so no enquiry is silently lost.
  var ENDPOINT = '';
  window.cwSubmit = function (e) {
    e.preventDefault();
    var d = new FormData(e.target), out = document.getElementById('cw-sent');
    function g(k) { return (d.get(k) || '').toString().trim(); }
    function say(t) { if (out) { out.textContent = t; out.classList.add('is-shown'); } }
    var payload = { name: g('name'), institution: g('institution'), email: g('email'), role: g('role'), intent: g('intent'), context: g('context'),
      consent: !!d.get('consent'), consentText: 'Reply to my enquiry, per the privacy policy', consentAt: new Date().toISOString() };
    if (ENDPOINT) {
      fetch(ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
        .then(function (r) { say(r.ok ? 'Thank you — we will reply within one working day.' : 'Something went wrong. Please write to sales@codeworks.ind.in.'); })
        .catch(function () { say('Something went wrong. Please write to sales@codeworks.ind.in.'); });
      return false;
    }
    var lines = ['Name: ' + payload.name, 'Institution: ' + payload.institution, 'Work email: ' + payload.email, 'Role: ' + payload.role, 'Need: ' + payload.intent, '', payload.context, '', 'Consent given ' + payload.consentAt + ' — ' + payload.consentText].join('\n');
    window.location.href = 'mailto:sales@codeworks.ind.in?subject=' + encodeURIComponent('Enquiry: ' + (payload.intent || 'Codeworks') + (payload.institution ? ' — ' + payload.institution : '')) + '&body=' + encodeURIComponent(lines);
    say('Opening your mail app — or write to sales@codeworks.ind.in.');
    return false;
  };

  var groups = document.querySelectorAll('[data-reveal]');
  if (groups.length && 'IntersectionObserver' in window) {
    var obs = new IntersectionObserver(function (entries, o) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var kids = en.target.children;
        for (var i = 0; i < kids.length; i++) kids[i].style.animationDelay = (i * 70) + 'ms';
        en.target.classList.add('is-revealed');
        o.unobserve(en.target);
      });
    }, { threshold: 0.15 });
    groups.forEach(function (g) { obs.observe(g); });
  } else {
    groups.forEach(function (g) { g.classList.add('is-revealed'); });
  }

  paintLabel();
})();
