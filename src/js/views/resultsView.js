import View from './view.js';
import icons from 'url:../../img/icons.svg'; // parcel@v2
import previewView from './previewView.js';

class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _data;
  _errorMessage = 'No recipes found for your query. Please try again ;)!';
  _message = '';

  _generateMarkup() {
    return this._data.map(result => previewView.render(result, false)).join('');
  }
}

export default new ResultsView();
