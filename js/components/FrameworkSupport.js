/**
 * FrameworkSupport Component - Framework logos on homepage
 */

const FrameworkSupportComponent = {
    template: `
        <section class="py-16 md:py-20 bg-white dark:bg-gray-900 transition-theme">
            <div class="container-custom">
                <div class="text-center max-w-2xl mx-auto mb-12">
                    <h2 class="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-4">
                        Works with <span class="gradient-text">Your Favorite Frameworks</span>
                    </h2>
                    <p class="text-lg text-gray-600 dark:text-gray-300">
                        Teloce integrates seamlessly with all major Python web frameworks.
                    </p>
                </div>

                <div class="flex flex-wrap items-center justify-center gap-8 md:gap-12">
                    <div v-for="framework in frameworks" :key="framework.name" class="flex flex-col items-center gap-2">
                        <div class="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gray-50 dark:bg-gray-800 flex items-center justify-center p-3 border border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-700 transition-all hover:scale-105 hover:shadow-lg">
                            <img :src="framework.logo" :alt="framework.name" class="w-full h-full object-contain" />
                        </div>
                        <span class="text-sm font-medium text-gray-700 dark:text-gray-300">{{ framework.name }}</span>
                    </div>
                </div>

                <div class="mt-8 text-center">
                    <p class="text-sm text-gray-500 dark:text-gray-400">
                        + Quart, Flaxon, and any Python framework with Jinja support
                    </p>
                </div>
            </div>
        </section>
    `,
    data() {
        return {
            frameworks: [
                { name: 'Flask', logo: '/assets/images/flask.png' },
                { name: 'Django', logo: '/assets/images/django.jpg' },
                { name: 'FastAPI', logo: '/assets/images/fastapi.png' },
                { name: 'Quart', logo: '/assets/images/Quart.png' },
                { name: 'Flaxon', logo: '/assets/images/flaxon.png' },
            ],
        };
    },
};