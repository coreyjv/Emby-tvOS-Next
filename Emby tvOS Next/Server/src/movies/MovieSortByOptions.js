const movieSortByOptions = [
	{ sortByTitle: "messages.sort.SortName", sortBy: 'SortName' },
	{ sortByTitle: "messages.sort.Budget", sortBy: 'Budget,SortName' },
	{ sortByTitle: "messages.sort.CommunityRating", sortBy: 'CommunityRating,SortName' },
	{ sortByTitle: "messages.sort.CriticRating", sortBy: 'CriticRating,SortName' },
	{ sortByTitle: "messages.sort.DateCreated", sortBy: 'DateCreated,SortName' },
	{ sortByTitle: "messages.sort.DatePlayed", sortBy: 'DatePlayed,SortName' },
	{ sortByTitle: "messages.sort.Metascore", sortBy: 'Metascore,SortName' },
	{ sortByTitle: "messages.sort.OfficialRating", sortBy: 'OfficialRating,SortName' },
	{ sortByTitle: "messages.sort.PlayCount", sortBy: 'PlayCount,SortName' },
	{ sortByTitle: "messages.sort.PremiereDate", sortBy: 'PremiereDate,SortName' },
	{ sortByTitle: "messages.sort.Revenue", sortBy: 'Revenue,SortName' },
	{ sortByTitle: "messages.sort.Runtime", sortBy: 'Runtime,SortName' }
]

export function getMovieSortByTitle(sort) {
	return movieSortByOptions.find(movieSortByOption => movieSortByOption.sortBy === sort).sortByTitle;
}

export function getMovieSortByOptions(currentSort) {
	return movieSortByOptions.map((movieSortOption) => {
		return {
			sortByTitle: movieSortOption.sortByTitle,
			sortBy: movieSortOption.sortBy,
			currentSelection: movieSortOption.sortBy.startsWith(currentSort)
		}
	})
}