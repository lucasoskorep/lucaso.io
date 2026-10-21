/* lucaso.io — GNOME 1.4 Dark Desktop (Workspace 1: Desktop ↔ Workspace 2: Article Viewer) */
(function () {
  "use strict";

  const STATE_KEY = "lucaso_desktop_state_v3";
  const OPEN_REQ_KEY = "lucaso_open_win_v1";
  const LAST_WS2_KEY = "lucaso_last_ws2_v1";

  const ORDER = ["about", "projects", "blog", "models", "term", "resume", "recipes"];
  const TITLES = {
    about: "About Me",
    projects: "Projects",
    blog: "Blog",
    models: "3D Prints",
    term: "Links",
    resume: "resume.sh",
    recipes: "(Secret...Recipes)"
  };

  const RECIPES = {
    pizza: {
      title: "Cast-Iron Pan Pizza",
      meta: "Prep: 15m (+ overnight proof) · Bake: 14m @ 500°F · Cast-Iron Skillet",
      ing: "Dough: 260g bread flour, 190g warm water (73%), 5g salt, 3g instant yeast, 1 tbsp olive oil · Toppings: 140g low-moisture mozzarella (cubed to the rim), 1/2 cup crushed San Marzano tomatoes, oregano, garlic, basil.",
      body: "1. Whisk flour, salt, yeast, and water in a bowl until no dry flour remains; coat in olive oil, cover, and ferment overnight. 2. Two hours before dinner, oil a 10\" cast-iron skillet generously and stretch the dough toward the edges. 3. Spread uncooked crushed tomatoes right to the rim and scatter mozzarella cubes directly against the iron wall for a lacy frico crust. 4. Bake at 500°F on the bottom rack for 12–14 minutes, then finish 60 seconds on the stovetop burner until the bottom is deeply golden and crisp."
    },
    noodles: {
      title: "15-Minute Garlic Chili Crisp Noodles",
      meta: "Prep: 5m · Cook: 10m · High-Heat Wok / Skillet",
      ing: "200g wide hand-pulled wheat noodles · 4 cloves garlic (finely minced) · 2 scallions · 1.5 tbsp chili crisp · 1.5 tbsp light soy sauce · 1 tbsp Chinkiang black vinegar · 1 tsp toasted sesame oil · 1/2 tsp sugar.",
      body: "1. In a heatproof bowl, pile minced garlic, scallion whites, chili crisp, soy sauce, black vinegar, and sugar. 2. Boil wide noodles until chewy; reserve 2 tbsp starchy cooking water. 3. Heat 2 tbsp neutral oil until lightly smoking and pour directly over the raw garlic pile so it sizzles and blooms instantly. 4. Toss drained noodles + splash of noodle water vigorously in the bowl until glossy, then top with scallion greens and toasted sesame seeds."
    },
    bolognese: {
      title: "Slow-Simmered Sunday Bolognese",
      meta: "Prep: 25m · Simmer: 3.5h · Heavy Dutch Oven",
      ing: "500g ground chuck (80/20) · 250g ground pork · 1 onion, 1 carrot, 1 celery stalk (finely diced soffritto) · 3 tbsp tomato paste · 150ml dry white wine · 200ml whole milk · 400ml beef stock · Parmigiano rind.",
      body: "1. Sweat the finely minced soffritto in olive oil and butter over medium-low heat for 12 minutes until soft and sweet. 2. Add beef and pork, letting the meat brown deeply before caramelizing the tomato paste in the center of the pot. 3. Deglaze with dry white wine and cook until nearly dry, then stir in warm whole milk and let it simmer down to tenderize the meat. 4. Add stock and a Parmigiano rind; simmer uncovered on the lowest flame for 3+ hours, stirring occasionally until thick, rich, and velvety."
    },
    cookies: {
      title: "Brown Butter Dark Chocolate Cookies",
      meta: "Prep: 20m · Chill: 24h · Bake: 11m @ 350°F",
      ing: "225g unsalted butter (browned) · 200g dark brown sugar · 75g white sugar · 2 cold eggs · 280g all-purpose flour · 1 tsp baking soda · 220g hand-chopped 70% dark chocolate bar · Flaky Maldon sea salt.",
      body: "1. Melt butter in a steel pan over medium heat, swirling until foaming subsides and nutty toasted milk solids coat the bottom; cool 15 minutes. 2. Whisk brown butter with both sugars and eggs until glossy and ribbon-thick. 3. Fold in flour, baking soda, and hand-chopped dark chocolate (including the chocolate dust so it marbles the dough). 4. Scoop 75g balls, chill 24 hours for deep butterscotch flavor, bake 11 minutes at 350°F, and finish with flaky sea salt."
    }
  };

  /* Clock & Start Menu */
  const clock = document.getElementById("clock");
  function updateClock() {
    if (clock) clock.textContent = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }
  updateClock();
  setInterval(updateClock, 10000);

  const startmenu = document.getElementById("startmenu");
  const startBtn = document.getElementById("startBtn");
  if (startBtn && startmenu) {
    startBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      const on = startmenu.classList.toggle("on");
      startBtn.classList.toggle("on", on);
    });
    document.addEventListener("click", function (e) {
      if (!startmenu.contains(e.target)) {
        startmenu.classList.remove("on");
        startBtn.classList.remove("on");
      }
    });
  }

  const isDesktop = document.body.classList.contains("is-desktop");
  const siteUrl = document.body.dataset.siteurl || "";

  /* ---------------- Workspace 2 (Article / Page Viewer) ---------------- */
  if (!isDesktop) {
    try { sessionStorage.setItem(LAST_WS2_KEY, location.pathname + location.search); } catch (err) {}

    const subWin = document.getElementById("w-subpage");
    if (subWin) {
      const minBtn = subWin.querySelector("[data-min]");
      const maxBtn = subWin.querySelector("[data-max]");
      const closeBtn = subWin.querySelector("[data-close-subpage]");
      if (minBtn) minBtn.onclick = function () { subWin.classList.toggle("minned"); };
      if (maxBtn) maxBtn.onclick = function () { subWin.classList.toggle("maxed"); };
      if (closeBtn) closeBtn.onclick = function () { goBackToDesktop(); };
    }

    document.querySelectorAll("[data-back-desktop]").forEach(function (el) {
      el.addEventListener("click", function (e) {
        e.preventDefault();
        goBackToDesktop();
      });
    });

    document.querySelectorAll("[data-open]").forEach(function (el) {
      el.addEventListener("click", function (e) {
        e.preventDefault();
        try { sessionStorage.setItem(OPEN_REQ_KEY, el.dataset.open); } catch (err) {}
        window.location.href = (siteUrl || "") + "/";
      });
    });

    document.querySelectorAll("[data-nav]").forEach(function (el) {
      el.addEventListener("click", function (e) {
        e.preventDefault();
        const url = el.getAttribute("data-nav") || el.getAttribute("href");
        if (url) window.location.href = url;
      });
    });
    return;
  }

  function goBackToDesktop() {
    window.location.href = (siteUrl || "") + "/";
  }

  /* ---------------- Workspace 1 (Main Interactive Desktop) ---------------- */
  const ws2Link = document.getElementById("ws2Link");
  if (ws2Link) {
    try {
      const lastWs2 = sessionStorage.getItem(LAST_WS2_KEY);
      if (lastWs2) ws2Link.href = lastWs2;
    } catch (err) {}
    ws2Link.addEventListener("click", function () { saveState(); });
  }

  let z = 30;
  const tasks = document.getElementById("tasks");

  function win(id) { return document.getElementById("w-" + id); }

  function saveState() {
    try {
      const state = { z: z, wins: {} };
      ORDER.forEach(function (id) {
        const w = win(id);
        if (!w) return;
        state.wins[id] = {
          left: w.style.left,
          top: w.style.top,
          width: w.style.width,
          height: w.style.height,
          zIndex: parseInt(w.style.zIndex || "20", 10),
          hidden: w.classList.contains("hidden"),
          minned: w.classList.contains("minned"),
          maxed: w.classList.contains("maxed"),
          active: w.classList.contains("active")
        };
      });
      sessionStorage.setItem(STATE_KEY, JSON.stringify(state));
    } catch (err) {}
  }

  function restoreState() {
    try {
      const raw = sessionStorage.getItem(STATE_KEY);
      if (!raw) return false;
      const state = JSON.parse(raw);
      if (!state || !state.wins) return false;
      z = Math.max(30, state.z || 30);
      Object.keys(state.wins).forEach(function (id) {
        const w = win(id);
        const s = state.wins[id];
        if (!w || !s) return;
        if (s.left) w.style.left = s.left;
        if (s.top) w.style.top = s.top;
        if (s.width) w.style.width = s.width;
        if (s.height !== undefined) w.style.height = s.height;
        if (s.zIndex) w.style.zIndex = s.zIndex;
        w.classList.toggle("hidden", !!s.hidden);
        w.classList.toggle("minned", !!s.minned);
        w.classList.toggle("maxed", !!s.maxed);
        w.classList.toggle("active", !!s.active);
      });
      syncTasks();
      return true;
    } catch (err) {
      return false;
    }
  }

  function focusWin(w) {
    if (!w) return;
    document.querySelectorAll(".win").forEach(function (x) { x.classList.toggle("active", x === w); });
    w.classList.remove("minned");
    w.style.zIndex = ++z;
    syncTasks();
    saveState();
  }

  function openWin(id) {
    const w = win(id);
    if (!w) return;
    w.classList.remove("hidden", "minned");
    focusWin(w);
    if (window.innerWidth <= 900) {
      w.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }

  function closeWin(id) {
    const w = win(id);
    if (!w) return;
    w.classList.add("hidden");
    w.classList.remove("minned", "active");
    syncTasks();
    saveState();
  }

  function toggleMin(id) {
    const w = win(id);
    if (!w) return;
    if (w.classList.contains("hidden")) { openWin(id); return; }
    if (w.classList.contains("minned")) { focusWin(w); return; }
    w.classList.add("minned");
    w.classList.remove("active");
    syncTasks();
    saveState();
  }

  function syncTasks() {
    if (!tasks) return;
    tasks.innerHTML = "";
    Object.keys(TITLES).forEach(function (id) {
      const w = win(id);
      if (!w || w.classList.contains("hidden")) return;
      const b = document.createElement("button");
      b.className = "task" + (w.classList.contains("active") && !w.classList.contains("minned") ? " on" : "");
      b.textContent = TITLES[id];
      b.onclick = function () {
        if (w.classList.contains("active") && !w.classList.contains("minned")) toggleMin(id);
        else focusWin(w);
      };
      tasks.appendChild(b);
    });
  }

  document.querySelectorAll("[data-open]").forEach(function (el) {
    el.addEventListener("click", function (e) {
      e.preventDefault();
      openWin(el.dataset.open);
      if (startmenu) startmenu.classList.remove("on");
      if (startBtn) startBtn.classList.remove("on");
    });
  });

  /* Each window drags and resizes independently — other windows never jump when you drag one */
  document.querySelectorAll(".win").forEach(function (w) {
    const id = w.id.slice(2);
    w.addEventListener("mousedown", function () { focusWin(w); });
    const btnClose = w.querySelector("[data-close]");
    const btnMin = w.querySelector("[data-min]");
    const btnMax = w.querySelector("[data-max]");
    if (btnClose) btnClose.onclick = function (e) { e.stopPropagation(); closeWin(id); };
    if (btnMin) btnMin.onclick = function (e) { e.stopPropagation(); toggleMin(id); };
    if (btnMax) {
      btnMax.onclick = function (e) {
        e.stopPropagation();
        w.classList.toggle("maxed");
        focusWin(w);
      };
    }

    const tb = w.querySelector(".tb");
    if (tb) {
      tb.ondblclick = function () { toggleMin(id); };
      tb.addEventListener("mousedown", function (e) {
        if (e.target.tagName === "BUTTON" || w.classList.contains("maxed") || window.innerWidth <= 900) return;
        focusWin(w);
        const sx = e.clientX - w.offsetLeft, sy = e.clientY - w.offsetTop;
        const move = function (ev) {
          w.style.left = Math.max(0, Math.min(window.innerWidth - 140, ev.clientX - sx)) + "px";
          w.style.top = Math.max(30, Math.min(window.innerHeight - 60, ev.clientY - sy)) + "px";
        };
        const up = function () {
          removeEventListener("mousemove", move);
          removeEventListener("mouseup", up);
          saveState();
        };
        addEventListener("mousemove", move);
        addEventListener("mouseup", up);
      });
    }

    ["n", "s", "e", "w", "nw", "ne", "sw", "se"].forEach(function (dir) {
      const h = document.createElement("div");
      h.className = "rz rz-" + dir;
      if (dir === "se") h.title = "Drag to resize window";
      h.addEventListener("mousedown", function (e) {
        if (window.innerWidth <= 900 || w.classList.contains("maxed") || w.classList.contains("minned")) return;
        e.stopPropagation();
        e.preventDefault();
        focusWin(w);
        const r = w.getBoundingClientRect();
        const startX = e.clientX, startY = e.clientY;
        const startL = r.left, startT = r.top, startW = r.width, startH = r.height;
        const minW = 260, minH = 135;
        const move = function (ev) {
          const dx = ev.clientX - startX, dy = ev.clientY - startY;
          if (dir.includes("e")) w.style.width = Math.max(minW, startW + dx) + "px";
          if (dir.includes("s")) w.style.height = Math.max(minH, startH + dy) + "px";
          if (dir.includes("w")) {
            const nw = Math.max(minW, startW - dx);
            if (nw > minW) w.style.left = Math.max(0, startL + dx) + "px";
            w.style.width = nw + "px";
          }
          if (dir.includes("n")) {
            const nh = Math.max(minH, startH - dy);
            if (nh > minH) w.style.top = Math.max(30, startT + dy) + "px";
            w.style.height = nh + "px";
          }
        };
        const up = function () {
          removeEventListener("mousemove", move);
          removeEventListener("mouseup", up);
          saveState();
        };
        addEventListener("mousemove", move);
        addEventListener("mouseup", up);
      });
      w.appendChild(h);
    });
  });

  function arrangeWindows() {
    let openIds = ORDER.filter(function (id) { return win(id) && !win(id).classList.contains("hidden"); });
    if (openIds.length === 0) {
      ["about", "projects", "blog", "models", "term"].forEach(function (id) { if (win(id)) win(id).classList.remove("hidden"); });
      openIds = ["about", "projects", "blog", "models", "term"];
    }
    openIds.forEach(function (id) {
      const w = win(id);
      w.classList.remove("minned", "maxed");
      w.style.height = "";
    });

    if (window.innerWidth <= 900) { syncTasks(); saveState(); return; }

    const padL = 108, padT = 42, gap = 10;
    const availW = window.innerWidth - padL - 16;
    const availH = window.innerHeight - padT - 16;

    if (openIds.length === 1) {
      const w = win(openIds[0]);
      w.style.left = (padL + 20) + "px";
      w.style.top = (padT + 14) + "px";
      w.style.width = Math.min(760, availW - 40) + "px";
    } else {
      const leftW = Math.max(380, Math.floor(availW * 0.37));
      const rightW = availW - leftW - gap;
      let yL = padT, yR = padT;
      const cols = [];
      openIds.forEach(function (id) {
        const w = win(id);
        const preferRight = (id === "projects" || id === "models" || id === "recipes");
        const preferLeft = (id === "about" || id === "term" || id === "blog" || id === "resume");
        let col;
        if (preferRight && yR <= yL + 140) col = "R";
        else if (preferLeft && yL <= yR + 140) col = "L";
        else col = yL <= yR ? "L" : "R";

        w.style.width = (col === "L" ? leftW : rightW) + "px";
        if (id === "term") w.style.height = "250px";
        const h = w.offsetHeight;
        if (col === "L") {
          w.style.left = padL + "px";
          w.style.top = yL + "px";
          yL += h + gap;
        } else {
          w.style.left = (padL + leftW + gap) + "px";
          w.style.top = yR + "px";
          yR += h + gap;
        }
        cols.push({ w: w, col: col });
      });

      ["L", "R"].forEach(function (c) {
        const colWins = cols.filter(function (x) { return x.col === c; }).map(function (x) { return x.w; });
        if (!colWins.length) return;
        const last = colWins[colWins.length - 1];
        const totalUsed = (last.offsetTop + last.offsetHeight) - padT;
        if (totalUsed > availH) {
          const scale = availH / totalUsed;
          let curY = padT;
          colWins.forEach(function (w) {
            const newH = Math.max(135, Math.floor(w.offsetHeight * scale));
            w.style.top = curY + "px";
            w.style.height = newH + "px";
            curY += newH + gap;
          });
        }
      });
    }
    focusWin(win(openIds[0]));
    saveState();
  }

  const btnArrange = document.getElementById("btnArrange");
  if (btnArrange) btnArrange.onclick = arrangeWindows;

  /* When the browser viewport itself is resized, re-arrange windows to fit the new viewport */
  let resizeTimer = null;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      if (window.innerWidth > 900) arrangeWindows();
    }, 80);
  });

  /* Clicking any project/post/page saves Workspace 1 window state and opens the page on Workspace 2 */
  document.querySelectorAll("[data-nav]").forEach(function (el) {
    el.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      const url = el.getAttribute("data-nav") || el.getAttribute("href");
      if (!url) return;
      saveState();
      window.location.href = url;
    });
  });

  /* Recipe rows inside (Secret...Recipes) */
  const recipesListWrap = document.getElementById("recipesListWrap");
  const recipeDetailWrap = document.getElementById("recipeDetailWrap");
  const recipeResetBtn = document.getElementById("recipeResetBtn");

  function showRecipeList() {
    if (recipesListWrap) recipesListWrap.style.display = "";
    if (recipeDetailWrap) recipeDetailWrap.style.display = "none";
  }
  if (recipeResetBtn) recipeResetBtn.onclick = showRecipeList;

  document.querySelectorAll("[data-recipe]").forEach(function (el) {
    el.addEventListener("click", function (e) {
      e.preventDefault();
      const r = RECIPES[el.getAttribute("data-recipe")];
      if (!r || !recipeDetailWrap || !recipesListWrap) return;
      recipesListWrap.style.display = "none";
      recipeDetailWrap.style.display = "";
      recipeDetailWrap.innerHTML =
        '<div class="r-box">' +
        '<h4>' + r.title + '</h4>' +
        '<div class="r-meta">' + r.meta + '</div>' +
        '<div class="r-ing"><b>Ingredients:</b> ' + r.ing + '</div>' +
        '<p>' + r.body + '</p>' +
        '<button class="p-btn" id="backToRecipesBtn">← All Recipes</button>' +
        '</div>';
      const backBtn = document.getElementById("backToRecipesBtn");
      if (backBtn) backBtn.onclick = showRecipeList;
    });
  });

  function checkPendingOpenRequest() {
    try {
      const reqOpen = sessionStorage.getItem(OPEN_REQ_KEY);
      if (reqOpen) {
        sessionStorage.removeItem(OPEN_REQ_KEY);
        openWin(reqOpen);
      }
    } catch (err) {}
  }

  window.addEventListener("pageshow", function (e) {
    if (e.persisted) restoreState();
    checkPendingOpenRequest();
  });

  /* Boot Workspace 1: restore saved window state if returning from Workspace 2, otherwise open defaults */
  if (!restoreState()) {
    ["about", "projects", "blog", "models", "term"].forEach(function (id) { openWin(id); });
    arrangeWindows();
  }

  checkPendingOpenRequest();
})();
