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
              <router-link to="/my-purchase-history"><li style="font-size:15px">Purchase History</li></router-link>
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
<div>
  <div class="add-item-btn" style="position:absolute; top:60px; right:30px;">
      <button @click="showAddItemForm = !showAddItemForm" style="padding:10px 50px;">
        Add a new item
      </button>
    </div>
<div v-if="showAddItemForm" class="form-container"
     style="position: absolute; top: 90px; left: 50%; transform: translateX(-50%); padding: 20px; width: 400px; background-color: #ffffff; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); z-index: 10;">
  
  <h3 style="text-align: center; margin-bottom: 20px;">Add New Item</h3>
  
  <form @submit.prevent="addItem" style="display: flex; flex-direction: column; gap: 15px;">
    <div class="form-group" style="display: flex; flex-direction: column;">
      <label for="name" style="margin-bottom: 5px; font-weight: bold;">Item Name</label>
      <input type="text" v-model="newItem.name" placeholder="Enter item name" 
             style="padding: 10px; border-radius: 5px; border: 1px solid #ccc;" required />
    </div>
    
    <div class="form-group" style="display: flex; flex-direction: column;">
      <label for="description" style="margin-bottom: 5px; font-weight: bold;">Item Description</label>
      <textarea v-model="newItem.description" placeholder="Enter item description" 
                style="padding: 10px; border-radius: 5px; border: 1px solid #ccc; min-height: 100px;" required></textarea>
    </div>
    
    <div class="form-group" style="display: flex; flex-direction: column;">
      <label for="price" style="margin-bottom: 5px; font-weight: bold;">Price</label>
      <input type="number" v-model="newItem.price" placeholder="Enter price" 
             style="padding: 10px; border-radius: 5px; border: 1px solid #ccc;" required />
    </div>
    <div class="form-group" style="display: flex; flex-direction: column;">
          <label for="category" style="margin-bottom: 5px; font-weight: bold;">Category</label>
          <select v-model="newItem.category" style="padding: 10px; border-radius: 5px; border: 1px solid #ccc;" required>
            <option disabled value="">Select a category</option>
            <option v-for="category in categories" :key="category" :value="category">
              {{ category }}
            </option>
          </select>
        </div>
        <div class="form-group" style="display: flex; flex-direction: column;">
    <label for="image" style="margin-bottom: 5px; font-weight: bold;">Item Images</label>
    <input type="file" @change="handleImageUpload" accept="image/*" multiple style="padding: 5px;" required />
  </div>
    
    <button type="submit" style="padding: 10px; background-color: gray; color: white; border: none; border-radius: 5px; cursor: pointer;">Add Item</button>
  </form>
</div>

    <!-- List of Added Items -->
<div class="item-list">
  <h3 style="color:black; text-align:center;">Items List</h3>
  <ul>
    <li v-for="(item, index) in approvedItems" :key="index" class="item-container">
      <img :src="item.imageUrl" alt="item image" class="item-image">
      <div class="item-details">
        <h4 class="item-name" style=" font-size: 24px; font-weight: bold; color: #333; margin: 0px;">{{ item.name }}</h4>
        <h3 class="item-price" style=" font-size: 20px; font-weight: bold; color: #ff6f61; margin-bottom: 10px;">P{{ item.price }}</h3>
        <p class="item-description">{{ item.description }}</p>
        <button @click.prevent="edit" class="edit-button">Edit</button>
        <button @click="removeItem(item.id);">Remove</button>
      </div>
    </li>
  </ul>
</div>
</div>
<div class="Header">{{ currentPageTitle }}</div>
<div class="dashboard-cards" v-if ="currentPage === 'profilepage'" >
  
</div>
</template>
  
<script setup>
import { ref,onMounted } from 'vue';
import axios from 'axios';
const currentPage = ref('profilepage');
// Reactive data
const showDialog = ref(false);
const users = ref([]);
const showAddItemForm = ref(false);
const cartItems = ref([]);
const userFullName = ref('');
const newItem = ref({
  name: '',
  description: '',
  price: null,
  category: '',
  image: null,
});
const categories = ref([
  'Clothes', 'Shoes', 'Furniture', 'Craft', 'Car', 'Toys'
]);
const approvedItems = ref([]);

const handleImageUpload = (event) => {
  const file = event.target.files[0];
  newItem.value.image = file;
};
const addItem = () => {
  if (newItem.value.name && newItem.value.description && newItem.value.price && newItem.value.image) {
    const formData = new FormData();
    formData.append('name', newItem.value.name);
    formData.append('description', newItem.value.description);
    formData.append('price', newItem.value.price);
    formData.append('category', newItem.value.category);
    formData.append('image', newItem.value.image);
    formData.append('userFullName', userFullName.value);

    axios.post('http://localhost:3001/add-item', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(response => {
      console.log(response); // Using the 'response' to avoid ESLint error
      alert('Your product has been submitted for approval.');
      newItem.value = { name: '', description: '', price: null, category: '', image: null };
      showAddItemForm.value = false;
    })
    .catch(error => {
      console.error('Error submitting the item:', error);
    });
  }
};

// Fetch approved items
const fetchApprovedItems = () => {
  axios.get('http://localhost:3001/approved-itemss')
    .then(response => {
      console.log('Approved items:', response.data); // Log the approved items
      approvedItems.value = response.data;
    })
    .catch(error => {
      console.error('Error fetching approved items:', error);
    });  
};

const removeItem = async (itemId) => {
  // Show a confirmation dialog before removing the item
  const confirmation = confirm("Are you sure you want to remove this item?");
  
  if (confirmation) {
    try {
      const response = await axios.delete(`http://localhost:3001/remove-item/${itemId}`);
      if (response.status === 200) {
        // Update the local state to reflect the removed item
        cartItems.value = cartItems.value.filter(item => item.id !== itemId);
        alert('Item removed successfully.');
        location.reload();
        console.log('Item removed successfully');
      }
    } catch (error) {
      console.error('Error removing item from the list:', error);
      alert('Error removing item. Please try again.');
    }
  }
};

// Fetch approved items on component mount
onMounted(() => {
  fetchApprovedItems();
});

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
        const user = response.data[0];
        const userId = response.data[0].id; // Assuming 'id' is the user ID field
        localStorage.setItem('userId', userId); // Store the user ID in local storage
        userFullName.value = user.fullName;
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
  .item-list {
  position: absolute;
  top: 15%;
  left: 23%;  
  padding: 20px; 
  width:67%;/* Add padding to the list container */
  border-radius: 10px; /* Add border radius for rounded corners */
  box-shadow: 3px 3px 3px 3px rgba(0, 0, 0, 0.2); /* Add shadow for depth */
  }
.item-list ul {
  list-style-type: none; /* Remove default list style */
  padding: 0; /* Remove default padding */
}

.item-list li {
  display: flex; /* Use flexbox for alignment */
  align-items: center; /* Center align items vertically */
  background-color: white; /* Set a background color for individual items */
  padding: 15px; /* Add padding inside each item */
  margin-bottom: 10px; /* Space between items */
  border-radius: 8px; /* Rounded corners for each item */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4); /* Add subtle shadow to items */
}
.item-list li p {
  margin: 5px 0 0 0; /* Margin for paragraph text */
  font-size: 14px; /* Adjust font size */
  color: #666; /* Change color for description */
} 
.item-image {
  width: 200px;
  height: 150px;
  margin-right: 20px;
  border-radius: 5px;
}
.item-list li h4{
  margin: 0; /* Remove default margin */
  color: #333; /* Change text color for readability */
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