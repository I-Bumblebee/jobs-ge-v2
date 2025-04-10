import "~/assets/tailwind.css";
import "~/assets/fonts.css";
import {createApp} from 'vue';
import App from './App.vue';
import router from "@/entrypoints/jobs.content/router";
import {createPinia} from "pinia";


export default defineContentScript({
    matches: ['*://*.jobs.ge/*'],
    runAt: "document_start",
    cssInjectionMode: 'ui',

    async main(ctx) {
        const newHTML = `
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
        `;

        const newDoc = document.implementation.createHTMLDocument();
        newDoc.documentElement.innerHTML = newHTML;

        document.replaceChild(
            document.importNode(newDoc.documentElement, true),
            document.documentElement
        );

        await injectScript('/jobs-injected.js', {
            keepInDom: true,
        });

        const ui = await createShadowRootUi(ctx, {
            name: 'jobs-ge-v2',
            append: 'replace',
            position: 'inline',
            anchor: '#jobs-ge-app-root',
            onMount: (container) => {
                const app = createApp(App);
                app.use(createPinia());
                app.use(router);
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
