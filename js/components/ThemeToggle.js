/**
 * ThemeToggle Component - Dark/light mode toggle
 */

const ThemeToggleComponent = {
    template: `
        <button
            @click="toggle"
            class="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
        >
            <span v-if="isDark" class="text-lg">☀️</span>
            <span v-else class="text-lg">🌙</span>
        </button>
    `,
    props: {
        theme: { type: String, default: 'light' },
    },
    emits: ['toggle'],
    computed: {
        isDark() {
            return this.theme === 'dark';
        },
    },
    methods: {
        toggle() {
            this.$emit('toggle');
        },
    },
};

export { ThemeToggleComponent };
