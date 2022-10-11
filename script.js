
const game = (() => {
    let arr = ["","","","","","","","",""];
    let gameOver = false;
    let playerOne = true;
    const message = document.querySelector(".message");

    const cells = document.querySelectorAll(".card");
    cells.forEach(cell => {
    cell.addEventListener("click", e => {
        if (!gameOver && cell.textContent === "") {
            cell.textContent = "X";
            arr[parseInt(cell.getAttribute("id"))] = "X";
            checkGameOver();

            if (!gameOver) {
                pcTurn();
                checkGameOver();
            }
            

        }
        
    })
    
});

    let checkGameOver = () => {
        if ((arr[0] === arr[1] && arr[0] === arr[2] && arr[0] !== "") || (arr[3] === arr[4] && arr[3] === arr[5] && arr[3] !== "") ||
        (arr[6] === arr[7] && arr[6] === arr[8] && arr[6] !== "") || (arr[0] === arr[3] && arr[0] === arr[6] && arr[0] !== "") ||
        (arr[1] === arr[4] && arr[1] === arr[7] && arr[1] !== "") || (arr[2] === arr[5] && arr[2] === arr[8] && arr[2] !== "") ||
        (arr[0] === arr[4] && arr[0] === arr[8] && arr[0] !== "") || (arr[2] === arr[4] && arr[2] === arr[6] && arr[2] !== "")) {
            gameOver = true;
            if (playerOne) {
                message.textContent = "You Win!";
            } else {
                message.textContent = "You Lose";
            }
        } else {
            for (let i = 0; i < arr.length; i++) {
                if (arr[i] === "") break;
                if (i === 8) {
                    if (arr[i] !== "") {
                        gameOver = true;
                        message.textContent = "It's a draw!";
                    }
                }
            }

        }
        console.log(`Gameover: ${gameOver} PlayerOne: ${playerOne}`);
        playerOne = !playerOne;
    }

    let pcTurn = () => {
        let guess = Math.floor(Math.random() * 8);
        console.log(guess);
        if (cells[guess].textContent === "") {
            cells[guess].textContent = "O"; 
            arr[guess] = "O";
        } else {
            pcTurn();
        }
       
    }


    const reset = document.querySelector(".reset");
    reset.addEventListener("click", e => {
        cells.forEach(cell => {
            cell.textContent = "";
        })
        arr = ["","","","","","","","",""];
        playerOne = true;
        gameOver = false;
        message.textContent = "";
    })

    return {arr};
})();

const playerFactory = (name, mark) => {
    return {name, mark};
}