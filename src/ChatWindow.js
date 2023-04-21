import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Input = styled.input`
flex:1;
height:30px;
padding: 0 30px;
border-radius: 15px;
border:none;
outline:none;
`;

const SendButton = styled.button`
height: 30px;
border-radius: 15px;
border:none;
cursor:pointer;
width:80px;
`;

const ChatWindow = (props) => {

    const [messages, setMessages] = useState([]);
    const [user, setUser] = useState([]);
    const [count, setCount] = useState(0);
    useEffect(() => {
        setMessages(props.data.messageList);
        setUser(props.data);
    }, [props.data]);

    const handleSendMessage = (event) => {

        event.preventDefault();
        setCount(count + 1);
        const typedMessage = {
            message: event.target.elements.typedMessage.value,
            messageId: `userMsg${count}`,
            messageType: "text",
            sender: "USER",
            timestamp: 1632205237669
        };
        console.log(typedMessage)
        console.log(messages)
        setMessages([...messages, typedMessage]);
        console.log('after::', messages)
        event.target.elements.typedMessage.value = ''
    };

    return (
        <div className="ChatScreen">
            <div>

                <div className="ChatBox">
                    <div className="ChatTitle">
                        <img className="UserProfile" src={user.imageURL} alt="Profile Image" />
                        {user.title}
                    </div>
                    <div className="ChatArea">
                        {messages && messages.map((message) => (

                            message.sender === "BOT" ?
                                <div key={message.messageId} className="ChatsReply">{message.message} {"\n"} </div>
                                :
                                <div key={message.messageId} className="Chats">{message.message} {"\n"} </div>

                        ))}
                    </div>
                    <form onSubmit={handleSendMessage} className="ChatInput">
                        <Input type="text" name="typedMessage" placeholder="Start typing..." />
                        <SendButton>Send</SendButton>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ChatWindow;
