import DocumentController from './DocumentController';

export default class ModalController extends DocumentController {
	constructor(documentLoader, template, data, callback) {
		super(documentLoader, template, null, null, data);
		this._callback = callback;
	}

	fetchData() {
		console.log("HERE");
		return Promise.resolve({ data: this._data });
	}

	handleDocument(document, loadingDocument) {
		navigationDocument.presentModal(document);
	}

	handleSelect(event) {
		const target = event.target;

		console.log("Dismissing modal");
		navigationDocument.dismissModal();
		this._callback(event);
	}
}

ModalController.preventLoadingDocument = true