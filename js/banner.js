
export class DashbordForBanner{
	constructor(){
		this.startBanner();
		
	}

	startBanner() {
		const imgArre = [
			"banerImg1.jpg",
			"banerImg2.jpg",
			"banerImg3.jpg",
			"banerImg4.png",
		];

		const banner = document.getElementById("BanerImg");

		let index = 0;

		setInterval(() => {
			// Pehle purani animation class hatao
			banner.classList.remove("fadeIn", "fadeOut");

			// Fade out start karo
			banner.classList.add("fadeOut");

			setTimeout(() => {
				// Image badlo
				banner.src = `./img/banner/${imgArre[index]}`;
				banner.alt = imgArre[index];

				// Index update
				index = (index + 1) % imgArre.length;

				// Fade in lagao naye image pe
				banner.classList.remove("fadeOut");
				banner.classList.add("fadeIn");
			}, 0); // thoda wait karo fadeOut ke liye
		}, 3000); // har 3 sec mein change ho
	}
}

