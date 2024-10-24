const guessWord = document.querySelector('.guess-word');
const inputsTries = document.querySelector('.inputs-tries');
const randomButton = document.querySelector('.random-button');
const resetButton = document.querySelector('.reset-button');
const lettersMistakes = document.querySelector('.letters-mistakes');
const trieHTML = document.querySelector('.trie');

const words = ['flower', 'computer', 'paper', 'table', 'animal'];
let tries = 0;
let mistakes = '';
let inputs;
let randomWord;
random();

function random() {
  randomWord = words[Math.floor(Math.random() * words.length)];
  const randomizedWord = randomizeString(randomWord);
  guessWord.innerHTML = randomizedWord;
  tries = 0;
  mistakes = '';
  lettersMistakes.innerHTML = mistakes;

  let inputsTriesHTML = '';
  for(let i = 0; i < randomWord.length; i++) {
    inputsTriesHTML += `<input type="text" maxlength="1" class="${i} pattern="[a-zA-Z]*" readOnly>`
  }

  inputsTries.innerHTML = inputsTriesHTML;
  trieHTML.innerHTML = tries;
  document.querySelectorAll('.dot').forEach(dot => {
    dot.classList.remove('bad');
  })
  inputs = document.querySelectorAll('.inputs-tries input');
  inputsFunction();
  controlTries();
}

function reset() {
  tries = 0;
  mistakes = '';
  lettersMistakes.innerHTML = mistakes;

  let inputsTriesHTML = '';
  for(let i = 0; i < randomWord.length; i++) {
    inputsTriesHTML += `<input type="text" maxlength="1" class="${i} pattern="[a-zA-Z]*" readOnly>`
  }

  inputsTries.innerHTML = inputsTriesHTML;
  trieHTML.innerHTML = tries;
  document.querySelectorAll('.dot').forEach(dot => {
    dot.classList.remove('bad');
  })
  inputs = document.querySelectorAll('.inputs-tries input');
  inputsFunction();
  controlTries();
}

function randomizeString(string) {

  let array = string.split('');
  
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }

  return array.join('');
}

function showTries(trie) {
  const dot = document.querySelector(`.dot-${trie}`);
  dot.classList.add('bad');
}

function inputsFunction() {
  inputs.forEach(input => {
    input.addEventListener('keyup', (e) => {
      if (/^[a-zA-Z]$/.test(e.key)) {
  
        const correct = randomWord[input.classList[0]];
        const answer = e.key;

        if (tries < 5) {
          if(answer === correct) {
            input.classList.add('correct');
          } else {
            input.classList.remove('correct');
            if (tries === 0) {
              input.readOnly = false;
              tries++;
              showTries(tries);
              mistakes = `${answer}`;
              lettersMistakes.innerHTML = mistakes;
              trieHTML.innerHTML = tries;
              input.readOnly = true;
            } else if (tries < 5) {
              tries++;
              showTries(tries);
              mistakes += `, ${answer}`;
              lettersMistakes.innerHTML = mistakes;
              trieHTML.innerHTML = tries;
              input.readOnly = true;
            } else {
              input.disabled = true;
            }
          }
        }
      }
    })
  })
}

function controlTries() {
  inputs.forEach(input => {
    input.addEventListener('click', () => {
      if(tries < 5) {
        input.readOnly = false;
      }
    })
  })
}


randomButton.addEventListener('click', random)
resetButton.addEventListener('click', reset)