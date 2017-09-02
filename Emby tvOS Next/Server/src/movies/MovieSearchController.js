import Router from '../Router';
import DocumentController from '../DocumentController';
import EmbyService from '../services/EmbyService';
import MovieSearchResultsViewModel from './MovieSearchResultsViewModel';
import { getString } from '../InternationalData';

export default class MovieSearchController extends DocumentController {
	constructor(documentLoader, template, loadingDocument, routeParams) {
		super(documentLoader, template, loadingDocument, routeParams);

		this.handleSearchInput = this.handleSearchInput.bind(this);
		this.Id = routeParams.Id;
		this.searchInProgress = false;
	}

	static handlesRoute(route) {
		return route.startsWith("movies/MovieSearch");
	}

	async fetchData(routeParams) {
		return Promise.resolve({});
	}

	bindData(document) {
		this.moviesSearchResultsSection = document.getElementsByTagName("section").item(0);
		
		const movieSearchTitleDataItem = new DataItem();
		movieSearchTitleDataItem.title = getString("messages.movieSearch.movieSearch");

		this.searchMoviesTitle = document.getElementById("searchMoviesTitle");
		this.searchMoviesTitle.setAttribute("class", "centered-title");
		this.searchMoviesTitle.dataItem = movieSearchTitleDataItem;

		this.searchField = document.getElementsByTagName("searchField").item(0);
		this.searchFieldKeyboard = this.searchField.getFeature("Keyboard");
		this.searchFieldKeyboard.onTextChange = this.handleSearchInput;
	}

	async handleSearchInput() {
		if ( !this.searchInProgress && this.searchFieldKeyboard.text.length > 0 ) {
			this.searchInProgress = true;
			this.searchField.setAttribute("showSpinner", true);

			const movieSearchResults = await EmbyService.findMovieBySearchTerm(this.Id, this.searchFieldKeyboard.text, 40);

			const movieSearchResultsViewModel = new MovieSearchResultsViewModel(movieSearchResults);
			this.moviesSearchResultsSection.dataItem = movieSearchResultsViewModel.searchResults;
			this.moviesSearchResultsSection.dataItem.touchPropertyPath("movies");

			if ( movieSearchResults.length > 0 ) {
				this.searchMoviesTitle.dataItem.title = getString("messages.movieSearch.movies");
				this.searchMoviesTitle.setAttribute("class", null);
			} else {
				this.searchMoviesTitle.dataItem.title = getString("messages.movieSearch.noMovies");
				this.searchMoviesTitle.setAttribute("class", "centered-title");
			}

			this.searchMoviesTitle.dataItem.touchPropertyPath("title");

			this.searchField.setAttribute("showSpinner", false);
			this.searchInProgress = false;
		}
	}

}

Router.registerController(MovieSearchController);