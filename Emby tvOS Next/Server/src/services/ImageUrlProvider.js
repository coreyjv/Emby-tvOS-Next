import {apiClient} from './ApiClient';

class ImageUrlProvider {
	getUrl(itemId, options) {
		return apiClient.getImageUrl(itemId, options);
	}
}

export default new ImageUrlProvider();