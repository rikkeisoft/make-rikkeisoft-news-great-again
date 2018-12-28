chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  switch (request.name) {
    case 'showPopupOnUpdated':
      alert('Extension got updated to latest version: ' + request.version)
      break
  }
})
