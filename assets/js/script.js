const time = document.querySelector('#time');
const apps = document.querySelectorAll('.app');
const welcome = document.querySelector('#welcome');

setTime();
positionApps();
dragElement(welcome);

setInterval(function () {
	setTime();
}, 60 * 1000);

apps.forEach(function (app) {
	app.addEventListener('click', openApp);
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
	if (document.getElementById(elmnt.id + '-header')) {
		document.getElementById(elmnt.id + '-header').onmousedown = dragMouseDown;
	} else {
		elmnt.onmousedown = dragMouseDown;
	}

	function dragMouseDown(e) {
		e = e || window.event;
		e.preventDefault();
		pos3 = e.clientX;
		pos4 = e.clientY;
		document.onmouseup = closeDragElement;
		document.onmousemove = elementDrag;
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

	function closeDragElement() {
		document.onmouseup = null;
		document.onmousemove = null;
	}
}

function openApp(e) {
	let target = e.target.localName != 'div' ? e.target.parentElement : e.target;
	target.style.position = 'absolute';
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
