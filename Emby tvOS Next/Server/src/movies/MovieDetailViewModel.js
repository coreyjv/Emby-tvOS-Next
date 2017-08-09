
import InternationalData from '../InternationalData';
import SectionItemAdapter from '../services/SectionItemAdapter';
import {apiClient} from '../services/ApiClient';

export default class MovieDetailViewModel {
	_getCriticBadgeUrl(criticRating) {
		return criticRating ? criticRating > 60 ? "resource://tomato-fresh" : "resource://tomato-splat" : "";
	}

	constructor(movie) {
		this.movieDataItem = new DataItem();
		this.movieDataItem.title = movie.movie.Name;
		this.movieDataItem.description = movie.movie.Overview;

		this.movieDataItem.criticRating = movie.movie.CriticRating;
		this.movieDataItem.criticBadgeUrl = this._getCriticBadgeUrl(movie.movie.CriticRating);
		this.movieDataItem.canDelete = movie.movie.CanDelete === true;
		this.movieDataItem.canPlay = movie.movie.PlayAccess === "Full"; //TODO playbackManager can play

		if(movie.movie.UserData) {
			this.movieDataItem.hasWatched = movie.movie.UserData.Played;
			this.movieDataItem.isFavorite = movie.movie.UserData.IsFavorite;
		}

		if(movie.movie.UserData) {
			this.movieDataItem.hasWatched = movie.movie.UserData.Played === true;
		}

		if(movie.movie.RunTimeTicks) {
			this.movieDataItem.runtime = `${Math.floor(movie.movie.RunTimeTicks/600000000)} ${InternationalData[Settings.language].messages.mins}`;
		}

		if(movie.movie.Genres) {
			this.movieDataItem.genres = movie.movie.Genres.join(' / ');
		}

		if(movie.movie.OfficialRating) {
			this.movieDataItem.ratingBadgeUrl = `resource://mpaa-${movie.movie.OfficialRating.toLowerCase().replace('-','')}`;
		}

		if(movie.movie.HasSubtitles === true) {
			this.movieDataItem.subtitlesBadgeUrl = 'resource://cc';
		}

		if(movie.movie.IsHD === true) {
			this.movieDataItem.hdBadgeUrl = 'resource://hd';
		}

		if(movie.movie.ImageTags.Logo) {
			this.movieDataItem.heroImgUrl = apiClient.getImageUrl(movie.movie.Id, { type: "Logo", imageTag: movie.movie.ImageTags.Logo, itemId: movie.movie.Id});
		}

		if(movie.movie.ImageTags.Banner) {
			this.movieDataItem.backgroundImgUrl = apiClient.getImageUrl(movie.movie.Id, { type: "backdrop", index: 0});
		}
		
		this.castAndCrewShelf = new DataItem();
		this.castAndCrewShelf.setPropertyPath("title",InternationalData[Settings.language].messages.castAndCrew);

		const peopleDataItems = movie.movie.People.map((person) => {
			return SectionItemAdapter.toSectionDataItem(person, "Person");
		});
		this.castAndCrewShelf.setPropertyPath("castAndCrewItems", peopleDataItems);

		this.movieDataItem.infoList = [];

		const director = movie.movie.People.find(person => person.Type === "Director");
		if (director) {
			this.movieDataItem.infoList.push({text: [director.Name], header: "messages.moviedetail.director"})
		}

		if (movie.movie.PremiereDate) {
			this.movieDataItem.infoList.push({text: [new Date(movie.movie.PremiereDate).toLocaleDateString()], header: "messages.moviedetail.released"})
		}

		if(movie.movie.RunTimeTicks) {
			const now = new Date();
			now.setSeconds(now.getSeconds() + movie.movie.RunTimeTicks/10000000);
			this.movieDataItem.infoList.push({text: [now.toLocaleTimeString(Settings.language, {hour: '2-digit', minute: '2-digit'})], header: "messages.moviedetail.ends"});
		}
		

		if (movie.movie.UserData && movie.movie.UserData.LastPlayedDate) {
			this.movieDataItem.infoList.push({text: [new Date(movie.movie.UserData.LastPlayedDate).toLocaleDateString()], header: "messages.moviedetail.lastplayed"})
		}


		if(movie.movie.Chapters && movie.movie.Chapters[0].ImageTag) {
			this.scenesShelf = new DataItem();
			this.scenesShelf.setPropertyPath("title",InternationalData[Settings.language].messages.scenes);

			const scenesDataItems = movie.movie.Chapters.map((chapter, index) => {
				return SectionItemAdapter.toSectionDataItem(Object.assign({}, chapter, { Id: movie.movie.Id, index: index+1 }), "Scene");
			});
			this.scenesShelf.setPropertyPath("scenesItems", scenesDataItems);
		}

		this.similarMoviesShelf = new DataItem();
		this.similarMoviesShelf.setPropertyPath("title",InternationalData[Settings.language].messages.moviedetail.similarMovies);

		if(movie.similarMovies) {
			const similarMoviesDataItems = movie.similarMovies.map((similarMovie) => {
				return SectionItemAdapter.toSectionDataItem(similarMovie, similarMovie.Type);
			});

			this.similarMoviesShelf.setPropertyPath("similarMoviesItems", similarMoviesDataItems);
		}
	}
}