import React, { useEffect, useState } from "react";
import ChatWindow from './ChatWindow';
import styled from "styled-components";

const ChatUserList = () => {
    const [data, setData] = useState([]);
    const [chatData, setChatData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filteredData, setFilteredData] = useState([]);
    const [filterValue, setFilterValue] = useState('');
    const [noChat, setNoChat] = useState(true);

    const Input = styled.input`
        flex:1;
        height:30px;
        padding: 0 30px;
        border-radius: 15px;
        border:none;
        outline:none;
    `;

    useEffect(() => {
        fetch('https://my-json-server.typicode.com/codebuds-fk/chat/chats')
            .then((resp) => resp.json())
            .then((json) => {
                setData(json);
                setLoading(false)
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    useEffect(() => {
        const filtered = data.filter(item => item.title.includes(filterValue));
        setFilteredData(filtered);
    }, [data, filterValue]);

    const handleFilterChange = (event) => {
        setFilterValue(event.target.value);
    }

    const handleButtonClick = (item) => {
        setNoChat(false);
        setChatData(item);
    }

    function formatDateTime(seconds) {
        const date = new Date(seconds * 1000);
        return date.toLocaleString();
    }

    return (
        <div className="ChatWindow">
            <div className="ChatList">
                <div className="ChatTitle">
                    <div>
                        <Input type="text" value={filterValue} placeholder="Filter..." onChange={handleFilterChange} />
                    </div>
                </div>
                <div className="Chat">
                    {loading ? (
                        <p>Loading...</p>
                    ) : (filteredData && filteredData.map((item) => (
                        <div className="ChatView" key={item.id} onClick={() => handleButtonClick(item)}>
                            <div className="ChatName">
                                <img className="UserProfile" src={item.imageURL} alt="Profile Image" />
                                {item.title}
                            </div>
                            <div className="ChatDescriptiom">
                                Order Id: {item.orderId}
                            </div>
                            <div className="ChatTime">
                                {formatDateTime(item.latestMessageTimestamp)}
                            </div>
                        </div>
                    )))}
                </div>
            </div>
            {(noChat) ?
                <div className="EmptyChat"> No chat available.</div>
                : <ChatWindow data={chatData} />}
        </div>
    )
}

export default ChatUserList;
