let boxes = document.querySelectorAll(".boxes");
let mainWin = document.getElementById("main2");
let resetButton = document.getElementById("resetbtn");
const originalContent = mainWin.innerHTML; // Save the original content
let newGamebtn = document.getElementById("newbtn");
let turn1 = true;
let winningPattern = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
let msg = document.getElementById("msg");
let msgcontainer = document.getElementById("just");
let newButton = document.querySelector("#newbtn");
function check() {
  for (let pattern of winningPattern) {
    let value1 = boxes[pattern[0]].innerHTML;
    let value2 = boxes[pattern[1]].innerHTML;
    let value3 = boxes[pattern[2]].innerHTML;
    if (value1 != "" && value2 != "" && value2 != "") {
      if (value1 == value2 && value2 == value3 && value1 == value3) {
        console.log("Winner is " + value2);
        celebration();
        // winner();
        showMessage(value2);
        //newGameStart();
      }
    }
  }
}
newButton.addEventListener("click", (e) => {
  mainWin.innerHTML = originalContent;
  msgcontainer.classList.add("hide");
  

  turn1 = true;
  for (let box of boxes) {
    box.innerHTML = "";
    box.disabled = false;
  }
});

// function newGameStart() {
//   newGamebtn.style.display = "";
// }

function showMessage(value2) {
  msgcontainer.classList.remove("hide");
  msg.innerHTML = "Winner is  " + value2;
}
for (let box of boxes) {
  box.addEventListener("click", function () {
    if (turn1 == true) {
      box.innerHTML = "X";
      box.disabled = true;

      turn1 = false;
    } else {
      box.innerHTML = "O";
      box.disabled = true;

      turn1 = true;
    }
    check();
  });
}

function celebration() {
  const duration = 5 * 1000,
    animationEnd = Date.now() + duration,
    defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

  function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  const interval = setInterval(function () {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 50 * (timeLeft / duration);

    // since particles fall down, start a bit higher than random
    confetti(
      Object.assign({}, defaults, {
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      })
    );
    confetti(
      Object.assign({}, defaults, {
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      })
    );
  }, 250);
}

resetButton.addEventListener("click", (e) => {
  mainWin.innerHTML = originalContent;
  turn1 = true;
  for (let box of boxes) {
    box.innerHTML = "";
    box.disabled = false;
  }
});

// function winner() {
//   mainWin.innerHTML = "Player  Win";
// }
