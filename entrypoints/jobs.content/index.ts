import "~/assets/tailwind.css";
import { createApp } from 'vue';
import App from './App.vue';

export default defineContentScript({
    matches: ['*://*.jobs.ge/*'],
    cssInjectionMode: 'ui',

    async main(ctx) {
        console.log('Injecting script...');
        await injectScript('/jobs-injected.js', {
            keepInDom: true,
        });
        console.log('Done!');
        const ui = await createShadowRootUi(ctx, {
            name: 'jobs-ge-v2',
            append: 'first',
            position: 'inline',
            anchor: 'body',
            onMount: (container) => {
                const app = createApp(App);
                app.mount(container);
                return app;
            },
            onRemove: (app) => {
                app?.unmount();
            },
        });

        ui.mount();
    },
});