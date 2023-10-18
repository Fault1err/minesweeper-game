let flagAmount = 0;
let flagLeftAmount = 10;

let timerFlag = false;
let timerId = 0;

let timeCount = 0;
let moveCount = 0;

let isSoundOn = null;

let arrLS = JSON.parse(localStorage.getItem('wins')) || [];
// console.log(arrLS);

const width = 10;
const playgroundFields = [];
const bombAmount = 10;

const h1Field = document.createElement('h1');
document.body.append(h1Field);
h1Field.innerHTML = 'RSS Minesweeper';

const renderField = document.createElement('div');
renderField.className = 'render_field';
document.body.append(renderField);

const playground = document.createElement('div');
playground.className = 'playground';
playground.id = 'playground';
renderField.appendChild(playground);

const textField = document.createElement('div');
textField.className = 'text_field';
renderField.appendChild(textField);

const textField1 = document.createElement('div');
textField1.className = 'text_field_1';
textField.appendChild(textField1);

const textField2 = document.createElement('div');
textField2.className = 'text_field_2';
textField.appendChild(textField2);

const textFieldResults = document.createElement('div');
textFieldResults.className = 'text_field_res';
renderField.appendChild(textFieldResults);

const ResH2Field = document.createElement('h2');
textFieldResults.append(ResH2Field);
ResH2Field.innerHTML = 'High Score Table';

const timerField = document.createElement('div');
timerField.className = 'timer_field';
timerField.innerHTML = 'Timer';
textField1.appendChild(timerField);

const movesField = document.createElement('div');
movesField.className = 'moves_field';
movesField.innerHTML = 'Moves';
textField1.appendChild(movesField);

const bombsAmountField = document.createElement('p');
bombsAmountField.className = 'bombs_amount_field';
bombsAmountField.innerHTML = `Flags left: ${flagLeftAmount}`;
textField1.appendChild(bombsAmountField);

const cheatBtn = document.createElement('button');
cheatBtn.type = 'button';
cheatBtn.innerHTML = 'Click to know how many bombs you flagged';
cheatBtn.className = 'cheat_btn';
textField1.appendChild(cheatBtn);

const matchesAmountField = document.createElement('p');
matchesAmountField.className = 'matches_amount_field';
matchesAmountField.innerHTML = "You didn't flagged bombs yet";
textField1.appendChild(matchesAmountField);

const attentionField = document.createElement('p');
attentionField.className = 'attention_field';
attentionField.innerHTML = '';
textField1.appendChild(attentionField);

const loseP = document.createElement('p');
loseP.className = 'lose_p';
loseP.innerHTML = '';
textField1.appendChild(loseP);

const winMessage = document.createElement('p');
winMessage.className = 'win_field';
winMessage.innerHTML = '';
textField1.appendChild(winMessage);

const restartBtn = document.createElement('button');
restartBtn.type = 'button';
restartBtn.innerHTML = 'Restart game';
restartBtn.className = 'restart_btn';
textField2.appendChild(restartBtn);

const changeModeBtn = document.createElement('button');
changeModeBtn.type = 'button';
changeModeBtn.innerHTML = 'Change color theme';
changeModeBtn.className = 'restart_btn';
textField2.appendChild(changeModeBtn);

const soundBtn = document.createElement('button');
soundBtn.type = 'button';
// soundBtn.innerHTML = 'Sound off/on 🔊';
soundBtn.className = 'restart_btn';
textField2.appendChild(soundBtn);

const resultsBtn = document.createElement('button');
resultsBtn.type = 'button';
resultsBtn.innerHTML = 'See results';
resultsBtn.className = 'results_btn';
textField2.appendChild(resultsBtn);

const resetAllBtn = document.createElement('button');
resetAllBtn.type = 'button';
resetAllBtn.innerHTML = 'Clear Local Storage';
resetAllBtn.className = 'reset_btn';
textField2.appendChild(resetAllBtn);

let isGameOver = false;

function winsOnload() {
  arrLS = JSON.parse(localStorage.getItem('wins')) || [];
  const winResItems = document.querySelectorAll('.winres');
  winResItems.forEach((element) => {
    element.remove();
  });
  if (arrLS.length === 0) {
    const winRes = document.createElement('p');
    textFieldResults.appendChild(winRes);
    winRes.classList.add('play_to_save_inf');
    winRes.classList.add('winres');
    winRes.innerHTML = 'Play the game to save your results';
    // return;
  } else {
    for (let i = 0; i < 20; i += 1) {
      const n = i / 2 + 1;
      const winRes = document.createElement('p');
      winRes.className = 'p_win_res';
      winRes.classList.add('winres');
      winRes.setAttribute('id', i);
      if (arrLS[i] === undefined) {
        i += 2;
        winRes.classList.add('play_to_save_list');
        winRes.classList.add('winres');
        winRes.innerHTML = 'Play the game to save your results';
        textFieldResults.appendChild(winRes);
      } else {
        winRes.classList.add('win_list');
        winRes.classList.add('winres');
        winRes.innerHTML = `${n}. Win with ${arrLS[i]} seconds and ${arrLS[i + 1]} moves`;
        textFieldResults.appendChild(winRes);
        // console.log('results shown', i);
        i += 1;
      }
    }
  }
}

document.addEventListener('DOMContentLoaded', winsOnload);

resetAllBtn.onclick = () => {
  localStorage.clear();
  arrLS = [];
};

resultsBtn.onclick = () => {
  textFieldResults.classList.toggle('visible');
};

textFieldResults.addEventListener('click', (e) => {
  const noCloseArea = e.target.closest('text_field_res');
  if (!noCloseArea) {
    textFieldResults.classList.remove('visible');
  }
});

soundBtn.onclick = () => {
  if (isSoundOn === false) {
    const unmutedSquares = document.querySelectorAll('.field');
    unmutedSquares.forEach((el) => {
      el.setAttribute('onclick', 'new Audio("assets/sound_click.mp3").play()');
      el.setAttribute('oncontextmenu', 'new Audio("assets/sound_flag.mp3").play()');
      localStorage.setItem('sound', 'on');
    });
    isSoundOn = true;
    soundBtn.innerHTML = 'Sound off/on 🔊';
    // console.log('unmuted!');
    // console.log(isSoundOn);
  } else if (isSoundOn === true) {
    soundBtn.innerHTML = 'Sound off/on 🔈';
    isSoundOn = false;
    const mutedSquares = document.querySelectorAll('div[onclick]');
    // console.log('muted!');
    // console.log(isSoundOn);
    mutedSquares.forEach((element) => {
      element.removeAttribute('onclick');
      element.removeAttribute('oncontextmenu');
      localStorage.setItem('sound', 'off');
    });
  }
};

function darkMode() {
  document.body.classList.toggle('darkmode');
  h1Field.classList.toggle('h1_dark');
  renderField.classList.toggle('render_field_dark');
  playground.classList.toggle('playground_dark');
  textFieldResults.classList.toggle('text_field_res_dark');
  localStorage.setItem('theme', document.body.classList.contains('darkmode') ? 'dark' : 'light');
}

changeModeBtn.onclick = () => {
  darkMode();
};

function ColorLSOnload() {
  if (localStorage.getItem('theme') === 'dark') {
    h1Field.classList.add('h1_dark');
    renderField.classList.add('render_field_dark');
    playground.classList.add('playground_dark');
    document.body.classList.add('darkmode');
  }
}

function SoundLSOnload() {
  if (localStorage.getItem('sound') === 'on') {
    isSoundOn = true;
    soundBtn.innerHTML = 'Sound off/on 🔊';
    const unmutedSquares = document.querySelectorAll('.field');
    unmutedSquares.forEach((el) => {
      el.setAttribute('onclick', 'new Audio("assets/sound_click.mp3").play()');
      el.setAttribute('oncontextmenu', 'new Audio("assets/sound_flag.mp3").play()');
    });
    // console.log('loaded sound on');
  } else if (localStorage.getItem('sound') === 'off') {
    isSoundOn = false;
    soundBtn.innerHTML = 'Sound off/on 🔈';
    // console.log('loaded sound off');
    const mutedSquares = document.querySelectorAll('div[onclick]');
    // console.log('muted!');
    // console.log(isSoundOn);
    mutedSquares.forEach((element) => {
      element.removeAttribute('onclick');
      element.removeAttribute('oncontextmenu');
    });
  } else {
    isSoundOn = true;
    soundBtn.innerHTML = 'Sound off/on 🔊';
    const unmutedSquares = document.querySelectorAll('.field');
    unmutedSquares.forEach((el) => {
      el.setAttribute('onclick', 'new Audio("assets/sound_click.mp3").play()');
      el.setAttribute('oncontextmenu', 'new Audio("assets/sound_flag.mp3").play()');
    });
    // console.log('default sound on');
  }
}

document.addEventListener('DOMContentLoaded', ColorLSOnload);
document.addEventListener('DOMContentLoaded', SoundLSOnload);

function createPlayground() {
  const bombArray = Array(bombAmount).fill('bomb');
  const clearArray = Array(width * width - bombAmount).fill('clear');
  const filledShuffledPlayground = [].concat(bombArray, clearArray).sort(() => Math.random() - 0.5);
  console.log(filledShuffledPlayground);

  for (let i = 0; i < width * width; i += 1) {
    const field = document.createElement('div');
    field.className = 'field';
    field.setAttribute('id', i);

    if (isSoundOn === true) {
      // console.log('will set sound on');
      field.setAttribute('onclick', 'new Audio("assets/sound_click.mp3").play()');
      field.setAttribute('oncontextmenu', 'new Audio("assets/sound_flag.mp3").play()');
    }

    field.classList.add(filledShuffledPlayground[i]);
    playground.appendChild(field);
    playgroundFields.push(field);
    // console.log(playgroundFields);
  }

  for (let i = 0; i < playgroundFields.length; i += 1) {
    let count = 0;
    const leftSide = (i % width === 0);
    const rightSide = (i % width === width - 1);

    if (playgroundFields[i].classList.contains('clear')) {
      if (i > 0 && !leftSide && playgroundFields[i - 1].classList.contains('bomb')) {
        count += 1;
      }
      if (i > 9 && !rightSide && playgroundFields[i + 1 - width].classList.contains('bomb')) {
        count += 1;
      }
      if (i > 10 && playgroundFields[i - width].classList.contains('bomb')) {
        count += 1;
      }
      if (i > 11 && !leftSide && playgroundFields[i - 1 - width].classList.contains('bomb')) {
        count += 1;
      }
      if (i < 98 && !rightSide && playgroundFields[i + 1].classList.contains('bomb')) {
        count += 1;
      }
      if (i < 90 && !leftSide && playgroundFields[i - 1 + width].classList.contains('bomb')) {
        count += 1;
      }
      if (i < 88 && !rightSide && playgroundFields[i + 1 + width].classList.contains('bomb')) {
        count += 1;
      }
      if (i < 89 && playgroundFields[i + width].classList.contains('bomb')) {
        count += 1;
      }
      playgroundFields[i].setAttribute('data', count);
      if (count !== 0) {
        // playgroundFields[i].innerHTML = count;
        playgroundFields[i].classList.add('num_fields_style');
      }
      if (count === 1) {
        playgroundFields[i].classList.add('num_fields_style_1');
      } else if (count === 2) {
        playgroundFields[i].classList.add('num_fields_style_2');
      } else if (count === 3) {
        playgroundFields[i].classList.add('num_fields_style_3');
      } else if (count === 4) {
        playgroundFields[i].classList.add('num_fields_style_4');
      } else if (count === 5) {
        playgroundFields[i].classList.add('num_fields_style_5');
      } else if (count === 6) {
        playgroundFields[i].classList.add('num_fields_style_6');
      } else if (count === 7) {
        playgroundFields[i].classList.add('num_fields_style_7');
      } else if (count === 8) {
        playgroundFields[i].classList.add('num_fields_style_8');
      }
    }
  }
}

createPlayground();

const clearCount = document.querySelectorAll('clear');
clearCount.forEach((el) => {
  const clearEl = el;
  clearEl.classList.add = 'num_fields_style';
});

cheatBtn.onclick = () => {
  matchesAmountField.classList.toggle('visible');
};

function clickForNeighbor(oneField) {
  const curId = oneField.id;
  if (oneField.classList.contains('flagged')) {
    return;
  } if (oneField.classList.contains('checked')) {
    return;
  }
  const count = oneField.getAttribute('data');
  if (count !== '0') {
    oneField.classList.add('checked');
    if (count === '1') oneField.classList.add('num_fields_style_1');
    if (count === '2') oneField.classList.add('num_fields_style_2');
    if (count === '3') oneField.classList.add('num_fields_style_3');
    if (count === '4') oneField.classList.add('num_fields_style_4');
    const res = oneField;
    res.innerHTML = count;
    return;
  }
  checkNeighbor(oneField, curId);
  oneField.classList.add('checked');
}

function checkNeighbor(oneField, curId) {
  const sideLeft = (curId % width === 0);
  const sideRight = (curId % width === width - 1);

  setTimeout(() => {
    // console.log('cur id', curId);
    if (curId > 0 && !sideLeft) {
      const newId = playgroundFields[parseInt(curId, 10) - 1].id;
      const newField = document.getElementById(newId);
      // console.log(newField);
      clickForNeighbor(newField);
    }
    if (curId > 9 && !sideRight) {
      const newId = playgroundFields[parseInt(curId, 10) + 1 - width].id;
      const newField = document.getElementById(newId);
      // console.log('hehehehe');
      clickForNeighbor(newField);
    }
    if (curId > 10) {
      const newId = playgroundFields[parseInt(curId - width, 10)].id;
      const newField = document.getElementById(newId);
      clickForNeighbor(newField);
    }
    if (curId > 11 && !sideLeft) {
      const newId = playgroundFields[parseInt(curId, 10) - 1 - width].id;
      const newField = document.getElementById(newId);
      clickForNeighbor(newField);
    }
    if (curId < 98 && !sideRight) {
      const newId = playgroundFields[parseInt(curId, 10) + 1].id;
      const newField = document.getElementById(newId);
      clickForNeighbor(newField);
    }
    if (curId < 90 && !sideLeft) {
      const newId = playgroundFields[parseInt(curId, 10) - 1 + width].id;
      const newField = document.getElementById(newId);
      clickForNeighbor(newField);
    }
    if (curId < 88 && !sideRight) {
      const newId = playgroundFields[parseInt(curId, 10) + 1 + width].id;
      const newField = document.getElementById(newId);
      clickForNeighbor(newField);
    }
    if (curId < 89) {
      const newId = playgroundFields[parseInt(curId, 10) + width].id;
      const newField = document.getElementById(newId);
      clickForNeighbor(newField);
    }
  }, 15);
}

function startTimer() {
  let seconds = 0;
  const timer = setInterval(() => {
    seconds += 1;
    timerField.innerHTML = `Timer: ${seconds} seconds`;
    // console.log('Time elapsed:', seconds, 'seconds');
    timeCount = seconds;
  }, 1000);
  timerFlag = true;
  return timer;
}

function stopTimer(timer) {
  clearInterval(timer);
  timerFlag = false;
  // console.log('stopped');
}

function gameOverPlay() {
  if (isSoundOn === true) {
    const audio = new Audio('assets/gameover.mp3').play();
    audio.play();
  }
}

function WinPlay() {
  if (isSoundOn === true) {
    const audio = new Audio('assets/win.mp3').play();
    audio.play();
  }
}

function toLoseGame() {
  // console.log('You lose!');
  playground.style.pointerEvents = 'none';
  const poo = document.querySelectorAll('.bomb');
  poo.forEach((el) => {
    const pooEl = el;
    pooEl.innerHTML = '💩';
    pooEl.classList.add('bomb_style');
  });
  isGameOver = true;
  loseP.innerHTML = 'Game over. Try again!';
  stopTimer(timerId);
  if (isSoundOn === true) {
    gameOverPlay();
  }
}

function checkforWinWithoutFlags() {
  let c = 0;
  for (let i = 0; i < playgroundFields.length; i += 1) {
    if (!playgroundFields[i].classList.contains('checked')) {
      c += 1;
      // console.log('checked without flags', c);
    }
  }
  if (c === bombAmount) {
    winMessage.innerHTML = `Hooray! You found all mines in ${timeCount} seconds and ${moveCount} moves!`;

    stopTimer(timerId);
    arrLS.unshift(timeCount, moveCount);
    localStorage.setItem('wins', JSON.stringify(arrLS));
    // console.log('win saved without flags', arrLS);
    WinPlay();
    winsOnload();
  }
}

function handleListener(e) {
  const targetKey = e.target;
  moveCount += 1;
  movesField.innerHTML = `Moves: ${moveCount}`;

  // console.log('moves', moveCount);
  if (timerFlag === false) {
    timerId = startTimer();
  }
  // const targetClick = e.target.closest('div.playground');
  // const curId = e.target.id;
  // console.log(curId);
  // console.log(targetKey);
  if (targetKey.classList.contains('bomb')) {
    toLoseGame();
    isGameOver = true;
  }
  if (targetKey.classList.contains('clear') && (!targetKey.classList.contains('flagged'))) {
    const dataCount = targetKey.getAttribute('data');
    if (dataCount !== '0') {
      targetKey.classList.add('checked');
      targetKey.innerHTML = dataCount;
      // console.log(targetKey);
      // console.log(dataCount);
    }
    if (dataCount === '0') {
      targetKey.classList.add('no_num');
      // console.log('nonum!');
      if (targetKey.classList.contains('no_num')) {
        // console.log('it is!');
        clickForNeighbor(targetKey);
      }
    }
  }
  checkforWinWithoutFlags();
}

playground.addEventListener('click', handleListener);

function getFlagged(field) {
  if ((!field.classList.contains('checked')) && (!field.classList.contains('flagged'))) {
    field.classList.add('flagged');
    const res = field;
    res.innerHTML = '🚩';
    flagAmount += 1;
    flagLeftAmount -= 1;
    bombsAmountField.innerHTML = `Flags left: ${flagLeftAmount}`;
    // console.log('flag amount', flagAmount);
    // console.log('flag left amount', flagLeftAmount);
  } else {
    field.classList.remove('flagged');
    const res = field;
    res.innerHTML = '';
    flagAmount -= 1;
    flagLeftAmount += 1;
    bombsAmountField.innerHTML = `Flags left: ${flagLeftAmount}`;
  }
  if (flagAmount > (bombAmount - 2)) {
    attentionField.innerHTML = 'Amount of flags is more than bombs amount!';
    // console.log('more!!');
  } if (flagAmount <= bombAmount) {
    attentionField.innerHTML = '';
  }
  // console.log('flag amount', flagAmount);
  // console.log('flag left amount', flagLeftAmount);
  // console.log('try to remove');
}

function checkForWin() {
  let matchesAmount = 0;
  for (let i = 0; i < playgroundFields.length; i += 1) {
    if (playgroundFields[i].classList.contains('flagged') && playgroundFields[i].classList.contains('bomb')) {
      matchesAmount += 1;
      matchesAmountField.innerHTML = `You flagged ${matchesAmount} bombs`;
      // console.log('matches', matchesAmount);
    }
  }
  if (matchesAmount === bombAmount) {
    stopTimer(timerId);
    winMessage.innerHTML = `Hooray! You found all mines in ${timeCount} seconds and ${moveCount} moves!`;

    arrLS.unshift(timeCount, moveCount);
    localStorage.setItem('wins', JSON.stringify(arrLS));
    // console.log('win saved with flags', arrLS);

    winsOnload();
    WinPlay();
    // console.log(timeCount);
    // console.log(moveCount);
  }
}

function handleListenerRight(e) {
  if (timerFlag === false) {
    timerId = startTimer();
  }
  e.preventDefault();
  const targetRightKey = e.target;
  // console.log('right click!');
  getFlagged(targetRightKey);
  checkForWin();
}

playground.addEventListener('contextmenu', handleListenerRight);

function restartGame() {
  flagAmount = 0;
  flagLeftAmount = 10;

  timerFlag = false;
  clearInterval(timerId);
  timeCount = 0;
  moveCount = 0;

  isGameOver = false;

  playgroundFields.forEach((field) => {
    playground.removeChild(field);
  });
  playgroundFields.length = 0;

  playground.style.pointerEvents = 'auto';
  timerField.innerHTML = 'Timer';
  movesField.innerHTML = 'Moves';
  bombsAmountField.innerHTML = `Flags left: ${flagLeftAmount}`;
  matchesAmountField.innerHTML = "You didn't flagged bombs yet";

  matchesAmountField.classList.remove('visible');
  attentionField.innerHTML = '';
  loseP.innerHTML = '';
  winMessage.innerHTML = '';

  createPlayground();
}

restartBtn.onclick = () => {
  restartGame();
  winsOnload();
  // console.log('restarted game');
};

const btns = document.querySelectorAll('button');
btns.forEach((btn) => {
  btn.addEventListener('mousedown', () => {
    btn.classList.add('clicked_btn');
  });
  setTimeout(() => {
    btn.addEventListener('mouseup', () => {
      btn.classList.remove('clicked_btn');
    });
  }, 35);
});
