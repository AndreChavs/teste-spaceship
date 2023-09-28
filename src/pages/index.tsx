import React from "react";
import { fetchUserIds } from "@/functions/fetchUsersIds"
import { checkStatus } from "@/functions/checkStatus"
import { sendEmail } from "@/functions/sendEmail"
import { GetStaticProps } from "next";

export const getStaticProps:GetStaticProps = async () => {
  const users = await fetchUserIds()
  const promise = users.map(async (user) => {
    const userCheck = await checkStatus(user);
    if(userCheck.status === 'online'){
      const userSend = await sendEmail(userCheck.id)
      if(userSend){
        console.log(userCheck.id)
        return userCheck.id
      }      
    }
    return null
  });
  const results = await Promise.all(promise)
  const data = results.filter((user) => user !== null)
  return {
    props:{data}
  }
}

export default function Home({data}:{data:string[]}) {
  const [userData, setUserData] = React.useState<string[]>(data)  

  function render() {
    return userData.map((user) => {
      return <li key={user}>{user}</li>
    })
  }
    
  return (
    <>
     {render()}
    </>
  )
}

