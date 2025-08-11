//console.log(window.getComputedStyle(ProductDisImg).display);
export class ProductImgGallery{
	#elemts;
	constructor(prodData){
		this.#elemts = this.#getElements();
		this.#genrateThumImgBox(prodData);
		this.#setEvents();
	}
	#getElements(){
		const productGallery= document.querySelector(".productGallery");
		const ProductDisImg = productGallery.querySelector(".ProductDisImg");
		const leftNavBtn = productGallery.querySelector(".leftNavBtn");
		const rightNavBtn = productGallery.querySelector(".rightNavBtn");
		const thumRow = document.querySelector(".thumRow");
		const lens = document.getElementById("lens");
		const result = document.getElementById("result");
		const resultImg = document.createElement("img");
		return {productGallery, ProductDisImg, leftNavBtn, rightNavBtn, thumRow, lens, result, resultImg };
	}

	#setEvents(){
		const {productGallery} = this.#elemts;
		productGallery.addEventListener('click', (event)=>this.#navigateImgage(event));
		this.#productZoomBoxEvents();
		
	}
	#genrateThumImgBox(prodData){
		const {thumRow} = this.#elemts;
	
		const {ProductId, mainImage, OthImage} = prodData;
		
		const imgData=[mainImage, ...OthImage.split(',')];

		const fragment = document.createDocumentFragment();
		
		let count=0;
		let firstThumFleg=true;
		const cls =this; //for access class this inside function block

		//this will add thum imagaes
		imgData.forEach(imge=>{
			imge =imge.trim(); //remkove space etc
			fragment.appendChild(createThumBox(ProductId, imge));
		});

		thumRow.appendChild(fragment);
		
		function createThumBox(ProductId, imge){
			const thumImgBox = document.createElement("div");
			thumImgBox.classList.add("thumImgBox");

			const img=document.createElement('img');
			img.src= `img/ProductImages/${ProductId}/${imge}`;
			img.alt= "product image";
			img.id = `thum_${count++}`;
			thumImgBox.appendChild(img);
			if (firstThumFleg){
				cls.#updateProductDisImg(img);		//update img box
				cls.#setSelection(thumImgBox); 	//set first seleced Thumline
				firstThumFleg=false;
			}
			return thumImgBox;
		}
	}
	#productZoomBoxEvents(){
		const {result ,resultImg, lens} =this.#elemts;
		const zoom = 2;

		
		resultImg.src =  ProductDisImg.src;
		result.appendChild(resultImg);

		ProductDisImg.addEventListener("mousemove", moveLens);
		lens.addEventListener("mousemove", moveLens);
		ProductDisImg.addEventListener("mouseenter", () => {
			// lens.classList.remove("hide");
			// result.classList.remove("hide");
			lens.style.display = "block";
			result.style.display = "block";
		});
		ProductDisImg.addEventListener("mouseleave", () => {
			//lens.classList.add("hide");
			//result.classList.add("hide");
			lens.style.display = "none";
			result.style.display = "none";
		});
		let fleg=true;
		function moveLens(e) {
			const bounds = ProductDisImg.getBoundingClientRect();

			// Cursor X, Y relative to image
			let x = e.pageX - window.scrollX - bounds.left - lens.offsetWidth / 2;
			let y = e.pageY - window.scrollY - bounds.top - lens.offsetHeight / 2;

			// Boundaries में रखो
			x = Math.max(0, Math.min(x, bounds.width - lens.offsetWidth));
			y = Math.max(0, Math.min(y, bounds.height - lens.offsetHeight));

			// Lens को set करो
			lens.style.left = `${x}px`;
			lens.style.top = `${y}px`;

			// Zoomed image को set करो
			resultImg.style.left = `-${x * zoom}px`;
			resultImg.style.top = `-${y * zoom}px`;
		}
	}

	#navigateImgage(event){
		const {thumRow} =this.#elemts;
		const clicked =event.target;
		const thumbImgBox = event.target.closest(".thumImgBox");
		const navBarBtn = event.target.closest(".navBtn");
	
		if (thumbImgBox){
			this.#updateProductDisImg(clicked);	
			this.#setSelection(clicked, true);
		}else if(navBarBtn ){
			if (navBarBtn.classList.contains("leftNavBtn")){
				const current =	getSelection();
				let prev = current.previousElementSibling;
				while (prev && !prev.classList.contains("thumImgBox")){
					next = next.nextElementSibling;
				}

				//agar preves elemet nahi milta to first elemet par le jata hai
				if (!prev){
					prev = thumRow.lastElementChild;
					while(prev && !prev.classList.contains("thumImgBox")){
						prev = prev.previousElementSibling;
					}
				}
				//prev elemet set hone par usko change karta hai
				if(prev){
					const img = prev.querySelector("img");
					this.#updateProductDisImg(img);
					this.#setSelection(prev);
				}
				
			}else if (navBarBtn.classList.contains("rightNavBtn")){
				const current =	getSelection();
				let next = current.nextElementSibling;
				
				while (next && !next.classList.contains("thumImgBox")){
					/*ye loop tab run kargea jab tak ise next div nahi mil jata jo "thumImgBox" class liye ho
				(yeha inshore karta hai jo bhi next select ho vo thumImgBox hi ho)
					*/  
					next= next.nextElementSibling;

				}
				if(!next){
					next= thumRow.firstElementChild;
					while(next && !next.classList.contains("thumImgBox")){
						next = next.nextElementSibling;
					}

				}

				if (next){
					const img =next.querySelector("img");
					this.#updateProductDisImg(img);
					this.#setSelection(next);
				}
			}
		}
		
		
		

		function getSelection(){
			for (const ele of thumRow.children){
				if (ele.classList.contains("selected"))	return ele;
			}
			return null;
		}
	}
	#setSelection(SelectTarget, toParent =false){
		const {thumRow} = this.#elemts;
			for (const ele of thumRow.children){
				if (ele.classList.contains("selected")){
					ele.classList.remove("selected");
				}
			}
			if(toParent){
				SelectTarget.parentElement.classList.add("selected");
			}else{
				SelectTarget.classList.add("selected");
			}
		}
	// sub-helping methods
	#updateProductDisImg(source){
		const {ProductDisImg, resultImg} =this.#elemts;
		if(source.tagName == "IMG"){
			ProductDisImg.src = source.src;
			resultImg.src = source.src;
		}
	}
}