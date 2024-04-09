const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_inactive",
};

enableValidation(config);

function enableValidation(config) {
  const formElements = [...document.querySelectorAll(config.formSelector)];
  formElements.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, config);
  });
}

function setEventListeners(formElement, config) {
  const { inputSelector, submitButtonSelector } = config;
  const inputElements = [...formElement.querySelectorAll(inputSelector)];
  const submitButton = formElement.querySelector(submitButtonSelector);
  inputElements.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputElements, submitButton, config);
    });
  });
}

function checkInputValidity(formElement, inputElement) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement);
    return;
  }
  hideInputError(formElement, inputElement);
}

function showInputError(formElement, inputElement) {
  const errorMessageElement = formElement.querySelector(`#${inputElement.id}-error`);
  errorMessageElement.textContent = inputElement.validationMessage;
}

function hideInputError(formElement, inputElement) {
  const errorMessageElement = formElement.querySelector(`#${inputElement.id}-error`);
  errorMessageElement.textContent = "";
}

function toggleButtonState(inputElements, submitButton, config) {
  const { inactiveButtonClass } = config;
  if (hasInvalidInput(inputElements)) {
    submitButton.classList.add(inactiveButtonClass);
    submitButton.disabled = true;
    return;
  }
  submitButton.classList.remove(inactiveButtonClass);
  submitButton.disabled = false;
}

function hasInvalidInput(inputElements) {
  return inputElements.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}
