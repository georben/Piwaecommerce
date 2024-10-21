<template>
  <div class="dashboard-container">
    <!-- Sidebar -->
    <aside class="sidebar">
      <h2 class="sidebar-title">Admin Dashboard</h2>
      <nav class="nav">
        <ul>
          <li @click="navigate('dashboard')">Dashboard</li>
          <li @click="navigate('registereduser')">Registered User</li>
          <li @click="navigate('reporteduser')">Reported User</li>
          <li @click="navigate('approvals')">Admin Approval</li>
          <li @click="navigate('items')">Manage Items</li>
          <li @click="navigate('settings')">Settings</li>
          <li @click="logout" class="logout-btn">Logout</li> <!-- Added Logout Button --> 
        </ul>
      </nav>
    </aside>
    <!-- Main Content -->
    <main class="main-content">
      <div class="header">
        <h1>{{ currentPageTitle }}</h1>
      </div>

      <!-- Dashboard Stats -->
<div v-if="currentPage === 'dashboard'" class="dashboard-stats">
    <h3 style="font-size:50px;">AWAHI NI BUHATON</h3>
</div>

      <!-- Manage Users Section -->
<div v-if="currentPage === 'registereduser'" class="manage-section">
        <table class="user-table">
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Email</th>
              <th>Created At</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(user, index) in filteredUsers" :key="index">
              <td>{{ user.fullName }}</td>
              <td>{{ user.email }}</td>
              <td>{{ user.createdAt }}</td>
              <td>{{ user.phone }}</td>
              <td>{{ user.address }}</td>
              <td>
                <button @click="editUser(user)" style="background-color: skyblue;">Edit</button>  
                <button style="background-color: red;" class="Delete-btn" @click="DeleteUser(user.id)">Delete</button>
                <button style="background-color: lightgoldenrodyellow;">Visit Now</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
<div v-if="currentPage === 'reporteduser'" class="reporteduser-container">
  <h2>Reported Users</h2>
    <div v-if="loading">Loading reports...</div>
      <div v-if="error" class="error-message">{{ error }}</div>
        <div class="report-card" v-for="(report, index) in reports" :key="index">
          <div class="report-info">
            <p><strong>Reporter:</strong> {{ report.reporterUsername }}</p>
            <p><strong>Reported User:</strong> {{ report.reportedUsername }}</p>
            <p><strong>Item Name:</strong> {{ report.itemName }}</p>
            <p><strong>Date Submitted:</strong> {{ new Date(report.dateSubmitted).toLocaleDateString() }}</p>
            <p><strong>Reason for Report:</strong> {{ report.reason }}</p>
          </div>
        <div class="admin-actions">
          <h4>Admin Actions</h4>
          <button @click="approveAction(report.id)">Approve</button>
          <button @click="rejectAction(report.id)">Reject</button>
          <button @click="banUser(report.reportedUsername)">Ban User</button>
      </div>
    </div>
  </div>
<div v-if="currentPage === 'items'" class="manage-section">
  <h2>Manage Items</h2>
</div>

<div v-if="currentPage === 'settings'" class="manage-section">
  <h2>Settings</h2>
</div>

<div v-if="currentPage === 'approvals'" class="">
  <div class="admin-approval-container">
    <h2 style="text-align: center;">Pending Products for Approval</h2>
     <div v-if="pendingItems.length > 0">
      <ul>
        <li v-for="(item, index) in pendingItems" :key="index" class="pending-item" style="border:2px solid black;">
          <div class="item-details">
            <img :src="item.imageUrl" alt="item image" @error="handleImageError" style="height:100px; width:120px; border-radius: 100%;">
            <div>
              <h1 style="font-size: 1.5rem; margin: 0; color: #2c3e50;">{{ item.name }}</h1>
              <h4 style="color:#ff6f61;">₱{{ item.price }}</h4>
              <h5 style=" margin: 5px 0; color: #7f8c8d; ">{{ item.userFullName }}</h5>
              <p>{{ item.description }}</p>
              <h3>category: {{ item.category }}</h3>
            </div>
          </div>
          <div class="action-buttons" style=" display: flex; flex-direction: column; align-items: flex-end; ">
            <button @click="approveItem(item.id)" class="approve-btn" style="border:2.2px solid black;">Approve</button>
            <button @click="rejectItem(item.id)" class="reject-btn" style="border:2.2px solid black;">Reject</button>
          </div>
        </li>
      </ul>
          </div>
          <div v-else>
            <p>No pending products for approval.</p>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
  
<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const currentPage = ref('dashboard');
const router = useRouter();
const reports = ref([]);
const loading = ref(true);
const error = ref('');
//fetch user {user management}......................
const users = ref([]);
const filteredUsers = ref([]);
const pendingItems = ref([]);

const fetchUsers = async () => {
  try {
    const response = await axios.get('http://localhost:3001/api/users/users'); // Adjust the API endpoint
    users.value = response.data;
    filterNonAdminUsers();
  } catch (error) {
    console.error('Error fetching users:', error);
  }
};
const filterNonAdminUsers = () => {
  filteredUsers.value = users.value.filter(user => user.role !== 'admin'); 
  // Or use a different condition, such as:
  // filteredUsers.value = users.value.filter(user => user.email !== 'admin@example.com');
};
//Fetch users when the component is mounted
onMounted(() => {
  fetchUsers();
});
const DeleteUser = async (userId) => {
  if (confirm("Are you sure you want to delete this user?")) {
    try {
      await axios.delete(`http://localhost:3001/api/users/usersdelete/${userId}`); // Adjust the API endpoint
      alert("User deleted successfully.");
      await fetchUsers(); // Refresh the list after deletion
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("There was an error deleting the user.");
    }
  }
};

const fetchReports = async () => {
  try {
    const response = await fetch('https://your-api-endpoint/reports'); // Replace with your API endpoint
    if (!response.ok) throw new Error('Failed to fetch reports');
    reports.value = await response.json();
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};

onMounted(fetchReports);

const approveAction = async (reportId) => {
  console.log('Approved report', reportId);
  // Add your logic for approving the report, e.g., API call
};

const rejectAction = async (reportId) => {
  console.log('Rejected report', reportId);
  // Add your logic for rejecting the report, e.g., API call
};

const banUser = async (username) => {
  console.log('Banned user', username);
  // Add your logic for banning the user, e.g., API call
};

// Fetch pending items from backend
const fetchPendingItems = async () => {
  try {
    const response = await axios.get('http://localhost:3001/pending-items');
    pendingItems.value = response.data; // Update pendingItems with data
  } catch (error) {
    console.error('There was an error fetching pending items:', error);
  }
};

// Approve an item
const approveItem = async (itemId) => {
  try {
    await axios.post('http://localhost:3001/approved-items', { itemId });
    alert('Product approved successfully.');
    await fetchPendingItems(); // Refresh the list after approval
  } catch (error) {
    console.error('There was an error approving the product:', error);
  }
};

// Reject an item
const rejectItem = async (itemId) => {
  try {
    await axios.post('http://localhost:3001/reject-item', { itemId });
    alert('Product rejected successfully.');
    await fetchPendingItems(); // Refresh the list after rejection
  } catch (error) {
    console.error('There was an error rejecting the product:', error);
  }
};

// Fetch pending items when the component is mounted
onMounted(() => {
  fetchPendingItems();
});


// Method to navigate between pages
const navigate = (page) => {
  currentPage.value = page;
};

// Logout function
const logout = () => {
  localStorage.removeItem('token'); // Remove token from local storage
  localStorage.removeItem('isAdmin'); // Remove admin status
  router.push('/login'); // Redirect to admin login
};
</script>

  
<style scoped>
.reporteduser-container {
  padding: 20px;
}

.report-card {
  border: 1px solid #ccc;
  padding: 15px;
  margin-bottom: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
}

.report-info {
  margin-bottom: 15px;
}

.admin-actions {
  display: flex;
  gap: 10px;
}

.admin-actions button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 5px;
  cursor: pointer;
}

.admin-actions button:hover {
  background-color: #0056b3;
}

.error-message {
  color: red;
  margin: 15px 0;
}

.pending-item {
  list-style-type: none; /* Remove default list styling */
  padding: 20px; /* Add padding around each item */
  margin-bottom: 15px; /* Space between items */
  border: 1px solid #ddd; /* Optional: add a border for visual separation */
  border-radius: 8px; /* Optional: rounded corners */
  background-color: #f9f9f9; /* Light background color */
  display: flex; /* Align item details and buttons */
  justify-content: space-between; /* Space out item details and action buttons */
  align-items: center; /* Align items vertically centered */
}

.item-details {
  display: flex; /* Align the image and details in a row */
  align-items: center; /* Center items vertically */
}

.item-details img {
  height: 100px; 
  width: 100px; /* Maintain a consistent size */
  border-radius: 50%; /* Make the image circular */
  margin-right: 15px; /* Space between image and text */
}

.item-details div {
  margin-left: 10px; /* Space on the left of the text */
}

p {
  margin: 0; /* Remove default margin */
  color: #34495e; /* Optional: color for description */
}

/* Action Buttons */

.approve-btn, .reject-btn {
  padding: 10px 15px; /* Add padding to buttons */
  margin-top: 5px; /* Space between buttons */
  border: none; /* Remove default border */

  color: white; /* Text color */
  cursor: pointer; /* Pointer cursor on hover */
}

.approve-btn {
  background-color: green; /* Approve button color */
}

.reject-btn {
  background-color: red; /* Reject button color */
}

.user-table {
  width: 100%;
  border-collapse: collapse;
}

.user-table th,
.user-table td {
  padding: 12px 15px;
  border: 1px solid #ddd;
  text-align: left;
}

.user-table th {
  background-color: #f4f4f4;
}

.user-table tr:nth-child(even) {
  background-color: #f9f9f9;
}

.user-table tr:hover {
  background-color: #f1f1f1;
}
  .dashboard-container {
    display: flex;
    height: 100vh;
  }
  
  /* Sidebar */
  .sidebar {
    width: 240px;
    background-color: #2c3e50;
    color: white;
    padding: 20px;
  }
  
  .sidebar-title {
    font-size: 24px;
    margin-bottom: 30px;
  }
  
  .nav ul {
    list-style-type: none;
    padding: 0;
  }
  
  .nav ul li {
    padding: 15px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .nav ul li:hover {
    background-color: #34495e;
  }
  
  /* Logout Button Styling */
  .logout-btn {
    color: red;
    font-weight: bold;
  }
  
  /* Main Content */
  .main-content {
    flex-grow: 1;
    padding: 20px;
    background-color: #ecf0f1;
  }
  
  .header h1 {
    margin-bottom: 20px;
  }
  
  .dashboard-stats {
    display: flex;
    gap: 20px;
  }
  
  .stat-card {
    flex: 1;
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    text-align: center;
  }
  
  .stat-card h3 {
    margin-bottom: 10px;
    color: #7f8c8d;
  }
  
  .stat-card p {
    font-size: 24px;
    color: #2c3e50;
  }
  
  .manage-section {
    margin: 20px;
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  </style>
