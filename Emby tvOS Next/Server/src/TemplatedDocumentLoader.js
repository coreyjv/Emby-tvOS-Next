import Templates from './Templates';

export default class TemplatedDocumentLoader {
	constructor(baseURL, intlData) {
		this.prepareURL = this.prepareURL.bind(this);
		this.prepareElement = this.prepareElement.bind(this);
		this.baseURL = baseURL;
		this._domParser = new DOMParser();
		this._intlData = intlData;
	}

		/*
		 * Helper method to request templates from the server
		 */
	fetchDocument(options) {
		console.log("Fetching with options", options);

		if (typeof options.template !== "string") {
			throw new TypeError("DocumentLoader.fetch: template option must be a string.");
		}

		let templateKey = this.prepareTemplateKey(options.template);

		var document = Templates[templateKey];

		let newResponseDoc;

		try {
			newResponseDoc = document(options.context, { data: { intl: this._intlData } });
		} catch(e) {
			console.log("Error", e);
		}
			
		console.log("newResponseDoc", newResponseDoc);

		let parsedResponseDoc;

		try {
			parsedResponseDoc = this._domParser.parseFromString(newResponseDoc, "application/xml");
		} catch(e) {
			console.log("Error", e);
		}
		
		console.log("parsedResponseDoc", parsedResponseDoc);
		this.prepareDocument(parsedResponseDoc);
		console.log("Parsed document", parsedResponseDoc);
		return parsedResponseDoc;
	}

	prepareTemplateKey(template) {
		let modifiedTemplatePath;

		if(!template.startsWith("./")) {
			modifiedTemplatePath = "./" + template;
		}

		if(!template.endsWith(".xml")) {
			modifiedTemplatePath = modifiedTemplatePath + ".xml";
		}
		return modifiedTemplatePath;
	}
	/*
	 * Helper method to convert a relative URL into an absolute URL
	 */
	prepareURL(url) {
		// Handle URLs relative to the "server root" (baseURL)
		if (url.indexOf("/") === 0) {
			url = this.baseURL + url.substr(1);
		}
		return url;
	}

	/*
	 * Helper method to mangle relative URLs in XMLHttpRequest response documents
	 */
	prepareDocument(document) {
		let imgElemsQuery = ".//*[@src | @srcset]";
		const ORDERED_NODE_SNAPSHOT_TYPE = 7;
		let imgElemsResult = document.evaluate(imgElemsQuery, document, null, ORDERED_NODE_SNAPSHOT_TYPE);
		for (let i = 0, elem; i < imgElemsResult.snapshotLength; ++i) {
			elem = imgElemsResult.snapshotItem(i);
			this.prepareElement(elem)
		}
	}

	/*
	 * Helper method to mangle relative URLs in DOM elements
	 */
	prepareElement(elem) {
		if (elem.hasAttribute("src")) {
			const rawSrc = elem.getAttribute("src");
			const parsedSrc = this.prepareURL(rawSrc);
			elem.setAttribute("src", parsedSrc);
		}
		if (elem.hasAttribute("srcset")) {
			const rawSrcSet = elem.getAttribute("srcset");
			const parsedSrcSet = rawSrcSet.split(/\s*,\s*/).map((source) => {
				source = source.trim();
				const [rawURL] = source.split(/\s+/, 1);
				const parsedURL = this.prepareURL(rawURL);
				const descriptor = source.substr(rawURL.length);
				if (descriptor.length) {
					return parsedURL + " " + descriptor;
				} else {
					return parsedURL;
				}
			}).join(", ");
			elem.setAttribute("srcset", parsedSrcSet);
		}
	}

}
