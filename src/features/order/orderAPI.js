export function createOrder(order) {
    return new Promise(async(resolve) =>{
      const response = await fetch('http://localhost:8080/orders',{
       method:'POST',
      body: JSON.stringify(order),
      headers:{'content-type':'application/json'}
    })
      const data = await response.json()
  
      //ToDo: on server it will only return some info of the user(not password)
      resolve({data})
    }
    );
  }

  export function UpdateOrder(order) {
    return new Promise(async(resolve) =>{
      const response = await fetch('http://localhost:8080/orders/'+order.id,{
       method:'PATCH',
      body: JSON.stringify(order),
      headers:{'content-type':'application/json'}
    })
      const data = await response.json()
      //ToDo: on server it will only return some info of the user(not password)
      resolve({data})
    }
    );
  }


  export function fetchAllOrders(sort,pagination) {
    let queryString='';

    for(let key in sort){
      queryString+=`${key}=${sort[key]}&`
    }


    let count=0;
  for (let key in pagination) {
    if(count==0)
    queryString += `${key}=${pagination[key]}&`;
   else queryString+=`${key}=${pagination[key]}`;
   count++;
    console.log("query string"+queryString);
  }
  
 

  return new Promise(async(resolve) =>{
    // TODO: we will not hard-code server here
    const response = await fetch('http://localhost:8080/orders?'+queryString)
    const data = await response.json()
    const totalItems = await response.headers.get('X-Total-Count')
    resolve({data:{orders:data,totalItems:+totalItems}})
  });
   }
  
  // export function fetchAllOrders() {
  //   return new Promise(async(resolve) =>{
  //     // TODO: we will not hard-code server here
  //     const response = await fetch('http://localhost:8080/orders')
  //     const data = await response.json()
  //     resolve({data})
  //   }
  //   );
  // }