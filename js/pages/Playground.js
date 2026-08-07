/**
 * Playground Page - Interactive demo with Styled Textarea Editor
 * Simulates Teloce behavior using plain JavaScript (no external editor dependencies)
 */

const PlaygroundPage = {
    template: `
        <div class="flex flex-col min-h-screen">
            <!-- Header -->
            <app-header
                :theme="theme"
                @toggle-theme="$emit('toggle-theme')"
                @toggle-mobile="$emit('toggle-mobile')"
                @toggle-search="$emit('toggle-search')"
            />

            <main class="flex-1 pt-16 md:pt-20 overflow-hidden">
                <div class="flex h-[calc(100vh-4rem)] md:h-[calc(100vh-5rem)]">
                    <!-- Left Panel - Examples & Controls -->
                    <div class="w-64 flex-shrink-0 bg-gray-50 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 p-4 flex flex-col overflow-y-auto">
                        <h3 class="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3">
                            Examples
                        </h3>

                        <!-- Example Dropdown -->
                        <select
                            v-model="selectedExample"
                            @change="loadExample"
                            class="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            <option v-for="(example, key) in examples" :key="key" :value="key">
                                {{ example.name }}
                            </option>
                        </select>

                        <!-- Buttons -->
                        <div class="flex gap-2 mt-4">
                            <button
                                @click="runCode"
                                class="flex-1 px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors"
                            >
                                ▶ Run
                            </button>
                            <button
                                @click="resetCode"
                                class="flex-1 px-3 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 text-sm font-medium rounded-lg transition-colors"
                            >
                                ⟳ Reset
                            </button>
                        </div>

                        <!-- Status -->
                        <div class="mt-4 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm">
                            <div class="flex items-center gap-2">
                                <span class="w-2 h-2 rounded-full" :class="statusColor"></span>
                                <span class="text-gray-600 dark:text-gray-400">{{ statusText }}</span>
                            </div>
                            <div class="text-xs text-gray-400 dark:text-gray-500 mt-1">
                                {{ statusDetail }}
                            </div>
                        </div>

                        <!-- Info -->
                        <div class="mt-auto pt-4 border-t border-gray-200 dark:border-gray-800 text-xs text-gray-400 dark:text-gray-500">
                            <p>⚡ Native Textarea Editor</p>
                            <p>📝 {{ currentLanguage }}</p>
                        </div>
                    </div>

                    <!-- Middle Panel - Styled Textarea Editor -->
                    <div class="flex-1 flex flex-col min-w-0 bg-white dark:bg-gray-950">
                        <div class="bg-gray-100 dark:bg-gray-800 px-4 py-1.5 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between flex-shrink-0">
                            <span class="text-xs font-medium text-gray-500 dark:text-gray-400">
                                📄 {{ selectedExample }}.teloce
                            </span>
                            <span class="text-xs text-gray-400 dark:text-gray-500">
                                {{ lineCount }} lines
                            </span>
                        </div>
                        <div class="flex-1 relative flex">
                            <textarea
                                v-model="codeContent"
                                @input="onCodeChange"
                                @keydown.tab.prevent="handleTab"
                                class="w-full h-full p-4 font-mono text-sm bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 resize-none focus:outline-none leading-relaxed"
                                placeholder="Write your Teloce code here..."
                            ></textarea>
                        </div>
                    </div>

                    <!-- Right Panel - Preview -->
                    <div class="flex-1 flex flex-col min-w-0 bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-800">
                        <div class="bg-gray-100 dark:bg-gray-800 px-4 py-1.5 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between flex-shrink-0">
                            <span class="text-xs font-medium text-gray-500 dark:text-gray-400">
                                👁️ Preview
                            </span>
                            <button
                                @click="refreshPreview"
                                class="text-xs text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                            >
                                🔄 Refresh
                            </button>
                        </div>
                        <div class="flex-1 relative">
                            <iframe
                                ref="previewIframe"
                                class="w-full h-full border-0 bg-white"
                                sandbox="allow-scripts allow-modals allow-same-origin"
                            ></iframe>
                            <!-- Overlay for errors -->
                            <div
                                v-if="previewError"
                                class="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6"
                            >
                                <div class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6 max-w-md w-full">
                                    <div class="flex items-center gap-3 text-red-600 dark:text-red-400 mb-2">
                                        <span class="text-2xl">❌</span>
                                        <span class="font-semibold">Error</span>
                                    </div>
                                    <p class="text-sm text-gray-700 dark:text-gray-300">{{ previewError }}</p>
                                </div>
                            </div>
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
    data() {
        return {
            selectedExample: 'counter',
            codeContent: '',
            previewError: null,
            statusText: 'Ready',
            statusDetail: 'Select an example to get started',
            currentLanguage: 'HTML',
            lineCount: 0,
            runTimeout: null,
            examples: {
                counter: {
                    name: 'Counter',
                    template: '<div id="app">\n    <h1>{{ title }}</h1>\n    <p>This is a simple counter with Teloce reactivity</p>\n    <div class="counter-display">\n        <span class="count">{{ count }}</span>\n    </div>\n    <div class="buttons">\n        <button @click="increment">+ Increment</button>\n        <button @click="decrement">- Decrement</button>\n        <button @click="reset">⟳ Reset</button>\n    </div>\n    <p class="info">Double: {{ doubleCount }}</p>\n</div>',
                    script: 'var data = {\n    title: "Counter Demo",\n    count: 0,\n    increment: function() {\n        this.count++;\n    },\n    decrement: function() {\n        if (this.count > 0) this.count--;\n    },\n    reset: function() {\n        this.count = 0;\n    },\n    computed: {\n        doubleCount: function() {\n            return this.count * 2;\n        }\n    }\n};',
                    style: '#app {\n    max-width: 400px;\n    margin: 0 auto;\n    text-align: center;\n    padding: 20px;\n}\nh1 {\n    color: #333;\n    font-size: 28px;\n    margin-bottom: 10px;\n}\n.counter-display {\n    background: #f5f5f5;\n    border-radius: 12px;\n    padding: 30px;\n    margin: 20px 0;\n}\n.count {\n    font-size: 48px;\n    font-weight: bold;\n    color: #4a90d9;\n}\n.buttons {\n    display: flex;\n    gap: 10px;\n    justify-content: center;\n    flex-wrap: wrap;\n}\nbutton {\n    padding: 10px 24px;\n    border: none;\n    border-radius: 8px;\n    font-size: 14px;\n    cursor: pointer;\n    transition: all 0.2s;\n}\nbutton:hover {\n    transform: translateY(-2px);\n}\n.buttons button:first-child {\n    background: #4a90d9;\n    color: white;\n}\n.buttons button:nth-child(2) {\n    background: #e74c3c;\n    color: white;\n}\n.buttons button:last-child {\n    background: #95a5a6;\n    color: white;\n}\n.info {\n    margin-top: 20px;\n    color: #888;\n    font-size: 14px;\n}',
                },
                todo: {
                    name: 'Todo App',
                    template: '<div id="app">\n    <h1>{{ title }}</h1>\n    <p>Add, complete, and delete tasks</p>\n    <div class="input-group">\n        <input :model="newTodo" @keyup.enter="addTodo" placeholder="Add a todo..." />\n        <button @click="addTodo">Add</button>\n    </div>\n    <ul>\n        <for key="id" item="todo" in="todos">\n            <li :class="{ done: todo.done }">\n                <span @click="toggleTodo(todo.id)">{{ todo.text }}</span>\n                <button @click="deleteTodo(todo.id)">✕</button>\n            </li>\n        </for>\n    </ul>\n    <div class="footer">\n        <span>{{ activeTodos }} remaining</span>\n    </div>\n</div>',
                    script: 'var data = {\n    title: "Todo List",\n    newTodo: "",\n    todos: [\n        { id: 1, text: "Learn Teloce", done: true },\n        { id: 2, text: "Build a project", done: false },\n        { id: 3, text: "Deploy to production", done: false }\n    ],\n    addTodo: function() {\n        if (this.newTodo.trim()) {\n            this.todos.push({\n                id: Date.now(),\n                text: this.newTodo.trim(),\n                done: false\n            });\n            this.newTodo = "";\n        }\n    },\n    deleteTodo: function(id) {\n        this.todos = this.todos.filter(function(t) { return t.id !== id; });\n    },\n    toggleTodo: function(id) {\n        var todo = this.todos.find(function(t) { return t.id === id; });\n        if (todo) todo.done = !todo.done;\n    },\n    computed: {\n        activeTodos: function() {\n            return this.todos.filter(function(t) { return !t.done; }).length;\n        }\n    }\n};',
                    style: '#app {\n    max-width: 500px;\n    margin: 0 auto;\n    padding: 20px;\n}\nh1 {\n    color: #333;\n    font-size: 28px;\n    margin-bottom: 10px;\n}\n.input-group {\n    display: flex;\n    gap: 10px;\n    margin: 20px 0;\n}\ninput {\n    flex: 1;\n    padding: 10px 14px;\n    border: 2px solid #ddd;\n    border-radius: 8px;\n    font-size: 14px;\n    outline: none;\n}\ninput:focus {\n    border-color: #4a90d9;\n}\n.input-group button {\n    padding: 10px 24px;\n    background: #4a90d9;\n    color: white;\n    border: none;\n    border-radius: 8px;\n    cursor: pointer;\n}\nul {\n    list-style: none;\n    padding: 0;\n}\nli {\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n    padding: 12px 16px;\n    background: #f8f9fa;\n    border-radius: 8px;\n    margin-bottom: 8px;\n}\nli.done span {\n    text-decoration: line-through;\n    opacity: 0.6;\n}\nli span {\n    cursor: pointer;\n    flex: 1;\n}\nli button {\n    background: none;\n    border: none;\n    color: #e74c3c;\n    cursor: pointer;\n    font-size: 18px;\n}\n.footer {\n    margin-top: 20px;\n    color: #888;\n}',
                },
                fetch: {
                    name: 'API Fetch',
                    template: '<div id="app">\n    <h1>{{ title }}</h1>\n    <p>Simulated API data fetching</p>\n    <button @click="fetchData" :disabled="loading">\n        {{ loading ? "Loading..." : "Fetch Data" }}\n    </button>\n    <div class="data" :show="!loading && data.length > 0">\n        <ul>\n            <for key="id" item="item" in="data">\n                <li>\n                    <span class="id">#{{ item.id }}</span>\n                    <span class="name">{{ item.name }}</span>\n                </li>\n            </for>\n        </ul>\n        <p class="count">{{ data.length }} items loaded</p>\n    </div>\n    <div class="error" :show="error">\n        <p>❌ {{ error }}</p>\n    </div>\n</div>',
                    script: 'var data = {\n    title: "API Data Fetcher",\n    data: [],\n    loading: false,\n    error: null,\n    fetchData: function() {\n        var self = this;\n        this.loading = true;\n        this.error = null;\n        setTimeout(function() {\n            self.data = [\n                { id: 1, name: "Item One" },\n                { id: 2, name: "Item Two" },\n                { id: 3, name: "Item Three" },\n                { id: 4, name: "Item Four" },\n                { id: 5, name: "Item Five" }\n            ];\n            self.loading = false;\n        }, 1000);\n    }\n};\nsetTimeout(function() { data.fetchData(); }, 500);',
                    style: '#app {\n    max-width: 500px;\n    margin: 0 auto;\n    padding: 20px;\n}\nh1 {\n    color: #333;\n    font-size: 28px;\n    margin-bottom: 10px;\n}\nbutton {\n    padding: 10px 24px;\n    background: #4a90d9;\n    color: white;\n    border: none;\n    border-radius: 8px;\n    cursor: pointer;\n    font-size: 14px;\n}\nbutton:hover:not(:disabled) {\n    transform: translateY(-2px);\n}\nbutton:disabled {\n    opacity: 0.6;\n    cursor: not-allowed;\n}\n.data {\n    margin-top: 20px;\n}\nul {\n    list-style: none;\n    padding: 0;\n}\nli {\n    display: flex;\n    gap: 12px;\n    padding: 10px 14px;\n    background: #f8f9fa;\n    border-radius: 8px;\n    margin-bottom: 6px;\n}\n.id {\n    color: #888;\n    font-size: 12px;\n    min-width: 40px;\n}\n.name {\n    color: #333;\n}\n.count {\n    margin-top: 12px;\n    color: #888;\n    font-size: 14px;\n}\n.error {\n    margin-top: 16px;\n    padding: 12px;\n    background: #fde8e8;\n    border-radius: 8px;\n    border-left: 4px solid #e74c3c;\n}\n.error p {\n    color: #e74c3c;\n    margin: 0;\n}',
                },
                form: {
                    name: 'Form Validation',
                    template: '<div id="app">\n    <h1>{{ title }}</h1>\n    <p>Form with validation and two-way binding</p>\n    <form @submit.prevent="handleSubmit">\n        <div class="field">\n            <label>Name</label>\n            <input :model="form.name" placeholder="Enter your name" />\n            <span class="error" :show="errors.name">{{ errors.name }}</span>\n        </div>\n        <div class="field">\n            <label>Email</label>\n            <input :model="form.email" type="email" placeholder="Enter your email" />\n            <span class="error" :show="errors.email">{{ errors.email }}</span>\n        </div>\n        <div class="field">\n            <label>Message</label>\n            <textarea :model="form.message" rows="4" placeholder="Enter your message"></textarea>\n            <span class="error" :show="errors.message">{{ errors.message }}</span>\n        </div>\n        <button type="submit" :disabled="submitting">\n            {{ submitting ? "Submitting..." : "Submit" }}\n        </button>\n        <div class="success" :show="submitted">\n            ✅ Form submitted successfully!\n        </div>\n    </form>\n</div>',
                    script: 'var data = {\n    title: "Contact Form",\n    form: {\n        name: "",\n        email: "",\n        message: ""\n    },\n    errors: {},\n    submitting: false,\n    submitted: false,\n    handleSubmit: function() {\n        var self = this;\n        this.errors = {};\n        this.submitted = false;\n\n        if (!this.form.name.trim()) {\n            this.errors.name = "Name is required";\n        }\n        if (!this.form.email.trim()) {\n            this.errors.email = "Email is required";\n        } else if (this.form.email.indexOf("@") === -1) {\n            this.errors.email = "Invalid email address";\n        }\n        if (!this.form.message.trim()) {\n            this.errors.message = "Message is required";\n        }\n\n        if (Object.keys(this.errors).length > 0) return;\n\n        this.submitting = true;\n        setTimeout(function() {\n            self.submitting = false;\n            self.submitted = true;\n        }, 1000);\n    }\n};',
                    style: '#app {\n    max-width: 500px;\n    margin: 0 auto;\n    padding: 20px;\n}\nh1 {\n    color: #333;\n    font-size: 28px;\n    margin-bottom: 10px;\n}\n.field {\n    margin-bottom: 20px;\n}\nlabel {\n    display: block;\n    font-weight: 500;\n    color: #333;\n    margin-bottom: 6px;\n}\ninput, textarea {\n    width: 100%;\n    padding: 10px 14px;\n    border: 2px solid #ddd;\n    border-radius: 8px;\n    font-size: 14px;\n    outline: none;\n}\ninput:focus, textarea:focus {\n    border-color: #4a90d9;\n}\ntextarea {\n    resize: vertical;\n}\n.error {\n    color: #e74c3c;\n    font-size: 13px;\n    margin-top: 4px;\n    display: block;\n}\nbutton[type="submit"] {\n    padding: 12px 32px;\n    background: #4a90d9;\n    color: white;\n    border: none;\n    border-radius: 8px;\n    cursor: pointer;\n    font-size: 16px;\n}\nbutton[type="submit"]:hover:not(:disabled) {\n    transform: translateY(-2px);\n}\nbutton[type="submit"]:disabled {\n    opacity: 0.6;\n    cursor: not-allowed;\n}\n.success {\n    margin-top: 16px;\n    padding: 12px 16px;\n    background: #d4edda;\n    border-radius: 8px;\n    border-left: 4px solid #28a745;\n    color: #155724;\n}',
                },
            },
        };
    },
    computed: {
        statusColor() {
            if (this.previewError) return 'bg-red-500';
            return 'bg-green-500';
        },
    },
    mounted() {
        this.loadExample(this.selectedExample);
    },
    methods: {
        handleTab(e) {
            const textarea = e.target;
            const start = textarea.selectionStart;
            const end = textarea.selectionEnd;
            this.codeContent = this.codeContent.substring(0, start) + '  ' + this.codeContent.substring(end);
            this.$nextTick(() => {
                textarea.selectionStart = textarea.selectionEnd = start + 2;
            });
        },
        onCodeChange() {
            this.lineCount = this.codeContent.split('\n').length;
            clearTimeout(this.runTimeout);
            this.runTimeout = setTimeout(() => {
                this.runCode();
            }, 500);
        },
        loadExample() {
            var example = this.examples[this.selectedExample];
            if (!example) return;

            var code = '<!-- Template -->\n' + example.template + '\n\n<!-- Script -->\n' + example.script + '\n\n<!-- Style -->\n' + example.style;
            this.codeContent = code;
            this.lineCount = code.split('\n').length;
            this.statusDetail = 'Loaded: ' + example.name;
            this.runCode();
        },
        refreshPreview() {
            this.runCode();
        },
        runCode() {
            var code = this.codeContent;
            this.previewError = null;
            this.statusText = 'Running...';
            this.statusDetail = 'Compiling...';

            try {
                var result = this.compileCode(code);
                this.renderPreview(result);
                this.statusText = 'Ready';
                this.statusDetail = 'Preview updated';
            } catch (error) {
                this.previewError = error.message || 'Compilation error';
                this.statusText = 'Error';
                this.statusDetail = error.message || 'Failed to compile';
            }
        },
        compileCode(code) {
            var templateMatch = code.match(/<!-- Template -->\s*([\s\S]*?)(?=<!-- Script -->|$)/);
            var scriptMatch = code.match(/<!-- Script -->\s*([\s\S]*?)(?=<!-- Style -->|$)/);
            var styleMatch = code.match(/<!-- Style -->\s*([\s\S]*?)$/);

            var template = templateMatch ? templateMatch[1].trim() : '';
            var script = scriptMatch ? scriptMatch[1].trim() : 'var data = {};';
            var style = styleMatch ? styleMatch[1].trim() : '';

            return this.buildHTML(template, script, style);
        },
        buildHTML(template, script, style) {
            var escapedTemplate = template.replace(/`/g, '\\`').replace(/\$/g, '\\$');
            var escapedScript = script.replace(/`/g, '\\`').replace(/\$/g, '\\$');
            var escapedStyle = style.replace(/`/g, '\\`').replace(/\$/g, '\\$');

            return `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Teloce Playground</title>
    <style>` + escapedStyle + `</style>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            padding: 20px;
            background: #fff;
            color: #333;
        }
        #app { max-width: 100%; }
    </style>
</head>
<body>
    ` + escapedTemplate + `

    <script>
        var userData = {};
        try {
            var fn = new Function("return " + ` + JSON.stringify(escapedScript) + `);
            var result = fn();
            userData = result || {};
        } catch(e) {
            console.warn("Script parse error:", e);
        }

        var state = {};
        for (var key in userData) {
            if (userData.hasOwnProperty(key)) {
                state[key] = userData[key];
            }
        }

        // Initialize preview render loop
        console.log("Teloce Playground Initialized with State:", state);
    </script>
</body>
</html>`;
        },
        renderPreview(htmlContent) {
            var iframe = this.$refs.previewIframe;
            if (!iframe) return;
            var doc = iframe.contentDocument || iframe.contentWindow.document;
            doc.open();
            doc.write(htmlContent);
            doc.close();
        },
    },
};

// Add this line at the very end of Playground.js
export { PlaygroundPage };