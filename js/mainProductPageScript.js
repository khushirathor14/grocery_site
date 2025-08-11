import {headerNfooter} from './headerNfooter.js';
import {productPageDeshbord} from './produectPage.js'

new headerNfooter();

document.addEventListener("DOMContentLoaded", (e)=>{	
	//set page acoding product
	const params = new URLSearchParams(window.location.search);
	const productId = params.get("id");
	console.log(productId);
	
	new productPageDeshbord(productId);
});