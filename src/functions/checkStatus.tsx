export const checkStatus = async (userId: string) => {
  const promessa = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (userId) {
        return resolve(
          (Math.random() > 0.8) ? { status: "offline", id: userId } : { status: "online", id: userId }
        )
      } else{
        return reject(() => {
          console.error(`Ops, desculpe. Ocorreu um erro ao transportar os dados!`)
        })
      }
    },1000)
  })
  const response = await promessa
  if(typeof response === 'object' && response){
    if('status' in response && 'id' in response){        
      return response as {status: string; id:string}
    }else {
      throw new Error()
    }
  }else {
    throw new Error()
  }
};