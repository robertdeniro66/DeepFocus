// Listen for tab URL changes or reloads
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.active) {
    // Add a small delay to ensure content script is loaded
    setTimeout(() => {
      chrome.tabs.sendMessage(tabId, { type: 'reset' }).catch(() => {
        // Ignore errors if content script isn't ready
      });
    }, 100);
  }
});

// Listen for idle state changes
chrome.idle.onStateChanged.addListener((newState) => {
  if (newState === 'idle' || newState === 'locked') {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      for (const tab of tabs) {
        if (tab.id) {
          // Add a small delay to ensure content script is loaded
          setTimeout(() => {
            chrome.tabs.sendMessage(tab.id, { type: 'reset' }).catch(() => {
              // Ignore errors if content script isn't ready
            });
          }, 100);
        }
      }
    });
  }
}); 