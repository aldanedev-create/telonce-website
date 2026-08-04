/**
 * Playground Page - Interactive playground iframe
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

            <main class="flex-1 pt-16 md:pt-20">
                <div class="h-[calc(100vh-4rem)] md:h-[calc(100vh-5rem)]">
                    <iframe
                        src="/playground/index.html"
                        class="w-full h-full border-0"
                        sandbox="allow-scripts allow-modals allow-same-origin"
                        loading="lazy"
                    ></iframe>
                </div>
            </main>

            <app-footer />
        </div>
    `,
    props: {
        theme: { type: String, default: 'light' },
    },
    emits: ['toggle-theme', 'toggle-mobile', 'toggle-search'],
};