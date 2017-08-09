import {createLoadingDocument} from './utils';
import DocumentController from './DocumentController';
import Router from './Router';

export default class MenuBarController extends DocumentController {

	fetchDocument(template, routeParams) {
		this.fetchData(routeParams).then(data => {
			const menuBarDocument = this._documentLoader.fetchDocument({ template: template, context: data });
			const menuBarElem = menuBarDocument.getElementsByTagName("menuBar").item(0);
			menuBarElem.addEventListener("select", (event) => {
				this.selectMenuItem(event.target);
			});

			// Pre-load the document for the initial focused menu item or first item,
			// before presenting the menuBarTemplate on navigation stack.
			// NOTE: Pre-loading is optional
			const initialMenuItemElem = this.findInitialMenuItem(menuBarElem);
			this.selectMenuItem(initialMenuItemElem, true, routeParams, () => {
				this.handleDocument(menuBarDocument, this._loadingDocument);
			});
		});
	}

	findInitialMenuItem(menuBarElem) {
		let highlightIndex = 0;
		const menuItemElems = menuBarElem.childNodes;
		for (let i = 0; i < menuItemElems.length; i++) {
			if (menuItemElems.item(i).hasAttribute("autoHighlight") && menuItemElems.item(i).getAttribute("autoHighlight") == true) {
				highlightIndex = i;
				break;
			}
		}
		return menuItemElems.item(highlightIndex);
	}

	selectMenuItem(menuItemElem, isInitialItem, routeParams, doneCallback) {
		const menuBarElem = menuItemElem.parentNode;
		const menuBarFeature = menuBarElem.getFeature("MenuBarDocument");
		const existingDocument = menuBarFeature.getDocument(menuItemElem);

		if (!existingDocument) {
			const route = menuItemElem.getAttribute("route");
			if (route) {
				if (!isInitialItem) {
					menuBarFeature.setDocument(createLoadingDocument(), menuItemElem);
				}
				const controllerClass = Router.routeHandler(route);
				const controller = new controllerClass(this._documentLoader, route, this._loadingDocument, routeParams);
				controller.handleDocument = (document) => {
					if (isInitialItem) {
						menuBarFeature.setDocument(document, menuItemElem);
					} else {
                        // Force timeout to convey intent of displaying loading while the
                        // content is being loaded from server
						setTimeout(function() {
                            // Override the presentation of controller since this controller
                            // is child of menuBar and doesn't get pushed on the navigation stack
							menuBarFeature.setDocument(document, menuItemElem);
						}, 200);
					}
					doneCallback && doneCallback();
				};
			}
		}
	}

}