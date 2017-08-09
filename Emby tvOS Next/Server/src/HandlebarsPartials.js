import Handlebars from 'handlebars';

Handlebars.registerPartial('moviePrototype', `<lockup prototype="Movie" binding="@route:{route};@routeParams:{routeParams}">
				<img binding="@src:{url};" class="rounded-img" width="193" height="290" style="tv-placeholder: movie" contentMode="aspect-fill"/>
				<title binding="textContent:{title}" style="font-size: 28" />
				<subtitle binding="textContent:{subtitle}" style="font-size: 22" />
				<overlay>
					<badge binding="@src:{playedUrl};" class="{{playedCheckmarkClass}}" accessibility="Watched" />
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
				<overlay>
					<badge binding="@src:{playedUrl};" class="played-checkmark" accessibility="Watched" />
					<progressBar binding="@value:{progress}" class="progress-bar"/>
				</overlay>
			</lockup>`);

Handlebars.registerPartial('episodePrototype', `<lockup prototype="Episode" binding="@route:{route};@routeParams:{routeParams}">
				<img binding="@src:{url};" class="rounded-img" width="515" height="290" style="tv-placeholder: tv" contentMode="aspect-fill"/>
				<title binding="textContent:{title}" style="font-size: 28" />
				<subtitle binding="textContent:{subtitle}" style="font-size: 22"/>
				<overlay>
					<badge binding="@src:{playedUrl};" class="played-checkmark" accessibility="Watched" />
					<progressBar binding="@value:{progress}" class="progress-bar"/>
				</overlay>
			</lockup>`);

Handlebars.registerPartial('libraryPrototype', `<lockup prototype="library" binding="@route:{route};@routeParams:{routeParams}">
				<img binding="@src:{url};" class="rounded-img" width="426" height="240" contentMode="aspect-fill"/>
				<title binding="textContent:{title}" />
			</lockup>`);

Handlebars.registerPartial('styles', `
			.rounded-img {
				tv-img-treatment: corner-small;
			}

			.progress-bar {
				tv-tint-color: rgb(82, 180, 75);
				margin:0 -30 -36 -30;
			}
			
			.played-checkmark {
				tv-position: header;
				tv-align: right;
				tv-tint-color: rgb(82, 180, 75);
				tv-highlight-color: rgb(82, 180, 75);
				margin: -15 -10;
				width: 40;
				height: 40;
			}
			
			.played-checkmark2 {
				tv-position: header;
				tv-align: right;
				tv-tint-color: rgb(82, 180, 75);
				tv-highlight-color: rgb(82, 180, 75);
				margin: 10 10;
				width: 40;
				height: 40;
			}

			.white {
				tv-tint-color: rgb(255,255,255);
			}

			.red {
				tv-tint-color: rgb(203, 39, 42);
			}`);