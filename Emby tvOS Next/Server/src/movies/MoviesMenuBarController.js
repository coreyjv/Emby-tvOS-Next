import MenuBarController from '../MenuBarController';
import Router from '../Router';

export default class MoviesMenuBarController extends MenuBarController {
	static handlesRoute(route) {
		return route.startsWith("movies/MoviesMenuBar");
	}

	async fetchData(routeParams) {
		this.routeParams = routeParams;
		return Promise.resolve({
			menuItems: [{
				route: "movies/AllMovies",
				autoHighlight: true,
				title: "messages.moviesMenuBar.all"
			}, {
				route: "movies/FavoriteMovies",
				autoHighlight: false,
				title: "messages.moviesMenuBar.favorites"
			}, {
				route: "movies/MovieCollections",
				autoHighlight: false,
				title: "messages.moviesMenuBar.collections"
			},{
				route: "movies/Genres",
				autoHighlight: false,
				title: "messages.moviesMenuBar.genres"
			},{
				route: "movies/MovieSearch",
				autoHighlight: false,
				title: "messages.moviesMenuBar.search"
			}]
		});
	}
}

Router.registerController(MoviesMenuBarController);