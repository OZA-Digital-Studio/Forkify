import 'core-js/stable';
import { MODAL_CLOSE_SEC } from './config.js';
import 'regenerator-runtime/runtime';
import * as model from './model.js';
import recipeView from './views/recipeView';
import searchView from './views/searchView.js';
import resultsView from './views/searchView.js';
import paginationView from './views/paginationView.js';
import BookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView';

// if (module.hot) {
//   module.hot.accept();
// }

const controlRecipes = async function () {
  try {
    //const id = window.location.hash.slice(1);
    const id = '#5ed662fb2cb51e00175a342a';
    if (!id) return;

    recipeView.renderSpinner();

    // 0. Results view to mark search results
    resultsView.update(model.getSearchResultsPage());

    // 1. Updating bookmarks view
    bookmarksView.update(model.state.bookmarks);

    // 2. Loading recipe
    await model.loadRecipe(id);

    // 3. Rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

const controlBookmarks = function () {
  bookmarksViewrender(model.state.bookmarks);
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();

    //  1. Get search query
    const query = searchView.getQuery();
    if (!query) return;

    // 2. Load search results
    await model.loadSearchResults(query);

    // 3. Render results
    resultsView.render(model.getSearchResultsPage(1));

    // 4. Render the initial pagination buttons
    paginationView.render(model.state.search);
  } catch (err) {
    console.err(err);
  }
};

const controlPagination = function (goToPage) {
  // Render new results
  resultsView.render(model.getSearchResultsPage(goToPage));

  // Render new pagination buttons
  paginationView.render(model.state.search);
};

const controlServings = async function (newServings) {
  // Update recipe services
  model.updateServings(newServings);

  // Update the recipe view
  recipeView.renderSpinner();

  // 1. Loading recipe
  await model.loadRecipe(id);

  // 2. Rendering recipe
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  // 1. Add/Remove bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.state.recipe.bookmarked;
  model.deleteBookmark(model.state.recipe);
  //2. Update recipe view
  recipeView.update(model.state.recipe);

  // 3. Render bookmarsk
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    // Render spinner
    addRecipeView.renderSpinner();

    // Upload the new recipe data
    await model.uploadRecipe(newRecipe);

    // Render recipe
    recipeView.render(model.state.recipe);

    //Close form window
    setTimeout(function () {
      addRecipeView.toggleWindow(), MODAL_CLOSE_SEC * 1000;
    });

    // Success message
    addRecipeView.renderMessage();

    // Render the bookmarks View
    bookmarksView.render(modal.state.bookamrks);

    // Change ID in the url
    window.history.pushState(null, '', `#${mode.state.recipe.id}`);
  } catch (err) {
    console.err('💣 💣 💣 💣  ', err);
    addRecipeView.renderError(err.message);
  }
};

//  The publisher and subscriber pattern
const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};

init();
