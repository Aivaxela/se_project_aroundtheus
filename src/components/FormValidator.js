export default class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
    this._formInputs = [...this._formElement.querySelectorAll(config.inputSelector)];
    this._submitButton = this._formElement.querySelector(this._config.submitButtonSelector);
  }

  enableValidation() {
    this._setEventListeners();
    this.toggleButtonState();
  }

  resetValidation() {
    this._formInputs.forEach((inputElement) => {
      this._checkInputValidity(inputElement);
    });
    this.toggleButtonState();
  }

  toggleButtonState() {
    if (this._hasInvalidInputs(this._formInputs)) {
      this._submitButton.classList.add(this._config.inactiveButtonClass);
      this._submitButton.disabled = true;
      return;
    }
    this._submitButton.classList.remove(this._config.inactiveButtonClass);
    this._submitButton.disabled = false;
  }

  _setEventListeners() {
    this._formInputs.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this.toggleButtonState();
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
    inputElement.classList.add(this._config.errorClass);
  }

  _hideInputError(inputElement) {
    const errorMessageElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    errorMessageElement.textContent = "";
    inputElement.classList.remove(this._config.errorClass);
  }

  _hasInvalidInputs() {
    return this._formInputs.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }
}
