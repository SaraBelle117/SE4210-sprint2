const submitBtn = document.getElementById('submitBtn');
const resetBtn = document.getElementById('resetBtn');
const inputString = document.getElementById('inputString');
const arrayDisplay = document.getElementById('arrayDisplay');
const stackDisplay = document.getElementById('stackDisplay');
const stringLength = document.getElementById('stringLength');
const overflowNote = document.getElementById('overflowNote');
const bufferSizeValue = document.getElementById('bufferSizeValue');
const decreaseBtn = document.getElementById('decreaseBtn');
const increaseBtn = document.getElementById('increaseBtn');

let BUFFER_SIZE = 8;
let pendingBufferSize = BUFFER_SIZE;

bufferSizeValue.textContent = pendingBufferSize;

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

  // Characters past the buffer spill into the saved EBP, then the saved
  // return address (EIP), in that order, mirroring the real memory layout
  // from the Problem 2 exercise (buf[] followed by saved EBP, then saved EIP).
  const overflow = input.length > BUFFER_SIZE ? input.slice(BUFFER_SIZE) : '';
  const ebpOverwrite = overflow.slice(0, 4);
  const retOverwrite = overflow.slice(4, 8);

  addStackRow('Return Addr', retOverwrite || '0xffffd3a4', input.length > BUFFER_SIZE + 4);
  addStackRow('Saved %EBP', ebpOverwrite || '0xffffd3a0', input.length > BUFFER_SIZE);

  for (let i = BUFFER_SIZE - 1; i >= 0; i--) {
    addStackRow(`buf[${i}]`, input[i] || '', false);
  }
}

function renderAll() {
  BUFFER_SIZE = pendingBufferSize;

  const value = inputString.value;
  stringLength.style.display = value.length > 0 ? 'block' : 'none';
  stringLength.textContent = `String Length: ${value.length}`;

  renderArray(value);
  renderStack(value);

  const isOverflowing = value.length > BUFFER_SIZE;
  overflowNote.style.display = value.length > 0 ? 'block' : 'none';
  overflowNote.classList.toggle('error', isOverflowing);
  overflowNote.textContent = isOverflowing
    ? 'Buffer overflow detected!'
    : 'No overflow yet, try a longer string or a smaller buffer size to see it in action.';
}

submitBtn.addEventListener('click', renderAll);

inputString.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    renderAll();
  }
});

resetBtn.addEventListener('click', () => {
  inputString.value = '';
  arrayDisplay.innerHTML = '';
  stackDisplay.innerHTML = '';
  stringLength.style.display = 'none';
  overflowNote.style.display = 'none';
  overflowNote.classList.remove('error');
});

decreaseBtn.addEventListener('click', () => {
  pendingBufferSize = Math.max(1, pendingBufferSize - 1);
  bufferSizeValue.textContent = pendingBufferSize;
});

increaseBtn.addEventListener('click', () => {
  pendingBufferSize += 1;
  bufferSizeValue.textContent = pendingBufferSize;
});