// Saves options to chrome.storage.sync.
function saveOptions() {
  const useGallery = document.getElementById('use-gallery').checked
  const useHoverCard = document.getElementById('use-hover-card').checked
  const hideMultimediaWidget = document.getElementById('hide-multimedia-widget').checked

  chrome.storage.sync.set(
    {
      useGallery,
      useHoverCard,
      hideMultimediaWidget,
    },
    () => {
      // Update status to let user know options were saved.
      const status = document.getElementById('status')
      status.textContent = 'Options saved.'
      setTimeout(() => {
        status.textContent = ''
      }, 1000)
    },
  )
}

// Restores select box and checkbox state using the preferences stored in chrome.storage.
function restoreOptions() {
  chrome.storage.sync.get(
    {
      useGallery: true,
      useHoverCard: true,
      hideMultimediaWidget: false,
    },
    (items) => {
      document.getElementById('use-gallery').checked = items.useGallery
      document.getElementById('use-hover-card').checked = items.useHoverCard
      document.getElementById('hide-multimedia-widget').checked = items.hideMultimediaWidget
    },
  )
}

document.addEventListener('DOMContentLoaded', restoreOptions)
document.getElementById('save').addEventListener('click', saveOptions)
