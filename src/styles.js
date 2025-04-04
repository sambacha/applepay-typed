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