/**
 * CTASection Component - Call to action section
 */

const CTASectionComponent = {
    template: `
        <section class="py-16 md:py-20 bg-indigo-600 dark:bg-indigo-900">
            <div class="container-custom">
                <div class="max-w-3xl mx-auto text-center">
                    <h2 class="text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-4">
                        Ready to build <span class="text-indigo-200">faster</span>?
                    </h2>
                    <p class="text-lg text-indigo-100 mb-8">
                        Join the Python developers building better frontends with Teloce.
                    </p>
                    <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <router-link to="/docs/getting-started/quick-start" class="inline-flex items-center gap-2 px-8 py-3 bg-white text-indigo-600 font-medium rounded-xl hover:bg-indigo-50 transition-all hover:scale-105 shadow-lg">
                            Get Started
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </router-link>
                        <a href="https://github.com/telocejs/teloce" target="_blank" rel="noopener" class="inline-flex items-center gap-2 px-8 py-3 bg-indigo-700 hover:bg-indigo-800 text-white font-medium rounded-xl transition-all hover:scale-105 border border-indigo-500">
                            ⭐ Star on GitHub
                        </a>
                    </div>
                </div>
            </div>
        </section>
    `,
};


export { CTASectionComponent };
