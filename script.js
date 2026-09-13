// ============================================================
//  CV page screen-only enhancements.
//  None of this touches the PDF: the print stylesheet strips
//  the background and hides the buttons, so exports stay clean.
// ============================================================

(function () {
    "use strict";

    var LANG_STORAGE_KEY = "cv-lang";

    // ---- 0. Translation dictionary -------------------------------
    // Keyed by element id. Set html: true when the string contains
    // markup (e.g. a <b> lead-in) so it's applied via innerHTML
    // instead of textContent.
    var TRANSLATIONS = {
        pageTitle: {
            en: "Bruno Saranga — Backend Developer",
            pt: "Bruno Saranga — Desenvolvedor Backend"
        },
        printBtn: {
            en: "Download PDF",
            pt: "Transferir PDF"
        },
        "role-title": {
            en: "Backend Developer",
            pt: "Desenvolvedor Backend"
        },
        "role-suffix": {
            en: "— security-minded",
            pt: "— com foco em segurança"
        },
        "contact-location": {
            en: "Maputo, Mozambique · open to remote",
            pt: "Maputo, Moçambique · disponível para remoto"
        },
        "summary-text": {
            en: "Backend developer working in Python, Django and Django REST Framework, with working application-security knowledge from hands-on labs and bug-bounty coursework. Completed Meta's Back-End Developer Professional Certificate while building an API-security SaaS solo, end to end from data model to deployment. Fluent in English and Portuguese, fully set up for remote work.",
            pt: "Desenvolvedor backend a trabalhar com Python, Django e Django REST Framework, com conhecimento prático em segurança aplicacional através de laboratórios práticos e formação em bug bounty. Concluiu o Certificado Profissional Meta Back-End Developer enquanto constrói sozinho um SaaS de segurança de APIs, do modelo de dados ao deployment. Fluente em inglês e português, totalmente preparado para trabalho remoto."
        },
        "exp-eyebrow": {
            en: "Experience & Projects",
            pt: "Experiência e Projetos"
        },
        "flagship-title": {
            en: "API Security Scanner — SaaS",
            pt: "Scanner de Segurança de API — SaaS"
        },
        "flagship-tag": {
            en: "IN DEVELOPMENT",
            pt: "EM DESENVOLVIMENTO"
        },
        "flagship-intro": {
            en: "Solo-building a tool that scans web APIs for security misconfigurations and common vulnerabilities. Own the full stack:",
            pt: "A construir sozinho uma ferramenta que analisa APIs web em busca de configurações de segurança incorretas e vulnerabilidades comuns. Responsável pela stack completa:"
        },
        "flagship-li-1": {
            en: "<b>Django / DRF backend</b> with a custom email-based user model and JWT authentication.",
            pt: "<b>Backend em Django / DRF</b> com um modelo de utilizador personalizado baseado em email e autenticação JWT.",
            html: true
        },
        "flagship-li-2": {
            en: "<b>Real-time scan streaming</b> over Server-Sent Events; durable per-scan records and worst-finding risk scoring.",
            pt: "<b>Streaming de scans em tempo real</b> via Server-Sent Events; registos duradouros por scan e pontuação de risco pelo pior achado.",
            html: true
        },
        "flagship-li-3": {
            en: "<b>React / Vite frontend</b> with a custom design system; payment flow via a merchant-of-record integration.",
            pt: "<b>Frontend em React / Vite</b> com um design system personalizado; fluxo de pagamento via integração merchant-of-record.",
            html: true
        },
        "entry1-title": {
            en: "Independent Security Researcher & Lab Operator",
            pt: "Investigador de Segurança Independente e Operador de Laboratório"
        },
        "entry1-meta": {
            en: "2024 — present",
            pt: "2024 — atual"
        },
        "entry1-li-1": {
            en: "Architect virtualized lab environments that simulate enterprise-grade network threats to practise finding data-leak vulnerabilities.",
            pt: "Concebe ambientes de laboratório virtualizados que simulam ameaças de rede de nível empresarial para praticar a deteção de vulnerabilidades de fuga de dados."
        },
        "entry1-li-2": {
            en: "Apply bug-bounty methodology in controlled environments — recon, information gathering, exploitation and documentation.",
            pt: "Aplica metodologia de bug bounty em ambientes controlados — reconhecimento, recolha de informação, exploração e documentação."
        },
        "entry1-li-3": {
            en: "Write custom Python scripts to automate repetitive reconnaissance and checks.",
            pt: "Escreve scripts Python personalizados para automatizar tarefas repetitivas de reconhecimento e verificação."
        },
        "entry2-title": {
            en: "Project Director @ HBS, Lda",
            pt: "Diretor de Projetos @ HBS, Lda"
        },
        "entry2-meta": {
            en: "2024 — present",
            pt: "2024 — atual"
        },
        "entry2-p": {
            en: "Project Director at Human Business Solutions, a Mozambican recruitment startup — coordinating projects, teams and delivery.",
            pt: "Diretor de Projetos na Human Business Solutions, uma startup moçambicana de recrutamento — coordenando projetos, equipas e entregas."
        },
        "entry3-title": {
            en: "Music Production & Sound Engineering",
            pt: "Produção Musical e Engenharia de Som"
        },
        "entry3-meta": {
            en: "2016 — present",
            pt: "2016 — atual"
        },
        "entry3-p": {
            en: "A decade producing, engineering and touring internationally under the name PIZZAWPINEAPPLES. Consistent evidence of leading projects and shipping polished work under tight deadlines. Full portfolio available on request.",
            pt: "Uma década a produzir, gravar e a fazer digressões internacionais sob o nome PIZZAWPINEAPPLES. Evidência consistente de liderar projetos e entregar trabalho de qualidade sob prazos apertados. Portefólio completo disponível a pedido."
        },
        "skills-eyebrow": {
            en: "Skills",
            pt: "Competências"
        },
        "skill-backend-label": {
            en: "Backend",
            pt: "Backend"
        },
        "skill-backend-list": {
            en: "Python, Django, Django REST Framework, REST API design, JWT auth, relational databases",
            pt: "Python, Django, Django REST Framework, design de APIs REST, autenticação JWT, bases de dados relacionais"
        },
        "skill-frontend-label": {
            en: "Frontend",
            pt: "Frontend"
        },
        "skill-frontend-list": {
            en: "React, Vite, JavaScript, HTML/CSS",
            pt: "React, Vite, JavaScript, HTML/CSS"
        },
        "skill-security-label": {
            en: "Security",
            pt: "Segurança"
        },
        "skill-security-list": {
            en: "Bug-bounty methodology, recon & exploitation basics, personal pentest labs (VMs, tooling)",
            pt: "Metodologia de bug bounty, noções de reconhecimento e exploração, laboratórios pessoais de pentest (VMs, ferramentas)"
        },
        "skill-tools-label": {
            en: "Tools & Infra",
            pt: "Ferramentas e Infra"
        },
        "skill-tools-list": {
            en: "Git, Linux, networking fundamentals, AWS (foundational)",
            pt: "Git, Linux, fundamentos de redes, AWS (nível fundamental)"
        },
        "certs-eyebrow": {
            en: "Certifications & Learning",
            pt: "Certificações e Formação"
        },
        "cert1-status": {
            en: "Professional Certificate · 9 courses · Sep 2026",
            pt: "Certificado Profissional · 9 cursos · Set 2026"
        },
        "cert2-status": {
            en: "Foundational · Feb 2026",
            pt: "Fundamentos · Fev 2026"
        },
        "cert3-title": {
            en: "TCM Security — hands-on training",
            pt: "TCM Security — formação prática"
        },
        "cert4-status": {
            en: "In progress",
            pt: "Em curso"
        },
        "lang-eyebrow": {
            en: "Languages",
            pt: "Idiomas"
        },
        "lang-english-full": {
            en: "<b>English</b> — fluent",
            pt: "<b>Inglês</b> — fluente",
            html: true
        },
        "lang-portuguese-full": {
            en: "<b>Portuguese</b> — fluent",
            pt: "<b>Português</b> — fluente",
            html: true
        }
    };

    var printButton = null;
    var langButtons = [];

    // ---- 1. Download-PDF button --------------------------------
    function addPrintButton() {
        printButton = document.createElement("button");
        printButton.type = "button";
        printButton.className = "print-btn";
        printButton.textContent = TRANSLATIONS.printBtn.en;
        printButton.addEventListener("click", function () {
            window.print();
        });
        document.body.appendChild(printButton);
    }

    // ---- 2. EN / PT language toggle -----------------------------
    function addLangToggle() {
        var wrap = document.createElement("div");
        wrap.className = "lang-toggle";

        ["en", "pt"].forEach(function (code) {
            var btn = document.createElement("button");
            btn.type = "button";
            btn.textContent = code.toUpperCase();
            btn.dataset.lang = code;
            btn.addEventListener("click", function () {
                setLanguage(code);
            });
            wrap.appendChild(btn);
            langButtons.push(btn);
        });

        document.body.appendChild(wrap);
    }

    function setLanguage(lang) {
        document.documentElement.lang = lang;
        document.title = TRANSLATIONS.pageTitle[lang];

        Object.keys(TRANSLATIONS).forEach(function (id) {
            if (id === "pageTitle" || id === "printBtn") {
                return;
            }
            var el = document.getElementById(id);
            if (!el) {
                return;
            }
            var entry = TRANSLATIONS[id];
            if (entry.html) {
                el.innerHTML = entry[lang];
            } else {
                el.textContent = entry[lang];
            }
        });

        if (printButton) {
            printButton.textContent = TRANSLATIONS.printBtn[lang];
        }

        langButtons.forEach(function (btn) {
            btn.classList.toggle("active", btn.dataset.lang === lang);
        });

        try {
            window.localStorage.setItem(LANG_STORAGE_KEY, lang);
        } catch (e) {
            // localStorage unavailable (private browsing, etc.) — language just won't persist.
        }
    }

    function getSavedLanguage() {
        try {
            var saved = window.localStorage.getItem(LANG_STORAGE_KEY);
            return (saved === "en" || saved === "pt") ? saved : "en";
        } catch (e) {
            return "en";
        }
    }

    // ---- 3. Time-of-day gutter palette --------------------------
    var ANCHORS = [
        { hour: 0,  stops: ["#171d33", "#241f3d", "#2b1c34"] }, // deep night
        { hour: 6,  stops: ["#f3c6a2", "#eab4c2", "#ccd4ef"] }, // dawn
        { hour: 12, stops: ["#ffde90", "#ffd4c0", "#b5dcff"] }, // bright midday
        { hour: 18, stops: ["#e5a05c", "#c87a6a", "#7c6da0"] }, // dusk
        { hour: 24, stops: ["#171d33", "#241f3d", "#2b1c34"] }  // wraps back to night
    ];

    function hexToRgb(hex) {
        var n = parseInt(hex.slice(1), 16);
        return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
    }

    function mix(fromHex, toHex, t) {
        var a = hexToRgb(fromHex);
        var b = hexToRgb(toHex);
        var r = Math.round(a[0] + (b[0] - a[0]) * t);
        var g = Math.round(a[1] + (b[1] - a[1]) * t);
        var bl = Math.round(a[2] + (b[2] - a[2]) * t);
        return "rgb(" + r + ", " + g + ", " + bl + ")";
    }

    function applyPalette() {
        var now = new Date();
        var hour = now.getHours() + now.getMinutes() / 60;

        // Find the two anchors this moment sits between.
        var i = 0;
        while (i < ANCHORS.length - 1 && hour >= ANCHORS[i + 1].hour) {
            i += 1;
        }
        var from = ANCHORS[i];
        var to = ANCHORS[i + 1];
        var t = (hour - from.hour) / (to.hour - from.hour);

        var root = document.documentElement;
        for (var s = 0; s < 3; s += 1) {
            root.style.setProperty("--g" + (s + 1), mix(from.stops[s], to.stops[s], t));
        }
    }

    function init() {
        addPrintButton();
        addLangToggle();
        setLanguage(getSavedLanguage());
        applyPalette();
        // Re-check every 5 min so a page left open drifts with the day.
        setInterval(applyPalette, 5 * 60 * 1000);
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
})();
