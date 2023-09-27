export default function Home() {
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
