import Router from '../Router';
import DocumentController from '../DocumentController';
import EmbyService from '../services/EmbyService';
import HomeViewModel from './HomeViewModel';

export default class HomeController extends DocumentController {
	constructor(documentLoader, template, loadingDocument) {
		super(documentLoader, template, loadingDocument);
	}

	static handlesRoute(route) {
		return route.startsWith("home/");
	}

	async fetchData(routeParams) {
		//TODO get user from routeParams
		
		this.homeData = await EmbyService.getHome(null);
		this.homeViewModel = new HomeViewModel(this.homeData[0], this.homeData[1]);

		return Promise.resolve({});
	}

	bindData(document) {
		const libraryTitle = document.getElementById("libraryTitle");
		libraryTitle.dataItem = this.homeViewModel.librariesShelf;
		const libraries = document.getElementById("libraries");
		libraries.dataItem = this.homeViewModel.librariesShelf;

		const continueWatchingTitle = document.getElementById("continueWatchingTitle");
		continueWatchingTitle.dataItem = this.homeViewModel.continueWatchingShelf;
		const continueWatchingItems = document.getElementById("continueWatchingItems");
		continueWatchingItems.dataItem = this.homeViewModel.continueWatchingShelf;
	}
}

Router.registerController(HomeController);