import SectionItemAdapter from '../services/SectionItemAdapter';

export default class AllMoviesViewModel {
	constructor(movies) {
		this.moviesGrid = new DataItem();
		
		const moviesDataItems = movies.map((movie) => {
			return SectionItemAdapter.toSectionDataItem(movie, movie.Type);
		});

		this.moviesGrid.setPropertyPath("movies", moviesDataItems);
	}
}