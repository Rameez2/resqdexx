import React, { useEffect, useState } from "react";
import { client } from "../../../api/appwrite";
import { getMessages, sendMessage, fetchMyChats } from "../../../api/messagesApi";
import { getCurrentUserData } from "../../../api/authApi";
import styles from "../../../styles/profile/Msg.module.css";
import MessagesSection from "./Messages/MessagesSection"; // Import the new component

const Msg = ({ adopterInfo }) => {
  const [msg, setMsg] = useState("");
  const [msgList, setMsgList] = useState([]);
  const [chatList, setChatList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userLoading, setUserLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [recieverId, setRecieverId] = useState("");
  const [recieverName, setRecieverName] = useState("");
  const [messageSending, setMessageSending] = useState(false);

  // console.log("got adopter info", adopterInfo);

  // If adopterInfo exists (i.e. redirected from search page), set receiver info accordingly
  useEffect(() => {
    if (adopterInfo) {
      setRecieverId(adopterInfo.$id);
      setRecieverName(adopterInfo.name);
    }
  }, [adopterInfo]);

  useEffect(() => {
    async function fetchData() {
      try {
        setUserLoading(true);
        const currentUser = await getCurrentUserData();
        const userChats = await fetchMyChats(currentUser.$id);
        setUser(currentUser);
        setChatList(userChats);
      } catch (error) {
        console.log("Error fetching user:", error);
      } finally {
        setUserLoading(false);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchMessages() {
      try {
        // Only show the loader if there are no messages loaded yet
        if (msgList.length === 0) {
          setLoading(true);
        }
        const sentMessages = await getMessages(user.$id, recieverId);
        const receivedMessages = await getMessages(recieverId, user.$id);
        const allMessages = [...sentMessages, ...receivedMessages];
        allMessages.sort((a, b) => new Date(b.$createdAt) - new Date(a.$createdAt));
        setMsgList(allMessages);
      } catch (error) {
        console.log("Error getting messages:", error);
      } finally {
        setLoading(false);
      }
    }
    if (recieverId && user) fetchMessages();

    const unsubscribe = client.subscribe(
      "databases.6799c8c6002ec035cc8c.collections.679b5d920001b01e6659.documents",
      (response) => {
        fetchMessages();
      }
    );
    return () => unsubscribe();
  }, [recieverId, user]);

  async function sendMsg(e) {
    e.preventDefault();
    if (messageSending) return;

    try {
      if (msg.trim() !== "" && recieverId) {
        setMsg("");
        const newMessage = {
          sender: user.$id,
          reciever: recieverId,
          content: msg,
          $createdAt: new Date().toISOString(),
        };
        // Optimistically add the new message to the list
        setMsgList((prevMessages) => [newMessage, ...prevMessages]);
        setMessageSending(true);
        await sendMessage(user.$id, recieverId, msg);
      } else {
        console.log("Please select a recipient!");
      }
    } catch (error) {
      console.error("Message error:", error);
      alert("Failed to send message");
    } finally {
      setMessageSending(false);
    }
  }

  const handleReceiverChange = (otherUserId, otherUserName) => {
    setMsgList([]);
    setRecieverId(otherUserId);
    setRecieverName(otherUserName);
  };

  if (userLoading) {
    return <p className={styles.userLoader}>Fetching user data...</p>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.searchAndChats}>
        <div className={styles.searchContainer}>
          <input type="text" placeholder="Search chats..." />
        </div>
        {chatList.length ? (
          <div className={styles.chatInfo}>
            {chatList.map((chat) => (
              <div key={chat.otherUserId}>
                <span onClick={() => handleReceiverChange(chat.otherUserId, chat.otherUserName)}>
                  {chat.otherUserName}
                </span>
                <span>{chat.lastMessage}</span>
              </div>
            ))}
          </div>
        ) : null}
      </div>

      {/* Use the extracted MessagesSection component */}
      <MessagesSection
        msgList={msgList}
        msg={msg}
        setMsg={setMsg}
        sendMsg={sendMsg}
        loading={loading}
        user={user}
        recieverName={recieverName}
      />
    </div>
  );
};

export default Msg;
