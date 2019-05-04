chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  switch (request.name) {
    case 'showPopupOnUpdated':
      alert('Make Rikkeisoft News Great Again got updated to latest version: ' + request.version)
      break
  }
})
