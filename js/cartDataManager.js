export class cartDataManager{
	static cartObjArre = [];

	constructor() {}

	static SetValueInLocalStorage(prodId, value) {
		// localStorage se data lo
		let cartData = localStorage.getItem("cartData");

		// agar data hai to usse parse karo, warna empty array
		let cartObjArre = cartData ? JSON.parse(cartData) : [];

		// Check karo ki item already exist karta hai ya nahi
		let index = cartObjArre.findIndex(obj => obj.prod_id === prodId);

		if (index > -1) {
			// agar item already hai to uska qty update karo
			cartObjArre[index].qty = value;
		} else {
			// nahi hai to naya object add karo
			cartObjArre.push({ prod_id: prodId, qty: value });
		}

		// fir localStorage me dubara save karo
		localStorage.setItem("cartData", JSON.stringify(cartObjArre));
	}

	static GetValueFormLocalStorage(prodId) {
		let cartData = localStorage.getItem("cartData");
		if (!cartData) return 0;

		let cartObjArre = JSON.parse(cartData);
		let item = cartObjArre.find(obj => obj.prod_id === prodId);
		return item ? item.qty : 0;
	}
	static getAllCartItemsList(){
		let cartData = localStorage.getItem("cartData");
		return cartData ? JSON.parse(cartData): [];
	}
}


// class cartData{
// 	static cartObjArre = [];
// 	constructor(){
		
// 	}
// 	static SetValueInLocalStorage(prodId , value){
// 		const cartData = localStorage.getItem("cartData");
// 		// let cartObjArre = [];
// 		if (cartData){
// 			cartObjArre = JSON.parse(cartData);
// 			updateData(prodId , value);
// 		}else {
// 			updateData(prodId , value);
// 		}

// 		function updateData(prodId , value){
// 			cartObjArre.push( { prod_id: prodId, qty: value } );
// 			localStorage.setItem("cartData", JSON.stringify(cartObjArre));
// 		}
// 	}

// 	static GetValueFormLocalStorage(prodId){
// 		if (cartObjArre.length >0 ){
// 			cartObjArre.forEach( obj=>{
// 				if (obj.prod_id === prodId){
// 					return obj.qty;
// 				}
// 			});
// 		}else {
// 			return 0;
// 		}
		
// 		// const d = localStorage.getItem("cartData");
// 		// //console.log(d);
// 		// const Dobj = JSON.parse(d);
// 		// Dobj.forEach(obj=>{
// 		// 	if (obj.prod_id === this.prodId){
// 		// 		return obj.qty;
// 		// 	}else {
// 		// 		this.SetValueInLocalStorage(this.prodId , 1);
// 		// 	}
// 		// 	// console.log(`${obj.prod_id} ${this.prodId}, ${}`)
// 		// })
// 		// return 0;
// 	}
// }
// reativ update cart list banani hai 
// static #updateCartList(){
	// 	if (this.itemCount>0){
	// 		console.log(this.itemCount);
	// 	}
	// }