/**
 * NotFound Page - 404 error page
 */

const NotFoundPage = {
    template: `
        <div class="flex flex-col min-h-screen">
            <!-- Header -->
            <app-header
                :theme="theme"
                @toggle-theme="$emit('toggle-theme')"
                @toggle-mobile="$emit('toggle-mobile')"
                @toggle-search="$emit('toggle-search')"
            />

            <main class="flex-1 flex items-center justify-center pt-16 md:pt-20">
                <div class="container-custom py-12 text-center">
                    <div class="text-8xl mb-6">⚡</div>
                    <h1 class="text-6xl md:text-8xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-4">
                        404
                    </h1>
                    <h2 class="text-2xl md:text-3xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
                        Page Not Found
                    </h2>
                    <p class="text-gray-500 dark:text-gray-400 max-w-md mx-auto mb-8">
                        The page you're looking for doesn't exist or has been moved.
                    </p>
                    <div class="flex flex-wrap items-center justify-center gap-4">
                        <router-link to="/" class="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl transition-colors">
                            🏠 Go Home
                        </router-link>
                        <router-link to="/docs" class="px-6 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-medium rounded-xl transition-colors">
                            📚 Documentation
                        </router-link>
                    </div>
                </div>
            </main>

            <app-footer />
        </div>
    `,
    props: {
        theme: { type: String, default: 'light' },
    },
    emits: ['toggle-theme', 'toggle-mobile', 'toggle-search'],
};

export { NotFoundPage };
