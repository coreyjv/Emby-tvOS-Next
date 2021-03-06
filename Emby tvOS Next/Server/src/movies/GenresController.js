import Router from '../Router';
import DocumentController from '../DocumentController';
import EmbyService from '../services/EmbyService';
import GenresViewModel from './GenresViewModel';
import GenreMovieViewModel from './GenreMovieViewModel'; 

const pageSize = 30;
const needsMoreThreshold = 2;

function needMoreEventListener(movieLibraryId, genreId, moviesSection, totalMovies, page, numberLoaded, embyService) {
	let loading = false;

	function needToLoadMore(highlightedIndex) {
		return loading === false && highlightedIndex > (numberLoaded - (pageSize * needsMoreThreshold)) && numberLoaded < totalMovies;
	}

	return async (event) => {
		console.log("Genre Highlight", genreId);
		const highlightedIndex = event.target.parentNode.dataItem.movies.indexOf(event.target.dataItem);
		console.log("Highlighted Index", highlightedIndex);

		if ( needToLoadMore(highlightedIndex) ) {
			console.log("Need to fetch more for genre with id", genreId);
			loading = true;

			const nextPageOfMovies = await embyService.getMoviesByGenre(movieLibraryId, genreId, numberLoaded + page * pageSize, pageSize);
			const moviesViewModel = new GenreMovieViewModel(nextPageOfMovies);

			moviesSection.dataItem.movies = moviesSection.dataItem.movies.concat(moviesViewModel.moviesGrid.movies);
			moviesSection.dataItem.touchPropertyPath("movies");

			loading = false;
			numberLoaded += pageSize;
			page++;
		} else {
			console.log("Load threshold not triggered for genre", genreId);
		}
	}
}

export default class GenresController extends DocumentController {
	constructor(documentLoader, template, loadingDocument, routeParams) {
		super(documentLoader, template, loadingDocument, routeParams);

		this.Id = routeParams.Id;
		this.loadedGenres = [];
	}

	static handlesRoute(route) {
		return route.startsWith("movies/Genres");
	}

	async fetchData(routeParams) {
		const genres = await EmbyService.getMovieGenres(routeParams.Id);
		this.genresViewModel = new GenresViewModel(genres);

		if ( genres.length === 0 ) {
			this.noGenres = true;
			return Promise.resolve({ data: { title: "messages.genres.noGenresTitle" }, templateOverride: "templates/DescriptiveAlert" });
		}

		return Promise.resolve({data: this.genresViewModel});
	}

	setupDocument(document) {
		super.setupDocument(document);
	}

	bindData(document) {
		document.getElementsByTagName("section").forEach((section) => {
			const emptyDataItem = new DataItem();
			emptyDataItem.movies = [];
			section.dataItem = emptyDataItem;
		});
	}


	async handleHighlight(event) {
		const genreId = event.target.getAttribute("itemID");

		if ( this.isGenre(event.target) && genreId ) {
			if ( this.needToLoadGenre(genreId) ) {
				const moviesInGenre = await EmbyService.getMoviesByGenre(this.Id, genreId, 0, pageSize);
				const movies = new GenreMovieViewModel(moviesInGenre);
				const moviesSection = event.target.getElementsByTagName("section").item(0);
				moviesSection.dataItem = movies.moviesGrid;
				moviesSection.addEventListener("highlight", needMoreEventListener(this.Id, genreId, moviesSection, movies.movieCount, 0, pageSize, EmbyService));

				this.loadedGenres.push(genreId);
			}
		}
	}

	isGenre(target) {
		return target.tagName === "listItemLockup";
	}

	needToLoadGenre(highlightedGenre) {
		return !this.loadedGenres.includes(highlightedGenre);
	}
}

Router.registerController(GenresController);