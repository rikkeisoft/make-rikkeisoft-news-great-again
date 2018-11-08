const clean = function() {
  const elements = document.getElementsByTagName('*')

  for (let i = 0; i < elements.length; i++) {
    const element = elements[i]

    for (let j = 0; j < element.childNodes.length; j++) {
      const node = element.childNodes[j]

      if (node.nodeType === 1) {
        if (node.src === 'https://rikkei.vn/asset_news/images/emoticons/toan.png') {
          node.src = 'https://i.imgur.com/YGIkOiD.png'
        }
      }
    }
  }
}

const callback = function (mutationsList, observer) {
  for (let mutation of mutationsList) {
    if (mutation.type == 'childList') {
      clean()
    }
  }
}

clean()

const targetNode = document.getElementById('list-comment')
const config = {
  childList: true,
  subtree: true,
}
const observer = new MutationObserver(callback)
if (targetNode) {
  observer.observe(targetNode, config)
}
