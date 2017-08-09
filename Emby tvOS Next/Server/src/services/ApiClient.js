import InternalApiClient from '../services/emby-apiclient';

let apiClient;

class ApiClient {
	constructor(server, apiKey, userId) {
		
		apiClient = new InternalApiClient(server, "test");
		apiClient.setAuthenticationInfo(apiKey, userId);
		console.log("HERE A", apiClient);
	}
}

export { apiClient, ApiClient };