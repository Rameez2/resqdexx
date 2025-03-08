import React from "react";
import styles from "../../../../styles/profile/Messages/msgContent.module.css";

const MessagesSection = ({ msgList, msg, setMsg, sendMsg, loading, user,recieverName }) => {
  return (
    <div className={styles.messagesSection}>
      <h1 className={styles.heading}> {recieverName}</h1>

      {/* {loading && <p className={styles.loading}>Loading messages...</p>} */}

      <ul className={styles.messageList}>
        {msgList && msgList.length ? (
          msgList.map((item, index) => (
            <li
              key={index}
              className={
                item.sender === user.$id
                  ? styles.messageItemSender
                  : styles.messageItem
              }
            >
              {item.content}
            </li>
          ))
        ) : (
          <h2 className={styles.noMessages}>No messages</h2>
        )}
      </ul>

      <form onSubmit={sendMsg} className={styles.form}>
        <input
          type="text"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          placeholder="Type a message..."
          className={styles.msgInput}
        />
        <button type="submit" className={styles.sendMsgBtn}>
          <i className="fa-solid fa-paper-plane"></i>
        </button>
      </form>
    </div>
  );
};

export default MessagesSection;
