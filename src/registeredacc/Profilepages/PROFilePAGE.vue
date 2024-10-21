<template>
  <div class="Profile-container" style="position: absolute; width: 100%;">
    <div  class="PIWA-logo" style=" display: flex; align-items: center; background-color:#ffffff;   padding: 25px 0; border-bottom: 1px solid rgb(153, 131, 97);">
      <div class="logo">
         <h1 style="font-size: 24px; margin: -10px; position:absolute; left:40px;">PI<span style="color: #ff6f61;">WA</span></h1>
       </div>
  <img src="@/assets/profile.png" alt="User Profile Picture" class="profile-picture" style="width: 40px; height: 40px; border-radius: 50%; position: absolute; left: 1415px;">
</div>
  </div>
    <div class="dashboard-container" style="display: flex;height: 100vh;  background-color: #f9f9f9;">
      <!-- Sidebar -->
      <div class="sidebar" style="padding:25px; margin-top: 42px; width: 260px; background-color: #ffffff; border-right: 1px solid #ddd;">
        <ul class="menu">
        <div class="Personal-Info" style=" cursor: pointer;">
          <li><a href="/LandingPage">Home</a></li>
          <li @click="navigate('profilepage');" style="font-size:15px">My Profile Page</li>
          <div class="My-Orders" >
            <h5 class="Orders" style=" background-color: rgb(218, 217, 217);border-radius: 4px; padding: 5px;">My Orders</h5> 
            <div class="My-Orders-text" style=" font-size: 14px;">
              <li @click="navigate('purchasehistory')" style="font-size:15px">My Purchase History</li>
              <li @click="navigate('transactions');" style="font-size:15px">Transactions</li>
              <li @click="navigate('myfavorites');" style="font-size:15px">My Favorites</li>
              <div>
                <button style="width: 100%" @click="confirmLogout">Logout</button>
    
    <!-- Confirmation Dialog -->
            <div v-if="showDialog" class="dialog-container">
                <div class="dialog-box">
                  <p>Are you sure you want to logout?</p>
                  <button @click="logout" class="yes-button">Yes</button>
                    <button @click="cancelLogout" class="no-button">No</button>
                  </div>
                </div>
              </div>
            </div>  
          </div>
        </div>
        </ul>
      </div>  
  
      <!-- Main Content -->
      <div class="main-content" style=" flex-grow: 1;padding: 20px;">
        <div class="dashboard-cards" v-if ="currentPage === 'profilepage'" >
          <div class="card-profile" style=" width: 70%; height: 25%; background-color: #ffffff; padding: 15px; border-radius: 10px;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); position: absolute; left: 350px; font-size: 14px;">
            <div class="profile-text" style="padding:20px;" v-if="users.length > 0">
              <p class="profile-item">Name: {{ users[0].fullName }}</p>
              <p class="profile-item">Contact Number: {{ users[0].phone }}</p>
              <p class="profile-item">Address: {{ users[0].address }}</p>
             <div class="profile" style="position:relative; top:-120px;">
                <img src="@/assets/profile.png" alt="Profile Image" class="profile-image" style="width: 150px;
                height: 150px; border-radius: 50%; display: block; margin-left: 780px;" />
              <div style="display: flex; flex-direction: row; gap: 10px; position:relative; left:75%;">
                <p>0 Wishlist</p>
                <p>0 Followed Store</p>
              </div>
            </div>
          </div>
<div style="position:relative; top:-120%; left:20px;">
 <button class="edit-btn" @click="openEditModal(users[0])">Edit</button>
 
    <!-- Modal Popup -->
    <div v-if="showEditModal" class="edit-modal" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.5); display: flex; justify-content: center; align-items: center; z-index: 1000;">
        <div class="modal-content" style="background: white; padding: 20px; border-radius: 8px; width: 400px; position: relative;">
            <h2>Edit Profile</h2>
            <form @submit.prevent="updateUser" class="form-container" style="  background-color: #f9f9f9; padding: 20px;  border-radius: 10px;  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
               max-width: 400px;  margin: 0 auto;">
            <div class="form-group" style=" margin-bottom: 15px;">
                      <label for="fullName">Full Name:</label>
                      <input type="text" v-model="editedUser.fullName" required class="form-input" />
                    
                      <label for="phone">Phone:</label>
                      <input type="text" v-model="editedUser.phone" required class="form-input" />
                  
                      <label for="address">Address:</label>
                      <input type="text" v-model="editedUser.address" required class="form-input" />
                      <div class="button-group" style=" margin-top: 20px; display: flex; justify-content: space-between;">
                      <button type="submit" class="submit-btn">Save</button>
                      <button type="button" class="cancel-btn" @click="closeModal">Cancel</button>
                      </div>
                    </div>
                  </form>
                </div>
            </div>
        </div>
        <div class="Container-of-4categories" style="position:relative; top:-100px;">
            <a href="/MyList" style="text-decoration:none; color:black">
              <div class="Item-List" style="position: relative; top:-32px; left:0px; background-color: #ffffff; padding:6px; width: 20%; text-align: center;
                 margin-bottom:10px;border-radius:5px;box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); display: flex; align-items: center;">
                  <img src="@/assets/item-list.png" alt="Logo" class="Item-list-logo">
                My List
              </div>
            </a>

            <a href="/inbox" style="text-decoration:none; color:black">
            <div class="Inbox">
              <img src="@/assets/inboxlogo.png" alt="Logo" class="Inbox-logo">
              <p>Inbox</p>
            </div>
            </a>


            <a href="/notification" style="text-decoration:none; color:black">
            <div class="Notification">
              <img src="@/assets/notifcationlogo.png" alt="logo" class="notification-logo">
              <p>Notification</p>
            </div>
            </a>

            <a href="/My-Purchases" style="text-decoration:none; color:black;"><div class="My-Order">
              <img src="@/assets/Orderlogo.png" alt="logo" class="My-Order-logo" style=" width: 40px;height: auto; margin-right: 10px;">
              <p>My Purchase</p>
            </div>
          </a>
            <div class="User-Performance">
              <div class="Performance">
                <h2>Your Performance</h2>
                  <p class="P-text">Performance reflects the quality of various metrics of the store</p>
                  <div class=L-C-text>
                      <p class="text-violation"><a href="http://localhost:8080/ProfilePage">Listing Violations</a></p>
                      <p class="text-service"><a href="">Customer Service</a></p>
                  </div>
              </div>
                <div class="Listing-Violations">
                  <div>
                    <p class="Severe">Severe Listing Violations</p>
                  </div>
                  <p class="Pre-Order">Pre-Order Listing</p>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="purchasehistory-wrapper" style="display: flex; position:absolute; top:-20px; left:25%; justify-content: center; align-items: center; height: 90vh; padding: 20px;">
    <div class="dashboard-cards" v-if="currentPage === 'purchasehistory'" style="padding: 30px; width: 100%; max-width: 600px; background-color: #f5f5f5; border-radius: 15px; border: 1px solid #ddd;">
      <h2 class="header" style="text-align: center; margin-bottom: 20px;">Purchase History</h2>
      
      <div class="purchase-list">
        <div class="purchase-item" style="display: flex; align-items: center; margin-bottom: 20px; padding: 10px; border-bottom: 1px solid #e0e0e0;">
          <img :src="imageUrl" alt="Item Image" class="item-image" style="width: 80px; height: auto; border-radius: 8px; margin-right: 15px;" />
          <div class="item-details">
            <h3 class="item-title" style="margin: 0; font-size: 18px;">Stylish Jacket</h3>
            <p class="purchase-date" style="margin: 5px 0; font-size: 14px; color: #666;">Purchase Date: October 10, 2024</p>
            <p class="item-price" style="margin: 5px 0; font-weight: bold;">Price: $49.99</p>
            <p class="item-status" style="margin: 5px 0;">
              Status: <span class="status" style="color: green; font-weight: bold;">Delivered</span>
            </p>
          </div>
        </div>
  
        <div class="purchase-item" style="display: flex; align-items: center; margin-bottom: 20px; padding: 10px; border-bottom: 1px solid #e0e0e0;">
          <img :src="imageUrl" alt="Item Image" class="item-image" style="width: 80px; height: auto; border-radius: 8px; margin-right: 15px;" />
          <div class="item-details">
            <h3 class="item-title" style="margin: 0; font-size: 18px;">Running Shoes</h3>
            <p class="purchase-date" style="margin: 5px 0; font-size: 14px; color: #666;">Purchase Date: October 5, 2024</p>
            <p class="item-price" style="margin: 5px 0; font-weight: bold;">Price: $89.99</p>
            <p class="item-status" style="margin: 5px 0;">
              Status: <span class="status" style="color: orange; font-weight: bold;">Pending</span>
            </p>
          </div>
        </div>
  
        <div class="purchase-item" style="display: flex; align-items: center; margin-bottom: 20px; padding: 10px;">
          <img :src="imageUrl" alt="Item Image" class="item-image" style="width: 80px; height: auto; border-radius: 8px; margin-right: 15px;" />
          <div class="item-details">
            <h3 class="item-title" style="margin: 0; font-size: 18px;">Wireless Headphones</h3>
            <p class="purchase-date" style="margin: 5px 0; font-size: 14px; color: #666;">Purchase Date: September 28, 2024</p>
            <p class="item-price" style="margin: 5px 0; font-weight: bold;">Price: $129.99</p>
            <p class="item-status" style="margin: 5px 0;">
              Status: <span class="status" style="color: red; font-weight: bold;">Cancelled</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
<div class="dashboard-cards" v-if="currentPage === 'transactions'" style="display: flex; justify-content: center;align-items: center; padding: 20px; position:absolute; top:10px; left:50%;">
  <div class="card-container" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));gap: 20px;">
    <!-- Transaction Card 1 -->
    <div class="transaction-card">
      <h3>Transaction #1</h3>
      <p><strong>Amount:</strong> $150.00</p>
      <p><strong>Date:</strong> October 20, 2024</p>
      <p><strong>Status:</strong> Completed</p>
    </div>

    <!-- Transaction Card 2 -->
    <div class="transaction-card">
      <h3>Transaction #2</h3>
      <p><strong>Amount:</strong> $200.00</p>
      <p><strong>Date:</strong> October 19, 2024</p>
      <p><strong>Status:</strong> Pending</p>
    </div>

    <!-- Transaction Card 3 -->
    <div class="transaction-card">
      <h3>Transaction #3</h3>
      <p><strong>Amount:</strong> $320.00</p>
      <p><strong>Date:</strong> October 18, 2024</p>
      <p><strong>Status:</strong> Failed</p>
    </div>
  </div>
</div>
  </template>
  
  <script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const currentPage = ref('profilepage');
const showDialog = ref(false);
const users = ref([]);
const showEditModal = ref(false);
const editedUser = ref({});

const openEditModal =(user) =>{
  editedUser.value = {...user};
  showEditModal.value = true;
};

const closeModal = () =>{
  showEditModal.value = false;
}

const updateUser = () => {
    console.log(editedUser.value);  // Log the edited user data

    // Make sure you are sending the correct user ID
    axios.put(`http://localhost:3001/api/users/${editedUser.value.id}`, editedUser.value)
        .then(() => {
            alert('User Updated Successfully');
            closeModal();
            fetchUsers();  // Optionally refetch users to update the list after the PUT request
        })
        .catch(error => {
            console.error('Error updating user:', error);
        });
};

    
const navigate = (page) => {
  currentPage.value = page;
};

// Fetch users when the component is mounted
const fetchUsers = () => {
  axios.get('http://localhost:3001/api/users/users')
    .then(response => {
      users.value = response.data;

      // Assuming response contains the user data and userId
      if (response.data && response.data.length > 0) {
        const userId = response.data[0].id; // Assuming 'id' is the user ID field
        localStorage.setItem('userId', userId); // Store the user ID in local storage
      } 
    })
    .catch(error => {
      console.error('Error fetching users:', error);
    });
};

// Lifecycle hook for when the component is mounted
onMounted(() => {
  fetchUsers();
});

// Methods for handling logout confirmation
const confirmLogout = () => {
  showDialog.value = true;
};

const logout = () => {
  showDialog.value = false;
  localStorage.removeItem("token");
  localStorage.removeItem("userId"); // Also remove the user ID on logout
  location.reload();
  alert('Logged out successfully!');
};

const cancelLogout = () => {
  showDialog.value = false;
};
</script>

  
  <style scoped>
   .transaction-card {
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 20px;
    text-align: center;
    transition: transform 0.3s ease;
  }
  .submit-btn {
  background-color: #28a745;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
}

.submit-btn:hover {
  background-color: #218838;
}

.cancel-btn {
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
}

.cancel-btn:hover {
  background-color: #c82333;
}
  .form-input {
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 16px;
}
  .form-group label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}
  
  .Personal-Info li:hover{
    color: #ff6f61;
  }
  .Listing-Violations{
    border: 1px solid rgb(153, 131, 97);
    padding:3px;
  }
  .Severe{
    padding:5px;
  }
  .Severe:hover{
    background-color:rgb(218, 217, 217);
  }
  .Pre-Order{
    padding:5px;
  }
  .Pre-Order:hover{
    background-color:rgb(218, 217, 217);
  }
  .text-violation{
    border-right: 1px solid rgb(160, 151, 139);
    padding:10px;
  }
  .text-violation a{
   color:black;
   text-decoration: none;
  }
  .text-violation:hover{
    background-color:rgb(218, 217, 217);
  }
  .text-service{
    padding:10px;
    position: relative;
    left:-20px;
  }
  .text-service a{
   color:black;
   text-decoration: none;
  }
  .text-service:hover{
    background-color:rgb(218, 217, 217);
  }
  .P-text{
    font-size:13px;
  }
  .L-C-text {
  display: flex;
  flex-direction: row; /* Align the text side by side (horizontally) */
  gap: 20px; /* Adds 10px of space between the text elements */
}

  .User-Performance{
    position:relative;
    top:-200px;
    left:-10px;
    width:100%;
    padding:10px;
    background-color: #ffffff;
    border-radius:5px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);;
  }
  .Performance{
    border-bottom: 1px solid rgb(184, 182, 182);
  }
  .My-Order{
    position: relative;
    top:-225px;
    left:285px;
    background-color: #ffffff;
    padding:5px;
    width: 20%;
    text-align: center;
    margin-bottom:10px;
    border-radius:5px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    display: flex; /* Aligns image and text horizontally */
    align-items: center;
  }
  .My-Order-logo{   
    width: 40px; /* Adjust the size of the logo */
    height: auto; /* Maintain aspect ratio */
    margin-right: 10px;
  }
  .Notification{
    position: relative;
    top:-160px;
    left:845px;
    background-color: #ffffff;
    padding:5px;
    width: 20%;
    text-align: center;
    margin-bottom:10px;
    border-radius:5px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);;
    display: flex; /* Aligns image and text horizontally */
    align-items: center;
  }
  .notification-logo{
    width: 40px; /* Adjust the size of the logo */
    height: auto; /* Maintain aspect ratio */
    margin-right: 10px;
  }
  .Inbox{
    position: relative;
    top:-96px;
    left:560px;
    background-color: #ffffff;
    padding:5px;
    width: 20%;
    text-align: center;
    margin-bottom:10px;
    border-radius:5px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);;
    display: flex; /* Aligns image and text horizontally */
    align-items: center;
  }
  .Inbox-logo{
    width: 40px; /* Adjust the size of the logo */
    height: auto; /* Maintain aspect ratio */
    margin-right: 10px; 
  }

.Item-List:hover {
  background-color: #f0f0f0; /* Change the background color on hover */
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.2); /* Add a shadow effect */
  cursor: pointer; /* Change cursor to pointer to indicate it's clickable */
}

.Item-list-logo{
  width: 40px; /* Adjust the size of the logo */
  height: auto; /* Maintain aspect ratio */
  margin-right: 10px; /* Space between the logo and the text */
}

.Profile-container {
    position: absolute;
    width: 100%;
  }
  
  .Profile-nav {
    display: flex;
    align-items: center;
    background-color: #ffffff;
    padding: 25px 0;
    border-bottom: 1px solid rgb(153, 131, 97);
  }
  
  .logo h1 {
    font-size: 24px;
    margin: -10px;
    position: absolute;
    left: 40px;
  }
  
  .logo span {
    color: #ff6f61;
  }

  
  .sidebar ul.menu {
    list-style: none;
    padding: 20px;
  }
  
  .sidebar ul.menu li {
    margin-bottom: 10px;
    padding: 7px;
  }
  
  .sidebar ul.menu li a {
    text-decoration: none;
    color: #333;
  }
  
  .sidebar ul.menu li a:hover {
    background-color: #e9e9e9;
    border-radius: 4px;
  }
  
  
  /* Dashboard Cards */
  .dashboard-cards {
    display: flex;
    margin-top: 50px;
  }
  
  
  </style>
  