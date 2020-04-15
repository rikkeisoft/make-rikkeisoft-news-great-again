console.log(`=> You found me 😂 - Make Rikkeisoft News Great Again ${chrome.runtime.getManifest().version} - https://ext.huynq.net/`)

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
  static DEFAULT_CONFIG = { useGallery: true, useHoverCard: true, disableAutoplayVideo: false }
  static LAST_FOCUSED_EDITOR

  static addEventToEmojis = () => {
    const emojiButtonElements = document.querySelectorAll('.emoji-button')
    emojiButtonElements.forEach((element) => {
      element.addEventListener('click', () => {
        RKVN.LAST_FOCUSED_EDITOR = element.previousSibling
      })
    })
  }

  static decorateMentions = (selector, isHome = false) => {
    const mentionedUrls = []
    const matchedMentions = document.querySelectorAll(selector)

    let contactUrlRegex
    if (isHome) {
      contactUrlRegex = /((http|https):\/\/rikkei\.vn\/contact\?s=(.*))/im
    } else {
      contactUrlRegex = /((http|https):\/\/rikkei\.vn\/contact\?s=(.*))/gim
    }

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

      popoverContent.className = 'push popover-content'

      const profileHTML = `
<div class="profile">
  <div class="profile-photo"><a href="${url.href}" target="_blank"><img src="${userAvatar}" /></a></div>
  <div class="profile-content">
    <div class="profile-text">
      <h4>${profile.name}</h4>
      <h5><i class="fa fa-envelope-o color-mail heading-icon"></i>${profile.email}</h6>
      <h5><i class="fa fa-user-o heading-icon"></i>${profile.employee_code}</h6>
      <h5><i class="fa fa-birthday-cake color-birth heading-icon"></i>${profile.birthday || 'Hidden'}</h6>
      <h5><i class="fa fa-skype heading-icon"></i>${profile.skype || 'Not set'}</h6>
      <h5><i class="fa fa-users color-team heading-icon"></i>${userTeam}</h6>
    </div>
  </div>
</div>
`
      popoverContent.innerHTML = profileHTML
      return popoverContent
    }

    matchedMentions.forEach((mentionElement) => {
      const matched = contactUrlRegex.exec(mentionElement)
      if (mentionElement.classList.length === 0 && !!matched) {
        const wrapper = document.createElement('div')
        wrapper.classList.add('popover-wrapper')
        mentionElement.parentNode.insertBefore(wrapper, mentionElement)
        wrapper.appendChild(mentionElement)

        if (RKVN.CACHED_PROFILE[matched[3]]) {
          const profileCard = renderProfileCard(mentionElement, RKVN.CACHED_PROFILE[matched[3]])
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
                const profileCard = renderProfileCard(mentionElement, profile)
                wrapper.appendChild(profileCard)
              }
            })
            .catch((error) => {
              console.error(error)
            })
        }
        mentionedUrls.push(mentionElement)
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

  blockBadWords(selector) {
    const elements = document.querySelectorAll(selector)

    for (let i = 0; i < elements.length; i++) {
      const node = elements[i]
      const nodeHTML = node.innerHTML
      node.innerHTML = nodeHTML.replace(/(địt|Địt|đụ|Đụ|lồn|Lồn|buồi|Buồi|cặc|Cặc|dái|Dái|con mẹ|con Mẹ|Con Mẹ|đm|ĐM|dm)/gmiu, 'ahihi')
    }
  }

  mutationObserverCallback(mutationsList, observer) {
    RKVN.addEventToEmojis()

    for (let mutation of mutationsList) {
      if (mutation.type == 'childList') {
        if (RKVN.EXT_OPTS.useHoverCard) {
          RKVN.decorateMentions('.span-comment a')
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
        emoListElement.innerHTML = ''

        let i = 0
        for (const index in stickers) {
          const item = stickers[index]
          RKVN.STICKER_EVENT_VALUES[`hnq-custom-emo-${index}`] = {
            text: ` ![${item.name} from https://bit.ly/rikkeisoft_news_ext](${item.url})`,
            value: ` ![${item.name} from https://bit.ly/rikkeisoft_news_ext](${item.url})`,
            url: item.url
          }
          const newNode = `<div class="custom-emoji" data-emo="hnq-custom-emo-${index}">
  <img src="${item.url}" alt="${item.name}">
  <span class="label">${item.name}</span>
</div>`
          emoListElement.innerHTML += newNode
        }

        const stickerPreview = document.createElement('div')
        stickerPreview.classList = 'sticker-preview'
        emojiMenuElement.append(stickerPreview)

        emojiMenuElement.querySelectorAll('img').forEach((element) => {
          element.addEventListener('click', (event) => {
            emojiMenuElement.style.display = 'none'
          })
        })

        emojiMenuElement.addEventListener('mouseup', (event) => {
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
        element.addEventListener('click', (event) => {
          RKVN.LAST_FOCUSED_EDITOR.innerText +=
            RKVN.STICKER_EVENT_VALUES[`hnq-custom-emo-${i}`].text
          RKVN.LAST_FOCUSED_EDITOR.previousSibling.value +=
            RKVN.STICKER_EVENT_VALUES[`hnq-custom-emo-${i}`].value
        })

        element.addEventListener('mouseenter', (event) => {
          const previewElement = document.querySelector('.sticker-preview')
          if (previewElement) {
            previewElement.style = 'display: block;'
            previewElement.innerHTML = `<img src="${RKVN.STICKER_EVENT_VALUES[`hnq-custom-emo-${i}`].url}" style="width: 100%;height: 100%;">`
          }
        })
      }
    }

    document.querySelector('.emoji-menu').addEventListener('mouseleave', (event) => {
      const previewElement = document.querySelector('.sticker-preview')
      if (previewElement) {
        previewElement.style = 'display: none;'
        previewElement.innerHTML = ''
      }
    })
  }

  render({ data }) {
    const pathName = window.location.pathname
    const postPathRegex = /\/news\/post\/(.*)/gim
    const isPost = !!postPathRegex.exec(pathName)
    const isHome = pathName === '/'
    const isCategory = pathName.includes('/news/cat/')
    const isMusicOrder = pathName.includes('/music/order/')
    const { stickers } = data
    const { useGallery, useHoverCard, disableAutoplayVideo } = RKVN.EXT_OPTS
    const sidebarElement = document.querySelector('.blog-sidebar-wrapper')
    const youtubePlayerElement = document.querySelector('.youtube-player')
    const relatedVideoElements = document.querySelectorAll('.home-videos__content__right_item') || []
    let videoPlayerIframe = document.querySelector('#js-primary-video')

    if (sidebarElement && (isHome || isPost || isCategory)) {
      const sidebarToggle = document.createElement('div')
      sidebarToggle.innerHTML = `
  <a href="#" class="toggle-sidebar">
	<i class="fa fa-arrows-h"></i>
</a>
`
      document.body.append(sidebarToggle)

      sidebarToggle.addEventListener('click', () => {
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

    if (disableAutoplayVideo) {
      relatedVideoElements.forEach((element) => {
        element.addEventListener('click', () => {
          setTimeout(() => {
            videoPlayerIframe = document.querySelector('#js-primary-video')
            videoPlayerIframe.src = videoPlayerIframe.src.replace('autoplay=1&', '')
            videoPlayerIframe.style.width = '100%'
            videoPlayerIframe.style.height = '250px'
          }, 250)
        })
      })

      if (youtubePlayerElement && youtubePlayerElement.className) {
        youtubePlayerElement.className = youtubePlayerElement.className.replace('youtube-player', 'youtube-player-free')
      }

      if (videoPlayerIframe && videoPlayerIframe.src) {
        videoPlayerIframe.src = videoPlayerIframe.src.replace('autoplay=1&', '')
        videoPlayerIframe.style.width = '100%'
        videoPlayerIframe.style.height = '250px'
      }
    }

    if (isMusicOrder) {
      this.blockBadWords('.box-music')
    }

    if (isHome && RKVN.EXT_OPTS.useHoverCard) {
      RKVN.decorateMentions('.top-members-item a', true)
    }

    if (isPost) {
      const postContent = document.querySelector('#content')
      const commentHelpText = document.querySelector('.info-comment')
      const listComments = document.querySelector('#list-comment')

      if (useGallery && postContent) {
        const gallery = new Viewer(postContent)
      }

      if (commentHelpText) {
        commentHelpText.innerHTML = `
<a href="https://guides.github.com/features/mastering-markdown/" target="_blank">
  <svg style="fill: #b71c1d" viewBox="0 0 16 16" version="1.1" width="16" height="16"><path fill-rule="evenodd" d="M14.85 3H1.15C.52 3 0 3.52 0 4.15v7.69C0 12.48.52 13 1.15 13h13.69c.64 0 1.15-.52 1.15-1.15v-7.7C16 3.52 15.48 3 14.85 3zM9 11H7V8L5.5 9.92 4 8v3H2V5h2l1.5 2L7 5h2v6zm2.99.5L9.5 8H11V5h2v3h1.5l-2.51 3.5z"></path></svg>
</a>
`
      }

      if (listComments) {
        RKVN.addEventToEmojis()

        if (useHoverCard) {
          RKVN.decorateMentions('.span-comment a')
        }
        this.addStickersToEmoList(stickers)

        const config = { childList: true, subtree: true }
        const observer = new MutationObserver(this.mutationObserverCallback)
        if (listComments) {
          observer.observe(listComments, config)
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
    } else {
      const { rkvnext } = await this.fetch(`${RKVN.API_ENDPOINT}${RKVN.UPDATE_ENDPOINT}`)
      if (rkvnext) {
        shouldFetch = true
      }
    }

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
