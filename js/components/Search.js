/**
 * Search Component - Search functionality for docs
 * Uses SearchEngine utility for relevance-based searching
 */

import { SearchEngine } from '../utils/search.js';

const SearchComponent = {
    template: `
        <div class="relative">
            <!-- Search Input -->
            <div class="relative">
                <input
                    type="text"
                    v-model="query"
                    @input="handleSearch"
                    @keydown.esc="closeSearch"
                    @focus="handleFocus"
                    placeholder="Search documentation..."
                    class="w-full px-4 py-2.5 pl-10 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                />
                <svg class="absolute left-3 top-3 w-5 h-5 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <button
                    v-if="query"
                    @click="clearSearch"
                    class="absolute right-3 top-2.5 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                    <svg class="w-4 h-4 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            <!-- Search Results -->
            <div v-if="showResults && results.length > 0" class="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 max-h-96 overflow-y-auto z-50">
                <div class="p-2 text-xs text-gray-400 dark:text-gray-500 border-b border-gray-100 dark:border-gray-700">
                    {{ results.length }} result{{ results.length > 1 ? 's' : '' }}
                </div>
                <div v-for="result in results" :key="result.path" class="border-b border-gray-100 dark:border-gray-700 last:border-0">
                    <router-link
                        :to="result.path"
                        @click="closeSearch"
                        class="block px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                        <div class="font-medium text-gray-900 dark:text-white text-sm">
                            {{ highlightText(result.title) }}
                        </div>
                        <div class="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                            {{ result.section }}
                        </div>
                        <div v-if="result.excerpt" class="text-sm text-gray-600 dark:text-gray-300 mt-1 line-clamp-2" v-html="highlightText(result.excerpt)">
                        </div>
                    </router-link>
                </div>
            </div>

            <!-- No Results -->
            <div v-if="showResults && query && results.length === 0 && !isSearching" class="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 p-6 text-center z-50">
                <p class="text-gray-500 dark:text-gray-400">No results found for "<span class="font-medium text-gray-700 dark:text-gray-300">{{ query }}</span>"</p>
                <p class="text-sm text-gray-400 dark:text-gray-500 mt-1">Try different keywords or check the documentation</p>
                <div class="mt-4 flex flex-wrap justify-center gap-2">
                    <button v-for="suggestion in suggestions" :key="suggestion" @click="query = suggestion; handleSearch()" class="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-gray-600 dark:text-gray-300">
                        {{ suggestion }}
                    </button>
                </div>
            </div>

            <!-- Loading -->
            <div v-if="isSearching" class="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 p-4 text-center z-50">
                <div class="inline-block w-5 h-5 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                <span class="ml-2 text-sm text-gray-500 dark:text-gray-400">Searching...</span>
            </div>
        </div>
    `,
    data() {
        return {
            query: '',
            results: [],
            showResults: false,
            isSearching: false,
            searchIndex: [],
            searchTimeout: null,
            isFocused: false,
            suggestions: [],
        };
    },
    mounted() {
        this.buildSearchIndex();
    },
    methods: {
        /**
         * Build search index from docs data using SearchEngine
         */
        buildSearchIndex() {
            if (window.__TELOCE_DOCS_DATA) {
                // Use SearchEngine to build the index
                this.searchIndex = SearchEngine.buildIndex(window.__TELOCE_DOCS_DATA);
                // Store for future use
                window.__TELOCE_SEARCH_INDEX = this.searchIndex;
            } else {
                // Fallback if docs data not available
                this.searchIndex = this.getDefaultSearchIndex();
            }
        },

        /**
         * Get default search index (fallback)
         */
        getDefaultSearchIndex() {
            return [
                { title: 'Installation', section: 'Getting Started', path: '/docs/getting-started/installation', excerpt: 'How to install Teloce via CDN, npm, or CLI.', titleWords: ['installation'], contentWords: ['install', 'cdn', 'npm', 'cli'], sectionWords: ['getting', 'started'] },
                { title: 'Quick Start', section: 'Getting Started', path: '/docs/getting-started/quick-start', excerpt: 'Get started with Teloce in 5 minutes.', titleWords: ['quick', 'start'], contentWords: ['started', 'minutes'], sectionWords: ['getting', 'started'] },
                { title: 'Templates', section: 'Guides', path: '/docs/guides/templates', excerpt: 'Learn about Teloce template syntax.', titleWords: ['templates'], contentWords: ['template', 'syntax'], sectionWords: ['guides'] },
                { title: 'Reactivity', section: 'Guides', path: '/docs/guides/reactivity', excerpt: 'Understanding signals, effects, and computed values.', titleWords: ['reactivity'], contentWords: ['signals', 'effects', 'computed'], sectionWords: ['guides'] },
                { title: 'Components', section: 'Guides', path: '/docs/guides/components', excerpt: 'Building reusable components with Teloce.', titleWords: ['components'], contentWords: ['reusable', 'components'], sectionWords: ['guides'] },
                { title: 'Core API', section: 'API Reference', path: '/docs/api/core', excerpt: 'Reference for createApp, defineComponent, and more.', titleWords: ['core', 'api'], contentWords: ['createApp', 'defineComponent'], sectionWords: ['api', 'reference'] },
                { title: 'Directives', section: 'API Reference', path: '/docs/api/directives', excerpt: 'All built-in directives: For, If, Show, Model, Class, Style.', titleWords: ['directives'], contentWords: ['for', 'if', 'show', 'model', 'class', 'style'], sectionWords: ['api', 'reference'] },
                { title: 'Filters', section: 'API Reference', path: '/docs/api/filters', excerpt: 'All built-in filters: string, number, date, array, object.', titleWords: ['filters'], contentWords: ['string', 'number', 'date', 'array', 'object'], sectionWords: ['api', 'reference'] },
                { title: 'CLI', section: 'API Reference', path: '/docs/api/cli', excerpt: 'Command-line interface reference: dev, build, debug, create.', titleWords: ['cli'], contentWords: ['dev', 'build', 'debug', 'create'], sectionWords: ['api', 'reference'] },
                { title: 'Error Translation', section: 'Debugger', path: '/docs/debugger/errors', excerpt: 'Human-friendly error messages and translations.', titleWords: ['error', 'translation'], contentWords: ['human', 'friendly', 'messages'], sectionWords: ['debugger'] },
                { title: 'Counter', section: 'Examples', path: '/docs/examples/counter', excerpt: 'Simple counter example with reactivity.', titleWords: ['counter'], contentWords: ['simple', 'reactivity'], sectionWords: ['examples'] },
            ];
        },

        /**
         * Handle search input with debounce
         */
        handleSearch() {
            clearTimeout(this.searchTimeout);
            var query = this.query.trim();

            if (!query) {
                this.results = [];
                this.showResults = false;
                this.suggestions = [];
                return;
            }

            this.isSearching = true;
            this.showResults = true;

            this.searchTimeout = setTimeout(function() {
                // Use SearchEngine for relevance-based search
                var results = SearchEngine.search(this.searchIndex, query, {
                    maxResults: 10,
                    fuzzyThreshold: 0.6,
                });

                this.results = results;

                // Get suggestions
                this.suggestions = SearchEngine.getSuggestions(this.searchIndex, query);

                this.isSearching = false;
            }.bind(this), 200);
        },

        /**
         * Highlight search terms in text
         */
        highlightText(text) {
            if (!text || !this.query) return text;
            return SearchEngine.highlightTerms(text, this.query);
        },

        /**
         * Clear search input
         */
        clearSearch() {
            this.query = '';
            this.results = [];
            this.showResults = false;
            this.suggestions = [];
        },

        /**
         * Close search results
         */
        closeSearch() {
            this.showResults = false;
            this.isFocused = false;
        },

        /**
         * Handle focus event
         */
        handleFocus() {
            this.isFocused = true;
            if (this.query) {
                this.showResults = true;
            }
        },
    },
    watch: {
        /**
         * Close search on route change
         */
        '$route': function() {
            this.closeSearch();
        },
    },
};

export { SearchComponent };
