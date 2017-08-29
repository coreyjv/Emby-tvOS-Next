import SectionItemAdapter from '../services/SectionItemAdapter';

export default class GenresViewModel {
	constructor(genres) {
		this.genres = new DataItem();
		
		const genresDataItems = genres.map((genre) => {
			return SectionItemAdapter.toSectionDataItem(genre, genre.Type);
		});

		this.genres.setPropertyPath("genres", genresDataItems);
	}
}