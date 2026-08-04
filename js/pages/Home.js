/**
 * Home Page - Main landing page
 */

const HomePage = {
    template: `
        <div class="flex flex-col min-h-screen">
            <!-- Header -->
            <app-header
                :theme="theme"
                @toggle-theme="$emit('toggle-theme')"
                @toggle-mobile="$emit('toggle-mobile')"
                @toggle-search="$emit('toggle-search')"
            />

            <!-- Hero -->
            <app-hero />

            <!-- Features -->
            <app-features />

            <!-- Framework Support -->
            <app-framework-support />

            <!-- Testimonials -->
            <app-testimonials />

            <!-- CTA -->
            <app-cta-section />

            <!-- Footer -->
            <app-footer />
        </div>
    `,
    props: {
        theme: { type: String, default: 'light' },
    },
    emits: ['toggle-theme', 'toggle-mobile', 'toggle-search'],
};

export { HomePage };
