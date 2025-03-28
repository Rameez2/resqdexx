import React, { useEffect, useState } from "react";
import { client } from "../../../../api/appwrite";
import { getMessages, sendMessage, fetchMyChats } from "../../../../api/messagesApi";
import { getCurrentUserData } from "../../../../api/authApi";
import styles from "../../../../styles/messages/Msg.module.css";
import MessagesSection from "./MessagesSection"; // Import the MessagesSection component
import ChatList from "./ChatList"; // Import the new ChatList component

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
        updateChat(recieverId,msg);
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

  function updateChat() {
    setChatList((prevChatList) => {
      // Find the chat with the recieverId and remove it from the list
      const updatedChatList = prevChatList.filter(chat => chat.otherUserId !== recieverId);
      
      // Create a new chat object for the receiver (or update if it already exists)
      const updatedChat = {
        otherUserId: recieverId,
        otherUserName: recieverName,
        lastMessage: msg,
        lastMessageTime: new Date().toISOString(), // Update the timestamp
      };
  
      // Add the updated chat to the top
      return [updatedChat, ...updatedChatList];
    });
  }

  if (userLoading) {
    return <p className={styles.userLoader}>Fetching user data...</p>;
  }

  return (
    <div className={styles.container}>
      {/* Chat List (including search) */}
      <ChatList chatList={chatList} handleReceiverChange={handleReceiverChange} />

      {/* Use the extracted MessagesSection component */}
      <MessagesSection
        msgList={msgList}
        msg={msg}
        setMsg={setMsg}
        sendMsg={sendMsg}
        loading={loading}
        user={user}
        recieverName={recieverName}
        updateChat={updateChat}
      />
    </div>
  );
};

export default Msg;
