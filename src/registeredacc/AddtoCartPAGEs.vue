<template>
  <router-link to="/LandingPage">
    <img src="@/assets/arrow-back-icon-18.jpg" alt="arrow" style="height:20px; width:50px;">
  </router-link>
  <div v-if="showNotification" class="notification">
    {{ notificationMessage }}
  </div>
  <div class="cart-container" style=" max-width: 800px; margin: 0 auto; padding: 20px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
    <h2>Cart</h2>
    <div v-if="item.length > 0">
      <ul class="cart-list" style="list-style-type: none; padding: 0;">
        <li v-for="item in item" :key="item.id" class="cart-item" style="display: flex; justify-content: space-between; align-items: center; background-color: #fff;
          margin-bottom: 15px; padding: 15px; border:2px solid black; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
          <div class="item-details" style=" display: flex; align-items: center;">
            <img :src="item.imageUrl" alt="item image" class="item-image" style="width: 100px; height: 100px; border-radius: 8px; margin-right: 15px;
              object-fit: cover;">
            <div class="item-info">
              <p>{{ item.name }}</p>
              <p>Quantity: {{ item.quantity }}</p>
              <p style="color:#ff6f61;">{{ item.price }}</p>
            </div>
          </div>
          <div class="item-actions" style="text-align: right;">
            <button @click="buyNow(item)" style="margin-right:10px;">Buy Now</button>
            <button class="remove-btn" @click="removeItem(item.id)">Remove</button>
          </div>
        </li>
      </ul>
      <div class="cart-total">
        <p>Total Price: {{ totalPrice }}</p>
      </div>
      <button @click="proceedToCheckout">Proceed to checkout</button>
    </div>
    <div v-else>
      <p class="empty-cart-msg">Your cart is empty.</p>
    </div>
  </div> 
</template>


<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();
const item = ref({});
const userId = 1; // Assuming a static user ID for now



// Fetch cart items
const fetchCartItems = async () => {
  try {
    const response = await axios.get(`/api/cart/${userId}`);
    item.value = response.data;
  } catch (error) {
    console.error('Error fetching cart data:', error);
  }
};

function buyNow(item) {
 // Logic to handle the buying process
 alert(`You are buying: ${item.name} for ₱${item.price}`);
 // Redirect to a checkout page
 router.push({ name: 'TRanSActIONpage', params: { productId: item.id } });
}

// Function to remove an item from the cart
const removeItem = async (itemId) => {
  try {
    const response = await axios.delete(`/api/cart/${itemId}`);
    if (response.status === 200) {
      item.value = item.value.filter(item => item.id !== itemId);
      alert('You successfully removed the item'); // Show alert on successful removal
    }
  } catch (error) {
    console.error('Error removing item from cart:', error);
  }
};

// Computed property to calculate the total price
const totalPrice = computed(() => {
  return item.value.reduce((sum, item) => {
    return sum + (item.price * item.quantity);
  }, 0);
});

// Fetch cart items when component is mounted
onMounted(() => {
  fetchCartItems();
});
</script>


  
<style scoped>

h2 {
  color: #333;
  font-size: 24px;
  text-align: center;
  margin-bottom: 20px;
}


.item-info h3 {
  margin: 0;
  color: #333;
  font-size: 18px;
}

.item-info p {
  color: #666;
  margin: 5px 0 0;
  font-size: 14px;
}

.empty-cart-msg {
  text-align: center;
  color: #666;
  font-size: 18px;
  margin-top: 50px;
}
</style>
