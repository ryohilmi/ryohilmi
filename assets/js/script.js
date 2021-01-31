const time = document.querySelector('#time');
const apps = document.querySelectorAll('.app');
const appsWindow = document.querySelectorAll('.window');

let startPos;
let endPos;

setTime();
positionApps();

setInterval(function () {
	setTime();
}, 60 * 1000);

apps.forEach(function (app) {
	app.addEventListener('click', openApp);
});

appsWindow.forEach(function (appWindow) {
	dragElement(appWindow);

	appWindow.querySelector('button').addEventListener('click', closeWindow);
});

function setTime() {
	let timeStr = new Date();
	time.innerHTML = timeStr.toLocaleTimeString([], {
		hour: '2-digit',
		minute: '2-digit',
	});
}

function dragElement(elmnt) {
	var pos1 = 0,
		pos2 = 0,
		pos3 = 0,
		pos4 = 0;
	if (elmnt.querySelector('.header')) {
		elmnt.querySelector('.header').onmousedown = dragMouseDown;
	} else {
		elmnt.onmousedown = dragMouseDown;
	}

	function dragMouseDown(e) {
		e = e || window.event;
		e.preventDefault();
		pos3 = e.clientX;
		pos4 = e.clientY;

		startPos = e.clientX || window.event.clientX;

		document.onmousemove = elementDrag;
		document.onmouseup = closeDragElement;
	}

	function elementDrag(e) {
		e = e || window.event;
		e.preventDefault();
		pos1 = pos3 - e.clientX;
		pos2 = pos4 - e.clientY;
		pos3 = e.clientX;
		pos4 = e.clientY;
		elmnt.style.top = elmnt.offsetTop - pos2 + 'px';
		elmnt.style.left = elmnt.offsetLeft - pos1 + 'px';
	}

	function closeDragElement(e) {
		endPos = e.clientX || window.event.clientX;

		document.onmouseup = null;
		document.onmousemove = null;
	}
}

function openApp(e) {
	if (startPos != endPos) return;

	let app = e.target.localName != 'div' ? e.target.parentElement : e.target;
	let target = app.getAttribute('data-target');
	document.getElementById(target).classList.add('active');
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
	e.target.closest('.window').classList.remove('active');
}
