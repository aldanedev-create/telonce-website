/**
 * Navigation Data - Main navigation structure for the website
 */

var navigation = {
    header: {
        links: [
            { label: 'Docs', path: '/docs' },
            { label: 'Blog', path: '/blog' },
            { label: 'Community', path: '/community' },
            { label: 'Playground', path: '/playground' },
        ],
    },
    footer: {
        product: [
            { label: 'Docs', path: '/docs' },
            { label: 'Playground', path: '/playground' },
            { label: 'Releases', path: 'https://github.com/telocejs/teloce/releases', external: true },
            { label: 'Changelog', path: 'https://github.com/telocejs/teloce/blob/main/CHANGELOG.md', external: true },
        ],
        community: [
            { label: 'GitHub', path: 'https://github.com/telocejs/teloce', external: true },
            { label: 'Discord', path: 'https://discord.gg/teloce', external: true },
            { label: 'Twitter', path: 'https://twitter.com/telocejs', external: true },
            { label: 'YouTube', path: 'https://www.youtube.com/@telocejs', external: true },
        ],
        resources: [
            { label: 'Blog', path: '/blog' },
            { label: 'Contributing', path: 'https://github.com/telocejs/teloce/blob/main/CONTRIBUTING.md', external: true },
            { label: 'License', path: 'https://github.com/telocejs/teloce/blob/main/LICENSE', external: true },
            { label: 'Star on GitHub', path: 'https://github.com/telocejs/teloce', external: true },
        ],
    },
    social: [
        { name: 'GitHub', url: 'https://github.com/telocejs/teloce', icon: 'github' },
        { name: 'Twitter', url: 'https://twitter.com/telocejs', icon: 'twitter' },
        { name: 'Discord', url: 'https://discord.gg/teloce', icon: 'discord' },
        { name: 'YouTube', url: 'https://www.youtube.com/@telocejs', icon: 'youtube' },
    ],
};

// Set global nav data
window.__TELOCE_NAV_DATA = navigation;

// Export for use in other files
export { navigation };