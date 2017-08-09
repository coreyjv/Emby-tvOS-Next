import MenuBarController from '../MenuBarController';

export default class HomeMenuBarController extends MenuBarController {
	async fetchData() {
		console.log("Settings up HomeMenuBarController");
		return Promise.resolve({
			menuItems: [{
				route: "home/Home",
				autoHighlight: true,
				title: "messages.homeMenuBar.home"
			}]
		});
	}
}