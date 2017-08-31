import Router from '../Router';
import DocumentController from '../DocumentController';
import EmbyService from '../services/EmbyService';
import MovieCollectionsViewModel from './MovieCollectionsViewModel';

export default class MovieCollectionsController extends DocumentController {
	constructor(documentLoader, template, loadingDocument, routeParams) {
		super(documentLoader, template, loadingDocument, routeParams);

		this.Id = routeParams.Id;
		this.handleNeedsMore = this.handleNeedsMore.bind(this);
		this.pageSize = 100;
	}

	static handlesRoute(route) {
		return route.startsWith("movies/MovieCollections");
	}

	async fetchData(routeParams) {
		console.log("THIS PAGE SIZE", this.pageSize);
		const movieCollections = await EmbyService.getMovieCollections(routeParams.Id, 0, this.pageSize);
		this.movieCollectionsViewModel = new MovieCollectionsViewModel(movieCollections);

		if ( movieCollections.length === 0 ) {
			this.noCollections = true;
			return Promise.resolve({ data: { title: "messages.movieCollections.noMovieCollectionsTitle" }, templateOverride: "templates/DescriptiveAlert" });
		}

		return Promise.resolve({});
	}

	setupDocument(document) {
		super.setupDocument(document);

		if ( !this.noCollections ) {
			document.getElementsByTagName("stackTemplate").item(0).addEventListener("needsmore", this.handleNeedsMore);
		}
	}

	bindData(document) {
		this.grid = document.getElementsByTagName("grid").item(0);
		this.grid.page = 1;

		this.movieCollectionsSection = document.getElementsByTagName("section").item(0);
		this.movieCollectionsSection.dataItem = this.movieCollectionsViewModel.moviesGrid;
	}

	async handleNeedsMore(event) {
		const nextPageOfMovies = await EmbyService.getMovieCollections(this.Id, this.grid.page * this.pageSize, this.pageSize);
		const newMoviesViewModel = new MovieCollectionsViewModel(nextPageOfMovies);

		this.movieCollectionsSection.dataItem.movies = this.movieCollectionsSection.dataItem.movies.concat(newMoviesViewModel.moviesGrid.movies);
		this.movieCollectionsSection.dataItem.touchPropertyPath("movies");
		this.grid.page += 1;
	}
}

Router.registerController(MovieCollectionsController);