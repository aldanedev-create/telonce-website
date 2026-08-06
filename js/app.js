/**
 * Teloce Website - Vue 3 Application
 */

const { createApp, ref, computed, watch, onMounted } = Vue;
const { createRouter, createWebHashHistory } = VueRouter;

// ─── SITE DATA (side-effect imports: these populate window.__TELOCE_*_DATA) ──

// Must run before any page mounts and reads window.__TELOCE_*_DATA, which is
// guaranteed here since ES module imports execute before this file's body.
import './data/blog.js';
import './data/examples.js';
import './data/nav.js';

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

import { HeaderComponent } from './components/Header.js';
import { FooterComponent } from './components/Footer.js';
import { SidebarComponent } from './components/Sidebar.js';
import { HeroComponent } from './components/Hero.js';
import { FeaturesComponent } from './components/Features.js';
import { FrameworkSupportComponent } from './components/FrameworkSupport.js';
import { TestimonialsComponent } from './components/Testimonials.js';
import { CTASectionComponent } from './components/CTASection.js';
import { DocsLayoutComponent } from './components/DocsLayout.js';
import { SearchComponent } from './components/Search.js';
import { CodeBlockComponent } from './components/CodeBlock.js';
import { ThemeToggleComponent } from './components/ThemeToggle.js';
import { MobileMenuComponent } from './components/MobileMenu.js';

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
app.component('code-block', CodeBlockComponent);
app.component('AppThemeToggle', ThemeToggleComponent);
app.component('AppMobileMenu', MobileMenuComponent);

// ─── MOUNT ──────────────────────────────────────────────────────────

app.use(router);
app.mount('#app');

// ─── EXPORTS ──────────────────────────────────────────────────────

export { app, router, appState, toggleTheme };