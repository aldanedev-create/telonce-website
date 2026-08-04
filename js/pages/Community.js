/**
 * Community Page - Community hub
 */

const CommunityPage = {
    template: `
        <div class="flex flex-col min-h-screen">
            <!-- Header -->
            <app-header
                :theme="theme"
                @toggle-theme="$emit('toggle-theme')"
                @toggle-mobile="$emit('toggle-mobile')"
                @toggle-search="$emit('toggle-search')"
            />

            <main class="flex-1 pt-16 md:pt-20">
                <div class="container-custom py-12 md:py-16">
                    <div class="max-w-3xl mx-auto">
                        <!-- Header -->
                        <div class="text-center mb-12">
                            <div class="text-5xl mb-4">🌐</div>
                            <h1 class="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-4">
                                Community
                            </h1>
                            <p class="text-lg text-gray-600 dark:text-gray-300">
                                Join the Teloce community. We're building something amazing together.
                            </p>
                        </div>

                        <!-- Community Cards -->
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <a href="https://github.com/telocejs/teloce" target="_blank" rel="noopener" class="group p-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-700 hover:shadow-lg transition-all duration-300">
                                <div class="text-3xl mb-3">🐙</div>
                                <h3 class="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                                    GitHub
                                </h3>
                                <p class="text-gray-600 dark:text-gray-400 text-sm mt-1">
                                    Star, fork, and contribute to the project.
                                </p>
                                <div class="mt-3 text-sm text-indigo-600 dark:text-indigo-400 font-medium">
                                    Join on GitHub →
                                </div>
                            </a>

                            <a href="https://discord.gg/teloce" target="_blank" rel="noopener" class="group p-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-700 hover:shadow-lg transition-all duration-300">
                                <div class="text-3xl mb-3">💬</div>
                                <h3 class="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                                    Discord
                                </h3>
                                <p class="text-gray-600 dark:text-gray-400 text-sm mt-1">
                                    Chat with the team and community members.
                                </p>
                                <div class="mt-3 text-sm text-indigo-600 dark:text-indigo-400 font-medium">
                                    Join on Discord →
                                </div>
                            </a>

                            <a href="https://twitter.com/telocejs" target="_blank" rel="noopener" class="group p-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-700 hover:shadow-lg transition-all duration-300">
                                <div class="text-3xl mb-3">🐦</div>
                                <h3 class="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                                    Twitter / X
                                </h3>
                                <p class="text-gray-600 dark:text-gray-400 text-sm mt-1">
                                    Follow for updates and announcements.
                                </p>
                                <div class="mt-3 text-sm text-indigo-600 dark:text-indigo-400 font-medium">
                                    Follow →
                                </div>
                            </a>

                            <a href="https://github.com/telocejs/teloce/discussions" target="_blank" rel="noopener" class="group p-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-700 hover:shadow-lg transition-all duration-300">
                                <div class="text-3xl mb-3">💡</div>
                                <h3 class="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                                    GitHub Discussions
                                </h3>
                                <p class="text-gray-600 dark:text-gray-400 text-sm mt-1">
                                    Ask questions and share ideas.
                                </p>
                                <div class="mt-3 text-sm text-indigo-600 dark:text-indigo-400 font-medium">
                                    Join Discussions →
                                </div>
                            </a>
                        </div>

                        <!-- Contributing -->
                        <div class="mt-12 p-8 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-200 dark:border-gray-700">
                            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">
                                📋 Contributing Guide
                            </h3>
                            <p class="text-gray-600 dark:text-gray-400 mb-4">
                                Learn how to contribute to Teloce — code, docs, or ideas.
                            </p>
                            <a href="https://github.com/telocejs/teloce/blob/main/CONTRIBUTING.md" target="_blank" rel="noopener" class="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-medium hover:gap-3 transition-all">
                                Read the Contributing Guide →
                            </a>
                        </div>

                        <!-- Code of Conduct -->
                        <div class="mt-6 p-8 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-200 dark:border-gray-700">
                            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">
                                📜 Code of Conduct
                            </h3>
                            <p class="text-gray-600 dark:text-gray-400 mb-4">
                                Our commitment to a welcoming and inclusive community.
                            </p>
                            <a href="https://github.com/telocejs/teloce/blob/main/CODE_OF_CONDUCT.md" target="_blank" rel="noopener" class="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-medium hover:gap-3 transition-all">
                                Read the Code of Conduct →
                            </a>
                        </div>
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