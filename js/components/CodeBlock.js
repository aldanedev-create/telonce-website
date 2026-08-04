/**
 * CodeBlock Component - Syntax highlighted code blocks using Highlight.js
 * 
 * Highlight.js CDN will be loaded in the component.
 */

const CodeBlockComponent = {
    template: `
        <div class="relative group my-4">
            <div class="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                <button
                    @click="copyCode"
                    class="p-1.5 rounded-lg bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white transition-colors text-xs"
                    title="Copy code"
                >
                    <span v-if="copied">✅</span>
                    <span v-else>📋</span>
                </button>
            </div>
            <pre class="rounded-xl overflow-x-auto p-0"><code :class="languageClass" v-html="highlightedCode"></code></pre>
        </div>
    `,
    props: {
        code: { type: String, required: true },
        language: { type: String, default: 'html' },
        showLineNumbers: { type: Boolean, default: false },
    },
    data() {
        return {
            copied: false,
            timeout: null,
            hljs: null,
            isLoaded: false,
        };
    },
    computed: {
        languageClass() {
            return `language-${this.language}`;
        },
        highlightedCode() {
            if (!this.code) return '';
            
            // If highlight.js is loaded, use it
            if (this.hljs) {
                try {
                    const result = this.hljs.highlight(this.code, {
                        language: this.language,
                        ignoreIllegals: true,
                    });
                    return result.value;
                } catch (e) {
                    // Fallback to plain text
                    return this.escapeHtml(this.code);
                }
            }
            
            // Fallback: escape HTML
            return this.escapeHtml(this.code);
        },
    },
    mounted() {
        this.loadHighlightJS();
    },
    methods: {
        loadHighlightJS() {
            // Check if highlight.js is already loaded
            if (window.hljs) {
                this.hljs = window.hljs;
                this.isLoaded = true;
                return;
            }

            // Load highlight.js from CDN
            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js';
            script.async = true;
            
            script.onload = () => {
                // Load additional languages
                this.loadAdditionalLanguages(() => {
                    this.hljs = window.hljs;
                    this.isLoaded = true;
                    // Re-render to apply highlighting
                    this.$forceUpdate();
                });
            };
            
            script.onerror = () => {
                console.warn('Failed to load Highlight.js, using fallback highlighting');
                this.isLoaded = true;
            };
            
            document.head.appendChild(script);
            
            // Also load the CSS theme
            this.loadHighlightCSS();
        },
        
        loadHighlightCSS() {
            // Check if CSS is already loaded
            if (document.querySelector('link[href*="highlight.js"]')) return;
            
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github-dark.min.css';
            link.async = true;
            document.head.appendChild(link);
        },
        
        loadAdditionalLanguages(callback) {
            // Load common languages
            const languages = ['javascript', 'typescript', 'python', 'bash', 'json', 'xml', 'css', 'sql'];
            let loaded = 0;
            const total = languages.length;
            
            for (const lang of languages) {
                const script = document.createElement('script');
                script.src = `https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/languages/${lang}.min.js`;
                script.async = true;
                script.onload = () => {
                    loaded++;
                    if (loaded === total && callback) {
                        callback();
                    }
                };
                script.onerror = () => {
                    loaded++;
                    if (loaded === total && callback) {
                        callback();
                    }
                };
                document.head.appendChild(script);
            }
            
            // If no languages to load, call callback immediately
            if (total === 0 && callback) {
                callback();
            }
        },
        
        escapeHtml(text) {
            const div = document.createElement('div');
            div.textContent = text;
            return div.innerHTML;
        },
        
        copyCode() {
            navigator.clipboard.writeText(this.code).then(() => {
                this.copied = true;
                clearTimeout(this.timeout);
                this.timeout = setTimeout(() => {
                    this.copied = false;
                }, 2000);
            }).catch(() => {
                // Fallback
                const textarea = document.createElement('textarea');
                textarea.value = this.code;
                document.body.appendChild(textarea);
                textarea.select();
                document.execCommand('copy');
                document.body.removeChild(textarea);
                this.copied = true;
                clearTimeout(this.timeout);
                this.timeout = setTimeout(() => {
                    this.copied = false;
                }, 2000);
            });
        },
    },
    beforeUnmount() {
        clearTimeout(this.timeout);
    },
    watch: {
        code() {
            // Re-highlight when code changes
            if (this.isLoaded && this.hljs) {
                this.$nextTick(() => {
                    // hljs will auto-highlight on next render
                });
            }
        },
    },
};