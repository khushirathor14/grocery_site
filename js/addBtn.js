import {cartDataManager} from './cartDataManager.js';

const addBtnList = {}

export function getAdd2CartBtnStrucher(prodId, limits, caller){
/* this function create AddBtn obj and keep record of that and send it to them who called this*/ 
		const newBtn = new add2CartBtnManager(prodId, limits);
		
		if (!addBtnList[prodId]){	addBtnList[prodId]={};}
		
		addBtnList[prodId][caller] = newBtn;
		
		return newBtn.add2CartBtnStrucher();
}

let cartObj;
export function setCartObj(cart_obj){
	cartObj = cart_obj;
}

function updateAddBtn(prodId){
	if(addBtnList[prodId] ){
		if (addBtnList[prodId]["productCard"]){
			addBtnList[prodId]["productCard"].refresh();
		}
		if (addBtnList[prodId]["productPage"]){
			addBtnList[prodId]["productPage"].refresh();
		}
		if (addBtnList[prodId]["cartManager"]){
			addBtnList[prodId]["cartManager"].refresh();
		}
	}
	
}

class add2CartBtnManager{
	#elemts={};
	constructor(prodId, limit){
		this.prodId = prodId;
		this.limit =limit;
		this.itemCount = cartDataManager.GetValueFormLocalStorage(this.prodId);
		this.#elemts =this.#createElements();
		this.#setStrucher();
		this.#elemts.add2CartBtn.addEventListener("click", event => this.addBtenEvent(event));
	}
	#createElements(){
		const elemtMap= {
			add2CartBtn : {type:"div", classList: ["add2CartBtn"]},
			addBtn : {type:"button", classList:["addBtn"]},
			counter: {type:"div", classList:["counter"]},
			countDis: {type:"p", classList:["countDis"]},
			increase: {type:"button", classList:["increase"]},
			decrease: {type:"button", classList:["decrease"]}
		};

		const elmts={};
		for (const [elm, struct] of Object.entries(elemtMap)){
			const newElemnt = document.createElement(struct.type);
			struct.classList.forEach(clsNme=>{
				newElemnt.classList.add(clsNme);
			});
			elmts[elm] = newElemnt;
		}
		return elmts;
	}

	#setStrucher(){
		const {add2CartBtn,  addBtn, counter, countDis, increase, decrease}=this.#elemts;
		addBtn.innerText = "ADD";

		add2CartBtn.append(addBtn);
		
		decrease.innerText = "—";
		increase.innerText = "+";
		if (this.limit == this.itemCount){
			increase.disabled = true;
		}
		
		countDis.innerText = this.itemCount;
		if (this.itemCount>0){
			this.#hideAddBtn();
		}else{
			this.#showAddBtn();
		}
		
		counter.append(decrease);
		counter.append(countDis);
		counter.append(increase);
		add2CartBtn.append(counter);
	}
	

	addBtenEvent(event) {
		const { addBtn, counter, countDis, increase, decrease } = this.#elemts;
		const clicked = event.target;

		if (clicked.classList.contains("addBtn")) {
			this.itemCount++;
			this.#hideAddBtn();
		} else if (clicked.classList.contains("increase")) {
			if (this.itemCount < this.limit) {
				this.itemCount++;
			}
		} else if (clicked.classList.contains("decrease")) {
			if (this.itemCount > 0) {
				this.itemCount--;
			}
		}
		
		this.#update();

		// Cart update
		
		cartObj.updateCartList("from Add");
		updateAddBtn(this.prodId); //update same all same ides btan on product page, product card , cart item
		
	}
	#update(){
		const {countDis,increase} = this.#elemts; 
		// Update LocalStorage
		cartDataManager.SetValueInLocalStorage(this.prodId, this.itemCount);

		// Update Counter UI
		countDis.innerText = this.itemCount;

		// Show or hide buttons based on count
		if (this.itemCount <= 0) {
			this.#showAddBtn();      // ✅ जब count 0 हो, तो Add दिखाओ
		} else {
			this.#hideAddBtn();      // ✅ जब count > 0 हो, तो counter दिखाओ
		}

		// Handle limit disable
		increase.disabled = this.itemCount >= this.limit;
		//cartObj.updateCartList("from Add");
		
	}
	refresh(){
		const itemQtyValue = cartDataManager.GetValueFormLocalStorage(this.prodId);
		this.itemCount = itemQtyValue;
		this.#update();
	}
	#hideAddBtn(){
		const {addBtn, counter} = this.#elemts;
		addBtn.classList.add("hide");
		counter.classList.remove("hide");
	}
	#showAddBtn(){
		const {addBtn, counter} = this.#elemts;
		counter.classList.add("hide");
		addBtn.classList.remove("hide");
	}
	
	add2CartBtnStrucher(){
		const {add2CartBtn} = this.#elemts;
		//BtnContainer.append(add2CartBtn);
		
		return add2CartBtn;
	}
}

/*
 `<div class="add2CartBtn">
		<button class="addBtn ">ADD</button>
		<div class="counter hide">
			<button class="decrease">—</button><p class="countDis">1</p><button class="increase">+</button>
		</div>
	</div>`
*/ 