import React, { useEffect, useState } from 'react';
import { client } from '../../../api/appwrite';
import { getMessages, getReceivedMessages, sendMessage } from '../../../api/messagesApi';
import { getCurrentUserData } from '../../../api/apiCalls';
import { getUserDocuments } from '../../../api/userApi';

const Msg = () => {
  const [msg, setMsg] = useState('');
  const [msgList, setMsgList] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const [userId, setUserId] = useState(null); // Store user ID
  const [recieverId, setRecieverId] = useState(null); // Store receiver ID

  useEffect(() => {
    async function fetchData() {
      try {
        // Get current user data
        const user = await getCurrentUserData();
        setUserId(user.$id); // Store user ID
  
        // Fetch messages from both sender and receiver perspectives
        setLoading(true); // Start loading
  
        // Get messages where the user is the sender
        const sentMessages = await getMessages(user.$id, recieverId);
  
        // Get messages where the user is the receiver (swap sender and receiver)
        const receivedMessages = await getMessages(recieverId, user.$id);
  
        // Merge both message lists
        const allMessages = [...sentMessages, ...receivedMessages];
  
        // Sort messages by timestamp (assuming the message has a `createdAt` field)
        allMessages.sort((a, b) => new Date(b.$createdAt) - new Date(a.$createdAt));
  
        // Set the sorted messages to state
        setMsgList(allMessages);
      } catch (error) {
        console.log('Error getting messages:', error);
      } finally {
        setLoading(false); // Stop loading
      }
    }
  
    fetchData();
  
    const unsubscribe = client.subscribe(
      'databases.6799c8c6002ec035cc8c.collections.679b5d920001b01e6659.documents',
      (response) => {
        console.log('Message List Updated');
        fetchData(); // Refresh messages on real-time changes
      }
    );
  
    return () => {
      unsubscribe();
    };
  }, [recieverId]); // Only run once when component mounts or receiver ID changes
  
  

  // Function to send a message
  async function sendMsg(e) {
    e.preventDefault(); // Prevent page reload
    try {
      if (msg.trim() !== '' && recieverId) {
        // Send message
        await sendMessage(userId, recieverId, msg); // Use actual receiver ID
        console.log('Message sent successfully!');
        setMsg(''); // Clear input after sending
      } else {
        console.log('Please select a recipient!');
      }
    } catch (error) {
      console.error('Message error:', error);
    }
  }

  // Handle recieverId change
  const handleReceiverChange = (e) => {
    setMsgList([]);
    setRecieverId(e.target.value); // Update recieverId based on the selected option
  };


  async function getUserDocumentsByRole() {
    try {
      let usrRes = await getUserDocuments('Organization');
    } catch (error) {
      console.log('Error USER ROLE:',error);
      
    }
  }

  return (
    <div style={styles.container}>
    <button onClick={getUserDocumentsByRole}>see</button>
      {/* Dropdown to select receiver */}
      <select 
        name="reciever" 
        id="recieverId"
        onChange={handleReceiverChange} // Update recieverId on selection change
        value={recieverId} // Bind value to recieverId state
        style={styles.select}
      >
        <option value="6799cbab0028802d5a78">Rameez</option>
        <option value="6799d6c30013f1feab75">Jack</option>
        <option value="6799ced8002c6c808c46">Rehan</option>
      </select>

      <h1 style={styles.heading}>Messages</h1>

      {/* Display loading indicator */}
      {loading ? <p style={styles.loading}>Loading messages...</p> : null}

      <ul style={styles.messageList}>
        {msgList && msgList.length ? (
          msgList.map((item, index) => (
            <li key={index} style={item.sender === userId ? styles.messageItemSender : styles.messageItem}>{item.content}</li>
          ))
        ) : (
          <h2 style={styles.noMessages}>No messages</h2>
        )}
      </ul>

      {/* Form for sending messages */}
      <form onSubmit={sendMsg} style={styles.form}>
        <input 
          type="text"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          placeholder="Type a message..."
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Send</button>
      </form>
    </div>
  );
};

export default Msg;

const styles = {
  container: {
    maxWidth: '500px',
    margin: 'auto',
    padding: '20px',
    textAlign: 'center',
    background: '#fff',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  },
  heading: {
    fontSize: '24px',
    color: '#333',
    marginBottom: '10px',
  },
  loading: {
    color: 'orange',
    fontSize: '18px',
  },
  messageList: {
    listStyle: 'none',
    padding: 0,
    margin: '10px 0',
    maxHeight: '300px',
    overflowY: 'auto',
    display: 'flex',
    'flex-direction': 'column-reverse',
  },
  messageItem: {
    background: '#f3f3f3',
    padding: '10px',
    borderRadius: '5px',
    marginBottom: '5px',
    textAlign: 'left',
  },
  messageItemSender:{
    background: 'blue',
    color:'white',
    padding: '10px',
    borderRadius: '5px',
    marginBottom: '5px',
    textAlign: 'left', 
  },
  noMessages: {
    fontSize: '18px',
    color: '#777',
  },
  form: {
    display: 'flex',
    gap: '10px',
    marginTop: '10px',
  },
  input: {
    flex: 1,
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '10px 15px',
    borderRadius: '5px',
    border: 'none',
    background: 'blue',
    color: '#fff',
    cursor: 'pointer',
  },
  select: {
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '16px',
  },
};
