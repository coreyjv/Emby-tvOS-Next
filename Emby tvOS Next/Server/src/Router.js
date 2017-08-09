import {createLoadingDocument, createRouteHandlerError} from './utils';

class Router {
	constructor() {
		this._controllers = [];
	}

	routeHandler(route) {
		const candidateHandlers = this._controllers.filter(controller => controller.handlesRoute(route));

		console.log("candidateHandlers", candidateHandlers);
		if(candidateHandlers.length !== 0) {
			return candidateHandlers[0];
		}
	}

	handleRoute(triggeredElement, documentLoader) {
		const route = triggeredElement.getAttribute("route");
		
		if (route) {
			console.log("Route", route);

			const RouteHandler = this.routeHandler(route);
			const routeParams = JSON.parse(triggeredElement.getAttribute("routeParams"));

			if (RouteHandler) {
				let loadingDocument;

				if (!RouteHandler.preventLoadingDocument) {
					loadingDocument = createLoadingDocument(routeParams.title);
					navigationDocument.pushDocument(loadingDocument);
				}

				console.log("Route Params", routeParams);

				new RouteHandler(documentLoader, route, loadingDocument, routeParams);

				return true;
			} else {
				const alertDoc = createRouteHandlerError({route, routeParams: JSON.stringify(routeParams)});
				navigationDocument.presentModal(alertDoc);
				console.error('Unable to find route handler for route and routeParams ', route, routeParams);
			}
		}

		return false;
	}

	registerController(controller) {
		this._controllers.push(controller);
	}
}
export default new Router();