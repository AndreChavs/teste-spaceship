export const fetchUserIds = async () => {
  const promessa = new Promise((resolve) => {
    setTimeout(() => {
      resolve(["john.smith", "sara.lee", "jack.ma"])
    })
  })
  const response = await promessa;    
  if(response instanceof Array){
     return response.map((user) => {
      if(typeof user === 'string'){
        return user
      }else {
        throw new Error('')
      }
    })
  } else {
    throw new Error('')
  }
};