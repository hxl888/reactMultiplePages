/* eslint-disable no-control-regex */
import 'styles/dataTip.css'
window.ZENG = window.ZENG || {}
window.ZENG.dom = {
  getById: function (id: string) {
    return document.getElementById(id)
  },
  get: function (e: string) {
    return typeof e === 'string' ? document.getElementById(e) : e
  },
  createElementIn: function (tagName: any, elem: { insertBefore: (arg0: any, arg1: any) => any; firstChild: any; appendChild: (arg0: any) => any }, insertFirst: any, attrs: { [x: string]: any }) {
    const _e = (elem =
      window.ZENG.dom.get(elem) || document.body).ownerDocument.createElement(
        tagName || 'div'
      )
    let k
    if (typeof attrs === 'object') {
      for (k in attrs) {
        if (k === 'class') {
          _e.className = attrs[k]
        } else if (k === 'style') {
          _e.style.cssText = attrs[k]
        } else {
          _e[k] = attrs[k]
        }
      }
    }
    insertFirst ? elem.insertBefore(_e, elem.firstChild) : elem.appendChild(_e)
    return _e
  },
  getStyle: function (el: Element, property: string) {
    el = window.ZENG.dom.get(el)
    if (!el || (el as any).nodeType === 9) {
      return null
    }
    const w3cMode = document.defaultView && document.defaultView.getComputedStyle
    const computed = !w3cMode
      ? null
      : (document as any).defaultView.getComputedStyle(el, '')
    switch (property) {
      case 'float':
        property = w3cMode ? 'cssFloat' : 'styleFloat'
        break
      case 'opacity':
        if (!w3cMode) {
          let val = 100
          try {
            val = (el as any).filters['DXImageTransform.Microsoft.Alpha'].opacity
          } catch (e) {
            try {
              val = (el as any).filters('alpha').opacity
            } catch (e) { }
          }
          return val / 100
        } else {
          return parseFloat((computed || (el as any).style)[property])
        }
        // eslint-disable-next-line no-unreachable
        break
      case 'backgroundPositionX':
        if (w3cMode) {
          property = 'backgroundPosition'
          return (computed || (el as any).style)[property].split(' ')[0]
        }
        break
      case 'backgroundPositionY':
        if (w3cMode) {
          property = 'backgroundPosition'
          return (computed || (el as any).style)[property].split(' ')[1]
        }
        break
    }
    if (w3cMode) {
      return (computed || (el as any).style)[property]
    } else {
      return (el as any).currentStyle[property] || (el as any).style[property]
    }
  },
  setStyle: function (el: { nodeType: number; style: { [x: string]: string } }, properties: { [x: string]: any }, value: string | number) {
    if (!(el = window.ZENG.dom.get(el)) || (el as any).nodeType !== 1) {
      return false
    }
    let tmp
    let bRtn = true
    const w3cMode = (tmp = document.defaultView) && tmp.getComputedStyle
    const rexclude = /z-?index|font-?weight|opacity|zoom|line-?height/i
    if (typeof properties === 'string') {
      tmp = properties
      properties = {}
      properties[tmp] = value
    }
    for (let prop in properties) {
      value = properties[prop]
      if (prop === 'float') {
        prop = w3cMode ? 'cssFloat' : 'styleFloat'
      } else if (prop === 'opacity') {
        if (!w3cMode) {
          prop = 'filter'
          value =
            value >= 1 ? '' : 'alpha(opacity=' + Math.round((value as any) * 100) + ')'
        }
      } else if (
        prop === 'backgroundPositionX' ||
        prop === 'backgroundPositionY'
      ) {
        tmp = prop.slice(-1) === 'X' ? 'Y' : 'X'
        if (w3cMode) {
          const v = window.ZENG.dom.getStyle(el, 'backgroundPosition' + tmp)
          prop = 'backgroundPosition'
          typeof value === 'number' && (value = value + 'px')
          value =
            tmp === 'Y'
              ? value + ' ' + (v || 'top')
              : (v || 'left') + ' ' + value
        }
      }
      if (typeof (el as any).style[prop] !== 'undefined') {
        (el as any).style[prop] =
          value +
          (typeof value === 'number' && !rexclude.test(prop) ? 'px' : '')
        bRtn = bRtn && true
      } else {
        bRtn = bRtn && false
      }
    }
    return bRtn
  },
  getScrollTop: function (doc: Document) {
    const _doc = doc || document
    return Math.max(_doc.documentElement.scrollTop, _doc.body.scrollTop)
  },
  getClientHeight: function (doc: Document) {
    const _doc = doc || document
    return _doc.compatMode === 'CSS1Compat'
      ? _doc.documentElement.clientHeight
      : _doc.body.clientHeight
  }
}
window.ZENG.string = {
  RegExps: {
    trim: /^\s+|\s+$/g,
    ltrim: /^\s+/,
    rtrim: /\s+$/,
    nl2br: /\n/g,
    s2nb: /[\x20]{2}/g,
    // eslint-disable-next-line no-control-regex
    URIencode: /[\x09\x0A\x0D\x20\x21-\x29\x2B\x2C\x2F\x3A-\x3F\x5B-\x5E\x60\x7B-\x7E]/g,
    escHTML: {
      re_amp: /&/g,
      re_lt: /</g,
      re_gt: />/g,
      re_apos: /\x27/g,
      re_quot: /\x22/g
    },
    escString: { bsls: /\\/g, sls: /\//g, nl: /\n/g, rt: /\r/g, tab: /\t/g },
    restXHTML: {
      re_amp: /&amp;/g,
      re_lt: /&lt;/g,
      re_gt: /&gt;/g,
      re_apos: /&(?:apos|#0?39);/g,
      re_quot: /&quot;/g
    },
    write: /\{(\d{1,2})(?::([xodQqb]))?\}/g,
    isURL: /^(?:ht|f)tp(?:s)?:\/\/(?:[\w\-.]+)\.\w+/i,
    cut: /[\x00-\xFF]/,
    getRealLen: { r0: /[^\x00-\xFF]/g, r1: /[\x00-\xFF]/g },
    format: /\{([\d\w.]+)\}/g
  },
  commonReplace: function (s: string, p: any, r: any) {
    return s.replace(p, r)
  },
  format: function (str: string) {
    // eslint-disable-next-line prefer-rest-params
    let args = Array.prototype.slice.call(arguments)
    let v
    str = String(args.shift())
    if (args.length === 1 && typeof args[0] === 'object') {
      args = args[0]
    }
    window.ZENG.string.RegExps.format.lastIndex = 0
    return str.replace(window.ZENG.string.RegExps.format, function (m: any, n: any) {
      v = window.ZENG.object.route(args, n)
      return v === undefined ? m : v
    })
  }
}
window.ZENG.object = {
  routeRE: /([\d\w_]+)/g,
  route: function (obj: { [x: string]: any } | null | undefined, path: string) {
    obj = obj || {}
    path = String(path)
    const r = window.ZENG.object.routeRE
    let m
    r.lastIndex = 0
    while ((m = r.exec(path)) !== null) {
      obj = obj[m[0]]
      if (obj === undefined || obj === null) {
        break
      }
    }
    return obj
  }
}
const ua: any = (window.ZENG.userAgent = {})
const agent = navigator.userAgent
ua.ie =
  9 -
  (agent.indexOf('Trident/5.0') > -1 ? 0 : 1) -
  (window.XDomainRequest ? 0 : 1) -
  (window.XMLHttpRequest ? 0 : 1)
if (typeof window.ZENG.msgbox === 'undefined') {
  window.ZENG.msgbox = {}
}
window.ZENG.msgbox._timer = null
window.ZENG.msgbox.loadingAnimationPath =
  window.ZENG.msgbox.loadingAnimationPath || 'loading.gif'
window.ZENG.msgbox.show = function (msgHtml: any, type: number, timeout: any, opts: { cssPath?: any; topPosition?: any }) {
  if (typeof opts === 'number') {
    opts = { topPosition: opts }
  }
  opts = opts || {}
  const _s = window.ZENG.msgbox
  const template =
    '<span class="zeng_msgbox_layer" style="display:none;z-index:10000;" id="mode_tips_v2"><span class="gtl_ico_{type}"></span>{loadIcon}{msgHtml}<span class="gtl_end"></span></span>'
  const loading = '<span class="gtl_ico_loading"></span>'
  const typeClass = [0, 0, 0, 0, 'succ', 'fail', 'clear']
  let mBox
  _s._loadCss && _s._loadCss(opts.cssPath)
  // eslint-disable-next-line prefer-const
  mBox =
    window.ZENG.dom.get('q_Msgbox') ||
    window.ZENG.dom.createElementIn('div', document.body, false, {
      className: 'zeng_msgbox_layer_wrap'
    })
  mBox.id = 'q_Msgbox'
  mBox.style.display = ''
  mBox.innerHTML = window.ZENG.string.format(template, {
    type: typeClass[type] || 'hits',
    msgHtml: msgHtml || '',
    loadIcon: type === 6 ? loading : ''
  })
  _s._setPosition(mBox, timeout, opts.topPosition)
}
window.ZENG.msgbox._setPosition = function (tips: { firstChild: { style: { display: string } } }, timeout: number | undefined, topPosition: any) {
  timeout = timeout || 5000
  const _s = window.ZENG.msgbox
  const bt = window.ZENG.dom.getScrollTop()
  const ch = window.ZENG.dom.getClientHeight()
  const t = Math.floor(ch / 2) - 40
  window.ZENG.dom.setStyle(
    tips,
    'top',
    (document.compatMode === 'BackCompat' || window.ZENG.userAgent.ie < 7
      ? bt
      : 0) +
    (typeof topPosition === 'number' ? topPosition : t) +
    'px'
  )
  clearTimeout(_s._timer)
  tips.firstChild.style.display = ''
  timeout && (_s._timer = setTimeout(_s.hide, timeout))
}
window.ZENG.msgbox.hide = function (timeout: number | undefined) {
  const _s = window.ZENG.msgbox
  if (timeout) {
    clearTimeout(_s._timer)
    _s._timer = setTimeout(_s._hide, timeout)
  } else {
    _s._hide()
  }
}
window.ZENG.msgbox._hide = function () {
  const _mBox = window.ZENG.dom.get('q_Msgbox')
  const _s = window.ZENG.msgbox
  clearTimeout(_s._timer)
  if (_mBox) {
    window.ZENG.dom.setStyle(_mBox, 'display', 'none')
  }
}
const dataTip = {
  successTip: function (mess: any) {
    dataTip.msgbox(4, mess)
  },
  infoTip: function (mess: any) {
    dataTip.msgbox(1, mess)
  },
  errorTip: function (mess: any) {
    dataTip.msgbox(5, mess)
  },
  loadingTip: function (mess: any) {
    window.ZENG.msgbox.show(mess, 6, 10000)
  },
  hideTip: function () {
    window.ZENG.msgbox._hide()
  },
  msgbox: function (i: any, tip: any) {
    window.ZENG.msgbox.show(tip, i, 2000)
  }
}
export default dataTip
