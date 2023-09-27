import React from "react";


export default function Home() {
  const [userData, setUserData] = React.useState<string[]>([])

  const fetchUserIds = async () => {
    return ["john.smith", "sara.lee", "jack.ma"];
  };

  const checkStatus = async (userId: string) => {
    return Math.random() > 0.8
      ? { status: "offline", id: userId }
      : { status: "online", id: userId };
  };

  const sendEmail = async (userId: string) => {    
    return Math.random() > 0.1 ? true : false;
  };

  async function main(
    users:() => Promise<string[]>,
    check:(v:string) => Promise<{status:string; id:string}>,
    send:(v:string) => Promise<boolean>) {
    try {
      let data: string[] = []
      const usuarios = await users()
      const usuarioCheck = usuarios.map(async (user) => {
        const userCheck = await check(user)        
        if(userCheck.status === 'online'){          
          return userCheck.id
        }
      })
      usuarioCheck.forEach(async (user) => {
        const item = await user
        if (item !== undefined) {
          const userSend = await send(item)
          if(userSend){
            data.push(item)                                    
          }
        }
        setUserData(data)
      })
      
    } catch (error) {
      console.error(`DEU RUIM: ${error}`)
    }
  }
  React.useEffect(() => {
    main(fetchUserIds,checkStatus,sendEmail)
    
    
  },[])
  function render() {
    if (userData) {
      return userData.map((user) => {
        return <li key={user}>{user}</li>
      })
    }
  }
    
  return (
    <>
     {render() && render() }
    </>
  )
}
