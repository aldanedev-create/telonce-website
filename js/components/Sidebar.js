/**
 * Sidebar Component - Documentation sidebar navigation
 */

const SidebarComponent = {
    template: `
        <aside class="w-64 flex-shrink-0 border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 transition-theme overflow-hidden">
            <div class="sidebar-scroll p-4">
                <div class="space-y-6">
                    <div v-for="section in nav" :key="section.title">
                        <h3 class="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">
                            {{ section.title }}
                        </h3>
                        <ul class="space-y-1">
                            <li v-for="item in section.items" :key="item.slug">
                                <router-link
                                    :to="'/docs/' + section.slug + '/' + item.slug"
                                    class="block px-3 py-1.5 rounded-lg text-sm transition-colors"
                                    active-class="bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 font-medium"
                                    :class="{
                                        'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800': !isActive(section.slug, item.slug),
                                    }"
                                >
                                    {{ item.title }}
                                </router-link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </aside>
    `,
    data() {
        return {
            nav: [],
        };
    },
    mounted() {
        // Load nav data from the global docs data
        this.nav = window.__TELOCE_DOCS_NAV || this.getDefaultNav();
    },
    methods: {
        isActive(section, page) {
            return this.$route.params.section === section && this.$route.params.page === page;
        },
        getDefaultNav() {
            return [
                {
                    title: 'Getting Started',
                    slug: 'getting-started',
                    items: [
                        { title: 'Installation', slug: 'installation' },
                        { title: 'Quick Start', slug: 'quick-start' },
                        { title: 'First App', slug: 'first-app' },
                    ],
                },
                {
                    title: 'Guides',
                    slug: 'guides',
                    items: [
                        { title: 'Templates', slug: 'templates' },
                        { title: 'Reactivity', slug: 'reactivity' },
                        { title: 'Components', slug: 'components' },
                        { title: 'Events', slug: 'events' },
                        { title: 'State Management', slug: 'state' },
                        { title: 'SFC (.vel)', slug: 'sfc' },
                    ],
                },
                {
                    title: 'API Reference',
                    slug: 'api',
                    items: [
                        { title: 'Core API', slug: 'core' },
                        { title: 'Reactivity API', slug: 'reactivity-api' },
                        { title: 'Directives', slug: 'directives' },
                        { title: 'Filters', slug: 'filters' },
                        { title: 'CLI', slug: 'cli' },
                    ],
                },
                {
                    title: 'Debugger',
                    slug: 'debugger',
                    items: [
                        { title: 'Error Translation', slug: 'errors' },
                        { title: 'Performance', slug: 'performance' },
                        { title: 'Inspector', slug: 'inspector' },
                        { title: 'Troubleshooting', slug: 'troubleshooting' },
                    ],
                },
                {
                    title: 'Examples',
                    slug: 'examples',
                    items: [
                        { title: 'Counter', slug: 'counter' },
                        { title: 'Todo App', slug: 'todo' },
                        { title: 'API Fetch', slug: 'fetch' },
                        { title: 'Form Validation', slug: 'form' },
                    ],
                },
            ];
        },
    },
};