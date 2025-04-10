export default defineBackground(() => {
  chrome.webNavigation.onBeforeNavigate.addListener(async ({ frameId, tabId }) => {
    if (frameId !== 0) return;

    await chrome.declarativeNetRequest.updateEnabledRulesets({
      enableRulesetIds: ['ruleset_1'],
    });
  });

  chrome.webNavigation.onCompleted.addListener(async ({ frameId, tabId }) => {
    if (frameId !== 0) return;

    await chrome.declarativeNetRequest.updateEnabledRulesets({
      disableRulesetIds: ['ruleset_1'],
    });
  });
});
