import DocumentController from './DocumentController';
import { getSortOrderOptions, getSortOrderTitle } from './SortOrderOptions'

export default class SortOrderModalController extends DocumentController {
	constructor(documentLoader, data, callback) {
		super(documentLoader, "templates/SortOrderTemplate", null, null, data);
		this._callback = callback;
	}

	fetchData() {
		const currentSortOrder = this._data;
		return Promise.resolve({ data: { sortOrderOptions: getSortOrderOptions(currentSortOrder) } });
	}

	handleDocument(document, loadingDocument) {
		navigationDocument.presentModal(document);
	}

	handleSelect(event) {
		this._callback(event.target.getAttribute("sortOrder"));
	}
}

SortOrderModalController.preventLoadingDocument = true