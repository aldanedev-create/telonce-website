/**
 * Testimonials Component - User quotes and testimonials
 */

const TestimonialsComponent = {
    template: `
        <section class="py-16 md:py-20 bg-gray-50 dark:bg-gray-900/50 transition-theme">
            <div class="container-custom">
                <div class="text-center max-w-2xl mx-auto mb-12">
                    <h2 class="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-4">
                        Loved by <span class="gradient-text">Python Developers</span>
                    </h2>
                    <p class="text-lg text-gray-600 dark:text-gray-300">
                        Here's what the community is saying about Teloce.
                    </p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div v-for="testimonial in testimonials" :key="testimonial.author" class="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-shadow">
                        <div class="flex items-center gap-1 text-yellow-400 text-sm mb-3">
                            <span v-for="i in 5" :key="i">⭐</span>
                        </div>
                        <p class="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-4">
                            "{{ testimonial.quote }}"
                        </p>
                        <div class="flex items-center gap-3">
                            <div class="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-semibold text-sm">
                                {{ testimonial.avatar }}
                            </div>
                            <div>
                                <div class="font-semibold text-gray-900 dark:text-white text-sm">
                                    {{ testimonial.author }}
                                </div>
                                <div class="text-xs text-gray-500 dark:text-gray-400">
                                    {{ testimonial.role }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    `,
    data() {
        return {
            testimonials: [
                {
                    quote: 'Teloce finally makes frontend development in Flask enjoyable. I can build reactive UIs without leaving Python.',
                    author: 'Sarah Chen',
                    role: 'Senior Python Developer',
                    avatar: 'SC',
                },
                {
                    quote: 'The debugger is a game-changer. No more cryptic JavaScript errors. I can actually understand what went wrong.',
                    author: 'Marcus Johnson',
                    role: 'Full-Stack Developer',
                    avatar: 'MJ',
                },
                {
                    quote: 'I love that I can start with just a CDN script. No build tools, no complex setup — it just works.',
                    author: 'Priya Patel',
                    role: 'Django Developer',
                    avatar: 'PP',
                },
            ],
        };
    },
};

export { TestimonialsComponent };
