import Handlebars from 'handlebars';

Handlebars.registerPartial('moviePrototype', `<lockup prototype="Movie" binding="@route:{route};@routeParams:{routeParams}">
				<img binding="@src:{url};" class="rounded-img" width="193" height="290" style="tv-placeholder: movie" contentMode="aspect-fill"/>
				<title binding="textContent:{title}" style="font-size: 28" />
				<subtitle binding="textContent:{subtitle}" style="font-size: 22" />
				<overlay class="progress-overlay">
					<badge binding="@src:{playedUrl};" class="played-checkmark" accessibility="Watched" />
					{{#if showProgress}}
					<progressBar binding="@value:{progress}" class="progress-bar"/>
					{{/if}}
				</overlay>
			</lockup>`);

Handlebars.registerPartial('scenePrototype', `<lockup prototype="Scene">
				<img binding="@src:{url};" class="rounded-img" width="515" height="290" style="tv-placeholder: movie" contentMode="aspect-fill" />
				<title binding="textContent:{title}" style="font-size: 28" />
				<subtitle binding="textContent:{subtitle}" style="font-size: 22" />
			</lockup>`);

Handlebars.registerPartial('personPrototype', `<lockup prototype="Person" binding="@route:{route};@routeParams:{routeParams}">
				<img binding="@src:{url};" class="rounded-img" width="150" height="225" style="tv-placeholder: movie" contentMode="aspect-fill"/>
				<title binding="textContent:{title}" style="font-size: 28" />
				<subtitle binding="textContent:{subtitle}" style="font-size: 22" />
			</lockup>`);

Handlebars.registerPartial('videoPrototype', `<lockup prototype="Video" binding="@route:{route};@routeParams:{routeParams}">
				<img binding="@src:{url};" class="rounded-img" width="515" height="290" style="tv-placeholder: movie" contentMode="aspect-fill" />
				<title binding="textContent:{title}" style="font-size: 28" />
				<overlay class="progress-overlay">
					<badge binding="@src:{playedUrl};" class="played-checkmark" accessibility="Watched" />
					<progressBar binding="@value:{progress}" class="progress-bar"/>
				</overlay>
			</lockup>`);

Handlebars.registerPartial('episodePrototype', `<lockup prototype="Episode" binding="@route:{route};@routeParams:{routeParams}">
				<img binding="@src:{url};" class="rounded-img" width="515" height="290" style="tv-placeholder: tv" contentMode="aspect-fill"/>
				<title binding="textContent:{title}" style="font-size: 28" />
				<subtitle binding="textContent:{subtitle}" style="font-size: 22"/>
				<overlay class="progress-overlay">
					<badge binding="@src:{playedUrl};" class="played-checkmark" accessibility="Watched" />
					<progressBar binding="@value:{progress}" class="progress-bar"/>
				</overlay>
			</lockup>`);

Handlebars.registerPartial('libraryPrototype', `<lockup prototype="library" binding="@route:{route};@routeParams:{routeParams}">
				<img binding="@src:{url};" class="rounded-img" width="426" height="240" contentMode="aspect-fill"/>
				<title binding="textContent:{title}" />
			</lockup>`);

Handlebars.registerPartial('playButton', `{{#if canPlay}}
					<buttonLockup>
						<badge src="resource://button-play" />
						<title>{{formatMessage (intlGet "messages.playAll")}}</title>
					</buttonLockup>
					{{/if}}`);

Handlebars.registerPartial('shuffleButton', `{{#if canShuffle}}
					<buttonLockup>
						<badge src="resource://button-shuffle" />
						<title>{{formatMessage (intlGet "messages.shuffle")}}</title>
					</buttonLockup>
					{{/if}}`);

Handlebars.registerPartial('favoriteButton', `<buttonLockup>
						{{#if isFavorite}}
						<badge src="resource://button-rated" class="red" />
						{{else}}
						<badge src="resource://button-rated" />
						{{/if}}
						<title>{{formatMessage (intlGet "messages.favorite")}}</title>
					</buttonLockup>`);

Handlebars.registerPartial('watchedButton', `<buttonLockup>
						{{#if hasWatched}}
						<badge src="resource://button-checkmark" class="red"/>
						{{else}}
						<badge src="resource://button-checkmark" />
						{{/if}}
						<title>{{formatMessage (intlGet "messages.watched")}}</title>
					</buttonLockup>`);

Handlebars.registerPartial('deleteButton', `{{#if canDelete}}
					<buttonLockup>
						<badge src="resource://button-remove" />
						<title>{{formatMessage (intlGet "messages.delete")}}</title>
					</buttonLockup>
					{{/if}}`);

Handlebars.registerPartial('styles', `
			.rounded-img {
				tv-img-treatment: corner-small;
			}

			.show-text-on-highlight {
				tv-text-highlight-style: show-on-highlight;
			}

			.banner-overlay {
				background-color: rgba(0, 0, 0, 0.7)
			}

			.progress-bar {
				tv-position: footer;
				tv-tint-color: rgb(82, 180, 75);
				margin: 0;
			}

			.progress-overlay {
				padding: 0;
			}

			.played-checkmark {
				tv-position: bottom-trailing;
				tv-align: trailing;
				tv-tint-color: rgb(82, 180, 75);
				tv-highlight-color: rgb(82, 180, 75);
			}
			.white {
				tv-tint-color: rgb(255,255,255);
			}

			.red {
				tv-tint-color: rgb(203, 39, 42);
			}`);