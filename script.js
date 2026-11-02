(function () {

    // --- Navbar Hamburger Logic ---
    // Single source of truth for open/closed. The previous version toggled a
    // class *and* called .fadeIn(), which left an inline `display` that fought
    // the stylesheet, and the menu never closed after tapping a link.
    const navTrigger = document.querySelector('.navTrigger');
    const mainList = document.getElementById('mainListDiv');

    function setMenu(open) {
        if (!navTrigger || !mainList) return;
        navTrigger.classList.toggle('active', open);
        mainList.classList.toggle('show_list', open);
        document.body.classList.toggle('nav-open', open);
        navTrigger.setAttribute('aria-expanded', String(open));
        navTrigger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    }

    function menuIsOpen() {
        return !!mainList && mainList.classList.contains('show_list');
    }

    if (navTrigger) {
        navTrigger.addEventListener('click', function (e) {
            e.stopPropagation();
            setMenu(!menuIsOpen());
        });
    }

    // Close after choosing a destination.
    document.querySelectorAll('.navlinks a').forEach(function (link) {
        link.addEventListener('click', function () { setMenu(false); });
    });

    // Close on Escape.
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && menuIsOpen()) {
            setMenu(false);
            if (navTrigger) navTrigger.focus();
        }
    });

    // Close when tapping outside the panel.
    document.addEventListener('click', function (e) {
        if (menuIsOpen() && !e.target.closest('#mainListDiv') && !e.target.closest('.navTrigger')) {
            setMenu(false);
        }
    });

    // Never leave the menu stuck open when resizing up to the desktop layout.
    window.matchMedia('(min-width: 769px)').addEventListener('change', function (e) {
        if (e.matches) setMenu(false);
    });

    // --- Sticky Navbar + current-section highlight ---
    const nav = document.querySelector('.nav');
    const navLinks = [...document.querySelectorAll('.navlinks a[href^="#"]')];
    const spySections = navLinks
        .map(function (a) { return document.querySelector(a.getAttribute('href')); })
        .filter(Boolean);

    function updateNavBar() {
        if (nav) nav.classList.toggle('affix', window.scrollY > 10);

        // The current section is the last one whose top has passed 40% of the
        // way down the window. At the very bottom of the page the last section
        // is too short to get there, so it wins by default.
        const line = window.innerHeight * 0.4;
        let current = null;
        spySections.forEach(function (sec) {
            if (sec.getBoundingClientRect().top <= line) current = sec;
        });
        if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
            current = spySections[spySections.length - 1];
        }
        navLinks.forEach(function (a) {
            const on = !!current && a.getAttribute('href') === '#' + current.id;
            a.classList.toggle('is-active', on);
            if (on) a.setAttribute('aria-current', 'true');
            else a.removeAttribute('aria-current');
        });
    }

    let navTicking = false;
    window.addEventListener('scroll', function () {
        if (navTicking) return;
        navTicking = true;
        requestAnimationFrame(function () { navTicking = false; updateNavBar(); });
    }, { passive: true });
    window.addEventListener('resize', updateNavBar);
    updateNavBar();

    // --- Theme Toggle Logic ---
    // The initial theme is applied by the inline script at the top of <body>,
    // before first paint, so there is no dark->light flash here. The icon glyph
    // is driven by CSS off the body class, so no class swapping is needed.
    const themeToggle = document.getElementById('theme-toggle');

    function syncThemeButton() {
        if (!themeToggle) return;
        const isLight = document.body.classList.contains('light-mode');
        themeToggle.setAttribute('aria-pressed', String(isLight));
        themeToggle.setAttribute('aria-label',
            isLight ? 'Switch to dark mode' : 'Switch to light mode');
    }

    syncThemeButton();

    if (themeToggle) {
        themeToggle.addEventListener('click', function () {
            const isLight = document.body.classList.toggle('light-mode');
            document.documentElement.classList.toggle('light-mode', isLight);
            localStorage.setItem('theme', isLight ? 'light' : 'dark');
            syncThemeButton();
            const themeColor = document.querySelector('meta[name="theme-color"]');
            if (themeColor) themeColor.content = isLight ? '#669ec3' : '#0e131a';
            // The icon's moon/sun spin-through is pure CSS, driven by the class above.
        });
    }
})();

/* ========================================
   CERTIFICATIONS COMPONENT JAVASCRIPT
   ======================================== */

const certificates = [
    {
        id: 1,
        color: "#42c257",
        provider: "Google",
        title: "Google AI Essentials",
        credentialId: "BFAGYWHS1V6R",
        credentialLink: "https://www.coursera.org/account/accomplishments/specialization/BFAGYWHS1V6R",
        logoSrc: "images/Google.svg",
        mediaLinks: ["images/googlecerts/1.jpg", "images/googlecerts/2.jpg", "images/googlecerts/3.jpg", "images/googlecerts/4.jpg", "images/googlecerts/5.jpg", "images/googlecerts/6.jpg"],
        courses: [
            "Introduction to AI",
            "Maximize Productivity With AI Tools",
            "Discover the Art of Prompting",
            "Use AI Responsibly",
            "Stay Ahead of the AI Curve"
        ]
    },
    {
        id: 2,
        color: "#0353E9",
        provider: "IBM",
        title: "AI Foundations for Everyone",
        credentialId: "20M43P1QAURR",
        credentialLink: "https://www.coursera.org/account/accomplishments/specialization/20M43P1QAURR",
        logoSrc: "images/IBM.png",
        mediaLinks: ["images/ibmcerts/1.jpg", "images/ibmcerts/2.jpg", "images/ibmcerts/3.jpg", "images/ibmcerts/4.jpg", "images/ibmcerts/5.jpg"],
        courses: [
            "Introduction to Artificial Intelligence (AI)",
            "Generative AI: Introduction and Applications",
            "Generative AI: Prompt Engineering Basics",
            "Building AI Powered Chatbots Without Programming"
        ]
    },
    {
        id: 3,
        color: "#8A3FFC",   // IBM purple, so the two IBM cards don't read as one blue
        provider: "IBM",
        title: "Building AI Agents & Agentic Workflows",
        credentialId: "7URFI9S41FP5",
        credentialLink: "https://www.coursera.org/account/accomplishments/specialization/7URFI9S41FP5",
        logoSrc: "images/IBM.png",
        mediaLinks: ["images/ibmcerts/11.jpg", "images/ibmcerts/12.jpg", "images/ibmcerts/13.jpg", "images/ibmcerts/14.jpg"],
        courses: [
            "Fundamentals of Building AI Agents",
            "Agentic AI with LangChain and LangGraph",
            "Agentic AI with LangGraph, CrewAI, AutoGen and BeeAI"
        ]
    },
    {
        id: 4,
        color: "#8C1515",
        provider: "Stanford",
        title: "Machine Learning",
        credentialId: "MSF5PI8GM9Y6",
        credentialLink: "https://www.coursera.org/account/accomplishments/specialization/MSF5PI8GM9Y6",
        logoSrc: "images/Stanford.png",
        mediaLinks: ["images/stanfordcerts/1.jpg", "images/stanfordcerts/2.jpg", "images/stanfordcerts/3.jpg", "images/stanfordcerts/4.jpg"],
        courses: [
            "Supervised Machine Learning: Regression and Classification",
            "Advanced Learning Algorithms",
            "Unsupervised Learning, Recommenders, Reinforcement Learning"
        ]
    },
    {
        id: 5,
        color: "#EA4335",
        provider: "DeepLearning.AI",
        title: "Neural Networks & Deep Learning",
        credentialId: "ZHER1XBHJAJ3",
        credentialLink: "https://www.coursera.org/account/accomplishments/verify/ZHER1XBHJAJ3",
        logoSrc: "images/DeepLearning.png",
        mediaLinks: ["images/deep.jpg"],
        courses: [
            "Neural Networks and Deep Learning"
        ]
    }
];

let currentView = '3d';
let selectedIndex = -1;
const scene = document.getElementById('scene-container');
const btn3d = document.getElementById('btn-3d');
const btnGrid = document.getElementById('btn-grid');

function renderCards() {
    scene.innerHTML = '';
    // Lets the grid pick a column count that never leaves one card alone on a row.
    scene.style.setProperty('--cert-cols', certGridColumns(certificates.length));

    certificates.forEach((cert, index) => {
        const wrapper = document.createElement('div');
        wrapper.className = 'card-wrapper';
        wrapper.style.zIndex = index;

        wrapper.addEventListener('mouseenter', () => handleMouseEnter(index));
        wrapper.addEventListener('mouseleave', () => handleMouseLeave());
        wrapper.addEventListener('click', (e) => { e.stopPropagation(); handleCardClick(index); });

        wrapper.dataset.index = index;

        const inner = document.createElement('div');
        inner.className = 'card-inner';

        const createFace = (cls) => {
            const div = document.createElement('div');
            div.className = `face ${cls}`;
            div.style.backgroundColor = cert.color;
            return div;
        };

        // The select button covers the face beneath the content, so the card's
        // own links are never nested inside another control. Its clicks bubble
        // to the wrapper's handler above; it only exists in the 3D view (CSS).
        const front = createFace('face-front');
        front.innerHTML = `
<button type="button" class="cert-select" aria-pressed="false" aria-label="${cert.provider} — ${cert.title}"></button>
<div class="cert-front">
    <div class="cert-head">
        <div class="cert-meta">
            <div class="cert-provider">${cert.provider}</div>
            <div class="cert-title">${cert.title}</div>
            <div class="cert-id">Credential ID: ${cert.credentialId}</div>
        </div>
        <div class="cert-logo-cell">
            <div class="cert-logo">
                <img src="${cert.logoSrc}" alt="${cert.provider} logo" draggable="false" />
            </div>
        </div>
        ${cert.courses && cert.courses.length ? `
        <div class="cert-courses">
            <div class="cert-courses-label">Courses Included:</div>
            <ul>
                ${cert.courses.map(c => `<li>${c}</li>`).join('')}
            </ul>
        </div>` : ''}
    </div>
    <div class="cert-actions">
        ${cert.credentialLink ? `<a href="${cert.credentialLink}" target="_blank" rel="noopener" class="credential-link">Show Credential</a>` : ''}
        <button type="button" class="show-cert-btn">Show Certificates</button>
    </div>
</div>
`;

        const selectBtn = front.querySelector('.cert-select');
        // Mirror hover peek for keyboard users.
        selectBtn.addEventListener('focus', () => handleMouseEnter(index));
        selectBtn.addEventListener('blur', () => handleMouseLeave());

        const side = createFace('face-side');
        const back = createFace('face-back');
        const top = createFace('face-top');
        const bottom = createFace('face-bottom');

        inner.append(front, side, back, top, bottom);
        wrapper.appendChild(inner);
        scene.appendChild(wrapper);

        const showBtn = wrapper.querySelector('.show-cert-btn');
        showBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            openCertificatesModal(cert, showBtn);
        });
    });
    updateUI();
    syncCardFocus();
}

// Columns for the grid view at desktop widths: up to five, split so the last
// row is never a single card (6 -> 3+3, 7 -> 4+3, 9 -> 5+4, 11 -> 4+4+3).
function certGridColumns(count) {
    if (count <= 5) return count;
    return Math.ceil(count / Math.ceil(count / 5));
}

// In the 3D stack the cards overlap, so only the selected card's links are
// reachable with Tab; in the grid every card's links are.
function syncCardFocus() {
    document.querySelectorAll('.card-wrapper').forEach((card, idx) => {
        const reachable = currentView !== '3d' || idx === selectedIndex;
        card.querySelectorAll('.cert-actions a, .cert-actions button').forEach(el => {
            if (reachable) el.removeAttribute('tabindex');
            else el.setAttribute('tabindex', '-1');
        });
    });
}

// Certificates modal. A native <dialog> opened with showModal() keeps focus
// inside it and makes the page behind inert; Escape, a backdrop click and the
// Close button all dismiss it, and focus returns to the button that opened it.
(function createCertificatesModal() {
    // Single handler reference at IIFE scope — only one can ever be registered at a time
    let modalKeyHandler = null;

    function clearKeyHandler() {
        if (modalKeyHandler) {
            document.removeEventListener('keydown', modalKeyHandler);
            modalKeyHandler = null;
        }
    }

    const modal = document.createElement('dialog');
    modal.className = 'cert-modal';
    modal.innerHTML = `
        <div class="cert-modal-inner">
            <div class="cert-modal-header">
                <div class="cert-modal-heading">Certificates</div>
                <button type="button" class="cert-modal-close">Close</button>
            </div>
            <div class="cert-modal-body"></div>
        </div>
    `;
    document.body.appendChild(modal);

    const body = modal.querySelector('.cert-modal-body');
    const supportsDialog = typeof modal.showModal === 'function';
    if (!supportsDialog) modal.classList.add('no-dialog');
    let opener = null;
    // Set while the large view is showing: Escape steps back to the grid first.
    let backToGrid = null;

    function closeModal() {
        if (supportsDialog) {
            if (modal.open) modal.close();
        } else if (modal.hasAttribute('open')) {
            modal.removeAttribute('open');
            onClosed();
        }
    }

    function onClosed() {
        clearKeyHandler();
        backToGrid = null;
        document.body.classList.remove('modal-open');
        if (opener && opener.isConnected) opener.focus({ preventScroll: true });
        opener = null;
    }

    modal.querySelector('.cert-modal-close').addEventListener('click', closeModal);
    modal.addEventListener('close', onClosed);
    // The dialog has no padding of its own, so a click that targets it directly
    // landed on the backdrop around the panel.
    modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
    modal.addEventListener('cancel', (e) => {
        if (backToGrid) {
            e.preventDefault();
            backToGrid();
        }
    });
    if (!supportsDialog) {
        document.addEventListener('keydown', (e) => {
            if (e.key !== 'Escape' || !modal.hasAttribute('open')) return;
            if (backToGrid) backToGrid(); else closeModal();
        });
    }

    // Image 0 of a specialization is its overall certificate, then one per course.
    function altFor(cert, i) {
        const courses = cert.courses || [];
        const hasSpecialization = (cert.mediaLinks || []).length === courses.length + 1;
        if (hasSpecialization && i === 0) return `${cert.title} specialization certificate`;
        const course = courses[hasSpecialization ? i - 1 : i];
        return course ? `${course} course certificate` : `${cert.title} certificate ${i + 1}`;
    }

    window.openCertificatesModal = function(cert, trigger) {
        // Clear any handler left over from a previously opened modal
        clearKeyHandler();

        const imageList = cert.mediaLinks || [];
        const title = cert.title;
        opener = trigger || document.activeElement;
        modal.setAttribute('aria-label', `${title} certificates`);

        body.innerHTML = '';

        const heading = document.createElement('div');
        heading.className = 'cert-modal-title';
        heading.textContent = title || 'Certificates';
        body.appendChild(heading);

        let currentIndex = -1;
        let thumbButtons = [];

        // Grid cells render at ~160px tall, so they load the 400px thumbnail
        // rather than the full-size scan. Hoisted to this scope so the large
        // view can reuse the already-cached thumbnail as an instant placeholder.
        const thumbFor = src => src.replace(/([^/]+)$/, 'thumbs/$1');

        // Warm a full-size file in the background without blocking anything.
        const prefetch = src => { const p = new Image(); p.src = src; };

        function renderGrid(focusIndex) {
            clearKeyHandler();
            backToGrid = null;
            body.innerHTML = '';
            body.appendChild(heading);

            if (!imageList || imageList.length === 0) {
                const p = document.createElement('div');
                p.className = 'cert-modal-empty';
                p.textContent = 'No certificate images provided.';
                body.appendChild(p);
                return;
            }

            const grid = document.createElement('div');
            grid.className = 'cert-modal-grid';

            thumbButtons = imageList.map((src, idx) => {
                const cell = document.createElement('button');
                cell.type = 'button';
                cell.className = 'cert-modal-thumb';

                const img = document.createElement('img');
                img.src = thumbFor(src);
                // If a thumbnail is missing for any reason, fall back to the
                // full-size file rather than showing a broken image.
                img.addEventListener('error', () => { if (img.src !== src) img.src = src; }, { once: true });
                img.alt = altFor(cert, idx);
                // Eager, not lazy: the whole thumbnail set is only ~20KB per
                // image, and having every one cached is what lets the large
                // view open instantly with a placeholder instead of a blank box.
                img.loading = 'eager';
                img.decoding = 'async';
                img.fetchPriority = 'high';
                cell.addEventListener('click', () => showLargeImage(idx));
                cell.appendChild(img);
                grid.appendChild(cell);
                return cell;
            });
            body.appendChild(grid);
            if (focusIndex !== undefined && thumbButtons[focusIndex]) {
                thumbButtons[focusIndex].focus({ preventScroll: true });
            }
        }

        function showLargeImage(index) {
            body.innerHTML = '';

            const controls = document.createElement('div');
            controls.className = 'cert-modal-controls';

            const backBtn = document.createElement('button');
            backBtn.type = 'button';
            backBtn.className = 'cert-modal-back';
            backBtn.textContent = 'Back';
            backBtn.addEventListener('click', () => renderGrid(currentIndex));
            controls.appendChild(backBtn);
            body.appendChild(controls);

            const row = document.createElement('div');
            row.className = 'cert-modal-viewer';

            const sidePrev = document.createElement('button');
            sidePrev.type = 'button';
            sidePrev.className = 'cert-modal-side';
            sidePrev.textContent = '❮';
            sidePrev.setAttribute('aria-label', 'Previous');
            sidePrev.addEventListener('click', () => {
                if (currentIndex > 0) setLargeImage(currentIndex - 1);
            });

            const imgContainer = document.createElement('div');
            imgContainer.className = 'cert-modal-frame';

            const img = document.createElement('img');
            img.className = 'cert-modal-large';
            img.decoding = 'async';
            imgContainer.appendChild(img);

            const sideNext = document.createElement('button');
            sideNext.type = 'button';
            sideNext.className = 'cert-modal-side';
            sideNext.textContent = '❯';
            sideNext.setAttribute('aria-label', 'Next');
            sideNext.addEventListener('click', () => {
                if (currentIndex < imageList.length - 1) setLargeImage(currentIndex + 1);
            });

            row.appendChild(sidePrev);
            row.appendChild(imgContainer);
            row.appendChild(sideNext);
            body.appendChild(row);

            // Swaps the picture in place, so the controls (and keyboard focus
            // on them) survive moving between images.
            function setLargeImage(i) {
                currentIndex = i;

                // The full-size scans are ~320KB each. Start from the thumbnail
                // that is already in cache, then swap once the full-size file
                // has decoded, so there is never an empty frame.
                const fullSrc = imageList[i];
                img.src = thumbFor(fullSrc);
                img.alt = altFor(cert, i);
                img.classList.add('is-loading');

                const fullImg = new Image();
                fullImg.onload = () => {
                    // Ignore a late arrival if the user has already navigated away.
                    if (currentIndex !== i) return;
                    img.src = fullSrc;
                    img.classList.remove('is-loading');
                };
                // If the full-size file fails, keep the thumbnail rather than a gap.
                fullImg.onerror = () => { if (currentIndex === i) img.classList.remove('is-loading'); };
                fullImg.src = fullSrc;

                // Warm the neighbours so the arrows resolve instantly.
                [i - 1, i + 1].forEach(n => {
                    if (n >= 0 && n < imageList.length) prefetch(imageList[n]);
                });

                sidePrev.style.visibility = (i > 0) ? 'visible' : 'hidden';
                sideNext.style.visibility = (i < imageList.length - 1) ? 'visible' : 'hidden';
                // Don't strand focus on an arrow that just disappeared.
                const active = document.activeElement;
                if ((active === sidePrev || active === sideNext) && active.style.visibility === 'hidden') {
                    const other = active === sidePrev ? sideNext : sidePrev;
                    (other.style.visibility === 'visible' ? other : backBtn).focus();
                }
            }

            setLargeImage(index);
            backBtn.focus({ preventScroll: true });
            backToGrid = () => renderGrid(currentIndex);

            // Register a fresh single handler — clear old one first
            clearKeyHandler();
            modalKeyHandler = function(e) {
                if (e.key === 'ArrowLeft' && currentIndex > 0) {
                    setLargeImage(currentIndex - 1);
                } else if (e.key === 'ArrowRight' && currentIndex < imageList.length - 1) {
                    setLargeImage(currentIndex + 1);
                }
            };
            document.addEventListener('keydown', modalKeyHandler);
        }

        renderGrid();
        document.body.classList.add('modal-open');
        if (supportsDialog) {
            if (!modal.open) modal.showModal();
        } else {
            modal.setAttribute('open', '');
        }
    };
})();

function handleMouseEnter(hoveredIndex) {
    if (currentView === '3d' && selectedIndex !== -1) return;

    const allCards = document.querySelectorAll('.card-wrapper');
    allCards.forEach((card, index) => {
        card.classList.remove('is-hovered', 'shift-left', 'shift-right');
        if (index === hoveredIndex) {
            card.classList.add('is-hovered');
        } else if (index < hoveredIndex) {
            card.classList.add('shift-left');
        } else {
            card.classList.add('shift-right');
        }
    });
}

function handleMouseLeave() {
    if (currentView === '3d' && selectedIndex !== -1) return;
    const allCards = document.querySelectorAll('.card-wrapper');
    allCards.forEach(card => card.classList.remove('is-hovered', 'shift-left', 'shift-right'));
}

window.setView = function(mode) {
    if (mode === currentView) return;

    if (selectedIndex !== -1 && currentView === '3d' && mode !== '3d') {
        return;
    }

    animateLayoutTransition();
    currentView = mode;

    if (mode !== '3d') {
        selectedIndex = -1;
        document.body.classList.remove('has-selection');
        document.querySelectorAll('.card-wrapper.is-selected').forEach(c => c.classList.remove('is-selected'));
    }

    document.body.className = document.body.className.replace(/mode-(3d|grid)/g, '') + ` mode-${mode}`;
    updateUI();
    syncCardFocus();
}

function handleCardClick(index) {
    if (currentView !== '3d') return;
    selectedIndex = (selectedIndex === index) ? -1 : index;
    updateSelectedState();
}

function updateSelectedState() {
    const cards = document.querySelectorAll('.card-wrapper');
    document.body.classList.toggle('has-selection', selectedIndex !== -1);

    if (btnGrid) {
        if (selectedIndex !== -1 && currentView === '3d') {
            btnGrid.style.opacity = '0.5';
            btnGrid.style.pointerEvents = 'none';
            btnGrid.setAttribute('aria-disabled', 'true');
        } else {
            btnGrid.style.opacity = '';
            btnGrid.style.pointerEvents = '';
            btnGrid.removeAttribute('aria-disabled');
        }
    }

    cards.forEach((card, idx) => {
        const selectBtn = card.querySelector('.cert-select');
        if (selectBtn) selectBtn.setAttribute('aria-pressed', String(idx === selectedIndex));
        if (idx === selectedIndex) {
            card.classList.add('is-selected');
            card.classList.remove('is-hovered', 'shift-left', 'shift-right');
            card.style.zIndex = 9999;
        } else {
            card.classList.remove('is-selected');
            card.style.zIndex = idx;
        }
    });

    if (selectedIndex === -1) {
        cards.forEach((card, idx) => {
            card.classList.remove('is-hovered', 'shift-left', 'shift-right', 'is-selected');
            card.style.transform = '';
            card.style.transition = '';
            card.style.zIndex = idx;
        });
        void document.body.offsetHeight;
    }
    syncCardFocus();
}

if (scene) {
    document.addEventListener('click', (e) => {
        if (currentView !== '3d') return;
        if (selectedIndex === -1) return;
        if ('button' in e && e.button !== 0) return;
        if (!e.target.closest('.card-wrapper')) {
            selectedIndex = -1;
            updateSelectedState();
        }
    });
}

function updateUI() {
    if (btn3d && btnGrid) {
        btn3d.classList.remove('active');
        btnGrid.classList.remove('active');
        if (currentView === '3d') {
            btn3d.classList.add('active');
        } else {
            btnGrid.classList.add('active');
        }
    }
}

function animateLayoutTransition() {
    const cards = [...document.querySelectorAll('.card-wrapper')];
    const firstRects = cards.map(card => card.getBoundingClientRect());

    document.body.offsetHeight;

    requestAnimationFrame(() => {
        const lastRects = cards.map(card => card.getBoundingClientRect());
        cards.forEach((card, i) => {
            const dx = firstRects[i].left - lastRects[i].left;
            const dy = firstRects[i].top - lastRects[i].top;
            card.style.transition = 'none';
            card.style.transform = `translate(${dx}px, ${dy}px)`;
            card.offsetHeight;
            card.style.transition = 'transform 1.4s var(--ease-smooth)';
            card.style.transform = '';
        });
    });
}

function initAboutAnimation() {
    const greeting  = document.querySelector('.about-greeting');
    const nameEl    = document.querySelector('.about-hero-name');
    const roles     = document.querySelector('.about-roles');
    const photo     = document.querySelector('.profile-photo');
    const awards    = document.querySelector('.about-awards');
    const bios      = document.querySelectorAll('#about p:not(.about-greeting):not(.about-roles)');
    const cvBtn     = document.querySelector('.cv-download-btn');

    // Apply initial hidden state to all fade elements
    [greeting, roles, awards, photo, ...bios, cvBtn].forEach(el => {
        if (el) el.classList.add('about-anim');
    });

    // Replace name content with typewriter structure. The heading keeps its
    // full name for screen readers, which would otherwise catch it half-typed.
    if (nameEl) {
        nameEl.classList.add('about-anim');
        nameEl.setAttribute('aria-label', 'Rohit Balaji');
        nameEl.innerHTML = '<span id="about-typed" aria-hidden="true"></span><span class="about-cursor" aria-hidden="true"></span>';
    }

    const typedEl  = document.getElementById('about-typed');
    const cursorEl = document.querySelector('.about-cursor');
    const fullName = 'Rohit Balaji';

    // Reduced motion: show everything at once, no typing, no staggered fades.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        if (typedEl) typedEl.textContent = fullName;
        if (cursorEl) cursorEl.style.display = 'none';
        [greeting, nameEl, roles, awards, photo, ...bios, cvBtn].forEach(el => {
            if (el) el.classList.add('about-anim-visible');
        });
        return;
    }

    // Greeting fades in first
    setTimeout(() => greeting && greeting.classList.add('about-anim-visible'), 150);

    // Name typewriter starts shortly after
    setTimeout(() => {
        if (!nameEl || !typedEl) return;
        nameEl.classList.add('about-anim-visible');
        let i = 0;
        const interval = setInterval(() => {
            typedEl.textContent += fullName[i];
            i++;
            if (i >= fullName.length) {
                clearInterval(interval);
                setTimeout(() => { if (cursorEl) cursorEl.style.display = 'none'; }, 800);
            }
        }, 60);
    }, 400);

    // Everything else staggers in after the name finishes
    [
        { el: roles,    delay: 950  },
        { el: awards,   delay: 1120 },
        { el: photo,    delay: 1320 },
        { el: bios[0],  delay: 1550 },
        { el: bios[1],  delay: 1780 },
        { el: cvBtn,    delay: 2010 },
    ].forEach(({ el, delay }) => {
        if (el) setTimeout(() => el.classList.add('about-anim-visible'), delay);
    });
}

initAboutAnimation();

// The 3D stack is a fixed ~500px wide and cannot shrink, so on narrow screens
// it forces the whole page to zoom out. Below 700px the grid view is enforced.
const certSmallScreen = window.matchMedia('(max-width: 700px)');

// Tracks whether grid mode was chosen for the user rather than by the user, so
// widening the window can hand back the 3D view without overriding a deliberate
// choice to stay in grid.
let certViewForcedByViewport = false;

// Set once the user picks a view themselves. From that point the viewport never
// overrides them — including rotating a phone back to portrait after opting
// into the 3D stack.
let certViewUserChoice = null;

function enforceCertViewForViewport() {
    if (certViewUserChoice) return;

    if (certSmallScreen.matches) {
        if (currentView !== 'grid') {
            // setView() refuses to leave 3D while a card is selected. Clear the
            // selection first, otherwise narrowing the window with a card open
            // would strand the fixed-width stack and re-introduce the overflow.
            if (selectedIndex !== -1) {
                selectedIndex = -1;
                updateSelectedState();
            }
            setView('grid');
            certViewForcedByViewport = true;
        }
    } else if (certViewForcedByViewport) {
        // Back on a wide screen and the user never picked grid themselves.
        certViewForcedByViewport = false;
        setView('3d');
    }
}

// Initialize
if (scene) {
    if (!document.body.classList.contains('mode-3d') && !document.body.classList.contains('mode-grid')) {
        document.body.classList.add('mode-3d');
        currentView = '3d';
    }
    renderCards();
    enforceCertViewForViewport();
    certSmallScreen.addEventListener('change', enforceCertViewForViewport);

    // Replaces inline onclick="setView(...)" attributes. Recording the choice
    // makes it stick for the session, so resizing never overrides it.
    if (btn3d) btn3d.addEventListener('click', () => {
        certViewUserChoice = '3d';
        certViewForcedByViewport = false;
        setView('3d');
    });
    if (btnGrid) btnGrid.addEventListener('click', () => {
        certViewUserChoice = 'grid';
        certViewForcedByViewport = false;
        setView('grid');
    });
}

/* ========================================
   LANGUAGES & FRAMEWORKS CAROUSEL
   Progressive enhancement: the markup is a plain wrapped grid, which is what
   renders with no JS, under prefers-reduced-motion, and on narrow screens.
   This only promotes it to a 3D ring where that actually fits.
   ======================================== */

(function initTechCarousel() {
    const wrap = document.querySelector('.tech-stack-container');
    const ring = wrap && wrap.querySelector('.tech-ring');
    if (!wrap || !ring) return;

    const cards = [...ring.querySelectorAll('.tech-card')];
    if (!cards.length) return;

    // Below this the flat grid is the better layout, and re-introducing a
    // fixed-width 3D element here would undo the mobile overflow fix.
    const wideEnough = window.matchMedia('(min-width: 780px)');
    const calm       = window.matchMedia('(prefers-reduced-motion: reduce)');

    const DRIFT = 0.075;           // deg per frame — ~4.5 deg/sec
    const DRAG_SCALE = 0.28;       // deg per px dragged
    const FRICTION = 0.94;         // fling decay

    let spin = 0, momentum = 0;
    let dragging = false, moved = false, lastX = 0, raf = null, hovered = false;

    cards.forEach((card, i) => {
        card.style.setProperty('--tc-angle', `${(360 / cards.length) * i}deg`);
    });

    // Writing the transform is separate from the rAF loop so a drag updates
    // immediately. requestAnimationFrame is throttled in background tabs and
    // under low-power mode; without this the ring would not follow the pointer.
    function render() {
        // Writing transform directly is cheaper than going through a custom
        // property, which invalidates style across the ring's subtree.
        ring.style.transform = 'rotateX(-5deg) rotateY(' + spin.toFixed(2) + 'deg)';
    }

    function frame() {
        if (dragging) {
            // position is driven directly by the pointer
        } else if (Math.abs(momentum) > 0.01) {
            spin += momentum;
            momentum *= FRICTION;
        } else if (!hovered) {
            spin += DRIFT;
        }
        render();
        raf = requestAnimationFrame(frame);
    }

    // Spinning a 15-card 3D ring costs paint and compositing on every frame.
    // Doing that while the section is scrolled out of view is pure waste, and
    // it was making the rest of the page feel heavier than it needed to.
    let onScreen = true;
    if ('IntersectionObserver' in window) {
        new IntersectionObserver((entries) => {
            onScreen = entries[0].isIntersecting;
            apply();
        }, { rootMargin: '120px' }).observe(wrap);
    }

    function apply() {
        const is3D    = wideEnough.matches && !calm.matches;
        const running = is3D && onScreen;

        wrap.classList.toggle('is-3d', is3D);

        if (running && raf === null) {
            raf = requestAnimationFrame(frame);
        } else if (!running && raf !== null) {
            cancelAnimationFrame(raf);
            raf = null;
        }

        // Only reset the ring when genuinely leaving 3D mode. Clearing it on
        // every pause would snap the ring back to 0deg each time it scrolled
        // out of view and back.
        if (!is3D) {
            ring.style.removeProperty('transform');
            spin = 0;
            momentum = 0;
        }
    }

    wrap.addEventListener('pointerenter', () => { hovered = true; });
    wrap.addEventListener('pointerleave', () => { hovered = false; });

    wrap.addEventListener('pointerdown', (e) => {
        if (!wrap.classList.contains('is-3d')) return;
        // stop the browser starting a text selection or an image drag
        e.preventDefault();
        dragging = true;
        moved = false;
        momentum = 0;
        lastX = e.clientX;
        wrap.setPointerCapture(e.pointerId);
    });

    wrap.addEventListener('pointermove', (e) => {
        if (!dragging) return;
        const dx = e.clientX - lastX;
        if (Math.abs(dx) > 1) moved = true;
        spin += dx * DRAG_SCALE;
        momentum = dx * DRAG_SCALE;   // carries the fling when released
        lastX = e.clientX;
        render();
    });

    function endDrag(e) {
        if (!dragging) return;
        dragging = false;
        if (e && e.pointerId !== undefined && wrap.hasPointerCapture(e.pointerId)) {
            wrap.releasePointerCapture(e.pointerId);
        }
    }
    wrap.addEventListener('pointerup', endDrag);
    wrap.addEventListener('pointercancel', endDrag);

    // a drag that ended on a card shouldn't also register as a click
    wrap.addEventListener('click', (e) => { if (moved) { e.preventDefault(); e.stopPropagation(); } }, true);

    // native image drag is the other way this breaks
    wrap.addEventListener('dragstart', (e) => e.preventDefault());

    wideEnough.addEventListener('change', apply);
    calm.addEventListener('change', apply);
    apply();
})();
