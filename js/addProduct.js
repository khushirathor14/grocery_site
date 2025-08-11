class addProductDashbord{
	constructor(){
		this.setEventListener();
	}
	setEventListener(){

		document.getElementById("addImg").addEventListener("change", (event)=> {
			this.setImagePreviewDiv(event);
		});

	}
	setImagePreviewDiv(event){
		let imgPreview = document.getElementById("imgPreview");
		let imgGrid = document.getElementById("ImgGrid");

		// पहले से मौजूद ग्रिड को क्लियर करें (अगर आप नई इमेज जोड़ने पर पुरानी हटाना चाहते हैं)
		imgGrid.innerHTML = "";

		// फाइल सेलेक्ट करने पर
		if (event.target.files.length > 0) {
				let fileList = event.target.files;

				for (let i = 0; i < fileList.length; i++) {
						let file = fileList[i];
						let reader = new FileReader();

						reader.onload = function (e) {
								// प्रीव्यू बॉक्स में पहली इमेज दिखाएं
								if (i === 0) {
										imgPreview.src = e.target.result;
								}

								// इमेज ग्रिड में इमेज ऐड करें
								let imgDiv = document.createElement("div");
								let imgTag = document.createElement("img");
								imgTag.src = e.target.result;
								imgTag.alt = "Uploaded Image " + (i + 1);
								imgTag.onclick = function () {
										imgPreview.src = this.src; // ग्रिड से क्लिक करने पर बड़ी इमेज बदले
								};

								imgDiv.appendChild(imgTag);
								imgGrid.appendChild(imgDiv);
						};

						reader.readAsDataURL(file);
				}
		}
	}
}

document.addEventListener("DOMContentLoaded", ()=>{
	const mydashbord = new addProductDashbord();
})