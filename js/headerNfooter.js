import {longinNsingupDeshbord} from './Login_N_Singup.js';
import {setCartObj} from './addBtn.js';
import { cartDeshBord} from './cartManager.js';


export class headerNfooter{
	#elemts;
	constructor(){
		this.#elemts = this.#createHeader();
		const {cartBtn, cartCount}= this.#elemts;
		const cartObj= new cartDeshBord({cartBtn, cartCount});
		setCartObj(cartObj); // for cath addbtn changes
		this.#setHeader();
		this.#setEvents();
		this.#footer();
		this.longinNsingupObj = new longinNsingupDeshbord();
	}
	#setHeader(){
		const header= document.getElementsByTagName("header")[0];
		if (header){
			header.replaceWith(this.#elemts.header);
		}else{
			console.log("⚠️ <header> tag not found in DOM!");
		}
			
	}
	#createHeader(){
		const elemtMap={
			header:{type:"header", id:"", classList:[""]},
			logoNTitle:{type:"div", id:"", classList:["logoNTitle"]},
			searchBar:{type:"div", id:"", classList:["searchBar"]},
			searchBTN:{type:"button", id:"", classList:["searchBTN"]},
			btnArea:{type:"div", id:"", classList:["btnArea"]},
			loginBtn:{type:"button", id:"loginBtn", classList:["loginBtn"]},
			cartBtn:{type:"button", id:"", classList:["cartBtn"]},
			cartCount:{type:"div", id:"", classList:["cartCount"]}
		};
		Object.freeze(elemtMap);
		const elemts={};
		for (const [name, value] of Object.entries(elemtMap)){
			const newElemt = document.createElement(value.type);
			if (value.id){
				newElemt.id = value.id;
			}
			value.classList.forEach(cls=>{
				if(cls){
					newElemt.classList.add(cls);
				}
			});
			elemts[name] = newElemt;
		}
		createStrucher(elemts);
		
		return elemts;

		function createStrucher(elemts){
			const {header,logoNTitle, searchBar, searchBTN, btnArea, loginBtn, cartBtn, cartCount}=elemts;
			logoNTitle.innerHTML = `<a href="./index.html">
					<img src="./img/site/siteLogo.png" alt="Site logo" class="siteLogo" >
					<img src="./img/site/siteTitle.svg" alt="Web Title" class="siteTitle" >
				</a>`;
			
			searchBar.innerHTML = `<input type="search" name="search" id="" placeholder="Search...">`;
			searchBTN.innerHTML = `<img src="./img/svgs/search.svg" alt="search Icon" class="searchIcon">`;
			searchBar.appendChild(searchBTN);

			loginBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
							<path d="M399 384.2C376.9 345.8 335.4 320 288 320l-64 0c-47.4 0-88.9 25.8-111 64.2c35.2 39.2 86.2 63.8 143 63.8s107.8-24.7 143-63.8zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm256 16a72 72 0 1 0 0-144 72 72 0 1 0 0 144z"/>
					</svg><br>Login`;
			cartBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" width="31" class="cartIcon">
							<path d="M0 24C0 10.7 10.7 0 24 0L69.5 0c22 0 41.5 12.8 50.6 32l411 0c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3l-288.5 0 5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5L488 336c13.3 0 24 10.7 24 24s-10.7 24-24 24l-288.3 0c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5L24 48C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"/>
					</svg>
					<br>My cart`;
			cartCount.innerText = `0`;
			cartBtn.append(cartCount);

			btnArea.append(loginBtn, cartBtn);

			header.append(logoNTitle, searchBar, btnArea);
		}
	}

	#setEvents(){
		const {searchBTN, loginBtn, cartBtn}=this.#elemts;
		searchBTN.addEventListener('click', event=>{
			console.log("search butn cliked");
		});
		loginBtn.addEventListener('click', event=>{
			this.longinNsingupObj
		});
	}
	// updateCartCount(cartItemValue){
	// 	const {cartCount}=this.#elemts;
	// 	cartCount.innerText = "0";//qtyDetilsForHeaderCartIcon();
	// }

	#footer(){
		const footer= document.getElementsByTagName("footer")[0];
		footer.innerHTML=`
			<div class="LogoNTitle">
				<a href="./index.html">
					<img src="./img/site/siteLogo.png" alt="siteLogo" class="siteLogo">
					<img src="./img/site/siteTitle.svg" alt="siteTitle" class="siteTitle">
				</a>
			</div>

			<div class="socialMediaLinks">
				<p class="LinksTitle">Social Media Links</p>
				<ul>
					<li><a href="#">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="instaIcon svg">
								<path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/>
						</svg>
					</a></li>
					<li><a href="#">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="twiterIcon svg">
								<path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"/>
						</svg>
					</a></li>
					<li><a href="#"> 
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="facebookIcon svg">
								<path d="M512 256C512 114.6 397.4 0 256 0S0 114.6 0 256C0 376 82.7 476.8 194.2 504.5V334.2H141.4V256h52.8V222.3c0-87.1 39.4-127.5 125-127.5c16.2 0 44.2 3.2 55.7 6.4V172c-6-.6-16.5-1-29.6-1c-42 0-58.2 15.9-58.2 57.2V256h83.6l-14.4 78.2H287V510.1C413.8 494.8 512 386.9 512 256h0z"/>
						</svg>
					</a></li>
					<li><a href="#">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="linkdinIcon svg">
								<path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"/>
						</svg>
					</a></li>
				</ul>
			</div>
			<div class="usefulLinks">
				<ul>
					<li><a href="#">Home</a></li>
					<li><a href="#">Delivery Areas</a></li>
					<li><a href="#">Careers</a></li>
					<li><a href="#">Customer Support</a></li>
					<li><a href="#">About</a></li>
				</ul>
			</div>
		`;
	}
	
}

/*
<header>
			<div class="logoNTitle">
				<a href="./index.html">
					<img src="./img/site/siteLogo.png" alt="Site logo" class="siteLogo" >
					<img src="./img/site/siteTitle.svg" alt="Web Title" class="siteTitle" >
				</a>	 
			</div>

			<div class="searchBar">
				<input type="search" name="search" id="" placeholder="Search...">
				<button class="searchBTN"><img src="./img/svgs/search.svg" alt="search Icon" class="searchIcon"></button>
			</div>
			<div class="btnArea">
				
				<button class="loginBtn" id="loginBtn">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
							<path d="M399 384.2C376.9 345.8 335.4 320 288 320l-64 0c-47.4 0-88.9 25.8-111 64.2c35.2 39.2 86.2 63.8 143 63.8s107.8-24.7 143-63.8zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm256 16a72 72 0 1 0 0-144 72 72 0 1 0 0 144z"/>
					</svg>
					<br>Login
				</button>
				
				<button class="cartBtn">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" width="31" class="cartIcon">
							<path d="M0 24C0 10.7 10.7 0 24 0L69.5 0c22 0 41.5 12.8 50.6 32l411 0c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3l-288.5 0 5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5L488 336c13.3 0 24 10.7 24 24s-10.7 24-24 24l-288.3 0c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5L24 48C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"/>
					</svg>
					<br>My cart
					<div class="cartCount">0</div>
				</button>
				
			</div>
		</header>
*/ 
