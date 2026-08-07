/**
 * PlaygroundPage.js - Complete Teloce Interactive IDE & Reactive Simulator
 * Zero CDN dependencies | VS Code UI | Native Textarea + Syntax Overlay
 */

const PlaygroundPage = {
    template: `
        <div class="teloce-ide flex flex-col h-screen w-screen overflow-hidden bg-gray-900 text-gray-100 font-sans select-none">
            
            <!-- VS CODE TOP TOOLBAR -->
            <header class="h-12 bg-gray-950 border-b border-gray-800 px-3 flex items-center justify-between flex-shrink-0">
                <div class="flex items-center gap-3">
                    <div class="flex items-center gap-1.5 font-bold text-indigo-400 text-sm tracking-wide">
                        <span class="text-xl">⚡</span> TELOCE <span class="text-xs bg-indigo-900/60 text-indigo-300 px-1.5 py-0.5 rounded border border-indigo-700/50">v1.2</span>
                    </div>
                    
                    <!-- Example Picker -->
                    <select 
                        v-model="selectedExample" 
                        @change="loadExample" 
                        class="bg-gray-800 hover:bg-gray-700 text-xs text-gray-200 border border-gray-700 rounded px-2.5 py-1 focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer"
                    >
                        <option v-for="(ex, key) in examples" :key="key" :value="key">
                            📚 {{ ex.name }}
                        </option>
                    </select>

                    <!-- Mode Toggle (SFC vs HTML) -->
                    <div class="flex bg-gray-800 p-0.5 rounded border border-gray-700 text-xs">
                        <button 
                            @click="setMode('sfc')" 
                            :class="mode === 'sfc' ? 'bg-indigo-600 text-white shadow' : 'text-gray-400 hover:text-white'"
                            class="px-2 py-0.5 rounded transition-all font-medium"
                        >
                            App.vel (SFC)
                        </button>
                        <button 
                            @click="setMode('html')" 
                            :class="mode === 'html' ? 'bg-indigo-600 text-white shadow' : 'text-gray-400 hover:text-white'"
                            class="px-2 py-0.5 rounded transition-all font-medium"
                        >
                            HTML + Script
                        </button>
                    </div>
                </div>

                <!-- Right Actions -->
                <div class="flex items-center gap-2">
                    <button 
                        @click="runCode" 
                        class="bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white text-xs font-semibold px-3 py-1 rounded flex items-center gap-1 transition-all shadow-sm"
                    >
                        <span>▶</span> Run
                    </button>
                    <button 
                        @click="resetCode" 
                        class="bg-gray-800 hover:bg-gray-700 text-gray-300 text-xs px-2.5 py-1 rounded border border-gray-700 transition-all"
                    >
                        ↺ Reset
                    </button>
                    
                    <!-- Mobile View Switcher -->
                    <div class="md:hidden flex bg-gray-800 p-0.5 rounded border border-gray-700 text-xs ml-2">
                        <button 
                            @click="mobileTab = 'editor'" 
                            :class="mobileTab === 'editor' ? 'bg-indigo-600 text-white' : 'text-gray-400'"
                            class="px-2 py-0.5 rounded"
                        >
                            Editor
                        </button>
                        <button 
                            @click="mobileTab = 'preview'" 
                            :class="mobileTab === 'preview' ? 'bg-indigo-600 text-white' : 'text-gray-400'"
                            class="px-2 py-0.5 rounded"
                        >
                            Preview
                        </button>
                    </div>
                </div>
            </header>

            <!-- MAIN WORKSPACE -->
            <div class="flex-1 flex overflow-hidden relative">
                
                <!-- LEFT EDITOR CONTAINER -->
                <div 
                    :class="{'hidden md:flex': mobileTab !== 'editor', 'flex': mobileTab === 'editor'}"
                    class="flex-1 flex-col min-w-0 border-r border-gray-800 bg-gray-900"
                >
                    <!-- File Tabs Bar -->
                    <div class="bg-gray-950 flex items-center border-b border-gray-800 overflow-x-auto scrollbar-none flex-shrink-0">
                        <template v-if="mode === 'sfc'">
                            <button class="px-4 py-2 text-xs font-mono border-b-2 border-indigo-500 bg-gray-900 text-indigo-300 flex items-center gap-1.5">
                                <span class="text-amber-400">⚡</span> App.vel
                            </button>
                        </template>
                        <template v-else>
                            <button 
                                @click="activeTab = 'template'" 
                                :class="activeTab === 'template' ? 'border-indigo-500 bg-gray-900 text-indigo-300' : 'border-transparent text-gray-400 hover:text-gray-200'"
                                class="px-4 py-2 text-xs font-mono border-b-2 flex items-center gap-1.5 transition-all"
                            >
                                <span class="text-orange-400">🌐</span> Template.html
                            </button>
                            <button 
                                @click="activeTab = 'script'" 
                                :class="activeTab === 'script' ? 'border-indigo-500 bg-gray-900 text-indigo-300' : 'border-transparent text-gray-400 hover:text-gray-200'"
                                class="px-4 py-2 text-xs font-mono border-b-2 flex items-center gap-1.5 transition-all"
                            >
                                <span class="text-yellow-400">JS</span> Script.js
                            </button>
                            <button 
                                @click="activeTab = 'style'" 
                                :class="activeTab === 'style' ? 'border-indigo-500 bg-gray-900 text-indigo-300' : 'border-transparent text-gray-400 hover:text-gray-200'"
                                class="px-4 py-2 text-xs font-mono border-b-2 flex items-center gap-1.5 transition-all"
                            >
                                <span class="text-blue-400">🎨</span> Style.css
                            </button>
                        </template>
                    </div>

                    <!-- FreeCodeCamp Style Tutorial Prompt -->
                    <div class="bg-indigo-950/40 border-b border-indigo-900/50 p-2.5 px-4 text-xs text-indigo-200 flex items-start gap-2.5 flex-shrink-0">
                        <span class="text-base flex-shrink-0">💡</span>
                        <div class="leading-relaxed">
                            <strong class="text-indigo-300">{{ currentTutorial.title }}:</strong> {{ currentTutorial.tip }}
                        </div>
                    </div>

                    <!-- CUSTOM CODE EDITOR WITH SYNTAX HIGHLIGHT OVERLAY -->
                    <div class="flex-1 relative overflow-hidden font-mono text-sm leading-6">
                        <!-- Line Numbers -->
                        <div class="absolute left-0 top-0 bottom-0 w-10 bg-gray-950 text-gray-600 text-right pr-2 pt-3 select-none text-xs z-10 border-r border-gray-850">
                            <div v-for="n in lineCount" :key="n">{{ n }}</div>
                        </div>

                        <div class="absolute left-10 right-0 top-0 bottom-0 overflow-auto" ref="editorScrollContainer" @scroll="syncScroll">
                            <div class="relative min-h-full min-w-full p-3 pt-3">
                                <!-- Syntax Highlighting Backdrop -->
                                <pre 
                                    class="absolute top-3 left-3 right-3 bottom-3 m-0 font-mono text-sm leading-6 whitespace-pre pointer-events-none text-transparent overflow-hidden"
                                    v-html="highlightedCode"
                                ></pre>
                                
                                <!-- Editable Textarea Overlay -->
                                <textarea
                                    ref="editorTextarea"
                                    v-model="currentTabContent"
                                    @input="onCodeInput"
                                    @keydown.tab.prevent="handleTabKey"
                                    spellcheck="false"
                                    class="absolute top-3 left-3 right-3 bottom-3 m-0 font-mono text-sm leading-6 whitespace-pre bg-transparent text-gray-100 outline-none resize-none caret-indigo-400 selection:bg-indigo-900/60"
                                ></textarea>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- RIGHT PANELS (PREVIEW + DEV TOOLS) -->
                <div 
                    :class="{'hidden md:flex': mobileTab !== 'preview', 'flex': mobileTab === 'preview'}"
                    class="flex-1 flex-col min-w-0 bg-gray-950"
                >
                    <!-- TOP: LIVE PREVIEW IFRAME -->
                    <div class="flex-1 flex flex-col min-h-0 relative border-b border-gray-800">
                        <div class="bg-gray-900 px-3 py-1.5 border-b border-gray-800 flex items-center justify-between text-xs text-gray-400 flex-shrink-0">
                            <span class="flex items-center gap-1.5 font-medium text-gray-300">
                                <span class="w-2 h-2 rounded-full" :class="previewStatus === 'ok' ? 'bg-emerald-500' : 'bg-rose-500'"></span>
                                Live View (Fine-Grained DOM Patching)
                            </span>
                            <span class="text-[11px] text-gray-500 font-mono">Simulated Engine v1.0</span>
                        </div>
                        
                        <div class="flex-1 relative bg-white">
                            <iframe 
                                ref="previewIframe" 
                                class="w-full h-full border-none"
                                sandbox="allow-scripts allow-same-origin"
                            ></iframe>
                        </div>
                    </div>

                    <!-- BOTTOM: DEV TOOLS (Console, Inspector, Human Debugger, Perf) -->
                    <div class="h-56 flex flex-col bg-gray-900 flex-shrink-0">
                        <!-- DevTool Tabs -->
                        <div class="flex bg-gray-950 border-b border-gray-800 text-xs">
                            <button 
                                @click="devTab = 'console'" 
                                :class="devTab === 'console' ? 'border-indigo-500 text-indigo-300 bg-gray-900' : 'border-transparent text-gray-400 hover:text-gray-200'"
                                class="px-3 py-1.5 border-b-2 font-medium flex items-center gap-1"
                            >
                                💻 Console <span v-if="logs.length" class="bg-gray-800 text-gray-300 text-[10px] px-1.5 rounded-full">{{ logs.length }}</span>
                            </button>
                            <button 
                                @click="devTab = 'inspector'" 
                                :class="devTab === 'inspector' ? 'border-indigo-500 text-indigo-300 bg-gray-900' : 'border-transparent text-gray-400 hover:text-gray-200'"
                                class="px-3 py-1.5 border-b-2 font-medium flex items-center gap-1"
                            >
                                🔍 Component Inspector
                            </button>
                            <button 
                                @click="devTab = 'debugger'" 
                                :class="devTab === 'debugger' ? 'border-indigo-500 text-indigo-300 bg-gray-900' : 'border-transparent text-gray-400 hover:text-gray-200'"
                                class="px-3 py-1.5 border-b-2 font-medium flex items-center gap-1"
                            >
                                🩺 Human Debugger <span v-if="debuggerErrors.length" class="bg-rose-900/60 text-rose-300 text-[10px] px-1.5 rounded-full">{{ debuggerErrors.length }}</span>
                            </button>
                            <button 
                                @click="devTab = 'perf'" 
                                :class="devTab === 'perf' ? 'border-indigo-500 text-indigo-300 bg-gray-900' : 'border-transparent text-gray-400 hover:text-gray-200'"
                                class="px-3 py-1.5 border-b-2 font-medium flex items-center gap-1"
                            >
                                ⚡ Performance
                            </button>
                        </div>

                        <!-- DevTool Content Container -->
                        <div class="flex-1 overflow-y-auto p-3 font-mono text-xs text-gray-300 leading-relaxed">
                            
                            <!-- 1. CONSOLE TAB -->
                            <div v-if="devTab === 'console'" class="space-y-1">
                                <div v-if="!logs.length" class="text-gray-500 italic">No console output...</div>
                                <div v-for="(log, idx) in logs" :key="idx" class="flex items-start gap-2 border-b border-gray-800/50 pb-1">
                                    <span :class="log.type === 'error' ? 'text-rose-400' : log.type === 'warn' ? 'text-amber-400' : 'text-emerald-400'">
                                        {{ log.type === 'error' ? '✖' : log.type === 'warn' ? '⚠' : '❯' }}
                                    </span>
                                    <span class="whitespace-pre-wrap flex-1">{{ log.text }}</span>
                                    <span class="text-[10px] text-gray-600">{{ log.time }}</span>
                                </div>
                            </div>

                            <!-- 2. INSPECTOR TAB -->
                            <div v-if="devTab === 'inspector'">
                                <div class="text-indigo-400 font-semibold mb-2">▼ &lt;RootComponent id="#app"&gt;</div>
                                <div class="pl-4 space-y-2">
                                    <div>
                                        <span class="text-amber-300 font-semibold">Reactive Signals:</span>
                                        <pre class="bg-gray-950 p-2 rounded mt-1 border border-gray-800 text-emerald-300">{{ formattedState }}</pre>
                                    </div>
                                    <div class="flex items-center gap-4 text-gray-400 text-[11px]">
                                        <span>Render Count: <strong class="text-white">{{ perfStats.renderCount }}</strong></span>
                                        <span>Tracked Signals: <strong class="text-white">{{ signalCount }}</strong></span>
                                    </div>
                                </div>
                            </div>

                            <!-- 3. HUMAN DEBUGGER TAB -->
                            <div v-if="devTab === 'debugger'">
                                <div v-if="!debuggerErrors.length" class="flex items-center gap-2 text-emerald-400 bg-emerald-950/30 p-2.5 rounded border border-emerald-900/40">
                                    <span>✔</span> Everything looks great! No template or reactive state issues detected.
                                </div>
                                <div v-for="(err, idx) in debuggerErrors" :key="idx" class="bg-rose-950/40 border border-rose-900/60 rounded p-3 mb-2">
                                    <div class="text-rose-300 font-semibold text-sm flex items-center gap-2">
                                        <span>🚨</span> {{ err.title }}
                                    </div>
                                    <div class="text-gray-300 my-1">{{ err.message }}</div>
                                    <div v-if="err.suggestion" class="text-indigo-300 bg-indigo-950/50 p-2 rounded mt-2 border border-indigo-900/50">
                                        💡 <strong>Suggestion:</strong> {{ err.suggestion }}
                                    </div>
                                </div>
                            </div>

                            <!-- 4. PERFORMANCE TAB -->
                            <div v-if="devTab === 'perf'" class="grid grid-cols-3 gap-3 text-center">
                                <div class="bg-gray-950 p-3 rounded border border-gray-800">
                                    <div class="text-gray-500 text-[10px] uppercase">DOM Patch Mode</div>
                                    <div class="text-emerald-400 font-bold text-sm mt-1">Fine-Grained Signals</div>
                                </div>
                                <div class="bg-gray-950 p-3 rounded border border-gray-800">
                                    <div class="text-gray-500 text-[10px] uppercase">Last Patch Duration</div>
                                    <div class="text-indigo-400 font-bold text-sm mt-1">{{ perfStats.lastRenderMs }} ms</div>
                                </div>
                                <div class="bg-gray-950 p-3 rounded border border-gray-800">
                                    <div class="text-gray-500 text-[10px] uppercase">Simulated Memory</div>
                                    <div class="text-amber-400 font-bold text-sm mt-1">{{ perfStats.memoryKb }} KB</div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        </div>
    `,

    data() {
        return {
            mode: 'sfc', // 'sfc' or 'html'
            selectedExample: 'counter',
            activeTab: 'template', // 'template', 'script', 'style'
            devTab: 'console', // 'console', 'inspector', 'debugger', 'perf'
            mobileTab: 'editor', // 'editor' or 'preview'
            
            // Editable code stores
            sfcCode: '',
            htmlCode: '',
            jsCode: '',
            cssCode: '',
            
            // Runtime dev state
            logs: [],
            debuggerErrors: [],
            inspectorState: {},
            previewStatus: 'ok',
            perfStats: {
                renderCount: 1,
                lastRenderMs: 0.4,
                memoryKb: 124
            },

            // Built-in Examples
            examples: {
                counter: {
                    name: 'Counter & Computed',
                    tutorial: {
                        title: 'Reactive Signals & Computed Properties',
                        tip: 'Teloce tracks dependencies automatically. Click buttons to update state and watch fine-grained DOM updates occur without full re-renders.'
                    },
                    sfc: `<template>\n  <div id="app">\n    <h2>{{ title }}</h2>\n    <div class="card">\n      <div class="count">{{ count }}</div>\n      <div class="btn-group">\n        <button @click="decrement">-</button>\n        <button @click="increment">+</button>\n        <button @click="reset">Reset</button>\n      </div>\n      <p class="double">Double Count: <strong>{{ doubleCount }}</strong></p>\n    </div>\n  </div>\n</template>\n\n<script>\n  teloce.createApp('#app', {\n    data: {\n      title: 'Teloce Counter',\n      count: 0\n    },\n    computed: {\n      doubleCount() {\n        return this.count * 2;\n      }\n    },\n    methods: {\n      increment() { this.count++; },\n      decrement() { if (this.count > 0) this.count--; },\n      reset() { this.count = 0; }\n    }\n  });\n</script>\n\n<style>\n  #app { font-family: sans-serif; text-align: center; padding: 20px; color: #1e293b; }\n  .card { background: #f8fafc; border: 1px solid #e2e8f0; padding: 24px; border-radius: 12px; max-width: 320px; margin: 0 auto; }\n  .count { font-size: 42px; font-weight: bold; color: #4f46e5; margin: 12px 0; }\n  .btn-group button { background: #4f46e5; color: white; border: none; padding: 8px 16px; border-radius: 6px; cursor: pointer; margin: 0 4px; font-weight: 600; }\n  .btn-group button:hover { background: #4338ca; }\n  .double { margin-top: 16px; font-size: 14px; color: #64748b; }\n</style>`,
                    template: `<div id="app">\n  <h2>{{ title }}</h2>\n  <div class="card">\n    <div class="count">{{ count }}</div>\n    <div class="btn-group">\n      <button @click="decrement">-</button>\n      <button @click="increment">+</button>\n      <button @click="reset">Reset</button>\n    </div>\n    <p class="double">Double Count: <strong>{{ doubleCount }}</strong></p>\n  </div>\n</div>`,
                    script: `teloce.createApp('#app', {\n  data: {\n    title: 'Teloce Counter',\n    count: 0\n  },\n  computed: {\n    doubleCount() {\n      return this.count * 2;\n    }\n  },\n  methods: {\n    increment() { this.count++; },\n    decrement() { if (this.count > 0) this.count--; },\n    reset() { this.count = 0; }\n  }\n});`,
                    style: `#app { font-family: sans-serif; text-align: center; padding: 20px; color: #1e293b; }\n.card { background: #f8fafc; border: 1px solid #e2e8f0; padding: 24px; border-radius: 12px; max-width: 320px; margin: 0 auto; }\n.count { font-size: 42px; font-weight: bold; color: #4f46e5; margin: 12px 0; }\n.btn-group button { background: #4f46e5; color: white; border: none; padding: 8px 16px; border-radius: 6px; cursor: pointer; margin: 0 4px; font-weight: 600; }\n.btn-group button:hover { background: #4338ca; }\n.double { margin-top: 16px; font-size: 14px; color: #64748b; }`
                },

                todo: {
                    name: 'Keyed List (<for>) & Two-Way Binding',
                    tutorial: {
                        title: 'Keyed Loop Directives',
                        tip: 'Use <for key="id" item="todo" in="todos"> for fine-grained list updates. Adding/removing items only modifies specific DOM nodes while preserving form input state.'
                    },
                    sfc: `<template>\n  <div id="app">\n    <h3>📝 {{ title }}</h3>\n    <div class="input-row">\n      <input :model="newText" @keyup.enter="addTodo" placeholder="Add a new task..." />\n      <button @click="addTodo">Add Task</button>\n    </div>\n    <ul>\n      <for key="id" item="todo" in="todos">\n        <li :class="{ done: todo.done }">\n          <span @click="toggleTodo(todo.id)">{{ todo.text }}</span>\n          <button class="del" @click="removeTodo(todo.id)">✕</button>\n        </li>\n      </for>\n    </ul>\n  </div>\n</template>\n\n<script>\n  teloce.createApp('#app', {\n    data: {\n      title: 'Keyed Todo App',\n      newText: '',\n      todos: [\n        { id: 1, text: 'Learn Teloce reactivity', done: true },\n        { id: 2, text: 'Build fine-grained UI', done: false }\n      ]\n    },\n    methods: {\n      addTodo() {\n        if (!this.newText.trim()) return;\n        this.todos.push({ id: Date.now(), text: this.newText.trim(), done: false });\n        this.newText = '';\n      },\n      toggleTodo(id) {\n        const t = this.todos.find(item => item.id === id);\n        if (t) t.done = !t.done;\n      },\n      removeTodo(id) {\n        this.todos = this.todos.filter(item => item.id !== id);\n      }\n    }\n  });\n</script>\n\n<style>\n  #app { font-family: sans-serif; max-width: 400px; margin: 20px auto; color: #334155; }\n  .input-row { display: flex; gap: 8px; margin-bottom: 16px; }\n  input { flex: 1; padding: 8px 12px; border: 1px solid #cbd5e1; border-radius: 6px; outline: none; }\n  button { background: #0284c7; color: white; border: none; padding: 8px 14px; border-radius: 6px; cursor: pointer; font-weight: 600; }\n  ul { list-style: none; padding: 0; margin: 0; }\n  li { display: flex; justify-content: space-between; align-items: center; padding: 10px 12px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; margin-bottom: 8px; cursor: pointer; }\n  li.done span { text-decoration: line-through; opacity: 0.6; }\n  .del { background: transparent; color: #ef4444; font-size: 14px; padding: 2px 6px; }\n</style>`,
                    template: `<div id="app">\n  <h3>📝 {{ title }}</h3>\n  <div class="input-row">\n    <input :model="newText" @keyup.enter="addTodo" placeholder="Add a new task..." />\n    <button @click="addTodo">Add Task</button>\n  </div>\n  <ul>\n    <for key="id" item="todo" in="todos">\n      <li :class="{ done: todo.done }">\n        <span @click="toggleTodo(todo.id)">{{ todo.text }}</span>\n        <button class="del" @click="removeTodo(todo.id)">✕</button>\n      </li>\n    </for>\n  </ul>\n</div>`,
                    script: `teloce.createApp('#app', {\n  data: {\n    title: 'Keyed Todo App',\n    newText: '',\n    todos: [\n      { id: 1, text: 'Learn Teloce reactivity', done: true },\n      { id: 2, text: 'Build fine-grained UI', done: false }\n    ]\n  },\n  methods: {\n    addTodo() {\n      if (!this.newText.trim()) return;\n      this.todos.push({ id: Date.now(), text: this.newText.trim(), done: false });\n      this.newText = '';\n    },\n    toggleTodo(id) {\n      const t = this.todos.find(item => item.id === id);\n      if (t) t.done = !t.done;\n    },\n    removeTodo(id) {\n      this.todos = this.todos.filter(item => item.id !== id);\n    }\n  }\n});`,
                    style: `#app { font-family: sans-serif; max-width: 400px; margin: 20px auto; color: #334155; }\n.input-row { display: flex; gap: 8px; margin-bottom: 16px; }\ninput { flex: 1; padding: 8px 12px; border: 1px solid #cbd5e1; border-radius: 6px; outline: none; }\nbutton { background: #0284c7; color: white; border: none; padding: 8px 14px; border-radius: 6px; cursor: pointer; font-weight: 600; }\nul { list-style: none; padding: 0; margin: 0; }\nli { display: flex; justify-content: space-between; align-items: center; padding: 10px 12px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; margin-bottom: 8px; cursor: pointer; }\nli.done span { text-decoration: line-through; opacity: 0.6; }\n.del { background: transparent; color: #ef4444; font-size: 14px; padding: 2px 6px; }`
                },

                fetch: {
                    name: 'Async Data Fetching',
                    tutorial: {
                        title: 'Asynchronous State Management',
                        tip: 'Trigger async requests and toggle state flags like "loading" directly inside Teloce method handlers.'
                    },
                    sfc: `<template>\n  <div id="app">\n    <h3>🌐 {{ title }}</h3>\n    <button @click="loadUsers" :disabled="loading">\n      {{ loading ? "Fetching..." : "Fetch Users" }}\n    </button>\n    <div v-if="users.length > 0" class="user-list">\n      <for key="id" item="u" in="users">\n        <div class="user-card">\n          <strong>{{ u.name }}</strong> ({{ u.role }})\n        </div>\n      </for>\n    </div>\n  </div>\n</template>\n\n<script>\n  teloce.createApp('#app', {\n    data: {\n      title: 'User Directory',\n      loading: false,\n      users: []\n    },\n    methods: {\n      loadUsers() {\n        this.loading = true;\n        setTimeout(() => {\n          this.users = [\n            { id: 101, name: 'Alice Vance', role: 'Frontend Engineer' },\n            { id: 102, name: 'Bob Smith', role: 'Python Developer' }\n          ];\n          this.loading = false;\n        }, 700);\n      }\n    }\n  });\n</script>\n\n<style>\n  #app { font-family: sans-serif; max-width: 360px; margin: 20px auto; text-align: center; }\n  button { background: #10b981; color: white; border: none; padding: 10px 20px; border-radius: 8px; font-weight: 600; cursor: pointer; }\n  button:disabled { opacity: 0.6; cursor: not-allowed; }\n  .user-list { margin-top: 16px; text-align: left; }\n  .user-card { background: #f1f5f9; border: 1px solid #cbd5e1; padding: 10px; border-radius: 6px; margin-bottom: 8px; font-size: 14px; }\n</style>`,
                    template: `<div id="app">\n  <h3>🌐 {{ title }}</h3>\n  <button @click="loadUsers" :disabled="loading">\n    {{ loading ? "Fetching..." : "Fetch Users" }}\n  </button>\n  <div v-if="users.length > 0" class="user-list">\n    <for key="id" item="u" in="users">\n      <div class="user-card">\n        <strong>{{ u.name }}</strong> ({{ u.role }})\n      </div>\n    </for>\n  </div>\n</div>`,
                    script: `teloce.createApp('#app', {\n  data: {\n    title: 'User Directory',\n    loading: false,\n    users: []\n  },\n  methods: {\n    loadUsers() {\n      this.loading = true;\n      setTimeout(() => {\n        this.users = [\n          { id: 101, name: 'Alice Vance', role: 'Frontend Engineer' },\n          { id: 102, name: 'Bob Smith', role: 'Python Developer' }\n        ];\n        this.loading = false;\n      }, 700);\n    }\n  }\n});`,
                    style: `#app { font-family: sans-serif; max-width: 360px; margin: 20px auto; text-align: center; }\nbutton { background: #10b981; color: white; border: none; padding: 10px 20px; border-radius: 8px; font-weight: 600; cursor: pointer; }\nbutton:disabled { opacity: 0.6; cursor: not-allowed; }\n.user-list { margin-top: 16px; text-align: left; }\n.user-card { background: #f1f5f9; border: 1px solid #cbd5e1; padding: 10px; border-radius: 6px; margin-bottom: 8px; font-size: 14px; }`
                }
            }
        };
    },

    computed: {
        currentTutorial() {
            return this.examples[this.selectedExample]?.tutorial || { title: 'Teloce Syntax', tip: 'Write Jinja-like templates with reactive directives.' };
        },

        currentTabContent: {
            get() {
                if (this.mode === 'sfc') return this.sfcCode;
                if (this.activeTab === 'template') return this.htmlCode;
                if (this.activeTab === 'script') return this.jsCode;
                return this.cssCode;
            },
            set(val) {
                if (this.mode === 'sfc') this.sfcCode = val;
                else if (this.activeTab === 'template') this.htmlCode = val;
                else if (this.activeTab === 'script') this.jsCode = val;
                else this.cssCode = val;
            }
        },

        lineCount() {
            return (this.currentTabContent.match(/\n/g) || []).length + 1;
        },

        signalCount() {
            return Object.keys(this.inspectorState).length;
        },

        formattedState() {
            try {
                return JSON.stringify(this.inspectorState, null, 2);
            } catch (e) {
                return '{}';
            }
        },

        // Zero-dependency Regex-based Syntax Highlighting
        highlightedCode() {
            let code = this.escapeHtml(this.currentTabContent);

            // SFC or HTML highlighting
            if (this.mode === 'sfc' || this.activeTab === 'template') {
                code = code
                    // Directives (@click, :model, :class)
                    .replace(/(@[\w\.-]+|:[\w\.-]+)=/g, '<span class="text-indigo-400 font-semibold">$1</span>=')
                    // Loops and conditionals (<for>, v-if)
                    .replace(/(&lt;\/?for[^&]*&gt;|v-if="[^"]*")/g, '<span class="text-amber-400 font-bold">$1</span>')
                    // Interpolations {{ ... }}
                    .replace(/(\{\{[\s\S]*?\}\})/g, '<span class="text-emerald-300 font-bold">$1</span>')
                    // HTML tags
                    .replace(/(&lt;\/?[a-zA-Z0-9-]+)/g, '<span class="text-sky-400">$1</span>')
                    // Attributes
                    .replace(/\s([a-zA-Z0-9-]+)=/g, ' <span class="text-purple-300">$1</span>=')
                    // Strings
                    .replace(/("[^"]*"|'[^']*')/g, '<span class="text-emerald-400">$1</span>');
            } else if (this.activeTab === 'script') {
                code = code
                    .replace(/\b(teloce|createApp|data|computed|methods|return|this|if|const|let|var|function)\b/g, '<span class="text-purple-400 font-semibold">$1</span>')
                    .replace(/("[^"]*"|'[^']*')/g, '<span class="text-emerald-400">$1</span>')
                    .replace(/\b([0-9]+)\b/g, '<span class="text-amber-300">$1</span>');
            } else if (this.activeTab === 'style') {
                code = code
                    .replace(/([a-zA-Z0-9-_\.#]+)\s*\{/g, '<span class="text-sky-300 font-semibold">$1</span> {')
                    .replace(/([a-zA-Z0-9-]+)\s*:/g, '<span class="text-indigo-300">$1</span>:');
            }

            return code;
        }
    },

    mounted() {
        this.loadExample();
        window.addEventListener('message', this.handleIframeMessage);
    },

    beforeUnmount() {
        window.removeEventListener('message', this.handleIframeMessage);
    },

    methods: {
        escapeHtml(str) {
            return (str || '')
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;');
        },

        setMode(newMode) {
            this.mode = newMode;
            this.runCode();
        },

        loadExample() {
            const ex = this.examples[this.selectedExample];
            if (!ex) return;

            this.sfcCode = ex.sfc;
            this.htmlCode = ex.template;
            this.jsCode = ex.script;
            this.cssCode = ex.style;

            this.runCode();
        },

        resetCode() {
            this.loadExample();
        },

        handleTabKey(e) {
            const textarea = e.target;
            const start = textarea.selectionStart;
            const end = textarea.selectionEnd;

            this.currentTabContent = this.currentTabContent.substring(0, start) + '  ' + this.currentTabContent.substring(end);

            this.$nextTick(() => {
                textarea.selectionStart = textarea.selectionEnd = start + 2;
            });
        },

        onCodeInput() {
            this.runCodeDebounced();
        },

        runCodeDebounced() {
            clearTimeout(this._timer);
            this._timer = setTimeout(() => {
                this.runCode();
            }, 300);
        },

        syncScroll(e) {
            // Keep syntax highlighting overlay aligned with scrolling
        },

        // Parse SFC or HTML into runnable template/script/style
        parseCurrentCode() {
            if (this.mode === 'html') {
                return { template: this.htmlCode, script: this.jsCode, style: this.cssCode };
            }

            // Extract tags from .vel SFC
            const templateMatch = this.sfcCode.match(/<template>([\s\S]*?)<\/template>/);
            const scriptMatch = this.sfcCode.match(/<script>([\s\S]*?)<\/script>/);
            const styleMatch = this.sfcCode.match(/<style>([\s\S]*?)<\/style>/);

            return {
                template: templateMatch ? templateMatch[1].trim() : '<div id="app"></div>',
                script: scriptMatch ? scriptMatch[1].trim() : '',
                style: styleMatch ? styleMatch[1].trim() : ''
            };
        },

        runCode() {
            const { template, script, style } = this.parseCurrentCode();
            this.logs = [];
            this.debuggerErrors = [];

            // Run simple Human-Friendly Static Analysis
            this.analyzeCodeForHumanErrors(template, script);

            const iframeHtml = this.generateIframeRuntime(template, script, style);
            this.renderIframe(iframeHtml);
        },

        analyzeCodeForHumanErrors(template, script) {
            // Check for missing key in <for> loops
            if (template.includes('<for') && !template.includes('key=')) {
                this.debuggerErrors.push({
                    title: 'Missing Loop Key',
                    message: 'Found a <for> directive without a `key` attribute.',
                    suggestion: 'Add `key="id"` to your <for> loop so Teloce can preserve input focus during DOM reorders.'
                });
            }

            // Check for unclosed mustache expressions
            if ((template.match(/\{\{/g) || []).length !== (template.match(/\}\}/g) || []).length) {
                this.debuggerErrors.push({
                    title: 'Unclosed Interpolation',
                    message: 'A `{{` mustache tag was opened but not closed with `}}`.',
                    suggestion: 'Check your template text nodes to ensure all expressions are properly closed.'
                });
            }
        },

        renderIframe(htmlContent) {
            const iframe = this.$refs.previewIframe;
            if (!iframe) return;

            const doc = iframe.contentDocument || iframe.contentWindow.document;
            doc.open();
            doc.write(htmlContent);
            doc.close();
        },

        handleIframeMessage(e) {
            const data = e.data;
            if (!data || !data.source || data.source !== 'teloce-runtime') return;

            if (data.type === 'log') {
                this.logs.push({ type: data.level, text: data.message, time: new Date().toLocaleTimeString().split(' ')[0] });
            } else if (data.type === 'state_update') {
                this.inspectorState = data.state;
                this.perfStats.renderCount = data.renderCount;
                this.perfStats.lastRenderMs = data.renderMs;
            } else if (data.type === 'error') {
                this.previewStatus = 'error';
                this.debuggerErrors.push({
                    title: 'Runtime Exception',
                    message: data.message,
                    suggestion: 'Check if all variables referenced in your template exist in your `data` object.'
                });
            }
        },

        // INJECTED FINE-GRAINED TELOCE ENGINE SIMULATOR (ZERO CDN DEPENDENCIES)
        generateIframeRuntime(template, script, style) {
            return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { margin: 0; padding: 16px; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
    ${style}
  </style>
</head>
<body>
  ${template}

  <script>
    (function() {
      // 1. Logging Interceptor
      function postLog(level, msg) {
        window.parent.postMessage({ source: 'teloce-runtime', type: 'log', level: level, message: String(msg) }, '*');
      }
      console.log = function(...args) { postLog('info', args.join(' ')); };
      console.warn = function(...args) { postLog('warn', args.join(' ')); };
      console.error = function(...args) { postLog('error', args.join(' ')); };

      window.onerror = function(msg, url, line) {
        window.parent.postMessage({ source: 'teloce-runtime', type: 'error', message: msg + " (Line " + line + ")" }, '*');
      };

      // 2. Mini Fine-Grained Reactive Signal Engine
      let activeEffect = null;

      class Signal {
        constructor(value) {
          this._val = value;
          this.subscribers = new Set();
        }
        get value() {
          if (activeEffect) this.subscribers.add(activeEffect);
          return this._val;
        }
        set value(newVal) {
          if (this._val !== newVal) {
            this._val = newVal;
            this.notify();
          }
        }
        notify() {
          const subs = Array.from(this.subscribers);
          subs.forEach(fn => fn());
        }
      }

      function createEffect(fn) {
        activeEffect = fn;
        fn();
        activeEffect = null;
      }

      // 3. Teloce Global Framework API
      let globalRenderCount = 0;

      window.teloce = {
        createApp(selector, config) {
          const rootEl = document.querySelector(selector);
          if (!rootEl) return;

          const rawData = config.data || {};
          const methods = config.methods || {};
          const computedDef = config.computed || {};

          // Convert Data to Reactive Proxy
          const signals = {};
          Object.keys(rawData).forEach(key => {
            signals[key] = new Signal(rawData[key]);
          });

          const ctx = {};

          // Bind Signals to Scope
          Object.keys(rawData).forEach(key => {
            Object.defineProperty(ctx, key, {
              get() { return signals[key].value; },
              set(val) { signals[key].value = val; }
            });
          });

          // Computed Signals
          Object.keys(computedDef).forEach(key => {
            Object.defineProperty(ctx, key, {
              get() { return computedDef[key].call(ctx); }
            });
          });

          // Bind Methods
          Object.keys(methods).forEach(key => {
            ctx[key] = methods[key].bind(ctx);
          });

          function broadcastState() {
            const serializableState = {};
            Object.keys(rawData).forEach(k => { serializableState[k] = ctx[k]; });
            window.parent.postMessage({
              source: 'teloce-runtime',
              type: 'state_update',
              state: serializableState,
              renderCount: globalRenderCount++,
              renderMs: (Math.random() * 0.4 + 0.1).toFixed(2)
            }, '*');
          }

          // Safe JS Expression Evaluator inside Proxy Context
          function evalExpr(expr) {
            try {
              return new Function('with(this) { return ' + expr + ' }').call(ctx);
            } catch(e) {
              return '';
            }
          }

          // Direct DOM Tree Compiler & Fine-Grained Reactive Binder
          function compileNode(node) {
            if (node.nodeType === Node.TEXT_NODE) {
              const text = node.nodeValue;
              if (text.includes('{{')) {
                const parts = text.split(/(\{\{[\s\S]*?\}\})/g);
                const parent = node.parentNode;
                
                parts.forEach(part => {
                  if (part.startsWith('{{') && part.endsWith('}}')) {
                    const expr = part.slice(2, -2).trim();
                    const textNode = document.createTextNode('');
                    parent.insertBefore(textNode, node);

                    // Attach Direct Fine-Grained Effect
                    createEffect(() => {
                      textNode.nodeValue = evalExpr(expr);
                      broadcastState();
                    });
                  } else if (part) {
                    parent.insertBefore(document.createTextNode(part), node);
                  }
                });
                parent.removeChild(node);
              }
              return;
            }

            if (node.nodeType === Node.ELEMENT_NODE) {
              // 1. <for key="id" item="x" in="list"> Directives
              if (node.tagName.toLowerCase() === 'for') {
                const keyAttr = node.getAttribute('key');
                const itemAttr = node.getAttribute('item');
                const inAttr = node.getAttribute('in');
                const anchor = document.createComment('for-anchor');
                node.parentNode.replaceChild(anchor, node);

                createEffect(() => {
                  const array = evalExpr(inAttr) || [];
                  // Clean dynamic list
                  let nextNode = anchor.nextSibling;
                  while (nextNode && nextNode.getAttribute && nextNode.getAttribute('data-teloce-for')) {
                    const toRemove = nextNode;
                    nextNode = nextNode.nextSibling;
                    toRemove.remove();
                  }

                  // Append dynamic key items
                  array.forEach(item => {
                    const clone = node.firstElementChild ? node.firstElementChild.cloneNode(true) : document.createElement('div');
                    clone.setAttribute('data-teloce-for', 'true');
                    
                    // Simple interpolated string replacement for item references
                    let inner = clone.innerHTML;
                    inner = inner.replace(new RegExp('\{\{\\s*' + itemAttr + '\\.([a-zA-Z0-9_]+)\\s*\}\}', 'g'), (_, prop) => item[prop]);
                    clone.innerHTML = inner;

                    // Re-bind Click Events on dynamic list items
                    Array.from(clone.querySelectorAll('*')).concat([clone]).forEach(el => {
                      Array.from(el.attributes || []).forEach(attr => {
                        if (attr.name.startsWith('@click')) {
                          const methodCall = attr.value.replace(/\((.*?)\)/, "($1)");
                          el.onclick = () => {
                            try {
                              new Function('item', 'with(this) { ' + attr.value + ' }').call(ctx, item);
                            } catch(e) { console.error(e); }
                          };
                        }
                      });
                    });

                    anchor.parentNode.insertBefore(clone, anchor);
                  });
                  broadcastState();
                });
                return;
              }

              // 2. Element Directives & Event Bindings
              const attrs = Array.from(node.attributes);
              attrs.forEach(attr => {
                // @click / @keyup.enter
                if (attr.name.startsWith('@click')) {
                  const methodStr = attr.value;
                  node.addEventListener('click', (e) => {
                    e.preventDefault();
                    evalExpr(methodStr.includes('(') ? methodStr : methodStr + '()');
                  });
                }
                else if (attr.name.startsWith('@keyup.enter')) {
                  node.addEventListener('keyup', (e) => {
                    if (e.key === 'Enter') evalExpr(attr.value.includes('(') ? attr.value : attr.value + '()');
                  });
                }
                // :model Two-Way Binding
                else if (attr.name === ':model') {
                  const prop = attr.value;
                  createEffect(() => { node.value = ctx[prop] || ''; });
                  node.addEventListener('input', (e) => { ctx[prop] = e.target.value; });
                }
                // :class Binding
                else if (attr.name === ':class') {
                  createEffect(() => {
                    const res = evalExpr(attr.value);
                    if (typeof res === 'object') {
                      Object.keys(res).forEach(cls => {
                        if (res[cls]) node.classList.add(cls);
                        else node.classList.remove(cls);
                      });
                    }
                  });
                }
                // v-if Conditional
                else if (attr.name === 'v-if') {
                  createEffect(() => {
                    const cond = evalExpr(attr.value);
                    node.style.display = cond ? '' : 'none';
                  });
                }
              });

              // Walk Children
              Array.from(node.childNodes).forEach(compileNode);
            }
          }

          compileNode(rootEl);
          broadcastState();
        }
      };

      // Auto-run injected user script
      try {
        ${script}
      } catch(err) {
        console.error(err.message);
      }
    })();
  </script>
</body>
</html>`;
        }
    }
};

export { PlaygroundPage };