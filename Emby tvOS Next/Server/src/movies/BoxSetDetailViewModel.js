
import InternationalData from '../InternationalData';
import SectionItemAdapter from '../services/SectionItemAdapter';
import {apiClient} from '../services/ApiClient';

export default class BoxSetDetailViewModel {
	constructor(boxSetInfo) {
		this.boxSetDataItem = new DataItem();
		this.boxSetDataItem.title = boxSetInfo.boxSetDetail.Name;
		this.boxSetDataItem.description = boxSetInfo.boxSetDetail.Overview;
		this.boxSetDataItem.childrenCount = boxSetInfo.boxSetChildren.length;
		this.boxSetDataItem.canDelete = boxSetInfo.boxSetDetail.CanDelete === true;
		this.boxSetDataItem.canPlay = boxSetInfo.boxSetDetail.PlayAccess === "Full"; //TODO playbackManager can play

		if (boxSetInfo.boxSetDetail.BackdropImageTags && boxSetInfo.boxSetDetail.BackdropImageTags[0]) {
			this.boxSetDataItem.backgroundImgUrl = apiClient.getImageUrl(boxSetInfo.boxSetDetail.Id, { type: "backdrop", index: 0});
		}

		if(boxSetInfo.boxSetDetail.ImageTags.Logo) {
			this.boxSetDataItem.heroImgUrl = apiClient.getImageUrl(boxSetInfo.boxSetDetail.Id, { type: "Logo", imageTag: boxSetInfo.boxSetDetail.ImageTags.Logo, itemId: boxSetInfo.boxSetDetail.Id});
		}

		if (boxSetInfo.boxSetDetail.OfficialRating) {
			//TODO Consolidate with MovieDetailViewModel
			this.boxSetDataItem.ratingBadgeUrl = `resource://mpaa-${boxSetInfo.boxSetDetail.OfficialRating.toLowerCase().replace('-','')}`;
		}

		if (boxSetInfo.boxSetDetail.UserData) {
			this.boxSetDataItem.hasWatched = boxSetInfo.boxSetDetail.UserData.Played;
			this.boxSetDataItem.isFavorite = boxSetInfo.boxSetDetail.UserData.IsFavorite;
		}

		this.boxSetChildrenShelf = new DataItem();
		this.boxSetChildrenShelf.setPropertyPath("title",InternationalData[Settings.language].messages.boxsetdetail.movies);

		if (boxSetInfo.boxSetChildren) {
			const boxSetChildrenDataItems = boxSetInfo.boxSetChildren.map((child) => {
				return SectionItemAdapter.toSectionDataItem(child, child.Type);
			});

			// this.boxSetChildrenShelf.setPropertyPath("boxSetChildrenItems", boxSetChlidrenDataItems);
			this.boxSetChildrenShelf.boxSetChildrenDataItems = boxSetChildrenDataItems;
		}
	}
}