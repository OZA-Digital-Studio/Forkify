import icons from '../../img/icons.svg'; // parcel@v2
import Fraction from 'fractional'; // transforms 0.5 into '1/2'
import view from './view.js';

class addRecipeView extends view {
  _parentElement = document.querySelector('.upload');
  _message = 'Recipe was succesfully uploaded!';

  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');

  constructor() {
    super();
    this._addHandlerShowWindow();
    this._addHandlerHideWindow();
  }

  toggleWindow() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }

  _addHandlerShowWindow() {
    this._btnOpen.addEventListerner('click', this.toggleWindow.bind(this));
  }

  _addHandlerHideWindow() {
    this._btnClose.addEventListerner('click', this.toggleWindow.bind(this));
    this._overlay.addEventListerner('click', this.toggleWindow.bind(this));
  }

  addHandlerUpload(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      const dataArr = FormData(this);
      const data = Object.fromEntries(dataArr);
      handler(data);
    });
  }

  generateMarkup() {}
}

export default new addRecipeView();
