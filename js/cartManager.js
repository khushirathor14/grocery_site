import {cartDataManager} from './cartDataManager.js';
import {SQLData} from './sqlDataManager.js';
import {getAdd2CartBtnStrucher} from './addBtn.js';


export class cartDeshBord{
	#mainCartContainer;
	#cartFlotingBtnElemts;
	#cartSidebarElemts;
	#priceData= {TotalMrp:0, finalprice:0, totalQty:0};
	#ListItems={};
	#headerElemts;
	constructor(HeaderCartBtnNcartCounter){
		this.#headerElemts = HeaderCartBtnNcartCounter;
		this.#constructCartManager();
		this.#setEvents();
		this.updateCartList();
	}
	
	async updateCartList(msg="defult"){
		console.log(msg);
		const fragment= document.createDocumentFragment();
		
		const itemListData = cartDataManager.getAllCartItemsList();
		//console.log(itemListData);
		//const ListItems={};
		this.#priceData={TotalMrp:0, finalprice:0, totalQty:0};
		//console.log(this.#ListItems);
		for (const data of itemListData){
			
			const {prod_id, qty} = data;
			//console.log(`${prod_id } ${qty} ${" "}`);
			//console.log([prod_id] in this.#ListItems);
			if (qty<= 0 && ([prod_id] in this.#ListItems) ){
				delete this.#ListItems[prod_id];
			} 
			if(qty>0 ){
				if (!(prod_id in this.#ListItems)){
					const prodData = await SQLData.getSortProductData(prod_id);
					
					// const {mrp, final_price}=prodData;
					// this.#priceData.TotalMrp += Number(mrp) * Number(qty);
					// this.#priceData.finalprice += Number(final_price) * Number(qty);
					// this.#priceData.totalQty += qty;
					
					
					this.#ListItems[prod_id]={
						productData: prodData,
						Elemt : this.#createCartItem(prodData),
						QTY: qty
					};
				}else {
					this.#ListItems[prod_id].QTY= qty;
				}
				this.#updatePriceData(prod_id);
			}
		}

		Object.keys(this.#ListItems).forEach((key)=>{
			fragment.appendChild(this.#ListItems[key].Elemt);
		});

		this.#cartSidebarElemts.cartList.innerHTML=""; // this reset list 
		this.#cartSidebarElemts.cartList.append( fragment );
		
		this.#updateFlotingIconDetails();
		this.#updateSidebarDetils();
		this.#updateHeaderCartBtn();
	}

	#updateHeaderCartBtn(){
		const {cartBtn, cartCount} = this.#headerElemts; 
		cartCount.innerText = this.#priceData.totalQty;
	}
	
	#updatePriceData(prodId){
		const {mrp, final_price}=this.#ListItems[prodId].productData;
		const qty=this.#ListItems[prodId].QTY;
		this.#priceData.TotalMrp += Number(mrp) * Number(qty);
		this.#priceData.finalprice += Number(final_price) * Number(qty);
		this.#priceData.totalQty += qty;
	}

	#constructCartManager(){
		const mainCartContaner =  document.createElement("div");
		mainCartContaner.id = "mainCartContaner";
		// const mainCartContaner = document.getElementById("mainCartContaner");

		const cartFloatingBtnContainer= this.#cartFlotingBtnStrucher();
		const cartSidebarContainer=this.#cartSideBarStrucher()
		mainCartContaner.append(cartFloatingBtnContainer,cartSidebarContainer)
		document.body.append(mainCartContaner);
		
		this.#mainCartContainer = mainCartContaner;
	}

	#setEvents(){
		const {cartFloatingBtnContainer,expendBtn} = this.#cartFlotingBtnElemts;
		const {cartSidebarContainer, collapseBtn} = this.#cartSidebarElemts;
		const {cartBtn, cartCount}=this.#headerElemts;
		
		expendBtn.addEventListener('click', switch2List);
		collapseBtn.addEventListener('click', switch2Btn);
		cartBtn.addEventListener('click', switch2List);
		


		function switch2List(){
			cartFloatingBtnContainer .classList.add("hide");
			cartSidebarContainer.classList.remove("hide");
		}

		function switch2Btn(){
			cartFloatingBtnContainer.classList.remove("hide");
			cartSidebarContainer.classList.add("hide");
			//togalClass();
		}

		
		//====================
		cartList.addEventListener('click', handleCartItemClick);
		const self= this;
		function handleCartItemClick(event) {
			const clickedEl = event.target;
			const cartItem = clickedEl.closest(".cartItems");
			if (cartItem) {
				const prodId = cartItem.dataset.productID;
				const itemCount = cartDataManager.GetValueFormLocalStorage(prodId);

				// 💥 Remove if quantity is zero
				if (itemCount <= 0) {
					cartItem.remove();
				}

				// ❌ If close button clicked
				if (clickedEl.classList.contains("close")) {
					cartDataManager.SetValueInLocalStorage(prodId, 0);
					cartItem.remove();
					self.#updatePriceData(prodId);
					
				}
			}
		}
	}

	

	#createCartItem(prod_Data){
			const elemtMap={
				cartItems:{type: "div", classes:["cartItems"]},
				close:{type: "button", classes:["close"]},
				productImg:{type: "div", classes:["productImg"]},
				img:{type: "img", classes:[]},
				productDetails:{type: "div", classes:["productDetails"]},
				productName:{type: "div", classes:["productName"]},
				quantity:{type: "div", classes:["quantity"]},
				price:{type: "div", classes:["price"]},
				mrp_value:{type: "span", classes:["mrp"]},
				paybleAmount:{type: "span", classes:["paybleAmount"]},
				addBtnContainer: {type: "div",  classes: ["addBtnContainer"]}, 
				// Add_Btn:{type: "div", classes:["Add_Btn"]},
				// decrease:{type: "button", classes:["decrease"]},
				// increase:{type: "button", classes:["increase"]},
				// disQuantity:{type: "button", classes:["disQuantity"]}
			};
			Object.freeze(elemtMap);
			// Object.fromEntries(elemtMap);
			const elemts={};
			
			//create elements
			for (const [name, struct] of Object.entries(elemtMap)){
				const elm= document.createElement(struct.type);
				struct.classes.forEach((cls)=>{
					elm.classList.add(cls);
				});
				elemts[name]= elm;
			}
		
			createStrucher(elemts, prod_Data);
			
			return elemts.cartItems;

		function createStrucher(elemts, prodData){
			const {cartItems, close, productImg, img, productDetails, productName, quantity, price, mrp_value, paybleAmount, addBtnContainer} = elemts; //, Add_Btn, decrease, increase, disQuantity
			
			const {ProductId, product_name, brand_name, mrp, final_price, Qty, unit, limits, categoryColor, ThumImage}= prodData;

			cartItems.dataset.productID = ProductId; //its set dataset-productID="prod_1"

			close.innerText = 'X';
			cartItems.append(close);
			
			img.src=`./img/ProductImages/${ProductId}/${ThumImage}`;
			img.alt=`${ProductId} imgage`;
			productImg.append(img);
			cartItems.append(productImg);
			
			productName.innerText = product_name;
			productDetails.append(productName);

			quantity.innerText =`${Qty} ${unit}`;
			productDetails.append(quantity);
			
			if(mrp !==final_price){
				mrp_value.innerText = `₹${mrp}`;
				price.append(mrp_value);
			}
			

			paybleAmount.innerText = ` ₹${final_price}`;
			price.append(paybleAmount);
			
			productDetails.append(price);
			cartItems.append(productDetails);
		
			addBtnContainer.append(getAdd2CartBtnStrucher(ProductId, limits, "cartManager"));
			cartItems.append(addBtnContainer);

			cartItems.style.backgroundColor = categoryColor;
		}
	}

	#cartFlotingBtnStrucher(){
		const elemtMap={
			cartFloatingBtnContainer :{type: 'div', id:'cartFloatingBtnContainer', classList: ['FadeVisual']},
			cardItemsSortDetails :{type: 'div', id: 'cardItemsSortDetails', classList: []},
			TotalItemValue: {type: 'p', id:'' , classList:['TotalItemValue']},
			TotalAumountValue: {type: 'p', id:'', classList:['TotalAumountValue']},
			expendBtn : {type: 'button', id: 'expendBtn', classList:['BtnStyle']},
		};
		Object.freeze(elemtMap);
		const elemts={};
		for ( const [key, value] of Object.entries(elemtMap)){
			const newElemt = document.createElement(value.type);
			newElemt.id= value.id;
			value.classList.forEach((cls)=>{
				newElemt.classList.add(cls);
			});
			elemts[key]= newElemt;
		}

		this.#cartFlotingBtnElemts= elemts;
		creteStrucher();
		return elemts.cartFloatingBtnContainer;

		function creteStrucher(){
			const {cartFloatingBtnContainer, cardItemsSortDetails,TotalItemValue, TotalAumountValue, expendBtn}=elemts;
			
			TotalItemValue.innerText=`Items: ${0}`;
			TotalAumountValue.innerText = `Amount ₹ ${0}`;
			cardItemsSortDetails.append(TotalItemValue, TotalAumountValue);
			
			const svgImg={
				viewBox: "0 0 320 512",
				xmlns:"http://www.w3.org/2000/svg",
				path: {type:"d", property:"M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"}
			}
			
			expendBtn.appendChild(createSVG_Element(svgImg));

			cartFloatingBtnContainer.append( cardItemsSortDetails, expendBtn);
		}
	}
	#updateFlotingIconDetails(){
		const {TotalItemValue, TotalAumountValue} =this.#cartFlotingBtnElemts
		const {TotalMrp, finalprice, totalQty}= this.#priceData;
		TotalItemValue.innerText=`Items: ${totalQty}`;
		TotalAumountValue.innerText = `Amount ₹ ${TotalMrp}`;
	}

	#cartSideBarStrucher(){
			const elemtMap={
				cartSidebarContainer:{type: 'div', id:"cartSidebarContainer", classList:["hide", "SlideVisual"]},
				cartList :{type: 'div', id:'cartList', classList:[]},
				cartFooter :{type: 'div', id:'cartFooter', classList:[]},
				collapseBtn :{type: 'button', id:'collapseBtn', classList:['BtnStyle']},
				cartSummary:{type: 'div', id:'cartSummary', classList:[]},
				totalAmount:{type: 'p', id:'totalAmount', classList:[]},
				paybleAmount:{type: 'p', id:'paybleAmount', classList:[]},
				saveAmount:{type: 'p', id:'saveAmount', classList:[]},
				savePercentage: {type:'span', id: 'savePercentage', classList:[]},
				continueToPay: {type:'button', id: 'continueToPay', classList:[]}
			}
		const elemts={}
		for (const[name, value] of Object.entries(elemtMap)){
			 const newElemt= document.createElement(value.type);
			newElemt.id= value.id;
			
			value.classList.forEach(cls=>{
				newElemt.classList.add(cls);
			});
			elemts[name]= newElemt;
		}
		
		setStrucher(elemts);
		this.#cartSidebarElemts = elemts;
		return elemts.cartSidebarContainer;

		function setStrucher(elemts){
			const { cartSidebarContainer, cartList, cartFooter, collapseBtn, cartSummary, totalAmount, paybleAmount, saveAmount, savePercentage, continueToPay }=elemts;
			
			const svgImg={
				viewBox: "0 0 320 512", 
				xmlns: "http://www.w3.org/2000/svg",
				path: {type:"d", property:"M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"}
			}
			collapseBtn.appendChild(createSVG_Element(svgImg));
			cartFooter.append(collapseBtn);

			totalAmount.innerHTML = `Total Amount: ₹ ${0}`;
			paybleAmount.innerHTML = `Palyble Amount: ₹ ${0}`;
			
			
			saveAmount.innerHTML = `You saved: ₹ ${0} `;
			savePercentage.innerHTML = `${0} % OFF`;
			saveAmount.append(savePercentage);

			continueToPay.innerText ="continue";

			cartSummary.append(totalAmount, paybleAmount, saveAmount, continueToPay);
			cartFooter.append(cartSummary);
			cartSidebarContainer.append(cartList, cartFooter);
		}
	}
	#updateSidebarDetils(){
		const {totalAmount, paybleAmount, saveAmount, savePercentage}=this.#cartSidebarElemts;
		const {TotalMrp, finalprice, totalQty}= this.#priceData;
		
		const savedAmount = Number(TotalMrp)-Number(finalprice);
		const discountPercent = TotalMrp > 0 ? Math.round((savedAmount/ Number(TotalMrp)) * 100) :0;
		
		
		totalAmount.innerHTML = `Total Amount: ₹ ${TotalMrp.toFixed(2)}`;
		paybleAmount.innerHTML = `Palyble Amount: ₹ ${finalprice.toFixed(2)}`;
		
		saveAmount.innerHTML = `You saved: ₹ ${savedAmount.toFixed(2)}`;
		savePercentage.innerHTML = `  ${discountPercent}% OFF`;
		saveAmount.append(savePercentage);
	}
	
	
}
function createSVG_Element(svgObj){
	const {viewBox, xmlns, path}= svgObj;
	const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
	svg.setAttribute('viewBox', viewBox);
	svg.setAttribute('xmlns', xmlns);
	const pathElemt = document.createElementNS(xmlns, 'path');
	pathElemt.setAttribute(path.type, path.property);

	svg.appendChild(pathElemt);

	return svg;
	/*
	const svgImg={
				viewBox: "", 
				xmlns: "",
				path: {type:"d", property:""}
			}
	*/ 
}

/*

*/

/*
`<div id="cartFloatingBtnContainer" class="FadeVisual">
	<div id="cardItemsSortDetails">
		<p class="TotalItemValue">Items <span >${totalQty}</span></p>
		<p class=" TotalAumountValue">Amont ₹<span >${TotalMrp}</span></p>
	</div>
	<button class="BtnStyle" id="expendBtn">
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
			<path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/>
		</svg>
	</button>
</div>`
*/

/*
`<div id="cartSidebarContainer" class="hide SlideVisual">
	<div id="cartList"><!-- cart items start --></div>
	<div id="cartFooter">
			<button class="BtnStyle" id="collapseBtn">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
					<path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"/>
				</svg>
			</button>
			<div id="cartSummary">
				<p id="totalAmount">Total Amount: ₹<span id="totalAmountValue">${TotalMrp}</span></p>
				<p id="paybleAmount">Palyble Amount: ₹<span id="paybleAmountValue">${finalprice}</span></p>
				<p id="saveAmount">You saved: ₹<span id="savedAmountValue">${Number(TotalMrp)-Number(finalprice)} </span><span id="savePercentage">${((Number(TotalMrp) - Number(finalprice)) / Number(TotalMrp)) * 100}</span>% oFF</p>
				<button id="continueToPay">Continue</button>
			</div>
		</div>
	</div>
</div>`

*/ 