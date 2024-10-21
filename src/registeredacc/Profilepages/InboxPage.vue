<template>
    <div class="Profile-container" style="position: absolute; width: 100%;">
      <div  class="PIWA-logo" style=" display: flex; align-items: center; background-color:#ffffff;   padding: 25px 0; border-bottom: 1px solid rgb(153, 131, 97);">
        <div class="logo">
           <h1 style="font-size: 24px; margin: -10px; position:absolute; left:40px;">PI<span style="color: #ff6f61;">WA</span></h1>
         </div>
    <img src="@/assets/profile.png" alt="User Profile Picture" class="profile-picture" style="width: 40px; height: 40px; border-radius: 50%; position: absolute; left: 1415px;">
  </div>
    </div>
      <div class="dashboard-container" style="display: flex; height: 100vh; background-color: #f9f9f9;">
        <!-- Sidebar -->
        <div class="sidebar" style="padding:25px; margin-top: 42px; width: 260px; background-color: #ffffff; border-right: 1px solid #ddd;">
          <ul class="menu">
          <div class="Personal-Info" style=" cursor: pointer;">
            <li><a href="/LandingPage">Home</a></li>
            <router-link to="/ProfilePage" style="text-decoration: none; color:black; font-size:15px">
            <li>My Profile Page</li>
          </router-link>
            <div class="My-Orders" style=" ">
              <h5 class="Orders" style="background-color: rgb(218, 217, 217); border-radius: 4px; padding: 5px;">My Orders</h5> 
              <div class="My-Orders-text">
                <li @click="navigate('purchasehistory');" style="font-size:15px">Purchase History</li>
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
    </div>
  </template>
    
  <script setup>
  
  </script>
  
  <style scoped>
  .Personal-Info li:hover{
    color: #ff6f61;
  }
    .profilepage:hover{
      color: #ff6f61;
    } 
  
  .My-Orders-text {
    font-size: 14px;
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
   
 
    .logo h1 {
      font-size: 24px;
      margin: -10px;
      position: absolute;
      left: 40px;
    }
    
    /* Container and layout */
    .dashboard-container {
      display: flex;
      height: 100vh;
      background-color: #f9f9f9;
    }
    
  </style>