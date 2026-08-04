/**
 * Hero Component - Homepage hero section with CTA
 */

const HeroComponent = {
    template: `
        <section class="relative overflow-hidden py-20 md:py-32">
            <!-- Background Gradient -->
            <div class="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 -z-10"></div>
            
            <!-- Decorative Blobs -->
            <div class="absolute top-0 right-0 w-96 h-96 bg-indigo-200/30 dark:bg-indigo-500/10 rounded-full blur-3xl -z-10"></div>
            <div class="absolute bottom-0 left-0 w-96 h-96 bg-purple-200/30 dark:bg-purple-500/10 rounded-full blur-3xl -z-10"></div>
            
            <div class="container-custom relative z-10">
                <div class="max-w-3xl mx-auto text-center">
                    <!-- Badge -->
                    <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-sm font-medium mb-6">
                        <span class="relative flex h-2 w-2">
                            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                            <span class="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                        </span>
                        v1.0.0 Released
                    </div>

                    <!-- Heading -->
                    <h1 class="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
                        <span class="text-gray-900 dark:text-white">Template Engine for</span>
                        <span class="gradient-text block sm:inline">Python Web Developers</span>
                    </h1>

                    <!-- Description -->
                    <p class="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
                        Build reactive frontends for Flask, Django, and FastAPI without leaving Python.
                        Signals, keyed loops, and a human-friendly debugger — all in one.
                    </p>

                    <!-- CTA Buttons -->
                    <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <router-link to="/docs/getting-started/quick-start" class="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl transition-all hover:scale-105 shadow-lg shadow-indigo-600/25">
                            Get Started
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </router-link>
                        <a href="https://github.com/telocejs/teloce" target="_blank" rel="noopener" class="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 dark:bg-gray-800 hover:bg-gray-800 dark:hover:bg-gray-700 text-white font-medium rounded-xl transition-all hover:scale-105">
                            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.15 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.62.24 2.85.12 3.15.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                            </svg>
                            View on GitHub
                        </a>
                    </div>

                    <!-- Stats -->
                    <div class="flex flex-wrap items-center justify-center gap-8 mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
                        <div class="text-center">
                            <div class="text-2xl font-bold text-gray-900 dark:text-white">14</div>
                            <div class="text-sm text-gray-500 dark:text-gray-400">npm Packages</div>
                        </div>
                        <div class="text-center">
                            <div class="text-2xl font-bold text-gray-900 dark:text-white">1.2k+</div>
                            <div class="text-sm text-gray-500 dark:text-gray-400">GitHub Stars</div>
                        </div>
                        <div class="text-center">
                            <div class="text-2xl font-bold text-gray-900 dark:text-white">5</div>
                            <div class="text-sm text-gray-500 dark:text-gray-400">Python Frameworks</div>
                        </div>
                        <div class="text-center">
                            <div class="text-2xl font-bold text-gray-900 dark:text-white">15KB</div>
                            <div class="text-sm text-gray-500 dark:text-gray-400">Bundle Size (gzipped)</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    `,
};

export { HeroComponent };
