(function () {
    const headerHost = document.querySelector('[data-site-header]');
    if (!headerHost) {
        return;
    }

    const path = window.location.pathname.toLowerCase();
    const isStyleguidePage = path.endsWith('/styleguide.html') || path.endsWith('styleguide.html');
    const anchorPrefix = isStyleguidePage ? 'index.html' : '';
    const styleguideCurrent = isStyleguidePage ? ' aria-current="page"' : '';

    headerHost.innerHTML = `
        <a href="${anchorPrefix}#hero" class="site-logo">BRUTALISM DEMO</a>
        <button type="button" class="nav-toggle" aria-expanded="false" aria-controls="primary-navigation">
            <span class="sr-only">Toggle navigation</span>
            <span class="nav-toggle__bar" aria-hidden="true"></span>
            <span class="nav-toggle__bar" aria-hidden="true"></span>
            <span class="nav-toggle__bar" aria-hidden="true"></span>
        </button>
        <nav class="nav" id="primary-navigation">
            <a href="${anchorPrefix}#hero">HOME</a>
            <a href="${anchorPrefix}#about">ABOUT</a>
            <a href="${anchorPrefix}#manifesto">MANIFESTO</a>
            <a href="${anchorPrefix}#process">PROCESS</a>
            <a href="${anchorPrefix}#products">WORK</a>
            <a href="${anchorPrefix}#contact">CONTACT</a>
            <a href="styleguide.html"${styleguideCurrent}>STYLEGUIDE</a>
        </nav>
        <menu class="theme-toggle" aria-label="Theme toggle">
            <button type="button" data-theme="light">LIGHT</button>
            <button type="button" data-theme="dark">DARK</button>
        </menu>
    `;
})();

(function () {
    const THEME_STORAGE_KEY = 'theme';
    const root = document.documentElement;
    const toggleButtons = document.querySelectorAll('.theme-toggle [data-theme]');

    if (!toggleButtons.length) {
        return;
    }

    function applyTheme(theme) {
        root.setAttribute('data-theme', theme);
        toggleButtons.forEach((button) => {
            const isActive = button.dataset.theme === theme;
            button.classList.toggle('is-active', isActive);
            button.setAttribute('aria-pressed', String(isActive));
        });
    }

    let storedTheme = null;
    try {
        storedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    } catch (error) {
        storedTheme = null;
    }

    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = storedTheme || (prefersDark ? 'dark' : 'light');
    applyTheme(initialTheme);

    toggleButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const theme = button.dataset.theme;
            applyTheme(theme);
            try {
                localStorage.setItem(THEME_STORAGE_KEY, theme);
            } catch (error) {
                /* localStorage might be unavailable (e.g. privacy mode). */
            }
        });
    });
})();

(function () {
    const nav = document.querySelector('.nav');
    const toggle = document.querySelector('.nav-toggle');

    if (!nav || !toggle) {
        return;
    }

    function closeNav() {
        toggle.setAttribute('aria-expanded', 'false');
        nav.classList.remove('is-open');
    }

    toggle.addEventListener('click', () => {
        const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
        const nextState = !isExpanded;
        toggle.setAttribute('aria-expanded', String(nextState));
        nav.classList.toggle('is-open', nextState);
    });

    nav.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
            if (window.matchMedia('(max-width: 1024px)').matches) {
                closeNav();
            }
        });
    });

    const mq = window.matchMedia('(min-width: 1025px)');
    if (typeof mq.addEventListener === 'function') {
        mq.addEventListener('change', closeNav);
    } else if (typeof mq.addListener === 'function') {
        mq.addListener(closeNav);
    }

    closeNav();
})();