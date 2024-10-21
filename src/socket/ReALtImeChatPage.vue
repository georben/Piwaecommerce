<template>
    <div class="chat-container">
      <!-- Sidebar -->
      <div class="sidebar">
        <div class="store" v-for="(store, index) in stores" :key="index">
          <img :src="store.avatar || '/path/to/default-avatar.png'" alt="Avatar" class="avatar" />
          <div class="store-info">
            <h3>{{ store.name }}</h3>
            <p class="status">{{ store.status }}</p>
          </div>
        </div>
      </div>
  
      <!-- Chat Area -->
      <div class="chat-area" v-if="selectedStore">
        <div class="chat-header">
          <img :src="selectedStore.avatar || '/path/to/default-avatar.png'" alt="Avatar" class="header-avatar" />
          <div class="chat-info">
            <h3>{{ selectedStore.name }}</h3>
            <p>{{ selectedStore.status }}</p>
          </div>
        </div>
  
        <div class="message-list">
            <div v-for="(message, index) in messages" :key="index" class="message-item">
            <img :src="selectedStore.avatar" alt="Avatar" class="message-avatar" />
            <p><strong>{{ message.senderId === 1 ? 'You' : 'Seller' }}:</strong> {{ message.text }}</p>
            </div>
        </div>
  
        <div class="input-section">
          <input v-model="newMessage" placeholder="Type a message..." />
          <button @click="sendMessage(2)">
            <img src="send-icon.png" alt="Send" class="send-icon" />
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { io } from 'socket.io-client';
  import { ref, onMounted } from 'vue';
  
  const socket = io('http://localhost:3002');
  const messages = ref([]);
  const newMessage = ref('');
  const selectedStore = ref(null); // Initialize selectedStore as null
  const stores = ref([]); // Assuming you will populate this with store data
  
  onMounted(() => {
  const loggedInUserId = 1;  // Replace with actual logged-in user ID
  socket.emit('join', loggedInUserId);

  // Ensure stores are loaded and selectedStore is not null before fetching messages
  if (selectedStore.value) {
    fetchMessages(selectedStore.value.id); // Fetch messages only if selectedStore is not null
  }

  stores.value = [
    { avatar: '/path/to/store-avatar1.png', name: 'Store 1', status: 'Online', id: 1 },
    { avatar: '/path/to/store-avatar2.png', name: 'Store 2', status: 'Offline', id: 2 }
  ];

  selectedStore.value = stores.value[0]; // Default selected store

  // Listen for incoming messages
  socket.on('receiveMessage', (message) => {
    messages.value.push(message);
  });
});

const fetchMessages = async (chatId) => {
  if (!chatId) return; // Ensure chatId is valid before making the fetch call

  try {
    const response = await fetch(`/api/users/messages/${chatId}`);
    const data = await response.json();
    messages.value = data;
  } catch (error) {
    console.error('Error fetching messages:', error);
  }
};

const sendMessage = async (receiverId) => {
  const message = {
    senderId: 1, // Replace with actual sender ID
    receiverId: receiverId, // Replace with the seller ID
    text: newMessage.value,
    chatId: selectedStore.value.id // Assuming you have a chat ID or similar
  };

  try {
    // Save message to the database
    await fetch('/api/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(message)
    });

    // Push message to the local array and clear input
    messages.value.push(message);
    newMessage.value = '';
  } catch (error) {
    console.error('Error sending message:', error);
  }
};
  </script>
  
  <style scoped>
  .chat-container {
    display: flex;
    height: 100vh;
    background-color: #f1f1f1;
  }
  
  /* Sidebar styles */
  .sidebar {
    width: 25%;
    background-color: #dcdcdc;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  
  .store {
    display: flex;
    align-items: center;
    padding: 10px;
    background-color: #fff;
    border-radius: 10px;
    cursor: pointer;
  }
  
  .store-info {
    margin-left: 10px;
  }
  
  .store h3 {
    margin: 0;
    font-size: 16px;
    color: #333;
  }
  
  .status {
    font-size: 12px;
    color: #666;
  }
  
  /* Avatar styles */
  .avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
  
  /* Chat area styles */
  .chat-area {
    flex: 1;
    display: flex;
    flex-direction: column;
    background-color: #fff;
    padding: 20px;
  }
  
  /* Chat header */
  .chat-header {
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    border-bottom: 1px solid #ddd;
  }
  
  .header-avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 10px;
  }
  
  .chat-info h3 {
    margin: 0;
    font-size: 18px;
  }
  
  .message-list {
    flex: 1;
    padding: 20px 0;
    overflow-y: auto;
  }
  
  .message-item {
    display: flex;
    align-items: flex-start;
    margin-bottom: 10px;
  }
  
  .message-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 10px;
  }
  
  .message-content {
    background-color: #f1f1f1;
    padding: 10px;
    border-radius: 10px;
    max-width: 60%;
  }
  
  .input-section {
    display: flex;
    align-items: center;
    padding-top: 10px;
  }
  
  input {
    flex: 1;
    padding: 10px;
    border-radius: 20px;
    border: 1px solid #ccc;
    outline: none;
  }
  
  button {
    background-color: transparent;
    border: none;
    margin-left: 10px;
    cursor: pointer;
  }
  
  .send-icon {
    width: 24px;
    height: 24px;
  }
  </style>
  