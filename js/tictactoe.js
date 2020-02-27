const checkIfWinner = (boxes) => {
  if (boxes[0] == "X" && boxes[1] == "X" && boxes[2] === "X" ||
    boxes[3] == "X" && boxes[4] == "X" && boxes[5] === "X" ||
    boxes[6] == "X" && boxes[7] == "X" && boxes[8] === "X" ||
    boxes[0] == "X" && boxes[3] == "X" && boxes[6] === "X" ||
    boxes[1] == "X" && boxes[4] == "X" && boxes[7] === "X" ||
    boxes[2] == "X" && boxes[5] == "X" && boxes[8] === "X" ||
    boxes[0] == "X" && boxes[4] == "X" && boxes[8] === "X" ||
    boxes[2] == "X" && boxes[4] == "X" && boxes[6] === "X"
    ) {
    return "Player One won!"
  } else if (boxes[0] == "O" && boxes[1] == "O" && boxes[2] === "O" ||
    boxes[3] == "O" && boxes[4] == "O" && boxes[5] === "O" ||
    boxes[6] == "O" && boxes[7] == "O" && boxes[8] === "O" ||
    boxes[0] == "O" && boxes[3] == "O" && boxes[6] === "O" ||
    boxes[1] == "O" && boxes[4] == "O" && boxes[7] === "O" ||
    boxes[2] == "O" && boxes[5] == "O" && boxes[8] === "O" ||
    boxes[0] == "O" && boxes[4] == "O" && boxes[8] === "O" ||
    boxes[2] == "O" && boxes[4] == "O" && boxes[6] === "O"
    ) {
    return "Player Two won!"
  } else {
    return false;
  }
}

const displayPlayers = (playersList) => {
  const gameboard = document.querySelector('.gameboard');
  const players = document.querySelector('.players');
  gameboard.classList.add("grid");
  playersList.forEach((player) => {
    players.insertAdjacentHTML("afterbegin", `<span class="player-name">${player.name} plays ${player.symbol}</span>`)
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
    const form = `<form id='playerForm'><input type='text' class='form-control' name='playerName'><input type='submit' class='btn btn-secondary ml-3'></form>`
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
      if (boxes[boxNumber] == "‎") { // CAREFUL: Empty characer inserted between the quotes !!!
        if (turns % 2 == 0) {
          boxes[boxNumber] = "X"
        } else {
          boxes[boxNumber] = "O"
        }
        turns ++;
      } else {
        alert("Wrong spot!")
      }
      if (checkIfWinner(boxes) === false) {
        startTurns(boxes, turns);
      } else {
        renderGameBoard(boxes);
        setTimeout(function() { alert(checkIfWinner(boxes)); }, 100);
      }
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
  let boxes = [ "‎", "‎", "‎", "‎", "‎", "‎", "‎", "‎", "‎"]; // CAREFUL: empty characters inserted between quotes !!!
  let turns = 0;
  startTurns(boxes, turns);
}

initGame();
