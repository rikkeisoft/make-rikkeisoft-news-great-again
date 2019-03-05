// KANAHEI: https://api.imgur.com/3/album/f79MjOU/images

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
  [':meo17:', 'https://i.imgur.com/FA7GTf7.gif'],
  [':meo18:', 'https://i.imgur.com/lzEZpGO.gif'],
  [':meo19:', 'https://i.imgur.com/NLkRB1J.gif'],
  [':meo20:', 'https://i.imgur.com/AvDeOSO.gif'],
  [':meo21:', 'https://i.imgur.com/pxGZ5B8.gif'],
  // [':bored_parrot:', 'https://i.imgur.com/U4hWizq.gif'],
  // [':bow:', 'https://i.imgur.com/JwnKJsc.gif'],
  // [':coffee_parrot:', 'https://i.imgur.com/5EaIwM9.gif'],
  // [':doge_bread:', 'https://i.imgur.com/eDetip4.jpg'],
  // [':doge:', 'https://i.imgur.com/39eQNsx.jpg'],
  // [':slide_parrot:', 'https://i.imgur.com/JFg0DsX.gif'],
  // [':fast_parrot:', 'https://i.imgur.com/aN0qzVH.gif'],
  // [':grumpy:', 'https://i.imgur.com/eOfyX7n.png'],
  // [':mooning:', 'https://i.imgur.com/MB28a06.png'],
  // [':nyan_cat:', 'https://i.imgur.com/XXNirx9.png'],
  // [':panda:', 'https://i.imgur.com/Dzy9Pqb.gif'],
  // [':parrot:', 'https://i.imgur.com/0utmyvj.gif'],
  // [':reverse_parrot:', 'https://i.imgur.com/kmw04qg.gif'],
  // [':ship_parrot:', 'https://i.imgur.com/iijidYX.gif'],
  // [':slow_parrot:', 'https://i.imgur.com/U1b6GOk.gif'],
  // [':stop:', 'https://i.imgur.com/nkbPduW.gif'],
  [':tonton1:', 'https://i.imgur.com/Gw30Caz.png'],
  [':tonton2:', 'https://i.imgur.com/YVxWDap.png'],
  [':tonton3:', 'https://i.imgur.com/3oJbyUr.png'],
  [':tonton4:', 'https://i.imgur.com/EuluWM4.png'],
  [':tonton5:', 'https://i.imgur.com/Jb2kOik.png'],
  [':tonton6:', 'https://i.imgur.com/9hSA4HO.png'],
  [':tonton7:', 'https://i.imgur.com/jb9ULK9.png'],
  [':tonton8:', 'https://i.imgur.com/sM7GAs2.png'],
  [':tonton9:', 'https://i.imgur.com/BToGVzH.png'],
  [':tonton10:', 'https://i.imgur.com/BinW2JU.png'],
  [':tonton11:', 'https://i.imgur.com/3jJbyEH.png'],
  [':tonton12:', 'https://i.imgur.com/b0kFycl.png'],
  [':tonton13:', 'https://i.imgur.com/5KC2LvF.png'],
  [':tonton14:', 'https://i.imgur.com/l5CV0rI.png'],
  [':tonton15:', 'https://i.imgur.com/nEojdo8.png'],
  [':tonton16:', 'https://i.imgur.com/NA1fV6k.png'],
  [':tonton17:', 'https://i.imgur.com/p4vHYos.png'],
  [':tonton18:', 'https://i.imgur.com/TJCXmbK.png'],
  [':tonton19:', 'https://i.imgur.com/jT8N8UO.png'],
  [':tonton20:', 'https://i.imgur.com/b5hwk9f.png'],
  [':tonton21:', 'https://i.imgur.com/NiBRKMW.png'],
  [':tonton22:', 'https://i.imgur.com/Q40CQzG.png'],
  [':tonton23:', 'https://i.imgur.com/Z0ffD4k.png'],
  [':tonton24:', 'https://i.imgur.com/yUp7d5F.png'],
  [':ahihi:', 'https://i.imgur.com/OF4RaGq.gif'],
  [':boiroivl:', 'https://i.imgur.com/dGt3zIY.gif'],
  [':dm:', 'https://i.imgur.com/CP0OQh1.gif'],
  [':lasaota:', 'https://i.imgur.com/bSbxTlA.gif'],
  [':cuu:', 'https://i.imgur.com/8mgQeXL.gif'],
  [':clgt:', 'https://i.imgur.com/9hWK2q6.gif'],
  [':deoquantam:', 'https://i.imgur.com/qnIwZZt.gif'],
  [':hon:', 'https://i.imgur.com/3Vlyxp6.gif'],
  [':khoc:', 'https://i.imgur.com/2jrUxNJ.gif'],
]
const STICKER_PACK = {
  // meo: ["https://i.imgur.com/1532bE4.png","https://i.imgur.com/R3wnAHR.png","https://i.imgur.com/FQ8EIU3.png","https://i.imgur.com/VzfTLSE.png","https://i.imgur.com/3xb8CjY.png","https://i.imgur.com/NkTGVVx.png","https://i.imgur.com/sf4RQrj.png","https://i.imgur.com/102Kc54.png","https://i.imgur.com/DDxG45u.png","https://i.imgur.com/wqw6xeb.png","https://i.imgur.com/CozNnNB.png","https://i.imgur.com/tdnCpsj.png","https://i.imgur.com/PdcgoeC.png","https://i.imgur.com/3WGA5Bp.png","https://i.imgur.com/qDZs5UL.png","https://i.imgur.com/7RIhVK6.png","https://i.imgur.com/e0kHDoI.png","https://i.imgur.com/EU1ZCgu.png","https://i.imgur.com/qw3BZ1p.png","https://i.imgur.com/OtlGRqq.png","https://i.imgur.com/6Slsnl6.png","https://i.imgur.com/FcPENzH.png","https://i.imgur.com/lAb5mDN.png","https://i.imgur.com/l1vOCVU.png","https://i.imgur.com/xxyYCIK.png","https://i.imgur.com/jRPRbgx.png","https://i.imgur.com/W147qey.png","https://i.imgur.com/lVmCB00.png","https://i.imgur.com/piE0Az1.png","https://i.imgur.com/0omKvZ2.png","https://i.imgur.com/NWEUaqS.png","https://i.imgur.com/9PbOYY6.png","https://i.imgur.com/2rjx2Z2.png","https://i.imgur.com/ONoWTjn.png","https://i.imgur.com/U1ohXnb.png","https://i.imgur.com/3udBrbM.png","https://i.imgur.com/wbeIEE5.png","https://i.imgur.com/WvfsUsC.png","https://i.imgur.com/UZjeq1C.png","https://i.imgur.com/4J3NpUW.png","https://i.imgur.com/WmHUhfk.png","https://i.imgur.com/AIR0THo.png","https://i.imgur.com/acqENIO.png","https://i.imgur.com/uG2HGTM.png","https://i.imgur.com/yqrDXX3.png","https://i.imgur.com/62LlfkX.png","https://i.imgur.com/8ooREgC.png","https://i.imgur.com/nIdBEPl.png","https://i.imgur.com/SWmTb00.png","https://i.imgur.com/M2r400z.png","https://i.imgur.com/GAMvUmN.png","https://i.imgur.com/mvPsYRV.png","https://i.imgur.com/5TLYcPb.png","https://i.imgur.com/2mqRK47.png","https://i.imgur.com/5m0gP2T.png","https://i.imgur.com/boGP0cp.png","https://i.imgur.com/yIEbjWt.png","https://i.imgur.com/IM9M6FJ.png","https://i.imgur.com/WcaOw5S.png","https://i.imgur.com/Kww4MM4.png","https://i.imgur.com/GSvVMss.png","https://i.imgur.com/Gw6SGk8.png","https://i.imgur.com/deOeykv.png","https://i.imgur.com/coE4vBS.png","https://i.imgur.com/QoHvnKB.png","https://i.imgur.com/r2dsS8i.png","https://i.imgur.com/HpkWuWQ.png","https://i.imgur.com/GEKbDVv.png","https://i.imgur.com/JjQRELi.png","https://i.imgur.com/fPfNZJ1.png","https://i.imgur.com/5nBxgzh.png","https://i.imgur.com/lT2smFP.png","https://i.imgur.com/65S70LJ.png","https://i.imgur.com/IjJuO0K.png","https://i.imgur.com/LaGM1ze.png","https://i.imgur.com/3MLeNEj.png","https://i.imgur.com/nAenrll.png","https://i.imgur.com/pc2vIuJ.png","https://i.imgur.com/skXQn94.png","https://i.imgur.com/Qykxq1N.png","https://i.imgur.com/ns6qU1X.gif","https://i.imgur.com/zoa297K.gif","https://i.imgur.com/T7pHgG6.gif","https://i.imgur.com/utTbFPd.gif","https://i.imgur.com/kupB5LD.gif","https://i.imgur.com/Gylc5cN.gif","https://i.imgur.com/cxO2glu.gif","https://i.imgur.com/iGFlw0x.gif","https://i.imgur.com/4vrT96P.gif","https://i.imgur.com/VjcAWgB.gif","https://i.imgur.com/faeX3oa.gif","https://i.imgur.com/LbQBPfx.gif","https://i.imgur.com/aDUja3J.gif","https://i.imgur.com/Kq1Gc0O.gif","https://i.imgur.com/fcNCQaj.gif","https://i.imgur.com/wRpLtxM.gif","https://i.imgur.com/wEPSvWb.gif","https://i.imgur.com/TtcitF6.gif","https://i.imgur.com/glECMc7.gif","https://i.imgur.com/PeTgKOK.gif","https://i.imgur.com/nFcRgUI.gif","https://i.imgur.com/NbuQZ0r.gif","https://i.imgur.com/skDgRgx.gif","https://i.imgur.com/D42K1j6.gif","https://i.imgur.com/CQ74c3x.gif","https://i.imgur.com/wfJlEOH.gif","https://i.imgur.com/5wgCcaI.gif","https://i.imgur.com/tN9p0ps.gif","https://i.imgur.com/geP97YV.gif","https://i.imgur.com/jZ85tT3.gif","https://i.imgur.com/XMcxnFc.gif","https://i.imgur.com/HNcskIK.gif","https://i.imgur.com/xrSV3qX.gif","https://i.imgur.com/ycXTIxZ.gif","https://i.imgur.com/kfhb8et.gif","https://i.imgur.com/eI8h5FK.gif","https://i.imgur.com/HMnyJyz.gif","https://i.imgur.com/Uo167Dn.gif","https://i.imgur.com/5QJEiZg.gif","https://i.imgur.com/bSjXO5Y.gif","https://i.imgur.com/CGd1vO9.gif","https://i.imgur.com/4FGhUuk.gif","https://i.imgur.com/ZPgUqKg.gif","https://i.imgur.com/nMqk8XS.gif","https://i.imgur.com/ej4syjH.gif","https://i.imgur.com/GLQwEBF.gif","https://i.imgur.com/0iYJFjj.gif"],
  ronglon: ["https://i.imgur.com/F1YBGPR.jpg","https://i.imgur.com/xEqcqKA.jpg","https://i.imgur.com/DO2xw3f.jpg","https://i.imgur.com/IXUjP9Y.jpg","https://i.imgur.com/8zDrY7P.jpg","https://i.imgur.com/Z3emHnB.jpg","https://i.imgur.com/dogiHMg.jpg","https://i.imgur.com/guiNbtl.jpg","https://i.imgur.com/yBdhQnn.jpg","https://i.imgur.com/NR0KCyd.jpg","https://i.imgur.com/4ONNNUY.jpg","https://i.imgur.com/V3kZALa.jpg","https://i.imgur.com/dC4y4qp.jpg","https://i.imgur.com/cL1BcVS.jpg","https://i.imgur.com/oCcMVIj.jpg","https://i.imgur.com/Qds2aif.jpg","https://i.imgur.com/fJmIyyw.jpg","https://i.imgur.com/4NnWqM4.jpg","https://i.imgur.com/ggwDfD2.jpg","https://i.imgur.com/JqcFeYD.jpg","https://i.imgur.com/jN8xwlK.jpg","https://i.imgur.com/yP74UeE.jpg","https://i.imgur.com/lCoESSi.jpg","https://i.imgur.com/32OKG9G.jpg","https://i.imgur.com/Pa51Xt2.jpg","https://i.imgur.com/2IQ5Hn8.jpg","https://i.imgur.com/a6mmkXc.jpg","https://i.imgur.com/Qir4WuW.jpg","https://i.imgur.com/cbJCvUc.jpg","https://i.imgur.com/J8tVNBE.jpg","https://i.imgur.com/7TqWA7Q.jpg","https://i.imgur.com/8ZiphTi.jpg","https://i.imgur.com/7xTQDSu.jpg","https://i.imgur.com/vbuKEBP.jpg","https://i.imgur.com/VDAkSpK.jpg","https://i.imgur.com/Lmf2CVH.jpg","https://i.imgur.com/xRTwNWa.png","https://i.imgur.com/hUK7Wy5.png","https://i.imgur.com/XIkvlZo.png","https://i.imgur.com/lm12gbF.png","https://i.imgur.com/GEwL8ed.png","https://i.imgur.com/OXtCEiC.png","https://i.imgur.com/2pCzRq8.png","https://i.imgur.com/9LsV9bE.png","https://i.imgur.com/2Okamf5.jpg","https://i.imgur.com/tiGhQDY.jpg","https://i.imgur.com/0Y2Osei.jpg","https://i.imgur.com/1LCx9Yi.jpg","https://i.imgur.com/4fhoTZe.jpg","https://i.imgur.com/wKaobLb.jpg","https://i.imgur.com/iRub6mO.jpg","https://i.imgur.com/WhuZ9I5.png","https://i.imgur.com/X8shzlw.jpg","https://i.imgur.com/MIOP59f.png","https://i.imgur.com/GSC3E94.png","https://i.imgur.com/hWcFr4A.png","https://i.imgur.com/lQZvAv7.png"],
  kanahei: ["https://i.imgur.com/JBrp8PS.png", "https://i.imgur.com/077Qyd9.png", "https://i.imgur.com/7OvkgR0.png", "https://i.imgur.com/yfHY3hR.png", "https://i.imgur.com/19cFZMF.png", "https://i.imgur.com/LmJA0gD.png", "https://i.imgur.com/69EKuWd.png", "https://i.imgur.com/8qrn11x.png", "https://i.imgur.com/g2DeRsO.png", "https://i.imgur.com/WOF9avs.png", "https://i.imgur.com/0ouFJOO.png", "https://i.imgur.com/rTBo6WN.png", "https://i.imgur.com/PQIbM37.png", "https://i.imgur.com/T7JxCEd.png", "https://i.imgur.com/B8VajVZ.png", "https://i.imgur.com/MoRO2tk.png", "https://i.imgur.com/HmXwlRU.png", "https://i.imgur.com/IruoGFh.png", "https://i.imgur.com/udRFc65.png", "https://i.imgur.com/cgUs61u.png", "https://i.imgur.com/aM7SQ85.png", "https://i.imgur.com/3GWMej7.png", "https://i.imgur.com/hlWnid0.png", "https://i.imgur.com/dMcyKtz.png", "https://i.imgur.com/mDBjnDD.png", "https://i.imgur.com/aibURzD.png", "https://i.imgur.com/EjAWZ3e.png", "https://i.imgur.com/pX1m05O.png", "https://i.imgur.com/FSETmSG.png", "https://i.imgur.com/dcM70Qv.png", "https://i.imgur.com/kINwOw4.png", "https://i.imgur.com/294XYuB.png", "https://i.imgur.com/wCVNyyP.png", "https://i.imgur.com/3xduvVk.png", "https://i.imgur.com/SFMFpll.png", "https://i.imgur.com/xq8GMxG.png", "https://i.imgur.com/96Q3ht8.png", "https://i.imgur.com/2mqT8cW.png", "https://i.imgur.com/XBIj50q.png", "https://i.imgur.com/1VQ7ZXt.png", "https://i.imgur.com/ylPTWpm.png", "https://i.imgur.com/XPLEyaw.png", "https://i.imgur.com/4Mga1j7.png", "https://i.imgur.com/eahocey.png", "https://i.imgur.com/xtGOZKI.png", "https://i.imgur.com/qjBcrLN.png", "https://i.imgur.com/fO0EefX.png"],
  lon: ["https://i.imgur.com/O3bnJRa.png", "https://i.imgur.com/QzV0lqG.png", "https://i.imgur.com/g2kwmG2.png", "https://i.imgur.com/scgrm6L.png", "https://i.imgur.com/VKLE35p.png", "https://i.imgur.com/x2Oojez.png", "https://i.imgur.com/vifxGU8.png", "https://i.imgur.com/BVMnaAE.png", "https://i.imgur.com/rNe9SIy.png", "https://i.imgur.com/nSCvfd1.png", "https://i.imgur.com/sy4IDfE.png", "https://i.imgur.com/rSdPfOY.png"]
}
const TEXT_TO_EMO_DICT = [
  ['<3', 'https://rikkei.vn/asset_news/images/emoticons/inlove.gif']
]
const MARKDOWN_CHEATSHEET = 'https://guides.github.com/pdfs/markdown-cheatsheet-online.pdf'
const CONTACT_SEARCH_API = 'https://rikkei.vn/contact/list'
const DEFAULT_AVATAR = 'https://rikkei.vn/common/images/noavatar.png'
const DEFAULT_EXT_CONFIG = {
  // useFixedHeader: true,
  // shouldHideNewRibbon: true,
  // shouldHideSidebar: true,
  useGallery: true,
  useHoverCard: true,
}
const CACHED_PROFILE = {}
const IMG_MAP = new Map(IMG_TO_EMO_DICT)
const TEXT_MAP = new Map([...CUSTOM_TEXT_TO_EMO_DICT, ...TEXT_TO_EMO_DICT])
let lastFocusedEditor = document.querySelector('div.emoji-wysiwyg-editor')
let teamData = {}
let roleData = {}
let chromeExtOptions = DEFAULT_EXT_CONFIG
let stickerEventValues = {}
let sidebarOpened = false

const getReplacingContent = (value, type = TEXT_TYPE) => {
  let content
  if (type === TEXT_TYPE) {
    content = TEXT_MAP.get(value)
  } else {
    content = IMG_MAP.get(value)
  }
  return content
}

const decorateMentions = () => {
  const mentionedUrls = []
  const commentUrls = document.querySelectorAll('.comment-container a')
  const contactUrlRegex = /((http|https):\/\/rikkei\.vn\/contact\?s=(.*))/gmi

  commentUrls.forEach(url => {
    const matched = contactUrlRegex.exec(url)
    if (url.classList.length === 0 && !!matched) {
      const wrapper = document.createElement('div')
      wrapper.classList.add('popover__wrapper')
      url.parentNode.insertBefore(wrapper, url)
      wrapper.appendChild(url)

      fetch(`${CONTACT_SEARCH_API}?s=${matched[3]}&page=1`)
        .then(response => response.json())
        .then(json => {
          if (Object.keys(teamData).length === 0) {
            teamData = json.team
          }
          if (Object.keys(roleData).length === 0) {
            roleData = json.role
          }
          const profile = json.data[0]
          if (profile) {
            CACHED_PROFILE[profile.email] = profile
            const userTeam = profile.team.split(';').map(team => team.split('-').map(team => teamData[team] && teamData[team].name).join(' / ')).join(' & ')
            const userAvatar = profile.avatar_url ? profile.avatar_url.replace('?sz=50', '') : DEFAULT_AVATAR
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
            wrapper.appendChild(popoverContent)
          }
        })
        .catch(error => {
          console.error(error)
        })
      mentionedUrls.push(url)
    }
  })

  mentionedUrls.forEach(url => {
    url.classList = 'mentioned-link'
  })
}

const decorateComments = () => {
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
        const newSrc = getReplacingContent(node.innerText.trim(), TEXT_TYPE)
        if (newSrc) {
          node.innerHTML = `<img src="${newSrc}" style="width: 100px;">`
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
      const newStickers = Object.keys(STICKER_PACK).map(item => STICKER_PACK[item].map((sticker, index) => [`${item}${index}`, sticker])).flat()
      const customStickers = [...CUSTOM_TEXT_TO_EMO_DICT, ...newStickers]

      emojiMenuElement.style.display = 'none'
      const emoListElement = emojiMenuElement.children[0]
      const oldEmoticonList = emoListElement.innerHTML
      emoListElement.innerHTML = ''

      let i = 0
      for (const index in customStickers) {
        const item = customStickers[index]
        stickerEventValues[`hnq-custom-emo-${index}`] = {
          text: ` ![${item[0]} from https://bit.ly/rikkeisoft_news_ext](${item[1]})`,
          value: ` ![${item[0]} from https://bit.ly/rikkeisoft_news_ext](${item[1]})`
        }
        const newNode = `<div class="custom-emoji" data-emo="hnq-custom-emo-${index}">
  <img src="${item[1]}" alt="${item[0]}">
  <span class="label">${item[0]}</span>
</div>`
        emoListElement.innerHTML += newNode
      }
      emoListElement.innerHTML += oldEmoticonList
    }
  }

  const eventValueLength = Object.keys(stickerEventValues).length
  for (let i = 0; i < eventValueLength; i++) {
    const dataEmo = `[data-emo="hnq-custom-emo-${i}"]`
    const element = document.querySelector(dataEmo)
    if (element) {
      element.addEventListener('click', function (event) {
        lastFocusedEditor.innerText += stickerEventValues[`hnq-custom-emo-${i}`].text
        lastFocusedEditor.previousSibling.value += stickerEventValues[`hnq-custom-emo-${i}`].value
      })
    }
  }
}

const callback = (mutationsList, observer) => {
  const emojiButtonElements = document.querySelectorAll('.emoji-button')
  emojiButtonElements.forEach(element => {
    element.addEventListener('click', () => {
      lastFocusedEditor = element.previousSibling
    })
  })

  for (let mutation of mutationsList) {
    if (mutation.type == 'childList') {
      decorateComments()
      if (chromeExtOptions.useHoverCard) {
        decorateMentions()
      }
    }
  }
}

const pathName = window.location.pathname
const postPathRegex = /\/news\/post\/(.*)/gmi
const isPost = !!postPathRegex.exec(pathName)

chrome.storage.sync.get(DEFAULT_EXT_CONFIG, opts => {
  chromeExtOptions = Object.assign({}, chromeExtOptions, opts)

  const sidebarToggle = document.createElement('div')
  sidebarToggle.innerHTML = `
  <a href="#" class="toggle-sidebar" style="top:50%;font-size:36px;position:fixed;bottom:20px;right:20px;color:#bf1d1e">
	<i class="fa fa-bars"></i>
</a>
`
  document.body.append(sidebarToggle)

  sidebarToggle.addEventListener('click', () => {
    const sidebarElement = document.querySelector('.blog-sidebar-wrapper')
    const mainContent = document.querySelector('.blog-content')
    if (sidebarOpened) {
      sidebarElement.classList.remove('force-show')
      mainContent.classList.remove('force-full-width')
    } else {
      sidebarElement.classList.add('force-show')
      mainContent.classList.add('force-full-width')
    }
    sidebarOpened = !sidebarOpened
  })

  if (isPost) {
    const postContent = document.querySelector('.post-detail')
    const commentHelpText = document.querySelector('.info-comment')
    const targetNode = document.querySelector('.comment-container')

    if (chromeExtOptions.useGallery) {
      const gallery = new Viewer(postContent)
    }

    if (commentHelpText) {
      commentHelpText.innerHTML = `support <a href="${MARKDOWN_CHEATSHEET}" target="_blank">markdown</a> syntax`
    }

    if (targetNode) {
      decorateComments()
      if (chromeExtOptions.useHoverCard) {
        decorateMentions()
      }
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
  }
})
