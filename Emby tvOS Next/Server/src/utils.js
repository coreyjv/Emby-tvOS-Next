import Templates from './Templates';
import InternationalData from './InternationalData';

function parsedTemplate(template, context) {
	return Templates[template](context, { data: { intl: InternationalData[Settings.language] } });
}

/**
 * Convenience function to create a TVML alert document with a title and description.
 */
export function createAlertDocument(title, description) {
	let parsedTemp = parsedTemplate("./templates/Alert.xml", {title, description});
	return new DOMParser().parseFromString(parsedTemp, "application/xml");
}

/**
 * Convenience function to create a TVML alert document with a title and description.
 */
export function createDescriptiveAlertDocument(title, description) {
	let parsedTemp = parsedTemplate("./templates/DescriptiveAlert.xml", {title, description, intlDescription: description.startsWith("messages.")});
	return new DOMParser().parseFromString(parsedTemp, "application/xml");
}

export function createRouteHandlerError(data) {
	let parsedTemp = parsedTemplate("./templates/RouteHandlerAlert.xml", data);
	return new DOMParser().parseFromString(parsedTemp, "application/xml");
}

const loadingDocument = new DOMParser().parseFromString(parsedTemplate("./templates/LoadingDocument.xml", {}), "application/xml");
/**
 * Convenience function to create a TVML loading document with a specified title.
 */
export function createLoadingDocument(title) {
	title = title || InternationalData[Settings.language].messages.loading;

	const titleTag = loadingDocument.getElementsByTagName("title").item(0);
	const titleDataItem = new DataItem();
	titleDataItem.title = title;

	titleTag.dataItem = titleDataItem;
	return loadingDocument;
}