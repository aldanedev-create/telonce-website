/**
 * Docs Data - All documentation content
 * Also builds search index for Search component
 */

const docsData = {
    'getting-started': {
        title: 'Getting Started',
        pages: {
            installation: {
                title: 'Installation',
                content: `
                    <h1>Installation</h1>
                    <p>There are several ways to install Teloce depending on your needs.</p>
                    <h2>CDN (Recommended for most Python projects)</h2>
                    <p>Simply add this script tag to your HTML:</p>
                    <code-block language="html" code='<script src="https://cdn.teloce.dev/teloce.min.js"><\/script>'></code-block>
                    <p>No npm, no Node.js, no build tools — just one script tag.</p>
                    <h2>npm</h2>
                    <p>For advanced users who want to use build tools:</p>
                    <code-block language="bash" code='npm install teloce'></code-block>
                    <h2>CLI</h2>
                    <p>Install the CLI globally:</p>
                    <code-block language="bash" code='npm install -g @teloce/cli'></code-block>
                `,
            },
            'quick-start': {
                title: 'Quick Start',
                content: `
                    <h1>Quick Start</h1>
                    <p>Get started with Teloce in 5 minutes.</p>
                    <h2>Hello World</h2>
                    <p>Create an HTML file and add this code:</p>
                    <code-block language="html" code='
<!DOCTYPE html>
<html>
<head>
    <script src="https://cdn.teloce.dev/teloce.min.js"></script>
</head>
<body>
    <div id="app">
        <h1>Hello {{ name }}</h1>
        <button @click="count++">Count: {{ count }}</button>
    </div>
    <script>
        teloce.createApp("#app", {
            name: "Teloce Developer",
            count: 0
        });
    <\/script>
</body>
</html>
                    '></code-block>
                    <p>Open it in your browser and you'll see a working reactive app!</p>
                `,
            },
            'first-app': {
                title: 'First App',
                content: `
                    <h1>Your First Teloce App</h1>
                    <p>Let's build a complete Teloce application with Flask.</p>
                    <h2>Project Structure</h2>
                    <code-block language="text" code='
project/
├── app.py
├── templates/
│   └── index.html
└── static/
    └── js/
        └── app.js
                    '></code-block>
                    <p>With Teloce, you can keep your frontend simple and your backend clean.</p>
                `,
            },
        },
    },
    guides: {
        title: 'Guides',
        pages: {
            templates: {
                title: 'Templates',
                content: `
                    <h1>Templates</h1>
                    <p>Teloce templates use a simple, Python-like syntax that feels natural to Flask developers.</p>
                    <h2>Interpolation</h2>
                    <p>Display dynamic data with <code>{{ variable }}</code>:</p>
                    <code-block language="html" code='<h1>Hello {{ user.name }}</h1>'></code-block>
                    <h2>Loops</h2>
                    <p>Iterate over collections with <code>&lt;for&gt;</code>:</p>
                    <code-block language="html" code='
<for product in products>
    <div>{{ product.name }}</div>
</for>
                    '></code-block>
                    <h2>Conditions</h2>
                    <p>Conditional rendering with <code>&lt;if&gt;</code> and <code>&lt;else&gt;</code>:</p>
                    <code-block language="html" code='
<if logged_in>
    <h1>Welcome back!</h1>
    <else>
        <button>Login</button>
</if>
                    '></code-block>
                    <h2>Directives</h2>
                    <p>Use directives like <code>@click</code> and <code>:model</code> for interactivity:</p>
                    <code-block language="html" code='
<button @click="save()">Save</button>
<input :model="username" />
                    '></code-block>
                `,
            },
            reactivity: {
                title: 'Reactivity',
                content: `
                    <h1>Reactivity</h1>
                    <p>Teloce uses a signals-based reactivity system for fine-grained updates.</p>
                    <h2>Signals</h2>
                    <p>Create reactive signals with <code>createSignal</code>:</p>
                    <code-block language="javascript" code='
const [count, setCount] = teloce.createSignal(0);
                    '></code-block>
                    <h2>Effects</h2>
                    <p>Track dependencies and automatically re-run functions:</p>
                    <code-block language="javascript" code='
teloce.createEffect(() => {
    console.log("Count is:", count());
});
                    '></code-block>
                    <h2>Computed</h2>
                    <p>Derive values from signals:</p>
                    <code-block language="javascript" code='
const double = teloce.createComputed(() => count() * 2);
                    '></code-block>
                `,
            },
            components: {
                title: 'Components',
                content: `
                    <h1>Components</h1>
                    <p>Components are reusable building blocks for your application.</p>
                    <h2>Defining a Component</h2>
                    <code-block language="javascript" code='
const MyComponent = teloce.defineComponent({
    name: "MyComponent",
    data() {
        return {
            count: 0
        };
    },
    template: \`
        <div>
            <h2>My Component</h2>
            <button @click="count++">Count: {{ count }}</button>
        </div>
    \`
});
                    '></code-block>
                    <h2>Using Components</h2>
                    <code-block language="html" code='<MyComponent />'></code-block>
                `,
            },
            events: {
                title: 'Events',
                content: `
                    <h1>Events</h1>
                    <p>Handle user interactions with event bindings.</p>
                    <h2>Click Events</h2>
                    <code-block language="html" code='<button @click="handleClick">Click Me</button>'></code-block>
                    <h2>Submit Events</h2>
                    <code-block language="html" code='<form @submit="handleSubmit">...</form>'></code-block>
                    <h2>Event Modifiers</h2>
                    <code-block language="html" code='
<button @click.stop="handleClick">Stop Propagation</button>
<button @click.prevent="handleClick">Prevent Default</button>
                    '></code-block>
                `,
            },
            state: {
                title: 'State Management',
                content: `
                    <h1>State Management</h1>
                    <p>Manage application state with signals and components.</p>
                    <h2>Local State</h2>
                    <p>Each component can have its own state.</p>
                    <h2>Global State</h2>
                    <p>Share state across components with signals.</p>
                    <h2>Computed State</h2>
                    <p>Derive state from other state values.</p>
                `,
            },
            sfc: {
                title: 'SFC (.vel)',
                content: `
                    <h1>Single File Components (.vel)</h1>
                    <p>Write components with template, script, and style in one file.</p>
                    <code-block language="html" code='
<!-- Component.vel -->
<template>
    <div class="card">
        <h2>{{ title }}</h2>
        <p>{{ content }}</p>
    </div>
</template>

<script>
export default {
    name: "MyComponent",
    data() {
        return {
            title: "Hello",
            content: "This is a component"
        };
    }
};
</script>

<style scoped>
.card {
    padding: 20px;
    border: 1px solid #ccc;
}
</style>
                    '></code-block>
                `,
            },
        },
    },
    api: {
        title: 'API Reference',
        pages: {
            core: {
                title: 'Core API',
                content: `
                    <h1>Core API</h1>
                    <h2>createApp</h2>
                    <p>Creates a new Teloce application.</p>
                    <code-block language="javascript" code='
const app = teloce.createApp("#app", {
    count: 0,
    name: "Teloce"
});
                    '></code-block>
                    <h2>defineComponent</h2>
                    <p>Defines a reusable component.</p>
                    <code-block language="javascript" code='
const MyComponent = teloce.defineComponent({
    name: "MyComponent",
    data() { return {}; }
});
                    '></code-block>
                    <h2>mount</h2>
                    <p>Mounts an app to the DOM.</p>
                `,
            },
            'reactivity-api': {
                title: 'Reactivity API',
                content: `
                    <h1>Reactivity API</h1>
                    <h2>createSignal</h2>
                    <p>Creates a reactive signal.</p>
                    <code-block language="javascript" code='const [count, setCount] = teloce.createSignal(0);'></code-block>
                    <h2>createEffect</h2>
                    <p>Creates an effect that runs when dependencies change.</p>
                    <code-block language="javascript" code='teloce.createEffect(() => { console.log(count()); });'></code-block>
                    <h2>createComputed</h2>
                    <p>Creates a computed value.</p>
                    <code-block language="javascript" code='const double = teloce.createComputed(() => count() * 2);'></code-block>
                `,
            },
            directives: {
                title: 'Directives',
                content: `
                    <h1>Directives</h1>
                    <p>All built-in directives in Teloce.</p>
                    <h2>For</h2>
                    <p>Loop over collections.</p>
                    <code-block language="html" code='<for key="id" item="product" in="products">...</for>'></code-block>
                    <h2>If</h2>
                    <p>Conditional rendering.</p>
                    <code-block language="html" code='<if condition="isLoggedIn">...</if>'></code-block>
                    <h2>Show</h2>
                    <p>Show/hide elements.</p>
                    <code-block language="html" code='<div :show="isVisible">...</div>'></code-block>
                    <h2>Model</h2>
                    <p>Two-way binding for forms.</p>
                    <code-block language="html" code='<input :model="username" />'></code-block>
                    <h2>Class</h2>
                    <p>Dynamic class binding.</p>
                    <code-block language="html" code='<div :class="{ active: isActive }">...</div>'></code-block>
                    <h2>Style</h2>
                    <p>Dynamic style binding.</p>
                    <code-block language="html" code='<div :style="{ color: textColor }">...</div>'></code-block>
                `,
            },
            filters: {
                title: 'Filters',
                content: `
                    <h1>Filters</h1>
                    <p>All built-in filters in Teloce.</p>
                    <h2>String Filters</h2>
                    <ul>
                        <li><code>capitalize</code> - Capitalize first letter</li>
                        <li><code>uppercase</code> - Convert to uppercase</li>
                        <li><code>lowercase</code> - Convert to lowercase</li>
                        <li><code>truncate</code> - Truncate string to length</li>
                    </ul>
                    <h2>Number Filters</h2>
                    <ul>
                        <li><code>currency</code> - Format as currency</li>
                        <li><code>percent</code> - Format as percentage</li>
                        <li><code>number</code> - Format with commas</li>
                    </ul>
                    <h2>Date Filters</h2>
                    <ul>
                        <li><code>dateFormat</code> - Format date</li>
                        <li><code>timeAgo</code> - Relative time</li>
                    </ul>
                `,
            },
            cli: {
                title: 'CLI',
                content: `
                    <h1>CLI Commands</h1>
                    <h2>dev</h2>
                    <p>Start development server with hot reload.</p>
                    <code-block language="bash" code='teloce dev'></code-block>
                    <h2>build</h2>
                    <p>Build for production.</p>
                    <code-block language="bash" code='teloce build'></code-block>
                    <h2>debug</h2>
                    <p>Open debugger dashboard.</p>
                    <code-block language="bash" code='teloce debug'></code-block>
                    <h2>create</h2>
                    <p>Create a new project.</p>
                    <code-block language="bash" code='teloce create my-app'></code-block>
                `,
            },
        },
    },
    debugger: {
        title: 'Debugger',
        pages: {
            errors: {
                title: 'Error Translation',
                content: `
                    <h1>Error Translation</h1>
                    <p>Teloce translates cryptic JavaScript errors into plain English.</p>
                    <h2>Before (Cryptic)</h2>
                    <code-block language="text" code='TypeError: Cannot read property "name" of undefined'></code-block>
                    <h2>After (Human-Friendly)</h2>
                    <code-block language="text" code='
Problem Found
File: dashboard.ts
Line: 34
Variable "user"

The variable "user" is empty.

Possible Fixes:
- Check if your backend sent "user"
- Make sure render() contains "user"
- Verify the API request completed
                    '></code-block>
                `,
            },
            performance: {
                title: 'Performance',
                content: `
                    <h1>Performance Monitoring</h1>
                    <p>Monitor your application's performance in real-time.</p>
                    <ul>
                        <li>FPS (frames per second)</li>
                        <li>Memory usage</li>
                        <li>Compile time</li>
                        <li>Component render times</li>
                    </ul>
                `,
            },
            inspector: {
                title: 'Component Inspector',
                content: `
                    <h1>Component Inspector</h1>
                    <p>Inspect your component tree and state.</p>
                    <ul>
                        <li>View component hierarchy</li>
                        <li>Inspect component state</li>
                        <li>Track render counts</li>
                        <li>Debug reactivity</li>
                    </ul>
                `,
            },
            troubleshooting: {
                title: 'Troubleshooting',
                content: `
                    <h1>Troubleshooting</h1>
                    <h2>Common Issues</h2>
                    <ul>
                        <li>Components not rendering</li>
                        <li>State not updating</li>
                        <li>Event handlers not firing</li>
                        <li>CSS not applying</li>
                    </ul>
                    <h2>Solutions</h2>
                    <ul>
                        <li>Check the console for errors</li>
                        <li>Use the debugger dashboard</li>
                        <li>Verify your template syntax</li>
                    </ul>
                `,
            },
        },
    },
    examples: {
        title: 'Examples',
        pages: {
            counter: {
                title: 'Counter',
                content: `
                    <h1>Counter Example</h1>
                    <p>A simple counter with reactive state.</p>
                    <code-block language="html" code='
<div id="app">
    <h1>{{ title }}</h1>
    <button @click="count++">Count: {{ count }}</button>
</div>

<script>
    teloce.createApp("#app", {
        title: "Counter",
        count: 0
    });
</script>
                    '></code-block>
                `,
            },
            todo: {
                title: 'Todo App',
                content: `
                    <h1>Todo App Example</h1>
                    <p>A full todo list with add, delete, and toggle.</p>
                    <code-block language="html" code='
<div id="app">
    <h1>Todo List</h1>
    <input :model="newTodo" @keyup.enter="addTodo" />
    <button @click="addTodo">Add</button>
    <ul>
        <for key="id" item="todo" in="todos">
            <li :class="{ done: todo.done }">
                <span @click="toggleTodo(todo.id)">{{ todo.text }}</span>
                <button @click="deleteTodo(todo.id)">✕</button>
            </li>
        </for>
    </ul>
</div>

<script>
    teloce.createApp("#app", {
        newTodo: "",
        todos: [],
        addTodo() { /* ... */ },
        deleteTodo(id) { /* ... */ },
        toggleTodo(id) { /* ... */ }
    });
</script>
                    '></code-block>
                `,
            },
            fetch: {
                title: 'API Fetch',
                content: `
                    <h1>API Fetch Example</h1>
                    <p>Fetch data from an API endpoint.</p>
                    <code-block language="html" code='
<div id="app">
    <button @click="fetchData">Fetch Data</button>
    <ul>
        <for key="id" item="item" in="data">
            <li>{{ item.name }}</li>
        </for>
    </ul>
</div>

<script>
    teloce.createApp("#app", {
        data: [],
        async fetchData() {
            const response = await fetch("/api/data");
            this.data = await response.json();
        }
    });
</script>
                    '></code-block>
                `,
            },
            form: {
                title: 'Form Validation',
                content: `
                    <h1>Form Validation Example</h1>
                    <p>Form with validation and error handling.</p>
                    <code-block language="html" code='
<div id="app">
    <form @submit.prevent="handleSubmit">
        <input :model="form.email" placeholder="Email" />
        <span class="error">{{ errors.email }}</span>
        <input :model="form.password" type="password" />
        <span class="error">{{ errors.password }}</span>
        <button type="submit">Submit</button>
    </form>
</div>

<script>
    teloce.createApp("#app", {
        form: { email: "", password: "" },
        errors: {},
        handleSubmit() {
            // Validate and submit
        }
    });
</script>
                    '></code-block>
                `,
            },
        },
    },
};

// Build search index from docs data
function buildSearchIndex() {
    var index = [];
    for (var sectionKey in docsData) {
        if (docsData.hasOwnProperty(sectionKey)) {
            var sectionData = docsData[sectionKey];
            var sectionName = sectionData.title || sectionKey;
            var pages = sectionData.pages || {};
            for (var pageKey in pages) {
                if (pages.hasOwnProperty(pageKey)) {
                    var pageData = pages[pageKey];
                    var title = pageData.title || pageKey;
                    var excerpt = pageData.content || '';
                    excerpt = excerpt.replace(/<[^>]*>/g, '');
                    excerpt = excerpt.substring(0, 150) + '...';
                    index.push({
                        title: title,
                        section: sectionName,
                        sectionSlug: sectionKey,
                        pageSlug: pageKey,
                        path: '/docs/' + sectionKey + '/' + pageKey,
                        excerpt: excerpt,
                        content: pageData.content || '',
                    });
                }
            }
        }
    }
    return index;
}

// Set global search index
var searchIndex = buildSearchIndex();
window.__TELOCE_SEARCH_INDEX = searchIndex;
window.__TELOCE_DOCS_DATA = docsData;

// Also set nav for sidebar
function buildNav() {
    var nav = [];
    for (var key in docsData) {
        if (docsData.hasOwnProperty(key)) {
            var data = docsData[key];
            var items = [];
            var pages = data.pages || {};
            for (var pageKey in pages) {
                if (pages.hasOwnProperty(pageKey)) {
                    var pageData = pages[pageKey];
                    items.push({
                        title: pageData.title || pageKey,
                        slug: pageKey,
                    });
                }
            }
            nav.push({
                title: data.title || key,
                slug: key,
                items: items,
            });
        }
    }
    return nav;
}

window.__TELOCE_DOCS_NAV = buildNav();

// ─── DOCS PAGE COMPONENT ───────────────────────────────────────────

const DocsPage = {
    template: `
        <div class="flex flex-col min-h-screen">
            <app-header
                :theme="theme"
                @toggle-theme="$emit('toggle-theme')"
                @toggle-mobile="mobileMenuOpen = ($event === false ? false : !mobileMenuOpen)"
                @toggle-search="$emit('toggle-search')"
            />
            <app-docs-layout
                :mobile-menu-open="mobileMenuOpen"
                :is-mobile="isMobile"
                @close-mobile="mobileMenuOpen = false"
            >
                <component :is="contentComponent" v-if="currentPage" :key="$route.fullPath"></component>
                <div v-else>
                    <h1>Page not found</h1>
                    <p>We couldn't find that documentation page. Try picking a topic from the sidebar.</p>
                </div>
            </app-docs-layout>
        </div>
    `,
    props: {
        theme: { type: String, default: 'light' },
    },
    emits: ['toggle-theme', 'toggle-mobile', 'toggle-search'],
    data() {
        return {
            mobileMenuOpen: false,
            isMobile: typeof window !== 'undefined' ? window.innerWidth < 768 : false,
        };
    },
    computed: {
        currentSectionKey() {
            return this.$route.params.section || Object.keys(docsData)[0];
        },
        currentPageKey() {
            const section = docsData[this.currentSectionKey];
            if (!section) return null;
            return this.$route.params.page || Object.keys(section.pages)[0];
        },
        currentPage() {
            const section = docsData[this.currentSectionKey];
            if (!section || !this.currentPageKey) return null;
            return section.pages[this.currentPageKey] || null;
        },
        contentComponent() {
            // Compile the page's HTML (including <code-block> tags) as a real
            // Vue template so components inside the content actually render.
            return {
                template: this.currentPage ? this.currentPage.content : '<p>Content unavailable.</p>',
            };
        },
    },
    watch: {
        '$route'() {
            this.mobileMenuOpen = false;
            this.redirectIfNoSlug();
        },
    },
    mounted() {
        window.addEventListener('resize', this.handleResize);
        this.redirectIfNoSlug();
    },
    beforeUnmount() {
        window.removeEventListener('resize', this.handleResize);
    },
    methods: {
        handleResize() {
            this.isMobile = window.innerWidth < 768;
        },
        redirectIfNoSlug() {
            // '/docs' alone has no :section/:page params - send the user to
            // the first real doc page instead of showing a blank content area.
            if (!this.$route.params.section && this.currentSectionKey && this.currentPageKey) {
                this.$router.replace('/docs/' + this.currentSectionKey + '/' + this.currentPageKey);
            }
        },
    },
};

// Export for use in other files
export { docsData, searchIndex, buildSearchIndex, buildNav };

export { DocsPage };

