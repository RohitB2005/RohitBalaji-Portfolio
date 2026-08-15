$(document).ready(function() {

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

    // --- Sticky Navbar Logic ---
    $(window).scroll(function() {
        if ($(this).scrollTop() > 10) {
            $('.nav').addClass("affix");
        } else {
            $('.nav').removeClass("affix");
        }
    });

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

            themeToggle.classList.add('rotate-icon');
            setTimeout(function () {
                themeToggle.classList.remove('rotate-icon');
            }, 500);
        });
    }
});

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
        color: "#0F62FE",
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
    
    certificates.forEach((cert, index) => {
        const wrapper = document.createElement('div');
        wrapper.className = 'card-wrapper';
        wrapper.style.zIndex = index;

        wrapper.addEventListener('mouseenter', () => handleMouseEnter(index));
        wrapper.addEventListener('mouseleave', () => handleMouseLeave());
        wrapper.addEventListener('click', (e) => { e.stopPropagation(); handleCardClick(index); });

        // Keyboard-operable: a bare <div> with a click handler is invisible to
        // both the tab order and screen readers.
        wrapper.tabIndex = 0;
        wrapper.setAttribute('role', 'button');
        wrapper.setAttribute('aria-pressed', 'false');
        wrapper.setAttribute('aria-label', `${cert.provider} — ${cert.title}`);
        wrapper.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
                e.preventDefault();
                handleCardClick(index);
            }
        });
        // Mirror hover peek for keyboard users.
        wrapper.addEventListener('focus', () => handleMouseEnter(index));
        wrapper.addEventListener('blur', () => handleMouseLeave());

        wrapper.dataset.index = index;

        const inner = document.createElement('div');
        inner.className = 'card-inner';

        const createFace = (cls) => {
            const div = document.createElement('div');
            div.className = `face ${cls}`;
            div.style.backgroundColor = cert.color;
            return div;
        };

        const front = createFace('face-front');
        front.innerHTML = `
<div class="absolute inset-0 pointer-events-auto p-4 text-white" style="position: absolute; padding: 1rem; color: white;">
    <div style="display: grid; grid-template-columns: 1fr 64px; grid-template-rows: auto auto; gap: 8px; align-items: start;">
        <div style="grid-column: 1; grid-row: 1;">
            <div style="font-size: 1.4rem; font-weight: 600; opacity: 0.9;">${cert.provider}</div>
            <div style="font-size: 1.6rem; font-weight: bold; letter-spacing: -0.5px; word-break: break-word; padding-right: 0.5rem; line-height: 1.3;">${cert.title}</div>
            <div style="margin-top: 0.5rem; font-size: 1.2rem; opacity: 0.8; font-family: monospace;">Credential ID: ${cert.credentialId}</div>
        </div>
        <div style="grid-column: 2; grid-row: 1; display:flex; justify-content:center; align-items:flex-start;">
            <div style="width: 48px; height: 48px; border-radius: 8px; border: 1px solid #e5e7eb; background: white; display: flex; align-items: center; justify-content: center; padding: 4px;">
                ${cert.logoSrc ? `<img src="${cert.logoSrc}" alt="${cert.provider} logo" style="width: 100%; height: 100%; object-fit: contain;" draggable="false" />` : cert.logoText}
            </div>
        </div>
        <div style="grid-column: 1 / span 2; grid-row: 2; margin-top: 4px;">
            ${cert.courses && cert.courses.length ? `
                <div style="font-size: 1.2rem;">
                    <div style="font-weight: 600; margin-bottom: 4px;">Courses Included:</div>
                    <ul style="list-style-position: inside; list-style-type: disc; margin: 0; padding: 0;">
                        ${cert.courses.map(c => `<li style="opacity: 0.85; margin: 4px 0;">${c}</li>`).join('')}
                    </ul>
                </div>
            ` : ''}
        </div>
    </div>
    <div class="absolute left-0 right-0 bottom-3 flex justify-center gap-3">
        ${cert.credentialLink ? `<a href="${cert.credentialLink}" target="_blank" class="credential-link text-xs font-semibold underline bg-white/10 px-2 py-0.5 rounded hover:bg-white/20">Show Credential</a>` : ''}
        <a href="#" class="show-cert-btn text-xs font-semibold underline bg-white/10 px-2 py-0.5 rounded hover:bg-white/20">Show Certificates</a>
    </div>
</div>
`;

        const side = createFace('face-side');
        const back = createFace('face-back');
        const top = createFace('face-top');
        const bottom = createFace('face-bottom');

        inner.append(front, side, back, top, bottom);
        wrapper.appendChild(inner);
        scene.appendChild(wrapper);

        const showBtn = wrapper.querySelector('.show-cert-btn');
        if (showBtn) {
            showBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                openCertificatesModal(cert.mediaLinks || [], cert.title);
            });
        }
    });
    updateUI();
}

// Modal implementation
(function createCertificatesModal() {
    // Single handler reference at IIFE scope — only one can ever be registered at a time
    let modalKeyHandler = null;

    function clearKeyHandler() {
        if (modalKeyHandler) {
            document.removeEventListener('keydown', modalKeyHandler);
            modalKeyHandler = null;
        }
    }

    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'cert-modal-overlay hidden';

    const modal = document.createElement('div');
    modal.className = 'cert-modal';

    modal.innerHTML = `
        <div style="display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 1rem;">
            <div style="font-size: 1.8rem; font-weight: bold;">Certificates</div>
            <button class="cert-modal-close">Close</button>
        </div>
        <div class="cert-modal-body" style="margin-top: 1rem;">
            <div style="font-size: 1.4rem; opacity: 0.7;">No images available.</div>
        </div>
    `;

    modalOverlay.appendChild(modal);
    document.body.appendChild(modalOverlay);

    modalOverlay.querySelector('.cert-modal-close').addEventListener('click', () => {
        clearKeyHandler();
        modalOverlay.classList.add('hidden');
    });

    window.openCertificatesModal = function(imageList, title) {
        // Clear any handler left over from a previously opened modal
        clearKeyHandler();

        const body = modal.querySelector('.cert-modal-body');
        body.innerHTML = '';

        const heading = document.createElement('div');
        heading.style.fontWeight = '600';
        heading.style.fontSize = '1.6rem';
        heading.textContent = title || 'Certificates';
        body.appendChild(heading);

        let currentIndex = -1;

        function renderGrid() {
            clearKeyHandler();
            body.innerHTML = '';
            body.appendChild(heading);

            if (!imageList || imageList.length === 0) {
                const p = document.createElement('div');
                p.style.fontSize = '1.4rem';
                p.style.opacity = '0.7';
                p.textContent = 'No certificate images provided.';
                body.appendChild(p);
                return;
            }

            const grid = document.createElement('div');
            grid.style.display = 'grid';
            grid.style.gridTemplateColumns = 'repeat(2, 1fr)';
            grid.style.gap = '1rem';
            grid.style.marginTop = '1rem';

            if (window.innerWidth >= 768) {
                grid.style.gridTemplateColumns = 'repeat(3, 1fr)';
            }

            // Grid cells render at ~160px tall, so load the 400px thumbnail
            // rather than the full-size scan. Full size is fetched only when a
            // cell is opened.
            const thumbFor = src => src.replace(/([^/]+)$/, 'thumbs/$1');

            imageList.forEach((src, idx) => {
                const imgWrap = document.createElement('div');
                imgWrap.style.border = '1px solid var(--card-border)';
                imgWrap.style.borderRadius = '8px';
                imgWrap.style.overflow = 'hidden';
                imgWrap.style.backgroundColor = 'var(--card-bg)';
                imgWrap.style.padding = '4px';

                const img = document.createElement('img');
                img.src = thumbFor(src);
                // If a thumbnail is missing for any reason, fall back to the
                // full-size file rather than showing a broken image.
                img.addEventListener('error', () => { if (img.src !== src) img.src = src; }, { once: true });
                img.alt = 'certificate image';
                img.loading = 'lazy';
                img.decoding = 'async';
                img.style.cursor = 'pointer';
                img.style.width = '100%';
                img.style.height = '160px';
                img.style.objectFit = 'contain';
                img.addEventListener('click', () => showLargeImage(idx));
                imgWrap.appendChild(img);
                grid.appendChild(imgWrap);
            });
            body.appendChild(grid);
        }

        function showLargeImage(index) {
            currentIndex = index;
            body.innerHTML = '';

            const controls = document.createElement('div');
            controls.style.display = 'flex';
            controls.style.alignItems = 'center';
            controls.style.gap = '0.5rem';
            controls.style.marginBottom = '1rem';

            const backBtn = document.createElement('button');
            backBtn.className = 'cert-modal-back';
            backBtn.textContent = 'Back';
            backBtn.addEventListener('click', () => renderGrid());
            controls.appendChild(backBtn);
            body.appendChild(controls);

            const row = document.createElement('div');
            row.style.display = 'flex';
            row.style.alignItems = 'center';
            row.style.justifyContent = 'center';
            row.style.gap = '1rem';
            row.style.width = '100%';

            const sidePrev = document.createElement('button');
            sidePrev.className = 'cert-modal-side';
            sidePrev.textContent = '❮';
            sidePrev.setAttribute('aria-label', 'Previous');
            sidePrev.style.flexShrink = '0';
            sidePrev.style.position = 'static';
            sidePrev.style.transform = 'none';
            sidePrev.style.visibility = (currentIndex > 0) ? 'visible' : 'hidden';
            sidePrev.addEventListener('click', () => {
                if (currentIndex > 0) showLargeImage(currentIndex - 1);
            });

            const imgContainer = document.createElement('div');
            imgContainer.style.flex = '1';
            imgContainer.style.display = 'flex';
            imgContainer.style.justifyContent = 'center';
            imgContainer.style.overflow = 'hidden';

            const img = document.createElement('img');
            img.src = imageList[currentIndex];
            img.alt = 'certificate image large';
            img.style.maxHeight = '70vh';
            img.style.width = 'auto';
            img.style.maxWidth = '100%';
            img.style.objectFit = 'contain';
            img.style.borderRadius = '8px';
            imgContainer.appendChild(img);

            const sideNext = document.createElement('button');
            sideNext.className = 'cert-modal-side';
            sideNext.textContent = '❯';
            sideNext.setAttribute('aria-label', 'Next');
            sideNext.style.flexShrink = '0';
            sideNext.style.position = 'static';
            sideNext.style.transform = 'none';
            sideNext.style.visibility = (currentIndex < imageList.length - 1) ? 'visible' : 'hidden';
            sideNext.addEventListener('click', () => {
                if (currentIndex < imageList.length - 1) showLargeImage(currentIndex + 1);
            });

            row.appendChild(sidePrev);
            row.appendChild(imgContainer);
            row.appendChild(sideNext);
            body.appendChild(row);

            // Register a fresh single handler — clear old one first
            clearKeyHandler();
            modalKeyHandler = function(e) {
                if (e.key === 'ArrowLeft' && currentIndex > 0) {
                    showLargeImage(currentIndex - 1);
                } else if (e.key === 'ArrowRight' && currentIndex < imageList.length - 1) {
                    showLargeImage(currentIndex + 1);
                } else if (e.key === 'Escape') {
                    renderGrid();
                }
            };
            document.addEventListener('keydown', modalKeyHandler);
        }

        renderGrid();
        modalOverlay.classList.remove('hidden');
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
        card.setAttribute('aria-pressed', String(idx === selectedIndex));
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
}

let _lastWheelAt = 0;
const _wheelDebounce = 140;

function navigate(direction) {
    if (currentView !== '3d') return;
    const len = certificates.length;
    let idx = selectedIndex;
    if (idx === -1) {
        idx = (direction > 0) ? 0 : len - 1;
    } else {
        idx = Math.max(0, Math.min(len - 1, idx + direction));
    }
    selectedIndex = idx;
    updateSelectedState();
    const card = document.querySelector(`.card-wrapper[data-index="${selectedIndex}"]`);
    if (card) card.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
}

function onSceneWheel(e) {
    if (currentView !== '3d') return;
    const now = Date.now();
    if (now - _lastWheelAt < _wheelDebounce) return;
    _lastWheelAt = now;
    if (e.deltaY > 5) { e.preventDefault(); navigate(1); }
    else if (e.deltaY < -5) { e.preventDefault(); navigate(-1); }
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
    const bios      = document.querySelectorAll('#about p:not(.about-greeting):not(.about-roles)');
    const cvBtn     = document.querySelector('.cv-download-btn');

    // Apply initial hidden state to all fade elements
    [greeting, roles, photo, ...bios, cvBtn].forEach(el => {
        if (el) el.classList.add('about-anim');
    });

    // Replace name content with typewriter structure
    if (nameEl) {
        nameEl.classList.add('about-anim');
        nameEl.innerHTML = '<span id="about-typed"></span><span class="about-cursor"></span>';
    }

    const typedEl  = document.getElementById('about-typed');
    const cursorEl = document.querySelector('.about-cursor');
    const fullName = 'Rohit Balaji';

    // Reduced motion: show everything at once, no typing, no staggered fades.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        if (typedEl) typedEl.textContent = fullName;
        if (cursorEl) cursorEl.style.display = 'none';
        [greeting, nameEl, roles, photo, ...bios, cvBtn].forEach(el => {
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
        { el: photo,    delay: 1150 },
        { el: bios[0],  delay: 1400 },
        { el: bios[1],  delay: 1650 },
        { el: cvBtn,    delay: 1900 },
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