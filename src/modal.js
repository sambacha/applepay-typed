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
  applySystemThemeColor({matches: o}) {
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