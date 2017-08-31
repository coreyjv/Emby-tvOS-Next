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
		const movies = await EmbyService.getMovies(routeParams.Id, 0, this.pageSize);
		this.allMoviesViewModel = new AllMoviesViewModel(movies);

		if ( movies.length === 0 ) {
			this.noMovies = true;
			return Promise.resolve({ data: { title: "messages.allmovies.noAllMoviesTitle" }, templateOverride: "templates/DescriptiveAlert" });
		}

		return Promise.resolve({});
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

	async handleNeedsMore(event) {
		const nextPageOfMovies = await EmbyService.getMovies(this.Id, this.grid.page * this.pageSize, this.pageSize);
		const newMoviesViewModel = new AllMoviesViewModel(nextPageOfMovies);

		this.moviesSection.dataItem.movies = this.moviesSection.dataItem.movies.concat(newMoviesViewModel.moviesGrid.movies);
		this.moviesSection.dataItem.touchPropertyPath("movies");
		this.grid.page += 1;
	}
}

Router.registerController(AllMoviesController);