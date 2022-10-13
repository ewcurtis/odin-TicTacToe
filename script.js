const message = document.querySelector(".message");
const cells = document.querySelectorAll(".card");


const game = (() => {
    const gameBoard = document.querySelector(".gameMode");
    const gameMode = document.querySelector(".gameMode");
    const player1 = document.querySelector("#player1");
    const player2 = document.querySelector("#player2");
    const pvpButton = document.querySelector(".pvp");
    const aiButton = document.querySelector("ai");

    let arr = ["","","","","","","","",""];
    const checkGameOver = () => {
        let gameOver = false;
        let tie = false;
        if ((arr[0] === arr[1] && arr[0] === arr[2] && arr[0] !== "") || (arr[3] === arr[4] && arr[3] === arr[5] && arr[3] !== "") ||
        (arr[6] === arr[7] && arr[6] === arr[8] && arr[6] !== "") || (arr[0] === arr[3] && arr[0] === arr[6] && arr[0] !== "") ||
        (arr[1] === arr[4] && arr[1] === arr[7] && arr[1] !== "") || (arr[2] === arr[5] && arr[2] === arr[8] && arr[2] !== "") ||
        (arr[0] === arr[4] && arr[0] === arr[8] && arr[0] !== "") || (arr[2] === arr[4] && arr[2] === arr[6] && arr[2] !== "")) {
            gameOver = true;
        } else {
            for (let i = 0; i < arr.length; i++) {
                if (arr[i] === "") break;
                if (i === 8) {
                    if (arr[i] !== "") {
                        gameOver = true;
                        tie = true;
                    }
                }
            }
        }
        return {arr, gameover, tie};
        //playerOne = !playerOne;
    };

    const pcTurn = () => {
        let guess = Math.floor(Math.random() * 8);
        console.log(guess);
        if (cells[guess].textContent === "") {
            cells[guess].textContent = "O"; 
            arr[guess] = "O";
        } else {
            pcTurn();
        }
       
    }

    const clearGameBoard = () => {
        cells.forEach(cell => {
            cell.textContent = "";
        })
        game.arr = ["","","","","","","","",""];
        message.textContent = "";
    }

    const reset = document.querySelector(".reset");
    reset.addEventListener("click", e => {
        clearGameBoard();
    });
    //New Game - Takes player back to initial screen
    const ng = document.querySelector(".new-game");
    ng.addEventListener("click", e => {
        clearGameBoard();
        gameBoard.style.cssText = "display: none;";
        gameMode.style.cssText = "display: grid";
    })

    return {arr, checkGameOver, pcTurn};
})();


//Players
const playerFactory = name => {
    return {name};
};

//Games
const newGameFactory = gamemode => {

    let playerOne = true;
    let p1;
    let p2;

    if (gameMode === "pvp") {
        p1 = playerFactory(document.querySelector("#player1").value);
        p2 = playerFactory(document.querySelector("#player2").value);

    }

    cells.forEach(cell => {
        cell.addEventListener("click", e => {
            if (message.textContent === "" && cell.textContent === "") {
                if (gameMode !== "pvp") {
                    //vs AI
                    cell.textContent = "X";
                    game.arr[parseInt(cell.getAttribute("id"))] = "X";
                    let gameCheck = game.checkGameOver();
    
                    if (!gameCheck.gameOver) {
                        playerOne = false;
                        game.pcTurn();
                        gameCheck = game.checkGameOver();
                        playerOne = true;
                    }
    
                    if (gameCheck.gameOver) {
                        if (gameCheck.tie) {
                            message.textContent = "It's a tie!"
                    } else {
                        if (playerOne) {
                            message.textContent = "You win!";
                        } else {
                            message.textContent = "You lose!";
                        }
                    }
                    playerOne = true;
                }
    
                } else {
                    //PVP
                    if (playerOne) {
                    cell.textContent = "X";
                    game.arr[parseInt(cell.getAttribute("id"))] = "X";
                    
                    } else {
                        cell.textContent = "O";
                    game.arr[parseInt(cell.getAttribute("id"))] = "O";

                    }

                    playerOne = !playerOne;
    
                    let gameCheck = checkGameOver();
                    if (gameCheck.gameOver) {
                        if (gameCheck.tie) {
                            message.textContent = "It's a tie!"
                        } else {
                        if (playerOne) {
                            message.textContent = `${p1.name} wins!`;
                        } else {
                            message.textContent = `${p2.name} wins!`;
                        }
                    }
                        playerOne = true;
                    }
                }  
            }
        })
    });
};