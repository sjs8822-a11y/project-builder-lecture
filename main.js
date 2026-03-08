const pickButton = document.getElementById('pickButton');
const resultList = document.getElementById('resultList');
const themeToggle = document.getElementById('themeToggle');

// Theme Toggle Logic
function initTheme() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark');
    themeToggle.textContent = '☀️ 라이트 모드';
  } else {
    themeToggle.textContent = '🌙 다크 모드';
  }
}

themeToggle.addEventListener('click', () => {
  const isDark = document.body.classList.toggle('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
  themeToggle.textContent = isDark ? '☀️ 라이트 모드' : '🌙 다크 모드';
});

// Lotto Logic
function getBallClass(number) {
  if (number <= 10) return 'range-1-10';
  if (number <= 20) return 'range-11-20';
  if (number <= 30) return 'range-21-30';
  if (number <= 40) return 'range-31-40';
  return 'range-41-45';
}

function generateLottoNumbers() {
  const numbers = new Set();
  while (numbers.size < 6) {
    const randomNumber = Math.floor(Math.random() * 45) + 1;
    numbers.add(randomNumber);
  }
  return [...numbers].sort((a, b) => a - b);
}

function renderFiveGames() {
  resultList.innerHTML = '';
  for (let i = 1; i <= 5; i++) {
    const row = document.createElement('div');
    row.className = 'result-row';

    const label = document.createElement('div');
    label.className = 'label';
    label.textContent = `${i}게임`;

    const numbersWrap = document.createElement('div');
    numbersWrap.className = 'numbers';

    const numbers = generateLottoNumbers();
    numbers.forEach((number) => {
      const ball = document.createElement('div');
      ball.className = `ball ${getBallClass(number)}`;
      ball.textContent = number;
      numbersWrap.appendChild(ball);
    });

    row.appendChild(label);
    row.appendChild(numbersWrap);
    resultList.appendChild(row);
  }
}

pickButton.addEventListener('click', renderFiveGames);

// Initialization
initTheme();
renderFiveGames();
