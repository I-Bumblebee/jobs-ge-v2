import { defineConfig } from 'wxt';

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ['@wxt-dev/module-vue'],
  manifest: {
    declarative_net_request: {
      rule_resources: [
        {
          id: "ruleset_1",
          enabled: true,
          path: "rules.json"
        }
      ]
    },
    permissions: [
      "declarativeNetRequest",
      "declarativeNetRequestWithHostAccess",
      "webNavigation",
    ],
    web_accessible_resources: [
      {
        resources: ["jobs-injected.js"],
        matches: ["*://*/*"],
      }
    ]
  }
});
