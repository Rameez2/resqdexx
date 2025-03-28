import React, { useState } from "react";
import styles from "../../../../styles/messages/Msg.module.css";

const ChatList = ({ chatList, handleReceiverChange }) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter chats based on search term (searching in otherUserName and lastMessage)
  const filteredChats = chatList.filter(
    (chat) =>
      chat.otherUserName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      chat.lastMessage.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatTime = (isoString) => {
    const date = new Date(isoString);
    return `${date.getDate()} ${date.toLocaleString("en-US", { month: "short" })}, ${date.toLocaleString("en-US", { hour: "numeric", minute: "numeric", hour12: true })}`;
  };
  

  return (
    <div className={styles.searchAndChats}>
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search chats..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.searchInput}
        />
      </div>
      {filteredChats.length ? (
        <div className={styles.chatInfo}>
          {filteredChats.map((chat) => (
            <div key={chat.otherUserId} className={styles.chatItem}>
              <div>
                <img src="/static_images/about-dog.jpeg" style={{width:'50px',height:'50px',borderRadius:""}} alt="" />
              </div>
              <div className={styles.nameAndMsg}>
                <span
                  onClick={() =>
                    handleReceiverChange(chat.otherUserId, chat.otherUserName)
                  }
                  className={styles.chatName}
                >
                  {chat.otherUserName}
                </span>
                <span className={styles.chatLastMessage}>
                  {chat.lastMessage}
                </span>
              </div>
              <div>
                <span> {formatTime(chat.lastMessageTime)}</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className={styles.noChats}>No chats found.</p>
      )}
    </div>
  );
};

export default ChatList;
