function GameBoard(id, level) {
    this.id = id;
    this.level = level
    this.drawGameBoard = (x) => {
        let gameBoard = "";
        gameBoard += `<div class="row" id="${this.id}">`
        this.level.map(value => {
            if (value === '0') {
                gameBoard += `<div class="obstacles"></div>`
            } else if (value === '1') {
                gameBoard += `<div class="birds" id="bird" style="background-size: 200px"></div>`
            } else if (value === '2') {
                gameBoard += `<div class="pigs"></div>`
            } else {
                gameBoard += `<div class="space"></div>`
            }
        })
        gameBoard += `</div>`
        document.getElementById(GAME_PLAY_ID).innerHTML = gameBoard;
        drawBird(x,50);
    }
}


// lọc mảng arrRun thành mảng mới không có ký tự thừa
function filterArrRun(arrRun) {
    let newArrRun = [];
    for (let i = 0; i < arrRun.length; i++) {
        if (arrRun[i] !== "t") {
            newArrRun.push(arrRun[i]);
        }
    }
    return newArrRun;
}

// tìm vị trí của chim
function findIndexBird(arrMap) {
    for (let i = 0; i < arrMap.length; i++) {
        if (arrMap[i] === '1') {
            return i;
        }
    }
}

drawBird = (width, height) => {
    document.getElementById('bird').style.background = `url(./img/idle_avatar.gif) ${width}px ${height}px`;
    document.getElementById('bird').style.backgroundSize = '200px';
    document.getElementById('bird').style.width = '50px';
    document.getElementById('bird').style.height = '50px';

}

// Hàm thay đổi mảng Map.
function checkOnMove(index, i, gameBoard, arrMap) {
    if (arrMap[parseInt(i + index)] === "-") {
        arrMap[parseInt(i + index)] = "1";
        arrMap[i] = "-";
        gameBoard.drawGameBoard(x);
    } else {
        if (arrMap[i + index] === "2") {
            arrMap[i + index] = "1";
            arrMap[i] = "-";
            gameBoard.drawGameBoard(x);
            win1 = true;
            win2 = true;
        } else {
            // alert("bạn đã sai")
            win1 = false;
            win2 = false;
        }
    }
}

// Hàm thực hiện thay đổi theo mảng RUN
function makeChange(indexArrRun, i, gameBoard, arrMap) {
    if (arrRun[indexArrRun] === FORWARD) {
        audio_jump.play();
        checkOnMove(index, i, gameBoard, arrMap);
    } else {
        if (arrRun[indexArrRun] === LEFT) {
            x += 50;
            drawBird(x, 50)
            if (index === 8) {
                index = 1;
            } else if (index === 1) {
                index = -8;
            } else if (index === -8) {
                index = -1;
            } else {
                index = 8;
            }
        } else {
            if (arrRun[indexArrRun] === RIGHT) {
                x -= 50;
                drawBird(x, 50)
                if (index === 8) {
                    index = -1;
                } else if (index === -1) {
                    index = -8;
                } else if (index === -8) {
                    index = 1;
                } else {
                    index = 8;
                }
            }
        }
    }
}

//Hàm gọi thực hiện hàm makeChange.
function callFunction(arrMap) {
    let str = parseInt(findIndexBird(arrMap));
    makeChange(countRepeats, str, gameBoard, arrMap);
    countRepeats++;

}

// Hàm gọi để check win, level
function callFunction2(arrMap) {
    console.log("arrMap");
    console.log(arrMap);
    // thực hiện lọc mảng arrRun.
    arrRun = filterArrRun(arrRun);

    if (win1) {
        if (countRepeats < arrRun.length) {
            callFunction(arrMap);
        } else {
            if (win2) {
                level++;
                audio_win.play();
                if (level <= GAME_LEVEL) {
                    gameBoard.level = eval("START_GAME" + (level + 1));
                    resetVariables();
                    clearWhenRun();
                    x=100;
                    gameBoard.drawGameBoard(x);
                    clearInterval(intervalId);
                } else {
                    clearInterval(intervalId);
                    alert("Bạn đã chiến thắng trò chơi.")
                }

            } else {
                audio_lose.play();
                alert("Đường thiếu rồi")
                resetGame();
                clearInterval(intervalId);
            }
        }
    } else {
        clearInterval(intervalId);
    }
}

//Hàm chạy khi nhấn When Run.
function runGame() {
    // tạo mảng mới để thay thế mảng Map ban đầu.
    let copyStartGame = gameBoard.level.slice();

    gameBoard.level = copyStartGame;

    intervalId = setInterval(function () {
        callFunction2(copyStartGame);
    }, 450);
}
//
function resetGame() {
    clearWhenRun();
    resetVariables();
    // eval() biến chuỗi thành biến
    gameBoard.level = eval("START_GAME" + (level + 1));
    x = 100;
    gameBoard.drawGameBoard(x);

}

// Hàm làm trắng WHen Run
function clearWhenRun() {
    document.getElementById("work-space").innerHTML = '<div id="play">\n' +
        '                <div class="play-block" id="begin-block">\n' +
        '                    <p class="block-content">when run</p>\n' +
        '                </div>\n' +
        '            </div>';

}

//Hàm reset biến.
function resetVariables() {
    countRepeats = 0;
    index = 8;
    win1 = true;
    win2 = false;
    arrRun = [];
    count = 0;
}
