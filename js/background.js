chrome.runtime.onInstalled.addListener((details) => {
  try {
    const currentVersion = chrome.runtime.getManifest().version
    if (details.reason === 'install') {
      console.info('First version installed')
    } else if (details.reason == 'update') {
      console.info('Updated version: ' + currentVersion)
      chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
        for (let i = 0; i < tabs.length; i++) {
          chrome.tabs.sendMessage(tabs[i].id, {
            name: 'showPopupOnUpdated',
            version: currentVersion,
          })
        }
      })
    }
  } catch (e) {
    console.info('OnInstall Error - ' + e)
  }
})
