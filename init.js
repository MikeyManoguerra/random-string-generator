window.addEventListener('DOMContentLoaded', () => {
  initSlider();
  initSymbolElements();
  initSymbolRectivity();
  initDelimeter();
  validateForm();
});

function initSymbolElements() {
  const symbolCodes = [33, 35, 36, 37, 38, 40, 45, 46, 60, 62, 63, 64, 91, 92, 93, 94, 95, 123, 124, 125];
  const symbolSelect = document.getElementById('symbols');

  symbolCodes.forEach((code) => {
    const div = document.createElement('div');
    const checkbox = document.createElement('input');
    checkbox.textContent = String.fromCharCode(code);

    checkbox.setAttribute('name', 'symbol-' + code);
    checkbox.setAttribute('id', 'symbol-' + code);
    checkbox.setAttribute('type', 'checkbox');

    const label = document.createElement('label');
    label.setAttribute('for', 'symbol-' + code);

    label.textContent = String.fromCharCode(code);
    div.appendChild(checkbox);
    div.appendChild(label);
    symbolSelect.appendChild(div);
  })
}

function initSlider() {
  const lengthDisplay = (value) => document.getElementById('string-length').textContent = value;
  const lengthInput = document.getElementById('length-input');
  lengthDisplay(lengthInput.value);

  lengthInput.oninput = event => {
    lengthDisplay(event.target.value);
  }
}

function initSymbolRectivity() {
  const allSymbols = document.querySelectorAll('.symbols input')

  document.getElementById('select-all').onclick = () => allSymbols.forEach(symbol => symbol.checked = true);
  document.getElementById('select-none').onclick = () => allSymbols.forEach(symbol => symbol.checked = false);
}

function initDelimeter() {
  const delimeterControls = document.getElementById('delimeter-controls')
  document.getElementById('yes-delimeter').oninput = () => delimeterControls.removeAttribute('hidden');

  const noDelimeter = document.getElementById('no-delimeter')
  noDelimeter.oninput = () => delimeterControls.setAttribute('hidden', '');
  noDelimeter.checked = true
}

function validateForm() {
  const setFormValidity = () => {
    const anyValueSelected = Array.from(checkboxes).some(checkbox => checkbox.checked)

    if (anyValueSelected) {
      submit.removeAttribute('disabled');
      return;
    }

    submit.setAttribute('disabled', '');
  }
  // 2022-july: currently checkboxes used to denote value types only. this query would have to change if that is no longer true
  // at least one checkbox must be checked for the submission script to work
  const checkboxes = document.querySelectorAll('input[type="checkbox"]')
  const submit = document.getElementById('submit')
  checkboxes.forEach(checkbox => checkbox.oninput = () => setFormValidity());
  setFormValidity();

}
