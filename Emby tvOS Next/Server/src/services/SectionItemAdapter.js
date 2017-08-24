import ImageUrlProvider from './ImageUrlProvider';
import InternationalData from '../InternationalData';

function _getCriticBadgeUrl(criticRating) {
	return criticRating ? criticRating > 60 ? "resource://tomato-fresh" : "resource://tomato-splat" : "";
}

const strategies = {
	"library": (item) => {
		let libraryItem = new DataItem("library", item.Id);
		libraryItem.title = item.Name;
		libraryItem.url = ImageUrlProvider.getUrl(item.Id, { type: "Primary", imageTag: item.ImageTags.Primary, itemId: item.Id})

		if ( item.CollectionType ){
			libraryItem.route = `${item.CollectionType}/${item.CollectionType.substr(0,1).toUpperCase()}${item.CollectionType.substr(1, item.CollectionType.length-1)}MenuBar`;
			libraryItem.routeParams = JSON.stringify(Object.assign({}, libraryItem, { Id: item.Id }));
		}

		return libraryItem;
	}, "Movie": (item) => {
		let movieItem = new DataItem("Movie", item.Id);
		movieItem.title = item.Name;
		movieItem.subtitle = `${item.OfficialRating} (${item.ProductionYear.toString()})`;
		movieItem.url = ImageUrlProvider.getUrl(item.Id, { type: "Primary", imageTag: item.ImageTags.Primary, itemId: item.Id});
		movieItem.route = `movies/MovieDetail`;
		movieItem.routeParams = JSON.stringify(Object.assign({}, movieItem, { Id: item.Id }));

		if ( item.UserData && item.UserData.PlayedPercentage ) {
			movieItem.progress = (item.UserData.PlayedPercentage/100).toString();
		}

		if ( item.UserData && item.UserData.Played === true ) {
			movieItem.playedUrl = "resource://overlay-checkmark";
		}

		//TODO Start consolidate with movie detail view
		if ( item.Overview ) {
			movieItem.description = item.Overview;
		}

		if ( item.Genres ) {
			movieItem.genres = item.Genres.join(' / ');
		}

		if ( item.CriticRating ) {
			movieItem.criticRating = item.CriticRating;
			movieItem.criticBadgeUrl = _getCriticBadgeUrl(item.CriticRating);
		}

		if(item.RunTimeTicks) {
			movieItem.runtime = `${Math.floor(item.RunTimeTicks/600000000)} ${InternationalData[Settings.language].messages.mins}`;
		}

		if(item.OfficialRating) {
			movieItem.ratingBadgeUrl = `resource://mpaa-${item.OfficialRating.toLowerCase().replace('-','')}`;
		}

		if(item.HasSubtitles === true) {
			movieItem.subtitlesBadgeUrl = 'resource://cc';
		}

		if(item.IsHD === true) {
			movieItem.hdBadgeUrl = 'resource://hd';
		}
		//TODO End consolidate movie detail view

		return movieItem;
	}, "BoxSet": (item) => {
		let boxSetItem = new DataItem("Movie", item.Id);
		boxSetItem.title = item.Name;
		boxSetItem.subtitle = item.OfficialRating;
		boxSetItem.url = ImageUrlProvider.getUrl(item.Id, { type: "Primary", imageTag: item.ImageTags.Primary, itemId: item.Id});
		boxSetItem.route = `movies/BoxSetDetail`;
		boxSetItem.routeParams = JSON.stringify(Object.assign({}, boxSetItem, { Id: item.Id }));

		//TODO Add number of movies as badge item
		return boxSetItem;
	}, "Episode": (item) => {
		let episodeItem = new DataItem("Episode", item.Id);
		episodeItem.title = item.SeriesName;
		episodeItem.route = `episodes/EpisodeDetail`;
		episodeItem.routeParams = JSON.stringify(episodeItem);

		if ( item.ParentIndexNumber != null && item.IndexNumber != null ) {
			episodeItem.subtitle = `S${item.ParentIndexNumber}:E${item.IndexNumber} - ${item.Name}`;		
		}

		if ( item.ParentThumbItemId ) {
			episodeItem.url = ImageUrlProvider.getUrl(item.ParentThumbItemId, { type: "Thumb", imageTag: item.ParentThumbImageTag, itemId: item.ParentThumbItemId});
		} else if ( item.SeriesPrimaryImageTag ) {
			episodeItem.url = ImageUrlProvider.getUrl(item.Id, { type: "Primary", imageTag: item.ImageTags.Primary, itemId: item.Id});
		}

		if ( item.UserData && item.UserData.PlayedPercentage ) {
			episodeItem.progress = (item.UserData.PlayedPercentage/100).toString();
		}

		if ( item.UserData && item.UserData.Played === true ) {
			episodeItem.playedUrl = "resource://overlay-checkmark";
		}

		return episodeItem;
	}, "Video": (item) => {
		let videoItem = new DataItem("Video", item.Id);
		videoItem.title = item.Name;
		videoItem.url = ImageUrlProvider.getUrl(item.Id, { type: "Primary", imageTag: item.ImageTags.Primary, itemId: item.Id});
		videoItem.route = `videos/VideoDetail`;
		videoItem.routeParams = JSON.stringify(videoItem);

		if ( item.UserData && item.UserData.PlayedPercentage ) {
			videoItem.progress = (item.UserData.PlayedPercentage/100).toString();
		}

		if ( item.UserData && item.UserData.Played === true ) {
			videoItem.playedUrl = "resource://overlay-checkmark";
		}

		return videoItem;
	}, "Person": (item) => {
		let personItem = new DataItem("Person", item.Id);
		personItem.title = item.Name;
		personItem.subtitle = item.Type === "Actor" ? item.Role : item.Type;
		personItem.url = ImageUrlProvider.getUrl(item.Id, { type: "Primary", imageTag: item.PrimaryImageTag, itemId: item.Id});
		personItem.route = "people/PersonDetail";
		personItem.routeParams = JSON.stringify(Object.assign({}, personItem, { Id: item.Id }));
		return personItem;
	}, "Scene": (item) => {
		let sceneItem = new DataItem("Scene", `${item.Id}chapter${item.index}`);
		sceneItem.title = item.Name;

		const now = new Date();
		now.setHours(0);
		now.setMinutes(0);
		now.setSeconds(item.StartPositionTicks/10000000);
		sceneItem.subtitle = now.toLocaleTimeString(Settings.language, {hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false});
		sceneItem.url = ImageUrlProvider.getUrl(item.Id, { type: "Chapter", index: item.index, imageTag: item.ImageTag, itemId: item.Id});

		//TODO Routes
		//sceneItem.route = "people/PersonDetail";
		//sceneItem.routeParams = JSON.stringify(Object.assign({}, personItem, { Id: item.Id }));
		return sceneItem;
	}
};

class SectionItemAdapter {
	toSectionDataItem(item, dataItemType) {
		if ( strategies[dataItemType] ) {
			return strategies[dataItemType](item);
		} else {
			console.error("Unable to find strategy for type and item", dataItemType, item);
			return {};
		}
		
	}
}

export default new SectionItemAdapter();