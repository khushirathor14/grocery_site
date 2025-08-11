import {staticData} from './staticProductData.js';
// import {cartDeshBord} from './cartManager.js';

export class SQLData{
	
	static async getDataFromSql(rauterName) {
		if (rauterName ==="products"){
			
		
		}else if (rauterName === "catagory"){
			
		}else {
			
			return data;
		}
	}
	static async getAllProductData(){
		return await this.#requestT2Server("/products") || staticData.productDataList;
	}
	static async getCatagoryData(){
		return await this.#requestT2Server("/catagory") || staticData.categoryData;
	}
	static async getSelectdProductData(product_id){
		const data = await this.#requestT2Server(`/products/${product_id}`);
		return data?.[0] || fetchData(product_id);
	}
	static async getSortProductData(product_id){
		const data = await this.#requestT2Server(`/products/sort/${product_id}`);
		return data?.[0] || fetchData(product_id);
	}

	static async #requestT2Server(routerName){
		try{
			const res = await fetch(routerName);
			const data = await res.json();

			//console.table(data);
			return data;
		} catch (err){
			console.error("fetch Error", err);
		}
	}
}
 



export async function getSqlData(tableName){
	const res = await fetch(`/api/${tableName}`);
}


//const data = fatchData(productId);
	//console.log(data);
//get specfic Product Data
function fetchData(product_Id){
	const allDataList =staticData.productDataList; //ye fake data js/staticProductData.js se aa raha hai.
	return allDataList.find(obj=> obj.ProductId === product_Id) || null;
}
