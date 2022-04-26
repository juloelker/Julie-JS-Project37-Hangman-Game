const wordEl = document.getElementById('word'),
  wrongLettersEl = document.getElementById('wrong-letters'),
  playAgainBtn = document.getElementById('play-again'),
  popup = document.getElementById('popup-container'),
  notification = document.getElementById('notification-container'),
  finalMessage = document.getElementById('final-message');

const figureParts = document.querySelectorAll('.figure-part');

const words = ['application', 'programming', 'interface', 'wizard'];

let selectedWord = words[Math.floor(Math.random() * words.length)];

const correctLetters = [];

const wrongLetters = [];

//show hidden word, to be run when a correct letter is guessed
function displayWord() {
  wordEl.innerHTML = `${selectedWord
    .split('')
    .map(
      letter => `
      <span class="letter">
${correctLetters.includes(letter) ? letter : ''}
</span>
`
    )
    .join('')}`;

  const innerWord = wordEl.innerText.replace(/\n/g, '');

  if (innerWord === selectedWord) {
    finalMessage.innerText = 'Congratulations! You won! 🎉';
    popup.style.display = 'flex';
  }
}

//update the wrong letters array
function updateWrongLettersEl() {
  //3 goals:
  //1) update wrong letters element, but first check that it is empty
  wrongLettersEl.innerHTML = `${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}
${wrongLetters.map(letter => `<span>${letter}</span>`)}`;

  //2) add to the hangman figure
  figureParts.forEach((part, index) => {
    const errors = wrongLetters.length;
    if (index < errors) {
      part.style.display = 'block';
    } else {
      part.style.display = 'none';
    }
  });

  //3) see if we are done, whole figure is built, lose
  if (wrongLetters.length === figureParts.length) {
    finalMessage.innerText = 'You lose :(';
    popup.style.display = 'flex';
  }
}

// show notification
function showNotification() {
  notification.classList.add('show');

  setTimeout(() => {
    notification.classList.remove('show');
  }, 3000);
}

//keydown letter press event
window.addEventListener('keydown', e => {
  // console.log(e.code)// a thru z;
  if (e.code >= 'A' && e.code <= 'Z') {
    const letter = e.key;

    if (selectedWord.includes(letter)) {
      //push letter onto the correct letters array, but only if it's not already there
      if (!correctLetters.includes(letter)) {
        correctLetters.push(letter);

        displayWord();
      } else {
        showNotification();
      }
    } else {
      if (!wrongLetters.includes(letter)) {
        wrongLetters.push(letter);

        updateWrongLettersEl();
      } else {
        showNotification();
      }
    }
  }
});

//restart game and play again
playAgainBtn.addEventListener('click', () => {
  //empty the arrays for correct and wrong letters
  correctLetters.splice(0);
  wrongLetters.splice(0);

  //reset the selected word
  selectedWord = words[Math.floor(Math.random() * words.length)];

  displayWord();

  updateWrongLettersEl();

  popup.style.display = 'none';
});

displayWord();
