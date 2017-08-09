import Handlebars from 'handlebars';

function requireAll(requireContext) {
	let templateKeys = requireContext.keys();
	console.log("keys", templateKeys);
	const templateMap = {};
	const templates = templateKeys.map(requireContext);
	console.log("templates", templates);

	templateKeys.forEach(function(templateRef, idx) {
		console.log("typeof", typeof templates[idx]);
		templateMap[templateRef] = Handlebars.compile(templates[idx]);
	});

	return templateMap;
}

export default requireAll(require.context("./", true, /^\.\/.*\.xml$/));