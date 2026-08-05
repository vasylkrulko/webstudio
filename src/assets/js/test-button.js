const FEEDBACK_DURATION = 1800;

export function initTestButton() {
  const button = document.querySelector('[data-test-button]');
  const label = button?.querySelector('[data-test-button-label]');

  if (!button || !label) {
    return;
  }

  const initialLabel = label.textContent?.trim() ?? '';

  button.addEventListener('click', () => {
    label.textContent = 'JavaScript works ✓';
    button.disabled = true;

    window.setTimeout(() => {
      label.textContent = initialLabel;
      button.disabled = false;
    }, FEEDBACK_DURATION);
  });
}
