// KANAHEI: https://api.imgur.com/3/album/f79MjOU/images
// Mimi & Neko Set 1: https://api.imgur.com/3/album/awUWHKu/images
// Mimi & Neko Set 2: https://api.imgur.com/3/album/67kZppj/images

console.log('=> Make Rikkeisoft News Great Again - https://ext.huynq.net/')

class RKVN {
  static EXT_OPTS = {}
  static CACHED_PROFILE = {}
  static CACHED_TEAM_DATA = {}
  static CACHED_ROLE_DATA = {}
  static STICKER_EVENT_VALUES = {}
  static IS_SIDEBAR_OPENED = false
  static API_ENDPOINT = 'https://ext.huynq.net'
  static DATA_ENDPOINT = '/rikkei-vn-ext'
  static UPDATE_ENDPOINT = '/fetch/update'
  static MARKDOWN_CHEAT_SHEET = 'https://guides.github.com/pdfs/markdown-cheatsheet-online.pdf'
  static CONTACT_SEARCH_API = 'https://rikkei.vn/contact/list'
  static DEFAULT_AVATAR = 'https://rikkei.vn/common/images/noavatar.png'
  static DEFAULT_CONFIG = { useGallery: true, useHoverCard: true }
  static LAST_FOCUSED_EDITOR

  static addEventToEmojis = () => {
    const emojiButtonElements = document.querySelectorAll('.emoji-button')
    emojiButtonElements.forEach((element) => {
      element.addEventListener('click', () => {
        RKVN.LAST_FOCUSED_EDITOR = element.previousSibling
      })
    })
  }

  static decorateMentions = () => {
    const mentionedUrls = []
    const commentUrls = document.querySelectorAll('.comment-container a')
    const contactUrlRegex = /((http|https):\/\/rikkei\.vn\/contact\?s=(.*))/gim

    const renderProfileCard = (url = {}, profile = {}) => {
      const userTeam = profile.team
        .split(';')
        .map((team) =>
          team
            .split('-')
            .map((team) => RKVN.CACHED_TEAM_DATA[team] && RKVN.CACHED_TEAM_DATA[team].name)
            .join(' / '),
        )
        .join(' & ')
      const userAvatar = profile.avatar_url
        ? profile.avatar_url.replace('?sz=50', '')
        : RKVN.DEFAULT_AVATAR
      const popoverContent = document.createElement('div')
      popoverContent.className = 'push popover__content'

      const profileHTML = `
<div class="profile">
  <div class="profile-photo"><a href="${url.href}" target="_blank"><img src="${userAvatar}" /></a></div>
  <div class="profile-content">
    <div class="profile-text">
      <h4>${profile.name}</h4>
      <h5><i class="fa fa-envelope-o color-mail"></i>${profile.email}</h6>
      <h5><i class="fa fa-user-o"></i>${profile.employee_code}</h6>
      <h5><i class="fa fa-birthday-cake color-birth"></i>${profile.birthday}</h6>
      <h5><i class="fa fa-users color-team"></i>${userTeam}</h6>
    </div>
  </div>
</div>
`
      popoverContent.innerHTML = profileHTML
      return popoverContent
    }

    commentUrls.forEach((url) => {
      const matched = contactUrlRegex.exec(url)
      if (url.classList.length === 0 && !!matched) {
        const wrapper = document.createElement('div')
        wrapper.classList.add('popover__wrapper')
        url.parentNode.insertBefore(wrapper, url)
        wrapper.appendChild(url)

        if (RKVN.CACHED_PROFILE[matched[3]]) {
          const profileCard = renderProfileCard(url, RKVN.CACHED_PROFILE[matched[3]])
          wrapper.appendChild(profileCard)
        } else {
          fetch(`${RKVN.CONTACT_SEARCH_API}?s=${matched[3]}&page=1`)
            .then((response) => response.json())
            .then((json) => {
              if (Object.keys(RKVN.CACHED_TEAM_DATA).length === 0) {
                RKVN.CACHED_TEAM_DATA = json.team
              }
              if (Object.keys(RKVN.CACHED_ROLE_DATA).length === 0) {
                RKVN.CACHED_ROLE_DATA = json.role
              }
              const profile = json.data[0]
              if (profile) {
                RKVN.CACHED_PROFILE[profile.email] = profile
                const profileCard = renderProfileCard(url, profile)
                wrapper.appendChild(profileCard)
              }
            })
            .catch((error) => {
              console.error(error)
            })
        }
        mentionedUrls.push(url)
      }
    })

    mentionedUrls.forEach((url) => {
      url.classList = 'mentioned-link'
    })
  }

  initialize() {
    chrome.storage.sync.get(RKVN.DEFAULT_CONFIG, (opts) => {
      RKVN.EXT_OPTS = opts
      RKVN.LAST_FOCUSED_EDITOR = document.querySelector('div.emoji-wysiwyg-editor')
      this.run()
    })
  }

  setLastFetched() {
    localStorage.setItem('lastFetch', new Date().getTime().toString())
  }

  getLastFetched() {
    return localStorage.getItem('lastFetch')
  }

  setExtData(data) {
    localStorage.setItem('rkvnext', data)
  }

  getExtData() {
    return localStorage.getItem('rkvnext')
  }

  removeSavedData() {
    if (localStorage.getItem('rkvnext')) {
      localStorage.removeItem('rkvnext')
    }
  }

  fetch = async (url) => {
    const { json, response } = await fetch(url).then((response) => {
      if (response.status === 204) {
        return { json: {}, response }
      }
      return response
        .json()
        .then((json) => ({ json, response }))
        .catch((e) => {
          ex = e
          ex.response = response
          throw ex
        })
    })
    if (response.ok) {
      return json
    }
    return null
  }

  blockBadWords() {
    const elements = document.querySelectorAll('.box-music')

    for (let i = 0; i < elements.length; i++) {
      const node = elements[i]
      const nodeHTML = node.innerHTML
      node.innerHTML = nodeHTML.replace(/(địt|Địt|đụ|Đụ|lồn|Lồn|buồi|Buồi|cặc|Cặc|dái|Dái|con mẹ|con Mẹ|Con Mẹ|đm|ĐM)/gmiu, 'ahihi')
    }
  }

  mutationObserverCallback(mutationsList, observer) {
    RKVN.addEventToEmojis()

    for (let mutation of mutationsList) {
      if (mutation.type == 'childList') {
        if (RKVN.EXT_OPTS.useHoverCard) {
          RKVN.decorateMentions()
        }
      }
    }
  }

  addStickersToEmoList(stickers) {
    const emojiButtonElement = document.querySelector('.emoji-button')
    if (emojiButtonElement) {
      emojiButtonElement.click()
      const emojiMenuElement = document.querySelector('body > div.emoji-menu')
      if (emojiMenuElement) {
        emojiMenuElement.style.display = 'none'
        const emoListElement = emojiMenuElement.children[0]
        const oldEmoticonList = emoListElement.innerHTML
        emoListElement.innerHTML = ''

        let i = 0
        for (const index in stickers) {
          const item = stickers[index]
          RKVN.STICKER_EVENT_VALUES[`hnq-custom-emo-${index}`] = {
            text: ` ![${item.name} from https://bit.ly/rikkeisoft_news_ext](${item.url})`,
            value: ` ![${item.name} from https://bit.ly/rikkeisoft_news_ext](${item.url})`,
          }
          const newNode = `<div class="custom-emoji" data-emo="hnq-custom-emo-${index}">
  <img src="${item.url}" alt="${item.name}">
  <span class="label">${item.name}</span>
</div>`
          emoListElement.innerHTML += newNode
        }
        emoListElement.innerHTML += oldEmoticonList

        emojiMenuElement.querySelectorAll('img').forEach((element) => {
          element.addEventListener('click', function(event) {
            emojiMenuElement.style.display = 'none'
          })
        })

        emojiMenuElement.addEventListener('mouseup', function(event) {
          event.preventDefault()
          event.stopPropagation()
          return false
        })
      }
    }

    const eventValueLength = Object.keys(RKVN.STICKER_EVENT_VALUES).length
    for (let i = 0; i < eventValueLength; i++) {
      const dataEmo = `[data-emo="hnq-custom-emo-${i}"]`
      const element = document.querySelector(dataEmo)
      if (element) {
        element.addEventListener('click', function(event) {
          RKVN.LAST_FOCUSED_EDITOR.innerText +=
            RKVN.STICKER_EVENT_VALUES[`hnq-custom-emo-${i}`].text
          RKVN.LAST_FOCUSED_EDITOR.previousSibling.value +=
            RKVN.STICKER_EVENT_VALUES[`hnq-custom-emo-${i}`].value
        })
      }
    }
  }

  render({ data }) {
    const pathName = window.location.pathname
    const postPathRegex = /\/news\/post\/(.*)/gim
    const isPost = !!postPathRegex.exec(pathName)
    const isHome = pathName === '/'
    const isCategory = pathName.includes('/news/cat/')
    const isMusicOrder = pathName.includes('/music/order/')
    const { stickers } = data
    const { useGallery, useHoverCard } = RKVN.EXT_OPTS

    if (isHome || isPost || isCategory) {
      const sidebarToggle = document.createElement('div')
      sidebarToggle.innerHTML = `
  <a href="#" class="toggle-sidebar">
	<i class="fa fa-arrows-h"></i>
</a>
`
      document.body.append(sidebarToggle)

      sidebarToggle.addEventListener('click', () => {
        const sidebarElement = document.querySelector('.blog-sidebar-wrapper')
        const mainContent = document.querySelector('.blog-content')
        if (RKVN.IS_SIDEBAR_OPENED) {
          sidebarElement.classList.remove('force-show')
          mainContent.classList.remove('force-full-width')
        } else {
          sidebarElement.classList.add('force-show')
          mainContent.classList.add('force-full-width')
        }
        RKVN.IS_SIDEBAR_OPENED = !RKVN.IS_SIDEBAR_OPENED
      })
    }

    if (isMusicOrder) {
      this.blockBadWords()
    }

    if (isPost) {
      const postContent = document.querySelector('.post-detail')
      const commentHelpText = document.querySelector('.info-comment')
      const targetNode = document.querySelector('.comment-container')

      if (useGallery) {
        const gallery = new Viewer(postContent)
      }

      if (commentHelpText) {
        commentHelpText.innerHTML = `support <a href="${RKVN.MARKDOWN_CHEAT_SHEET}" target="_blank">markdown</a> syntax`
      }

      if (targetNode) {
        RKVN.addEventToEmojis()

        if (useHoverCard) {
          RKVN.decorateMentions()
        }
        this.addStickersToEmoList(stickers)

        const config = { childList: true, subtree: true }
        const observer = new MutationObserver(this.mutationObserverCallback)
        if (targetNode) {
          observer.observe(targetNode, config)
        }
      }
    }
  }

  run = async () => {
    const lastFetched = this.getLastFetched()
    const fetchedData = this.getExtData()
    const currentTime = new Date().getTime()
    const cacheExpiration = 86400 * 1000 * 7 // 7 days
    let shouldFetch = false
    let data

    if (!fetchedData || !lastFetched || currentTime - lastFetched > cacheExpiration) {
      shouldFetch = true
    }
    // TODO: Temporarily disable for better performance
    // else {
    //   const { rkvnext } = await this.fetch(`${RKVN.API_ENDPOINT}${RKVN.UPDATE_ENDPOINT}`)
    //   if (rkvnext) {
    //     shouldFetch = true
    //   }
    // }

    if (shouldFetch) {
      this.removeSavedData()
      data = await this.fetch(`${RKVN.API_ENDPOINT}${RKVN.DATA_ENDPOINT}`)
      this.setExtData(JSON.stringify(data))
      this.render({ data })
      this.setLastFetched()
    } else {
      data = JSON.parse(fetchedData)
      this.render({ data })
    }
  }
}

const rkvnExt = new RKVN()
rkvnExt.initialize()
