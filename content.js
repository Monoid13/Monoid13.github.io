// All the content of your site lives in this file.
// Easiest way to edit: open editor.html (visual editor with live preview).
// You can also edit by hand — keep everything after "window.SITE =" valid JSON.
window.SITE = {
  "settings": {
    "siteTitle": "Joe Wu",
    "description": "Joe (Junhan) Wu — Mathematics student at King's College, Cambridge, interested in probability, game theory and quantitative trading.",
    "accentColor": "#c9a227",
    "theme": "dark",
    "footerText": "© 2026 Joe Wu. Hosted by GitHub Pages."
  },
  "profile": {
    "name": "Joe Wu",
    "headline": "Mathematics student at King's College, University of Cambridge",
    "tagline": "Interested in probability, game theory and quantitative trading.",
    "location": "Cambridge, UK",
    "avatar": "",
    "banner": "",
    "email": "jw2585@cam.ac.uk",
    "cvUrl": "assets/Joe_Wu_CV.pdf"
  },
  "links": [
    {
      "label": "GitHub",
      "url": "https://github.com/Monoid13",
      "icon": "auto"
    },
    {
      "label": "Email",
      "url": "mailto:jw2585@cam.ac.uk",
      "icon": "auto"
    }
  ],
  "pages": [
    {
      "title": "About",
      "intro": "",
      "sections": "about, news"
    },
    {
      "title": "Experience",
      "intro": "Trading programmes, work experience and projects.",
      "sections": "experience, projects"
    },
    {
      "title": "IA",
      "intro": "",
      "sections": "tripos"
    },
    {
      "title": "Other",
      "intro": "Competitions, education, skills and a puzzle.",
      "sections": "custom, education, skills, puzzles"
    }
  ],
  "sectionOrder": [
    "highlights",
    "tripos",
    "about",
    "experience",
    "projects",
    "custom",
    "education",
    "skills",
    "news",
    "puzzles",
    "publications",
    "contact"
  ],
  "highlights": {
    "show": false,
    "title": "Highlights",
    "items": [
      {
        "value": "7th / 62",
        "label": "Teams in Optiver's Cambridge vs Oxford Trading Academy"
      },
      {
        "value": "1st / 30",
        "label": "Blotto tournament at a Wintermute workshop"
      },
      {
        "value": "Grade 1",
        "label": "STEP 2 and STEP 3"
      },
      {
        "value": "A*A*A*",
        "label": "Maths, Further Maths and Physics A-levels"
      }
    ]
  },
  "about": {
    "show": true,
    "title": "About",
    "text": "Hi! I'm Joe (Junhan) Wu, a first-year Mathematics student at King's College, University of Cambridge. I'm interested in probability, game theory and quantitative trading.\n\nThis term I took part in Optiver's Cambridge vs Oxford Trading Academy, where my team finished 7th of 62, and I won a Blotto tournament at a Wintermute industry workshop.",
    "more": "Away from maths, I play poker with the Cambridge Poker Society and table tennis for King's, and I enjoy cycling and running. I also play the violin, and have ABRSM Grade 8."
  },
  "tripos": {
    "show": true,
    "title": "Tripos Resources",
    "intro": "Notes and proofs from the Cambridge Mathematical Tripos. Click a course to open it.",
    "parts": [
      {
        "name": "Part IA",
        "courses": "Groups, Numbers and Sets, Vectors and Matrices, Differential Equations, Analysis I, Probability, Vector Calculus, Dynamics and Relativity"
      },
      {
        "name": "Definitions",
        "key": "definitions",
        "courses": "Groups, Numbers and Sets, Vectors and Matrices, Differential Equations, Analysis I, Probability, Vector Calculus, Dynamics and Relativity"
      }
    ],
    "notes": [
      {
        "course": "Groups",
        "part": "definitions",
        "title": "Definitions",
        "file": "notes/groups-definitions.html",
        "inline": true,
        "countLabel": "21 definitions"
      },
      {
        "course": "Groups",
        "title": "Orbits are disjoint",
        "file": "notes/orbits-disjoint.html"
      },
      {
        "course": "Groups",
        "title": "Burnside's lemma",
        "file": "notes/burnside.html"
      },
      {
        "course": "Vectors and Matrices",
        "title": "Laplace (cofactor) expansion of the determinant",
        "file": "notes/laplace-expansion.html"
      }
    ]
  },
  "news": {
    "show": true,
    "title": "News",
    "collapse": "Click to see the news",
    "items": [
      {
        "date": "Nov 2026",
        "text": "Completed the Optiver & University of Cambridge Trading Academy, finishing **7th of 62** teams in the Cambridge cohort and developing a functional options market-making algorithm on Optibook.",
        "image": "assets/img/optiver-certificate.jpg",
        "imageAlt": "Optiver Certificate of Achievement awarded to Joe Wu for completing the Optiver & University of Cambridge Trading Academy"
      },
      {
        "date": "Nov 2026",
        "text": "Came **5th** in the Susquehanna (SIG) Brainteaser Battle."
      },
      {
        "date": "Nov 2026",
        "text": "Ranked **1st of 30** in a Blotto tournament at a Wintermute industry workshop."
      },
      {
        "date": "Oct 2026",
        "text": "Started Mathematics at King's College, University of Cambridge."
      }
    ]
  },
  "experience": {
    "show": true,
    "title": "Programmes and work",
    "items": [
      {
        "role": "Cambridge vs Oxford Trading Academy",
        "organization": "Optiver",
        "url": "",
        "location": "Cambridge",
        "start": "Oct 2026",
        "end": "Dec 2026",
        "description": "- Finished 7th of 62 teams in the Cambridge cohort of an 8-week programme trading options, ETFs and futures.\n- Priced options with the Black–Scholes model and built an algorithmic trading bot in Python.\n- Trained a neural network on historical price trends; dropped it from the live bot as its latency was too high."
      },
      {
        "role": "Industry Workshop",
        "organization": "Wintermute",
        "url": "",
        "location": "",
        "start": "Nov 2026",
        "end": "",
        "description": "Ranked 1st of 30 participants in a Blotto tournament, a game-theory contest in allocating limited resources and sizing bets against opponents."
      },
      {
        "role": "Summer Work Experience, System Administration",
        "organization": "Orfium",
        "url": "",
        "location": "",
        "start": "Aug 2024",
        "end": "",
        "description": "Helped replace server hardware and observed system administrators' daily security checks."
      },
      {
        "role": "Summer Work Experience",
        "organization": "Santander",
        "url": "",
        "location": "",
        "start": "Jul 2024",
        "end": "",
        "description": "Observed the quantitative methodology and risk teams, learning how a bank is structured and measures risk."
      }
    ]
  },
  "education": {
    "show": true,
    "title": "Education",
    "items": [
      {
        "degree": "Mathematics (Mathematical Tripos), Part IA",
        "institution": "King's College, University of Cambridge",
        "url": "",
        "location": "Cambridge, UK",
        "start": "Oct 2026",
        "end": "Present",
        "description": ""
      },
      {
        "degree": "A-levels",
        "institution": "Queen Elizabeth's School",
        "url": "",
        "location": "",
        "start": "2019",
        "end": "2026",
        "description": "- A* Mathematics, A* Further Mathematics, A* Physics\n- STEP: Grade 1 in STEP 2 and STEP 3"
      }
    ]
  },
  "projects": {
    "show": true,
    "title": "Projects",
    "items": [
      {
        "name": "Optibook Trading Bot",
        "description": "Python bot for Optiver's Optibook exchange, now at version 21. It runs several strategies on one connection: market making on stocks and second listings, queue-priority joining on the ETF and futures, taking stale quotes, and timing orders ahead of predictable sweeps. Fair value is inferred from the informed bots' quotes, and each sweep's edge is chosen by a multi-armed bandit scored on 5-second markouts.\n\nEvery order passes one guard that blocks self-trades and keeps positions, resting orders and unconfirmed fills inside the exchange limits and a shared net-delta budget per family. That budget avoids the exchange's forced close-outs. An account-wide drawdown limit, startup and round-end order checks, and per-strategy fill logs make each run measurable.",
        "url": "",
        "repo": "",
        "image": "",
        "tags": "Python, Market making, Options, Risk management, Bandits",
        "chart": "Stale-quote taking:6185, Stock market making:3731, ETF and futures joining:2864, Dual-listing arbitrage:595, Sweep timing:360, Derivatives taking:98, Informed-flow follower (now off):-2705",
        "chartLabel": "PnL per hour by strategy, best live run (11 min, +11.1k/hour in total)"
      },
      {
        "name": "OpenWeather API Client",
        "description": "A Python client for the OpenWeather API that tracks recent weather data.",
        "url": "",
        "repo": "",
        "image": "",
        "tags": "Python, APIs",
        "chart": "",
        "chartLabel": ""
      }
    ]
  },
  "publications": {
    "show": false,
    "title": "Publications",
    "items": []
  },
  "skills": {
    "show": true,
    "title": "Skills",
    "groups": [
      {
        "name": "Programming",
        "list": "Python, NumPy, pandas, PyTorch, C++"
      },
      {
        "name": "Mathematics",
        "list": "Probability, Combinatorics, Statistics, Markov Chains, Game Theory, Algorithms and Data Structures"
      },
      {
        "name": "Languages",
        "list": "English (native), Mandarin (native), German (A2)"
      },
      {
        "name": "Music",
        "list": "Violin (ABRSM Grade 8)"
      }
    ]
  },
  "customSections": [
    {
      "show": true,
      "title": "Competitions",
      "text": "- **British Mathematical Olympiad Round 1 (BMO1)** — Distinction in 2024 (38/60, top 10.4%)\n- **UKMT Maclaurin Olympiad** — Bronze Medal, 2023\n- **UKMT Hamilton Olympiad** — Bronze Medal, 2022\n- **Wintermute Blotto tournament** — 1st of 30, 2026"
    }
  ],
  "puzzles": {
    "show": true,
    "title": "Puzzle corner",
    "intro": "A few favourite probability puzzles. Have a go before you reveal the answers.",
    "items": [
      {
        "question": "You roll a die whose faces are **2, 2, 4, 4, 6, 6** until you roll a 6. What is the expected number of rolls?",
        "answer": "**3.**\n\nEvery roll shows 2, 4 or 6, each with probability 1/3, so each roll is a 6 with probability 1/3, independently of the others. The number of rolls is geometric with p = 1/3, so its mean is 1/p = 3.\n\nCompare this with an ordinary die where you are only told afterwards that every roll was even: there the answer is 3/2, because that condition rules out long runs far more often than short ones."
      },
      {
        "question": "You flip a fair coin until you get **two heads in a row**. What is the expected number of flips?",
        "answer": "**6.**\n\nLet E be the expected number of flips from the start, and F the expected number still needed just after a head. From the start: E = 1 + ½F + ½E. After a head: F = 1 + ½·0 + ½E. Solving gives E = 6."
      },
      {
        "question": "You roll two fair dice. Given that **at least one of them shows a 6**, what is the probability that they add up to 7?",
        "answer": "**2/11.**\n\nOf the 36 outcomes, 11 contain at least one 6. Only (1, 6) and (6, 1) among them sum to 7."
      },
      {
        "question": "A stick is broken at two points chosen uniformly at random. What is the probability that the three pieces **form a triangle**?",
        "answer": "**1/4.**\n\nThe pieces form a triangle exactly when every piece is shorter than half the stick. Plotting the two break points in the unit square, the region where this holds is two small triangles with total area 1/4."
      },
      {
        "question": "On average, how many times must you roll a fair die until you have seen **all six faces**?",
        "answer": "**14.7.**\n\nAfter seeing k different faces, a new one appears with probability (6 − k)/6, so it takes 6/(6 − k) rolls on average. Summing: 6 × (1 + 1/2 + 1/3 + 1/4 + 1/5 + 1/6) = 14.7."
      }
    ]
  },
  "contact": {
    "show": true,
    "title": "Contact",
    "text": "The best way to reach me is by email — I'm always happy to talk about maths, trading or poker."
  }
};
