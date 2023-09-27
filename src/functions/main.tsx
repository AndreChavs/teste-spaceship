import { fetchUserIds } from "@/functions/fetchUsersIds"
import { checkStatus } from "@/functions/checkStatus"
import { sendEmail } from "@/functions/sendEmail"

async function main(
  usuarios:() => Promise<string[]>,
  statusCheck:(value:string) => Promise<{status:string, id:string}>,
  emailSend:(value:string) => Promise<boolean>,
  setUserData:React.Dispatch<React.SetStateAction<string[]>>
) {
  try {
    let data: string[] = []
    const users = await usuarios();
    const
  } catch (error) {
    
  }
}

// return usuarios().then((users) => {
//   const usersCheckSend = users.map(async(user) => {
//     const check = await statusCheck(user)
//     if(check.status === 'online'){
//       const send = await emailSend(check.id)
//       if (send) {
//         return check.id
//       }
//     }
//   })
//   return usersCheckSend.map((user, id) => {          
//       return user.then( item => {
//         if(item !== undefined){
//           return <li key={id}>{item}</li>
//         }
//       })
      
//   })
// })