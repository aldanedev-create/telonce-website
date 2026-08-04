/**
 * Examples Page - Code examples for learning Teloce
 */

const ExamplesPage = {
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
                            <span class="gradient-text">Examples</span>
                        </h1>
                        <p class="text-lg text-gray-600 dark:text-gray-300">
                            Learn Teloce by exploring these practical code examples.
                        </p>
                    </div>

                    <!-- Example Cards Grid -->
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div
                            v-for="(example, key) in examples"
                            :key="key"
                            class="group bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-700 hover:shadow-xl transition-all duration-300 overflow-hidden"
                        >
                            <div class="p-6">
                                <div class="flex items-start justify-between mb-3">
                                    <h3 class="text-xl font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                                        {{ example.title }}
                                    </h3>
                                    <span class="text-2xl">{{ getIcon(key) }}</span>
                                </div>
                                <p class="text-gray-600 dark:text-gray-400 text-sm mb-4">
                                    {{ example.description }}
                                </p>
                                <div class="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-4">
                                    <span class="px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-700">Template</span>
                                    <span class="px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-700">Script</span>
                                    <span v-if="example.style" class="px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-700">Style</span>
                                </div>
                                <button
                                    @click="openExample(key)"
                                    class="w-full px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors"
                                >
                                    View Example →
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- Modal/Expanded View -->
                    <div
                        v-if="selectedExample"
                        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
                        @click.self="closeExample"
                    >
                        <div class="bg-white dark:bg-gray-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
                            <div class="sticky top-0 z-10 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 p-4 flex items-center justify-between">
                                <h2 class="text-xl font-bold text-gray-900 dark:text-white">
                                    {{ selectedExample.title }}
                                </h2>
                                <button
                                    @click="closeExample"
                                    class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                >
                                    <svg class="w-6 h-6 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                            <div class="p-6 space-y-6">
                                <div>
                                    <h3 class="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Template</h3>
                                    <code-block :code="selectedExample.template" language="html" />
                                </div>
                                <div>
                                    <h3 class="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Script</h3>
                                    <code-block :code="selectedExample.script" language="javascript" />
                                </div>
                                <div v-if="selectedExample.style">
                                    <h3 class="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Style</h3>
                                    <code-block :code="selectedExample.style" language="css" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- No Examples -->
                    <div v-if="Object.keys(examples).length === 0" class="text-center py-16">
                        <p class="text-gray-500 dark:text-gray-400">No examples available.</p>
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
            examples: {},
            selectedExample: null,
        };
    },
    mounted() {
        this.loadExamples();
    },
    methods: {
        loadExamples() {
            var examplesData = window.__TELOCE_EXAMPLES_DATA || this.getDefaultExamples();
            this.examples = examplesData;
        },
        getDefaultExamples() {
            return {
                counter: {
                    title: 'Counter',
                    description: 'A simple counter with reactive state and computed properties.',
                    template: `<div id="app">\n    <h1>{{ title }}</h1>\n    <button @click="count++">Count: {{ count }}</button>\n    <p>Double: {{ doubleCount }}</p>\n</div>`,
                    script: `teloce.createApp('#app', {\n    title: 'Counter',\n    count: 0,\n    computed: {\n        doubleCount() {\n            return this.count * 2;\n        }\n    }\n});`,
                    style: `button {\n    padding: 10px 20px;\n    font-size: 16px;\n    cursor: pointer;\n}`,
                },
                todo: {
                    title: 'Todo App',
                    description: 'A todo list with add, delete, and toggle functionality.',
                    template: `<div id="app">\n    <h1>Todo List</h1>\n    <input :model="newTodo" @keyup.enter="addTodo" placeholder="Add a todo..." />\n    <button @click="addTodo">Add</button>\n    <ul>\n        <for key="id" item="todo" in="todos">\n            <li :class="{ done: todo.done }">\n                <span @click="toggleTodo(todo.id)">{{ todo.text }}</span>\n                <button @click="deleteTodo(todo.id)">✕</button>\n            </li>\n        </for>\n    </ul>\n    <p>{{ activeTodos }} remaining</p>\n</div>`,
                    script: `teloce.createApp('#app', {\n    newTodo: '',\n    todos: [\n        { id: 1, text: 'Learn Teloce', done: true },\n        { id: 2, text: 'Build a project', done: false }\n    ],\n    addTodo() {\n        if (this.newTodo.trim()) {\n            this.todos.push({\n                id: Date.now(),\n                text: this.newTodo.trim(),\n                done: false\n            });\n            this.newTodo = '';\n        }\n    },\n    deleteTodo(id) {\n        this.todos = this.todos.filter(t => t.id !== id);\n    },\n    toggleTodo(id) {\n        const todo = this.todos.find(t => t.id === id);\n        if (todo) todo.done = !todo.done;\n    },\n    computed: {\n        activeTodos() {\n            return this.todos.filter(t => !t.done).length;\n        }\n    }\n});`,
                    style: `.done {\n    text-decoration: line-through;\n    opacity: 0.6;\n}`,
                },
                fetch: {
                    title: 'API Fetch',
                    description: 'Fetch data from an API with loading and error states.',
                    template: `<div id="app">\n    <h1>{{ title }}</h1>\n    <button @click="fetchData" :disabled="loading">\n        {{ loading ? 'Loading...' : 'Fetch Data' }}\n    </button>\n    <ul>\n        <for key="id" item="item" in="data">\n            <li>{{ item.name }}</li>\n        </for>\n    </ul>\n    <p v-if="error" class="error">{{ error }}</p>\n</div>`,
                    script: `teloce.createApp('#app', {\n    title: 'API Data Fetcher',\n    data: [],\n    loading: false,\n    error: null,\n    async fetchData() {\n        this.loading = true;\n        this.error = null;\n        try {\n            const response = await fetch('/api/data');\n            this.data = await response.json();\n        } catch (err) {\n            this.error = err.message || 'Failed to fetch data';\n        } finally {\n            this.loading = false;\n        }\n    }\n});`,
                    style: `.error {\n    color: red;\n}`,
                },
                form: {
                    title: 'Form Validation',
                    description: 'A form with validation and two-way binding.',
                    template: `<div id="app">\n    <h1>{{ title }}</h1>\n    <form @submit.prevent="handleSubmit">\n        <div>\n            <label>Name</label>\n            <input :model="form.name" placeholder="Enter your name" />\n            <span class="error">{{ errors.name }}</span>\n        </div>\n        <div>\n            <label>Email</label>\n            <input :model="form.email" type="email" placeholder="Enter your email" />\n            <span class="error">{{ errors.email }}</span>\n        </div>\n        <button type="submit" :disabled="submitting">\n            {{ submitting ? 'Submitting...' : 'Submit' }}\n        </button>\n    </form>\n    <p v-if="submitted" class="success">✅ Form submitted successfully!</p>\n</div>`,
                    script: `teloce.createApp('#app', {\n    title: 'Contact Form',\n    form: {\n        name: '',\n        email: ''\n    },\n    errors: {},\n    submitting: false,\n    submitted: false,\n    handleSubmit() {\n        this.errors = {};\n        this.submitted = false;\n\n        if (!this.form.name.trim()) {\n            this.errors.name = 'Name is required';\n        }\n        if (!this.form.email.trim()) {\n            this.errors.email = 'Email is required';\n        } else if (!this.form.email.includes('@')) {\n            this.errors.email = 'Invalid email address';\n        }\n\n        if (Object.keys(this.errors).length > 0) return;\n\n        this.submitting = true;\n        setTimeout(() => {\n            this.submitting = false;\n            this.submitted = true;\n        }, 1000);\n    }\n});`,
                    style: `.error {\n    color: red;\n    font-size: 14px;\n}\n.success {\n    color: green;\n}`,
                },
            };
        },
        getIcon(key) {
            var icons = {
                counter: '🔢',
                todo: '📋',
                fetch: '🌐',
                form: '📝',
            };
            return icons[key] || '📄';
        },
        openExample(key) {
            this.selectedExample = {
                key: key,
                title: this.examples[key].title,
                template: this.examples[key].template,
                script: this.examples[key].script,
                style: this.examples[key].style,
            };
            document.body.classList.add('no-scroll');
        },
        closeExample() {
            this.selectedExample = null;
            document.body.classList.remove('no-scroll');
        },
    },
};

export { ExamplesPage };
