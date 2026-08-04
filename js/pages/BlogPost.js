/**
 * Blog Post Page - Individual blog post
 */

const BlogPostPage = {
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
                <div class="container-custom py-12 md:py-16 max-w-3xl mx-auto">
                    <!-- Back Link -->
                    <router-link to="/blog" class="inline-flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors mb-6">
                        <span>←</span> Back to Blog
                    </router-link>

                    <!-- Loading -->
                    <div v-if="loading" class="flex items-center justify-center py-16">
                        <div class="inline-block w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                        <span class="ml-3 text-gray-500 dark:text-gray-400">Loading...</span>
                    </div>

                    <!-- Post -->
                    <div v-else-if="post">
                        <div class="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
                            <span>{{ post.date }}</span>
                            <span>•</span>
                            <span class="px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-700 text-xs">
                                {{ post.category }}
                            </span>
                            <span>•</span>
                            <span>{{ post.readTime }}</span>
                        </div>
                        <h1 class="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-6">
                            {{ post.title }}
                        </h1>
                        <div class="prose prose-lg dark:prose-invert max-w-none" v-html="post.content"></div>

                        <!-- Share -->
                        <div class="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
                            <p class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Share this post:</p>
                            <div class="flex gap-3">
                                <a :href="'https://twitter.com/intent/tweet?text=' + encodeURIComponent(post.title) + '&url=' + encodeURIComponent(window.location.href)" target="_blank" rel="noopener" class="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-indigo-100 dark:hover:bg-indigo-900/30 transition-colors">
                                    🐦
                                </a>
                                <a :href="'https://www.linkedin.com/sharing/share-offsite/?url=' + encodeURIComponent(window.location.href)" target="_blank" rel="noopener" class="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-indigo-100 dark:hover:bg-indigo-900/30 transition-colors">
                                    🔗
                                </a>
                                <a href="https://github.com/telocejs/teloce" target="_blank" rel="noopener" class="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-indigo-100 dark:hover:bg-indigo-900/30 transition-colors">
                                    ⭐
                                </a>
                            </div>
                        </div>
                    </div>

                    <!-- Not Found -->
                    <div v-else class="text-center py-16">
                        <div class="text-6xl mb-4">📝</div>
                        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">Post Not Found</h2>
                        <p class="text-gray-600 dark:text-gray-400">The blog post you're looking for doesn't exist.</p>
                        <router-link to="/blog" class="inline-block mt-6 px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors">
                            View All Posts
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
    data() {
        return {
            post: null,
            loading: false,
        };
    },
    watch: {
        '$route.params.slug': {
            handler: function() {
                this.loadPost();
            },
            immediate: true,
        },
    },
    methods: {
        loadPost: function() {
            var slug = this.$route.params.slug;
            if (!slug) {
                return;
            }

            this.loading = true;

            var blogData = window.__TELOCE_BLOG_DATA || [];
            var found = null;
            for (var i = 0; i < blogData.length; i++) {
                if (blogData[i].slug === slug) {
                    found = blogData[i];
                    break;
                }
            }
            this.post = found;

            this.loading = false;

            if (this.post) {
                document.title = this.post.title + ' - Teloce Blog';
            } else {
                document.title = 'Post Not Found - Teloce Blog';
            }
        },
    },
};