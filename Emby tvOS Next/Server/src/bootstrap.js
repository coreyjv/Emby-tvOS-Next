/*global appVersion:true*/
App.onLaunch = function (options) {
	var appScript = `app.${appVersion}.js`; // eslint-disable no-undef
	var appJs = `${options.baseURL}${appScript}`;

	// Show a loading spinner while additional JavaScript files are being evaluated
	const loadingDocument = createLoadingDocument();
	navigationDocument.pushDocument(loadingDocument);

	evaluateScripts([appJs], function (success) {
		options.appVersion = appVersion;
		
		if (success) {
			App.onLaunch(options);
		} else {
			// Handle error cases in your code. You should present a readable and user friendly
			// error message to the user in an alert dialog.
			const alertDocument = createEvalErrorAlertDocument();
			navigationDocument.replaceDocument(alertDocument, loadingDocument);
			throw new EvalError(`Unable to evaluate script ${appScript}`);
		}
	})
}

function createLoadingDocument(title) {
	// If no title has been specified, fall back to "Loading...".
	title = title || "Loading...";

	const template = `<?xml version="1.0" encoding="UTF-8" ?>
						<document>
							<loadingTemplate>
								<activityIndicator>
									<title>${title}</title>
								</activityIndicator>
							</loadingTemplate>
						</document>
						`;
	return new DOMParser().parseFromString(template, "application/xml");
}

function createAlertDocument(title, description) {
	const template = `<?xml version="1.0" encoding="UTF-8" ?>
					<document>
						<alertTemplate>
							<title>${title}</title>
							<description>${description}</description>
						</alertTemplate>
					</document>
	`;
	return new DOMParser().parseFromString(template, "application/xml");
}

/**
 * Convenience function to create a TVML alert for failed evaluateScripts.
 */
function createEvalErrorAlertDocument() {
	const title = "Evaluate Scripts Error";
	const description = [
		"There was an error attempting to load Emby",
		"Please try again later or go to https://emby.media/support.html for support"
	].join("\n\n");
	return createAlertDocument(title, description);
}
