// import {add2CartBtnManager} from './addBtn.js';
import {getAdd2CartBtnStrucher} from './addBtn.js';
import {SQLData} from './sqlDataManager.js';


export class DashbordForRowNav {
	
	constructor(){
		this.createCatagoryRowNavbar();
		this.createRow();
		this.setEventsOnElemets();
	}

	setEventsOnElemets(){
		
		document.getElementById("ItemCategory").addEventListener("click", (event)=>{
			this.eventOnItemCategory(event);
		});

	}

	async createRow() {
		const productData = await SQLData.getAllProductData();

		const fragments = {};
		const ItemCategory = document.getElementById("ItemCategory");
	
		const catagoryDiv={}; 
		// पहले सारे categoryDivs बना लो
		productData.forEach((data) => {
			const categoryId = data.category;

			// अगर category का div नहीं है तो उसे create करो
			/*ye if check kar raha hi ki catagoryId pahale se list me hai ya nahi*/ 
			if (!catagoryDiv[categoryId]) {
				catagoryDiv[categoryId]= document.getElementById(categoryId);
				/* fir doosre div me check karta hai ki document me bhi nahi hai*/ 
				if (!catagoryDiv[categoryId]){
					catagoryDiv[categoryId] = createCategoryRow(data);
				}
			}

			// Fragment मौजूद ना हो तो बनाओ
			if (!fragments[categoryId]) {
				fragments[categoryId] = document.createDocumentFragment();
			}

			// Product card बनाकर fragment में डालो
			const card = this.createProductCard(data);
			fragments[categoryId].appendChild(card);
		});
		
		// अब fragments को उनके related div में append करो
		for (const catId in fragments) {
			//const categoryDiv = document.getElementById(categoryId);
			if (catagoryDiv[catId]) {
				catagoryDiv[catId].appendChild(fragments[catId]);
			}
		}

		// Category section create करने का helper function
		function createCategoryRow(data) {
			const NewCategoryDiv = document.createElement("div");
			NewCategoryDiv.id = data.category;
			NewCategoryDiv.className = "category";
			NewCategoryDiv.style.backgroundColor = data.categoryColor;

			NewCategoryDiv.innerHTML = `<div class="categoryTitleDiv">
																		<p class="categoryTitle">${data.category}</p>
																	</div>`;
				
			ItemCategory.appendChild(NewCategoryDiv);
			return NewCategoryDiv;
		}
	}

	createProductCard(ProdeuctData) {
		const elementMap = getElementsMap();
			Object.freeze(elementMap);
			Object.freeze(elementMap.container);
		
		const element = createElementsFromMap(elementMap);
			Object.freeze(element);
			Object.freeze(element.container);

		createProductCardStrucher(element, ProdeuctData);
		
		return element.container;

		/*===== inner function start =====*/
		function getElementsMap(){
			return {
				// container
				container: { Elm_type: "div", Elm_class: ["productContaner"] },

				// ==== imgFrame ====
				imgFrame: { Elm_type: "div", Elm_class: ["imgFrame"] },
				discountElemt: { Elm_type: "p", Elm_class: ["discount"] },
				productImg: { Elm_type: "img", Elm_class: ["productImg"] },
				wishBtn: { Elm_type: "button", Elm_class: ["wishList"] },

				// ==== proDetails ====
				proDetails: { Elm_type: "div", Elm_class: ["proDetails"] },
				brandName: { Elm_type: "p", Elm_class: ["brandName"] },
				productNme: { Elm_type: "p", Elm_class: ["productName"] },
				
				// ==== qunatitye ====
				quantityDiv: { Elm_type: "p", Elm_class: ["quantity"] },
				qtyValue:{Elm_type: "span", Elm_class:["quantityValue"]},
				unitValue:{Elm_type: "span",Elm_class:["unit"]},

				//=====mrp =======
				MRP_Div: { Elm_type: "p", Elm_class: ["mrp"] },
				MRP_Value: {Elm_type:'span', Elm_class:["mrpValue"]},
				finalPrice: {Elm_type: "span", Elm_class: ["finalPriceValue"]},
				
				rating: { Elm_type: "p", Elm_class: ["rating"] },
				add2CartBtnContainer: { Elm_type: "div", Elm_class: ["add2CartBtnContainer"] },
				//: {Elm_type:, Elm_class: []},
			};
			
		}
		
		function createElementsFromMap(elementMap){
			const element = {};
			//this function create elements And Add all Class form List
			for (const key in elementMap) {
				const data = elementMap[key];

				//this will create Element
				element[key] = document.createElement(data.Elm_type);

				//this forEach Loop add All Class into element
				data.Elm_class.forEach((cls) => {
					element[key].classList.add(cls);
				});
			}
			return element;
		}
		
		function createProductCardStrucher(element, ProdeuctData){
			const {ProductId, brand_name , product_name, mrp, final_price, Qty, unit, limits} = ProdeuctData;
			const {ThumImage, mainImage, OthImage, altText}=ProdeuctData;
			
			const { container } = element;
			const { imgFrame, discountElemt, productImg, wishBtn } = element;
			const { proDetails, brandName, productNme, rating } =element;
			const {quantityDiv, qtyValue, unitValue}=element;
			const {MRP_Div, MRP_Value,finalPrice}=element;

			const { add2CartBtnContainer } = element;
			container.id = ProductId;

			// ==== imgFrame ====
			if(mrp !== final_price){
				if (discountElemt.classList.contains("hide")){
					discountElemt.classList.remove("hide");
				}
				discountElemt.innerHTML = `<span class="discountValue">${
					100 - parseInt((final_price / mrp) * 100)
				}</span>%<br>off`;
			}else{
				if (!discountElemt.classList.contains("hide")){
					discountElemt.classList.add("hide");
				}
			}

			productImg.src = `./img/ProductImages/${ProductId}/${ThumImage}` ;
			// console.log(productImg.src);
			productImg.alt = altText;

			wishBtn.innerHTML = `<img src="./img/svgs/heartEmpty.svg" alt="" class="wishIcon">`;

			imgFrame.appendChild(discountElemt);
			imgFrame.appendChild(productImg);
			imgFrame.appendChild(wishBtn);

			// ==== proDetails ====
			if (brand_name !=="NO_Brand"){
				brandName.innerText = brand_name;
				proDetails.appendChild(brandName);
			}

			productNme.innerText = product_name;
			proDetails.appendChild(productNme);


			qtyValue.innerText=`${Qty} `;
			unitValue.innerText =`${unit}`;
			quantityDiv.appendChild(qtyValue);
			quantityDiv.appendChild(unitValue);

			// quantity.innerHTML = `<span class="num">${Qty}</span>&nbsp;<span class="unit">${unit}</span>`;
			proDetails.appendChild(quantityDiv);

			if (mrp!==final_price){
				MRP_Value.innerText= `₹${mrp} `;
			}
			finalPrice.innerText = `₹${final_price}`;
			MRP_Div.appendChild(MRP_Value);
			MRP_Div.appendChild(finalPrice);

			proDetails.appendChild(MRP_Div);
			/*
			MRP_Div.innerHTML = `<span class="mrpValue">₹${mrp}&nbsp;</span>
										<span class="finalPriceValue">₹${final_price}</span>`;
			*/
			

			rating.innerHTML = `<span class="ratingValue">4.5</span>
													<span class="reviewCount">(1000)</span>`;
			proDetails.appendChild(rating);

			//const addBtnObj = new add2CartBtnManager(ProductId, limits);
			//addBtnObj.add2CartBtnStrucher(add2CartBtnContainer);
			add2CartBtnContainer.append(getAdd2CartBtnStrucher( ProductId, limits, "productCard"));

			container.appendChild(imgFrame);
			container.appendChild(proDetails);
			container.appendChild(add2CartBtnContainer);
		}
	}


	eventOnItemCategory(event){
		const container= event.target.closest(".productContaner");
		const productId = container?.id;
		
		const add2CartBtnContainer = event.target.closest(".add2CartBtnContainer");
		if (event.target.closest(".wishList")){
			//console.log("wish");
			wishList(productId, event);
		}else if(add2CartBtnContainer){
			// console.log("add btn");
		}else if(event.target.closest(".productContaner")){
			//console.log("cartBox");
			window.location.href = `prodectPage.html?id=${productId}`; // Redirect to product detail page
		}

		function wishList(pid, event) {
			console.log("Wish List button clicked for product:", pid);
			
			const fillIcon = `heartFill.svg`;
			const emptyIcon = `heartEmpty.svg`;

			//const button = event.target.closest("button");
			//const wishListIcon = button.querySelector("img");
			const wishListIcon = event.target.closest(".wishIcon");
			// check current state
			if (wishListIcon.src.includes(fillIcon)) {
					wishListIcon.src = `./img/svgs/${emptyIcon}`;
					wishListIcon.classList.remove("active");
			} else {
					wishListIcon.src = `./img/svgs/${fillIcon}`;
					wishListIcon.classList.add("active");

					// optional: add pulse animation
					setTimeout(() => {
							wishListIcon.classList.remove("active"); // removes scale after 300ms
					}, 300); // must match CSS transition time
			}
		}
	}

	async createCatagoryRowNavbar(){
		const catagoryNavbar = document.getElementById("catagoryNavbar");
		const catagoryData= await SQLData.getCatagoryData();

		const fragment =document.createDocumentFragment();
		catagoryData.forEach(data=>{
			let card = createNavbarCard(data);
			fragment.appendChild(card);
		});

		const ul=document.createElement('ul');
		ul.appendChild(fragment);
		catagoryNavbar.appendChild(ul);

		function createNavbarCard(catagoryData){
			const {categoryName, images, color, altText}=catagoryData;

			const li = document.createElement('li');
			li.classList.add("catagoryThumbnail");
			li.style.backgroundColor= color;
			li.style.outlineColor =color;

			const anchor = document.createElement('a');
			anchor.href= `#${categoryName}`;
			anchor.style.borderColor =color;

			const img = document.createElement('img');
			img.src=`./img/catagoryThumbnail/${images}`;
			img.alt= altText;
			anchor.appendChild(img);
			li.appendChild(anchor);
			return li;
		}
	}
}

