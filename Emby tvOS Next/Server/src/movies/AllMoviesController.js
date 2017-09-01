import Router from '../Router';
import DocumentController from '../DocumentController';
import EmbyService from '../services/EmbyService';
import AllMoviesViewModel from './AllMoviesViewModel';
import SortByModalController from '../SortByModalController';
import { getMovieSortByOptions, getMovieSortByTitle } from './MovieSortByOptions'
import { getString } from '../InternationalData';

const pageSize = 100;

export default class AllMoviesController extends DocumentController {
	constructor(documentLoader, template, loadingDocument, routeParams) {
		super(documentLoader, template, loadingDocument, routeParams);

		this.Id = routeParams.Id;
		this.handleNeedsMore = this.handleNeedsMore.bind(this);
		this.handleSort = this.handleSort.bind(this);
	}

	static handlesRoute(route) {
		return route.startsWith("movies/AllMovies");
	}

	async fetchData(routeParams) {
		this.currentSortBy = 'SortName';
		this.currentSortOrder = 'Ascending';
		const movies = await EmbyService.getMovies(routeParams.Id, this.currentSortBy, this.currentSortOrder, 0, pageSize);
		this.allMoviesViewModel = new AllMoviesViewModel(movies);

		if ( movies.length === 0 ) {
			this.noMovies = true;
			return Promise.resolve({ data: { title: "messages.allmovies.noAllMoviesTitle" }, templateOverride: "templates/DescriptiveAlert" });
		}

		return Promise.resolve({ data: { sortBy: getMovieSortByTitle(this.currentSortBy), sortOrder: this.currentSortOrder === 'Ascending' ? '↑' : '↓' } });
	}

	setupDocument(document) {
		super.setupDocument(document);

		if ( !this.noMovies ) {
			document.getElementsByTagName("stackTemplate").item(0).addEventListener("needsmore", this.handleNeedsMore);
		}
	}

	bindData(document) {
		this.grid = document.getElementsByTagName("grid").item(0);
		this.grid.page = 1;

		this.moviesSection = document.getElementsByTagName("section").item(0);
		this.moviesSection.dataItem = this.allMoviesViewModel.moviesGrid;		
	}

	handleSelect(event) {
		const targetId = event.target.getAttribute("id");

		if ( targetId === "sortBy" ) {
			new SortByModalController(this._documentLoader, { sortByOptions: getMovieSortByOptions(this.currentSortBy), sortOrder: this.currentSortOrder }, this.handleSort);
		} else {
			super.handleSelect(event);
		}
	}

	updateSortByButton(sortBy, sortOrder) {
		console.log("sortBySortOrder", sortBy, sortOrder);
		const sortByText = this._document.getElementById("sortBy").getElementsByTagName("text").item(0);
		sortByText.textContent = `${getString("messages.sort.sortBy")}: ${getString(getMovieSortByTitle(sortBy))} ${sortOrder === 'Ascending' ? '↑' : '↓'}`;
	}

	async handleSort(sort) {
		try {
			//TODO Store previous results to alleviate additional network request. Need to see if this works with paging.
			const movies = await EmbyService.getMovies(this.Id, sort.sortBy, sort.sortOrder, 0, pageSize);
			this.allMoviesViewModel = new AllMoviesViewModel(movies);
			this.bindData(this._document);
			this.moviesSection.dataItem.touchPropertyPath("movies");
			this.updateSortByButton(sort.sortBy, sort.sortOrder);

			this.currentSortBy = sort.sortBy;
			this.currentSortOrder = sort.sortOrder;
			this.grid.page = 0;
		} catch(e) {
			console.error(e);
			//TODO display error;
		}
	}

	async handleNeedsMore(event) {
		const nextPageOfMovies = await EmbyService.getMovies(this.Id, this.grid.page * pageSize, pageSize);
		const newMoviesViewModel = new AllMoviesViewModel(nextPageOfMovies);

		this.moviesSection.dataItem.movies = this.moviesSection.dataItem.movies.concat(newMoviesViewModel.moviesGrid.movies);
		this.moviesSection.dataItem.touchPropertyPath("movies");
		this.grid.page += 1;
	}
}

Router.registerController(AllMoviesController);