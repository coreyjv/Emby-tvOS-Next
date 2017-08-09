import DocumentController from './DocumentController';

export default class ModalController extends DocumentController {
	constructor(documentLoader, template, data) {
		super(documentLoader, template, null, null);
		this._data = data;
	}

	fetchData() {
		return Promise.resolve(this._data);
	}

	handleDocument(document, loadingDocument) {
		navigationDocument.presentModal(document);
	}

	handleSelect(event) {
		const target = event.target;

		console.log("Dismissing modal");
		navigationDocument.dismissModal();
	}
}