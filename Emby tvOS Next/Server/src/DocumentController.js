import Router from './Router';
import {createDescriptiveAlertDocument} from './utils';


export default class DocumentController {

	constructor(documentLoader, template, loadingDocument, routeParams, data) {
		this.handlePlay = this.handlePlay.bind(this);
		this.handleSelect = this.handleSelect.bind(this);
		this.handleHighlight = this.handleHighlight.bind(this);
		this.handleHoldSelect = this.handleHoldSelect.bind(this);
		this._documentLoader = documentLoader;
		this._loadingDocument = loadingDocument;
		this._data = data;
		this.fetchDocument(template, routeParams);
	}

	fetchDocument(template, routeParams) {
		this.fetchData(routeParams).then(({ data, templateOverride }) => {
			if ( templateOverride ) {
				console.log("Overriding default template with the following", template, templateOverride);
				this._document = this._documentLoader.fetchDocument({template: templateOverride, context: data});
			} else {
				this._document = this._documentLoader.fetchDocument({template: template, context: data});
			}
			

			// Add the event listener for document
			this.setupDocument(this._document);

			// Allow subclass to do custom handling for this document
			this.handleDocument(this._document, this._loadingDocument);
			this.bindData(this._document);
		});
	}

	fetchData() {
		return Promise.resolve();
	}

	setupDocument(document) {
		document.addEventListener("select", this.handleSelect);
		document.addEventListener("play", this.handlePlay);
		document.addEventListener("highlight", this.handleHighlight);
		document.addEventListener("holdselect", this.handleHoldSelect);
	}

	handleDocument(document, loadingDocument) {
		if (loadingDocument) {
			navigationDocument.replaceDocument(document, loadingDocument);
		} else {
			navigationDocument.pushDocument(document);
		}
	}

	bindData() { }

	handleSelect(event) {
		const target = event.target;

		if ( target.tagName === "description" ) {
			const descriptionDocument = createDescriptiveAlertDocument(null, target.innerHTML);
			navigationDocument.presentModal(descriptionDocument);
		}

		const routeHandled = Router.handleRoute(target, this._documentLoader);

		if (!routeHandled) {
			console.log("Action wasn't routed");
			console.log("The select event most likely needs to be handled for target", target);
			// Push Descriptive alert template?
		}
	}

	handlePlay(event) {

	}

	handleHighlight(event) {

	}

	handleHoldSelect(event) {
		console.log("EVENT", event);
	}
}