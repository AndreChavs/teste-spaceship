import React from "react";
import { fetchUserIds } from "@/functions/fetchUsersIds"
import { checkStatus } from "@/functions/checkStatus"
import { sendEmail } from "@/functions/sendEmail"



export default function Home() {
  const [userData, setUserData] = React.useState<string[]>([])


  React.useEffect(() => {
    let data: string[] = []
    async function main(
      usuarios:() => Promise<string[]>,
      statusCheck:(value:string) => Promise<{status:string, id:string}>,
      emailSend:(value:string) => Promise<boolean>,
      setUserData:React.Dispatch<React.SetStateAction<string[]>>
      ) {
      try {
        const users = await usuarios();
        users.forEach(async (user) => {
          const userCheck = await statusCheck(user);
          if(userCheck.status === 'online'){
            const userSend = await emailSend(userCheck.id);
            if (userSend) {
              data.push(userCheck.id)
            }
          }
          setUserData(data)
          // console.log(data)
        })
      } catch (error) {
        console.error(`DEU RUIM: ${error}`)
      }
    }
    console.log(userData.length)
    if(userData.length === 0){
      main(fetchUserIds,checkStatus,sendEmail,setUserData)
    }
    
    
    
  },[])
  function render() {
    if (userData) {
      return userData.map((user) => {
        console.log(user)
        return <li key={user}>{user}</li>
      })
    }else {
      return <p>Erro ao Buscar Dados</p>
    }
  }
    
  return (
    <>
     {render() && render()}
    </>
  )
}
