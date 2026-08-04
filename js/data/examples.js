/**
 * Examples Data - Code examples for the website
 */

var examples = {
    counter: {
        title: 'Counter',
        description: 'A simple counter with reactive state.',
        template: `
<div id="app">
    <h1>{{ title }}</h1>
    <button @click="count++">Count: {{ count }}</button>
</div>
        `,
        script: `
teloce.createApp('#app', {
    title: 'Counter',
    count: 0
});
        `,
        style: `
button {
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
}
        `,
    },
    todo: {
        title: 'Todo App',
        description: 'A todo list with add, delete, and toggle functionality.',
        template: `
<div id="app">
    <h1>Todo List</h1>
    <input :model="newTodo" @keyup.enter="addTodo" placeholder="Add a todo..." />
    <button @click="addTodo">Add</button>
    <ul>
        <for key="id" item="todo" in="todos">
            <li :class="{ done: todo.done }">
                <span @click="toggleTodo(todo.id)">{{ todo.text }}</span>
                <button @click="deleteTodo(todo.id)">✕</button>
            </li>
        </for>
    </ul>
    <p>{{ activeTodos }} remaining</p>
</div>
        `,
        script: `
teloce.createApp('#app', {
    newTodo: '',
    todos: [
        { id: 1, text: 'Learn Teloce', done: true },
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
    },
    computed: {
        activeTodos() {
            return this.todos.filter(t => !t.done).length;
        }
    }
});
        `,
        style: `
.done {
    text-decoration: line-through;
    opacity: 0.6;
}
        `,
    },
    fetch: {
        title: 'API Fetch',
        description: 'Fetch data from an API endpoint.',
        template: `
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
    <p v-if="error" class="error">{{ error }}</p>
</div>
        `,
        script: `
teloce.createApp('#app', {
    title: 'API Data Fetcher',
    data: [],
    loading: false,
    error: null,
    async fetchData() {
        this.loading = true;
        this.error = null;
        try {
            const response = await fetch('/api/data');
            this.data = await response.json();
        } catch (err) {
            this.error = err.message || 'Failed to fetch data';
        } finally {
            this.loading = false;
        }
    }
});
        `,
        style: `
.error {
    color: red;
}
        `,
    },
    form: {
        title: 'Form Validation',
        description: 'A form with validation and two-way binding.',
        template: `
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
    <p v-if="submitted" class="success">✅ Form submitted successfully!</p>
</div>
        `,
        script: `
teloce.createApp('#app', {
    title: 'Contact Form',
    form: {
        name: '',
        email: ''
    },
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
        }, 1000);
    }
});
        `,
        style: `
.error {
    color: red;
    font-size: 14px;
}
.success {
    color: green;
}
        `,
    },
};

// Set global examples data
window.__TELOCE_EXAMPLES_DATA = examples;

// Export for use in other files
export { examples };