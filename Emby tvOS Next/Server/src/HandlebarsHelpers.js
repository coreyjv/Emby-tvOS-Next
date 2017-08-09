export default class HandlebarsHelpers {
	static registerWith(handlebars) {
		handlebars.registerHelper('jsonStringify', function(context) {
			return JSON.stringify(context);
		});
	}
}