export const appElements = [
  {
    name: "About Me",
    image: "/desktop-web/images/about.png",
    target: "about-window",
  },
  {
    name: "Skills",
    image: "/desktop-web/images/skills.png",
    target: "skills-window",
  },
  {
    name: "Education",
    image: "/desktop-web/images/education.png",
    target: "education-window",
  },
  {
    name: "Portfolio",
    image: "/desktop-web/images/portfolio.png",
    target: "portfolio-window",
  },
  {
    name: "Contact",
    image: "/desktop-web/images/contacts.png",
    target: "contact-window",
  },
];

export const windowElements = [
  {
    id: "welcome",
    title: "Welcome :)",
    content: "/desktop-web/markdown/welcome.md",
    active: true,
  },
  {
    id: "about-window",
    title: "About Me",
  },
  {
    id: "skills-window",
    title: "Skills",
  },
  {
    id: "education-window",
    title: "Education",
  },
  {
    id: "portfolio-window",
    title: "Portfolio",
  },
  {
    id: "contact-window",
    title: "Contact",
  },
];

export function renderApp(app) {
  const appElement = document.createElement("div");
  appElement.classList.add("app");
  appElement.setAttribute("data-target", app.target);
  appElement.innerHTML = `
    <img src="${app.image}" alt="${app.name}" />
    <p>${app.name}</p>
  `;
  return appElement;
}

export function renderWindow(window) {
  const windowElement = document.createElement("div");
  windowElement.id = window.id;
  windowElement.classList.add("window");
  if (window.active) windowElement.classList.add("active");

  const windowContent = window?.content
    ? `
        <md-block src="${window.content}"> </md-block>
    `
    : "";

  windowElement.innerHTML = `
    <div class="header">
        <span>${window.title}</span>
        <button class="fullscreen">O</button>
        <button class="close">X</button>
    </div>
    <div class="content">
        ${windowContent}
    </div>
    <div class="resizer"></div>
  `;
  return windowElement;
}
