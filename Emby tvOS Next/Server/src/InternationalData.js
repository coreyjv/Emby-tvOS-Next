export default {
	en: {
		locales: ['en-US'],
		messages: {
			errors: {
				unableToFindRoute: "Unable to find route handler",
				unableToFindRouteDescription: "Please go to https://emby.media/support.html for support"
			},
			loading: "Loading...",
			castAndCrew: "Cast and Crew",
			scenes: "Scenes",
			mins: "mins",
			play: "Play",
			watched: "Watched",
			favorite: "Favorite",
			delete: "Delete",
			allmovies: {
				allmovies: "All Movies",
			},
			moviedetail: {
				director: "Directed By",
				released: "Released",
				ends: "Ends",
				lastplayed: "Last Played",
				similarMovies: "Similar Movies"
			},
			homeview: {
				libraries: "Libraries",
				continueWatching: "Continue Watching"
			},
			homeMenuBar: {
				home: "Home",
				settings: "Settings"
			},
			moviesMenuBar: {
				all: "All"
			},
			settings: {
				aboutEmby: {
					field: "About Emby for tvOS",
					title: "The version of Emby for tvOS is"
				},
				title: "Settings",
				display: {
					title: "Display",
					enableThemeSongs:  {
						field: "Enable Theme Songs",
						title: "Enable Theme Songs",
						description: "Theme songs will be played in the background while browsing the library."
					},
					showUpcomingTV:  {
						field: "Show Upcoming TV on Home Screen",
						title: "Show Upcoming TV on Home Screen",
						description: "Show a row of episodes of your shows airing in the near future on the app home screen."
					},
				},
				playback: {
					title: "Playback",
					enableCinemaMode:  {
						field: "Enable Cinema Mode",
						title: "Create the 'Cinema' Experience",
						description: "Show current trailers (requires Trailers channel plug-in) and custom intros before your feature."
					},
					autoQueueEpisodes: {
						field: "Auto Queue Episodes",
						title: "'Binge watch' mode",
						description: "When playing a TV episode, automatically queue up all subsequent episodes for that season for continuous play."
					},
					defaultAudioLanguage: {
						field: "Default Audio Language",
						title: "The preferred language for audio tracks",
						description: "The first audio track with this language will be the one chosen."
					},
					alwaysPlayDefaultAudioTrack: {
						field: "Always play default audio track",
						title: "Always play audio track marked as default",
						description: "Setting this option will ignore preferred audio langue setting if there is an audio track marked as the default. That one will always be played."
					},
					defaultSubtitleLanguage: {
						field: "Default Subtitle Language",
						title: "The preferred language for subtitle tracks",
						description: "The first subtitle track with this language will be the one chosen."
					},
					subtitleSelection: {
						field: "Subtitle Selection",
						title: "The logic by which a subtitle track will be chosen",
						description: "'Smart' is probably the most useful setting."
					},
					maxBitrate: {
						field: "Max Bitrate",
						title: "The maximum streaming bitrate to allow",
						description: "Leave at 'Auto' unless you're having playback problems."
					}
				},
				general: {
					title: "General",
					switchUser: {
						field: "Switch User",
						title: "Login as a different user",
						description: "Login to your Emby server as a different user."
					},
					switchServer: {
						field: "Switch Server",
						title: "Connect to a different Emby server",
						description: "Connect to a different Emby server."
					}
				}
			}
		}
	}
};