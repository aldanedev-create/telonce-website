/**
 * Features Component - Features grid on homepage
 */

const FeaturesComponent = {
    template: `
        <section class="py-16 md:py-24 bg-gray-50 dark:bg-gray-900/50 transition-theme">
            <div class="container-custom">
                <div class="text-center max-w-2xl mx-auto mb-12">
                    <h2 class="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-4">
                        Built for <span class="gradient-text">Python Developers</span>
                    </h2>
                    <p class="text-lg text-gray-600 dark:text-gray-300">
                        Everything you need to build reactive frontends without leaving your Python comfort zone.
                    </p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div v-for="feature in features" :key="feature.title" class="group p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:border-indigo-200 dark:hover:border-indigo-800">
                        <div class="w-12 h-12 rounded-xl bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform duration-300">
                            {{ feature.icon }}
                        </div>
                        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                            {{ feature.title }}
                        </h3>
                        <p class="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                            {{ feature.description }}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    `,
    data() {
        return {
            features: [
                {
                    icon: '🐍',
                    title: 'Python-First Philosophy',
                    description: 'Write JavaScript that feels like Python. Keep your backend in Python while building reactive frontends.',
                },
                {
                    icon: '🧠',
                    title: 'Human-Friendly Debugger',
                    description: 'No more cryptic errors. Get plain-English messages with actionable suggestions and fixes.',
                },
                {
                    icon: '📦',
                    title: 'CDN First',
                    description: 'Start with one script tag. No npm, no Node.js, no build tools required — just HTML + JavaScript.',
                },
                {
                    icon: '⚡',
                    title: 'Signals + Keyed Loops',
                    description: 'Fine-grained reactivity with Proxy-based signals and fast list rendering with keyed loops.',
                },
                {
                    icon: '🔗',
                    title: 'Jinja/JinjaX Compatible',
                    description: 'Works seamlessly with your existing Jinja templates. Pass Python data directly via |tojson.',
                },
                {
                    icon: '📚',
                    title: '14 npm Packages',
                    description: 'Modular architecture. Install only what you need — or use the umbrella package for everything.',
                },
            ],
        };
    },
};