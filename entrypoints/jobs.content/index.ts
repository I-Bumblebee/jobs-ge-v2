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
    runAt: "document_start",
    cssInjectionMode: 'ui',

    async main(ctx) {
        await injectScript('/jobs-injected.js', {
            keepInDom: true,
        });

        document.open();
        document.write(`
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Jobs.ge</title>
            </head>
            <body style="margin: 0;">
              <div id="jobs-ge-app-root"></div>
            </body>
          </html>
        `);
        document.close();

        const ui = await createShadowRootUi(ctx, {
            name: 'jobs-ge-v2',
            append: 'replace',
            position: 'inline',
            anchor: '#jobs-ge-app-root',
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