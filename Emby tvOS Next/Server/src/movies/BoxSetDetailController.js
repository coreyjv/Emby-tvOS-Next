import Router from '../Router';
import DocumentController from '../DocumentController';
import EmbyService from '../services/EmbyService';
import BoxSetDetailViewModel from './BoxSetDetailViewModel';

export default class BoxSetDetailController extends DocumentController {
	constructor(documentLoader, template, loadingDocument, routeParams) {
		super(documentLoader, template, loadingDocument, routeParams);
	}

	static handlesRoute(route) {
		return route.startsWith("movies/BoxSetDetail");
	}

	async fetchData(routeParams) {
		console.log("ROUTE PARAMS", routeParams);
		const boxSet = await EmbyService.getBoxSetDetail(routeParams.Id);
		this.boxSetDetailViewModel = new BoxSetDetailViewModel(boxSet);
		return Promise.resolve({ data: this.boxSetDetailViewModel });
	}

	bindData(document) {
		const title = document.getElementById("title");
		title.dataItem = this.boxSetDetailViewModel.boxSetDataItem;

		const description = document.getElementById("description");
		description.dataItem = this.boxSetDetailViewModel.boxSetDataItem;

		const heroImg = document.getElementById("heroImg");
		heroImg.dataItem = this.boxSetDetailViewModel.boxSetDataItem;

		const ratingBadge = document.getElementById("ratingBadge");
		ratingBadge.dataItem = this.boxSetDetailViewModel.boxSetDataItem;

		const boxSetChildrenTitle = document.getElementById("boxSetChildrenTitle");
		boxSetChildrenTitle.dataItem = this.boxSetDetailViewModel.boxSetChildrenShelf;
		//const boxSetChildrenItems = document.getElementById("boxSetChildrenItems");
		//boxSetChildrenItems.dataItem = this.boxSetDetailViewModel.boxSetChildrenShelf;
	}
}

Router.registerController(BoxSetDetailController);