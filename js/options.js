// Saves options to chrome.storage.sync.
function saveOptions() {
  // const useFixedHeader = document.getElementById('fixed-header').checked
  // const shouldHideNewRibbon = document.getElementById('hide-new-ribbon').checked
  // const shouldHideSidebar = document.getElementById('hide-sidebar').checked
  const useGallery = document.getElementById('use-gallery').checked
  const useHoverCard = document.getElementById('use-hover-card').checked

  chrome.storage.sync.set({
    // useFixedHeader,
    // shouldHideNewRibbon,
    // shouldHideSidebar,
    useGallery,
    useHoverCard,
  }, () => {
    // Update status to let user know options were saved.
    const status = document.getElementById('status');
    status.textContent = 'Options saved.'
    setTimeout(() => {
      status.textContent = ''
    }, 750)
  })
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restoreOptions() {
  chrome.storage.sync.get({
    // useFixedHeader: true,
    // shouldHideNewRibbon: true,
    // shouldHideSidebar: true,
    useGallery: true,
    useHoverCard: true,
  }, items => {
    // document.getElementById('fixed-header').checked = items.useFixedHeader
    // document.getElementById('hide-new-ribbon').checked = items.shouldHideNewRibbon
    // document.getElementById('hide-sidebar').checked = items.shouldHideSidebar
    document.getElementById('use-gallery').checked = items.useGallery
    document.getElementById('use-hover-card').checked = items.useHoverCard
  })
}

document.addEventListener('DOMContentLoaded', restoreOptions)
document.getElementById('save').addEventListener('click', saveOptions)
