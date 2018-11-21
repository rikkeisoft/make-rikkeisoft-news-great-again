const IMAGE_TYPE = 0
const TEXT_TYPE = 1
const IMG_TO_EMO_DICT = [
  ['https://rikkei.vn/asset_news/images/emoticons/smile.gif', 'https://i.imgur.com/YGIkOiD.png'],
  ['https://rikkei.vn/asset_news/images/emoticons/rainbowsmile.gif', 'https://i.imgur.com/YGIkOiD.png'],
]
const CUSTOM_TEXT_TO_EMO_DICT = [
  [':thuy1:', 'https://i.imgur.com/DaUJ5UR.png'],
  [':thuy2:', 'https://i.imgur.com/l9EkGrs.png'],
  [':thuy3:', 'https://i.imgur.com/D3biQwr.png'],
  [':thuy4:', 'https://i.imgur.com/gNBKAvp.png'],
  [':thuy5:', 'https://i.imgur.com/Z9sNSrS.jpg'],
  [':vu1:', 'https://i.imgur.com/O2FHsBc.jpg'],
  [':sa1:', 'https://i.imgur.com/IrN2eyd.jpg'],
  [':tuan1:', 'https://i.imgur.com/ssTJEGX.jpg'],
  [':tuan2:', 'https://i.imgur.com/cYKm7QL.jpg'],
  [':tuan3:', 'https://i.imgur.com/LB5s4YO.jpg'],
  [':dat1:', 'https://i.imgur.com/t9F5lf2.jpg'],
  [':meo1:', 'https://i.imgur.com/ow6D28e.gif'],
  [':meo2:', 'https://i.imgur.com/vp2m2q0.gif'],
  [':meo3:', 'https://i.imgur.com/pzWRzHc.gif'],
  [':meo4:', 'https://i.imgur.com/akb1HaS.gif'],
  [':meo5:', 'https://i.imgur.com/RUcyMv7.gif'],
  [':meo6:', 'https://i.imgur.com/DKAIcE9.gif'],
  [':meo7:', 'https://i.imgur.com/JNg85C4.gif'],
  [':meo8:', 'https://i.imgur.com/fDtmSjC.gif'],
  [':meo9:', 'https://i.imgur.com/GisUWG1.gif'],
  [':meo10:', 'https://i.imgur.com/4itFrVA.gif'],
  [':meo11:', 'https://i.imgur.com/NTofTXn.gif'],
  [':meo12:', 'https://i.imgur.com/ZV510FB.gif'],
  [':meo13:', 'https://i.imgur.com/tQUCSw0.gif'],
  [':meo14:', 'https://i.imgur.com/CW7W2hm.gif'],
  [':meo15:', 'https://i.imgur.com/Q0zdF5B.gif'],
  [':meo16:', 'https://i.imgur.com/3o7gfE6.gif'],
  [':meo17:', 'https://i.imgur.com/3o7gfE6.gif'],
  [':meo18:', 'https://i.imgur.com/lzEZpGO.gif'],
  [':meo19:', 'https://i.imgur.com/NLkRB1J.gif'],
  [':meo20:', 'https://i.imgur.com/AvDeOSO.gif'],
  [':meo21:', 'https://i.imgur.com/pxGZ5B8.gif'],
  [':bored_parrot:', 'https://i.imgur.com/U4hWizq.gif'],
  [':bow:', 'https://i.imgur.com/JwnKJsc.gif'],
  [':coffee_parrot:', 'https://i.imgur.com/5EaIwM9.gif'],
  [':doge_bread:', 'https://i.imgur.com/eDetip4.jpg'],
  [':doge:', 'https://i.imgur.com/39eQNsx.jpg'],
  [':slide_parrot:', 'https://i.imgur.com/JFg0DsX.gif'],
  [':fast_parrot:', 'https://i.imgur.com/aN0qzVH.gif'],
  [':grumpy:', 'https://i.imgur.com/eOfyX7n.png'],
  [':mooning:', 'https://i.imgur.com/MB28a06.png'],
  [':nyan_cat:', 'https://i.imgur.com/XXNirx9.png'],
  [':panda:', 'https://i.imgur.com/Dzy9Pqb.gif'],
  [':parrot:', 'https://i.imgur.com/0utmyvj.gif'],
  [':reverse_parrot:', 'https://i.imgur.com/kmw04qg.gif'],
  [':ship_parrot:', 'https://i.imgur.com/iijidYX.gif'],
  [':stop:', 'https://i.imgur.com/U1b6GOk.gif'],
  [':slow_parrot:', 'https://i.imgur.com/nkbPduW.gif'],
]
const TEXT_TO_EMO_DICT = [
  ['<3', 'https://rikkei.vn/asset_news/images/emoticons/inlove.gif']
]
const imgMap = new Map(IMG_TO_EMO_DICT)
const textMap = new Map([...CUSTOM_TEXT_TO_EMO_DICT, ...TEXT_TO_EMO_DICT])

const getReplacingContent = (value, type = TEXT_TYPE) => {
  let content
  if (type === TEXT_TYPE) {
    content = textMap.get(value)
  } else {
    content = imgMap.get(value)
  }
  return content
}

const decorate = () => {
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

const addToEmoList = () => {
  const emojiButtonElement = document.querySelector('.emoji-button')
  if (emojiButtonElement) {
    emojiButtonElement.click()
    const emojiMenuElement = document.querySelector('body > div.emoji-menu')
    if (emojiMenuElement) {
      emojiMenuElement.style.display = 'none'
      const emoListElement = emojiMenuElement.children[0]
      for (const item of CUSTOM_TEXT_TO_EMO_DICT) {
        const newNode = `<a href="javascript:void(0)" title="${item[0]}"><img src="${item[1]}" alt="${item[0]}"><span class="label">${item[0]}</span></a>`
        emoListElement.innerHTML += newNode
      }
    }
  }
}

const callback = (mutationsList, observer) => {
  for (let mutation of mutationsList) {
    if (mutation.type == 'childList') {
      decorate()
    }
  }
}

const pathName = window.location.pathname
const postPathRegex = /\/news\/post\/(.*)/gmi
const isRoot = pathName === '/'
const isPost = !!postPathRegex.exec(pathName)
const preferNoSidebar = true

if (isRoot) {
  if (preferNoSidebar) {
    const sidebarElement = document.querySelector('.blog-sidebar-wrapper')
    const blogContentElement = document.querySelector('.blog-content')
    const ribbonElements = document.querySelectorAll('.thumbnail img.new-icon')
    if (sidebarElement) {
      sidebarElement.remove()
    }
    if (blogContentElement) {
      blogContentElement.className = 'blog-content'
    }
    ribbonElements.forEach(element => {
      element.style.display = 'none'
    })
  }
} else if (isPost) {
  if (preferNoSidebar) {
    const sidebarElement = document.querySelector('.blog-sidebar-wrapper')
    const blogContentElement = document.querySelector('.blog-content')
    if (sidebarElement) {
      sidebarElement.remove()
    }
    if (blogContentElement) {
      blogContentElement.className = 'blog-content'
    }
  }

  const targetNode = document.getElementById('list-comment')
  if (targetNode) {
    decorate()
    addToEmoList()

    const config = {
      childList: true,
      subtree: true,
    }
    const observer = new MutationObserver(callback)
    if (targetNode) {
      observer.observe(targetNode, config)
    }
  }
} else {
  // TODO Other pages
}
