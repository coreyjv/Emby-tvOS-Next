import Router from '../Router';
import DocumentController from '../DocumentController';
import EmbyService from '../services/EmbyService';
import FavoriteMoviesViewModel from './FavoriteMoviesViewModel';

export default class FavoriteMoviesController extends DocumentController {
	constructor(documentLoader, template, loadingDocument, routeParams) {
		super(documentLoader, template, loadingDocument, routeParams);

		this.Id = routeParams.Id;
		this.handleNeedsMore = this.handleNeedsMore.bind(this);
		this.pageSize = 100;
	}

	static handlesRoute(route) {
		return route.startsWith("movies/FavoriteMovies");
	}

	async fetchData(routeParams) {
		console.log("THIS PAGE SIZE", this.pageSize);
		const movies = await EmbyService.getFavoriteMovies(routeParams.Id, 0, this.pageSize);
		this.favoriteMoviesViewModel = new FavoriteMoviesViewModel(movies);
		return Promise.resolve({});
	}

	setupDocument(document) {
		super.setupDocument(document);

		document.getElementsByTagName("stackTemplate").item(0).addEventListener("needsmore", this.handleNeedsMore);
	}

	bindData(document) {
		this.grid = document.getElementsByTagName("grid").item(0);
		this.grid.page = 1;

		this.moviesSection = document.getElementsByTagName("section").item(0);
		this.moviesSection.dataItem = this.favoriteMoviesViewModel.moviesGrid;
	}

	async handleNeedsMore(event) {
		const nextPageOfMovies = await EmbyService.getFavoriteMovies(this.Id, this.grid.page * this.pageSize, this.pageSize);
		const newMoviesViewModel = new FavoriteMoviesViewModel(nextPageOfMovies);

		this.moviesSection.dataItem.movies = this.moviesSection.dataItem.movies.concat(newMoviesViewModel.moviesGrid.movies);
		this.moviesSection.dataItem.touchPropertyPath("movies");
		this.grid.page += 1;
	}
}

Router.registerController(FavoriteMoviesController);