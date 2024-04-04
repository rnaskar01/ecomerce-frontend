export function fetchAllProducts() {
  return new Promise(async(resolve) =>{
    // TODO: we will not hard-code server here
    const response = await fetch('http://localhost:8080/products')
    const data = await response.json()
    resolve({data})
  }
  );
}

export function fetchProductById(id) {
  return new Promise(async(resolve) =>{
    // TODO: we will not hard-code server here
    const response = await fetch('http://localhost:8080/products/'+id)
    const data = await response.json()
    resolve({data})
  }
  );
}


export function createProduct(product) {
  return new Promise(async(resolve) =>{
    // TODO: we will not hard-code server here
    const response = await fetch('http://localhost:8080/products/',{
      method:'POST',
     body: JSON.stringify(product),
     headers:{'content-type':'application/json'}
  });
  const data = await response.json()
  resolve({data})
});
}

export function updateProduct(update) {
  return new Promise(async(resolve) =>{
    const response = await fetch('http://localhost:8080/products/'+update.id,{
     method:'PATCH',
    body: JSON.stringify(update),
    headers:{'content-type':'application/json'}
  })
    const data = await response.json()

    //ToDo: on server it will only return some info of the user(not password)
    resolve({data})
  }
  );
}

export function fetchProductsByFilters(filter,sort,pagination) {
  // filter={"category":"SmartPhone"}
  //ToDo: on server it will support multiple categories
  // Sort={_sort:"price",_order:"desc"}
  // Pagination={_page:1,_limit:10}
  //ToDo: server will filter Deleted Product in case of non admin


  let queryString='';
  for(let key in filter){
    const categoryValues=filter[key];
    if(categoryValues.length){
      const lastcategoryValues=categoryValues[categoryValues.length-1]
      queryString+=`${key}=${lastcategoryValues}&`
    }
  }
  for(let key in sort){
    queryString+=`${key}=${sort[key]}&`
  }
  // for(let key in pagination){
  //   queryString+=`${key}=${pagination[key]}&`
  // }
   let count=0;
  for (let key in pagination) {
    if(count==0)
    queryString += `${key}=${pagination[key]}&`;
   else queryString+=`${key}=${pagination[key]}`;
   count++;
    //console.log(queryString);
  }
  
 

  return new Promise(async(resolve) =>{
    // TODO: we will not hard-code server here
    const response = await fetch('http://localhost:8080/products?'+queryString)
    const data = await response.json()
    const totalItems = await response.headers.get('X-Total-Count')
    resolve({data:{products:data,totalItems:+totalItems}})
  });
}


export function fetchCategories() {
  return new Promise(async(resolve) =>{
    // TODO: we will not hard-code server here
    const response = await fetch('http://localhost:8080/categories')
    const data = await response.json()
    resolve({data})
  }
  );
}

export function fetchBrands() {
  return new Promise(async(resolve) =>{
    // TODO: we will not hard-code server here
    const response = await fetch('http://localhost:8080/brands')
    const data = await response.json()
    resolve({data})
  }
  );
}