var ee = class {
  constructor() {
    this.userAgent = window.navigator.userAgent;
    this.isAndroid = (/android/i).test(this.userAgent);
    this.isEdgiOS = (/edgios/i).test(this.userAgent);
    this.isEdgA = (/edga/i).test(this.userAgent);
    this.isEdge = !this.isEdgiOS && !this.isEdgA && (/edge/i).test(this.userAgent);
    this.isFirefoxiOS = !this.isEdge && (/fxios/i).test(this.userAgent);
    this.isChrome = !this.isEdge && !this.isFirefoxiOS && (/chrome/i).test(this.userAgent);
    this.isCrios = !this.isEdge && !this.isFirefoxiOS && !this.isChrome && (/crios/i).test(this.userAgent);
    this.isSafari = !this.isAndroid && !this.isEdgiOS && !this.isEdge && !this.isFirefoxiOS && !this.isChrome && !this.isCrios && (/safari/i).test(this.userAgent);
    this.isMobileSafari = !this.isAndroid && !this.isEdge && !this.isFirefoxiOS && !this.isChrome && !this.isCrios && this.isBrowserMobileSafari();
    this.isFirefoxAndroid = this.isAndroid && !this.isFirefoxiOS && !this.isEdge && !this.isChrome && !this.isSafari && (/firefox/i).test(this.userAgent);
    this.isFirefox = !this.isFirefoxAndroid && !this.isFirefoxiOS && !this.isEdge && !this.isChrome && !this.isSafari && (/firefox/i).test(this.userAgent);
    this.isIE = !this.isEdge && !this.isChrome && !this.isSafari && !this.isFirefox && (/trident|msie/i).test(this.userAgent);
    this.isWindows = !!(/windows/i).test(this.userAgent);
    this.isOpera = !!(/opera/i).test(this.userAgent);
    this.isMobilesafariwebview = this.isMobileSafari && (/^((?!safari).)*$/i).test(this.userAgent);
    this.isFacebookMessengeriOSwebview = this.isDeviceIOS() && (/fban\/messengerforios;/i).test(this.userAgent);
    this.islinkedIniOSwebview = (/applewebkit\/(\d+)[.*\d+]+ .*mobile\/(\d+[A-z]*\d+).*LinkedInApp/i).test(this.userAgent);
    this.isGoogleBot = (/\sgooglebot\//i).test(this.userAgent);
    this.supportedBrowserConfig = {
      chrome: {
        browserVersion: 37
      },
      firefox: {
        browserVersion: 68
      },
      opera: {
        browserVersion: 24
      },
      safari: {
        browserVersion: 10
      },
      edge: {
        browserVersion: 16
      },
      crios: {
        browserVersion: 37
      },
      linkedIniOSwebview: {
        iOSVersion: 8
      },
      mobilesafariwebview: {
        iOSVersion: 8
      },
      facebookMessengeriOSwebview: {
        iOSVersion: 8
      },
      mobilesafari: {
        iOSVersion: 8
      },
      googlebot: {
        browserVersion: 1
      },
      fxios: {
        iOSVersion: 8
      },
      firefoxA: {
        browserVersion: 68
      },
      otherwise: false
    };
  }
  isBrowserMobileSafari() {
    let t = this.isDeviceIOS();
    return (/apple.*mobile/i).test(this.userAgent) && t;
  }
  isDeviceIOS() {
    let t = ((this.userAgent.split(/\s*[;)(]\s*/) || [])[1] || "").toLowerCase();
    return t === "ipad" || t.indexOf("ipod") >= 0 || t === "iphone";
  }
  getBrowserFinders() {
    return {
      safari: {
        isBrowserMatches: this.isSafari,
        regexp: /version\/(\d+\.*\d+).*?safari/i
      },
      firefox: {
        isBrowserMatches: this.isFirefox,
        regexp: /firefox\/(\d+\.*\d+)/i
      },
      firefoxA: {
        isBrowserMatches: this.isFirefoxAndroid,
        regexp: /firefox\/(\d+\.*\d+)/i
      },
      chrome: {
        isBrowserMatches: this.isChrome,
        regexp: /chrome\/(\d+\.*\d+)/i
      },
      opera: {
        isBrowserMatches: this.isOpera,
        regexp: /version\/(\d+\.*\d+)/i
      },
      ie: {
        isBrowserMatches: this.isIE,
        regexp: /(msie |trident.*?rv:)(\d+\.*\d+)/i
      },
      edge: {
        isBrowserMatches: this.isEdge,
        regexp: /(edge|edg)\/(\d+\.*\d+)/i
      },
      crios: {
        isBrowserMatches: this.isCrios,
        regexp: /crios\/(\d+\.*\d+)/i
      },
      android: {
        isBrowserMatches: this.isAndroid,
        regexp: /android (\d+\.*\d*)/i
      },
      googlebot: {
        isBrowserMatches: this.isGoogleBot,
        regexp: /googlebot\/(\d+\.*\d+)/i
      },
      mobilesafari: {
        isBrowserMatches: this.isMobileSafari,
        regexp: null
      },
      mobilesafariwebview: {
        isBrowserMatches: this.isMobilesafariwebview,
        regexp: null
      },
      facebookMessengeriOSwebview: {
        isBrowserMatches: this.isFacebookMessengeriOSwebview,
        regexp: null
      },
      linkedIniOSwebview: {
        isBrowserMatches: this.islinkedIniOSwebview,
        regexp: null
      },
      fxios: {
        isBrowserMatches: this.isFirefoxiOS,
        regexp: /FxiOS\/(\d+\.*\d+)/i
      }
    };
  }
  getUserAgentVersion(t, o) {
    let a = 0;
    let p;
    let g = "";
    g = o || t.regexp;
    if (g) {
      try {
        p = this.userAgent.match(g);
        if (p) {
          a = parseInt(p[p.length - 1], 10);
        }
      } catch {}
    }
    return a;
  }
  getUserAgentVersionDetails(t) {
    let o = /OS\s(\d+_*\d+)/i;
    let a = /AppleWebKit\/(\d+\.*\d+)/i;
    let p = /android (\d+\.*\d*)/i;
    return {
      browserVersion: this.getUserAgentVersion(t),
      appleWebKitVersion: this.getUserAgentVersion(t, a),
      iOSVersion: this.getUserAgentVersion(t, o),
      andriodVersion: this.getUserAgentVersion(t, p)
    };
  }
  isBrowserVersionAtLeast(t) {
    let o;
    let a;
    let p;
    let g = this.getBrowserFinders();
    for (o in t) {
      if (o !== "otherwise" && g[o].isBrowserMatches) {
        a = this.getUserAgentVersion(g[o]);
        p = t[o];
        if (p === -1) {
          return false;
        } else {
          return a >= p;
        }
      }
    }
    return !!t.otherwise;
  }
  isBrowserVersionAtLeastV2(t) {
    let o;
    let a;
    let p;
    let g = this.getBrowserFinders();
    let A = false;
    for (o in t) {
      if (o !== "otherwise" && g[o].isBrowserMatches) {
        a = this.getUserAgentVersionDetails(g[o]);
        p = t[o];
        Object.keys(p).forEach(v => {
          let I = p[v];
          if (a[v] >= I) {
            A = true;
          }
        });
        return A;
      }
    }
    return !!t.otherwise;
  }
  isOnSupportedBrowserV2() {
    return this.isBrowserVersionAtLeastV2(this.supportedBrowserConfig);
  }
  isOnSupportedBrowser() {
    return this.isBrowserVersionAtLeast({
      chrome: 37,
      firefox: 34,
      opera: 24,
      safari: 10,
      edge: 16,
      crios: 37,
      android: 2,
      linkedIniOSwebview: 8,
      mobilesafariwebview: 8,
      facebookMessengeriOSwebview: 8,
      mobilesafari: 8,
      googlebot: 1,
      fxios: 8,
      otherwise: false
    });
  }
};