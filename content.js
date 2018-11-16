const IMAGE_TYPE = 0
const TEXT_TYPE = 1
const imgDict = [
  ['https://rikkei.vn/asset_news/images/emoticons/smile.gif', 'https://i.imgur.com/YGIkOiD.png'],
]
const textDict = [
  [':thuy1:', 'https://i.imgur.com/DaUJ5UR.png'],
  [':thuy2:', 'https://i.imgur.com/l9EkGrs.png'],
  [':thuy3:', 'https://i.imgur.com/D3biQwr.png'],
  [':thuy4:', 'https://i.imgur.com/gNBKAvp.png'],
  [':thuy5:', 'https://i.imgur.com/Z9sNSrS.jpg'],
  [':vu1:', 'https://i.imgur.com/O2FHsBc.jpg'],
  [':sa1:', 'https://i.imgur.com/IrN2eyd.jpg'],
  ['<3', 'https://rikkei.vn/asset_news/images/emoticons/inlove.gif']
]
const imgMap = new Map(imgDict)
const textMap = new Map(textDict)

const getReplacingContent = (value, type = TEXT_TYPE) => {
  let content
  if (type === TEXT_TYPE) {
    content = textMap.get(value)
  } else {
    content = imgMap.get(value)
  }
  return content
}

const clean = () => {
  const elements = document.querySelectorAll('.span-comment')

  for (let i = 0; i < elements.length; i++) {
    const node = elements[i]
    if (node.nodeType === 1) {
      if (node.lastElementChild && node.lastElementChild.tagName === 'IMG') {
        const newSrc = getReplacingContent(node.lastElementChild.src, IMAGE_TYPE)
        if (newSrc) {
          node.lastElementChild.src = newSrc
        }
      } else {
        const newSrc = getReplacingContent(node.innerText, TEXT_TYPE)
        if (newSrc) {
          node.innerHTML = `<img src="${newSrc}" style="width: 80px;">`
        }
      }
    }
  }
}

const callback = (mutationsList, observer) => {
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
