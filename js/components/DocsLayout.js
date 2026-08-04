/**
 * DocsLayout Component - Documentation page layout wrapper
 */

const DocsLayoutComponent = {
    template: `
        <div class="flex flex-col min-h-screen pt-16 md:pt-20">
            <div class="flex flex-1">
                <!-- Sidebar -->
                <app-sidebar v-if="!isMobile" />

                <!-- Mobile Overlay -->
                <div class="fixed inset-0 bg-black/50 z-40 md:hidden" v-if="mobileMenuOpen" @click="$emit('close-mobile')"></div>

                <!-- Mobile Sidebar -->
                <div class="fixed top-0 left-0 bottom-0 w-72 bg-white dark:bg-gray-900 z-50 transform transition-transform duration-300 md:hidden" :class="mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'">
                    <div class="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
                        <span class="font-bold text-gray-900 dark:text-white">Documentation</span>
                        <button @click="$emit('close-mobile')" class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                            <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <div class="overflow-y-auto h-[calc(100%-4rem)] p-4">
                        <app-sidebar />
                    </div>
                </div>

                <!-- Main Content -->
                <main class="flex-1 min-w-0 px-4 md:px-8 py-8 max-w-4xl mx-auto w-full">
                    <div class="docs-content">
                        <slot></slot>
                    </div>
                </main>
            </div>
            <app-footer />
        </div>
    `,
    props: {
        mobileMenuOpen: { type: Boolean, default: false },
        isMobile: { type: Boolean, default: false },
    },
    emits: ['close-mobile'],
};

export { DocsLayoutComponent };
