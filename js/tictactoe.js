const displayPlayers = (playersList) => {
  const gameboard = document.querySelector('.gameboard');
  playersList.forEach((player) => {
    gameboard.insertAdjacentHTML("beforebegin", `${player.name} - ${player.symbol} //`)
  })
}

const PlayerFactory = (sym) => {
  event.preventDefault();
  const name = event.target.firstElementChild.value;
  const symbol = sym
  return { name, symbol }
}

const createPlayers = () => {
  return new Promise((resolve, reject) => {
    let playersList = [];
    let syms = ["X", "O"]
    const playerFormPrompt = document.querySelector("#playerFormPrompt");
    const form = `<form id='playerForm'><input type='text' name='playerName'><input type='submit'></form>`
    const formDiv = document.querySelector('.form');
    formDiv.insertAdjacentHTML("beforeend", form);
    document.addEventListener('submit', (event) => {
      event.preventDefault();
      const player = PlayerFactory(syms[0]);
      syms.shift()
      playersList.push(player)
      formDiv.querySelector('#playerForm').firstElementChild.value = "";
      playerFormPrompt.innerText = "2"
      if (playersList.length == 2) {
        formDiv.innerHTML = "";
        resolve(playersList);
      }
    });
  })
}



const renderGameBoard = (boxes) => {
  const gameboard = document.querySelector('.gameboard');
  console.log(boxes)
  gameboard.innerHTML = ""
  let counter = 0;
  boxes.forEach((box) => {
    gameboard.insertAdjacentHTML("beforeend", `<div id="box" data-counter='${counter}'>${box}</div>`)
    counter ++
  })
}

const startTurns = (boxes, turns) => {
  renderGameBoard(boxes);
  const boxElements = document.querySelectorAll('#box');
  boxElements.forEach((box) => {
  console.log(box)
    box.addEventListener('click', (event) => {
      let boxNumber = event.target.dataset.counter;
      if (turns % 2 == 0) {
        boxes[boxNumber] = "[X]"
      } else {
        boxes[boxNumber] = "[O]"
      }
      turns ++;
      startTurns(boxes, turns);
    })
  })
}


// const initGame = () => {
//   createPlayers().then((playersList) => {
//     GameBoard();
//     displayPlayers(playersList);
//   })
// }

const initGame = async () => {
  const players = await createPlayers()
  displayPlayers(players);
  let boxes = [ "[ ]", "[ ]", "[ ]", "[ ]", "[ ]", "[ ]", "[ ]", "[ ]", "[ ]"];
  let turns = 0;
  startTurns(boxes, turns);
}

initGame();

// Prompt form for user name, one by one. First one get X, second get O
