const submitBtn = document.getElementById('submitBtn');
const inputString = document.getElementById('inputString');
const arrayDisplay = document.getElementById('arrayDisplay');
const stackDisplay = document.getElementById('stackDisplay');

const BUFFER_SIZE = 8;

function renderArray(input) {
  arrayDisplay.innerHTML = '';
  for (let i = 0; i < input.length; i++) {
    const cell = document.createElement('div');
    cell.className = 'arrayCell';

    const box = document.createElement('div');
    box.className = i < BUFFER_SIZE ? 'box' : 'box overflow';
    box.textContent = input[i];

    const indexLabel = document.createElement('div');
    indexLabel.className = 'indexLabel';
    indexLabel.textContent = i;

    cell.appendChild(box);
    cell.appendChild(indexLabel);
    arrayDisplay.appendChild(cell);
  }
}

function addStackRow(labelText, value, isOverflow) {
  const row = document.createElement('div');
  row.className = 'stackRow';

  const label = document.createElement('div');
  label.className = 'stackLabel';
  label.textContent = labelText;

  const valueBox = document.createElement('div');
  valueBox.className = isOverflow ? 'stackValue overflow' : 'stackValue';
  valueBox.textContent = value;

  row.appendChild(label);
  row.appendChild(valueBox);
  stackDisplay.appendChild(row);
}

function renderStack(input) {
  stackDisplay.innerHTML = '';

  addStackRow('Return Addr', 'RET', input.length > BUFFER_SIZE + 4);
  addStackRow('Saved %EBP', '%EBP', input.length > BUFFER_SIZE);

  for (let i = BUFFER_SIZE - 1; i >= 0; i--) {
    addStackRow(`buf[${i}]`, input[i] || '', false);
  }
}

submitBtn.addEventListener('click', () => {
  renderArray(inputString.value);
  renderStack(inputString.value);
});