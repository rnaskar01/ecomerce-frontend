export function createUser(userData) {
  return new Promise(async(resolve) =>{
    const response = await fetch('http://localhost:8080/users',{
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

export function checkUser(logininfo) {
  return new Promise(async(resolve,reject) =>{
    const email=logininfo.email;
    const password=logininfo.password
    const response = await fetch('http://localhost:8080/users?email='+email)
    const data = await response.json()
    //console.log({data});
    if(data.length){
      if(password===data[0].password){
        resolve({data:data[0]})
      }
      else{
        reject({message: 'Wrong email or password'})

      }
    }else{
      reject({message: 'User Not Found'})
    }
    //ToDo: on server it will only return some info of the user(not password)

  }
  );
}


export function signOut(userId) {
  return new Promise(async(resolve) =>{
      //ToDo: on server we will remove user session info
    resolve({data: 'success'})
  });
  }


