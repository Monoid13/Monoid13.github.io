/* Renders the site from window.SITE (defined in content.js).
   You normally don't need to touch this file — edit content.js / use editor.html instead. */
(function () {
  "use strict";

  var ICONS = {
    github: '<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>',
    linkedin: '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>',
    twitter: '<path d="M4 4l16 16M20 4L4 20"/>',
    mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 6-10 7L2 6"/>',
    scholar: '<path d="M22 10 12 5 2 10l10 5 10-5z"/><path d="M6 12v5c3 2 9 2 12 0v-5"/>',
    cv: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M16 13H8M16 17H8"/>',
    link: '<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>',
    sun: '<circle cx="12" cy="12" r="4.5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>',
    moon: '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>'
  };
  var DEFAULT_ORDER = ["about", "news", "tripos", "experience", "projects", "custom", "education", "publications", "skills", "puzzles", "contact"];
  var THEME_KEY = "site-theme";
  var root = document.documentElement;
  var app = document.getElementById("app");
  var isPreview = /[?&]preview=1\b/.test(location.search) && window.parent !== window;
  var reduced = !!(window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches);
  var lastSite = null;

  /* ---------- helpers ---------- */
  var ESC = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return ESC[c]; }); }
  function unesc(s) { return s.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&amp;/g, "&"); }
  function safeUrl(u, isImage) {
    u = String(u == null ? "" : u).trim();
    if (!u) return "";
    var scheme = u.replace(/[\s\u0000-\u001f]/g, "").toLowerCase();
    if (/^(javascript|vbscript):/.test(scheme)) return "";
    if (/^data:/.test(scheme) && !(isImage && /^data:image\//.test(scheme))) return "";
    return u;
  }
  function ext(url) { return /^https?:/i.test(url) ? ' target="_blank" rel="noopener"' : ""; }
  function a(text, url, cls) {
    var u = safeUrl(url);
    if (!u) return text;
    return '<a href="' + esc(u) + '"' + (cls ? ' class="' + cls + '"' : "") + ext(u) + ">" + text + "</a>";
  }
  function icon(name) { return '<svg class="i" viewBox="0 0 24 24" aria-hidden="true">' + (ICONS[name] || ICONS.link) + "</svg>"; }
  function guessIcon(url) {
    url = String(url || "").toLowerCase();
    if (url.indexOf("mailto:") === 0) return "mail";
    if (url.indexOf("github.com") > -1) return "github";
    if (url.indexOf("linkedin.com") > -1) return "linkedin";
    if (/\/\/(www\.)?(twitter|x)\.com/.test(url)) return "twitter";
    if (url.indexOf("scholar.google") > -1 || url.indexOf("orcid.org") > -1 || url.indexOf("researchgate") > -1) return "scholar";
    if (/\.pdf($|[?#])/.test(url)) return "cv";
    return "link";
  }
  function slug(s) { return String(s || "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "page"; }
  function list(str) { return String(str || "").split(",").map(function (t) { return t.trim(); }).filter(Boolean); }
  function items(arr) { return (arr || []).filter(function (x) { return x && typeof x === "object"; }); }
  function fmt(v) { try { return Number(v).toLocaleString("en-GB"); } catch (e) { return String(v); } }

  /* Tiny markdown: **bold**, *italic*, `code`, [text](url), "- " lists, blank line = paragraph */
  function inline(s) {
    var h = esc(s);
    h = h.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, function (m, text, url) { return a(text, unesc(url)); });
    h = h.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
         .replace(/(^|[^*\w])\*([^*\s][^*]*?)\*/g, "$1<em>$2</em>")
         .replace(/`([^`]+)`/g, "<code>$1</code>");
    return h;
  }
  function md(s) {
    return String(s || "").split(/\n\s*\n/).map(function (b) { return b.trim(); }).filter(Boolean).map(function (b) {
      var lines = b.split("\n");
      if (lines.every(function (l) { return /^\s*[-*]\s+/.test(l); })) {
        return "<ul>" + lines.map(function (l) { return "<li>" + inline(l.replace(/^\s*[-*]\s+/, "")) + "</li>"; }).join("") + "</ul>";
      }
      return "<p>" + lines.map(inline).join("<br>") + "</p>";
    }).join("");
  }

  /* ---------- section renderers ---------- */
  function when(e) { return [e.start, e.end].filter(Boolean).map(esc).join(" – "); }
  function entries(arr, titleKey, orgKey) {
    var l = items(arr);
    if (!l.length) return "";
    return l.map(function (e) {
      var org = e[orgKey] ? a(esc(e[orgKey]), e.url) : "", title = esc(e[titleKey]);
      var meta = [when(e), esc(e.location)].filter(Boolean).join(" · ");
      return '<div class="entry"><div class="entry-head">' + (org ? "<strong>" + org + "</strong>" : "") + (org && title ? " — " : "") + title + "</div>" +
        (meta ? '<div class="entry-meta">' + meta + "</div>" : "") +
        (e.description ? '<div class="prose">' + md(e.description) + "</div>" : "") + "</div>";
    }).join("");
  }
  function chart(str, label) {
    var rows = String(str || "").split(",").map(function (x) {
      var i = x.lastIndexOf(":");
      if (i < 0) return null;
      var v = parseFloat(x.slice(i + 1).replace(/[^0-9.\-]/g, ""));
      return isNaN(v) ? null : [x.slice(0, i).trim(), v];
    }).filter(Boolean);
    if (!rows.length) return "";
    var max = Math.max.apply(null, rows.map(function (r) { return Math.abs(r[1]); })) || 1;
    return '<figure class="chart">' + (label ? "<figcaption>" + esc(label) + "</figcaption>" : "") + rows.map(function (r) {
      return '<div class="bar-row"><span class="bar-l">' + esc(r[0]) + '</span><span class="bar-track"><span class="bar" style="width:' +
        (100 * Math.abs(r[1]) / max).toFixed(1) + '%"></span></span><span class="bar-v">' + esc(fmt(r[1])) + "</span></div>";
    }).join("") + "</figure>";
  }

  var RENDER = {
    highlights: function (sec) {
      var l = items(sec.items).filter(function (h) { return h.value || h.label; });
      if (!l.length) return "";
      return "<ul>" + l.map(function (h) { return "<li><strong>" + esc(h.value) + "</strong> — " + inline(h.label) + "</li>"; }).join("") + "</ul>";
    },
    about: function (sec) { return sec.text ? '<div class="prose">' + md(sec.text) + "</div>" + (sec.more ? '<div class="prose">' + md(sec.more) + "</div>" : "") : ""; },
    news: function (sec) {
      var l = items(sec.items);
      if (!l.length) return "";
      return '<table class="news"><tbody>' + l.map(function (n) {
        var img = safeUrl(n.image, true);
        return '<tr><th scope="row">' + esc(n.date) + "</th><td>" + inline(n.text) +
          (img ? '<a class="news-img" href="' + esc(img) + '" target="_blank" rel="noopener"><img src="' + esc(img) + '" alt="' + esc(n.imageAlt || "") + '" loading="lazy"></a>' : "") +
          "</td></tr>";
      }).join("") + "</tbody></table>";
    },
    tripos: function (sec) {
      var notes = items(sec.notes);
      var parts = items(sec.parts).filter(function (p) { return p.name || p.courses; });
      if (!parts.length) return "";
      return (sec.intro ? '<p class="desc">' + inline(sec.intro) + "</p>" : "") + parts.map(function (p) {
        return (p.name ? "<h3 class=\"part\">" + esc(p.name) + "</h3>" : "") + '<div class="courses">' + list(p.courses).map(function (c) {
          var mine = notes.filter(function (n) {
            return String(n.course || "").trim().toLowerCase() === c.toLowerCase() &&
              String(n.part || "").trim().toLowerCase() === String(p.key || "").trim().toLowerCase();   // a note's "part" picks the list it appears in
          });
          var body = mine.length ? mine.map(function (n) {
            var f = safeUrl(n.file);
            return '<details class="note-fold"><summary><span class="note-title">' + esc(n.title || "Notes") + "</span></summary>" +
              '<div class="note-slot"' + (f ? ' data-src="' + esc(f) + '"' : "") + ">" +
              (f ? '<p class="muted">Loading…</p>' : '<div class="note"><div class="prose">' + md(n.text) + "</div></div>") + "</div>" +
              '<div class="note-close-row"><button type="button" class="note-close">Close this note</button></div></details>';
          }).join("") : '<p class="muted">Nothing here yet.</p>';
          return '<details class="course"><summary>' + esc(c) +
            (mine.length ? '<span class="count">' + mine.length + (mine.length === 1 ? " note" : " notes") + "</span>" : "") +
            '</summary><div class="course-body">' + body + "</div></details>";
        }).join("") + "</div>";
      }).join("");
    },
    experience: function (sec) { return entries(sec.items, "role", "organization"); },
    education: function (sec) { return entries(sec.items, "degree", "institution"); },
    projects: function (sec) {
      var l = items(sec.items);
      if (!l.length) return "";
      return '<ol class="numbered">' + l.map(function (p) {
        var links = [];
        if (safeUrl(p.url)) links.push(a("Website", p.url));
        if (safeUrl(p.repo)) links.push(a("Code", p.repo));
        var meta = list(p.tags).map(esc).join(" · ");
        return '<li><div class="item-title">' + a(esc(p.name), p.url || p.repo) + "</div>" +
          (p.description ? "<p>" + inline(p.description) + "</p>" : "") +
          (meta || links.length ? '<div class="entry-meta">' + [meta].concat(links).filter(Boolean).join(" · ") + "</div>" : "") +
          chart(p.chart, p.chartLabel) + "</li>";
      }).join("") + "</ol>";
    },
    publications: function (sec, site) {
      var l = items(sec.items), me = esc((site.profile || {}).name || "");
      if (!l.length) return "";
      return '<ol class="numbered">' + l.map(function (p) {
        var authors = esc(p.authors);
        if (me) authors = authors.split(me).join("<strong>" + me + "</strong>");
        var venue = [esc(p.venue), esc(p.year)].filter(Boolean).join(", ");
        var links = [["PDF", p.pdf], ["Code", p.code]].filter(function (x) { return safeUrl(x[1]); }).map(function (x) { return a(x[0], x[1]); });
        return '<li><div class="item-title">' + a(esc(p.title), p.url || p.pdf) + "</div>" +
          (authors ? "<div>" + authors + "</div>" : "") + (venue ? '<div class="entry-meta"><em>' + venue + "</em></div>" : "") +
          (links.length ? '<div class="entry-meta">' + links.join(" · ") + "</div>" : "") + "</li>";
      }).join("") + "</ol>";
    },
    skills: function (sec) {
      var l = items(sec.groups);
      if (!l.length) return "";
      return "<ul>" + l.map(function (g) { return "<li><strong>" + esc(g.name) + ":</strong> " + list(g.list).map(esc).join(", ") + "</li>"; }).join("") + "</ul>";
    },
    puzzles: function (sec) {
      var l = items(sec.items).filter(function (p) { return p.question; });
      if (!l.length) return "";
      return (sec.intro ? "<p>" + inline(sec.intro) + "</p>" : "") + l.map(function (p) {
        return '<div class="puzzle"><div class="prose">' + md(p.question) + "</div>" +
          (p.answer ? '<button class="reveal-btn" type="button" aria-expanded="false">Show answer</button>' +
            '<div class="puzzle-a prose" hidden>' + md(p.answer) + "</div>" : "") + "</div>";
      }).join("");
    },
    contact: function (sec, site) {
      var email = (site.profile || {}).email;
      var h = sec.text ? '<div class="prose">' + md(sec.text) + "</div>" : "";
      if (email) h += '<p>Email: <a href="mailto:' + esc(email) + '">' + esc(email) + "</a></p>";
      return h;
    }
  };

  /* ---------- pages ---------- */
  function pagesOf(site) {
    var ps = items(site.pages).filter(function (p) { return p.title; });
    if (!ps.length) ps = [{ title: "About", sections: (Array.isArray(site.sectionOrder) ? site.sectionOrder : DEFAULT_ORDER).join(",") }];
    var seen = {};
    return ps.map(function (p, i) {
      var s = i === 0 ? "" : slug(p.title);
      while (seen[s]) s += "-2";
      seen[s] = true;
      return { title: p.title, intro: p.intro, slug: s, keys: list(p.sections) };
    });
  }
  function currentSlug() { var m = location.hash.match(/^#\/([\w-]*)/); return m ? m[1] : ""; }

  function sectionsFor(page, site, isHome) {
    var out = [];
    page.keys.forEach(function (key) {
      if (key === "custom") {
        items(site.customSections).forEach(function (cs, i) {
          if (cs.show === false || !cs.text && !cs.title) return;
          out.push('<section id="x-' + slug(cs.title || "custom-" + i) + '" data-custom><h2>' + esc(cs.title) + '</h2><div class="prose">' + md(cs.text) + "</div></section>");
        });
        return;
      }
      if (isHome && key === "about") return;                // the home page draws About itself
      var sec = site[key], fn = RENDER[key];
      if (!sec || !fn || sec.show === false) return;
      var inner = fn(sec, site);
      if (!inner) return;
      var h = "<h2>" + esc(sec.title || key) + "</h2>";
      if (sec.collapse) {                                   // folded by default: a click opens it
        out.push('<section id="' + key + '"><details class="fold"><summary>' + h +
          '<span class="fold-hint">' + esc(sec.collapse) + "</span></summary>" + inner + "</details></section>");
      } else {
        out.push('<section id="' + key + '">' + h + inner + "</section>");
      }
    });
    return out.join("");
  }

  function home(page, site) {
    var p = site.profile || {}, ab = site.about || {};
    var av = safeUrl(p.avatar, true), banner = safeUrl(p.banner, true);
    var showAbout = page.keys.indexOf("about") > -1 && ab.show !== false;
    var social = items(site.links).filter(function (l) { return safeUrl(l.url); }).map(function (l) {
      var ic = !l.icon || l.icon === "auto" ? guessIcon(l.url) : l.icon;
      return a(icon(ic), l.url, "social").replace("<a ", '<a title="' + esc(l.label || "") + '" aria-label="' + esc(l.label || l.url) + '" ');
    });
    if (safeUrl(p.cvUrl)) social.unshift(a('<span class="cv-glyph" aria-hidden="true">CV</span>', p.cvUrl, "social").replace("<a ", '<a title="CV" aria-label="CV" '));
    return '<h1 class="page-title">' + esc(p.name) + "</h1>" +
      (p.headline ? '<p class="desc">' + inline(p.headline) + "</p>" : "") +
      '<div class="banner">' + (banner ? '<img src="' + esc(banner) + '" alt="">' : '<canvas aria-hidden="true"></canvas>') + "</div>" +
      '<div class="intro clearfix" id="about">' +
        (av ? '<img class="profile-pic" src="' + esc(av) + '" alt="' + esc(p.name) + '">' : "") +
        (showAbout && ab.text ? '<div class="prose">' + md(ab.text) + "</div>" : "") +
        (safeUrl(p.cvUrl) ? "<p>My " + a("CV", p.cvUrl) + ".</p>" : "") +
        (p.email ? '<p>Email: <a href="mailto:' + esc(p.email) + '">' + esc(p.email) + "</a></p>" : "") +
        (showAbout && ab.more ? '<div class="prose">' + md(ab.more) + "</div>" : "") +
      "</div>" +
      sectionsFor(page, site, true) +
      (social.length ? '<div class="social-row">' + social.join("") + "</div>" : "");
  }

  /* ---------- theme ---------- */
  function storedTheme() { if (isPreview) return null; try { return localStorage.getItem(THEME_KEY); } catch (e) { return null; } }
  function applyTheme(pref) {
    var t = storedTheme() || pref || "auto";
    if (t === "light" || t === "dark") root.setAttribute("data-theme", t); else root.removeAttribute("data-theme");
  }
  function effectiveTheme() {
    return root.getAttribute("data-theme") || (window.matchMedia && matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  }
  function themeIcon() { return icon(effectiveTheme() === "dark" ? "sun" : "moon"); }

  /* ---------- banner: gold random-walk price paths over moving water ---------- */
  var stopBanner = null;
  function startBanner(canvas) {
    var ctx = canvas.getContext && canvas.getContext("2d");
    if (!ctx) return;
    var dpr = Math.min(window.devicePixelRatio || 1, 2), W = 0, H = 0, paths = [], raf = null, visible = true, io = null;
    function gauss() { var u = 1 - Math.random(), v = Math.random(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v); }
    function makePath(i) {
      var n = 150, pts = [], y = H * (0.35 + Math.random() * 0.45), vol = H * 0.022;
      for (var k = 0; k < n; k++) { pts.push(y); y += gauss() * vol; y = Math.max(H * 0.1, Math.min(H * 0.95, y)); }
      return { pts: pts, t: 0, speed: 0.3 + Math.random() * 0.4, alpha: 0.25 + 0.12 * (i % 3), fade: 1 };
    }
    function size() {
      var r = canvas.getBoundingClientRect();
      W = Math.max(1, r.width); H = Math.max(1, r.height);
      canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      paths = [];
      for (var k = 0; k < 6; k++) { var p = makePath(k); p.t = reduced || isPreview ? p.pts.length - 1 : Math.random() * p.pts.length * 0.8; paths.push(p); }
    }
    var t0 = Date.now();
    function draw(step) {
      var time = (Date.now() - t0) / 1000;
      var g = ctx.createLinearGradient(0, 0, 0, H);           // deep water
      g.addColorStop(0, "#0a2236"); g.addColorStop(0.5, "#0d3d52"); g.addColorStop(1, "#11606b");
      ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
      var sun = ctx.createRadialGradient(W * 0.78, H * 0.18, 0, W * 0.78, H * 0.18, H * 0.9);   // gold light from above
      sun.addColorStop(0, "rgba(241,210,122,0.35)"); sun.addColorStop(1, "rgba(241,210,122,0)");
      ctx.fillStyle = sun; ctx.fillRect(0, 0, W, H);
      for (var w = 0; w < 4; w++) {                         // layered swells
        var base = H * (0.42 + w * 0.15), amp = 4 + w * 2.5, len = 160 + w * 70, sp = 0.35 + w * 0.18;
        ctx.beginPath(); ctx.moveTo(0, H);
        for (var x = 0; x <= W; x += 8) {
          ctx.lineTo(x, base + Math.sin(x / len * 6.2832 + time * sp + w) * amp + Math.sin(x / (len * 0.37) - time * sp * 1.6) * amp * 0.35);
        }
        ctx.lineTo(W, H); ctx.closePath();
        ctx.fillStyle = "rgba(95,179,192," + (0.07 + w * 0.035) + ")"; ctx.fill();
      }
      for (var s = 0; s < 46; s++) {                        // glints on the surface
        var sx = (s * 97.3 + time * (6 + s % 4)) % W, sy = H * 0.35 + ((s * 53.1) % (H * 0.6));
        var tw = 0.5 + 0.5 * Math.sin(time * 2.2 + s * 1.7);
        ctx.fillStyle = "rgba(241,210,122," + (0.08 + 0.32 * tw) + ")"; ctx.fillRect(sx, sy, 2 + (s % 3), 1);
      }
      for (var k = 0; k < paths.length; k++) {
        var p = paths[k], n = p.pts.length, upto = Math.min(n - 1, Math.floor(p.t)), dx = W / (n - 1);
        ctx.globalAlpha = (p.alpha + 0.2) * p.fade; ctx.strokeStyle = "#e9c46a"; ctx.lineWidth = 1.6;
        ctx.shadowColor = "rgba(241,210,122,0.6)"; ctx.shadowBlur = 6; ctx.beginPath();
        for (var i = 0; i <= upto; i++) { if (i) ctx.lineTo(i * dx, p.pts[i]); else ctx.moveTo(0, p.pts[0]); }
        ctx.stroke(); ctx.shadowBlur = 0;
        if (upto < n - 1) { ctx.globalAlpha = 0.95; ctx.fillStyle = "#fff4cf"; ctx.beginPath(); ctx.arc(upto * dx, p.pts[upto], 2.6, 0, 6.2832); ctx.fill(); }
        ctx.globalAlpha = 1;
        if (step) {
          if (p.t < n - 1) p.t += p.speed;
          else { p.fade -= 0.008; if (p.fade <= 0) paths[k] = makePath(k); }
        }
      }
    }
    size();
    if (reduced || isPreview) draw(false);
    else {
      var loop = function () { if (visible && !document.hidden) draw(true); raf = requestAnimationFrame(loop); };
      raf = requestAnimationFrame(loop);
      if ("IntersectionObserver" in window) { io = new IntersectionObserver(function (es) { visible = es[0].isIntersecting; }); io.observe(canvas); }
    }
    var onResize = function () { size(); if (reduced || isPreview) draw(false); };
    window.addEventListener("resize", onResize);
    stopBanner = function () { if (raf) cancelAnimationFrame(raf); if (io) io.disconnect(); window.removeEventListener("resize", onResize); };
  }

  /* ---------- Tripos notes: fetched when a course is opened, maths typeset with KaTeX ---------- */
  var KATEX = "https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/";
  var katexReady = null;
  function loadScript(src) {
    return new Promise(function (ok, fail) { var s = document.createElement("script"); s.src = src; s.onload = ok; s.onerror = fail; document.head.appendChild(s); });
  }
  function katex() {
    if (!katexReady) {
      var css = document.createElement("link"); css.rel = "stylesheet"; css.href = KATEX + "katex.min.css"; document.head.appendChild(css);
      katexReady = loadScript(KATEX + "katex.min.js").then(function () { return loadScript(KATEX + "contrib/auto-render.min.js"); });
    }
    return katexReady;
  }
  function typeset(el) {
    return katex().then(function () {
      window.renderMathInElement(el, { throwOnError: false, delimiters: [
        { left: "$$", right: "$$", display: true }, { left: "\\[", right: "\\]", display: true }, { left: "\\(", right: "\\)", display: false }] });
    });
  }
  function loadNotes(d) {
    Array.prototype.forEach.call(d.querySelectorAll(".note-slot"), function (slot) {
      if (slot.getAttribute("data-done")) return;
      slot.setAttribute("data-done", "1");
      var src = slot.getAttribute("data-src");
      var done = src ? fetch(src).then(function (r) { if (!r.ok) throw new Error(r.status); return r.text(); })
        .then(function (html) { slot.innerHTML = html; }, function () {
          slot.innerHTML = '<p class="muted">Could not load these notes. <a href="' + esc(src) + '">Open them directly</a>.</p>';
          throw new Error("notes");
        }) : Promise.resolve();
      done.then(function () { return typeset(slot); }).catch(function () {});   // without KaTeX the notes still show, as plain TeX
    });
  }

  /* ---------- page ---------- */
  function setMeta(name, value) {
    var m = document.querySelector('meta[name="' + name + '"]');
    if (!m) { m = document.createElement("meta"); m.setAttribute("name", name); document.head.appendChild(m); }
    m.setAttribute("content", value || "");
  }

  function render(site) {
    if (stopBanner) { stopBanner(); stopBanner = null; }
    lastSite = site;
    if (!site || typeof site !== "object") {
      app.innerHTML = '<div class="wrap empty">Could not load <code>content.js</code>. Check it for typos (it must be valid JSON after <code>window.SITE =</code>).</div>';
      return;
    }
    var s = site.settings || {}, p = site.profile || {};
    var pages = pagesOf(site), cur = currentSlug();
    var page = pages.filter(function (x) { return x.slug === cur; })[0] || pages[0];
    var isHome = page === pages[0];
    document.title = isHome ? (s.siteTitle || p.name || "Home") : page.title + " | " + (s.siteTitle || p.name || "");
    setMeta("description", s.description);
    if (s.accentColor) root.style.setProperty("--accent", s.accentColor); else root.style.removeProperty("--accent");
    applyTheme(s.theme);

    app.innerHTML =
      '<header class="topbar"><div class="wrap">' +
        (isHome ? "<span></span>" : '<a class="brand" href="#/">' + esc(p.name || s.siteTitle) + "</a>") +
        '<nav class="nav" aria-label="Pages">' + pages.map(function (x) {
          return '<a href="#/' + x.slug + '"' + (x === page ? ' class="active" aria-current="page"' : "") + ">" + esc(x.title) + "</a>";
        }).join("") +
        '<button class="theme-btn" type="button" aria-label="Toggle dark mode" title="Toggle dark mode">' + themeIcon() + "</button></nav>" +
      "</div></header>" +
      '<main class="wrap">' +
        (isHome ? home(page, site)
                : '<h1 class="page-title">' + esc(page.title) + "</h1>" + (page.intro ? '<p class="desc">' + inline(page.intro) + "</p>" : "") + sectionsFor(page, site, false)) +
      "</main>" +
      '<footer class="footer"><div class="wrap">' + inline(s.footerText || "") + "</div></footer>";

    var canvas = app.querySelector(".banner canvas");
    if (canvas) startBanner(canvas);
    var btn = app.querySelector(".theme-btn");
    btn.addEventListener("click", function () {
      var next = effectiveTheme() === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      if (!isPreview) { try { localStorage.setItem(THEME_KEY, next); } catch (e) {} }
      btn.innerHTML = themeIcon();
    });
    Array.prototype.forEach.call(app.querySelectorAll("details.note-fold"), function (d) {
      d.addEventListener("toggle", function () { if (d.open) loadNotes(d); });
    });
    Array.prototype.forEach.call(app.querySelectorAll(".note-close"), function (b) {
      b.addEventListener("click", function () {
        var d = b.closest("details.note-fold"), sum = d.querySelector("summary");
        d.open = false;
        var top = sum.getBoundingClientRect().top;               // bring the closed note's title back into view
        if (top < 70) window.scrollBy({ top: top - 80, behavior: reduced ? "auto" : "smooth" });
        sum.focus({ preventScroll: true });
      });
    });
    Array.prototype.forEach.call(app.querySelectorAll(".reveal-btn"), function (b) {
      b.addEventListener("click", function () {
        var ans = b.nextElementSibling, open = ans.hidden;
        ans.hidden = !open;
        b.setAttribute("aria-expanded", String(open));
        b.textContent = open ? "Hide answer" : "Show answer";
      });
    });
  }

  window.addEventListener("hashchange", function () { render(lastSite); window.scrollTo(0, 0); });
  render(window.SITE);

  /* Live preview support for editor.html */
  if (isPreview) {
    window.addEventListener("message", function (e) {
      if (e.source !== window.parent || !e.data) return;
      if (e.data.type === "site-preview") render(e.data.site);
      if (e.data.type === "site-scroll") {
        var id = e.data.id, site = lastSite || {};
        var key = id === "custom" ? "custom" : id;
        var pg = pagesOf(site).filter(function (x) { return x.keys.indexOf(key) > -1; })[0];
        if (pg && pg.slug !== currentSlug()) { history.replaceState(null, "", "#/" + pg.slug); render(site); }
        var target = id === "custom" ? document.querySelector("[data-custom]") : document.getElementById(id);
        if (id === "top" || !target) window.scrollTo({ top: 0, behavior: "smooth" });
        else target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
    window.parent.postMessage({ type: "site-ready" }, "*");
  }
})();
