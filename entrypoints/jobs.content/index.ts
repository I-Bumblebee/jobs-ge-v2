import "~/assets/tailwind.css";
import "~/assets/fonts.css";
import {createApp} from 'vue';
import App from './App.vue';
import router from "@/entrypoints/jobs.content/router";
import {createPinia} from "pinia";

declare global {
    interface Window {
        __ORIGINAL_BODY_CONTENT__?: string;
    }
}

export default defineContentScript({
    matches: ['*://*.jobs.ge/*'],
    cssInjectionMode: 'ui',

    async main(ctx) {
        await injectScript('/jobs-injected.js', {
            keepInDom: true,
        });

        window.__ORIGINAL_BODY_CONTENT__ = document.body.innerHTML;

        const ui = await createShadowRootUi(ctx, {
            name: 'jobs-ge-v2',
            append: 'replace',
            position: 'inline',
            anchor: 'body',
            onMount: (container) => {
                const app = createApp(App, {
                    originalContent: window.__ORIGINAL_BODY_CONTENT__
                });
                app.use(createPinia());
                app.use(router)
                app.mount(container);
                return app;
            },
            onRemove: (app) => {
                app?.unmount();
                delete window.__ORIGINAL_BODY_CONTENT__;
            },
        });

        ui.mount();
    },
});