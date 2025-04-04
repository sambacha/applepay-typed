/*
 * Copyright (c) 2024 Apple Inc. All rights reserved.
 * Apple Pay JS Software
 * 
 * **IMPORTANT:** This Apple Pay JS Software (the "Apple Software") is supplied to you by Apple Inc. ("Apple") in consideration of your agreement to the following terms, and your use, reproduction, or installation of this Apple Software constitutes acceptance of these terms. If you do not agree with these terms, do not use, reproduce or install this Apple Software.
 * 
 * This Apple Software is licensed to you solely for: (a) use with the Apple Pay button that you are authorized or legally permitted to embed or display on your website and (b) the purposes set forth above, and may not be used for other purposes or in other contexts without Apple's prior written permission. For the sake of clarity, you may not and agree not to or enable others to, modify or create derivative works of the Apple Software.
 * 
 * You may only use the Apple Software if you are a member in good standing of the Apple Developer Program and have accepted the current version of the Apple Developer Program License Agreement. Your use of the Apple Software must conform with the Acceptable Use Guidelines for Apple Pay on the Web, located at https://developer.apple.com/apple-pay/acceptable-use-guidelines-for-websites/, which terms may be updated from time to time.
 * 
 * Neither the name, trademarks, service marks or logos of Apple may be used to endorse or promote products or services without specific prior written permission from Apple. Except as expressly stated in this notice, no other rights or licenses, express or implied, are granted by Apple herein.
 * 
 * Apple may provide access to services by or through the Apple Software for you to use.  You agree that the services contain proprietary content, information and material that is owned by Apple and its licensors, and is protected by applicable intellectual property and other laws, and that you will not use such proprietary content, information or materials in any way whatsoever except for permitted use of the services or in any manner that is inconsistent with these terms or that infringes any intellectual property rights of a third party or Apple.  Except to the extent expressly permitted in the applicable terms for the services, You agree not to reproduce, modify, rent, lease, lend, sell, distribute, or create derivative works based on the services, in any manner, and you shall not exploit the services in any unauthorized way whatsoever, including but not limited to, using the services to transmit any malware, or by trespass or burdening network capacity. 
 * 
 * In addition, services that may be accessed, linked to or displayed through the Apple Software may not be available in all languages or in all countries. Apple makes no representation that any such services would be appropriate or available for use in any particular location. Apple reserves the right to change, suspend, remove, or disable access to any services at any time. In no event will Apple be liable for the removal of or disabling of access to any such services or for any updates, maintenance, warranty, technical or other support for such services. Apple may also impose limits or other restrictions on the use of or access to the services, in any case without notice or liability.  You acknowledge and agree that Apple reserves the right to revoke or remove your access to any services provided by or through the Apple Software at any time in its sole discretion.
 * 
 * THE APPLE SOFTWARE AND SERVICES ARE PROVIDED BY APPLE ON AN "AS IS" AND "AS AVAILABLE" BASIS. APPLE MAKES NO WARRANTIES, EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION THE IMPLIED WARRANTIES OF NON-INFRINGEMENT, MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE, REGARDING THE APPLE SOFTWARE OR ITS USE AND OPERATION ALONE OR IN COMBINATION WITH YOUR PRODUCTS, SYSTEMS, OR SERVICES.  APPLE DOES NOT WARRANT THAT THE APPLE SOFTWARE AND SERVICES WILL MEET YOUR REQUIREMENTS, THAT THE OPERATION OF THE APPLE SOFTWARE AND SERVICES WILL BE UNINTERRUPTED OR ERROR-FREE, THAT DEFECTS IN THE APPLE  SOFTWARE WILL BE CORRECTED, OR THAT THE APPLE  SOFTWARE AND SERVICES WILL BE COMPATIBLE WITH FUTURE APPLE PRODUCTS, SOFTWARE OR SERVICES. NO ORAL OR WRITTEN INFORMATION OR ADVICE GIVEN BY APPLE OR AN APPLE AUTHORIZED REPRESENTATIVE WILL CREATE A WARRANTY.
 * 
 * IN NO EVENT SHALL APPLE BE LIABLE FOR ANY DIRECT, SPECIAL, INDIRECT, INCIDENTAL OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) RELATING TO OR ARISING IN ANY WAY OUT OF THE USE, REPRODUCTION, OR INSTALLATION, OF THE APPLE SOFTWARE AND SERVICES BY YOU OR OTHERS, HOWEVER CAUSED AND WHETHER UNDER THEORY OF CONTRACT, TORT (INCLUDING NEGLIGENCE), STRICT LIABILITY OR OTHERWISE, EVEN IF APPLE HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. SOME JURISDICTIONS DO NOT ALLOW THE LIMITATION OF LIABILITY FOR PERSONAL INJURY, OR OF INCIDENTAL OR CONSEQUENTIAL DAMAGES, SO THIS LIMITATION MAY NOT APPLY TO YOU. In no event shall Apple’s total liability to you for all damages (other than as may be required by applicable law in cases involving personal injury) exceed the amount of fifty dollars ($50.00). The foregoing limitations will apply even if the above stated remedy fails of its essential purpose.
 * 
 * **ACKNOWLEDGEMENTS:**
 * https://applepay.cdn-apple.com/jsapi/v1.3.0/acknowledgements.txt
 *
 * 1.3.5 
 */(() => {
  var ue = false;
  if (typeof window !== "undefined") {
    oe = {
      get passive() {
        ue = true;
      }
    };
    window.addEventListener("testPassive", null, oe);
    window.removeEventListener("testPassive", null, oe);
  }
  var oe;
  var ce = typeof window !== "undefined" && window.navigator && window.navigator.platform && (/iP(ad|hone|od)/.test(window.navigator.platform) || window.navigator.platform === "MacIntel" && window.navigator.maxTouchPoints > 1);
  var J = [];
  var pe = false;
  var ne = undefined;
  var K = undefined;
  var ie = undefined;
  function Le(t) {
    return J.some(function (o) {
      return !!o.options.allowTouchMove && !!o.options.allowTouchMove(t);
    });
  }
  function Te(t) {
    var o = t || window.event;
    if (Le(o.target) || o.touches.length > 1) {
      return true;
    } else {
      if (o.preventDefault) {
        o.preventDefault();
      }
      return false;
    }
  }
  function Re() {
    if (ie !== undefined) {
      document.body.style.paddingRight = ie;
      ie = undefined;
    }
    if (ne !== undefined) {
      document.body.style.overflow = ne;
      ne = undefined;
    }
  }
  function Me() {
    if (K !== undefined) {
      var t = -parseInt(document.body.style.top, 10);
      var o = -parseInt(document.body.style.left, 10);
      document.body.style.position = K.position;
      document.body.style.top = K.top;
      document.body.style.left = K.left;
      window.scrollTo(o, t);
      K = undefined;
    }
  }
  function he(t) {
    if (!t) {
      console.error("enableBodyScroll unsuccessful - targetElement must be provided when calling enableBodyScroll on IOS devices.");
      return;
    }
    J = J.filter(function (o) {
      return o.targetElement !== t;
    });
    if (ce) {
      t.ontouchstart = null;
      t.ontouchmove = null;
      if (pe && J.length === 0) {
        document.removeEventListener("touchmove", Te, ue ? {
          passive: false
        } : undefined);
        pe = false;
      }
    }
    if (ce) {
      Me();
    } else {
      Re();
    }
  }
  var re = document.createElement("div");
  var He = window.ApplePaySDK ? window.ApplePaySDK.publicPath : document.currentScript?.src.slice(0, document.currentScript.src.lastIndexOf("/")) || "";
  var me = e => {
    re.dataset[e] = "";
    let t = re.attributes[0];
    re.removeAttribute(t.name);
    return t.name.slice(5);
  };
  function W(e, t) {
    if (!!e && !!t) {
      for (let [o, a] of Object.entries(t)) {
        e.style.setProperty(o, a);
      }
    }
  }
  function y(e, t) {
    if (!!e && !!t) {
      for (let [o, a] of Object.entries(t)) {
        e.style[o] = a;
      }
    }
  }
  var $ = {
    modal: {
      "--modal-overlay-background": "rgb(255, 255, 255)",
      "--modal-overlay-padding-top": "76px",
      "--modal-overlay-padding-bottom": "76px",
      "--modal-overlay-padding-inline": "76px",
      "--modal-close-button-offset-top": "16px",
      "--modal-close-button-offset-inline-start": "16px",
      "--modal-close-button-size": "44px",
      "--modal-close-background": "rgb(232, 232, 237)",
      "--modal-close-background-hover": "#ececf0",
      "--modal-close-background-active": "#dfdfe4",
      "--modal-close-color": "rgba(0, 0, 0, 0.56)",
      "--modal-close-color-hover": "rgba(0, 0, 0, 0.72)",
      "--modal-close-border-radius": "50%",
      "--modal-close-button-position": "static",
      "--modal-close-icon-size": "36px",
      "--modal-close-icon-svg-size": "20px"
    },
    "modal-light": {
      "--modal-overlay-background": "rgb(255, 255, 255)",
      "--modal-close-background": "rgb(232, 232, 237)",
      "--modal-close-background-hover": "#ececf0",
      "--modal-close-background-active": "#dfdfe4",
      "--modal-close-color": "rgba(0, 0, 0, 0.56)",
      "--modal-close-color-hover": "rgba(0, 0, 0, 0.72)"
    },
    "modal-page-overlay": {
      "--modal-scrim-background": "rgba(0, 0, 0, 0.48)",
      "--modal-overlay-margin-top": "40px",
      "--modal-overlay-margin-bottom": "var(--modal-overlay-margin-top)",
      "--modal-overlay-border-radius-top": "18px",
      "--modal-overlay-border-radius-bottom": "var(--modal-overlay-border-radius-top)",
      "--modal-overlay-width": "816.6666666667px"
    },
    "modal-full-bleed": {
      "--modal-close-button-offset-inline-start": "max(16px, env(safe-area-inset-left))",
      "--modal-scrim-background": "var(--modal-overlay-background)",
      "--modal-overlay-padding-top": "96px",
      "--modal-overlay-padding-bottom": "96px",
      "--modal-close-button-offset-top": "max(16px, env(safe-area-inset-top))",
      "--modal-overlay-margin-top": "none",
      "--modal-overlay-margin-bottom": "none",
      "--modal-overlay-border-radius-top": "none",
      "--modal-overlay-border-radius-bottom": "none",
      "--modal-overlay-width": "none"
    }
  };
  var ge = {
    modal: {
      "--modal-overlay-background": "rgb(29, 29, 31)",
      "--modal-close-background": "rgb(51, 51, 54)",
      "--modal-close-background-hover": "#37373a",
      "--modal-close-background-active": "#2f2f32",
      "--modal-close-color": "rgba(255, 255, 255, 0.8)",
      "--modal-close-color-hover": "rgb(255, 255, 255)"
    }
  };
  var C = {
    modal: {
      background: "var(--modal-scrim-background, var(--modal-overlay-background))",
      position: "fixed",
      zIndex: "-1",
      left: "0",
      right: "0",
      top: "0",
      bottom: "0",
      display: "none",
      overflow: "auto"
    },
    "modal-crossfade": {
      display: "block",
      visibility: "hidden",
      opacity: 0,
      transition: "opacity .4s ease,visibility 0s linear .4s,z-index 0s linear .4s"
    },
    "modal-crossfade_modal-open": {
      visibility: "visible",
      opacity: "1",
      transitionDelay: "0s"
    },
    "modal-open": {
      display: "block",
      zIndex: 2147483647
    },
    "modal-overlay": {
      position: "relative",
      zIndex: 1,
      display: "flex",
      flexDirection: "column",
      marginInlineStart: "auto",
      marginInlineEnd: "auto",
      boxSizing: "border-box",
      borderRadius: "var(--modal-overlay-border-radius-top) var(--modal-overlay-border-radius-top) var(--modal-overlay-border-radius-bottom) var(--modal-overlay-border-radius-bottom)",
      width: "var(--modal-overlay-width)",
      marginTop: "var(--modal-overlay-margin-top)",
      marginBottom: "var(--modal-overlay-margin-bottom)",
      flexGrow: "unset"
    },
    "modal-overlay-container": {
      boxSizing: "border-box",
      display: "flex",
      alignItems: "center",
      minHeight: "100%",
      flexDirection: "unset",
      height: "unset"
    },
    "modal-content-container": {
      background: "var(--modal-overlay-background)",
      order: 2,
      boxSizing: "border-box",
      paddingInlineStart: "var(--modal-overlay-padding-inline)",
      paddingInlineEnd: "var(--modal-overlay-padding-inline)",
      paddingTop: "var(--modal-overlay-padding-top)",
      paddingBottom: "var(--modal-overlay-padding-bottom)",
      marginTop: "calc(-1*(44px + var(--modal-close-button-offset-top)))",
      borderRadius: "inherit",
      "-webkit-mask-image": "radial-gradient(white, black)",
      maskImage: "radial-gradient(white, black)",
      flexGrow: "unset"
    },
    "modal-content_iframe": {
      width: "100%",
      height: "100%",
      border: "none",
      boxSizing: "border-box"
    },
    "modal-close-button": {
      cursor: "pointer",
      position: "var(--modal-close-button-position)",
      order: 1,
      display: "flex",
      alignSelf: "flex-end",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 9999,
      height: "var(--modal-close-button-size)",
      width: "var(--modal-close-button-size)",
      margin: 0,
      padding: 0,
      border: 0,
      marginInlineEnd: "var(--modal-close-button-offset-inline-start)",
      marginTop: "var(--modal-close-button-offset-top)",
      top: "var(--modal-close-button-offset-top)",
      background: "none",
      boxSizing: "content-box",
      color: "inherit",
      font: "inherit",
      lineHeight: "inherit",
      overflow: "visible",
      verticalAlign: "inherit"
    },
    "modal-close-icon": {
      background: "var(--modal-close-background)",
      borderRadius: "var(--modal-close-border-radius)",
      color: "var(--modal-close-color)",
      display: "flex",
      alignItems: "center",
      height: "var(--modal-close-icon-size)",
      width: "var(--modal-close-icon-size)",
      outline: "none",
      transition: "color 100ms linear,background 100ms linear",
      position: "relative",
      pointerEvents: "none"
    },
    "modal-close-icon_svg": {
      fill: "currentColor",
      position: "absolute",
      insetInlineStart: "50%",
      height: "var(--modal-close-icon-svg-size)",
      width: "var(--modal-close-icon-svg-size)",
      transform: "translateX(-50%)"
    },
    "modal-close-icon_hover": {
      background: "var(--modal-close-background-hover)",
      color: "var(--modal-close-color-hover)"
    },
    "modal-full-bleed": {
      width: "100%",
      borderTop: "1px solid #d2d2d7",
      borderBottom: "1px solid #d2d2d7",
      backgroundColor: "#fff",
      textAlign: "center"
    },
    "modal-full-bleed_modal-overlay-container": {
      flexDirection: "column",
      height: "100%"
    },
    "modal-full-bleed_modal-overlay": {
      flexGrow: 1,
      width: "100%"
    },
    "modal-full-bleed_modal-content-container": {
      flexGrow: 1,
      width: "100%"
    }
  };
  var ae = class extends HTMLElement {
    constructor() {
      super();
      let t = document.createElement("template");
      t.innerHTML = "<div class=\"spinner-container\"><div data-progress-indicator=\"\" class=\"progress-indicator progress-indicator-visible\" aria-label=\"aria-label-from-constructor\"><svg class=\"progress-indicator-icon\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 56 56\" aria-hidden=\"true\"><g class=\"progress-indicator-spokes\"><path class=\"progress-indicator-spoke\" d=\"M28,8.5A2.5,2.5,0,0,1,30.5,11v7a2.5,2.5,0,0,1-5,0V11A2.5,2.5,0,0,1,28,8.5Z\"></path><path class=\"progress-indicator-spoke\" d=\"M41.79,14.21a2.52,2.52,0,0,1,0,3.54L36.84,22.7a2.5,2.5,0,0,1-3.54-3.54l5-4.95A2.52,2.52,0,0,1,41.79,14.21Z\"></path><path class=\"progress-indicator-spoke\" d=\"M47.5,28A2.5,2.5,0,0,1,45,30.5H38a2.5,2.5,0,0,1,0-5h7A2.5,2.5,0,0,1,47.5,28Z\"></path><path class=\"progress-indicator-spoke\" d=\"M41.79,41.79a2.52,2.52,0,0,1-3.54,0l-5-4.95a2.5,2.5,0,0,1,3.54-3.54l4.95,5A2.52,2.52,0,0,1,41.79,41.79Z\"></path><path class=\"progress-indicator-spoke\" d=\"M28,47.5A2.5,2.5,0,0,1,25.5,45V38a2.5,2.5,0,0,1,5,0v7A2.5,2.5,0,0,1,28,47.5Z\"></path><path class=\"progress-indicator-spoke\" d=\"M14.21,41.79a2.52,2.52,0,0,1,0-3.54l4.95-5a2.5,2.5,0,0,1,3.54,3.54l-4.95,4.95A2.52,2.52,0,0,1,14.21,41.79Z\"></path><path class=\"progress-indicator-spoke\" d=\"M8.5,28A2.5,2.5,0,0,1,11,25.5h7a2.5,2.5,0,0,1,0,5H11A2.5,2.5,0,0,1,8.5,28Z\"></path><path class=\"progress-indicator-spoke\" d=\"M14.21,14.21a2.52,2.52,0,0,1,3.54,0l4.95,4.95a2.5,2.5,0,0,1-3.54,3.54l-4.95-4.95A2.52,2.52,0,0,1,14.21,14.21Z\"></path></g></svg></div></div>";
      this._shadowRoot = this.attachShadow({
        mode: "closed"
      });
      this._shadowRoot.appendChild(t.content.cloneNode(true));
    }
    connectedCallback() {
      W(this._shadowRoot.querySelector(".progress-indicator"), {
        "--progress-indicator-size": "40px",
        "--progress-indicator-color": "rgba(0, 0, 0, 0.56)"
      });
      y(this._shadowRoot.querySelector(".progress-indicator"), {
        display: "flex"
      });
      y(this._shadowRoot.querySelector(".progress-indicator.progress-indicator-visible"), {
        opacity: 1
      });
      y(this._shadowRoot.querySelector(".progress-indicator.progress-indicator-visible .progress-indicator-icon"), {
        opacity: 1,
        transition: "opacity 400ms ease",
        willChange: "opacity"
      });
      y(this._shadowRoot.querySelector(".progress-indicator-icon"), {
        width: "var(--progress-indicator-size)",
        height: "var(--progress-indicator-size)"
      });
      W(this._shadowRoot.querySelector(".dark .spinner-container .progress-indicator"), {
        "--progress-indicator-color": "rgba(255, 255, 255, 0.8)"
      });
      let t = [{
        opacity: 0.9
      }, {
        opacity: 0.7
      }, {
        opacity: 0.6
      }, {
        opacity: 0.4
      }, {
        opacity: 0.3
      }, {
        opacity: 0.2
      }, {
        opacity: 0.13
      }];
      let o = {
        direction: "normal",
        easing: "cubic-bezier(1, 0.1, 0, 0.3)",
        duration: 800,
        iterations: Infinity
      };
      this._shadowRoot.querySelectorAll(".progress-indicator-icon .progress-indicator-spoke").forEach((a, p) => {
        y(a, {
          fill: "var(--progress-indicator-color)",
          opacity: 0.2
        });
        a.animate(t, {
          ...o,
          delay: (p + 1) * 100
        });
      });
    }
    setTheme(t = "light") {
      if (t === "dark") {
        W(this._shadowRoot.querySelector(".progress-indicator"), {
          "--progress-indicator-color": "rgba(255, 255, 255, 0.8)"
        });
      } else {
        W(this._shadowRoot.querySelector(".progress-indicator"), {
          "--progress-indicator-color": "rgba(0, 0, 0, 0.56)"
        });
      }
    }
  };
  var ye = ae;
  customElements.define("apple-spinner", ye);
  var X = class extends HTMLElement {
    constructor() {
      super();
      this.shadow = null;
      this.open = false;
      this.ready = false;
      this.url = Q.url;
      this.theme = Q.theme;
      this.locale = Q.locale;
      this.onModalClose = null;
      this.close = this.close.bind(this);
    }
    async connectedCallback() {
      this.shadow = this.attachShadow({
        mode: "open"
      });
      this.update();
      this.shadow.addEventListener("click", a => {
        if (a.target.hasAttribute("data-modal-close")) {
          this.close();
        }
      });
      window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", a => {
        this.applySystemThemeColor(a);
      });
      this.shadow.addEventListener("keydown", a => {
        if (a.key === "Escape" || a.code === "Escape") {
          this.close();
        }
      });
    }
    applySystemThemeColor({
      matches: o
    }) {
      let a = this.shadow.querySelector("#spinner-container apple-spinner");
      if (o) {
        W(this.shadow.querySelector(".modal"), ge.modal);
        a?.setTheme("dark");
      } else {
        W(this.shadow.querySelector(".modal"), $["modal-light"]);
        a?.setTheme("light");
      }
    }
    show(o) {
      this.shadow.querySelector(".modal").classList.add("modal-open");
      let a = () => {
        o.cssVariableOverrides?.forEach(h => {
          W(this.shadow.querySelector(h.selector), h.properties);
        });
        o.cssStyleOverrides?.forEach(h => {
          y(this.shadow.querySelector(h.selector), h.styles);
        });
      };
      let p = this.shadow.querySelector(".modal-content-container");
      let g = p.querySelector("iframe");
      if (g) {
        p.removeChild(g);
      }
      let A = document.createElement("iframe");
      A.src = this.shadow.host.getAttribute("url");
      A.setAttribute("role", "presentation");
      A.onload = () => {
        this.shadow.querySelector("#spinner-container").style.display = "none";
        A.style.display = "block";
      };
      y(A, C["modal-content_iframe"]);
      p.appendChild(A);
      let v = o.fullBleedMaxWidth || "640px";
      let I = window.matchMedia(`(max-width: ${v})`);
      let l = h => {
        let c = this.shadow.querySelector(".modal");
        if (c.classList.contains("modal-open")) {
          if (h.matches) {
            W(c, $["modal-full-bleed"]);
            y(c, C["modal-full-bleed"]);
            a();
            y(c.querySelector(".modal-overlay-container"), C["modal-full-bleed_modal-overlay-container"]);
            y(c.querySelector(".modal-overlay"), C["modal-full-bleed_modal-overlay"]);
            y(c.querySelector(".modal-content-container"), C["modal-full-bleed_modal-content-container"]);
          } else {
            W(c, $.modal);
            W(c, $["modal-page-overlay"]);
            this.applySystemThemeColor(window.matchMedia("(prefers-color-scheme: dark)"));
            y(c.querySelector(".modal-overlay-container"), C["modal-overlay-container"]);
            y(c.querySelector(".modal-overlay"), C["modal-overlay"]);
            y(c.querySelector(".modal-content-container"), C["modal-content-container"]);
            a();
          }
          y(c, C.modal);
          y(c, C["modal-open"]);
          y(c, C["modal-crossfade_modal-open"]);
        }
      };
      l(I);
      I.addEventListener("change", l);
      o.ariaOverrides?.forEach(h => {
        this.shadow.querySelector(h.selector)?.setAttribute(h.attribute, h.value);
      });
      this.shadow.querySelector("[role='dialog']").focus();
    }
    attributesReady(o, a) {
      o.contentWindow.postMessage("showing", new URL(o.src).origin);
      Z.style.visibility = "visible";
      o.style.visibility = "visible";
      a?.remove();
      this.open = true;
    }
    close() {
      if (this.onModalClose) {
        this.onModalClose();
      }
      he(this.ownerDocument.body || this.ownerDocument.documentElement);
      this.shadow.querySelector(".modal").classList.remove("modal-open");
      y(this.shadow.querySelector(".modal"), C.modal);
      y(this.shadow.querySelector(".modal-crossfade"), C["modal-crossfade"]);
      let o = this.shadow.querySelector(".modal-content-container iframe");
      o?.setAttribute("src", "about:blank");
      if (o) {
        this.shadow.querySelector(".modal-content-container").removeChild(o);
      }
    }
    update() {
      let o = document.createElement("div");
      o.setAttribute("data-modal-element-container", "");
      o.setAttribute("data-modal-close", "");
      o.classList.add("modal", "modal-crossfade", "modal-page-overlay");
      let a = document.createElement("div");
      a.setAttribute("data-modal-element-overlay-container", "");
      a.setAttribute("data-modal-close", "");
      a.classList.add("modal-overlay-container");
      o.appendChild(a);
      let p = document.createElement("div");
      p.setAttribute("data-modal-element-overlay", "");
      p.setAttribute("data-modal-close-button-parent", "");
      p.setAttribute("aria-modal", "true");
      p.setAttribute("role", "dialog");
      p.setAttribute("tabindex", "-1");
      p.classList.add("modal-overlay");
      a.appendChild(p);
      let g = document.createElement("div");
      g.classList.add("modal-content-container");
      g.setAttribute("data-modal-element-content-container", "");
      let A = document.createElement("div");
      A.id = "spinner-container";
      let v = document.createElement("apple-spinner");
      A.style.height = "100%";
      A.style.display = "flex";
      A.style.alignItems = "center";
      A.style.justifyContent = "center";
      A.appendChild(v);
      g.appendChild(A);
      let I = document.createElement("button");
      I.classList.add("modal-close-button");
      I.setAttribute("data-modal-element-close-button", "");
      I.setAttribute("data-modal-close", "");
      I.setAttribute("aria-label", "Close");
      let l = document.createElement("span");
      l.classList.add("modal-close-icon");
      l.setAttribute("data-modal-element-close-icon", "");
      l.setAttribute("data-modal-close", "");
      I.appendChild(l);
      let h = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      h.setAttribute("data-modal-close", "");
      h.setAttribute("xmlns", "http://www.w3.org/2000/svg");
      h.setAttribute("viewBox", "0 0 20 20");
      l.appendChild(h);
      let c = document.createElementNS("http://www.w3.org/2000/svg", "path");
      c.setAttribute("data-modal-close", "");
      c.setAttribute("d", "M12.12,10l4.07-4.06a1.5,1.5,0,1,0-2.11-2.12L10,7.88,5.94,3.81A1.5,1.5,0,1,0,3.82,5.93L7.88,10,3.81,14.06a1.5,1.5,0,0,0,0,2.12,1.51,1.51,0,0,0,2.13,0L10,12.12l4.06,4.07a1.45,1.45,0,0,0,1.06.44,1.5,1.5,0,0,0,1.06-2.56Z");
      h.appendChild(c);
      p.appendChild(g);
      p.appendChild(I);
      this.shadow.appendChild(o);
      let T = this.shadow.querySelector(".modal-close-button");
      W(this.shadow.querySelector(".modal"), $.modal);
      W(this.shadow.querySelector(".modal-page-overlay"), $["modal-page-overlay"]);
      this.applySystemThemeColor(window.matchMedia("(prefers-color-scheme: dark)"));
      y(this.shadow.querySelector(".modal"), C.modal);
      y(this.shadow.querySelector(".modal-crossfade"), C["modal-crossfade"]);
      y(this.shadow.querySelector(".modal-page-overlay"), C["modal-page-overlay"]);
      y(this.shadow.querySelector(".modal-overlay-container"), C["modal-overlay-container"]);
      y(this.shadow.querySelector(".modal-overlay"), C["modal-overlay"]);
      y(this.shadow.querySelector(".modal-content-container"), C["modal-content-container"]);
      y(T, C["modal-close-button"]);
      y(this.shadow.querySelector(".modal-close-icon"), C["modal-close-icon"]);
      y(this.shadow.querySelector(".modal-close-icon svg"), C["modal-close-icon_svg"]);
      T.addEventListener("mouseover", () => {
        y(T.querySelector(".modal-close-icon"), C["modal-close-icon_hover"]);
      });
      T.addEventListener("mouseout", () => {
        y(this.shadow.querySelector(".modal-close-icon"), C["modal-close-icon"]);
      });
    }
    static get observedAttributes() {
      return [ke, "open"];
    }
  };
  var Q = {
    theme: "auto",
    locale: "en-US",
    url: ""
  };
  var fe = "apple-pay-modal";
  var ke = Object.keys(Q).map(me);
  Object.assign(X.prototype, Q);
  customElements.define(fe, X);
  var Z = document.createElement(fe);
  Z.style.visibility = "hidden";
  if (!document.contains(Z)) {
    (document.body || document.documentElement).appendChild(Z);
  }
  var G = Z;
  var Y = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
  var Oe = typeof Y == "object" && Y && Y.Object === Object && Y;
  var qe = Oe;
  var Ue = qe;
  var Ne = typeof self == "object" && self && self.Object === Object && self;
  var Be = Ue || Ne || Function("return this")();
  var _e = Be;
  var De = _e;
  var Fe = De.Symbol;
  var ve = Fe;
  var we = ve;
  var Se = Object.prototype;
  var et = Se.hasOwnProperty;
  var tt = Se.toString;
  var ot = we ? we.toStringTag : undefined;
  var We = Object.prototype;
  var nt = We.toString;
  var be = ve;
  var it = be ? be.toStringTag : undefined;
  var ee = class {
    constructor() {
      this.userAgent = window.navigator.userAgent;
      this.isAndroid = /android/i.test(this.userAgent);
      this.isEdgiOS = /edgios/i.test(this.userAgent);
      this.isEdgA = /edga/i.test(this.userAgent);
      this.isEdge = !this.isEdgiOS && !this.isEdgA && /edge/i.test(this.userAgent);
      this.isFirefoxiOS = !this.isEdge && /fxios/i.test(this.userAgent);
      this.isChrome = !this.isEdge && !this.isFirefoxiOS && /chrome/i.test(this.userAgent);
      this.isCrios = !this.isEdge && !this.isFirefoxiOS && !this.isChrome && /crios/i.test(this.userAgent);
      this.isSafari = !this.isAndroid && !this.isEdgiOS && !this.isEdge && !this.isFirefoxiOS && !this.isChrome && !this.isCrios && /safari/i.test(this.userAgent);
      this.isMobileSafari = !this.isAndroid && !this.isEdge && !this.isFirefoxiOS && !this.isChrome && !this.isCrios && this.isBrowserMobileSafari();
      this.isFirefoxAndroid = this.isAndroid && !this.isFirefoxiOS && !this.isEdge && !this.isChrome && !this.isSafari && /firefox/i.test(this.userAgent);
      this.isFirefox = !this.isFirefoxAndroid && !this.isFirefoxiOS && !this.isEdge && !this.isChrome && !this.isSafari && /firefox/i.test(this.userAgent);
      this.isIE = !this.isEdge && !this.isChrome && !this.isSafari && !this.isFirefox && /trident|msie/i.test(this.userAgent);
      this.isWindows = !!/windows/i.test(this.userAgent);
      this.isOpera = !!/opera/i.test(this.userAgent);
      this.isMobilesafariwebview = this.isMobileSafari && /^((?!safari).)*$/i.test(this.userAgent);
      this.isFacebookMessengeriOSwebview = this.isDeviceIOS() && /fban\/messengerforios;/i.test(this.userAgent);
      this.islinkedIniOSwebview = /applewebkit\/(\d+)[.*\d+]+ .*mobile\/(\d+[A-z]*\d+).*LinkedInApp/i.test(this.userAgent);
      this.isGoogleBot = /\sgooglebot\//i.test(this.userAgent);
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
      return /apple.*mobile/i.test(this.userAgent) && t;
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
  function te() {
    if (window.location.protocol !== "https:") {
      throw "InvalidAccessError: Trying to start an Apple Pay session from an insecure document.";
    }
  }
  function Ae(e) {
    if (typeof e == "number") {
      return e.toString();
    }
    if (typeof e == "string" && !isNaN(parseFloat(e))) {
      return e;
    }
    throw new TypeError(`"${e}" is not a valid amount.`);
  }
  function _(e) {
    if ("amount" in e) {
      e.amount = Ae(e.amount);
    }
    if ("automaticReloadPaymentThresholdAmount" in e) {
      e.automaticReloadPaymentThresholdAmount = Ae(e.automaticReloadPaymentThresholdAmount);
    }
  }
  function Pe(e) {
    if (e) {
      if (!e.merchantCapabilities) {
        throw new TypeError("Member ApplePayPaymentRequest.merchantCapabilities is required and must be an instance of sequence");
      }
      if (!e.supportedNetworks) {
        throw new TypeError("Member ApplePayPaymentRequest.supportedNetworks is required and must be an instance of sequence");
      }
      if (!e.currencyCode) {
        throw new TypeError("Member ApplePayPaymentRequest.currencyCode is required and must be an instance of DOMString");
      }
      if (!e.countryCode) {
        throw new TypeError("Member ApplePayPaymentRequest.countryCode is required and must be an instance of DOMString");
      }
      if (!e.total) {
        throw new TypeError("Member ApplePayPaymentRequest.total is required and must be an instance of ApplePayLineItem");
      }
      _(e.total);
      if (e.lineItems) {
        e.lineItems.forEach(t => _(t));
      }
      if (e.shippingMethods) {
        e.shippingMethods.forEach(t => _(t));
      }
      if (e.multiTokenContexts) {
        e.multiTokenContexts.forEach(t => _(t));
      }
      if (e.automaticReloadPaymentRequest) {
        _(e.automaticReloadPaymentRequest.automaticReloadBilling);
      }
      if (e.recurringPaymentRequest) {
        _(e.recurringPaymentRequest.regularBilling);
        if (e.recurringPaymentRequest.trialBilling) {
          _(e.recurringPaymentRequest.trialBilling);
        }
      }
      if (e.deferredPaymentRequest) {
        _(e.deferredPaymentRequest.deferredBilling);
      }
    }
  }
  function Ce(e) {
    if (e) {
      if (!e.newTotal) {
        throw new TypeError("Member ApplePayPaymentMethodUpdate.newTotal is required and must be an instance of ApplePayLineItem");
      }
      _(e.newTotal);
      if (e.newLineItems) {
        e.newLineItems.forEach(t => _(t));
      }
      if (e.newShippingMethods) {
        e.newShippingMethods.forEach(t => _(t));
      }
      if (e.newMultiTokenContexts) {
        e.newMultiTokenContexts.forEach(t => _(t));
      }
      if (e.newAutomaticReloadPaymentRequest) {
        _(e.newAutomaticReloadPaymentRequest.automaticReloadBilling);
      }
      if (e.newRecurringPaymentRequest) {
        _(e.newRecurringPaymentRequest.regularBilling);
        if (e.newRecurringPaymentRequest.trialBilling) {
          _(e.newRecurringPaymentRequest.trialBilling);
        }
      }
      if (e.newDeferredPaymentRequest) {
        _(e.newDeferredPaymentRequest.deferredBilling);
      }
    }
  }
  function Ve(e) {
    let t = new URL(e);
    t.search = "";
    return t.toString();
  }
  function se() {
    let e = window.location.href;
    if (window.self !== window.top) {
      if (window.location.ancestorOrigins) {
        if (window.location.ancestorOrigins.length) {
          e = window.location.ancestorOrigins[window.location.ancestorOrigins.length - 1];
        }
      } else {
        e = document.referrer;
      }
    }
    return Ve(e);
  }
  (function () {
    if (window.ApplePaySession) {
      ApplePaySession.applePayCapabilities = async e => {
        if (!ApplePaySession.canMakePayments()) {
          return Promise.resolve({
            paymentCredentialStatus: "applePayUnsupported"
          });
        }
        let t = await ApplePaySession.canMakePaymentsWithActiveCard(e);
        return Promise.resolve({
          paymentCredentialStatus: t ? "paymentCredentialsAvailable" : "paymentCredentialsUnavailable"
        });
      };
    } else {
      let e = document.currentScript && document.currentScript.src ? document.currentScript.src : "";
      let t = e.slice(0, e.lastIndexOf("/")) || "";
      let o = t ? new URL(t).origin : "";
      let a = new URL(t);
      let p = `${o}${a.pathname}`;
      let g = {
        MODAL: "modal",
        WINDOW: "window"
      };
      let A = null;
      let v = false;
      let I = "";
      window.onbeforeunload = () => {
        l.closeApplePayCodeWindow();
      };
      let l = {
        applePayCodeNewWin: null,
        applePayCloseCallback: null,
        getRenderMode: () => g.MODAL,
        getMerchantUrlOverride: () => "",
        focusApplePayCodeWindow: () => {
          if (l.applePayCodeNewWin) {
            l.applePayCodeNewWin.focus();
          }
        },
        closeApplePayCodeWindow: () => {
          if (l.applePayCodeNewWin) {
            l.applePayCodeNewWin.close();
          }
        }
      };
      window.ApplePaySession = class {
        constructor(h, c) {
          te();
          Pe(c);
          let T = null;
          let M = null;
          let R = {};
          let k = g.MODAL;
          let V = false;
          let N = false;
          let H = false;
          let n = {
            origin: window.location.origin
          };
          let d = new URLSearchParams(window.location.search).get("websocket");
          if (d) {
            n.ws = d;
          }
          let u = {};
          function f(r, s) {
            let B = window.screenX + (window.outerWidth - 640) / 2;
            let m = window.screenY + (window.outerHeight - 617) / 2;
            let b = `left=${B},top=${m},width=640,height=617,toolbar=no,menubar=no`;
            let P = new URLSearchParams(n).toString();
            let O = `${p}/applepaycode/index.html?newWin=true${P ? "&" + P : ""}`;
            M = window.open(O, "apple-pay-code", b);
            let z = 0;
            if (M) {
              l.applePayCodeNewWin = M;
              let F = Array.from(document.querySelectorAll("link[rel=\"apple-touch-icon\"], link[rel=\"apple-touch-icon-precomposed\"]"));
              let j = F.length ? F.map(xe => new URL(xe.getAttribute("href"), window.location.href).href) : [new URL("apple-touch-icon-80x80.png", window.location.origin).href, new URL("apple-touch-icon-80x80-precomposed.png", window.location.origin).href, new URL("apple-touch-icon.png", window.location.origin).href, new URL("apple-touch-icon-precomposed.png", window.location.origin).href];
              let Ee = {
                paymentRequest: r,
                originatingURL: se(),
                userAgent: navigator.userAgent,
                thumbnailURLs: j,
                requestType: s
              };
              let Ie = {
                merchantUrl: window.location.origin,
                merchantId: I,
                sdkUrl: e,
                applePayAPIType: s
              };
              let le = {};
              let de = l.getMerchantUrlOverride();
              if (de) {
                le.merchantUrlOverride = de;
              }
              T = setInterval(() => {
                q("paymentRequestCreatedMsg", {
                  paymentRequest: Ee,
                  metadata: Ie,
                  options: le
                });
                if (z > 60) {
                  clearInterval(T);
                }
                z++;
              }, 500);
              return true;
            }
            return false;
          }
          function D(r, s) {
            let E = `${p}/applepaycode/index.html?${new URLSearchParams(n).toString()}`;
            G.setAttribute("url", E);
            G.show({
              url: E,
              cssVariableOverrides: [{
                selector: ".modal",
                properties: {
                  "--modal-overlay-padding-top": "0",
                  "--modal-overlay-padding-bottom": "0",
                  "--modal-overlay-padding-inline": "0",
                  "--modal-overlay-width": "576px",
                  "--modal-overlay-border-radius-top": "34px",
                  "--modal-close-button-offset-top": "12px",
                  "--modal-close-button-offset-inline-start": "12px"
                }
              }, {
                selector: ".modal-full-bleed",
                properties: {
                  "--modal-close-button-offset-inline-start": "max(12px, env(safe-area-inset-left))",
                  "--modal-close-button-offset-top": "max(12px, env(safe-area-inset-top))"
                }
              }],
              cssStyleOverrides: [{
                selector: ".modal-content-container",
                styles: {
                  width: "576px",
                  height: "576px"
                }
              }],
              ariaOverrides: [{
                selector: "[role='dialog']",
                attribute: "aria-label",
                value: "Pay with Apple Pay"
              }]
            });
            let w = window.matchMedia("(max-width: 640px)");
            let B = ({
              matches: F
            }) => {
              q("isSmallViewPort", F);
            };
            w.addEventListener("change", B);
            if (G.shadowRoot.querySelector("iframe")) {
              M = G.shadowRoot.querySelector("iframe").contentWindow;
            }
            B(w);
            let m = 0;
            let b = Array.from(document.querySelectorAll("link[rel=\"apple-touch-icon\"], link[rel=\"apple-touch-icon-precomposed\"]"));
            let P = b.length ? b.map(F => new URL(F.getAttribute("href"), window.location.href).href) : [new URL("apple-touch-icon-80x80.png", window.location.origin).href, new URL("apple-touch-icon-80x80-precomposed.png", window.location.origin).href, new URL("apple-touch-icon.png", window.location.origin).href, new URL("apple-touch-icon-precomposed.png", window.location.origin).href];
            let O = {
              paymentRequest: r,
              originatingURL: se(),
              userAgent: navigator.userAgent,
              thumbnailURLs: P,
              requestType: s
            };
            let z = {
              merchantUrl: window.location.origin,
              merchantId: I,
              sdkUrl: e,
              applePayAPIType: s
            };
            T = setInterval(() => {
              q("paymentRequestCreatedMsg", {
                paymentRequest: O,
                metadata: z
              });
              B(w);
              if (m > 10) {
                clearInterval(T);
              }
              m++;
            }, 500);
            return true;
          }
          function q(r, s = {}) {
            if (M) {
              M.postMessage({
                messageType: r,
                messageBody: s
              }, o);
            }
          }
          this.onvalidatemerchant = null;
          this.completeMerchantValidation = r => {
            q("merchantSessionCreatedMsg", {
              messageId: R.readyForMerchantValidation,
              merchantSession: r
            });
          };
          this.onpaymentauthorized = null;
          this.completePayment = r => {
            let s = r;
            if (typeof update != "object" || !("status" in update)) {
              switch (r) {
                case ApplePaySession.STATUS_SUCCESS:
                  s = {
                    status: ApplePaySession.STATUS_SUCCESS
                  };
                  break;
                case ApplePaySession.STATUS_INVALID_BILLING_POSTAL_ADDRESS:
                  s = {
                    status: ApplePaySession.STATUS_FAILURE,
                    errors: [new ApplePayError("billingContactInvalid", "postalAddress", "Postal Address Invalid")]
                  };
                  break;
                case ApplePaySession.STATUS_INVALID_SHIPPING_POSTAL_ADDRESS:
                  s = {
                    status: ApplePaySession.STATUS_FAILURE,
                    errors: [new ApplePayError("shippingContactInvalid", "postalAddress", "Postal Address Invalid")]
                  };
                  break;
                case ApplePaySession.STATUS_INVALID_SHIPPING_CONTACT:
                  s = {
                    status: ApplePaySession.STATUS_FAILURE,
                    errors: [new ApplePayError("shippingContactInvalid", "phoneNumber", "Shipping Contact Invalid"), new ApplePayError("shippingContactInvalid", "emailAddress", "Shipping Contact Invalid"), new ApplePayError("shippingContactInvalid", "name", "Shipping Contact Invalid"), new ApplePayError("shippingContactInvalid", "postalAddress", "Shipping Contact Invalid"), new ApplePayError("shippingContactInvalid", "addressLines", "Shipping Contact Invalid"), new ApplePayError("shippingContactInvalid", "locality", "Shipping Contact Invalid"), new ApplePayError("shippingContactInvalid", "subLocality", "Shipping Contact Invalid"), new ApplePayError("shippingContactInvalid", "postalCode", "Shipping Contact Invalid"), new ApplePayError("shippingContactInvalid", "administrativeArea", "Shipping Contact Invalid"), new ApplePayError("shippingContactInvalid", "subAdministrativeArea", "Shipping Contact Invalid"), new ApplePayError("shippingContactInvalid", "country", "Shipping Contact Invalid"), new ApplePayError("shippingContactInvalid", "countryCode", "Shipping Contact Invalid")]
                  };
                  break;
                case ApplePaySession.STATUS_PIN_INCORRECT:
                case ApplePaySession.STATUS_PIN_LOCKOUT:
                case ApplePaySession.STATUS_PIN_REQUIRED:
                case ApplePaySession.STATUS_FAILURE:
                  s = {
                    status: ApplePaySession.STATUS_FAILURE,
                    errors: [new ApplePayError("unknown")]
                  };
                  break;
              }
            }
            q("merchantPaymentCompleteMsg", {
              messageId: R.paymentAuthorizedMsg,
              result: s
            });
            delete R.paymentAuthorizedMsg;
          };
          this.onpaymentmethodselected = null;
          this.completePaymentMethodSelection = (...r) => {
            let s = r[0];
            if (r.length > 1 || !L(s)) {
              let [E, w] = r;
              s = {
                newTotal: E
              };
              if (w && w.length) {
                s.newLineItems = w;
              }
            }
            x("paymentMethodSelected", s);
          };
          this.onshippingcontactselected = null;
          this.completeShippingContactSelection = (...r) => {
            let s = r[0];
            if (r.length > 1 || !L(s)) {
              let [E, w, B, m] = r;
              s = {
                newTotal: B
              };
              if (w && w.length) {
                s.newShippingMethods = w;
              }
              if (m && m.length) {
                s.newLineItems = m;
              }
              if (E === ApplePaySession.STATUS_FAILURE) {
                s.errors = [new ApplePayError("unknown")];
              } else if (E === ApplePaySession.STATUS_INVALID_SHIPPING_POSTAL_ADDRESS) {
                s.errors = [new ApplePayError("shippingContactInvalid", "postalCode", "ZIP Code is invalid")];
              }
            }
            x("shippingContactSelected", s);
          };
          this.onshippingmethodselected = null;
          this.completeShippingMethodSelection = (...r) => {
            let s = r[0];
            if (r.length > 1 || !L(s)) {
              s = {};
              let [E, w, B] = r;
              if (E === ApplePaySession.STATUS_SUCCESS) {
                s = {
                  newTotal: w
                };
                if (B && B.length) {
                  s.newLineItems = B;
                }
              }
            }
            x("shippingMethodSelected", s);
          };
          this.oncouponcodechanged = null;
          this.completeCouponCodeChange = r => {
            x("couponCodeChanged", r);
          };
          this.oncancel = null;
          this.abort = () => {
            U();
          };
          this.begin = (r = "applepaysession") => {
            if (v) {
              if (l.getRenderMode() === g.WINDOW) {
                l.focusApplePayCodeWindow();
              }
              throw "InvalidAccessError: Page already has an active payment session.";
            }
            l.closeApplePayCodeWindow();
            v = true;
            if (r === "payreqapi") {
              I = c.merchantIdentifier;
            }
            window.removeEventListener("message", A);
            clearInterval(T);
            window.addEventListener("message", S);
            k = l.getRenderMode();
            A = S;
            if (k === g.WINDOW) {
              f(c, r === "payreqapi" ? "paymentRequestAPI" : "applePayJSAPI");
            } else {
              D(c, r === "payreqapi" ? "paymentRequestAPI" : "applePayJSAPI");
            }
          };
          let x = (r, s) => {
            let E = {
              messageId: R[r],
              updateType: r
            };
            if (s && Object.keys(s).length) {
              Ce(s);
              E.update = s;
            }
            q("paymentRequestMerchantUpdatedMsg", E);
            delete R[r];
          };
          let S = r => {
            if (!!r.isTrusted && r.origin === o) {
              switch (r.data.messageType) {
                case "paymentRequestCreatedMsgResponse":
                  clearInterval(T);
                  break;
                case "paymentRequestUserUpdatedMsg":
                  R[r.data.messageBody.updateType] = r.data.messageHeaders.messageId;
                  switch (r.data.messageBody.updateType) {
                    case "readyForMerchantValidation":
                      if (this.onvalidatemerchant) {
                        this.onvalidatemerchant({
                          target: this,
                          srcElement: this,
                          ...r.data.messageBody.paymentRequest
                        });
                      }
                      break;
                    case "paymentMethodSelected":
                      if (this.onpaymentmethodselected) {
                        this.onpaymentmethodselected({
                          target: this,
                          srcElement: this,
                          ...r.data.messageBody.paymentRequest
                        });
                      } else {
                        x(r.data.messageBody.updateType);
                      }
                      break;
                    case "shippingContactSelected":
                      if (this.onshippingcontactselected) {
                        this.onshippingcontactselected({
                          target: this,
                          srcElement: this,
                          ...r.data.messageBody.paymentRequest
                        });
                      } else {
                        x(r.data.messageBody.updateType);
                      }
                      break;
                    case "shippingMethodSelected":
                      if (this.onshippingmethodselected) {
                        this.onshippingmethodselected({
                          target: this,
                          srcElement: this,
                          ...r.data.messageBody.paymentRequest
                        });
                      } else {
                        x(r.data.messageBody.updateType);
                      }
                      break;
                    case "couponCodeChanged":
                      if (this.oncouponcodechanged) {
                        this.oncouponcodechanged({
                          target: this,
                          srcElement: this,
                          ...r.data.messageBody.paymentRequest
                        });
                      } else {
                        x(r.data.messageBody.updateType);
                      }
                      break;
                    default:
                      console.warn("Unexpected:", r.data.messageBody.updateType);
                  }
                  break;
                case "paymentAuthorizedMsg":
                  R.paymentAuthorizedMsg = r.data.messageHeaders.messageId;
                  if (this.onpaymentauthorized) {
                    this.onpaymentauthorized({
                      target: this,
                      srcElement: this,
                      ...r.data.messageBody
                    });
                  }
                  break;
                case "paymentSheetShownSuccess":
                  V = true;
                  break;
                case "paymentSheetClosed":
                  N = true;
                  U();
                  break;
                case "close":
                  U();
                  break;
                case "successClose":
                  H = true;
                  U();
                  break;
                case "keydownEvent":
                  if (r.data.messageBody.key === "Escape" || r.data.messageBody.code === "Escape") {
                    U();
                  }
                  break;
                case "windowclosing":
                  if (!v) {
                    return;
                  }
                  v = false;
                  if (k === g.WINDOW && !N && !H && this.oncancel) {
                    this.oncancel();
                  }
                  if (l.applePayCloseCallback) {
                    l.applePayCloseCallback();
                  }
                  break;
                default:
                  console.warn("Unexpected message:", r.data.messageType);
              }
            }
          };
          function L(r) {
            return typeof r == "object" && "newTotal" in r;
          }
          let U = () => {
            v = false;
            if (k === g.WINDOW) {
              if (!H && this.oncancel) {
                this.oncancel();
              }
              l.closeApplePayCodeWindow();
              if (l.applePayCloseCallback) {
                l.applePayCloseCallback();
              }
            } else {
              G.close();
            }
          };
          G.onModalClose = () => {
            v = false;
            if (!H && this.oncancel) {
              this.oncancel();
            }
            if (l.applePayCloseCallback) {
              l.applePayCloseCallback();
            }
            window.dispatchEvent(new Event("apple-pay-close"));
          };
        }
        static canMakePayments() {
          te();
          if (navigator.userAgentData && navigator.userAgentData.mobile) {
            return false;
          }
          let h = new ee();
          if (h.isBrowserVersionAtLeastV2({
            firefoxA: {
              browserVersion: 63
            },
            otherwise: false
          })) {
            return /Tablet/i.test(navigator.userAgent);
          } else {
            return h.isBrowserVersionAtLeastV2({
              chrome: {
                browserVersion: 54
              },
              firefox: {
                browserVersion: 63
              },
              opera: {
                browserVersion: 40
              },
              safari: {
                browserVersion: 10
              },
              edge: {
                browserVersion: 79
              },
              otherwise: false
            });
          }
        }
        static canMakePaymentsWithActiveCard(h) {
          try {
            I = h;
            let c = this.canMakePayments();
            return Promise.resolve(c);
          } catch (c) {
            return Promise.reject(c);
          }
        }
        static supportsVersion(h) {
          te();
          return true;
        }
        static applePayCapabilities(h) {
          I = h;
          return Promise.resolve({
            paymentCredentialStatus: this.canMakePayments() ? "paymentCredentialStatusUnknown" : "applePayUnsupported"
          });
        }
        static STATUS_SUCCESS = 0;
        static STATUS_FAILURE = 1;
        static STATUS_INVALID_BILLING_POSTAL_ADDRESS = 2;
        static STATUS_INVALID_SHIPPING_POSTAL_ADDRESS = 3;
        static STATUS_INVALID_SHIPPING_CONTACT = 4;
        static STATUS_PIN_REQUIRED = 5;
        static STATUS_PIN_INCORRECT = 6;
        static STATUS_PIN_LOCKOUT = 7;
        static isNotWebkit = true;
      };
      window.ApplePayWebOptions = function () {
        let h = [g.MODAL, g.WINDOW];
        let c = g.MODAL;
        let T = null;
        let M = "";
        l.getRenderMode = () => c;
        l.getMerchantUrlOverride = () => M;
        function R(k) {
          if (!k) {
            return;
          }
          let V = [];
          if (k.renderApplePayCodeAs) {
            let N = false;
            if (typeof k.renderApplePayCodeAs != "string") {
              N = true;
              V.push("TypeError: renderApplePayCodeAs must a string");
            }
            if (!N && !h.includes(k.renderApplePayCodeAs)) {
              N = true;
              V.push("renderApplePayCodeAs must be one of:", "\"" + h.join("\", \"") + "\"");
            }
            if (!N) {
              c = k.renderApplePayCodeAs;
            }
          }
          if (k.onApplePayCodeClose) {
            let N = false;
            if (typeof k.onApplePayCodeClose != "function") {
              N = true;
              V.push("TypeError: onApplePayCodeClose must a function");
            }
            if (!N) {
              T = k.onApplePayCodeClose;
              l.applePayCloseCallback = T;
            }
          }
          if (k.merchantUrl) {
            let N = false;
            if (typeof k.merchantUrl != "string") {
              N = true;
              V.push("TypeError: merchantUrl must a string");
            }
            if (!N) {
              M = k.merchantUrl;
            }
          }
          if (V.length) {
            V.forEach(N => {
              console.error(N);
            });
          }
        }
        return {
          set: R,
          focusApplePayCodeWindow: l.focusApplePayCodeWindow,
          closeApplePayCodeWindow: l.closeApplePayCodeWindow
        };
      }();
    }
    window.ApplePayError ||= class {
      constructor(e, t = null, o = "", a = null) {
        this.code = e;
        this.contactField = t;
        this.message = o;
        this.domain = a;
      }
    };
  })();
  (function () {
    if (window.PaymentRequest && window.ApplePaySession.isNotWebkit) {
      let I = function (n, i) {
        if (n.currency !== i) {
          throw new Error(`${n.currency} does not match the expected currency of ${i}`);
        }
      };
      let l = function (n, i) {
        I(n.amount, i);
        let d = {
          ...n
        };
        delete d.amount;
        delete d.pending;
        return {
          amount: n.amount.value,
          type: n.pending ? v.PENDING_LINE_ITEM : v.FINAL_LINE_ITEM,
          ...d
        };
      };
      let h = function (n) {
        try {
          if (!n.shippingOptions || n.shippingOptions.length === 0) {
            return [];
          }
          let i = [];
          let d = n.total.amount.currency;
          if (n.shippingOptions) {
            n.shippingOptions.forEach(u => {
              if (typeof u == "object") {
                I(u.amount, d);
                i.push({
                  amount: u.amount.value,
                  label: u.label || "",
                  detail: u.detail || "",
                  identifier: u.id || ""
                });
              }
            });
          }
          return i;
        } catch (i) {
          console.error(i);
        }
      };
      let c = function (n) {
        let i = {};
        let d = "";
        if (n && n.total && n.total.amount) {
          d = n.total.amount.currency;
        }
        i.total = l(n.total, d);
        if (n.displayItems) {
          i.lineItems = [];
          n.displayItems.forEach(u => {
            i.lineItems.push(l(u, d));
          });
        }
        return i;
      };
      let T = function (n, i, d) {
        let u = null;
        if (n) {
          u = {};
          for (let f of n) {
            if (f.supportedMethods !== v.methodName) {
              continue;
            }
            if (f.total) {
              u.total = l(f.total, i);
            }
            if (f.additionalDisplayItems) {
              let L = [];
              f.additionalDisplayItems.forEach(U => {
                L.push(l(U, i));
              });
              if (L.length) {
                u.additionalLineItems = L;
              }
            }
            if (!f.data || Object.keys(f.data).length === 0) {
              break;
            }
            let D = f.data.paymentMethodType;
            if (D && D !== d) {
              continue;
            }
            f.total = f.data.total || f.total;
            let q = f.data.additionalLineItems;
            if (q && q.length) {
              if (u.additionalLineItems) {
                u.additionalLineItems = u.additionalLineItems.concat(q);
              } else {
                u.additionalLineItems = q;
              }
            }
            let x = f.data.additionalShippingMethods;
            if (x && x.length) {
              u.additionalShippingMethods = x;
            }
            let S = f.data.multiTokenContexts;
            if (S && S.length) {
              u.multiTokenContexts = S;
            }
            if (f.data.automaticReloadPaymentRequest) {
              u.automaticReloadPaymentRequest = f.data.automaticReloadPaymentRequest;
            }
            if (f.data.recurringPaymentRequest) {
              u.recurringPaymentRequest = f.data.recurringPaymentRequest;
            }
            if (f.data.deferredPaymentRequest) {
              u.deferredPaymentRequest = f.data.deferredPaymentRequest;
            }
            if (f.data.disbursementRequest) {
              u.disbursementRequest = f.data.disbursementRequest;
            }
            break;
          }
        }
        return u;
      };
      let M = function (n, i) {
        let d = {};
        if (i) {
          if (i.total) {
            d.total = i.total;
          }
          d.lineItems = [];
          if (i.lineItems) {
            d.lineItems = n.lineItems.concat(i.lineItems);
          }
          if (i.additionalLineItems) {
            i.additionalLineItems.forEach(u => {
              if (u.disbursementLineItemType === "disbursement") {
                d.total = {
                  ...u,
                  type: v.FINAL_LINE_ITEM
                };
              } else {
                d.lineItems.push(u);
              }
            });
          }
          if (i.additionalShippingMethods) {
            if (n.shippingMethods && n.shippingMethods.length) {
              d.shippingMethods = [...n.shippingMethods, ...i.additionalShippingMethods];
            } else {
              d.shippingMethods = [...i.additionalShippingMethods];
            }
          }
          if (i.recurringPaymentRequest) {
            d.recurringPaymentRequest = i.recurringPaymentRequest;
          }
          if (i.deferredPaymentRequest) {
            d.deferredPaymentRequest = i.deferredPaymentRequest;
          }
          if (i.automaticReloadPaymentRequest) {
            d.automaticReloadPaymentRequest = i.automaticReloadPaymentRequest;
          }
          if (i.multiTokenContexts) {
            d.multiTokenContexts = i.multiTokenContexts;
          }
          if (i.disbursementRequest) {
            d.disbursementRequest = i.disbursementRequest;
          }
        }
        return d;
      };
      let V = function (n) {
        let i = n.addressLines;
        if (i.length === 1 && !i[0]) {
          i = [];
        }
        return new k(n.locality, n.countryCode, n.subLocality, "", n.phoneNumber, n.postalCode, `${n.givenName} ${n.familyName}`, n.administrativeArea, "", i);
      };
      var e = I;
      var t = l;
      var o = h;
      var a = c;
      var p = T;
      var g = M;
      var A = V;
      let v = {
        PENDING_LINE_ITEM: "pending",
        FINAL_LINE_ITEM: "final",
        COMPLETE_SUCCESS: "success",
        COMPLETE_FAIL: "fail",
        methodName: "https://apple.com/apple-pay"
      };
      let R = function (n, i, d) {
        let u = "";
        if (n && n.total && n.total.amount) {
          u = n.total.amount.currency;
        }
        let f = d ? d.type : null;
        let D = c(n);
        let q = h(n);
        if (q.length) {
          D.shippingMethods = [...q];
        }
        D = {
          ...D,
          ...M(D, T(n.modifiers, u, f))
        };
        let x = {};
        if (Object.keys(i).length) {
          let U = u;
          if (i && i.total && i.total.amount) {
            U = i.total.amount.currency;
          }
          x = c(i);
          let r = h(i);
          if (r.length) {
            x.shippingMethods = [...r];
          }
          x = {
            ...x,
            ...M(x, T(i.modifiers, U, f))
          };
        }
        let S = {
          ...D,
          ...x
        };
        let L = {
          newTotal: S.total
        };
        if (S.lineItems) {
          L.newLineItems = S.lineItems;
        }
        if (S.recurringPaymentRequest) {
          L.newRecurringPaymentRequest = S.recurringPaymentRequest;
        }
        if (S.deferredPaymentRequest) {
          L.newDeferredPaymentRequest = S.deferredPaymentRequest;
        }
        if (S.automaticReloadPaymentRequest) {
          L.newAutomaticReloadPaymentRequest = S.automaticReloadPaymentRequest;
        }
        if (S.multiTokenContexts) {
          L.newMultiTokenContexts = S.multiTokenContexts;
        }
        if (S.disbursementRequest) {
          L.newDisbursementRequest = S.disbursementRequest;
        }
        if (S.shippingMethods) {
          L.newShippingMethods = S.shippingMethods;
        }
        return L;
      };
      let k = function (n, i, d, u, f, D, q, x, S, L) {
        return {
          get city() {
            return n || "";
          },
          get country() {
            return i || "";
          },
          get dependentLocality() {
            return d || "";
          },
          get organization() {
            return u || "";
          },
          get phone() {
            return f || "";
          },
          get postalCode() {
            return D || "";
          },
          get recipient() {
            return q || "";
          },
          get region() {
            return x || "";
          },
          get sortingCode() {
            return S || "";
          },
          get addressLine() {
            return L || [];
          }
        };
      };
      let N = (() => {
        let n = null;
        let i = null;
        let d = "shipping";
        return class extends EventTarget {
          constructor(f, D, q, x) {
            super();
            this.id = x;
            this.applepay = {
              methodData: f[0],
              details: D,
              options: q
            };
            this.abort = null;
            this.canMakePayment = () => new Promise((S, L) => {
              S(ApplePaySession.canMakePayments());
            });
            this.onshippingaddresschange = null;
            this.onshippingoptionchange = null;
            this.onpaymentmethodchange = null;
            this.show = () => new Promise((S, L) => {
              try {
                let U = c(this.applepay.details);
                let r = h(this.applepay.details);
                let s = "";
                if (this.applepay.details && this.applepay.details.total && this.applepay.details.total.amount) {
                  s = this.applepay.details.total.amount.currency;
                }
                if (r.length) {
                  U.shippingMethods = [...r];
                }
                U = {
                  ...U,
                  ...M(U, T(this.applepay.details.modifiers, s))
                };
                let E = {
                  currencyCode: s,
                  ...this.applepay.methodData.data,
                  ...U
                };
                if (this.applepay.options && Object.keys(this.applepay.options).length > 0) {
                  let m = [];
                  let b = [];
                  for (let P in this.applepay.options) {
                    if (P === "shippingType") {
                      E.shippingType = this.applepay.options[P];
                      d = E.shippingType;
                      continue;
                    }
                    if (this.applepay.options[P]) {
                      switch (P) {
                        case "requestPayerName":
                          b.push("name");
                          break;
                        case "requestBillingAddress":
                          m.push("postalAddress");
                          m.push("name");
                          break;
                        case "requestPayerEmail":
                          b.push("email");
                          break;
                        case "requestPayerPhone":
                          b.push("phone");
                          break;
                        case "requestShipping":
                          b.push("postalAddress");
                          break;
                      }
                    }
                  }
                  E.requiredBillingContactFields = E.requiredBillingContactFields ? [...E.requiredBillingContactFields, ...m] : [...m];
                  E.requiredShippingContactFields = E.requiredShippingContactFields ? [...E.requiredShippingContactFields, ...b] : [...b];
                }
                let w = new ApplePaySession(3, E);
                w.onvalidatemerchant = m => {
                  let b = async function (O) {
                    try {
                      w.completeMerchantValidation(await O);
                    } catch (z) {
                      console.error("onvalidatemerchant error:", z);
                    }
                  };
                  let P = new Event("merchantvalidation");
                  P.methodName = v.methodName;
                  P.validationURL = m.validationURL;
                  P.complete = b;
                  if (this.onmerchantvalidation) {
                    this.onmerchantvalidation(P);
                  } else {
                    this.dispatchEvent(P);
                  }
                };
                if (this.onpaymentmethodchange) {
                  w.onpaymentmethodselected = m => {
                    let b = new PaymentRequestUpdateEvent("paymentmethodchange");
                    b.methodName = v.methodName;
                    b.methodDetails = m.paymentMethod;
                    b.updateWith = P => {
                      w.completePaymentMethodSelection(R(this.applepay.details, P, m.paymentMethod));
                    };
                    this.onpaymentmethodchange(b);
                  };
                  w.oncouponcodechanged = m => {
                    let b = new PaymentRequestUpdateEvent("paymentmethodchange");
                    b.methodName = v.methodName;
                    b.methodDetails = m;
                    b.updateWith = P => {
                      w.completeCouponCodeChange(R(this.applepay.details, P, m.paymentMethod));
                    };
                    this.onpaymentmethodchange(b);
                  };
                }
                if (this.onshippingaddresschange) {
                  w.onshippingcontactselected = m => {
                    n = V(m.shippingContact);
                    let b = new PaymentRequestUpdateEvent("shippingaddresschange");
                    b.updateWith = P => {
                      w.completeShippingContactSelection(R(this.applepay.details, P, m.paymentMethod));
                    };
                    this.onshippingaddresschange(b);
                  };
                }
                if (this.onshippingoptionchange) {
                  w.onshippingmethodselected = m => {
                    i = m.shippingMethod.identifier;
                    let b = new PaymentRequestUpdateEvent("shippingoptionchange");
                    b.updateWith = P => {
                      let O = R(this.applepay.details, P, m.paymentMethod);
                      delete O.errors;
                      w.completeShippingMethodSelection(O);
                    };
                    this.onshippingoptionchange(b);
                  };
                }
                this.abort = w.abort;
                let B = {
                  isRetry: false,
                  promiseResolve: null
                };
                w.onpaymentauthorized = m => {
                  let b = this.id;
                  let P = this.shippingOption;
                  let O = {
                    get requestId() {
                      return b;
                    },
                    get methodName() {
                      return v.methodName;
                    },
                    get details() {
                      return m.payment;
                    },
                    get shippingOption() {
                      return P;
                    },
                    complete: function (z, F) {
                      let j = {};
                      if (F && F.data) {
                        j = {
                          ...F.data
                        };
                      }
                      switch (z) {
                        case v.COMPLETE_SUCCESS:
                          j.status = window.ApplePaySession.STATUS_SUCCESS;
                          break;
                        case v.COMPLETE_FAIL:
                        default:
                          j.status = window.ApplePaySession.STATUS_FAILURE;
                      }
                      return Promise.resolve(w.completePayment(j));
                    },
                    retry: function (z) {
                      let F = {
                        status: window.ApplePaySession.STATUS_FAILURE,
                        errors: z.paymentMethod || []
                      };
                      w.completePayment(F);
                      B.isRetry = true;
                      return new Promise(j => {
                        B.promiseResolve = j;
                      });
                    }
                  };
                  if (this.applepay.options.requestShipping) {
                    O = {
                      ...O,
                      get shippingAddress() {
                        return V(m.payment.shippingContact);
                      }
                    };
                  }
                  if (this.applepay.options.requestPayerName) {
                    O = {
                      ...O,
                      get payerName() {
                        return `${m.payment.shippingContact.givenName} ${m.payment.shippingContact.familyName}`;
                      }
                    };
                  }
                  if (this.applepay.options.requestPayerEmail) {
                    O = {
                      ...O,
                      get payerEmail() {
                        return m.payment.shippingContact.emailAddress;
                      }
                    };
                  }
                  if (this.applepay.options.requestPayerPhone) {
                    O = {
                      ...O,
                      get payerPhone() {
                        return m.payment.shippingContact.phoneNumber;
                      }
                    };
                  }
                  if (B.isRetry && B.promiseResolve) {
                    B.promiseResolve(O);
                  } else {
                    S(O);
                  }
                };
                w.oncancel = () => {
                  L(new Error("Cancelled"));
                };
                w.begin("payreqapi");
              } catch (U) {
                L(U);
              }
            });
          }
          get shippingAddress() {
            return n;
          }
          get shippingOption() {
            return i;
          }
          get shippingType() {
            return d;
          }
        };
      })();
      let H = PaymentRequest;
      PaymentRequest = function (n, i, d) {
        if (new.target) {
          if (n.length === 1 && (n[0].supportedMethods === v.methodName || n[0].supportedMethods.indexOf(v.methodName) !== -1)) {
            let u = new H(n, i, d);
            return new N(n, i, d, u.id);
          } else {
            return new H(n, i, d);
          }
        } else {
          return H(n, i, d);
        }
      };
    }
  })();
  (function () {
    let e = document.currentScript;
    let t = () => {
      let o = {
        "apple-pay-button": "apple-pay-button.js",
        "apple-wallet-button": "apple-wallet-sdk.js"
      };
      let a = Object.keys(o).join(",");
      let p = e.getAttribute("data-initial-token")?.trim();
      let g = e.src.slice(0, e.src.lastIndexOf("/")) || "";
      let A = g ? new URL(g).origin : "";
      let v = new URL(g);
      let I = `${A}${v.pathname}`;
      window.ApplePaySDK = {
        ...window.ApplePaySDK,
        token: p,
        publicPath: I,
        origin: A
      };
      function l(c) {
        c.filter(M => M.nodeType === Node.ELEMENT_NODE).forEach(M => {
          let R = M.tagName.toLocaleLowerCase();
          if (R in o) {
            import(`${window.ApplePaySDK.publicPath}/${o[R]}`);
          }
        });
      }
      let h = new MutationObserver((c, T) => {
        for (let M of c) {
          if (M.type === "childList") {
            for (let R of M.addedNodes) {
              if (R.nodeType === Node.ELEMENT_NODE) {
                let k = [...R.querySelectorAll(a)];
                if (R.tagName.toLocaleLowerCase() in o) {
                  k.push(R);
                }
                l(k);
              }
            }
          }
        }
      });
      l(Array.from(document.body.querySelectorAll(a)));
      h.observe(document.body, {
        childList: true,
        subtree: true
      });
    };
    if (document.readyState !== "loading") {
      t();
    } else {
      window.addEventListener("DOMContentLoaded", t);
    }
  })();
})();