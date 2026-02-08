$(document).ready(function() {

    // --- Navbar Hamburger Logic ---
    $(".navTrigger").click(function () {
        $(this).toggleClass("active");
        console.log("Clicked menu");
        $("#mainListDiv").toggleClass("show_list");
        $("#mainListDiv").fadeIn();
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
    const themeToggle = $('#theme-toggle');
    const body = $('body');

    // Load saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        body.addClass('light-mode');
        themeToggle.removeClass('fa-moon').addClass('fa-sun');
    }

    themeToggle.click(function() {
        body.toggleClass('light-mode');
        $(this).addClass('rotate-icon');
        
        if (body.hasClass('light-mode')) {
            $(this).removeClass('fa-moon').addClass('fa-sun');
            localStorage.setItem('theme', 'light');
        } else {
            $(this).removeClass('fa-sun').addClass('fa-moon');
            localStorage.setItem('theme', 'dark');
        }
        
        setTimeout(() => {
            $(this).removeClass('rotate-icon');
        }, 500);
    });
});

/* ========================================
   CERTIFICATIONS COMPONENT JAVASCRIPT
   ======================================== */

// Certificate data
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
        credentialId: "ZHER1XBHIAJ3",
        credentialLink: "https://www.coursera.org/account/accomplishments/verify/ZHER1XBHJAJ3?utm_source=ios&utm_medium=certificate&utm_content=cert_image&utm_campaign=sharing_cta&utm_product=course",
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
const counterLabel = document.getElementById('counter-label');
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
(function createCertificatesModal(){
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
        modalOverlay.classList.add('hidden');
    });

    window.openCertificatesModal = function(imageList, title) {
        const body = modal.querySelector('.cert-modal-body');
        body.innerHTML = '';

        const heading = document.createElement('div');
        heading.style.fontWeight = '600';
        heading.style.fontSize = '1.6rem';
        heading.textContent = title || 'Certificates';
        body.appendChild(heading);

        let currentIndex = -1;

        function renderGrid() {
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

            imageList.forEach((src, idx) => {
                const imgWrap = document.createElement('div');
                imgWrap.style.border = '1px solid var(--card-border)';
                imgWrap.style.borderRadius = '8px';
                imgWrap.style.overflow = 'hidden';
                imgWrap.style.backgroundColor = 'var(--card-bg)';
                imgWrap.style.padding = '4px';

                const img = document.createElement('img');
                img.src = src;
                img.alt = 'certificate image';
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

            const spacer = document.createElement('div');
            spacer.style.flex = '1';

            controls.appendChild(backBtn);
            controls.appendChild(spacer);

            body.appendChild(controls);

            const imgContainer = document.createElement('div');
            imgContainer.style.width = '100%';
            imgContainer.style.display = 'flex';
            imgContainer.style.alignItems = 'center';
            imgContainer.style.justifyContent = 'center';
            imgContainer.style.position = 'relative';

            const img = document.createElement('img');
            img.src = imageList[currentIndex];
            img.alt = 'certificate image large';
            img.style.maxHeight = '70vh';
            img.style.width = 'auto';
            img.style.maxWidth = '100%';
            img.style.objectFit = 'contain';
            imgContainer.appendChild(img);

            const sidePrev = document.createElement('button');
            sidePrev.className = 'cert-modal-side cert-modal-side-prev';
            sidePrev.textContent = '❮';
            sidePrev.setAttribute('aria-label', 'Previous');
            sidePrev.style.left = '6px';
            sidePrev.style.position = 'absolute';
            sidePrev.style.display = (currentIndex > 0) ? 'flex' : 'none';
            sidePrev.addEventListener('click', () => { if (currentIndex > 0) showLargeImage(currentIndex - 1); });
            imgContainer.appendChild(sidePrev);

            const sideNext = document.createElement('button');
            sideNext.className = 'cert-modal-side cert-modal-side-next';
            sideNext.textContent = '❯';
            sideNext.setAttribute('aria-label', 'Next');
            sideNext.style.right = '6px';
            sideNext.style.position = 'absolute';
            sideNext.style.display = (currentIndex < imageList.length - 1) ? 'flex' : 'none';
            sideNext.addEventListener('click', () => { if (currentIndex < imageList.length - 1) showLargeImage(currentIndex + 1); });
            imgContainer.appendChild(sideNext);

            body.appendChild(imgContainer);
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
        } else {
            if (index < hoveredIndex) {
                card.classList.add('shift-left');
            } else {
                card.classList.add('shift-right');
            }
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

    if (selectedIndex === index) {
        selectedIndex = -1;
    } else {
        selectedIndex = index;
    }
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
    if (card) card.scrollIntoView({behavior: 'smooth', block: 'nearest', inline: 'center'});
}

function onSceneWheel(e) {
    if (currentView !== '3d') return;
    const now = Date.now();
    if (now - _lastWheelAt < _wheelDebounce) return;
    _lastWheelAt = now;

    if (e.deltaY > 5) {
        e.preventDefault();
        navigate(1);
    } else if (e.deltaY < -5) {
        e.preventDefault();
        navigate(-1);
    }
}

function onKeydown(e) {
    if (currentView !== '3d') return;
    if (e.key === 'ArrowLeft') {
        e.preventDefault();
        navigate(-1);
    } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        navigate(1);
    }
}

if (scene) {
    scene.tabIndex = 0;
    scene.addEventListener('wheel', onSceneWheel, { passive: false });
    window.addEventListener('keydown', onKeydown);

    document.addEventListener('click', (e) => {
        if (currentView !== '3d') return;
        if (selectedIndex === -1) return;

        // Only allow deselect via a normal left-click (button === 0).
        // Ignore right-clicks, middle-clicks, and other mouse buttons.
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

// Initialize the certifications component
if (scene) {
    // Ensure the page has the correct initial view class so
    // CSS for `.mode-3d` applies (gives the scene height, layout, etc.)
    if (!document.body.classList.contains('mode-3d') && !document.body.classList.contains('mode-grid')) {
        document.body.classList.add('mode-3d');
        // keep the JS view state in sync
        currentView = '3d';
    }

    renderCards();
}