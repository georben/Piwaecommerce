<template>
  <div class="user" style="padding:50px; max-width: 70%; background-color:#3d3652; margin-top:10px; display:flex; align-items: center; 
    justify-content: space-between; margin:auto; border-radius: 15px; box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);">
    <div v-if="user">
    <img src="@/assets/profile.png" alt="User Profile Picture" style="height: 150px; width: 150px; border-radius: 50%; object-fit: cover;">
    <p>{{ user.fullName }}</p>

<div class="btns" style="display: flex; gap: 10px;">
      <button style="padding: 10px;">Report User</button>
      <button style="padding: 10px;">Contact Seller</button>
    </div>
  </div>
</div>
    
    <div class="item-list" style="  padding: 20px; max-width: 1200px; margin: 0 auto;">
      <ul>
        <li v-for="(item, index) in approvedItems" :key="index" class="item-container">
          <img :src="item.imageUrl" alt="item image" class="item-image">
          <div class="item-details">
            <h4 class="item-name">{{ item.name }}</h4>
            <h3 class="item-price">P{{ item.price }}</h3>
            <p class="item-description">{{ item.description }}</p>
            <div class="button-group">
              <button class="edit-button">Buy Now</button>
              <button class="remove-button">Add to cart</button>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios'; 
  const user = ref([]);

  const fetchUser = () =>{
    axios.get('/http://localhost:3001/api/users/users')
    .then(response =>{
      user.value = response.data;
      if (response.data && response.data.length > 0) {
        const userId = response.data[0].id; // Assuming 'id' is the user ID field
        localStorage.setItem('userId', userId); // Store the user ID in local storage
      } 
    })
    .catch(error => {
      console.error('Error fetching users:', error);
    });
};

  const approvedItems = ref([]);

  const fetchApprovedItems = () => {
    axios.get('http://localhost:3001/approved-itemss')
      .then(response => {
        approvedItems.value = response.data;
      })
      .catch(error => {
        console.error('Error fetching approved items:', error);
      });
  };
   
  onMounted(() => {
    fetchApprovedItems();
    fetchUser();
  });
  
  </script>
  
  <style scoped>
  
  ul {
    list-style-type: none;
    padding: 0;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); /* 4 items per row */
    gap: 20px;
  }
  
  .item-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #fff;
    padding: 20px;
    border-radius: 12px;
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  
  .item-image {
    width: 100%;
    max-width: 200px;
    height: 200px;
    border-radius: 8px;
    object-fit: cover;
    margin-bottom: 15px;
  }
  
  .item-details {
    text-align: center;
  }
  
  .item-name {
    font-size: 1.6rem;
    font-weight: bold;
    color: #34495e;
    margin-bottom: 5px;
  }
  
  .item-price {
    font-size: 1.4rem;
    color: #e74c3c;
    margin-bottom: 10px;
  }
  
  .item-description {
    font-size: 1rem;
    color: #7f8c8d;
    margin-bottom: 20px;
  }
  
  .button-group {
    display: flex;
    gap: 10px;
    justify-content: center;
  }
  
  .edit-button, .remove-button {
    padding: 10px 15px;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .edit-button {
    color: black;
  }
  
  .edit-button:hover {
    background-color: gray;
  }
  
  .remove-button {
    color: black;
  }
  
  .remove-button:hover {
    background-color: gray;
  }
  </style>
  