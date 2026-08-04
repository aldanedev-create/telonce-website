/**
 * Teloce Website - Vue 3 Application
 * 
 * SPA with Vue 3 CDN, Tailwind CSS, and hash-based routing
 */

const { createApp, ref, computed, watch, onMounted, createRouter, createWebHashHistory } = Vue;

// Data for docs
import './data/docs.js';

// ─── Router ──────────────────────────────────────────────────────

const routes = [
    { path: '/', component: HomePage },
    { path: '/docs', component: DocsPage },
    { path: '/docs/:section/:page', component: DocsPage },
    { path: '/blog', component: BlogPage },
    { path: '/blog/:slug', component: BlogPostPage },
    { path: '/community', component: CommunityPage },
    { path: '/community/:page', component: CommunityPage },
    { path: '/examples', component: ExamplesPage },  // ← NEW ROUTE
    { path: '/playground', component: PlaygroundPage },
    { path: '/:pathMatch(.*)*', component: NotFoundPage },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        }
        return { top: 0 };
    },
});

// ─── Global State ──────────────────────────────────────────────

const appState = {
    theme: ref('light'),
    sidebarOpen: ref(false),
    mobileMenuOpen: ref(false),
    searchQuery: ref(''),
    searchResults: ref([]),
    isSearching: ref(false),
};

// ─── Theme Management ──────────────────────────────────────────

function initTheme() {
    const saved = localStorage.getItem('teloce-theme');
    if (saved) {
        appState.theme.value = saved;
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        appState.theme.value = 'dark';
    }
    applyTheme(appState.theme.value);
}

function applyTheme(theme) {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.body.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('teloce-theme', theme);
}

function toggleTheme() {
    const newTheme = appState.theme.value === 'light' ? 'dark' : 'light';
    appState.theme.value = newTheme;
    applyTheme(newTheme);
}

// ─── Watch Theme ──────────────────────────────────────────────

watch(() => appState.theme.value, (newTheme) => {
    applyTheme(newTheme);
});

// ─── App ────────────────────────────────────────────────────────

const app = createApp({
    setup() {
        onMounted(() => {
            initTheme();
        });

        return {
            theme: appState.theme,
            toggleTheme,
            sidebarOpen: appState.sidebarOpen,
            mobileMenuOpen: appState.mobileMenuOpen,
            searchQuery: appState.searchQuery,
            searchResults: appState.searchResults,
            isSearching: appState.isSearching,
        };
    },
});

// ─── Global Components ─────────────────────────────────────────

app.component('AppHeader', HeaderComponent);
app.component('AppFooter', FooterComponent);
app.component('AppSidebar', SidebarComponent);
app.component('AppHero', HeroComponent);
app.component('AppFeatures', FeaturesComponent);
app.component('AppFrameworkSupport', FrameworkSupportComponent);
app.component('AppTestimonials', TestimonialsComponent);
app.component('AppCTASection', CTASectionComponent);
app.component('AppDocsLayout', DocsLayoutComponent);
app.component('AppSearch', SearchComponent);
app.component('AppCodeBlock', CodeBlockComponent);
app.component('AppThemeToggle', ThemeToggleComponent);
app.component('AppMobileMenu', MobileMenuComponent);

// ─── Mount ──────────────────────────────────────────────────────

app.use(router);
app.mount('#app');

// ─── Exports ────────────────────────────────────────────────────

export { app, router, appState, toggleTheme };