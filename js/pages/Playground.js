/**
 * Teloce Playground Page - Interactive Simulator
 * Features a custom regex-based syntax highlighted editor (no Monaco/CDN)
 * and a fully functional embedded reactivity engine simulating Teloce's behavior.
 */

const PlaygroundPage = {
    template: `
        <div class="flex flex-col min-h-screen bg-white dark:bg-[#111111]">
            <!-- Header (Simulation) -->
            <header class="h-14 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-4 bg-gray-50 dark:bg-[#1a1a1a] flex-shrink-0">
                <div class="flex items-center gap-3">
                    <div class="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">T</div>
                    <span class="font-semibold text-gray-800 dark:text-gray-200">Teloce Interactive Playground</span>
                </div>
                <div class="flex items-center gap-4">
                    <span class="flex items-center gap-2 text-xs font-medium px-2.5 py-1 rounded-full" 
                          :class="statusColor">
                        <span class="w-2 h-2 rounded-full bg-current animate-pulse"></span>
                        {{ statusText }}
                    </span>
                </div>
            </header>

            <main class="flex-1 flex flex-col md:flex-row overflow-hidden h-[calc(100vh-3.5rem)]">
                <!-- Mobile Tabs -->
                <div class="flex md:hidden border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-[#1a1a1a]">
                    <button @click="mobileTab = 'editor'" 
                            :class="mobileTab === 'editor' ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400' : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'"
                            class="flex-1 py-3 text-sm font-medium border-b-2 transition-colors">
                        📝 Editor
                    </button>
                    <button @click="mobileTab = 'preview'" 
                            :class="mobileTab === 'preview' ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400' : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'"
                            class="flex-1 py-3 text-sm font-medium border-b-2 transition-colors">
                        👁️ Preview & DevTools
                    </button>
                </div>

                <!-- Left Sidebar (Examples) -->
                <div class="hidden md:flex w-64 flex-col bg-gray-50 dark:bg-[#161616] border-r border-gray-200 dark:border-gray-800 z-10">
                    <div class="p-4 border-b border-gray-200 dark:border-gray-800">
                        <h3 class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Load Example</h3>
                        <select v-model="selectedExample" @change="loadExample" 
                                class="w-full bg-white dark:bg-[#222] border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200 text-sm rounded-md px-3 py-2 outline-none focus:border-indigo-500 transition-colors cursor-pointer">
                            <option v-for="(example, key) in examples" :key="key" :value="key">
                                {{ example.name }}
                            </option>
                        </select>
                    </div>
                    
                    <div class="p-4 flex-1 overflow-y-auto">
                        <h3 class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Features Showcased</h3>
                        <ul class="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                            <li v-for="feat in examples[selectedExample].features" :key="feat" class="flex items-center gap-2">
                                <span class="text-indigo-500">✓</span> {{ feat }}
                            </li>
                        </ul>
                    </div>

                    <div class="p-4 border-t border-gray-200 dark:border-gray-800">
                        <button @click="runCode" class="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md transition-colors flex items-center justify-center gap-2">
                            <span>▶ Re-compile</span>
                        </button>
                    </div>
                </div>

                <!-- Middle Panel (Custom Highlighted Editor) -->
                <div class="flex-1 flex flex-col min-w-0 border-r border-gray-200 dark:border-gray-800 bg-[#fafafa] dark:bg-[#1e1e1e]"
                     :class="mobileTab === 'editor' ? 'flex' : 'hidden md:flex'">
                    <div class="flex items-center justify-between px-4 py-2 bg-gray-100 dark:bg-[#252526] border-b border-gray-200 dark:border-[#333]">
                        <span class="text-xs font-medium text-gray-500 dark:text-gray-400">📄 app.teloce (SFC Mode)</span>
                        <span class="text-xs text-gray-400">{{ lineCount }} lines</span>
                    </div>
                    
                    <!-- Editor Engine (Textarea + Regex Pre) -->
                    <div class="flex-1 relative overflow-hidden group">
                        <div class="absolute inset-0 overflow-auto" @scroll="syncScroll" ref="scrollContainer">
                            <!-- Syntax Highlighting Layer -->
                            <pre class="absolute inset-0 m-0 p-4 font-mono text-[13px] leading-relaxed whitespace-pre pointer-events-none z-0 text-gray-800 dark:text-gray-300" 
                                 aria-hidden="true" 
                                 v-html="highlightedCode"></pre>
                            
                            <!-- Interaction Layer -->
                            <textarea
                                ref="codeEditor"
                                v-model="codeContent"
                                @input="onCodeChange"
                                @keydown.tab.prevent="handleTab"
                                spellcheck="false"
                                class="absolute inset-0 w-full h-full m-0 p-4 font-mono text-[13px] leading-relaxed text-transparent bg-transparent caret-black dark:caret-white resize-none outline-none whitespace-pre z-10 border-none"
                            ></textarea>
                        </div>
                    </div>
                </div>

                <!-- Right Panel (Live Preview & Teloce DevTools) -->
                <div class="flex-1 flex flex-col min-w-0 bg-white dark:bg-black relative"
                     :class="mobileTab === 'preview' ? 'flex' : 'hidden md:flex'">
                    
                    <div class="flex items-center justify-between px-4 py-2 bg-gray-100 dark:bg-[#1a1a1a] border-b border-gray-200 dark:border-[#333]">
                        <span class="text-xs font-medium text-gray-500 dark:text-gray-400">🌍 Live Preview</span>
                        <button @click="refreshPreview" class="text-xs text-gray-500 hover:text-indigo-500 transition-colors">↻ Reload Frame</button>
                    </div>

                    <!-- Iframe Preview -->
                    <div class="flex-1 relative bg-white">
                        <iframe
                            ref="previewIframe"
                            class="w-full h-full border-0"
                            sandbox="allow-scripts allow-modals allow-same-origin"
                        ></iframe>

                        <!-- Human-Friendly Error Overlay -->
                        <div v-if="previewError" class="absolute inset-0 bg-white/90 dark:bg-black/90 backdrop-blur-sm z-20 flex flex-col items-center justify-center p-6">
                            <div class="max-w-md w-full bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 rounded-xl p-5 shadow-2xl">
                                <div class="flex items-center gap-3 mb-3 text-red-600 dark:text-red-400">
                                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                                    <h3 class="font-bold">Teloce Compilation Error</h3>
                                </div>
                                <p class="text-sm font-mono text-gray-800 dark:text-gray-200 mb-4 bg-white dark:bg-black p-3 rounded border border-red-100 dark:border-red-900">{{ previewError }}</p>
                                <div v-if="previewSuggestion" class="text-sm text-gray-600 dark:text-gray-400 bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg border border-yellow-200 dark:border-yellow-900/50">
                                    <span class="font-semibold text-yellow-700 dark:text-yellow-500">💡 Suggestion:</span> {{ previewSuggestion }}
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Teloce DevTools Panel -->
                    <div class="h-48 border-t border-gray-200 dark:border-[#333] bg-gray-50 dark:bg-[#161616] flex flex-col flex-shrink-0">
                        <div class="flex border-b border-gray-200 dark:border-[#333]">
                            <button class="px-4 py-1.5 text-xs font-medium text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-500 bg-white dark:bg-[#1e1e1e]">🛠 DevTools</button>
                            <button class="px-4 py-1.5 text-xs font-medium text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">Console</button>
                        </div>
                        <div class="flex-1 p-4 grid grid-cols-2 gap-4 overflow-auto">
                            <!-- Performance -->
                            <div class="space-y-3">
                                <h4 class="text-xs font-semibold text-gray-400 uppercase">Performance Stats</h4>
                                <div class="grid grid-cols-2 gap-2 text-sm">
                                    <div class="bg-white dark:bg-[#222] p-2 rounded border border-gray-200 dark:border-gray-800">
                                        <div class="text-xs text-gray-500">Simulated FPS</div>
                                        <div class="font-mono text-green-500 font-medium">{{ devTools.fps }}</div>
                                    </div>
                                    <div class="bg-white dark:bg-[#222] p-2 rounded border border-gray-200 dark:border-gray-800">
                                        <div class="text-xs text-gray-500">Reactivity Triggers</div>
                                        <div class="font-mono text-indigo-500 font-medium">{{ devTools.effectCount }}</div>
                                    </div>
                                </div>
                            </div>
                            <!-- Component Tree -->
                            <div class="space-y-3">
                                <h4 class="text-xs font-semibold text-gray-400 uppercase">Inspector</h4>
                                <div class="bg-white dark:bg-[#222] p-2 rounded border border-gray-200 dark:border-gray-800 h-[calc(100%-2rem)] overflow-y-auto font-mono text-xs">
                                    <div class="text-indigo-600 dark:text-indigo-400 flex items-center gap-2">
                                        <span>▼</span> &lt;Root /&gt;
                                    </div>
                                    <div class="pl-4 text-gray-500">
                                        <span class="text-pink-500">state</span>: Reactive Proxy<br>
                                        <span class="text-green-500">status</span>: Mounted
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    `,
    props: {
        theme: { type: String, default: 'dark' },
    },
    data() {
        return {
            selectedExample: 'todo',
            codeContent: '',
            previewError: null,
            previewSuggestion: null,
            statusText: 'Ready',
            mobileTab: 'editor',
            lineCount: 0,
            runTimeout: null,
            devTools: {
                fps: 60,
                effectCount: 0,
            },
            examples: {
                todo: {
                    name: 'Todo List (Complex)',
                    features: ['Keyed Loops (<for>)', 'Two-Way Binding (:model)', 'Computed Properties', 'Dynamic Classes'],
                    template: `<!-- Template -->
<div id="app">
    <h1>{{ title }}</h1>
    <p class="subtitle">Simulating fine-grained DOM patching without VDOM.</p>
    
    <div class="input-group">
        <input :model="newTodo" @keyup.enter="addTodo" placeholder="What needs to be done?" />
        <button @click="addTodo">Add</button>
    </div>
    
    <div class="stats">
        <span>{{ activeTodos }} tasks remaining</span>
    </div>

    <ul>
        <!-- Teloce keyed loop simulation -->
        <for key="id" item="todo" in="todos">
            <li :class="{ done: todo.done }">
                <span @click="toggleTodo(todo.id)" class="text">{{ todo.text }}</span>
                <button @click="deleteTodo(todo.id)" class="delete">✕</button>
            </li>
        </for>
    </ul>
</div>`,
                    script: `<!-- Script -->
var data = {
    title: "Teloce Tasks",
    newTodo: "",
    todos: [
        { id: 1, text: "Learn Teloce Reactivity", done: true },
        { id: 2, text: "Build a mini interpreter", done: true },
        { id: 3, text: "Deploy to production", done: false }
    ],
    
    addTodo: function() {
        if (this.newTodo.trim()) {
            this.todos.push({
                id: Date.now(),
                text: this.newTodo.trim(),
                done: false
            });
            this.newTodo = ""; // Auto updates input via :model
        }
    },
    
    deleteTodo: function(id) {
        this.todos = this.todos.filter(t => t.id !== id);
    },
    
    toggleTodo: function(id) {
        var todo = this.todos.find(t => t.id === id);
        if (todo) todo.done = !todo.done;
    },
    
    computed: {
        activeTodos: function() {
            return this.todos.filter(t => !t.done).length;
        }
    }
};`,
                    style: `<!-- Style -->
#app { max-width: 480px; margin: 0 auto; padding: 30px 20px; font-family: system-ui; }
h1 { color: #111; font-size: 2rem; margin-bottom: 5px; }
.subtitle { color: #666; font-size: 0.9rem; margin-bottom: 25px; }
.input-group { display: flex; gap: 8px; margin-bottom: 15px; }
input { flex: 1; padding: 12px 16px; border: 2px solid #e5e7eb; border-radius: 8px; font-size: 16px; transition: border-color 0.2s; }
input:focus { outline: none; border-color: #6366f1; }
.input-group button { background: #6366f1; color: white; border: none; padding: 0 24px; border-radius: 8px; font-weight: 600; cursor: pointer; }
.input-group button:hover { background: #4f46e5; }
.stats { font-size: 0.85rem; color: #888; margin-bottom: 15px; font-weight: 500; }
ul { list-style: none; padding: 0; display: flex; flex-direction: column; gap: 8px; }
li { display: flex; align-items: center; justify-content: space-between; padding: 12px 16px; background: #f9fafb; border-radius: 8px; border: 1px solid #f3f4f6; transition: all 0.2s; }
li.done { opacity: 0.6; background: #f3f4f6; }
li.done .text { text-decoration: line-through; color: #6b7280; }
.text { flex: 1; cursor: pointer; user-select: none; font-weight: 500; }
.delete { background: none; border: none; color: #ef4444; cursor: pointer; padding: 4px; border-radius: 4px; opacity: 0.5; transition: opacity 0.2s; }
li:hover .delete { opacity: 1; }
li:hover { transform: translateY(-1px); box-shadow: 0 2px 4px rgba(0,0,0,0.05); }`
                },
                counter: {
                    name: 'Counter & Computed',
                    features: ['Event Handling (@click)', 'Computed State', 'Direct Node Patching'],
                    template: `<!-- Template -->\n<div id="app">\n    <h1>{{ title }}</h1>\n    <div class="counter">\n        <button @click="decrement">-</button>\n        <span class="count">{{ count }}</span>\n        <button @click="increment">+</button>\n    </div>\n    <p class="computed">Double: {{ doubleCount }}</p>\n</div>`,
                    script: `<!-- Script -->\nvar data = {\n    title: "Simple Counter",\n    count: 0,\n    increment: function() { this.count++; },\n    decrement: function() { this.count--; },\n    computed: {\n        doubleCount: function() { return this.count * 2; }\n    }\n};`,
                    style: `<!-- Style -->\n#app { text-align: center; font-family: system-ui; padding: 50px; }\n.counter { display: flex; align-items: center; justify-content: center; gap: 20px; margin: 30px 0; }\nbutton { width: 50px; height: 50px; font-size: 24px; border-radius: 25px; border: none; background: #6366f1; color: white; cursor: pointer; }\nbutton:hover { background: #4f46e5; }\n.count { font-size: 48px; font-weight: bold; width: 80px; }\n.computed { color: #666; font-size: 1.2rem; }`
                },
                visibility: {
                    name: 'Conditional Rendering',
                    features: ['Conditional Visibility (:show)', 'Reactive Booleans'],
                    template: `<!-- Template -->\n<div id="app">\n    <button @click="toggle">\n        {{ isVisible ? "Hide Secret" : "Show Secret" }}\n    </button>\n    <div class="box" :show="isVisible">\n        <h2>🎉 You found the secret!</h2>\n        <p>This DOM node's display property is reactive.</p>\n    </div>\n</div>`,
                    script: `<!-- Script -->\nvar data = {\n    isVisible: false,\n    toggle: function() {\n        this.isVisible = !this.isVisible;\n    }\n};`,
                    style: `<!-- Style -->\n#app { text-align: center; padding: 50px; font-family: system-ui; }\nbutton { padding: 12px 24px; background: #111; color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 16px; margin-bottom: 20px; }\n.box { background: #ecfdf5; border: 2px dashed #10b981; padding: 30px; border-radius: 12px; display: inline-block; }\nh2 { color: #047857; margin: 0 0 10px 0; }`
                }
            }
        };
    },
    computed: {
        statusColor() {
            if (this.previewError) return 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30';
            if (this.statusText === 'Compiling...') return 'text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/30';
            return 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30';
        },
        highlightedCode() {
            let code = this.codeContent || '';
            // Basic escaping to prevent HTML injection in the pre tag
            code = code.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
            
            // Highlight Teloce Mustaches {{ var }}
            code = code.replace(/\{\{(.*?)\}\}/g, '<span class="text-yellow-600 dark:text-yellow-400">{{$1}}</span>');
            
            // Highlight SFC HTML Comments
            code = code.replace(/&lt;!--(.*?)--&gt;/g, '<span class="text-gray-400 dark:text-gray-500 italic">&lt;!--$1--&gt;</span>');
            
            // Highlight HTML Tags and Directives
            code = code.replace(/&lt;(\/?[a-z0-9-]+)(.*?)&gt;/gi, (match, p1, p2) => {
                // Inside tags, highlight Teloce directives (@click, :model, etc)
                let attrs = p2
                    .replace(/([@:][a-zA-Z0-9.-]+)=/g, '<span class="text-indigo-600 dark:text-indigo-400 font-bold">$1</span>=')
                    .replace(/([a-zA-Z0-9.-]+)=/g, '<span class="text-blue-500 dark:text-blue-300">$1</span>=') // normal attributes
                    .replace(/"([^"]*)"/g, '<span class="text-green-600 dark:text-green-400">"$1"</span>');
                return `&lt;<span class="text-pink-600 dark:text-pink-400">${p1}</span>${attrs}&gt;`;
            });
            
            // Basic JS highlighting inside script block (naive approach for speed)
            if (code.includes('var data = {') || code.includes('function')) {
                code = code
                    .replace(/\b(var|let|const|function|return|if|else)\b/g, '<span class="text-purple-600 dark:text-purple-400 font-bold">$1</span>')
                    .replace(/\b(this|true|false)\b/g, '<span class="text-orange-500 dark:text-orange-300 font-bold">$1</span>');
            }
            
            return code + '\n'; // Add extra newline to prevent scrolling cutoff
        }
    },
    mounted() {
        this.loadExample();
        
        // Listen for DevTools & Error messages from iframe
        window.addEventListener('message', this.handleIframeMessage);
    },
    beforeUnmount() {
        window.removeEventListener('message', this.handleIframeMessage);
    },
    methods: {
        handleIframeMessage(e) {
            if (e.data && e.data.source === 'teloce-playground') {
                if (e.data.type === 'error') {
                    this.previewError = e.data.payload.msg;
                    this.previewSuggestion = e.data.payload.suggestion;
                    this.statusText = 'Error';
                }
                else if (e.data.type === 'perf') {
                    if (e.data.payload.fps !== undefined) this.devTools.fps = e.data.payload.fps;
                    if (e.data.payload.effectCount !== undefined) this.devTools.effectCount += e.data.payload.effectCount;
                }
            }
        },
        syncScroll(e) {
            // Keep the syntax highlighting pre aligned with textarea
            const target = e.target;
            const pre = target.previousElementSibling;
            if (pre) {
                pre.scrollTop = target.scrollTop;
                pre.scrollLeft = target.scrollLeft;
            }
        },
        handleTab(e) {
            const textarea = e.target;
            const start = textarea.selectionStart;
            const end = textarea.selectionEnd;
            this.codeContent = this.codeContent.substring(0, start) + '    ' + this.codeContent.substring(end);
            this.$nextTick(() => {
                textarea.selectionStart = textarea.selectionEnd = start + 4;
                this.onCodeChange();
            });
        },
        onCodeChange() {
            this.lineCount = this.codeContent.split('\n').length;
            this.statusText = 'Editing...';
            clearTimeout(this.runTimeout);
            this.runTimeout = setTimeout(() => {
                this.runCode();
            }, 800);
        },
        loadExample() {
            const example = this.examples[this.selectedExample];
            if (!example) return;

            this.codeContent = `${example.template}\n\n${example.script}\n\n${example.style}`;
            this.lineCount = this.codeContent.split('\n').length;
            this.runCode();
        },
        refreshPreview() {
            this.runCode();
        },
        runCode() {
            this.previewError = null;
            this.previewSuggestion = null;
            this.statusText = 'Compiling...';
            this.devTools.effectCount = 0;

            try {
                const html = this.compileSFC(this.codeContent);
                this.renderPreview(html);
                setTimeout(() => {
                    if (!this.previewError) this.statusText = 'Active';
                }, 100);
            } catch (err) {
                this.previewError = err.message;
                this.statusText = 'Error';
            }
        },
        compileSFC(code) {
            const templateMatch = code.match(/<!-- Template -->\s*([\s\S]*?)(?=<!-- Script -->|$)/);
            const scriptMatch = code.match(/<!-- Script -->\s*([\s\S]*?)(?=<!-- Style -->|$)/);
            const styleMatch = code.match(/<!-- Style -->\s*([\s\S]*?)$/);

            const template = templateMatch ? templateMatch[1].trim() : '';
            const script = scriptMatch ? scriptMatch[1].trim() : 'var data = {};';
            const style = styleMatch ? styleMatch[1].trim() : '';

            // The absolute core of Teloce injected directly into the iframe preview
            // This is a custom reactive system mimicking Vue/Teloce without a VDOM
            const teloceEngineCore = `
                (function() {
                    window.sendToParent = (type, payload) => {
                        window.parent.postMessage({ source: 'teloce-playground', type, payload }, '*');
                    };
                    window.reportError = (msg, suggestion) => {
                        sendToParent('error', { msg, suggestion });
                    };

                    // --- Mini Reactivity System ---
                    let activeEffect = null;
                    const targetMap = new WeakMap();

                    function track(target, key) {
                        if (activeEffect) {
                            let depsMap = targetMap.get(target);
                            if (!depsMap) targetMap.set(target, (depsMap = new Map()));
                            let dep = depsMap.get(key);
                            if (!dep) depsMap.set(key, (dep = new Set()));
                            dep.add(activeEffect);
                        }
                    }

                    function trigger(target, key) {
                        const depsMap = targetMap.get(target);
                        if (!depsMap) return;
                        const dep = depsMap.get(key);
                        if (dep) {
                            sendToParent('perf', { effectCount: dep.size });
                            // Trigger all dependent effects
                            [...dep].forEach(eff => eff());
                        }
                    }

                    function reactive(target) {
                        if (typeof target !== 'object' || target === null) return target;
                        return new Proxy(target, {
                            get(obj, key, receiver) {
                                track(obj, key);
                                const res = Reflect.get(obj, key, receiver);
                                return typeof res === 'object' ? reactive(res) : res;
                            },
                            set(obj, key, value, receiver) {
                                const oldVal = obj[key];
                                const res = Reflect.set(obj, key, value, receiver);
                                if (oldVal !== value) trigger(obj, key);
                                return res;
                            }
                        });
                    }

                    function effect(fn) {
                        const effectFn = () => {
                            activeEffect = effectFn;
                            try { fn(); }
                            catch (e) { console.error(e); }
                            finally { activeEffect = null; }
                        };
                        effectFn();
                    }

                    // --- Evaluator ---
                    function evalInContext(exp, state, loopVars = {}) {
                        const ctx = { ...state, ...loopVars };
                        // Bind functions to state
                        for (let k in state) {
                            if (typeof state[k] === 'function') ctx[k] = state[k].bind(state);
                        }
                        
                        try {
                            const keys = Object.keys(ctx);
                            const vals = Object.values(ctx);
                            const fn = new Function(...keys, \`return (\${exp})\`);
                            return fn(...vals);
                        } catch(e) {
                            if (e instanceof ReferenceError) {
                                const token = e.message.split(' ')[0];
                                reportError(\`ReferenceError: "\${token}" is not defined.\`, \`Did you forget to add "\${token}" to your data object?\`);
                            }
                            return undefined;
                        }
                    }

                    // --- DOM Compiler (No VDOM, Direct Patching) ---
                    function compile(node, state, loopVars = {}) {
                        if (node.nodeType === 3) { // Text Node
                            const originalText = node.textContent;
                            if (originalText.includes('{{')) {
                                effect(() => {
                                    let newText = originalText;
                                    const matches = originalText.match(/\\{\\{(.*?)\\}\\}/g);
                                    if (matches) {
                                        matches.forEach(m => {
                                            const exp = m.replace(/[{}]/g, '').trim();
                                            const val = evalInContext(exp, state, loopVars);
                                            newText = newText.replace(m, val !== undefined ? val : '');
                                        });
                                    }
                                    node.textContent = newText;
                                });
                            }
                        } else if (node.nodeType === 1) { // Element Node
                            
                            // 1. Handle Keyed Loops (<for key="id" item="todo" in="todos">)
                            if (node.tagName.toLowerCase() === 'for') {
                                const itemKey = node.getAttribute('item');
                                const listKey = node.getAttribute('in');
                                const uidKey = node.getAttribute('key');
                                const template = node.innerHTML;
                                
                                const parent = node.parentNode;
                                const anchor = document.createComment('for-anchor');
                                parent.replaceChild(anchor, node);

                                effect(() => {
                                    const list = evalInContext(listKey, state, loopVars) || [];
                                    
                                    // Remove old rendered items
                                    let curr = anchor.nextSibling;
                                    while (curr && curr._isTeloceLoopItem) {
                                        const next = curr.nextSibling;
                                        parent.removeChild(curr);
                                        curr = next;
                                    }

                                    // Render new items
                                    const fragment = document.createDocumentFragment();
                                    list.forEach(item => {
                                        const wrapper = document.createElement('div');
                                        wrapper.style.display = 'contents';
                                        wrapper._isTeloceLoopItem = true;
                                        wrapper.innerHTML = template;
                                        
                                        const newVars = { ...loopVars, [itemKey]: item };
                                        Array.from(wrapper.childNodes).forEach(c => compile(c, state, newVars));
                                        fragment.appendChild(wrapper);
                                    });
                                    
                                    parent.insertBefore(fragment, anchor.nextSibling);
                                });
                                return; // Stop walking this branch
                            }

                            // 2. Directives
                            Array.from(node.attributes).forEach(attr => {
                                const name = attr.name;
                                const val = attr.value;

                                if (name.startsWith('@')) {
                                    // Event listeners: @click, @keyup.enter
                                    const evtParts = name.slice(1).split('.');
                                    const evtName = evtParts[0];
                                    const modifier = evtParts[1];

                                    node.addEventListener(evtName, (e) => {
                                        if (modifier === 'enter' && e.key !== 'Enter') return;
                                        if (modifier === 'prevent') e.preventDefault();

                                        // Try calling as method first
                                        if (typeof state[val] === 'function') {
                                            if (loopVars[val]) loopVars[val](e); // In case it's in loop scope
                                            else state[val](e);
                                        } else {
                                            // Execute as expression
                                            evalInContext(val, state, loopVars);
                                        }
                                    });
                                }
                                else if (name === ':model') {
                                    // Two way binding
                                    node.addEventListener('input', e => {
                                        // Simplified set for root properties
                                        state[val] = e.target.value;
                                    });
                                    effect(() => {
                                        node.value = evalInContext(val, state, loopVars);
                                    });
                                }
                                else if (name === ':show') {
                                    effect(() => {
                                        node.style.display = evalInContext(val, state, loopVars) ? '' : 'none';
                                    });
                                }
                                else if (name === ':class') {
                                    effect(() => {
                                        const clsObj = evalInContext(val, state, loopVars);
                                        if (clsObj && typeof clsObj === 'object') {
                                            for (let k in clsObj) {
                                                if (clsObj[k]) node.classList.add(k);
                                                else node.classList.remove(k);
                                            }
                                        }
                                    });
                                }
                            });

                            // Recursively compile children
                            Array.from(node.childNodes).forEach(c => compile(c, state, loopVars));
                        }
                    }

                    // --- Bootstrapper ---
                    window.teloce = {
                        createApp(options) {
                            return {
                                mount(selector) {
                                    const root = document.querySelector(selector);
                                    if (!root) return reportError(\`Selector "\${selector}" not found.\`, "Ensure your template has a <div id='app'> matching the mount target.");
                                    
                                    const stateObj = { ...options };
                                    const computedObj = options.computed || {};
                                    delete stateObj.computed;

                                    const state = reactive(stateObj);

                                    // Wire up computed properties to reactive state
                                    for (let key in computedObj) {
                                        effect(() => {
                                            state[key] = computedObj[key].call(state);
                                        });
                                    }

                                    compile(root, state);

                                    // Setup FPS loop for DevTools
                                    let frames = 0, lastTime = performance.now();
                                    function loop() {
                                        frames++;
                                        const now = performance.now();
                                        if (now - lastTime >= 1000) {
                                            sendToParent('perf', { fps: frames });
                                            frames = 0;
                                            lastTime = now;
                                        }
                                        requestAnimationFrame(loop);
                                    }
                                    loop();
                                }
                            };
                        }
                    };
                })();
            `;

            return `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Teloce Runtime</title>
    <style>${style}</style>
</head>
<body>
    ${template}
    <script>
        // Inject Core Engine
        ${teloceEngineCore}
        
        // Execute User Script
        try {
            ${script}
            // Auto mount if data exists
            if (typeof data !== 'undefined') {
                teloce.createApp(data).mount('#app');
            }
        } catch(e) {
            window.reportError(e.message, "Syntax error in your script block.");
        }
    </script>
</body>
</html>`;
        },
        renderPreview(html) {
            const iframe = this.$refs.previewIframe;
            if (!iframe) return;
            const doc = iframe.contentDocument || iframe.contentWindow.document;
            doc.open();
            doc.write(html);
            doc.close();
        }
    }
};

export { PlaygroundPage };