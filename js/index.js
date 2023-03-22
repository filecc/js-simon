function start() {
  /* containers */
  const pcNumsContainer = document.getElementById("pcNumbers");
  const userNumsContainer = document.getElementById("userNumbers");
  const timerContainer = document.getElementById("timer");
  const resultContainer = document.getElementById("result");
  const whatSaid = document.querySelector('.whatSaid');

  let level = 1;
  let pcNums = [];
  let userNums = [];
  let numGuess = [];
  let seconds = 0;
  let points = 0;
  let total = 0;
  let intervalID;
  let showNumberIntID;
  let id;
  let win = false;

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

  const progress = () => intervalID = setInterval(countdown, 1000);

  function countdown() {
    console.log('seconds from countdown: ' + seconds);
    timerContainer.style.width = `calc(97% - ${seconds * 3.33}%)`;
    if (seconds > 20) {
      timeLeft.classList.toggle("animated");
      timerContainer.style.background =
        "linear-gradient(#cd1332 0%, #ba7dbe 100%)";
    }
    if (seconds > 24) {
      timeLeft.classList.remove("d-none");
      timeLeft.innerHTML = 30 - seconds + 1;
      timeLeft.addEventListener("animationend", () =>
        timeLeft.classList.remove("animated")
      );
    }
    if (seconds > 30) {
      timeLeft.classList.add("d-none");
      timerContainer.style.width = `100%)`
      timeLeft.classList.remove("animated");
      timeLeft.style.fontSize = '0';
      displayUserNumber();
      clearInterval(intervalID);
    }
    seconds++;
  }
  
  const timeLeft = document.getElementById("timeRunning");
        const timeToGuess = () => setInterval(guessed, 100);

  function starting(){
    clearInterval(intervalID);
    pcNumsContainer.innerHTML = '';
    userNumsContainer.innerHTML = '';
    timerContainer.classList.remove("d-none");
    timerContainer.style = ``;
      generateRadomPcNumbers(level);
      id = pcNums.length - 1;
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
    whatSaid.classList.remove('d-none');
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
    showNumberIntID = () => {
        setInterval(showNumber, 2000);
      }
    function showNumber() {
      if (id < 0 && !win && points === pcNums.length) {
            total += points;
            youWin();
            clearInterval(showNumberIntID);
            clearInterval(id);
      } else if (id >= 0 && !win && numGuess.length === pcNums.length) {
        const arraySortedPc = pcNums.sort();
        const arraySortedUser = numGuess.sort();
        document
          .querySelector(`._${arraySortedPc[id]}`)
          .classList.remove("blurred");
        if (arraySortedUser.includes(arraySortedPc[id])) {
          document.getElementById(arraySortedPc[id]).classList.add("success");
          points++;
        } else {
          document.getElementById(arraySortedPc[id]).classList.add("fail");
        }
        
        console.log(id)
        if (points < pcNums.length && id === 0){
            youLose();
            clearInterval(showNumberIntID);
            clearInterval(timeToGuess);
        }
        id--;

      }
    }
    if (!win && id >= 0 && numGuess.length === pcNums.length) {
      send.disabled = true;
      timeToGuess();
      showNumberIntID();
    }
   
    
  }

  function youWin(){
    win = true;
    points = 0;
    numGuess.length = 0;
    clearInterval(showNumberIntID);
    resultContainer.append(createChild('p', '', ['resultP', 'text-success', 'fw-bold', 'fs-2'], `You WIN! You now have ${total} points.`));
    resultContainer.append(createChild('button', 'next', ['btn', 'btn-success'], 'Next Level'));
    document.getElementById('next').addEventListener('click', handleNext);
  }

  function handleNext() {
    whatSaid.classList.add('d-none');
    win = false;
    level++;
    pcNums.length = 0;
    userNums.length = 0;
    seconds = 0;
    document.getElementById('level').innerHTML = `Level: ${level}`
    resultContainer.innerHTML = '';
    clearInterval(intervalID);
    clearInterval(showNumberIntID);
    starting();

  }

  function youLose(){
    resultContainer.append(createChild('p', '', ['resultP', 'text-danger', 'fw-bold', 'fs-2'], 'You Lose.'));
    resultContainer.append(createChild('p', '', ['resultP', 'text-danger', 'fw-bold', 'fs-2'], `Total score: ${total}`));
    level = 1;
    clearInterval(showNumberIntID);
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
