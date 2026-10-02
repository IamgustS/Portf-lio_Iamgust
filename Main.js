document.addEventListener('DOMContentLoaded', () => {
    const root = document.documentElement;
    const ambientGradient = document.getElementById('ambient-gradient');
    const themeButton = document.getElementById('theme-toggle');
    const themeIcon = themeButton.querySelector('i');
    const contactDialog = document.getElementById('contact-dialog');
    const contactCloseButton = contactDialog.querySelector('.dialog-close');
    const projectDialog = document.getElementById('project-dialog');
    const projectDialogTitle = document.getElementById('project-dialog-title');
    const projectDialogCategory = document.getElementById('project-dialog-category');
    const projectDialogDescription = document.getElementById('project-dialog-description');
    const projectDialogTags = document.getElementById('project-dialog-tags');
    const projectCards = [...document.querySelectorAll('.project-card')];
    const projectSearch = document.getElementById('project-search');
    const projectSearchButton = document.getElementById('project-search-submit');
    const searchEmptyState = document.getElementById('project-search-empty');
    const dockLinks = [...document.querySelectorAll('.dock-link')];
    const navigationLinks = [...document.querySelectorAll('.dock-link[href^="#"], .site-nav a[href^="#"]')];
    const sections = [...document.querySelectorAll('main section[id]')];

    function normalizeSearchText(value) {
        return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
    }

    const sectionSearchTargets = new Map([
        ['inicio', 'inicio'],
        ['home', 'inicio'],
        ['apresentacao', 'inicio'],
        ['trabalho', 'trabalho'],
        ['atuacao', 'trabalho'],
        ['projeto', 'projetos'],
        ['projetos', 'projetos'],
        ['educacao', 'educacao'],
        ['formacao', 'educacao'],
        ['cursos', 'educacao'],
        ['certificacoes', 'educacao'],
        ['contato', 'contato']
    ]);

    function getSectionSearchTarget(query) {
        const sectionId = sectionSearchTargets.get(query);
        return sectionId ? document.getElementById(sectionId) : null;
    }

    function updateProjectResults() {
        const query = normalizeSearchText(projectSearch.value.trim());
        if (getSectionSearchTarget(query)) {
            projectCards.forEach((card) => { card.hidden = false; });
            searchEmptyState.hidden = true;
            return;
        }

        let visibleProjects = 0;

        projectCards.forEach((card) => {
            const details = card.querySelector('.project-details').textContent;
            const description = card.dataset.projectDescription || '';
            const matches = normalizeSearchText(`${details} ${description}`).includes(query);
            card.hidden = !matches;
            if (matches) visibleProjects += 1;
        });

        searchEmptyState.hidden = visibleProjects > 0;
    }

    function runSearch() {
        const query = normalizeSearchText(projectSearch.value.trim());
        if (!query) return;
        (getSectionSearchTarget(query) || document.getElementById('projetos')).scrollIntoView();
    }

    projectSearch.addEventListener('input', updateProjectResults);
    projectSearch.addEventListener('keydown', (event) => {
        if (event.key !== 'Enter') return;
        event.preventDefault();
        runSearch();
    });
    projectSearchButton.addEventListener('click', runSearch);

    dockLinks.forEach((link) => {
        link.addEventListener('pointerenter', () => link.classList.add('is-expanded'));
        link.addEventListener('pointerleave', () => link.classList.remove('is-expanded'));
        link.addEventListener('focus', () => link.classList.add('is-expanded'));
        link.addEventListener('blur', () => link.classList.remove('is-expanded'));
    });

    function moveGlow(event) {
        const movement = Math.hypot(event.movementX || 0, event.movementY || 0);
        const scale = 1 + Math.min(movement / 1000, .16);
        ambientGradient.style.setProperty('--glow-x', `${event.clientX}px`);
        ambientGradient.style.setProperty('--glow-y', `${event.clientY}px`);
        ambientGradient.style.setProperty('--glow-scale', scale.toFixed(2));
        ambientGradient.classList.add('is-active');
    }

    window.addEventListener('pointermove', moveGlow, { passive: true });
    window.addEventListener('pointerdown', (event) => {
        moveGlow(event);
        ambientGradient.classList.add('is-pressed');
    }, { passive: true });
    window.addEventListener('pointerup', () => ambientGradient.classList.remove('is-pressed'), { passive: true });
    window.addEventListener('pointercancel', () => ambientGradient.classList.remove('is-pressed'), { passive: true });
    window.addEventListener('pointerout', (event) => {
        if (!event.relatedTarget) ambientGradient.classList.remove('is-active');
    }, { passive: true });
    function setTheme(theme) {
        root.dataset.theme = theme;
        themeIcon.className = theme === 'dark' ? 'fa-regular fa-moon' : 'fa-regular fa-sun';
        themeButton.setAttribute('aria-label', theme === 'dark' ? 'Ativar tema claro' : 'Ativar tema escuro');
        try {
            localStorage.setItem('portfolio-theme', theme);
        } catch {
            // The visual theme still works when browser storage is unavailable.
        }
    }

    let savedTheme = 'dark';
    try {
        const storedTheme = localStorage.getItem('portfolio-theme');
        if (storedTheme === 'dark' || storedTheme === 'light') savedTheme = storedTheme;
    } catch {
        savedTheme = 'dark';
    }
    setTheme(savedTheme);

    themeButton.addEventListener('click', () => {
        setTheme(root.dataset.theme === 'dark' ? 'light' : 'dark');
    });

    document.querySelectorAll('a[href="#contato"]').forEach((link) => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            contactDialog.showModal();
        });
    });
    contactCloseButton.addEventListener('click', () => contactDialog.close());
    contactDialog.addEventListener('click', (event) => {
        if (event.target === contactDialog) contactDialog.close();
    });

    function showProjectDetails(card) {
        const details = card.querySelector('.project-details');
        projectDialogTitle.textContent = details.querySelector('h3').textContent;
        projectDialogCategory.textContent = details.querySelector('.project-meta span').textContent;
        projectDialogDescription.textContent = card.dataset.projectDescription || details.querySelector('p').textContent;
        projectDialogTags.replaceChildren(...[...details.querySelectorAll('.tag-list span')].map((tag) => {
            const item = document.createElement('span');
            item.textContent = tag.textContent;
            return item;
        }));
        projectDialog.showModal();
    }

    projectCards.forEach((card) => {
        card.addEventListener('click', () => showProjectDetails(card));
        card.addEventListener('keydown', (event) => {
            if (event.key !== 'Enter' && event.key !== ' ') return;
            event.preventDefault();
            showProjectDetails(card);
        });
    });
    document.getElementById('project-dialog-close').addEventListener('click', () => projectDialog.close());
    projectDialog.addEventListener('click', (event) => {
        if (event.target === projectDialog) projectDialog.close();
    });

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            navigationLinks.forEach((link) => {
                link.classList.toggle('is-active', link.hash === `#${entry.target.id}`);
            });
        });
    }, { rootMargin: '-30% 0px -55% 0px' });

    sections.forEach((section) => sectionObserver.observe(section));

    const revealItems = document.querySelectorAll('.section-index, .work-content h2, .work-content p, .section-heading, .project-card, .education-content, .contact-content, .contact-side');
    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            });
        }, { threshold: .12 });
        revealItems.forEach((item) => {
            item.classList.add('scroll-reveal');
            revealObserver.observe(item);
        });
    }
});