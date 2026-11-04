(function () {
  var root = document.documentElement;
  // Theme: auto -> light -> dark -> auto.
  var order = ['auto', 'light', 'dark'];
  var names = { auto: 'Авто', light: 'Светлая', dark: 'Тёмная' };
  var icons = { auto: '◐', light: '☀', dark: '☾' };
  function setTheme(t, save) {
    root.setAttribute('data-theme', t);
    document.getElementById('themeLbl').textContent = names[t];
    document.getElementById('themeIco').textContent = icons[t];
    document.getElementById('theme').title = 'Тема: ' + names[t].toLowerCase();
    if (save) { try { localStorage.setItem('tsg-theme', t); } catch (e) {} }
  }
  setTheme(root.getAttribute('data-theme') || 'auto', false);
  document.getElementById('theme').addEventListener('click', function () {
    var cur = root.getAttribute('data-theme') || 'auto';
    setTheme(order[(order.indexOf(cur) + 1) % order.length], true);
  });

  // Mobile menu.
  var links = document.getElementById('navlinks');
  document.getElementById('burger').addEventListener('click', function () { links.classList.toggle('open'); });
  links.addEventListener('click', function (e) { if (e.target.tagName === 'A') links.classList.remove('open'); });

  // Feature filters.
  var tabs = document.querySelectorAll('#tabs .tab');
  var cards = document.querySelectorAll('#fgrid .f');
  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      tabs.forEach(function (t) { t.classList.toggle('active', t === tab); });
      var f = tab.getAttribute('data-f');
      cards.forEach(function (c) { c.classList.toggle('hide', f !== 'all' && c.getAttribute('data-c') !== f); });
    });
  });

  // Mode switches are clickable just for fun.
  document.querySelectorAll('.sw').forEach(function (s) {
    s.addEventListener('click', function () { s.classList.toggle('on'); });
  });

  // Scroll reveal.
  var els = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    els.forEach(function (el) { io.observe(el); });
  } else {
    els.forEach(function (el) { el.classList.add('in'); });
  }

  // Hero buttons go straight to the right download when it is available.
  var ua = navigator.userAgent || '';
  function mb(bytes) { return Math.round(bytes / 1048576) + ' МБ'; }
  function latest(repo, cb) {
    fetch('https://api.github.com/repos/' + repo + '/releases/latest', { headers: { Accept: 'application/vnd.github+json' } })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(cb, function () { cb(null); });
  }
  latest('warashl/warashl.github.io', function (rel) {
    if (!rel || !rel.assets) return;
    rel.assets.forEach(function (a) {
      if (/\.apk$/i.test(a.name)) {
        document.getElementById('apkLink').href = a.browser_download_url;
        document.getElementById('apkSize').textContent = mb(a.size);
        if (/Android/i.test(ua)) document.querySelector('[data-dl=android]').href = a.browser_download_url;
      }
    });
  });
  latest('warashl/TsundereGram-Desktop', function (rel) {
    var setup = document.getElementById('winSetup'), zip = document.getElementById('winZip');
    if (!rel || !rel.assets || !rel.assets.length) {
      var hint = document.getElementById('winHint');
      hint.innerHTML = '<span class="soon">скоро</span> Сборка для Windows готовится — загляни чуть позже.';
      return;
    }
    document.getElementById('winVer').textContent = rel.name || rel.tag_name;
    rel.assets.forEach(function (a) {
      if (/Setup.*\.exe$/i.test(a.name)) setup.href = a.browser_download_url;
      if (/\.zip$/i.test(a.name)) zip.href = a.browser_download_url;
    });
    if (/Windows/i.test(ua)) document.querySelector('[data-dl=windows]').href = setup.href;
  });
})();
