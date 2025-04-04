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