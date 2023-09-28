export const sendEmail = async (userId: string) => {
  const promessa = new Promise((resolve, reject) => {
    setTimeout(() => {
      if(userId){
        resolve((Math.random() > 0.1) ? true : false)
      }else{
        reject(() => console.error(`Ops, desculpe. Um Erro Ocorreu!`))
      }
    })
  })
  const response = await promessa
  if(typeof response === 'boolean'){
    return response
  }else {
    throw new Error()
  }    
};