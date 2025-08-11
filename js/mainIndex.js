import {headerNfooter} from './headerNfooter.js';
import {DashbordForBanner} from './banner.js';
import {DashbordForRowNav} from './productCard.js';
//import {cartDeshBord} from './cartManager.js';


new  headerNfooter(); //for header and footer

document.addEventListener("DOMContentLoaded", ()=>{
		new DashbordForBanner(); //for banner 
		
		new DashbordForRowNav(); //for ProductCard
		
		// const longinNsingupDeshbord_Obj = new longinNsingupDeshbord(); //for Login_N_Singup
		
		//const cartObj= new cartDeshBord(); //cartSiderBar and Floting Btn

});

/*
//for load header, and footer
async function loadPart(file, selector){
	const response = await fetch(file);
	const html = await response.text();
	const elmt =document.querySelector(selector);
	elmt.innerHTML = html;
}

//loadPart("header.html", "header");
//loadPart("footer.html", "footer");
*/
			
		
console.log(window.location.pathname); //this will return whole path with file name