import Router from '../Router';
import DocumentController from '../DocumentController';
import EmbyService from '../services/EmbyService';
import AllMoviesViewModel from './AllMoviesViewModel';

export default class AllMoviesController extends DocumentController {
	constructor(documentLoader, template, loadingDocument, routeParams) {
		super(documentLoader, template, loadingDocument, routeParams);

		this.Id = routeParams.Id;
		this.handleNeedsMore = this.handleNeedsMore.bind(this);
		this.pageSize = 100;
	}

	static handlesRoute(route) {
		return route.startsWith("movies/AllMovies");
	}

	async fetchData(routeParams) {
		console.log("ROUTE PARAMS", routeParams);
		const movies = await EmbyService.getMovies(routeParams.Id, 0, this.pageSize);
		this.allMoviesViewModel = new AllMoviesViewModel(movies);
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
		this.moviesSection.dataItem = this.allMoviesViewModel.moviesGrid;
	}

	async handleNeedsMore(event) {
		console.log("NEEDS MORE EVENT", event);
		console.log("NEEDS MORE THIS", this);
		console.log("NEEDS MORE THIS ID ", this.Id);

		const nextPageOfMovies = await EmbyService.getMovies(this.Id, this.grid.page * this.pageSize, this.pageSize);
		const newMoviesViewModel = new AllMoviesViewModel(nextPageOfMovies);

		this.moviesSection.dataItem.movies = this.moviesSection.dataItem.movies.concat(newMoviesViewModel.moviesGrid.movies);
		this.moviesSection.dataItem.touchPropertyPath("movies");
		this.grid.page += 1;
	}
}

Router.registerController(AllMoviesController);