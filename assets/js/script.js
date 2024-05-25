import {
  appElements,
  windowElements,
  renderApp,
  renderWindow,
} from "./elements";

const desktop = document.getElementById("screen");
appElements.forEach((app) => desktop.appendChild(renderApp(app)));
windowElements.forEach((window) => desktop.appendChild(renderWindow(window)));

const MIN_WINDOW_WIDTH = 400;
const MIN_WINDOW_HEIGHT = 170;

const time = document.querySelector("#time");
const apps = document.querySelectorAll(".app");
const appsWindow = document.querySelectorAll(".window");

let startPos;
let endPos;
let windowIndexes = {};

setTime();
positionApps();

setInterval(function () {
  setTime();
}, 60 * 1000);

apps.forEach(function (app) {
  app.addEventListener("click", openApp);
});

appsWindow.forEach(function (appWindow, i) {
  dragElement(appWindow);
  resizeElement(appWindow);

  appWindow.style.zIndex = i + 2;
  windowIndexes[i + 2] = appWindow.id;

  appWindow.querySelector(".fullscreen").addEventListener("click", fullscreen);
  appWindow.querySelector(".close").addEventListener("click", closeWindow);
  appWindow.addEventListener("mousedown", (e) => setWindowZIndex(e, appWindow));
});

function setTime() {
  let timeStr = new Date();
  time.innerHTML = timeStr.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function setWindowZIndex(e, appWindow) {
  let windowCount = appsWindow.length;

  for (let i = appWindow.style.zIndex; i < windowCount + 1; i++) {
    windowIndexes[i] = windowIndexes[parseInt(i) + 1];
    document.querySelector(`#${windowIndexes[i]}`).style.zIndex = i;
  }

  appWindow.style.zIndex = windowCount + 1;
  windowIndexes[windowCount + 1] = appWindow.id;
}

function dragElement(elmnt) {
  let pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  let windowHeader = elmnt.querySelector(".header");

  if (windowHeader) {
    windowHeader.onmousedown = dragMouseDown;
    windowHeader.ontouchstart = dragTouch;
  } else {
    elmnt.onmousedown = dragMouseDown;
    elmnt.ontouchstart = dragTouch;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();

    pos3 = e.clientX;
    pos4 = e.clientY;

    startPos = e.clientX || window.event.clientX;

    document.onmousemove = mouseElementDrag;
    document.onmouseup = mouseCloseDragElement;
  }

  function dragTouch(e) {
    pos3 = e.touches[0].clientX;
    pos4 = e.touches[0].clientY;

    startPos = e.clientX || window.event.clientX;

    document.ontouchmove = touchElementDrag;
    document.ontouchend = touchCloseDragElement;
  }

  function mouseElementDrag(e) {
    if (elmnt.classList.contains("fullscreen")) return;

    e = e || window.event;
    e.preventDefault();
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    elmnt.style.top = elmnt.offsetTop - pos2 + "px";
    elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
  }

  function touchElementDrag(e) {
    if (elmnt.classList.contains("fullscreen")) return;

    pos1 = pos3 - e.touches[0].clientX;
    pos2 = pos4 - e.touches[0].clientY;
    pos3 = e.touches[0].clientX;
    pos4 = e.touches[0].clientY;
    elmnt.style.top = elmnt.offsetTop - pos2 + "px";
    elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
  }

  function mouseCloseDragElement(e) {
    endPos = e.clientX || window.event.clientX;

    document.onmouseup = null;
    document.onmousemove = null;
  }

  function touchCloseDragElement(e) {
    endPos = e.clientX || window.event.clientX;

    document.ontouchend = null;
    document.ontouchmove = null;
  }
}

function resizeElement(elmnt) {
  let pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;

  let resizer = elmnt.querySelector(".resizer");

  if (resizer) {
    resizer.onmousedown = dragMouseDown;
    resizer.ontouchstart = dragTouch;
  } else {
    return;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();

    pos3 = e.clientX;
    pos4 = e.clientY;

    startPos = e.clientX || window.event.clientX;

    document.onmousemove = mouseElementDrag;
    document.onmouseup = mouseCloseDragElement;
  }

  function dragTouch(e) {
    pos3 = e.touches[0].clientX;
    pos4 = e.touches[0].clientY;

    startPos = e.clientX || window.event.clientX;

    document.ontouchmove = touchElementDrag;
    document.ontouchend = touchCloseDragElement;
  }

  function mouseElementDrag(e) {
    if (elmnt.classList.contains("fullscreen")) return;

    e = e || window.event;
    e.preventDefault();

    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;

    if (
      elmnt.offsetHeight - pos2 < MIN_WINDOW_HEIGHT ||
      elmnt.offsetWidth - pos1 < MIN_WINDOW_WIDTH
    ) {
      return;
    }

    elmnt.style.height = elmnt.offsetHeight - pos2 + "px";
    elmnt.style.width = elmnt.offsetWidth - pos1 + "px";
  }

  function touchElementDrag(e) {
    if (elmnt.classList.contains("fullscreen")) return;

    pos1 = pos3 - e.touches[0].clientX;
    pos2 = pos4 - e.touches[0].clientY;
    pos3 = e.touches[0].clientX;
    pos4 = e.touches[0].clientY;

    if (
      elmnt.offsetHeight - pos2 < MIN_WINDOW_HEIGHT ||
      elmnt.offsetWidth - pos1 < MIN_WINDOW_WIDTH
    ) {
      return;
    }

    elmnt.style.height = elmnt.offsetHeight - pos2 + "px";
    elmnt.style.width = elmnt.offsetWidth - pos1 + "px";
  }

  function mouseCloseDragElement(e) {
    endPos = e.clientX || window.event.clientX;

    document.onmouseup = null;
    document.onmousemove = null;
  }

  function touchCloseDragElement(e) {
    endPos = e.clientX || window.event.clientX;

    document.ontouchend = null;
    document.ontouchmove = null;
  }
}

function openApp(e) {
  if (startPos != endPos) return;

  let app = e.target.localName != "div" ? e.target.parentElement : e.target;
  let target = app.getAttribute("data-target");
  document.getElementById(target).classList.add("active");
}

function positionApps() {
  let top = 24;
  console.log(apps[0]);
  apps.forEach(function (app) {
    app.style.top = `${top}px`;
    top += 105;
    dragElement(app);
  });
}

function closeWindow(e) {
  e.target.closest(".window").classList.remove("active");
}

function fullscreen(e) {
  e.target.closest(".window").classList.toggle("fullscreen");
}
