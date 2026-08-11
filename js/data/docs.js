/**
 * Docs Data - All documentation content
 * Includes CDN links, .vel file examples, Python framework examples, and debugger
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
                    <code-block language="html" code='<script src="https://cdn.jsdelivr.net/npm/teloce@1/dist/teloce.global.min.js"><\/script>'></code-block>
                    <p>No npm, no Node.js, no build tools — just one script tag.</p>

                    <h3>Latest CDN Links</h3>
                    <table>
                        <thead>
                            <tr><th>Build</th><th>URL</th><th>Use Case</th></tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><strong>Production (minified)</strong></td>
                                <td><code>https://cdn.jsdelivr.net/npm/teloce@1/dist/teloce.global.min.js</code></td>
                                <td>Production websites</td>
                            </tr>
                            <tr>
                                <td><strong>Debug (unminified)</strong></td>
                                <td><code>https://cdn.jsdelivr.net/npm/teloce@1/dist/teloce.debug.js</code></td>
                                <td>Development/Debugging</td>
                            </tr>
                            <tr>
                                <td><strong>ESM</strong></td>
                                <td><code>https://cdn.jsdelivr.net/npm/teloce@1/dist/teloce.esm.js</code></td>
                                <td>Modern browsers with <code>&lt;script type="module"&gt;</code></td>
                            </tr>
                            <tr>
                                <td><strong>Latest (always latest)</strong></td>
                                <td><code>https://cdn.jsdelivr.net/npm/teloce/dist/teloce.global.min.js</code></td>
                                <td>Testing/Prototyping (not recommended for production)</td>
                            </tr>
                        </tbody>
                    </table>

                    <h3>Package CDN Links</h3>
                    <code-block language="html" code='
<!-- Core -->
<script src="https://cdn.jsdelivr.net/npm/@teloce/core@1/dist/index.global.min.js"><\/script>

<!-- Reactivity -->
<script src="https://cdn.jsdelivr.net/npm/@teloce/reactivity@1/dist/index.global.min.js"><\/script>

<!-- Runtime DOM -->
<script src="https://cdn.jsdelivr.net/npm/@teloce/runtime-dom@1/dist/index.global.min.js"><\/script>

<!-- Compiler -->
<script src="https://cdn.jsdelivr.net/npm/@teloce/compiler@1/dist/index.global.min.js"><\/script>

<!-- Debugger -->
<script src="https://cdn.jsdelivr.net/npm/@teloce/debugger@1/dist/index.global.min.js"><\/script>
                    '></code-block>

                    <h2>npm</h2>
                    <p>For advanced users who want to use build tools:</p>
                    <code-block language="bash" code='npm install teloce'></code-block>

                    <h2>CLI</h2>
                    <p>Install the CLI globally:</p>
                    <code-block language="bash" code='npm install -g @teloce/cli'></code-block>

                    <h2>Individual Packages</h2>
                    <p>Install only what you need:</p>
                    <code-block language="bash" code='
npm install @teloce/core
npm install @teloce/reactivity
npm install @teloce/runtime-dom
npm install @teloce/compiler
npm install @teloce/router
npm install @teloce/debugger
npm install @teloce/cli
                    '></code-block>
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
    <script src="https://cdn.jsdelivr.net/npm/teloce@1/dist/teloce.global.min.js"><\/script>
</head>
<body>
    <div id="app">
        <h1>Hello {{ name }}</h1>
        <button @click="count++">Count: {{ count }}</button>
    </div>
    <script>
        const app = teloce.createApp('#app', {
            name: 'Teloce Developer',
            count: 0
        });
    <\/script>
</body>
</html>
                    '></code-block>
                    <p>Open it in your browser and you'll see a working reactive app!</p>

                    <h2>With Router</h2>
                    <code-block language="javascript" code='
import { createRouter } from '@teloce/router';
import { createApp } from '@teloce/core';

const routes = [
    { path: '/', component: HomePage },
    { path: '/about', component: AboutPage },
    { path: '/users/:id', component: UserPage }
];

const router = createRouter(routes);
const app = createApp('#app', { router });
                    '></code-block>
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

                    <h2>Flask Backend</h2>
                    <code-block language="python" code='
from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html',
        user={'name': 'John'},
        products=[{'id': 1, 'name': 'Product A'}]
    )
                    '></code-block>

                    <h2>Teloce Frontend</h2>
                    <code-block language="html" code='
<div id="app">
    <h1>Hello {{ user.name }}</h1>
    <for product in products">
        <div>{{ product.name }}</div>
    </for>
</div>

<script>
    const app = teloce.createApp('#app', {
        user: {{ user|tojson }},
        products: {{ products|tojson }}
    });
</script>
                    '></code-block>
                    <p>With Teloce, you can keep your frontend simple and your backend clean.</p>
                `,
            },
            'python-integration': {
                title: 'Python Integration',
                content: `
                    <h1>Python Integration</h1>
                    <p>Teloce works seamlessly with all major Python web frameworks.</p>

                    <h2>Flask</h2>
                    <code-block language="python" code='
from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html',
        products=Product.query.all()
    )
                    '></code-block>

                    <h2>Django</h2>
                    <code-block language="python" code='
from django.shortcuts import render

def home(request):
    return render(request, 'index.html', {
        'products': Product.objects.all()
    })
                    '></code-block>

                    <h2>FastAPI</h2>
                    <code-block language="python" code='
from fastapi import FastAPI, Request
from fastapi.templating import Jinja2Templates

app = FastAPI()
templates = Jinja2Templates(directory="templates")

@app.get("/")
async def home(request: Request):
    return templates.TemplateResponse("index.html", {
        "request": request,
        "products": products
    })
                    '></code-block>

                    <h2>Passing Data</h2>
                    <p>Use the <code>|tojson</code> filter to pass data from Python to Teloce:</p>
                    <code-block language="html" code='
<script>
    const app = teloce.createApp('#app', {
        user: {{ user|tojson }},
        products: {{ products|tojson }}
    });
</script>
                    '></code-block>

                    <h2>JinjaX Compatibility with %raw%</h2>
                    <p>When using Teloce inside JinjaX components, wrap Teloce code in <code>%raw%</code> blocks:</p>
                    <code-block language="jinja" code='
{# components/ProductList.jinja #}
{#def title, products #}

<div id="app">
    <h2>{{ title }}</h2>

    {% raw %}
    <!-- Teloce template syntax - JinjaX will ignore this -->
    <ul>
        <for key="id" item="product" in="products">
            <li>{{ product.name }}</li>
        </for>
    </ul>

    <script>
        const app = teloce.createApp('#app', {
            products: {{ products|tojson }}
        });
    <\/script>
    {% endraw %}
</div>
                    '></code-block>
                    <p>This prevents JinjaX from processing Teloce's <code>{{ }}</code>, <code>&lt;for&gt;</code>, and <code>&lt;if&gt;</code> syntax.</p>
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

                    <h2>Expressions</h2>
                    <p>Use JavaScript expressions inside interpolations:</p>
                    <code-block language="html" code='
<p>Total: ${{ cart.total }}</p>
<p>Double: {{ count * 2 }}</p>
<p>Full Name: {{ user.firstName + ' ' + user.lastName }}</p>
                    '></code-block>

                    <h2>Loops</h2>
                    <p>Iterate over collections with <code>&lt;for&gt;</code>:</p>
                    <code-block language="html" code='
<for product in products">
    <div>{{ product.name }}</div>
</for>
                    '></code-block>

                    <h3>Keyed Loops (Recommended)</h3>
                    <code-block language="html" code='
<for key="id" item="product" in="products">
    <div>{{ product.name }}</div>
</for>
                    '></code-block>

                    <h3>Nested Loops</h3>
                    <code-block language="html" code='
<for user in users">
    <div>
        <h3>{{ user.name }}</h3>
        <ul>
            <for course in user.courses">
                <li>{{ course.name }}</li>
            </for>
        </ul>
    </div>
</for>
                    '></code-block>

                    <h2>Conditions</h2>
                    <p>Conditional rendering with <code>&lt;if&gt;</code> and <code>&lt;else&gt;</code>:</p>
                    <code-block language="html" code='
<if loggedIn">
    <h1>Welcome back!</h1>
    <else>
        <button>Login</button>
</if>
                    '></code-block>

                    <h3>Else If</h3>
                    <code-block language="html" code='
<if user.isAdmin">
    <button>Admin Panel</button>
    <else if user.isModerator">
        <button>Moderate</button>
    <else>
        <button>View Only</button>
</if>
                    '></code-block>

                    <h2>Directives</h2>
                    <p>Use directives like <code>@click</code> and <code>:model</code> for interactivity:</p>
                    <code-block language="html" code='
<button @click="save()">Save</button>
<input :model="username" />
<div :show="isVisible">Content</div>
<div :class="{ active: isActive }">Content</div>
<div :style="{ color: textColor }">Content</div>
                    '></code-block>

                    <h2>Event Modifiers</h2>
                    <code-block language="html" code='
<button @click.stop="handleClick">Stop Propagation</button>
<button @click.prevent="handleSubmit">Prevent Default</button>
<button @click.once="handleOnce">Trigger Once</button>
                    '></code-block>
                `,
            },
            reactivity: {
                title: 'Reactivity',
                content: `
                    <h1>Reactivity</h1>
                    <p>Teloce uses a signals-based reactivity system for fine-grained updates without a Virtual DOM.</p>

                    <h2>Signals</h2>
                    <p>Create reactive signals with <code>createSignal</code>:</p>
                    <code-block language="javascript" code='
const [count, setCount] = teloce.createSignal(0);

// Read the value
console.log(count()); // 0

// Write the value
setCount(10);
console.log(count()); // 10
                    '></code-block>

                    <h3>Signal Updates</h3>
                    <code-block language="javascript" code='
// Update based on current value
count.update(prev => prev + 1);

// Or use set with a function
setCount(prev => prev * 2);
                    '></code-block>

                    <h2>Effects</h2>
                    <p>Track dependencies and automatically re-run functions:</p>
                    <code-block language="javascript" code='
import { createEffect } from '@teloce/reactivity';

const [count, setCount] = createSignal(0);

createEffect(() => {
    console.log('Count is:', count());
});

setCount(1); // Logs: Count is: 1
setCount(2); // Logs: Count is: 2
                    '></code-block>

                    <h3>Effect Cleanup</h3>
                    <code-block language="javascript" code='
createEffect(() => {
    const timer = setInterval(() => {
        console.log(count());
    }, 1000);

    // Cleanup when effect stops
    return () => clearInterval(timer);
});
                    '></code-block>

                    <h2>Computed Values</h2>
                    <p>Derive values from signals:</p>
                    <code-block language="javascript" code='
const double = teloce.createComputed(() => count() * 2);
console.log(double()); // 0

setCount(5);
console.log(double()); // 10
                    '></code-block>

                    <h3>Memoization</h3>
                    <code-block language="javascript" code='
// Memoizes expensive computations
const expensive = teloce.createMemo(() => {
    return heavyCalculation(data());
});
                    '></code-block>

                    <h2>Batch Updates</h2>
                    <p>Batch multiple updates to prevent unnecessary re-renders:</p>
                    <code-block language="javascript" code='
import { batch } from '@teloce/reactivity';

batch(() => {
    setCount(10);
    setName('Jane');
    setAge(25);
});
                    '></code-block>

                    <h2>Untracked</h2>
                    <p>Read values without creating dependencies:</p>
                    <code-block language="javascript" code='
import { untracked } from '@teloce/reactivity';

createEffect(() => {
    console.log('Count:', count());
    const current = untracked(() => count());
});
                    '></code-block>

                    <h2>Reactivity in Templates</h2>
                    <code-block language="html" code='
<div id="app">
    <h1>{{ name }}</h1>
    <p>Count: {{ count }}</p>
    <button @click="count++">Increment</button>
</div>

<script>
    const app = teloce.createApp('#app', {
        name: 'John',
        count: 0
    });
</script>
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
    name: 'MyComponent',
    data() {
        return {
            count: 0,
            title: 'Hello'
        };
    },
    methods: {
        increment() {
            this.count++;
        }
    },
    computed: {
        doubleCount() {
            return this.count * 2;
        }
    },
    template: \`
        <div>
            <h2>{{ title }}</h2>
            <p>Count: {{ count }}</p>
            <p>Double: {{ doubleCount }}</p>
            <button @click="increment">Increment</button>
        </div>
    \`
});
                    '></code-block>

                    <h2>Using Components</h2>
                    <code-block language="html" code='<MyComponent />'></code-block>

                    <h2>Props</h2>
                    <code-block language="javascript" code='
const MyComponent = teloce.defineComponent({
    props: {
        title: {
            type: String,
            required: true
        },
        count: {
            type: Number,
            default: 0
        }
    },
    template: \`
        <div>
            <h2>{{ title }}</h2>
            <p>Count: {{ count }}</p>
        </div>
    \`
});
                    '></code-block>

                    <h2>Slots</h2>
                    <code-block language="html" code='
<!-- Component -->
<div class="card">
    <div class="header">
        <slot name="header"></slot>
    </div>
    <div class="body">
        <slot></slot>
    </div>
</div>

<!-- Usage -->
<Card>
    <template #header>
        <h1>Page Title</h1>
    </template>
    <p>Main content</p>
</Card>
                    '></code-block>

                    <h2>Lifecycle Hooks</h2>
                    <code-block language="javascript" code='
const MyComponent = teloce.defineComponent({
    beforeMount() {
        console.log('Before mount');
    },
    mounted() {
        console.log('Mounted!');
    },
    beforeUpdate() {
        console.log('Before update');
    },
    updated() {
        console.log('Updated!');
    },
    beforeUnmount() {
        console.log('Before unmount');
    },
    unmounted() {
        console.log('Unmounted!');
    }
});
                    '></code-block>
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

                    <h2>Input Events</h2>
                    <code-block language="html" code='<input @input="handleInput" />'></code-block>

                    <h2>Change Events</h2>
                    <code-block language="html" code='<select @change="handleChange">...</select>'></code-block>

                    <h2>Key Events</h2>
                    <code-block language="html" code='
<input @keyup.enter="handleEnter" />
<input @keyup.escape="handleEscape" />
<input @keyup.ctrl.enter="handleCtrlEnter" />
                    '></code-block>

                    <h2>Focus Events</h2>
                    <code-block language="html" code='
<input @focus="handleFocus" />
<input @blur="handleBlur" />
                    '></code-block>

                    <h2>Event Modifiers</h2>
                    <code-block language="html" code='
<button @click.stop="handleClick">Stop Propagation</button>
<button @click.prevent="handleSubmit">Prevent Default</button>
<button @click.once="handleOnce">Trigger Once</button>
<button @click.self="handleSelf">Self Only</button>
                    '></code-block>

                    <h2>Custom Events</h2>
                    <code-block language="javascript" code='
// Child component
this.$emit('update', newValue);

// Parent
<Child @update="handleUpdate" />
                    '></code-block>
                `,
            },
            'state-management': {
                title: 'State Management',
                content: `
                    <h1>State Management</h1>
                    <p>Manage application state with signals and components.</p>

                    <h2>Local State</h2>
                    <p>Each component has its own local state:</p>
                    <code-block language="javascript" code='
const MyComponent = teloce.defineComponent({
    data() {
        return {
            count: 0,
            message: 'Hello'
        };
    }
});
                    '></code-block>

                    <h2>Global State</h2>
                    <p>Share state across components with signals:</p>
                    <code-block language="javascript" code='
// store.js
import { createSignal } from '@teloce/reactivity';

export const user = createSignal(null);
export const cart = createSignal([]);

// Component A
import { user } from './store.js';
user.set({ name: 'John' });

// Component B
import { user } from './store.js';
console.log(user()); // { name: 'John' }
                    '></code-block>

                    <h2>Computed State</h2>
                    <p>Derive state from other state values:</p>
                    <code-block language="javascript" code='
import { createComputed } from '@teloce/reactivity';

const cartTotal = createComputed(() => {
    return cart().reduce((sum, item) => sum + item.price, 0);
});
                    '></code-block>

                    <h2>State in App Instance</h2>
                    <code-block language="javascript" code='
const app = teloce.createApp('#app', {
    // Reactive state
    count: 0,
    user: { name: 'John' },
    items: [],

    // Methods
    increment() {
        this.count++;
    },

    // Computed
    computed: {
        doubleCount() {
            return this.count * 2;
        }
    }
});
                    '></code-block>
                `,
            },
            sfc: {
                title: 'SFC (.vel)',
                content: `
                    <h1>Single File Components (.vel)</h1>
                    <p>Write components with template, script, and style in one file.</p>

                    <h2>Basic .vel File</h2>
                    <code-block language="html" code='
<!-- Component.vel -->
<template>
    <div class="card">
        <h2>{{ title }}</h2>
        <p>{{ content }}</p>
        <button @click="handleClick">Click Me</button>
    </div>
</template>

<script>
export default {
    name: 'MyComponent',
    data() {
        return {
            title: 'Hello',
            content: 'This is a component'
        };
    },
    methods: {
        handleClick() {
            this.content = 'Clicked!';
        }
    }
};
</script>

<style scoped>
.card {
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
}
h2 {
    color: blue;
}
</style>
                    '></code-block>

                    <h2>Compiling .vel Files</h2>
                    <code-block language="bash" code='
# Install CLI
npm install -g @teloce/cli

# Build all .vel files
teloce build

# Watch for changes
teloce watch
                    '></code-block>

                    <h2>Using Compiled Components</h2>
                    <code-block language="javascript" code='
import MyComponent from './components/MyComponent.vel';

const app = teloce.createApp('#app', {
    components: {
        MyComponent
    }
});
                    '></code-block>

                    <h2>Scoped CSS</h2>
                    <p>Styles with <code>scoped</code> are automatically scoped to the component:</p>
                    <code-block language="css" code='
<style scoped>
.card { padding: 20px; } /* Only applies to this component */
</style>
                    '></code-block>

                    <h2>Advanced: .vel Files with Flask</h2>
                    <p>Example project structure with .vel components:</p>
                    <code-block language="text" code='
project/
├── app.py
├── templates/
│   └── index.html
└── static/
    └── js/
        ├── app.vel              # Main component
        └── components/
            ├── ProductCard.vel   # Reusable card
            └── CartWidget.vel    # Cart component
                    '></code-block>

                    <h3>Flask + .vel Example</h3>
                    <code-block language="python" code='
# app.py
from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html',
        products=products,
        user=user
    )
                    '></code-block>

                    <code-block language="html" code='
<!-- templates/index.html -->
<script type="module">
    import App from '/static/js/app.vel';

    const app = teloce.createApp('#app', {
        products: {{ products|tojson }},
        user: {{ user|tojson }}
    });

    app.component('App', App);
</script>
                    '></code-block>

                    <code-block language="html" code='
<!-- static/js/app.vel -->
<template>
    <div>
        <h1>Hello {{ user.name }}</h1>
        <for key="id" item="product" in="products">
            <product-card :product="product" />
        </for>
        <cart-widget />
    </div>
</template>

<script>
import ProductCard from './components/ProductCard.vel';
import CartWidget from './components/CartWidget.vel';

export default {
    name: 'App',
    components: { ProductCard, CartWidget },
    data() {
        return {
            products: [],
            user: {},
            cart: []
        };
    }
};
</script>
                    '></code-block>
                `,
            },
            routing: {
                title: 'Routing',
                content: `
                    <h1>Routing</h1>
                    <p>Teloce provides a lightweight client-side router for building SPAs.</p>

                    <h2>Installation</h2>
                    <code-block language="bash" code='npm install @teloce/router'></code-block>

                    <h2>Basic Router Setup</h2>
                    <code-block language="javascript" code='
import { createRouter } from '@teloce/router';
import { createApp } from '@teloce/core';

const routes = [
    { path: '/', component: HomePage },
    { path: '/about', component: AboutPage },
    { path: '/users/:id', component: UserPage }
];

const router = createRouter(routes);
const app = createApp('#app', { router });
                    '></code-block>

                    <h2>Dynamic Routes</h2>
                    <p>Use <code>:param</code> syntax for dynamic segments:</p>
                    <code-block language="javascript" code='
const routes = [
    { path: '/users/:id', component: UserProfile },
    { path: '/products/:category/:id', component: ProductDetail }
];
                    '></code-block>

                    <h2>Navigation</h2>
                    <code-block language="javascript" code='
// Navigate to a route
router.navigate('/about');
router.navigate('/users/42');

// Access route params
const params = router.params(); // { id: '42' }
                    '></code-block>

                    <h2>Route Matching</h2>
                    <code-block language="javascript" code='
// Match '/users/42' with '/users/:id'
// params = { id: '42' }

// Match '/products/electronics/123' with '/products/:category/:id'
// params = { category: 'electronics', id: '123' }
                    '></code-block>

                    <h2>Hash-Based vs History-Based</h2>
                    <p>The router uses hash-based routing (<code>#/about</code>) by default.</p>
                    <p>For history-based routing (<code>/about</code>), you would need to modify the implementation to use <code>location.pathname</code> and <code>popstate</code>.</p>
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
const app = teloce.createApp('#app', {
    count: 0,
    name: 'Teloce'
});
                    '></code-block>

                    <h3>Parameters</h3>
                    <ul>
                        <li><code>rootSelector</code> - CSS selector or DOM element</li>
                        <li><code>data</code> - Initial reactive data</li>
                        <li><code>options</code> - Optional configuration (components, directives, filters, plugins)</li>
                    </ul>

                    <h2>defineComponent</h2>
                    <p>Defines a reusable component.</p>
                    <code-block language="javascript" code='
const MyComponent = teloce.defineComponent({
    name: 'MyComponent',
    data() {
        return { count: 0 };
    },
    template: '<div>{{ count }}</div>'
});
                    '></code-block>

                    <h2>mount</h2>
                    <p>Mounts an app to the DOM.</p>
                    <code-block language="javascript" code='
const app = createApp();
app.mount();
// or
mount(app, '#app');
                    '></code-block>

                    <h2>createConfig</h2>
                    <p>Creates a configuration object.</p>
                    <code-block language="javascript" code='
const config = teloce.createConfig({
    dev: true,
    debug: true,
    strict: true
});
                    '></code-block>

                    <h2>createPlugin</h2>
                    <p>Creates a plugin.</p>
                    <code-block language="javascript" code='
const MyPlugin = teloce.createPlugin((app) => {
    app.component('MyComponent', MyComponent);
}, 'my-plugin', '1.0.0');
                    '></code-block>
                `,
            },
            'reactivity-api': {
                title: 'Reactivity API',
                content: `
                    <h1>Reactivity API</h1>

                    <h2>createSignal</h2>
                    <p>Creates a reactive signal.</p>
                    <code-block language="javascript" code='
const [count, setCount] = teloce.createSignal(0);
                    '></code-block>
                    <ul>
                        <li><code>get()</code> - Returns the current value</li>
                        <li><code>set(value)</code> - Sets a new value</li>
                        <li><code>update(fn)</code> - Updates based on current value</li>
                        <li><code>peek()</code> - Reads without tracking dependencies</li>
                    </ul>

                    <h2>createEffect</h2>
                    <p>Creates an effect that runs when dependencies change.</p>
                    <code-block language="javascript" code='
teloce.createEffect(() => {
    console.log(count());
});
                    '></code-block>

                    <h2>createComputed</h2>
                    <p>Creates a computed value.</p>
                    <code-block language="javascript" code='
const double = teloce.createComputed(() => count() * 2);
                    '></code-block>

                    <h2>createMemo</h2>
                    <p>Memoizes a computed value.</p>
                    <code-block language="javascript" code='
const memo = teloce.createMemo(() => expensiveCalculation());
                    '></code-block>

                    <h2>batch</h2>
                    <p>Batches multiple updates.</p>
                    <code-block language="javascript" code='
batch(() => {
    setCount(10);
    setName('Jane');
});
                    '></code-block>

                    <h2>untracked</h2>
                    <p>Runs a function without tracking dependencies.</p>
                    <code-block language="javascript" code='
untracked(() => console.log(count()));
                    '></code-block>
                `,
            },
            directives: {
                title: 'Directives',
                content: `
                    <h1>Directives</h1>
                    <p>All built-in directives in Teloce.</p>

                    <h2>For</h2>
                    <p>Loop over collections.</p>
                    <code-block language="html" code='
<for key="id" item="product" in="products">
    <div>{{ product.name }}</div>
</for>
                    '></code-block>

                    <h2>If</h2>
                    <p>Conditional rendering.</p>
                    <code-block language="html" code='
<if condition="isLoggedIn">
    <h1>Welcome back!</h1>
    <else>
        <button>Login</button>
</if>
                    '></code-block>

                    <h2>Show / Hide</h2>
                    <p>Show/hide elements.</p>
                    <code-block language="html" code='
<div :show="isVisible">Visible content</div>
<div :hide="isHidden">Hidden content</div>
                    '></code-block>

                    <h2>Model</h2>
                    <p>Two-way binding for forms.</p>
                    <code-block language="html" code='
<input :model="username" />
<h2>Hello {{ username }}</h2>
                    '></code-block>

                    <h2>Class</h2>
                    <p>Dynamic class binding.</p>
                    <code-block language="html" code='
<div :class="{ active: isActive, 'text-bold': isBold }">Content</div>
                    '></code-block>

                    <h2>Style</h2>
                    <p>Dynamic style binding.</p>
                    <code-block language="html" code='
<div :style="{ color: textColor, fontSize: textSize + 'px' }">Content</div>
                    '></code-block>

                    <h2>Event Bindings</h2>
                    <code-block language="html" code='
<button @click="handleClick">Click</button>
<form @submit="handleSubmit">Submit</form>
<input @input="handleInput" />
<select @change="handleChange" />
                    '></code-block>

                    <h2>Bindings</h2>
                    <code-block language="html" code='
<input :disabled="isLoading" />
<input :checked="isChecked" />
<a :href="url">Link</a>
<img :src="imageUrl" />
                    '></code-block>
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
                        <li><code>trim</code> - Trim whitespace</li>
                        <li><code>truncate</code> - Truncate string to length</li>
                        <li><code>slugify</code> - Convert to URL-friendly slug</li>
                        <li><code>kebabCase</code> - Convert to kebab-case</li>
                        <li><code>camelCase</code> - Convert to camelCase</li>
                        <li><code>snakeCase</code> - Convert to snake_case</li>
                        <li><code>startCase</code> - Convert to Start Case</li>
                        <li><code>escape</code> - Escape HTML</li>
                        <li><code>unescape</code> - Unescape HTML</li>
                    </ul>

                    <h2>Number Filters</h2>
                    <ul>
                        <li><code>currency</code> - Format as currency</li>
                        <li><code>percent</code> - Format as percentage</li>
                        <li><code>number</code> - Format with commas</li>
                        <li><code>decimal</code> - Format to decimal places</li>
                        <li><code>round</code> - Round number</li>
                        <li><code>floor</code> - Floor number</li>
                        <li><code>ceil</code> - Ceil number</li>
                        <li><code>abs</code> - Absolute value</li>
                    </ul>

                    <h2>Date Filters</h2>
                    <ul>
                        <li><code>dateFormat</code> - Format date</li>
                        <li><code>timeAgo</code> - Relative time</li>
                        <li><code>dateFromISO</code> - Parse ISO date</li>
                        <li><code>relativeTime</code> - Past/future time</li>
                    </ul>

                    <h2>Array Filters</h2>
                    <ul>
                        <li><code>join</code> - Join array elements</li>
                        <li><code>first</code> - Get first element</li>
                        <li><code>last</code> - Get last element</li>
                        <li><code>pluck</code> - Extract property</li>
                        <li><code>where</code> - Filter array</li>
                        <li><code>orderBy</code> - Sort array</li>
                        <li><code>groupBy</code> - Group array</li>
                    </ul>

                    <h2>Object Filters</h2>
                    <ul>
                        <li><code>keys</code> - Get object keys</li>
                        <li><code>values</code> - Get object values</li>
                        <li><code>entries</code> - Get object entries</li>
                        <li><code>pick</code> - Pick specific properties</li>
                        <li><code>omit</code> - Omit specific properties</li>
                        <li><code>size</code> - Get object/array size</li>
                    </ul>

                    <h2>Usage Examples</h2>
                    <code-block language="html" code='
{{ 'hello' | capitalize }}      <!-- Hello -->
{{ price | currency('$') }}     <!-- $19.99 -->
{{ date | dateFormat('YYYY-MM-DD') }} <!-- 2024-01-01 -->
{{ items | pluck('name') }}     <!-- ['Item1', 'Item2'] -->
{{ items | orderBy('price') }}  <!-- Sorted by price -->
                    '></code-block>
                `,
            },
            cli: {
                title: 'CLI',
                content: `
                    <h1>CLI Commands</h1>

                    <h2>dev</h2>
                    <p>Start development server with hot reload.</p>
                    <code-block language="bash" code='
teloce dev
teloce dev --port 3000
teloce dev --proxy http://localhost:5000
                    '></code-block>

                    <h2>build</h2>
                    <p>Build for production.</p>
                    <code-block language="bash" code='
teloce build
teloce build --out-dir build
teloce build --no-minify
                    '></code-block>

                    <h2>debug</h2>
                    <p>Open debugger dashboard.</p>
                    <code-block language="bash" code='
teloce debug
teloce debug --port 9001
                    '></code-block>

                    <h2>create</h2>
                    <p>Create a new project.</p>
                    <code-block language="bash" code='
teloce create my-app
teloce create my-app --template django
teloce create my-app --no-install
                    '></code-block>

                    <h2>doctor</h2>
                    <p>Check environment and configuration.</p>
                    <code-block language="bash" code='
teloce doctor
teloce doctor --verbose
                    '></code-block>

                    <h2>lint</h2>
                    <p>Lint your Teloce templates.</p>
                    <code-block language="bash" code='
teloce lint
teloce lint --fix
teloce lint --strict
                    '></code-block>

                    <h2>watch</h2>
                    <p>Watch for changes and rebuild.</p>
                    <code-block language="bash" code='
teloce watch
teloce watch --out-dir build
                    '></code-block>
                `,
            },
            router: {
                title: 'Router API',
                content: `
                    <h1>Router API</h1>
                    <p>The Teloce Router is a lightweight client-side router for building SPAs.</p>

                    <h2>Installation</h2>
                    <code-block language="bash" code='npm install @teloce/router'></code-block>

                    <h2>createRouter</h2>
                    <p>Creates a new router instance.</p>
                    <code-block language="javascript" code='
import { createRouter } from '@teloce/router';

const routes = [
    { path: '/', component: HomePage },
    { path: '/about', component: AboutPage },
    { path: '/users/:id', component: UserPage }
];

const router = createRouter(routes);
                    '></code-block>

                    <h3>Parameters</h3>
                    <ul>
                        <li><code>routes</code> - Array of route objects</li>
                        <li><code>routes[].path</code> - Route path (supports <code>:param</code> dynamic segments)</li>
                        <li><code>routes[].component</code> - Component to render</li>
                    </ul>

                    <h2>Router Properties</h2>
                    <ul>
                        <li><code>router.path</code> - Signal containing current path</li>
                        <li><code>router.params</code> - Signal containing current route params</li>
                    </ul>

                    <h2>Router Methods</h2>
                    <h3>navigate(to)</h3>
                    <p>Navigates to a new route.</p>
                    <code-block language="javascript" code='
router.navigate('/about');
router.navigate('/users/42');
                    '></code-block>

                    <h3>mount(container, ctx)</h3>
                    <p>Mounts the router to a DOM container.</p>
                    <code-block language="javascript" code='
router.mount(document.getElementById('app'), {
    user: currentUser
});
                    '></code-block>

                    <h2>Route Components</h2>
                    <p>Route components receive the route context:</p>
                    <code-block language="javascript" code='
const UserPage = {
    template: function(container, ctx) {
        const userId = ctx.params.id;
        container.innerHTML = '<h1>User: ' + userId + '</h1>';
    }
};

const routes = [
    { path: '/users/:id', component: UserPage }
];
                    '></code-block>

                    <h2>Full Example</h2>
                    <code-block language="javascript" code='
import { createRouter } from '@teloce/router';
import { createApp } from '@teloce/core';

// Define route components
const HomePage = {
    template: (container) => {
        container.innerHTML = '<h1>Home Page</h1>';
    }
};

const AboutPage = {
    template: (container) => {
        container.innerHTML = '<h1>About Us</h1>';
    }
};

const UserPage = {
    template: (container, ctx) => {
        container.innerHTML = '<h1>User: ' + ctx.params.id + '</h1>';
    }
};

// Create router
const routes = [
    { path: '/', component: HomePage },
    { path: '/about', component: AboutPage },
    { path: '/users/:id', component: UserPage }
];

const router = createRouter(routes);

// Create app
const app = teloce.createApp('#app', {
    router
});

// Navigation
document.querySelector('.nav-about').addEventListener('click', () => {
    router.navigate('/about');
});
                    '></code-block>
                `,
            },
            'plugin-system': {
                title: 'Plugin System',
                content: `
                    <h1>Plugin System</h1>
                    <p>Extend Teloce with custom directives, filters, components, and more.</p>

                    <h2>Installation</h2>
                    <code-block language="bash" code='npm install @teloce/plugin-system'></code-block>

                    <h2>Creating a Plugin</h2>
                    <code-block language="javascript" code='
const MyPlugin = {
    name: 'my-plugin',
    version: '1.0.0',

    directives: [
        {
            name: 'focus',
            render: (el, binding) => {
                el.focus();
            }
        }
    ],

    filters: [
        {
            name: 'reverse',
            transform: (value) => value.split('').reverse().join('')
        }
    ],

    hooks: {
        init: (api) => {
            api.registerHelper('hello', () => 'Hello from plugin!');
        }
    }
};

// Use the plugin
app.use(MyPlugin);
                    '></code-block>

                    <h2>Plugin Capabilities</h2>
                    <ul>
                        <li><strong>Custom Directives</strong> - Add new directives</li>
                        <li><strong>Custom Filters</strong> - Add new filters</li>
                        <li><strong>Custom Components</strong> - Register components</li>
                        <li><strong>Helpers</strong> - Add utility functions</li>
                        <li><strong>Lifecycle Hooks</strong> - beforeCompile, afterCompile, beforeRender, afterRender</li>
                    </ul>

                    <h2>Plugin API Methods</h2>
                    <ul>
                        <li><code>registerDirective(directive)</code> - Register a custom directive</li>
                        <li><code>registerFilter(filter)</code> - Register a custom filter</li>
                        <li><code>registerComponent(component)</code> - Register a custom component</li>
                        <li><code>registerHelper(name, value)</code> - Register a helper</li>
                        <li><code>registerHook(name, handler)</code> - Register a lifecycle hook</li>
                        <li><code>getConfig(key)</code> - Get plugin configuration</li>
                        <li><code>setConfig(key, value)</code> - Set plugin configuration</li>
                    </ul>
                `,
            },
        },
    },



    'vite-plugin': {
    title: 'Vite Plugin',
    content: `
        <h1>Vite Plugin</h1>
        <p>The Teloce Vite plugin enables seamless integration with Vite for building applications with .vel Single File Components.</p>

        <h2>Installation</h2>
        <code-block language="bash" code='
npm install -D @teloce/vite-plugin
        '></code-block>

        <h2>Basic Setup</h2>
        <code-block language="javascript" code='
// vite.config.js
import { defineConfig } from 'vite';
import teloce from '@teloce/vite-plugin';

export default defineConfig({
    plugins: [
        teloce({
            sourceMap: true,
            scoped: true
        })
    ]
});
        '></code-block>

        <h2>Configuration Options</h2>
        <table>
            <thead>
                <tr><th>Option</th><th>Type</th><th>Default</th><th>Description</th></tr>
            </thead>
            <tbody>
                <tr>
                    <td><code>include</code></td>
                    <td><code>string | RegExp | Array</code></td>
                    <td><code>['**/*.teloce', '**/*.vel']</code></td>
                    <td>File patterns to include</td>
                </tr>
                <tr>
                    <td><code>exclude</code></td>
                    <td><code>string | RegExp | Array</code></td>
                    <td><code>['node_modules/**', 'dist/**']</code></td>
                    <td>File patterns to exclude</td>
                </tr>
                <tr>
                    <td><code>sourceMap</code></td>
                    <td><code>boolean</code></td>
                    <td><code>true</code></td>
                    <td>Enable source maps</td>
                </tr>
                <tr>
                    <td><code>minify</code></td>
                    <td><code>boolean</code></td>
                    <td><code>process.env.NODE_ENV === 'production'</code></td>
                    <td>Enable minification</td>
                </tr>
                <tr>
                    <td><code>dev</code></td>
                    <td><code>boolean</code></td>
                    <td><code>process.env.NODE_ENV === 'development'</code></td>
                    <td>Development mode</td>
                </tr>
                <tr>
                    <td><code>scoped</code></td>
                    <td><code>boolean</code></td>
                    <td><code>true</code></td>
                    <td>Enable scoped CSS</td>
                </tr>
                <tr>
                    <td><code>plugins</code></td>
                    <td><code>Array</code></td>
                    <td><code>[]</code></td>
                    <td>Custom plugins</td>
                </tr>
                <tr>
                    <td><code>directives</code></td>
                    <td><code>Array</code></td>
                    <td><code>[]</code></td>
                    <td>Custom directives</td>
                </tr>
                <tr>
                    <td><code>filters</code></td>
                    <td><code>Array</code></td>
                    <td><code>[]</code></td>
                    <td>Custom filters</td>
                </tr>
            </tbody>
        </table>

        <h2>Custom Directives</h2>
        <code-block language="javascript" code='
// vite.config.js
import { defineConfig } from 'vite';
import teloce from '@teloce/vite-plugin';

export default defineConfig({
    plugins: [
        teloce({
            directives: [
                {
                    name: 'animate',
                    transform: (node, context) => {
                        // Transform directive
                        return node;
                    }
                }
            ]
        })
    ]
});
        '></code-block>

        <h2>Custom Filters</h2>
        <code-block language="javascript" code='
// vite.config.js
import { defineConfig } from 'vite';
import teloce from '@teloce/vite-plugin';

export default defineConfig({
    plugins: [
        teloce({
            filters: [
                {
                    name: 'markdown',
                    transform: (value) => {
                        // Convert Markdown to HTML
                        return value;
                    }
                }
            ]
        })
    ]
});
        '></code-block>

        <h2>Hot Module Replacement (HMR)</h2>
        <p>The plugin supports HMR for .vel files. When a .vel file changes, the component updates without a full page reload.</p>

        <h2>Using .vel Files with Vite</h2>
        <code-block language="javascript" code='
// Import .vel components
import MyComponent from './components/MyComponent.vel';

const app = teloce.createApp('#app', {
    components: {
        MyComponent
    }
});
        '></code-block>

        <h2>Vite + Python Integration</h2>
        <p>Use Vite's proxy to work with your Python backend:</p>
        <code-block language="javascript" code='
// vite.config.js
import { defineConfig } from 'vite';
import teloce from '@teloce/vite-plugin';

export default defineConfig({
    plugins: [teloce()],
    server: {
        proxy: {
            '/api': {
                target: 'http://localhost:5000',
                changeOrigin: true
            }
        }
    }
});
        '></code-block>

        <h2>Production Build</h2>
        <code-block language="bash" code='
# Build for production
vite build
        '></code-block>

        <h2>Development Server</h2>
        <code-block language="bash" code='
# Start dev server with HMR
vite
        '></code-block>
    `
}
        
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

                    <h2>Starting the Debugger</h2>
                    <code-block language="bash" code='
# Start the debugger server
teloce debug

# Custom port
teloce debug --port 9001

# Don't auto-open browser
teloce debug --no-open
                    '></code-block>

                    <h2>Debugger Dashboard</h2>
                    <p>The debugger dashboard opens at <code>http://localhost:9000</code> with tabs:</p>
                    <ul>
                        <li><strong>Overview</strong> - Application status, errors, performance</li>
                        <li><strong>Components</strong> - Component tree with render counts</li>
                        <li><strong>State</strong> - Reactive state viewer</li>
                        <li><strong>Errors</strong> - Human-friendly error messages</li>
                        <li><strong>Performance</strong> - FPS, memory, compile time</li>
                        <li><strong>Logs</strong> - Application logs</li>
                    </ul>

                    <h2>Error Types</h2>
                    <ul>
                        <li><strong>Type Errors</strong> - Type mismatches (string → number)</li>
                        <li><strong>Reference Errors</strong> - Undefined variables</li>
                        <li><strong>Property Errors</strong> - Accessing properties on null/undefined</li>
                        <li><strong>Function Errors</strong> - Calling non-functions</li>
                        <li><strong>Import Errors</strong> - Module not found</li>
                        <li><strong>Syntax Errors</strong> - Invalid syntax</li>
                        <li><strong>Template Errors</strong> - Template parsing errors</li>
                        <li><strong>Binding Errors</strong> - Invalid bindings</li>
                    </ul>

                    <h2>Debug CDN</h2>
                    <p>For development, use the debug build which includes verbose error messages:</p>
                    <code-block language="html" code='<script src="https://cdn.jsdelivr.net/npm/teloce@1/dist/teloce.debug.js"><\/script>'></code-block>
                `,
            },
            performance: {
                title: 'Performance',
                content: `
                    <h1>Performance Monitoring</h1>
                    <p>Monitor your application's performance in real-time.</p>

                    <h2>Metrics Tracked</h2>
                    <ul>
                        <li><strong>FPS</strong> - Frames per second</li>
                        <li><strong>Memory Usage</strong> - Current memory consumption</li>
                        <li><strong>Compile Time</strong> - Time to compile templates</li>
                        <li><strong>Component Render Times</strong> - Time to render each component</li>
                        <li><strong>DOM Operations</strong> - Number of DOM operations</li>
                    </ul>

                    <h2>Using the Performance Panel</h2>
                    <p>Open the debugger dashboard and navigate to the Performance tab to see:</p>
                    <ul>
                        <li>Real-time FPS graph</li>
                        <li>Memory usage timeline</li>
                        <li>Component performance breakdown</li>
                        <li>Slow operations detection</li>
                    </ul>

                    <h2>Performance Tips</h2>
                    <ul>
                        <li>Use <code>key</code> in <code>&lt;for&gt;</code> loops for better list rendering</li>
                        <li>Use <code>createMemo</code> for expensive computations</li>
                        <li>Batch updates with <code>batch()</code></li>
                        <li>Use <code>untracked</code> for reads that shouldn't trigger effects</li>
                    </ul>
                `,
            },
            inspector: {
                title: 'Component Inspector',
                content: `
                    <h1>Component Inspector</h1>
                    <p>Inspect your component tree and state.</p>

                    <h2>Features</h2>
                    <ul>
                        <li><strong>Component Tree</strong> - Visual component hierarchy</li>
                        <li><strong>State Inspector</strong> - View reactive state in real-time</li>
                        <li><strong>Render Tracking</strong> - Render counts and timings</li>
                        <li><strong>Props Viewer</strong> - Props passed to each component</li>
                        <li><strong>DOM Mapping</strong> - Link components to DOM elements</li>
                    </ul>

                    <h2>Using the Inspector</h2>
                    <ol>
                        <li>Open the debugger dashboard (<code>teloce debug</code>)</li>
                        <li>Click on the "Components" tab</li>
                        <li>Browse the component tree</li>
                        <li>Click on any component to inspect its state</li>
                        <li>Watch state updates in real-time</li>
                    </ol>
                `,
            },
            troubleshooting: {
                title: 'Troubleshooting',
                content: `
                    <h1>Troubleshooting</h1>
                    <p>Common issues and how to fix them.</p>

                    <h2>Components Not Rendering</h2>
                    <ul>
                        <li>Check that the component is registered</li>
                        <li>Verify the component name matches the tag name</li>
                        <li>Check for syntax errors in the template</li>
                        <li>Ensure the root element exists in the DOM</li>
                    </ul>

                    <h2>State Not Updating</h2>
                    <ul>
                        <li>Verify you're using signals correctly</li>
                        <li>Check that you're mutating state properly</li>
                        <li>Ensure you're not replacing the entire state object</li>
                        <li>Use <code>batch()</code> for multiple updates</li>
                    </ul>

                    <h2>Event Handlers Not Firing</h2>
                    <ul>
                        <li>Check the event binding syntax (<code>@click</code> not <code>v-on:click</code>)</li>
                        <li>Verify the method exists in the component</li>
                        <li>Check for event modifiers interfering</li>
                    </ul>

                    <h2>CSS Not Applying</h2>
                    <ul>
                        <li>Check that styles are loaded</li>
                        <li>Verify class names match</li>
                        <li>For scoped CSS, ensure the <code>scoped</code> attribute is correct</li>
                    </ul>

                    <h2>Debugging Tips</h2>
                    <ul>
                        <li>Use <code>teloce debug</code> to open the debugger</li>
                        <li>Check the browser console for errors</li>
                        <li>Use the Component Inspector to view state</li>
                        <li>Enable verbose logging with <code>DEBUG=teloce:*</code></li>
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
    const app = teloce.createApp('#app', {
        title: 'Counter',
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
    <p>{{ todos.filter(t => !t.done).length }} remaining</p>
</div>

<script>
    const app = teloce.createApp('#app', {
        newTodo: '',
        todos: [
            { id: 1, text: 'Learn Teloce', done: false },
            { id: 2, text: 'Build a project', done: false }
        ],
        addTodo() {
            if (this.newTodo.trim()) {
                this.todos.push({
                    id: Date.now(),
                    text: this.newTodo.trim(),
                    done: false
                });
                this.newTodo = '';
            }
        },
        deleteTodo(id) {
            this.todos = this.todos.filter(t => t.id !== id);
        },
        toggleTodo(id) {
            const todo = this.todos.find(t => t.id === id);
            if (todo) todo.done = !todo.done;
        }
    });
</script>
                    '></code-block>
                `,
            },
            fetch: {
                title: 'API Fetch',
                content: `
                    <h1>API Fetch Example</h1>
                    <p>Fetch data from an API endpoint with loading and error states.</p>
                    <code-block language="html" code='
<div id="app">
    <h1>{{ title }}</h1>
    <button @click="fetchData" :disabled="loading">
        {{ loading ? 'Loading...' : 'Fetch Data' }}
    </button>
    <ul>
        <for key="id" item="item" in="data">
            <li>{{ item.name }}</li>
        </for>
    </ul>
    <p :show="error" class="error">{{ error }}</p>
</div>

<script>
    const app = teloce.createApp('#app', {
        title: 'API Data Fetcher',
        data: [],
        loading: false,
        error: null,
        async fetchData() {
            this.loading = true;
            this.error = null;
            try {
                const response = await fetch('/api/data');
                if (!response.ok) throw new Error('Failed to fetch');
                this.data = await response.json();
            } catch (err) {
                this.error = err.message;
            } finally {
                this.loading = false;
            }
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
    <h1>{{ title }}</h1>
    <form @submit.prevent="handleSubmit">
        <div>
            <label>Name</label>
            <input :model="form.name" placeholder="Enter your name" />
            <span class="error">{{ errors.name }}</span>
        </div>
        <div>
            <label>Email</label>
            <input :model="form.email" type="email" placeholder="Enter your email" />
            <span class="error">{{ errors.email }}</span>
        </div>
        <button type="submit" :disabled="submitting">
            {{ submitting ? 'Submitting...' : 'Submit' }}
        </button>
    </form>
    <p :show="submitted" class="success">✅ Form submitted successfully!</p>
</div>

<script>
    const app = teloce.createApp('#app', {
        title: 'Contact Form',
        form: { name: '', email: '' },
        errors: {},
        submitting: false,
        submitted: false,
        handleSubmit() {
            this.errors = {};
            this.submitted = false;

            if (!this.form.name.trim()) {
                this.errors.name = 'Name is required';
            }
            if (!this.form.email.trim()) {
                this.errors.email = 'Email is required';
            } else if (!this.form.email.includes('@')) {
                this.errors.email = 'Invalid email address';
            }

            if (Object.keys(this.errors).length > 0) return;

            this.submitting = true;
            setTimeout(() => {
                this.submitting = false;
                this.submitted = true;
                console.log('Form submitted:', this.form);
            }, 1000);
        }
    });
</script>
                    '></code-block>
                `,
            },
            routing: {
                title: 'Routing Example',
                content: `
                    <h1>Routing Example</h1>
                    <p>Using the Teloce Router to build a multi-page SPA.</p>
                    <code-block language="javascript" code='
import { createRouter } from '@teloce/router';
import { createApp } from '@teloce/core';

// Define page components
const HomePage = {
    template: (container) => {
        container.innerHTML = \`
            <h1>🏠 Home</h1>
            <p>Welcome to the Teloce Router example!</p>
        \`;
    }
};

const AboutPage = {
    template: (container) => {
        container.innerHTML = \`
            <h1>📖 About</h1>
            <p>Teloce is a template engine for Python developers.</p>
        \`;
    }
};

const UserPage = {
    template: (container, ctx) => {
        container.innerHTML = \`
            <h1>👤 User: ${ctx.params.id}</h1>
            <p>User profile for ID: ${ctx.params.id}</p>
        \`;
    }
};

// Create router
const routes = [
    { path: '/', component: HomePage },
    { path: '/about', component: AboutPage },
    { path: '/users/:id', component: UserPage }
];

const router = createRouter(routes);

// Create app
const app = teloce.createApp('#app', {
    router
});

// Navigation
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        router.navigate(link.getAttribute('href'));
    });
});
                    '></code-block>
                `,
            },
            'vel-flask': {
                title: '.vel Files with Flask',
                content: `
                    <h1>.vel Files with Flask</h1>
                    <p>Using Single File Components with a Flask backend.</p>

                    <h2>Project Structure</h2>
                    <code-block language="text" code='
project/
├── app.py
├── templates/
│   └── index.html
└── static/
    └── js/
        ├── app.vel
        └── components/
            ├── ProductCard.vel
            └── CartWidget.vel
                    '></code-block>

                    <h2>Flask App</h2>
                    <code-block language="python" code='
from flask import Flask, render_template

app = Flask(__name__)

PRODUCTS = [
    {'id': 1, 'name': 'Laptop', 'price': 999.99},
    {'id': 2, 'name': 'Headphones', 'price': 199.99},
]

@app.route('/')
def home():
    return render_template('index.html', products=PRODUCTS)
                    '></code-block>

                    <h2>HTML Template</h2>
                    <code-block language="html" code='
<!-- templates/index.html -->
<script src="https://cdn.jsdelivr.net/npm/teloce@1/dist/teloce.global.min.js"><\/script>

<div id="app"></div>

<script type="module">
    import App from '/static/js/app.vel';

    const app = teloce.createApp('#app', {
        products: {{ products|tojson }}
    });

    app.component('App', App);
<\/script>
                    '></code-block>

                    <h2>Main Component (app.vel)</h2>
                    <code-block language="html" code='
<!-- static/js/app.vel -->
<template>
    <div>
        <h1>Product Dashboard</h1>
        <div class="products">
            <for key="id" item="product" in="products">
                <product-card :product="product" />
            </for>
        </div>
    </div>
</template>

<script>
import ProductCard from './components/ProductCard.vel';

export default {
    name: 'App',
    components: { ProductCard },
    data() {
        return {
            products: []
        };
    }
};
</script>

<style scoped>
.products {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 16px;
}
</style>
                    '></code-block>

                    <h2>Child Component (ProductCard.vel)</h2>
                    <code-block language="html" code='
<!-- static/js/components/ProductCard.vel -->
<template>
    <div class="card">
        <h3>{{ product.name }}</h3>
        <p>${{ product.price | currency }}</p>
        <button @click="addToCart">Add to Cart</button>
    </div>
</template>

<script>
export default {
    name: 'ProductCard',
    props: {
        product: {
            type: Object,
            required: true
        }
    },
    methods: {
        addToCart() {
            this.$emit('add-to-cart', this.product);
        }
    }
};
</script>

<style scoped>
.card {
    border: 1px solid #ddd;
    padding: 16px;
    border-radius: 8px;
}
.card h3 { margin: 0 0 8px 0; }
</style>
                    '></code-block>

                    <h2>Compiling</h2>
                    <code-block language="bash" code='
# Install CLI
npm install -g @teloce/cli

# Build .vel files
teloce build

# Watch for changes
teloce watch
                    '></code-block>
                `,
            },
            'vel-django': {
                title: '.vel Files with Django',
                content: `
                    <h1>.vel Files with Django</h1>
                    <p>Using Single File Components with a Django backend.</p>

                    <h2>Project Structure</h2>
                    <code-block language="text" code='
project/
├── manage.py
├── myapp/
│   ├── views.py
│   └── templates/
│       └── index.html
└── static/
    └── js/
        ├── app.vel
        └── components/
            └── ProductCard.vel
                    '></code-block>

                    <h2>Django View</h2>
                    <code-block language="python" code='
# views.py
from django.shortcuts import render
from django.http import JsonResponse

PRODUCTS = [
    {'id': 1, 'name': 'Laptop', 'price': 999.99},
    {'id': 2, 'name': 'Headphones', 'price': 199.99},
]

def home(request):
    return render(request, 'index.html', {'products': PRODUCTS})
                    '></code-block>

                    <h2>HTML Template</h2>
                    <code-block language="html" code='
<!-- templates/index.html -->
{% load static %}
<script src="https://cdn.jsdelivr.net/npm/teloce@1/dist/teloce.global.min.js"><\/script>

<div id="app"></div>

<script type="module">
    import App from '{% static "js/app.vel" %}';

    const app = teloce.createApp('#app', {
        products: {{ products|safe }}
    });

    app.component('App', App);
<\/script>
                    '></code-block>
                `,
            },
            'vel-fastapi': {
                title: '.vel Files with FastAPI',
                content: `
                    <h1>.vel Files with FastAPI</h1>
                    <p>Using Single File Components with a FastAPI backend.</p>

                    <h2>Project Structure</h2>
                    <code-block language="text" code='
project/
├── main.py
├── templates/
│   └── index.html
└── static/
    └── js/
        ├── app.vel
        └── components/
            └── ProductCard.vel
                    '></code-block>

                    <h2>FastAPI App</h2>
                    <code-block language="python" code='
# main.py
from fastapi import FastAPI, Request
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles

app = FastAPI()
templates = Jinja2Templates(directory="templates")
app.mount("/static", StaticFiles(directory="static"), name="static")

PRODUCTS = [
    {'id': 1, 'name': 'Laptop', 'price': 999.99},
    {'id': 2, 'name': 'Headphones', 'price': 199.99},
]

@app.get("/")
async def home(request: Request):
    return templates.TemplateResponse("index.html", {
        "request": request,
        "products": PRODUCTS
    })
                    '></code-block>

                    <h2>HTML Template</h2>
                    <code-block language="html" code='
<!-- templates/index.html -->
<script src="https://cdn.jsdelivr.net/npm/teloce@1/dist/teloce.global.min.js"><\/script>

<div id="app"></div>

<script type="module">
    import App from '/static/js/app.vel';

    const app = teloce.createApp('#app', {
        products: {{ products|tojson }}
    });

    app.component('App', App);
<\/script>
                    '></code-block>
                `,
            },
        },
    },
};


        'vite-example': {
    title: 'Vite + .vel Example',
    content: `
        <h1>Vite + .vel Example</h1>
        <p>A complete example of using Teloce with Vite and .vel files.</p>

        <h2>Project Structure</h2>
        <code-block language="text" code='
project/
├── index.html
├── src/
│   ├── main.js
│   └── components/
│       ├── App.vel
│       └── ProductCard.vel
├── vite.config.js
└── package.json
        '></code-block>

        <h2>package.json</h2>
        <code-block language="json" code='
{
    "name": "vite-example",
    "scripts": {
        "dev": "vite",
        "build": "vite build",
        "preview": "vite preview"
    },
    "dependencies": {
        "teloce": "^0.3.0"
    },
    "devDependencies": {
        "@teloce/vite-plugin": "^0.3.0",
        "vite": "^5.0.0"
    }
}
        '></code-block>

        <h2>vite.config.js</h2>
        <code-block language="javascript" code='
import { defineConfig } from 'vite';
import teloce from '@teloce/vite-plugin';

export default defineConfig({
    plugins: [teloce()]
});
        '></code-block>

        <h2>index.html</h2>
        <code-block language="html" code='
<!DOCTYPE html>
<html>
<head>
    <title>Vite + Teloce</title>
</head>
<body>
    <div id="app"></div>
    <script type="module" src="/src/main.js"></script>
</body>
</html>
        '></code-block>

        <h2>main.js</h2>
        <code-block language="javascript" code='
import { createApp } from 'teloce';
import App from './components/App.vel';

const app = createApp('#app');
app.component('App', App);
        '></code-block>

        <h2>App.vel</h2>
        <code-block language="html" code='
<template>
    <div>
        <h1>{{ title }}</h1>
        <for key="id" item="product" in="products">
            <product-card :product="product" />
        </for>
    </div>
</template>

<script>
import ProductCard from './ProductCard.vel';

export default {
    name: 'App',
    components: { ProductCard },
    data() {
        return {
            title: 'Product List',
            products: [
                { id: 1, name: 'Product A', price: 19.99 },
                { id: 2, name: 'Product B', price: 29.99 }
            ]
        };
    }
};
</script>

<style scoped>
h1 { color: #6366f1; }
</style>
        '></code-block>

        <h2>Running the Example</h2>
        <code-block language="bash" code='
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
        '></code-block>
    `
}

// Build search index from docs data
function buildSearchIndex() {
    const index = [];
    for (const [sectionKey, sectionData] of Object.entries(docsData)) {
        const sectionName = sectionData.title || sectionKey;
        const pages = sectionData.pages || {};
        for (const [pageKey, pageData] of Object.entries(pages)) {
            const title = pageData.title || pageKey;
            let excerpt = pageData.content || '';
            excerpt = excerpt.replace(/<[^>]*>/g, '');
            excerpt = excerpt.substring(0, 150) + '...';
            index.push({
                title: title,
                section: sectionName,
                sectionSlug: sectionKey,
                pageSlug: pageKey,
                path: `/docs/${sectionKey}/${pageKey}`,
                excerpt: excerpt,
                content: pageData.content || '',
            });
        }
    }
    return index;
}

// Set global search index
const searchIndex = buildSearchIndex();
window.__TELOCE_SEARCH_INDEX = searchIndex;
window.__TELOCE_DOCS_DATA = docsData;

// Build nav for sidebar
function buildNav() {
    const nav = [];
    for (const [key, data] of Object.entries(docsData)) {
        const items = [];
        for (const [pageKey, pageData] of Object.entries(data.pages || {})) {
            items.push({
                title: pageData.title || pageKey,
                slug: pageKey,
            });
        }
        nav.push({
            title: data.title || key,
            slug: key,
            items: items,
        });
    }
    return nav;
}

window.__TELOCE_DOCS_NAV = buildNav();

// Export for use in other files
export { docsData, searchIndex, buildSearchIndex, buildNav };
