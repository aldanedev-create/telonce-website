/**
 * Header Component - Navigation header with logo, links, and mobile menu
 */

const HeaderComponent = {
    template: `
        <header class="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 transition-theme">
            <div class="container-custom">
                <div class="flex items-center justify-between h-16 md:h-20">
                    <!-- Logo -->
                    <router-link to="/" class="flex items-center gap-2.5 group" @click="closeMobile">
                        <img src="/assets/images/logo.svg" alt="Teloce" class="h-8 w-auto" />
                        <span class="text-xl font-extrabold tracking-tight gradient-text">Teloce</span>
                    </router-link>

                    <!-- Desktop Navigation -->
                    <nav class="hidden md:flex items-center gap-8 text-sm font-medium">
                        <router-link to="/docs" class="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors" active-class="text-indigo-600 dark:text-indigo-400">
                            Docs
                        </router-link>
                        <router-link to="/blog" class="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors" active-class="text-indigo-600 dark:text-indigo-400">
                            Blog
                        </router-link>
                        <router-link to="/examples" class="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors" active-class="text-indigo-600 dark:text-indigo-400">
                            Examples
                        </router-link>
                        <router-link to="/community" class="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors" active-class="text-indigo-600 dark:text-indigo-400">
                            Community
                        </router-link>
                        <router-link to="/playground" class="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors" active-class="text-indigo-600 dark:text-indigo-400">
                            Playground
                        </router-link>
                    </nav>

                    <!-- Right Actions -->
                    <div class="flex items-center gap-2">
                        <!-- Search Toggle -->
                        <button @click="$emit('toggle-search')" class="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" aria-label="Search">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </button>

                        <!-- GitHub Link -->
                        <a href="https://github.com/telocejs/teloce" target="_blank" rel="noopener noreferrer" class="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" aria-label="GitHub">
                            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.15 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.62.24 2.85.12 3.15.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                            </svg>
                        </a>

                        <!-- Theme Toggle -->
                        <button @click="$emit('toggle-theme')" class="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" aria-label="Toggle theme">
                            <span v-if="theme === 'dark'">☀️</span>
                            <span v-else>🌙</span>
                        </button>

                        <!-- Mobile Menu Toggle -->
                        <button @click="$emit('toggle-mobile')" class="md:hidden p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" aria-label="Toggle menu">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    `,
    props: {
        theme: { type: String, default: 'light' },
    },
    emits: ['toggle-theme', 'toggle-mobile', 'toggle-search'],
    methods: {
        closeMobile() {
            this.$emit('toggle-mobile', false);
        },
    },
};

export { HeaderComponent };
