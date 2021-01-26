const time = document.querySelector('#time');

setTime();
setInterval(function () {
	setTime();
}, 60 * 1000);

function setTime() {
	let timeStr = new Date();
	time.innerHTML = timeStr.toLocaleTimeString([], {
		hour: '2-digit',
		minute: '2-digit',
	});
}
