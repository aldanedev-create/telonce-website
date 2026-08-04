/**
 * Blog Data - All blog posts
 */

var blogPosts = [
    {
        slug: 'introducing-teloce',
        title: 'Introducing Teloce',
        excerpt: 'A new way to build frontends for Python applications. Teloce brings reactive UI development to Flask, Django, and FastAPI developers.',
        date: 'January 1, 2024',
        category: 'Announcements',
        readTime: '5 min read',
        content: `
            <h2>What is Teloce?</h2>
            <p>Teloce is a TypeScript template engine built specifically for Python web developers. It bridges the gap between server-rendered Python applications and reactive client-side experiences.</p>

            <h2>Why Teloce?</h2>
            <p>Python developers shouldn't have to learn React, Vue, or Angular to build interactive frontends. Teloce provides a familiar, Python-like syntax that works seamlessly with Flask, Django, FastAPI, and other Python frameworks.</p>

            <h2>Key Features</h2>
            <ul>
                <li><strong>Python-First Philosophy</strong> - Keep your backend in Python</li>
                <li><strong>Human-Friendly Debugger</strong> - No more cryptic errors</li>
                <li><strong>CDN First</strong> - Start with one script tag</li>
                <li><strong>Signals + Keyed Loops</strong> - Fast reactivity</li>
                <li><strong>Jinja/JinjaX Compatible</strong> - Works with your existing templates</li>
            </ul>

            <h2>Get Started</h2>
            <p>Check out the <a href="#/docs/getting-started/quick-start">Quick Start guide</a> to build your first Teloce app today!</p>
        `,
    },
    {
        slug: 'teloce-v1-0-0-released',
        title: 'Teloce v1.0.0 Released',
        excerpt: 'We are excited to announce the first stable release of Teloce! This marks a major milestone for the project.',
        date: 'January 15, 2024',
        category: 'Announcements',
        readTime: '3 min read',
        content: `
            <h2>A Major Milestone</h2>
            <p>Today we're thrilled to announce the stable release of Teloce v1.0.0! This release represents thousands of hours of work and marks the project's readiness for production use.</p>

            <h2>What's New in v1.0.0</h2>
            <ul>
                <li>Stable reactivity system with Signals</li>
                <li>Keyed loops for fast list rendering</li>
                <li>Human-friendly debugger</li>
                <li>CDN-first distribution</li>
                <li>14 npm packages</li>
                <li>Full TypeScript support</li>
                <li>JSDoc validation</li>
            </ul>

            <h2>What's Next</h2>
            <p>We're already working on v1.1.0 with planned features like SSR, improved dev tools, and more.</p>

            <h2>Get Started</h2>
            <p>Check out the <a href="#/docs/getting-started/installation">installation guide</a> and start building with Teloce today!</p>
        `,
    },
    {
        slug: 'building-flask-app-with-teloce',
        title: 'Building a Flask App with Teloce',
        excerpt: 'Step-by-step guide to building a full-stack application with Flask and Teloce.',
        date: 'January 20, 2024',
        category: 'Tutorials',
        readTime: '8 min read',
        content: `
            <h2>Introduction</h2>
            <p>In this tutorial, we'll build a full-stack application using Flask for the backend and Teloce for the frontend. We'll create a simple task management app with authentication.</p>

            <h2>Project Setup</h2>
            <p>First, let's set up our Flask project structure:</p>
            <pre><code>my-app/
├── app.py
├── templates/
│   └── index.html
├── static/
│   └── js/
│       └── app.js
└── requirements.txt</code></pre>

            <h2>Install Dependencies</h2>
            <pre><code>pip install flask
npm install teloce</code></pre>

            <h2>Create the Flask App</h2>
            <p>Here's our <code>app.py</code>:</p>
            <pre><code>from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html',
        title='My App',
        user={'name': 'John'}
    )

if __name__ == '__main__':
    app.run(debug=True)</code></pre>

            <h2>Build the Frontend</h2>
            <p>Now let's build the Teloce frontend in <code>templates/index.html</code>:</p>
            <pre><code>&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;{{ title }}&lt;/title&gt;
    &lt;script src="https://cdn.teloce.dev/teloce.min.js"&gt;&lt;/script&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;div id="app"&gt;
        &lt;h1&gt;Hello {{ user.name }}&lt;/h1&gt;
        &lt;button @click="count++"&gt;Count: {{ count }}&lt;/button&gt;
    &lt;/div&gt;

    &lt;script&gt;
        teloce.createApp('#app', {
            user: {{ user|tojson }},
            count: 0
        });
    &lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt;</code></pre>

            <h2>Run the App</h2>
            <p>Start your Flask server and open your browser to see your app running!</p>
        `,
    },
    {
        slug: 'creating-custom-directives',
        title: 'Creating Custom Directives',
        excerpt: 'Learn how to extend Teloce with custom directives for your specific use cases.',
        date: 'January 25, 2024',
        category: 'Tutorials',
        readTime: '6 min read',
        content: `
            <h2>What are Directives?</h2>
            <p>Directives are special attributes that add behavior to your templates. Teloce comes with built-in directives like <code>@click</code>, <code>:model</code>, and <code>&lt;for&gt;</code>.</p>

            <h2>When to Create Custom Directives</h2>
            <ul>
                <li>Reusable behavior across components</li>
                <li>Complex DOM manipulations</li>
                <li>Integration with third-party libraries</li>
                <li>Framework-specific functionality</li>
            </ul>

            <h2>Creating a Custom Directive</h2>
            <p>Here's how to create a custom directive:</p>
            <pre><code>// register a custom directive
teloce.registerDirective('focus', {
    name: 'focus',
    mounted(el) {
        el.focus();
    }
});

// use it in your template
&lt;input v-focus /&gt;</code></pre>

            <h2>Directive Lifecycle Hooks</h2>
            <ul>
                <li><code>beforeMount</code> - Before the element is mounted</li>
                <li><code>mounted</code> - After the element is mounted</li>
                <li><code>beforeUpdate</code> - Before the element updates</li>
                <li><code>updated</code> - After the element updates</li>
                <li><code>beforeUnmount</code> - Before the element is unmounted</li>
                <li><code>unmounted</code> - After the element is unmounted</li>
            </ul>

            <h2>Example: Tooltip Directive</h2>
            <pre><code>teloce.registerDirective('tooltip', {
    name: 'tooltip',
    mounted(el, binding) {
        el.title = binding.value;
    },
    updated(el, binding) {
        el.title = binding.value;
    }
});

// usage
&lt;button v-tooltip="'Click me!'"&gt;Submit&lt;/button&gt;</code></pre>
        `,
    },
    {
        slug: 'writing-teloce-plugins',
        title: 'Writing Teloce Plugins',
        excerpt: 'Extend the Teloce ecosystem by creating your own plugins.',
        date: 'February 1, 2024',
        category: 'Tutorials',
        readTime: '7 min read',
        content: `
            <h2>Why Write a Plugin?</h2>
            <p>Plugins allow you to extend Teloce's functionality and share it with the community. Common use cases include:</p>
            <ul>
                <li>Custom directives and filters</li>
                <li>Component libraries</li>
                <li>Integration with third-party services</li>
                <li>Developer tooling</li>
            </ul>

            <h2>Plugin Structure</h2>
            <pre><code>{
    name: 'my-plugin',
    version: '1.0.0',
    install: (app, options) => {
        // Your plugin code
    }
}</code></pre>

            <h2>Example Plugin</h2>
            <pre><code>const MarkdownPlugin = {
    name: 'markdown',
    version: '1.0.0',
    install: (app, options) => {
        // Register a filter
        app.filter('markdown', (text) => {
            return marked(text);
        });

        // Register a directive
        app.directive('markdown', {
            mounted(el, binding) {
                el.innerHTML = marked(binding.value);
            }
        });
    }
};

// use the plugin
app.use(MarkdownPlugin);</code></pre>

            <h2>Publishing Your Plugin</h2>
            <p>Share your plugin with the community by publishing it to npm:</p>
            <pre><code>npm publish</code></pre>
        `,
    },
    {
        slug: 'teloce-community-spotlight',
        title: 'Community Spotlight: Projects using Teloce',
        excerpt: 'Highlighting amazing projects built with Teloce by the community.',
        date: 'March 1, 2024',
        category: 'Community',
        readTime: '4 min read',
        content: `
            <h2>Community Showcase</h2>
            <p>We're amazed by the incredible projects the community has built with Teloce. Here are a few highlights:</p>

            <h3>Project 1: Task Manager</h3>
            <p>A full-featured task management app built with Flask and Teloce. Features include user authentication, real-time updates, and team collaboration.</p>

            <h3>Project 2: E-commerce Store</h3>
            <p>A complete e-commerce platform with product catalog, shopping cart, and checkout. Built with Django and Teloce.</p>

            <h3>Project 3: Dashboard</h3>
            <p>An admin dashboard with real-time analytics, charts, and data visualization. Built with FastAPI and Teloce.</p>

            <h2>Want to be Featured?</h2>
            <p>If you've built something with Teloce, we'd love to feature it! Share your project on <a href="https://github.com/telocejs/teloce/discussions">GitHub Discussions</a>.</p>
        `,
    },
];

// Set global blog data
window.__TELOCE_BLOG_DATA = blogPosts;

// Export for use in other files
export { blogPosts };