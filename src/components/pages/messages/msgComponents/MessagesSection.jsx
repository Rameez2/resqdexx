import React from "react";
import styles from "../../../../styles/messages/msgContent.module.css";

const MessagesSection = ({ msgList, msg, setMsg, sendMsg, loading, user,recieverName }) => {
  return (
    <div className={styles.messagesSection}>
    <div className={styles.sectionTop}>
      <img src="/static_images/about-cat.jpeg" style={{width:'50px',height:'50px',borderRadius:'50%'}} alt="" />
      <h1 className={styles.heading}> {recieverName}</h1>
    </div>

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

      <form onSubmit={sendMsg} className={styles.formContainer}>
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
