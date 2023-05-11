import { useState, useEffect } from "react"
import ScrollToBottom from "react-scroll-to-bottom"

const Chat = ({socket, userName, room}) => {

    const [currentMessage, setCurrentMessage] = useState("")
    const [messageList, setMessageList] = useState([])

    const sendMessage = () => {
        if(currentMessage !== ""){
            const messageData = {
                room:room,
                author:userName,
                message:currentMessage,
                time:new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
            }

            socket.emit("send_message", messageData);
            setMessageList((message)=>[...message,messageData]);
            setCurrentMessage("");
        }
    }
    useEffect(()=>{
        socket.on("receive_message",(messageData)=>{
            setMessageList((message)=>[...message,messageData]);
        })
    },[socket])

    return (
        <div className="chat-window">
            <div className="chat-header">
                <p>Live Chat</p>
            </div>
            <div className="chat-body">
                <ScrollToBottom className="message-container">
                    {
                        messageList.map((msgContent)=>{
                            return (
                                <div className="message" id={userName === msgContent.author ? "you":"other"}>
                                    <div >
                                        <div className="message-content">
                                            <p>{msgContent.message}</p>
                                        </div>
                                        <div className="message-meta">
                                            <p id="time">{msgContent.time}</p>
                                            <p id="author">{msgContent.author}</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </ScrollToBottom>
            </div>
            <div className="chat-footer">
                <input type="text" placeholder="Hey..." value={currentMessage} onChange={(e)=>setCurrentMessage(e.target.value)} onKeyDown={(e)=>{e.key === "Enter" && sendMessage()}} />
                <button onClick={sendMessage}>&#9658;</button>
            </div>
        </div>
    )
}

export default Chat