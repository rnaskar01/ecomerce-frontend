export function createUser(userData) {
  return new Promise(async(resolve) =>{
    const response = await fetch('http://localhost:8080/auth/signup',{
     method:'POST',
    body: JSON.stringify(userData),
    headers:{'content-type':'application/json'}
  })
    const data = await response.json()

    //ToDo: on server it will only return some info of the user(not password)
    resolve({data})
  }
  );
}

export function loginUser(logininfo) {
  return new Promise(async(resolve,reject) =>{
    try {
      const response = await fetch('http://localhost:8080/auth/login',{
        method:'POST',
      body: JSON.stringify(logininfo),
      headers:{'content-type':'application/json'}
      });
      if(response.ok){
        const data = await response.json()
        resolve({data})
      }else{
        const error = await response.text();
        reject(error)
      }
    } catch (error) {
      reject(error)
    }
  });
}


export function checkAuth() {
  return new Promise(async(resolve,reject) =>{
    try {
      const response = await fetch('http://localhost:8080/auth/check');
      if(response.ok){
        const data = await response.json()
        resolve({data})
      }else{
        const error = await response.text();
        reject(error)
      }
    } catch (error) {
      reject(error)
    }
  });
}



export function signOut(userId) {
  return new Promise(async(resolve) =>{
      //ToDo: on server we will remove user session info
    resolve({data: 'success'})
  });
  }

  export function resetPasswordRequest(email) {
    return new Promise(async(resolve,reject) =>{
      try {
        const response = await fetch('http://localhost:8080/auth/reset-password-request',{
          method:'POST',
          body: JSON.stringify({email}),
          headers:{'content-type':'application/json'}
        });
        if(response.ok){
          // console.log("its working");

          const data = await response.json()
          resolve({data})
        }else{
          const error = await response.text();
          reject(error)
        }
      } catch (error) {
        reject(error)
      }
    });
  }


  export function resetPassword() {
    return new Promise(async(resolve,reject) =>{
      try {
        const response = await fetch('http://localhost:8080/auth/reset-password',{
          method:'POST',
          body: JSON.stringify({}),
          headers:{'content-type':'application/json'}
        });
        if(response.ok){
          // console.log("its working");

          const data = await response.json()
          resolve({data})
        }else{
          const error = await response.text();
          reject(error)
        }
      } catch (error) {
        reject(error)
      }
    });
  }