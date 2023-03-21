function start() {
  /* containers */
  const pcNumsContainer = document.getElementById("pcNumbers");
  const userNumsContainer = document.getElementById("userNumbers");
  const timerContainer = document.getElementById("timer");
  const resultContainer = document.getElementById("result");

  let level = 1;
  let pcNums = [];
  let userNums = [];
  let numGuess = [];
  let seconds = 0;

  const start = document.querySelector(".start");
  const send = document.querySelector(".send");
  const reset = document.querySelector(".reset");

  const buttonsActions = [start, send, reset];

  const handleClickAction = function () {
    if (this.classList.contains("send")) {
       handleSend();
        this.disabled = true;
    } else if (this.classList.contains("start")) {
      this.removeEventListener("click", handleClickAction);
      this.disabled = true;
      timerContainer.classList.remove("d-none");
      generateRadomPcNumbers(level);
      pcNums.forEach((number) => {
        pcNumsContainer.append(
          createChild("div", '', ["pcNums", "shadow-sm", `_${number}`], number)
        );
      });
      const progress = setInterval(countdown, 1000);
      document
        .getElementById("clear")
        .addEventListener("click", () => (seconds = 30));
      function countdown() {
        if (seconds > 30) {
          displayUserNumber();
          timerContainer.style.width = `0%)`;
          clearInterval(progress);
        }
        if (seconds > 20) {
          timerContainer.style.background = "red";
        }
        timerContainer.style.width = `calc(97% - ${seconds * 3.33}%)`;
        seconds++;
      }
    } else {
      console.log("Reset");
    }
  };

  buttonsActions.forEach((button) => {
    button.addEventListener("click", handleClickAction);
  });

  const userGuess = function () {
    if (numGuess.length < pcNums.length) {
      numGuess.push(parseInt(this.innerText));
      this.disabled = true;
      console.log(numGuess);
    }
  };

  const timeToGuess = setInterval(guessed, 100);

  function guessed() {
    if (numGuess.length > 0 && numGuess.length === pcNums.length) {
      send.disabled = false;
      const userButtons = document.querySelectorAll(".userNums");
      userButtons.forEach((element) => {
        element.removeEventListener("click", userGuess);
      });
      clearInterval(timeToGuess);
    }
  }

  function displayUserNumber() {
    generateRandomUserNumber(level);
    userNums.forEach((number) => {
      userNumsContainer.append(
        createChild("button", number, ["userNums", "btn", "shadow-sm"], number)
      );
    });
    console.log(userNums);
    const userButtons = document.querySelectorAll(".userNums");
    const pcNumsDivs = document.querySelectorAll(".pcNums");
    pcNumsDivs.forEach((element) => {
      element.classList.add("blurred");
    });
    userNumsContainer.classList.remove("d-none");
    userButtons.forEach((element) => {
      element.addEventListener("click", userGuess, { once: true });
    });
  }

  function handleSend() {
    let id = pcNums.length - 1;
   function showNumber () {
    if (id < 0){
        clearInterval(showNumber);
    } else {
        const arraySortedPc = pcNums.sort();
        const arraySortedUser = numGuess.sort();
        document.querySelector(`._${arraySortedPc[id]}`).classList.remove('blurred');
        console.log(arraySortedPc[id]);
       
        if (arraySortedUser.includes(arraySortedPc[id])){
            document.getElementById(arraySortedPc[id]).classList.add('success');
            document.getElementById(`${arraySortedPc[id]}`).classList.add('gold');
        } else {
            document.getElementById(arraySortedPc[id]).classList.add('fail');
           
        }
        id--;
        
    }
   }
   setInterval(showNumber, 2000);
  }

  /* FUNCTIONS */
  function generateRadomPcNumbers(howMany) {
    while (pcNums.length < howMany + 4) {
      const newNumber = getRandomInt(1, 100);
      if (!pcNums.includes(newNumber)) {
        pcNums.push(newNumber);
      }
    }
  }

  function generateRandomUserNumber(howMany) {
    pcNums.forEach((element) => {
      userNums.push(element);
    });
    while (userNums.length < howMany + 7) {
      const newNumber = getRandomInt(1, 100);
      if (!userNums.includes(newNumber)) {
        userNums.push(newNumber);
      }
    }
    let shuffle = [];

    while (shuffle.length < userNums.length) {
      let randomID = getRandomInt(0, userNums.length);
      if (!shuffle.includes(userNums[randomID]))
        shuffle.push(userNums[randomID]);
    }
    userNums = shuffle;
  }

  function resetAll() {}
}

start();
