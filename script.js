const form = document.querySelector('.signup__form');
const emailInput = document.querySelector('#email');
const button = document.querySelector('.signup__submit');
let debounceTimer;

// E-Mail Validation (Regex)
function isValidEmail(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
  return emailPattern.test(email);
}

// Live-Check (2s debounce)
emailInput.addEventListener('input', () => {
  clearTimeout(debounceTimer);

  debounceTimer = setTimeout(() => {
    const value = emailInput.value.trim();
    const field = emailInput.closest('.signup__field');
    const errorMessage = field.querySelector('.signup__error');
    const errorIcon = field.querySelector('.signup__error-icon');

    if (value === '') {
      errorMessage.style.display = 'none';
      errorIcon.style.display = 'none';
      button.classList.remove('error');
      return;
    }

    if (isValidEmail(value)) {
      errorMessage.style.display = 'none';
      errorIcon.style.display = 'none';
      button.classList.remove('error');
      emailInput.style.borderColor = 'var(--color-gray-200)';
    } else {
      errorMessage.textContent = 'Looks like this is not an email';
      errorMessage.style.display = 'block';
      errorIcon.style.display = 'block';
      button.classList.add('error');
      emailInput.style.borderColor = 'var(--color-red-400)';
    }
  }, 2000);
});

// Submit Check
form.addEventListener('submit', (event) => {
  event.preventDefault();

  const inputs = form.querySelectorAll('.signup__input');
  let allValid = true;

  inputs.forEach((input) => {
    const field = input.closest('.signup__field');
    const errorMessage = field.querySelector('.signup__error');
    const errorIcon = field.querySelector('.signup__error-icon');
    const value = input.value.trim();

    // Reset jedes Felds vor Prüfung
    errorMessage.style.display = 'none';
    errorIcon.style.display = 'none';
    input.style.borderColor = 'var(--color-gray-200)';

    if (value === '') {
      errorMessage.textContent = `${input.placeholder} cannot be empty`;
      errorMessage.style.display = 'block';
      errorIcon.style.display = 'block';
      input.style.borderColor = 'var(--color-red-400)';
      allValid = false;
    } else if (input.type === 'email' && !isValidEmail(value)) {
      errorMessage.textContent = 'Looks like this is not an email';
      errorMessage.style.display = 'block';
      errorIcon.style.display = 'block';
      input.style.borderColor = 'var(--color-red-400)';
      allValid = false;
    }
  });

  if (allValid) {
    form.reset();
  }
});