import InternationalData from '../InternationalData';
import SectionItemAdapter from '../services/SectionItemAdapter';

export default class HomeViewModel {
	constructor(libraries, continueWatchingItems) {
		this.librariesShelf = new DataItem();
		this.librariesShelf.setPropertyPath("title",InternationalData[Settings.language].messages.homeview.libraries);
		
		const libraryDataItems = libraries.map((library) => {
			return SectionItemAdapter.toSectionDataItem(library, "library");
		});

		this.librariesShelf.setPropertyPath("libraries", libraryDataItems);

		this.continueWatchingShelf = new DataItem();
		this.continueWatchingShelf.setPropertyPath("title",InternationalData[Settings.language].messages.homeview.continueWatching);
		
		const continueWatchingDataItems = continueWatchingItems.map((continueWatchingItem) => {
			return SectionItemAdapter.toSectionDataItem(continueWatchingItem, continueWatchingItem.Type);
		});

		this.continueWatchingShelf.setPropertyPath("continueWatchingItems", continueWatchingDataItems);
	}
}