import { useState, useEffect } from "react"

const Chat = ({socket, userName, room}) => {

    const [currentMessage, setCurrentMessage] = useState("")

    const sendMessage = () => {
        if(currentMessage !== ""){
            const messageData = {
                room:room,
                author:userName,
                message:currentMessage,
                time:new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
            }

            socket.emit("send_message", messageData);
        }
    }
    useEffect(()=>{
        console.log("antes del socket")
        socket.on("receive_message",(messageData)=>{
            console.log("mensaje por parte de la otra persona")
            console.log(messageData)
        })
    },[socket])

    return (
        <div>
            <div className="chat-header">
                <p>Live Chat</p>
            </div>
            <div className="chat-body">

            </div>
            <div className="chat-footer">
                <input type="text" placeholder="Hey..." onChange={(e)=>setCurrentMessage(e.target.value)} />
                <button onClick={sendMessage}>&#9658;</button>
            </div>
        </div>
    )
}

export default Chat