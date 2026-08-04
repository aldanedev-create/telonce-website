/**
 * Teloce Website - Vue 3 Application
 */

const { createApp, ref, computed, watch, onMounted, createRouter, createWebHashHistory } = Vue;

// ─── IMPORT ALL PAGES ──────────────────────────────────────────────

// You need to import all page components
import { HomePage } from './pages/Home.js';
import { DocsPage } from './pages/Docs.js';
import { BlogPage } from './pages/Blog.js';
import { BlogPostPage } from './pages/BlogPost.js';
import { CommunityPage } from './pages/Community.js';
import { ExamplesPage } from './pages/Examples.js';
import { PlaygroundPage } from './pages/Playground.js';
import { NotFoundPage } from './pages/NotFound.js';

// ─── IMPORT ALL COMPONENTS ──────────────────────────────────────────

// Import components (if you're using them in app.js)
// Note: Components are registered globally, not imported here

// ─── ROUTER ──────────────────────────────────────────────────────────

const routes = [
    { path: '/', component: HomePage },
    { path: '/docs', component: DocsPage },
    { path: '/docs/:section/:page', component: DocsPage },
    { path: '/blog', component: BlogPage },
    { path: '/blog/:slug', component: BlogPostPage },
    { path: '/community', component: CommunityPage },
    { path: '/community/:page', component: CommunityPage },
    { path: '/examples', component: ExamplesPage },
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

// ─── GLOBAL STATE ──────────────────────────────────────────────────

const appState = {
    theme: ref('light'),
    sidebarOpen: ref(false),
    mobileMenuOpen: ref(false),
    searchQuery: ref(''),
    searchResults: ref([]),
    isSearching: ref(false),
};

// ─── THEME MANAGEMENT ──────────────────────────────────────────────

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

watch(() => appState.theme.value, (newTheme) => {
    applyTheme(newTheme);
});

// ─── APP ────────────────────────────────────────────────────────────

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

// ─── GLOBAL COMPONENTS ─────────────────────────────────────────────

// Your components need to be defined BEFORE registering them
// Make sure each component file is loaded correctly

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

// ─── MOUNT ──────────────────────────────────────────────────────────

app.use(router);
app.mount('#app');

// ─── EXPORTS ──────────────────────────────────────────────────────

export { app, router, appState, toggleTheme };