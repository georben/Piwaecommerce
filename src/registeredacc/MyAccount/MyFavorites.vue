<template>
  <div class="Profile-container" style="position: absolute; width: 100%;">
    <div  class="PIWA-logo" style=" display: flex; align-items: center; background-color: #ffffff;  padding: 25px 0; border-bottom: 1px solid rgb(153, 131, 97);">
      <div class="logo">
         <h1 style="font-size: 24px; margin: -10px; position:absolute; left:40px;">PI<span style="color: #ff6f61;">WA</span></h1>
       </div>
  <img src="@/assets/profile.png" alt="User Profile Picture" class="profile-picture" style="width: 40px; height: 40px; border-radius: 50%; position: absolute; left: 1415px;">
</div>
  </div>
    <div class="dashboard-container" style="display: flex; height: 100vh; background-color: #f9f9f9;">
    <!-- Sidebar -->
    <div class="sidebar">
      <ul class="menu">
        <div class="Personal-Info">
          <li><a href="/LandingPage">Home</a></li>
          <li><a href="/ProfilePage" style="font-size:15px;">My Profile Page</a></li>
          <h5 class="my-account-text">My Account</h5>
          <div class="Personal-Text-size">
            <li><a href="/PersonalInformation">Personal Information</a></li>
          </div>
          <div class="My-Orders">
            <h5 class="Orders">My Orders</h5>
            <div class="My-Orders-text">
              <li><a href="/PurchaseHistory">Purchase History</a></li>
              <li><a href="">Transactions</a></li>
              <li><a href="/myfavorites">My Favorites</a></li>
            </div>
          </div>
        </div>
      </ul>
    </div>
  </div>
 
</template>

<script>
export default {
  data() {
    return {
      // Add any dynamic data needed later
    };
  }
};
</script>

<style scoped>
 .sidebar {
  margin-top: 42px;
  width: 260px;
  background-color: #ffffff;
  border-right: 1px solid #ddd;
  padding: 15px;
}

.my-account-text {
  background-color: rgb(218, 217, 217);
  border-radius: 4px;
  padding: 5px;
}

.Personal-Text-size {
  font-size: 14px;
}

.Orders {
  background-color: rgb(218, 217, 217);
  border-radius: 4px;
  padding: 5px;
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
  padding: 11px;
}

.sidebar ul.menu li a:hover {
  background-color: #e9e9e9;
  border-radius: 4px;
}
</style>
