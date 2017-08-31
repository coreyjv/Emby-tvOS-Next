import {apiClient, ApiClient} from './ApiClient';

/// TEMPORARY
const server = "http://emby:8096";
const apiKey = "830ca1260b294dcfa03f09235d97a7c4";
const currentUserId = "fef1c74c6aa148c499648b7a208cfc2f";
new ApiClient(server, apiKey, currentUserId);
///  TEMPORARY

async function getSimilarMovies(movie) {
	console.log("Attempting to retrieve similar movies for movie with id", movie.Id);
	const similarMovies = await apiClient.getSimilarItems(movie.Id, {
		userId: currentUserId,
		itemId: movie.Id,
		parentId: movie.ParentId,
		fields: "PrimaryImageAspectRatio,ParentId",
		limit: 20,
		includeItemTypes: "Movie"
	});
	console.log("Retrieved similar movies", similarMovies);
	return similarMovies.Items;
}

function getSpecialFeatures(movieId) {
	console.log("Getting special features for item with id", movieId);
	return apiClient.getSpecialFeatures(currentUserId, movieId);
}

async function getItem(itemId) {
	console.log("Attempting to get Item with Id", itemId);
	const item = await apiClient.getItem(currentUserId, itemId);
	console.log("Retrieved item", itemId);
	return item;
}

async function getMovieWithSimilarMovies(movieId) {
	console.log("Attempting to retrieve movie and similar movies for movie with id", movieId);
	
	const movieWithSimilarMovies = await getItem(movieId)
										.then(movie => Promise.all([movie, getSimilarMovies(movie)]));
	
	console.log("Retrieved movie and similar items", movieWithSimilarMovies);

	return {
		movie: movieWithSimilarMovies[0],
		similarMovies: movieWithSimilarMovies[1]
	};
}

async function getUserViews(userId) {
	console.log("Attempting to retrieve user views for user with id", userId);

	const userViews = await apiClient.getUserViews(userId);

	console.log("Retrieved user views", userViews);

	console.log("Filtering out unwanted views");

	const filteredUserViews = userViews.Items
		.filter(userView => userView.CollectionType !== "playlists");

	return filteredUserViews;
}

async function getContinueWatchingItems(userId) {
	console.log("Attempting to retrieve continue watching items for user with id", userId);

	const continueWatchingItems = await apiClient.getItems(userId, {
		recursive: true,
		fields: "PrimaryImageAspectRatio,ParentId",
		includeItemTypes: ["Movie", "Episode", "Video"],
		filters: ["IsResumable"],
		excludeLocationTypes: "Virtual",
		sortOrder: "descending",
		sortBy: "DatePlayed",
		limit: 40,
		EnableTotalRecordCount: false
	});

	console.log("Retrieved continue watching items", continueWatchingItems);

	return continueWatchingItems.Items;
}

//TODO pagination
async function getLatestMedia(userId, libraryId, libraryName) {
	console.log("Attempting to retrieve latest media for user with id, library id and library name", userId, libraryId, libraryName);

	const latestMediaUrl = apiClient.getUrl(`Users/${userId}/Items/Latest`, {
		fields: "PrimaryImageAspectRatio,ParentId",
		imageTypeLimit: 1,
		enableImageTypes: "Primary",
		limit: 40,
		EnableTotalRecordCount: false,
		ParentId: libraryId
	});

	console.log("Latest media URL", latestMediaUrl);

	const latestMediaItems = await apiClient.getJSON(latestMediaUrl);

	console.log("Retrieved latest media", latestMediaItems);

	return { name: libraryName, 
		items: latestMediaItems
	};
}

async function getNextUpEpisodes(userId) {
	console.log("Attempting to retrieve next up episodes for user with id", userId);

	const nextUpEpisodes = await apiClient.getNextUpEpisodes({
		userId: userId,
		fields: "PrimaryImageAspectRatio,ParentId",
		limit: 40,
		EnableTotalRecordCount: false
	});

	console.log("Retrieved next up episodes", nextUpEpisodes);

	return nextUpEpisodes.Items;
}

async function getUserConfiguration(userId) {
	console.log("Attempting to retrieve configuration for user with id", userId);

	const user = await apiClient.getUser(userId);

	console.log("Retrieved user", user);

	return user.Configuration;
}

async function getMovies(movieLibraryId, startIndex, pageSize) {
	console.log("Attempting to retrieve movies from library with id, startIndex and pageSize", movieLibraryId, startIndex, pageSize);

	const movies = await apiClient.getItems(currentUserId, {
		parentId: movieLibraryId,
		fields: "PrimaryImageAspectRatio,ParentId",
		includeItemTypes: ["Movie"],
		startIndex: startIndex,
		limit: pageSize,
		recursive: true,
		SortBy: 'SortName',
		SortOrder: 'Ascending', 
		EnableTotalRecordCount: false
	});

	console.log("Retrieved movies", movies);

	return movies.Items;
}

async function getFavoriteMovies(movieLibraryId, startIndex, pageSize) {
	console.log("Attempting to retrieve favorite movies from library with id, startIndex and pageSize", movieLibraryId, startIndex, pageSize);

	const movies = await apiClient.getItems(currentUserId, {
		parentId: movieLibraryId,
		fields: "PrimaryImageAspectRatio,ParentId",
		includeItemTypes: ["Movie"],
		startIndex: startIndex,
		limit: pageSize,
		recursive: true,
		SortBy: 'SortName',
		SortOrder: 'Ascending', 
		IsFavorite: true,
		EnableTotalRecordCount: false
	});

	console.log("Retrieved favorite movies", movies);

	return movies.Items;
}

async function getMovieGenres(movieLibraryId) {
	console.log("Attempting to retrieve genres for movie library with id", movieLibraryId);

	const genres = await apiClient.getGenres(currentUserId, {
		parentId: movieLibraryId,
		includeItemTypes: ["Movie"],
		recursive: true,
		SortBy: 'SortName',
		SortOrder: 'Ascending', 
		EnableTotalRecordCount: false
	});

	console.log("Retrieve genres", genres);

	return genres.Items;
}

async function getMoviesByGenre(movieLibraryId, genreId, startIndex, pageSize) {
	console.log("Attempting to retrieve movies from library with id and in genre with Id, startIndex and pageSize", movieLibraryId, genreId, startIndex, pageSize);

	const movies = await apiClient.getItems(currentUserId, {
		parentId: movieLibraryId,
		GenreIds: [genreId],
		fields: "PrimaryImageAspectRatio,ParentId",
		includeItemTypes: ["Movie"],
		startIndex: startIndex,
		limit: pageSize,
		recursive: true,
		SortBy: 'SortName',
		SortOrder: 'Ascending', 
		EnableTotalRecordCount: false
	});

	console.log("Retrieved movies", movies);

	return movies.Items;
}

async function getBoxSetChildren(boxSetId) {
	console.log("Attempting to retrieve boxset children with boxset id", boxSetId);

	const boxSetChildren = await apiClient.getItems(currentUserId, {
		parentId: boxSetId,
		fields: "PrimaryImageAspectRatio,CanDelete,Overview,Genres"
	});

	console.log("Retrieved boxset children", boxSetChildren);

	return boxSetChildren.Items;
}

async function getBoxSetDetailWithChildren(boxSetId) {
	console.log("Attempting to retrieve boxset and children for boxset with id", boxSetId);
	
	const boxSetDetailWithItems = await Promise.all([getItem(boxSetId), getBoxSetChildren(boxSetId)]);

	console.log("Retrieved boxset detail and children", boxSetDetailWithItems);

	return {
		boxSetDetail: boxSetDetailWithItems[0],
		boxSetChildren: boxSetDetailWithItems[1]
	};
}

function getLatestMediaLibraries(latestItemsExcludes, libraries) {
	const librariesSet = new Set(libraries);

	console.log("Libraries", librariesSet);

	const excludeLibraryIds = new Set(latestItemsExcludes);

	console.log("excludeLibraryIds", excludeLibraryIds);

	const latestMediaLibraries = [...librariesSet].filter(library => !excludeLibraryIds.has(library.Id));

	console.log("Latest Media Libraries", latestMediaLibraries);

	return latestMediaLibraries;
}

function getLiveTvLibraryId(libraries) {
	return libraries.find(library => library.CollectionType === "livetv").Id;
}

class EmbyService {
	constructor() {
	}

	async getMovieDetail(movieId) {
		return Promise.all([getMovieWithSimilarMovies(movieId), getSpecialFeatures(movieId)])
				.then(values => {
					return { movie: values[0].movie, similarMovies: values[0].similarMovies, specialFeatures: values[1] }; 
				});
	}

	async getBoxSetDetail(boxSetId) {
		return getBoxSetDetailWithChildren(boxSetId);
	}

	async getMovieGenres(movieLibraryId) {
		return getMovieGenres(movieLibraryId);
	}

	async getMoviesByGenre(movieLibraryId, genreId, startIndex, pageSize) {
		return getMoviesByGenre(movieLibraryId, genreId, startIndex, pageSize);
	}

	async getMovies(movieLibraryId, startIndex, pageSize) {
		return getMovies(movieLibraryId, startIndex, pageSize);
	}

	async getFavoriteMovies(movieLibraryId, startIndex, pageSize) {
		return getFavoriteMovies(movieLibraryId, startIndex, pageSize);
	}

	async getHome(userId) {
		return Promise.all([getUserConfiguration(currentUserId), 
			getUserViews(currentUserId),
			getContinueWatchingItems(currentUserId),
			getNextUpEpisodes(currentUserId)])
			.then(values => {
				const [userConfiguration, libraries, continueWatchingItems] = values;

				const liveTvLibraryId = getLiveTvLibraryId(libraries);

				const latestMediaPromises = getLatestMediaLibraries([...userConfiguration.LatestItemsExcludes, liveTvLibraryId], libraries)
					.map(latestMediaLibrary => getLatestMedia(currentUserId, latestMediaLibrary.Id, latestMediaLibrary.Name));

				// Upcoming check settings -- local settings seems to be Apple TV Specific
				// Then retrieve

				// Live TV w/ Latest Recordings and On Now
				// getOnNow(currentUserId, getLiveTvLibraryId(liveTvLibraryId))
				// getLatestRecordings(currentUserId, getLiveTvLibraryId(liveTvLibraryId))

				// Promise.all(getOnNow(),, getLatestRecordings(), Promise.all(latestMediaPromises))
				return Promise.all(latestMediaPromises)
					.then(latestMediaValues => {
						return [libraries, continueWatchingItems, latestMediaValues];
					});
			});
	}
}

export default new EmbyService();