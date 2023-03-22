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
  let points = 0;
  let intervalID;
  let showNumberIntID;
  let id;

  const start = document.querySelector(".start");
  const send = document.querySelector(".send");
  

  const buttonsActions = [start, send];

  

  const handleClickAction = function () {
    if (this.classList.contains("send")) {
      handleSend();
    } else if (this.classList.contains("start")) {
      this.removeEventListener("click", handleClickAction);
      this.disabled = true;
      starting();
    }
  };

  const progress = () => {intervalID = setInterval(countdown, 1000)};

  function countdown() {
    timeLeft.classList.toggle("animated");
    if (seconds > 30) {
        timeLeft.classList.add("d-none");
        timeLeft.style.fontSize = '0';
        displayUserNumber();
        timerContainer.style.width = `0%)`;
        clearInterval(intervalID);
      }
    if (seconds > 20) {
      timerContainer.style.background =
        "linear-gradient(#cd1332 0%, #ba7dbe 100%)";
    }
    timerContainer.style.width = `calc(97% - ${seconds * 3.33}%)`;
    if (seconds > 25) {
      timeLeft.classList.remove("d-none");
      timeLeft.innerHTML = 30 - seconds + 1;
      timeLeft.addEventListener("animationend", () =>
        timeLeft.classList.remove("animated")
      );
    }
    seconds++;
  }
  
  const timeLeft = document.getElementById("timeRunning");

      document
        .getElementById("clear")
        .addEventListener("click", () => (seconds = 30));

        const timeToGuess = () => setInterval(guessed, 100);

  function starting(){
    id = pcNums.length - 1;
    timerContainer.style.width = `100%)`;
    clearInterval(intervalID);
    pcNumsContainer.innerHTML = '';
    userNumsContainer.innerHTML = '';
    timerContainer.classList.remove("d-none");
      generateRadomPcNumbers(level);
      pcNums.forEach((number) => {
        pcNumsContainer.append(
          createChild("div", "", ["pcNums", "shadow-sm", `_${number}`], number)
        );
      });
      console.log(pcNums)
      progress();
     
        timeToGuess();
  }

  buttonsActions.forEach((button) => {
    button.addEventListener("click", handleClickAction);
  });

  const userGuess = function () {
    if (numGuess.length < pcNums.length) {
      numGuess.push(parseInt(this.innerText));
      this.disabled = true;
    }
  };

  function guessed() {
    if (numGuess.length > 0 && numGuess.length === pcNums.length) {
      send.disabled = false;
      const userButtons = document.querySelectorAll(".userNums");
      userButtons.forEach((element) => {
        element.removeEventListener("click", userGuess);
      });
      clearInterval(timeToGuess);
    } else {
        send.disabled = true;
    }
  }

  function displayUserNumber() {
    userNums = [];
    generateRandomUserNumber(level);
    userNums.forEach((number) => {
      userNumsContainer.append(
        createChild("button", number, ["userNums", "btn", "shadow-sm"], number)
      );
    });
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
    id = pcNums.length - 1;
    timeToGuess();
    showNumberIntID = () => {
        setInterval(showNumber, 2000);
      }
    function showNumber() {
      if (id < 0) {
        if (points === pcNums.length) {
            youWin();
        } 
        clearInterval(showNumberIntID);
      } else {
        const arraySortedPc = pcNums.sort();
        const arraySortedUser = numGuess.sort();
        document
          .querySelector(`._${arraySortedPc[id]}`)
          .classList.remove("blurred");
        if (arraySortedUser.includes(arraySortedPc[id])) {
          document.getElementById(arraySortedPc[id]).classList.add("success");
          points += 1;
        } else {
          document.getElementById(arraySortedPc[id]).classList.add("fail");
        }
        
        console.log(id)
        if (points < pcNums.length && id === 0){
            youLose();
        }
        id--;

      }
    }
    showNumberIntID();
    
  }

  function youWin(){
    resultContainer.append(createChild('p', '', ['resultP', 'text-success', 'fw-bold', 'fs-2'], `You WIN! You now have ${points} points.`));
    resultContainer.append(createChild('button', 'next', ['btn', 'btn-success'], 'Next Level'));
    document.getElementById('next').addEventListener('click', handleNext);
  }

  function handleNext() {
    level++;
    document.getElementById('level').innerHTML = `Level: ${level}`
    resultContainer.innerHTML = '';
    pcNums.length = 0;
    userNums.length = 0;
    numGuess.length = 0;
    seconds = 0;
    clearInterval(intervalID);
    clearInterval(showNumberIntID);
    starting();

  }

  function youLose(){
    resultContainer.append(createChild('p', '', ['resultP', 'text-danger', 'fw-bold', 'fs-2'], 'You Lose.'));
    level = 1;
  }

  /* FUNCTIONS */
  function generateRadomPcNumbers(howMany) {
    pcNums = [];
    while (pcNums.length < howMany + 2) {
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

}

start();
