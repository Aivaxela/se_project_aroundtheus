export default class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
    this._formInputs = [...this._formElement.querySelectorAll(config.inputSelector)];
    this._submitButton = this._formElement.querySelector(this._config.submitButtonSelector);
    this._inactiveButtonClass = this._config.inactiveButtonClass;
  }

  enableValidation() {
    this._setEventListeners();
  }

  toggleButton() {
    this._toggleButtonState(this._formInputs, this._submitButton);
  }

  resetValidation() {
    this._formInputs.forEach((inputElement) => {
      this._checkInputValidity(inputElement);
    });
  }

  _setEventListeners() {
    this._formInputs.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(this._formInputs, this._submitButton);
      });
    });
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
      return;
    }
    this._hideInputError(inputElement);
  }

  _showInputError(inputElement) {
    const errorMessageElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    errorMessageElement.textContent = inputElement.validationMessage;
  }

  _hideInputError(inputElement) {
    const errorMessageElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    errorMessageElement.textContent = "";
  }

  _toggleButtonState(formInputs, submitButton) {
    if (this._hasInvalidInputs(formInputs)) {
      submitButton.classList.add(this._inactiveButtonClass);
      submitButton.disabled = true;
      return;
    }
    submitButton.classList.remove(this._inactiveButtonClass);
    submitButton.disabled = false;
  }

  _hasInvalidInputs(formInputs) {
    return formInputs.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }
}
