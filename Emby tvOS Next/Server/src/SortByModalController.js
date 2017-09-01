import DocumentController from './DocumentController';
import SortOrderModalController from './SortOrderModalController';

export default class SortByModalController extends DocumentController {
	constructor(documentLoader, data, callback) {
		super(documentLoader, "templates/SortByTemplate", null, null, data);
		this._callback = callback;
	}

	fetchData() {
		return Promise.resolve({ data: this._data });
	}

	handleDocument(document, loadingDocument) {
		navigationDocument.presentModal(document);
	}

	handleSelect(event) {
		const sortByEvent = event;

		new SortOrderModalController(this._documentLoader, this._data.sortOrder, (sortOrder) => { 
			navigationDocument.dismissModal();
			this._callback({ 
				sortBy: sortByEvent.target.getAttribute("sortBy"), 
				sortOrder: sortOrder
			})
		});
	}
}

SortByModalController.preventLoadingDocument = true