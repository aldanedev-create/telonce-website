/**
 * Blog Page - Blog listing
 */

const BlogPage = {
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
                    <!-- Header -->
                    <div class="max-w-3xl mb-12">
                        <h1 class="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-4">
                            <span class="gradient-text">Blog</span>
                        </h1>
                        <p class="text-lg text-gray-600 dark:text-gray-300">
                            News, updates, and tutorials from the Teloce team.
                        </p>
                    </div>

                    <!-- Category Filter -->
                    <div class="flex flex-wrap gap-2 mb-8">
                        <button
                            v-for="cat in categories"
                            :key="cat"
                            @click="filterCategory = cat"
                            class="px-4 py-1.5 rounded-full text-sm font-medium transition-all"
                            :class="filterCategory === cat
                                ? 'bg-indigo-600 text-white'
                                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                            "
                        >
                            {{ cat === 'all' ? 'All' : cat }}
                        </button>
                    </div>

                    <!-- Blog Posts -->
                    <div class="space-y-8">
                        <div
                            v-for="post in filteredPosts"
                            :key="post.slug"
                            class="group p-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 hover:border-indigo-200 dark:hover:border-indigo-800 hover:shadow-lg transition-all duration-300"
                        >
                            <div class="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
                                <span>{{ post.date }}</span>
                                <span>•</span>
                                <span class="px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-700 text-xs">
                                    {{ post.category }}
                                </span>
                                <span>•</span>
                                <span>{{ post.readTime }}</span>
                            </div>
                            <router-link :to="'/blog/' + post.slug" class="block">
                                <h2 class="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                                    {{ post.title }}
                                </h2>
                            </router-link>
                            <p class="text-gray-600 dark:text-gray-400 mt-2">{{ post.excerpt }}</p>
                            <router-link
                                :to="'/blog/' + post.slug"
                                class="inline-flex items-center gap-1 text-indigo-600 dark:text-indigo-400 font-medium mt-4 hover:gap-2 transition-all"
                            >
                                Read More
                                <span>→</span>
                            </router-link>
                        </div>
                    </div>

                    <!-- No Posts -->
                    <div v-if="filteredPosts.length === 0" class="text-center py-12">
                        <p class="text-gray-500 dark:text-gray-400">No posts found in this category.</p>
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
            posts: [],
            filterCategory: 'all',
            categories: ['all'],
        };
    },
    computed: {
        filteredPosts() {
            if (this.filterCategory === 'all') {
                return this.posts;
            }
            return this.posts.filter(function(p) {
                return p.category === this.filterCategory;
            }.bind(this));
        },
    },
    mounted() {
        this.loadPosts();
    },
    methods: {
        loadPosts() {
            var blogData = window.__TELOCE_BLOG_DATA || this.getDefaultPosts();
            this.posts = blogData;

            var cats = new Set();
            for (var i = 0; i < this.posts.length; i++) {
                cats.add(this.posts[i].category);
            }
            this.categories = ['all'].concat(Array.from(cats));
        },
        getDefaultPosts() {
            return [
                {
                    slug: 'introducing-teloce',
                    title: 'Introducing Teloce',
                    excerpt: 'A new way to build frontends for Python applications.',
                    date: 'January 1, 2024',
                    category: 'Announcements',
                    readTime: '5 min read',
                },
                {
                    slug: 'teloce-v1-0-0-released',
                    title: 'Teloce v1.0.0 Released',
                    excerpt: 'We are excited to announce the first stable release of Teloce.',
                    date: 'January 15, 2024',
                    category: 'Announcements',
                    readTime: '3 min read',
                },
                {
                    slug: 'building-flask-app-with-teloce',
                    title: 'Building a Flask App with Teloce',
                    excerpt: 'Step-by-step guide to building a full-stack application.',
                    date: 'January 20, 2024',
                    category: 'Tutorials',
                    readTime: '8 min read',
                },
            ];
        },
    },
};

export { BlogPage };
