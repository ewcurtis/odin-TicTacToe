

const game = (() => {
    const pvpButton = document.querySelector(".pvp");
    const aiButton = document.querySelector(".ai");
    const message = document.querySelector(".message");
    const cells = document.querySelectorAll(".card");
    const gameBoard = document.querySelector(".gameboard");
    const gameMode = document.querySelector(".gamemode");

    let playerOne = true;
    let arr = ["","","","","","","","",""];
    let pvpMode = false;
    let p1 = "";
    let p2 = "";

    const checkGameOver = (arr) => {
        let gameOver = false;
        let tie = false;
        console.log("checkGameOver: " + arr);
        if ((arr[0] === arr[1] && arr[0] === arr[2] && arr[0] !== "") || (arr[3] === arr[4] && arr[3] === arr[5] && arr[3] !== "") ||
        (arr[6] === arr[7] && arr[6] === arr[8] && arr[6] !== "") || (arr[0] === arr[3] && arr[0] === arr[6] && arr[0] !== "") ||
        (arr[1] === arr[4] && arr[1] === arr[7] && arr[1] !== "") || (arr[2] === arr[5] && arr[2] === arr[8] && arr[2] !== "") ||
        (arr[0] === arr[4] && arr[0] === arr[8] && arr[0] !== "") || (arr[2] === arr[4] && arr[2] === arr[6] && arr[2] !== "")) {
            gameOver = true;
        } else {          
            for (let i = 0; i < arr.length; i++) {
                console.log(`i: ${i}`);
                if (arr[i] === "") break;
                if (i === 8) {
                    if (arr[i] !== "") {
                        gameOver = true;
                        tie = true;
                    }
                }
            }
        }
        return {gameOver, tie};
        //playerOne = !playerOne;
    };

    //Sets AI
    const pcTurn = (arr) => {
        let guess = Math.floor(Math.random() * 8);
        console.log(guess);
        if (cells[guess].textContent === "") {
            cells[guess].textContent = "O"; 
            arr[guess] = "O";
        } else {
            pcTurn(arr);
        }
       
    }

    //PVP game mode
    pvpButton.addEventListener("click", e => {

        const player1 = document.querySelector("#player1");
        const player2 = document.querySelector("#player2");
        if (player1.checkValidity() && player2.checkValidity() && player1.value !== player2.value) {
            p1 = playerFactory(player1.value);
            p2 = playerFactory(player2.value);
            pvpMode = true;

            gameBoard.style.cssText = "display: grid;";
            gameMode.style.cssText = "display: none";
        } else {
            player1.reportValidity();
            player2.reportValidity();
        }
    });

    aiButton.addEventListener("click", e => {
        gameBoard.style.cssText = "display: grid;";
        gameMode.style.cssText = "display: none";
        pvpMode = false;
    })

    cells.forEach(cell => {
        cell.addEventListener("click", e => {
            if (message.textContent === "" && cell.textContent === "") {
                if (!pvpMode) {
                    //vs AI
                    cell.textContent = "X";
                    console.log("got here!");
                    arr[parseInt(cell.getAttribute("id"))] = "X";
                    console.log("Got here too!");
                    console.log("cell: " + arr[parseInt(cell.getAttribute("id"))]);
                    let gameCheck = checkGameOver(arr);
                    console.log(gameCheck.gameOver);
    
                    if (!gameCheck.gameOver) {
                        playerOne = false;
                        pcTurn(arr);
                        gameCheck = checkGameOver(arr);
                        
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
                   
                }
                playerOne = true;
    
                } else {
                    //PVP
                    if (playerOne) {
                    cell.textContent = "X";
                    arr[parseInt(cell.getAttribute("id"))] = "X";
                    
                    } else {
                        cell.textContent = "O";
                    arr[parseInt(cell.getAttribute("id"))] = "O";

                    }
    
                    let gameCheck = checkGameOver(arr);
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
                        
                    }
                    playerOne = !playerOne;
                }  
            }
        })
    });

    const clearGameBoard = () => {
        cells.forEach(cell => {
            cell.textContent = "";
        });
        arr = ["","","","","","","","",""];
        message.textContent = "";
        playerOne = true;
    };


    //Reset Game with initial settings
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
    });

})();


//Players
const playerFactory = name => {
    return {name};
};
