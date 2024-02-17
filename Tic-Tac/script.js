const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;
initGame();

const winningPosition = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

// function to initialize the game
function initGame(){
    currentPlayer = "X";
    gameGrid = ["","","","","","","","",""];
    //empty the boxes
    boxes.forEach((box,index) =>{
        // boxes[index].innerText ="";
        box.innerText = "";
        boxes[index].style.pointerEvents  = "all";
        // remove green color
        boxes[index].classList.remove("win");

    })
    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}


boxes.forEach((box,index) =>{
    box.addEventListener("click", () =>{
        handleClick(index);
    })
})

function swapTurn(){
    if(currentPlayer === "X"){
        currentPlayer = "O";
    }
    else{
        currentPlayer = "X"
    }
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}


function checkGameOver(){
    let answer = "";

    winningPosition.forEach((position)=>{
        // all values shuld be empty and equal
        if((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "" ) 
            && (gameGrid[position[0]] === gameGrid[position[1]]) &&(gameGrid[position[1]] === gameGrid[position[2]])){
                // check who is winner
                if(gameGrid[position[0]]==="X")
                    answer = "X";
                else
                    answer = "O"

                // disable pointer event because it gave two einers together
                boxes.forEach((box) => {
                  box.style.pointerEvents = "none"; 
                })
                // green colour to winner
                boxes[position[0]].classList.add("win");
                boxes[position[1]].classList.add("win");
                boxes[position[2]].classList.add("win");

        }
    })
    if(answer !==""){
        gameInfo.innerText = `Winner Player - ${answer}`;
        newGameBtn.classList.add("active");
        return;
    }

    // when there is no winner, game tie

    let fillCount = 0;
    gameGrid.forEach((box) =>{
        if(box!=="")
            fillCount++;
    });

    // board is full and tie occured
    if(fillCount === 9){
        gameInfo.innerText = `Game Tied!`;
        newGameBtn.classList.add("active");
    }
}


function handleClick(index){
    if(gameGrid[index] === ""){
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents  = "none";
        // swap the turns
        swapTurn();
        //check if someone won?
        checkGameOver();


    }
}

newGameBtn.addEventListener("click", ()=>{
    initGame();
})









