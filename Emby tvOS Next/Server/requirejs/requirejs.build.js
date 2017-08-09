({
	out: '../src/services/emby-apiclient.js',
	baseUrl: '../bower_components',
	name: 'emby-apiclient/apiclient',
	paths: {
		events: 'emby-apiclient/events',
		credentialprovider: 'emby-apiclient/credentials',
		connectservice: 'emby-apiclient/connectservice',
		wakeonlan: "emby-apiclient/wakeonlan",
		appStorage: 'emby-apiclient/appstorage-localstorage',
		'cryptojs-md5': '../requirejs/cryptojs-md5',
		'cryptojs-sha1': '../requirejs/cryptojs-sha1'
	},
	shim: {
		"cryptojslib/components/sha1-min": {
			deps: ["cryptojslib/components/core-min"]
		},
		"cryptojslib/components/md5-min": {
			deps: ["cryptojslib/components/core-min"]
		}
	},
	findNestedDependencies: true
})