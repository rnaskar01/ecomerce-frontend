export function createOrder(order) {
    return new Promise(async(resolve) =>{
      const response = await fetch('/orders',{
       method:'POST',
      body: JSON.stringify(order),
      headers:{'content-type':'application/json'}
    })
      const data = await response.json()
  
      //: on server it will only return some info of the user(not password)
      resolve({data})
    }
    );
  }

  export function UpdateOrder(order) {
    return new Promise(async(resolve) =>{
      const response = await fetch('/orders/'+order.id,{
       method:'PATCH',
      body: JSON.stringify(order),
      headers:{'content-type':'application/json'}
    })
      const data = await response.json()
      //: on server it will only return some info of the user(not password)
      resolve({data})
    }
    );
  }


  export function fetchAllOrders(sort,pagination) {
    let queryString='';

    for(let key in sort){
      queryString+=`${key}=${sort[key]}&`
    }


  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`;

  }
  
 

  return new Promise(async(resolve) =>{
    // : we will not hard-code server here
    const response = await fetch('/orders?'+queryString)
    const data = await response.json()
    const totalOrders = await response.headers.get('X-Total-Count')
    resolve({data:{orders:data,totalOrders: +totalOrders}})
  });
   }
  
  // export function fetchAllOrders() {
  //   return new Promise(async(resolve) =>{
  //     // : we will not hard-code server here
  //     const response = await fetch('/orders')
  //     const data = await response.json()
  //     resolve({data})
  //   }
  //   );
  // }