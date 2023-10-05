/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { fetchUserIds } from "@/functions/fetchUsersIds"
import { checkStatus } from "@/functions/checkStatus"
import { sendEmail } from "@/functions/sendEmail"




export default function Home() {
  const [data , setData] = React.useState<(string | undefined)[]>()

  React.useEffect(() => {
    async function main(
      fetchUsers: () => Promise<string[]>,
      statusCheck: (userId: string) => Promise<{status: string, id:string}>,
      emailSend: (userId: string) => Promise<boolean>,
      
    ) {
      const users = await fetchUsers()
      const promesa = users.map(async (user) => {
        const checkUser = await statusCheck(user)
        if (checkUser.status === 'online') {
          const sendUser = await emailSend(checkUser.id)
          if (sendUser) {
            console.log(checkUser)
            return checkUser.id
          }
        }
      });
      const result = await Promise.all(promesa)
      const response = result.filter((user) => user !== undefined)
      setData(response)
    }
    if(!data){
      main(fetchUserIds, checkStatus, sendEmail)
    }
  },[])



  return (
    <>
     {data?.map((user) => {
      return <li key={user}>{user}</li>
     })}
    </>
  )
}

