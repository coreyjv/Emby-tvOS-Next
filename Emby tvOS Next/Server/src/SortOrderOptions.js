const sortOrderOptions = [
	{ sortByTitle: "messages.sort.Ascending", sortOrder: 'Ascending' },
	{ sortByTitle: "messages.sort.Descending", sortOrder: 'Descending' }
]

export function getSortOrderTitle(sort) {
	return sortOrderOptions.find(sortOrderOption => sortOrderOption.sortOrder === sort).sortByTitle;
}

export function getSortOrderOptions(currentSortOrder) {
	return sortOrderOptions.map((sortOrderOption) => {
		return {
			sortOrderTitle: sortOrderOption.sortByTitle,
			sortOrder: sortOrderOption.sortOrder,
			currentSelection: sortOrderOption.sortOrder === currentSortOrder
		}
	})
}