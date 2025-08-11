import {ProductImgGallery} from './imgGallery.js';
//import {add2CartBtnManager} from './addBtn.js';
import {getAdd2CartBtnStrucher} from './addBtn.js';

import {SQLData} from './sqlDataManager.js';

export  class productPageDeshbord{
	#elemts;
	constructor(prodID){
		this.#init(prodID);
	}
	async #init(prod_Id){
		const prodData = await SQLData.getSelectdProductData(prod_Id);
		
		new ProductImgGallery(prodData);

		this.#elemts= this.#getElements();
		this.#genrateBreadCrumb(prodData);
		this.#setProductDetails(prodData);
		this.#setEventListener(prodData);
	}

	#getElements(){
		const prodDetails = document.getElementById("prodDetails");
		const prodName = prodDetails.getElementsByClassName("prodName")[0];
		
		const brandName = prodDetails.getElementsByClassName("brandName")[0];
		
		const quantityValue = prodDetails.getElementsByClassName("quantityValue")[0];
		const units = prodDetails.getElementsByClassName("unit")[0];

		const mrpValue = prodDetails.getElementsByClassName("mrpValue")[0];
		const finalPriceValue = prodDetails.getElementsByClassName("finalPriceValue")[0];
		const discount = prodDetails.getElementsByClassName("discount")[0];
		
		const add2CartBtnContainer  = document.querySelector(".add2CartBtnContainer");

		const prodDesc =  document.getElementsByClassName("prodDesc")[0];
		
		const ratingValue = document.getElementsByClassName("ratingValue")[0];
		const reviewCount=document.getElementsByClassName("reviewCount")[0];
		
		const userReviewComments = document.getElementById("userReviewComments");
		const relatedItems =document.getElementById("relatedItems");
		return {prodDetails, prodName, brandName, quantityValue, units, mrpValue, finalPriceValue, discount, prodDesc, ratingValue, reviewCount , userReviewComments, relatedItems, add2CartBtnContainer};
	}
	#genrateBreadCrumb(proData){
		const breadCrumb = document.getElementById("breadCrumb");
		const {category, categoryColor, product_name}=proData;
		breadCrumb.innerHTML=`<a href="#" style="color:blue;">home</a> / <a href="#"style="color: ${categoryColor};">${category}</a> / ${product_name}`;
	}
	#setProductDetails(proData){
		const {prodName, brandName, quantityValue, units, mrpValue, finalPriceValue, discount, prodDesc}=this.#elemts;
		const {brand_name, product_name, mrp, final_price, Qty, unit, describes}= proData;
		//prodName.innerText =product_name;
		const mapValues = new Map([
        [prodName, product_name],
        [brandName, brand_name],
        [quantityValue, Qty],
        [units, unit],
        [mrpValue, mrp],
        [finalPriceValue, final_price],
        [discount, `${Math.round(((mrp - final_price) / mrp) * 100)}% OFF`],
        [prodDesc, describes]
    ]);

    // अब सारे elements को set करो 💚
    for (const [element, value] of mapValues) {
			if (!element) continue;
			const isMrpOrDiscount = element.classList.contains("mrpValue") || element.classList.contains("discount");
			if (isMrpOrDiscount && mrp === final_price){
				element.remove();
			}else {
				element.innerHTML = value;
			}
    }

	}

	#setEventListener(proData){
		const {add2CartBtnContainer} = this.#elemts;
		const {ProductId ,limits} = proData;
		
		//const addBtnObj = new  add2CartBtnManager(ProductId, limits);
		//addBtnObj.add2CartBtnStrucher(add2CartBtnContainer);
		add2CartBtnContainer.append( getAdd2CartBtnStrucher(ProductId, limits, "productPage"));
	}
}