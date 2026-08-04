/**
 * MobileMenu Component - Mobile hamburger menu
 */

const MobileMenuComponent = {
    template: `
        <div>
            <!-- Menu Button -->
            <button
                @click="toggleMenu"
                class="md:hidden p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Toggle menu"
            >
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>

            <!-- Overlay -->
            <div
                v-if="isOpen"
                class="fixed inset-0 bg-black/50 z-40 md:hidden"
                @click="closeMenu"
            ></div>

            <!-- Menu Panel -->
            <div
                class="fixed top-0 right-0 bottom-0 w-72 bg-white dark:bg-gray-900 z-50 transform transition-transform duration-300 ease-out md:hidden"
                :class="isOpen ? 'translate-x-0' : 'translate-x-full'"
            >
                <div class="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
                    <span class="font-bold text-gray-900 dark:text-white">Menu</span>
                    <button @click="closeMenu" class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                        <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <nav class="p-4 space-y-1">
                    <router-link
                        v-for="item in menuItems"
                        :key="item.path"
                        :to="item.path"
                        @click="closeMenu"
                        class="block px-4 py-2.5 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        active-class="bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 font-medium"
                    >
                        {{ item.label }}
                    </router-link>
                </nav>

                <div class="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 dark:border-gray-800">
                    <div class="flex items-center justify-between">
                        <span class="text-sm text-gray-500 dark:text-gray-400">Theme</span>
                        <app-theme-toggle :theme="theme" @toggle="$emit('toggle-theme')" />
                    </div>
                </div>
            </div>
        </div>
    `,
    props: {
        isOpen: { type: Boolean, default: false },
        theme: { type: String, default: 'light' },
    },
    emits: ['toggle', 'toggle-theme'],
    data() {
        return {
            menuItems: [
                { label: 'Home', path: '/' },
                { label: 'Docs', path: '/docs' },
                { label: 'Blog', path: '/blog' },
                { label: 'Community', path: '/community' },
                { label: 'Playground', path: '/playground' },
            ],
        };
    },
    methods: {
        toggleMenu() {
            this.$emit('toggle');
        },
        closeMenu() {
            if (this.isOpen) {
                this.$emit('toggle');
            }
        },
    },
    watch: {
        isOpen(val) {
            if (val) {
                document.body.classList.add('no-scroll');
            } else {
                document.body.classList.remove('no-scroll');
            }
        },
    },
};


export { MobileMenuComponent };
