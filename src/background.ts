import browser from 'webextension-polyfill';

// Listen for tab URL changes or reloads
browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.active) {
    browser.tabs.sendMessage(tabId, { type: 'reset' });
  }
});

// Listen for idle state changes
browser.idle.onStateChanged.addListener((newState) => {
  if (newState === 'idle' || newState === 'locked') {
    browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
      for (const tab of tabs) {
        if (tab.id) {
          browser.tabs.sendMessage(tab.id, { type: 'reset' });
        }
      }
    });
  }
});

// Listen for storage changes (options)
browser.storage.onChanged.addListener((changes, area) => {
  if (area === 'sync') {
    browser.tabs.query({}).then((tabs) => {
      for (const tab of tabs) {
        if (tab.id) {
          browser.tabs.sendMessage(tab.id, { type: 'optionsChanged' });
        }
      }
    });
  }
}); 