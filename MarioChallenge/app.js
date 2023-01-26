const gameConfig = {
    score: 0,
    maxTime: 30,
    time: 30,
    isPlaying: false
}

const statsText = document.createElement("h1");
const scoreText = document.createElement("span");
const timeText = document.createElement("span");
scoreText.innerHTML = `Score: ${gameConfig.score}`;
timeText.innerHTML = `Time: ${gameConfig.time}`;
statsText.appendChild(scoreText);
statsText.appendChild(timeText);
statsText.style.display = "flex";
statsText.style.justifyContent = "space-between";
document.body.appendChild(statsText);

const result = document.createElement("div");
result.innerHTML = `
<h1>Score: ${gameConfig.score}</h1>
<h2>press enter to play again</h2>
`
result.style.textAlign = "center";
result.style.margin = "0";
result.style.position = "absolute";
result.style.backgroundColor = "white";
result.style.height = "100vh";
result.style.width = "100vw";
result.style.top = "0";
result.style.left = "0";
result.style.zIndex = "1";
result.style.display = "none";
result.style.flexDirection = "column";
result.style.justifyContent = "center";

document.body.appendChild(result);

function isTouching(a, b) {
	const aRect = a.getBoundingClientRect();
	const bRect = b.getBoundingClientRect();

	return !(
		aRect.top + aRect.height < bRect.top ||
		aRect.top > bRect.top + bRect.height ||
		aRect.left + aRect.width < bRect.left ||
		aRect.left > bRect.left + bRect.width
	);
}

function controlTween(e){

    if(gameConfig.isPlaying) {
        if(e.key === 'ArrowDown' || e.key === 'Down'){
            moveVertical(avatar, 50);
        }

        if(e.key === 'ArrowUp' || e.key === 'Up'){
            moveVertical(avatar, -50);
        }

        if(e.key === 'ArrowLeft' || e.key === 'Left'){
            avatar.style.transform = "scaleX(-1)";
            moveHorizontal(avatar, -50);
        }

        if(e.key === 'ArrowRight' || e.key === 'Right'){
            avatar.style.transform = "scaleX(1)";
            moveHorizontal(avatar, 50);
        }

        if(isTouching(avatar,coin)) {
            moveCoin();
            scoreText.innerHTML = `Score: ${++gameConfig.score}`;
        } 
    } else {
        if(e.key === "Enter") {
            gameConfig.isPlaying = true;
            gameConfig.score = 0;
            gameConfig.time = gameConfig.maxTime;
            scoreText.innerHTML = `Score: ${gameConfig.score}`;
            timeText.innerHTML = `Time: ${gameConfig.time}`;
            result.style.display = "none";
        }
    }
}

function restart(e){

}

const init = () => {
    //get the avatar
    // const avatar = document.querySelector(".avatar")
    //get the coin

    gameConfig.isPlaying = true;

    moveCoin();
    window.addEventListener('keyup', controlTween);

    const timeCount = setInterval(() => {
        if(gameConfig.isPlaying) {
            timeText.innerHTML = `Time: ${gameConfig.time--}`;

            if(gameConfig.time < 0) {
                gameConfig.isPlaying = false;
    
                result.innerHTML = `
                <h1>Score: ${gameConfig.score}</h1>
                <h2>press enter to play again</h2>
                `
                result.style.display = "flex";
            }
        }
    }, 1000);
}


const moveVertical = (element, amount) => {
    const currTop = extractPos(element.style.top);
    if(currTop + amount > -50 && currTop + amount < innerHeight - 100){
        element.style.top = `${currTop + amount}px`;
    }
}

const moveHorizontal = (element, amount) => {
    const currLeft = extractPos(element.style.left);
    if(currLeft + amount > -50 && currLeft + amount < innerWidth - 100){
        element.style.left = `${currLeft + amount}px`;
    }
}

const extractPos = (position) => {
    if(!position) return 100;
    return parseInt(position.slice(0, -2))
}

const moveCoin = () => {
    const x = Math.floor(Math.random() * (innerWidth - 100))
    const y = Math.floor(Math.random() * (innerHeight - 100))
    coin.style.top = `${y}px`;
    coin.style.left = `${x}px`;
}

init();

