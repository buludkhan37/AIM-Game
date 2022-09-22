const startBtn = document.querySelector("#start");
const screens = document.querySelectorAll(".screen");
const timeList = document.querySelector("#time-list");
const timeEl = document.querySelector("#time");
const board = document.querySelector("#board");
const resetGame = document.querySelector("#new-game-btn");
let time = 0;
let score = 0;

startBtn.addEventListener("click", (event) => {
	event.preventDefault();
	screens[0].classList.add("up");
});

timeList.addEventListener("click", (event) => {
	// есть ли у этого элем. определенный класс
	if (event.target.classList.contains("time-btn")) {
		time = parseInt(event.target.getAttribute("data-time"));
		screens[1].classList.add("up");
		startGame();
	}
});

board.addEventListener("click", (event) => {
	if (event.target.classList.contains("circle")) {
		score++;
		// Убрать кружок
		event.target.remove();
		// Чтобы появился новый кружок
		createRandomCircle();
	}
});

function startGame() {
	setInterval(decreaseTIme, 1000);
	createRandomCircle();
	setTime(time);
}

function decreaseTIme() {
	if (time === 0) {
		finishGame();
	} else {
		let current = --time;
		if (current < 10) {
			current = `0${current}`;
		}
		setTime(current);
	}
}

function setTime(value) {
	timeEl.innerHTML = `00:${value}`;
}

function finishGame() {
	// Чтобы удалить родителя, то есть весь h3 (осталось время)
	timeEl.parentNode.classList.add("hide");
	board.innerHTML = `<h1>Ваш счет: <span class="primary">${score}</span></h1>`;
	resetGame.style.visibility = "visible";
}

resetGame.addEventListener("click", (event) => {
	// есть ли у этого элем. определенный класс
	if (event.target.classList.contains("new-game-btn")) {
		time = parseInt(event.target.getAttribute("data-time"));
		screens[1].classList.add("down");
		console.log(startGame());
	}
});

function createRandomCircle() {
	const circle = document.createElement("div");
	const size = getRandomNumber(10, 60);
	// Чтобы кружок всегда находился на доске
	const { width, height } = board.getBoundingClientRect();
	const x = getRandomNumber(0, width - size);
	const y = getRandomNumber(0, height - size);

	circle.classList.add("circle");
	circle.style.width = `${size}px`;
	circle.style.height = `${size}px`;
	circle.style.top = `${y}px`;
	circle.style.left = `${x}px`;

	board.append(circle);
}

function getRandomNumber(min, max) {
	return Math.round(Math.random() * (max - min) + min);
}
