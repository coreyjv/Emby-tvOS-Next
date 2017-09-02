import SectionItemAdapter from '../services/SectionItemAdapter';

export default class MovieSearchResultsViewModel {
	constructor(movies) {
		this.searchResults = new DataItem();
		
		const moviesDataItems = movies.map((movie) => {
			return SectionItemAdapter.toSectionDataItem(movie, movie.Type);
		});

		this.searchResults.setPropertyPath("movies", moviesDataItems);
	}
}