import Router from '../Router';
import DocumentController from '../DocumentController';
import EmbyService from '../services/EmbyService';
import MovieDetailViewModel from './MovieDetailViewModel';

export default class MovieDetailController extends DocumentController {
	constructor(documentLoader, template, loadingDocument, routeParams) {
		super(documentLoader, template, loadingDocument, routeParams);
	}

	static handlesRoute(route) {
		return route.startsWith("movies/MovieDetail");
	}

	async fetchData(routeParams) {
		console.log("ROUTE PARAMS", routeParams);
		const movie = await EmbyService.getMovieDetail(routeParams.Id);
		this.movieDetailViewModel = new MovieDetailViewModel(movie);
		return Promise.resolve(this.movieDetailViewModel);
	}

	bindData(document) {
		const title = document.getElementById("title");
		title.dataItem = this.movieDetailViewModel.movieDataItem;

		const description = document.getElementById("description");
		description.dataItem = this.movieDetailViewModel.movieDataItem;

		const runtime = document.getElementById("runtime");
		runtime.dataItem = this.movieDetailViewModel.movieDataItem;

		const genres = document.getElementById("genres");
		genres.dataItem = this.movieDetailViewModel.movieDataItem;

		const ratingBadge = document.getElementById("ratingBadge");
		ratingBadge.dataItem = this.movieDetailViewModel.movieDataItem;

		const subtitlesBadge = document.getElementById("subtitlesBadge");
		subtitlesBadge.dataItem = this.movieDetailViewModel.movieDataItem;

		const hdBadge = document.getElementById("hdBadge");
		hdBadge.dataItem = this.movieDetailViewModel.movieDataItem;

		const heroImg = document.getElementById("heroImg");
		heroImg.dataItem = this.movieDetailViewModel.movieDataItem;

		// const backgroundImg = document.getElementById("backgroundImg");
		// backgroundImg.dataItem = this.movieDetailViewModel.movieDataItem;

		const castAndCrewTitle = document.getElementById("castAndCrewTitle");
		castAndCrewTitle.dataItem = this.movieDetailViewModel.castAndCrewShelf;
		const castAndCrewItems = document.getElementById("castAndCrewItems");
		castAndCrewItems.dataItem = this.movieDetailViewModel.castAndCrewShelf;

		const scenesTitle = document.getElementById("scenesTitle");
		scenesTitle.dataItem = this.movieDetailViewModel.scenesShelf;
		const scenesItems = document.getElementById("scenesItems");
		scenesItems.dataItem = this.movieDetailViewModel.scenesShelf;

		const similarMoviesTitle = document.getElementById("similarMoviesTitle");
		similarMoviesTitle.dataItem = this.movieDetailViewModel.similarMoviesShelf;
		const similarMoviesItems = document.getElementById("similarMoviesItems");
		similarMoviesItems.dataItem = this.movieDetailViewModel.similarMoviesShelf;
	}
}

Router.registerController(MovieDetailController);