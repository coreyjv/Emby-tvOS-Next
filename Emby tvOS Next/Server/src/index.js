import {createLoadingDocument} from './utils';
import TemplatedDocumentLoader from './TemplatedDocumentLoader';
import HomeMenuBarController from './home/HomeMenuBarController';
/* eslint-disable no-unused-vars */
//TODO Implement a 'requireall' for controllers
import HomeController from './home/HomeController';
import MoviesMenuBarController from './movies/MoviesMenuBarController';
import AllMoviesController from './movies/AllMoviesController';
import MovieDetailController from './movies/MovieDetailController';
import BoxSetDetailController from './movies/BoxSetDetailController';
import HandlebarsPartials from './HandlebarsPartials';
/* eslint-enable no-unused-vars */

import Handlebars from 'handlebars';
import HandlebarsHelpers from './HandlebarsHelpers';

import HandlebarsIntl from 'handlebars-intl';
import InternationalData from './InternationalData';

//TODO App upate check
App.onLaunch = function(options) {
	App.appVersion = options.appVersion;

	HandlebarsIntl.registerWith(Handlebars);
	HandlebarsHelpers.registerWith(Handlebars);

	const baseURL = options.baseURL;

    // Show a loading spinner while the first view is being loaded
	const loadingDocument = createLoadingDocument();
	navigationDocument.pushDocument(loadingDocument);

	const documentLoader = new TemplatedDocumentLoader(baseURL,InternationalData[Settings.language]);

    // Instantiate the controller with root template. The controller is passed in the loading document which
    // was pushed while scripts were being evaluated, and controller will replace it with root template once
    // fetched from the server.
	new HomeMenuBarController(documentLoader, "templates/MenuBar", loadingDocument);
}

App.onWillResignActive = function() {

}

App.onDidEnterBackground = function() {

}

App.onWillEnterForeground = function() {
    
}

App.onDidBecomeActive = function() {
    
}

App.onWillTerminate = function() {
    
}
