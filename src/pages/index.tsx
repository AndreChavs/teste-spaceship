// import React, { use } from "react"
// import { fetchUserIds } from "@/functions/fetchUsersIds"
// import { checkStatus } from "@/functions/checkStatus"
// import { sendEmail } from "@/functions/sendEmail"


export default function Home() {
  
  // React.useEffect( () => {
  //   let arrayData:string[] = []
  //   async function main(
  //     usuarios:() => Promise<string[]>,
  //     statusCheck:(value:string) => Promise<{status:string, id:string}>,
  //     emailSend:(value:string) => Promise<boolean>
  //   ) {
  //     const users = await usuarios()
  //     const UsersCheckSend = users.map(async (user) => {
  //       const check = await statusCheck(user)
  //       const send = await emailSend(check.id)
  //       if (check.status === 'online' && send) {
  //         return check.id
  //       }
  //     })
      
  //     return UsersCheckSend   
  //   }    
  //   main(fetchUserIds, checkStatus, sendEmail).then((res) => {
  //     res.map(async (user) => {
  //       if (await user) {
  //         const item = await user
  //         if(item){
  //           console.log('teste1')
  //           arrayData.push(item)
  //         }
  //       }
  //     })
  //     console.log('teste2')
  //   })
  // },[])

  const fetchUserIds = () => {
    return ["john.smith", "sara.lee", "jack.ma"];
  };

  const checkStatus = (userId: string) => {
    return Math.random() > 0.8
      ? { status: "offline", id: userId }
      : { status: "online", id: userId };
  };

  const sendEmail = (userId: string) => {    
    return Math.random() > 0.1 ? true : false;
  };

  function render(
    users:() => string[],
    check:(v:string) => {status:string; id:string},
     send:(v:string) => boolean) {
    const data = users().map((user) => {
      const userCheck = check(user)
      if (userCheck.status === 'online') {
        const sendCheck = send(userCheck.id)
        if(sendCheck){
          return userCheck.id
        }
      }
    })
    return data.map((user, id) => {
      if (user !== undefined) {
        return <li key={id}>{user}</li>
      }
    })
  }
  
  return (
    <>
     {render(fetchUserIds,checkStatus,sendEmail)}
    </>
  )
}
