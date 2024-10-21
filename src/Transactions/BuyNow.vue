<template>
  <router-link to="/LandingPage"><img src="@/assets/arrow-back-icon-18.jpg" alt="arrow" style="height:20px; width:50px;"></router-link>
  <header class="header">
    <!-- Navigation and Header Code Here -->
  </header>

  <div class="product-purchase-flow">
    <!-- Step Progress Indicator -->
    <div class="purchase-steps">
      <div class="step" :class="{active: currentStep === 1}">
        <h3>1. Select Item</h3>
      </div>
      <div class="step" :class="{active: currentStep === 2}">
        <h3>2. Confirm Order</h3>
      </div>
      <div class="step" :class="{active: currentStep === 3}">
        <h3>3. Complete Purchase</h3>
      </div>
    </div>

    <!-- Progress Bar -->
    <div class="progress-bar">
      <div class="progress" :style="{ width: `${(currentStep / 3) * 100}%` }"></div>
    </div>

    <!-- Product Details Section -->
    <div v-if="currentStep === 1" class="product-details">
      <div class="product-header">
        <h1>{{ product.name }}</h1>
      </div>
      <div class="product-content">
        <div class="product-image-container">
          <img :src="product.imageUrl" alt="Product Image" class="product-image" />
        </div>
        <div class="product-info">
          <p class="product-description">{{ product.description }}</p>
          <p class="product-price">Price: ₱{{ product.price }}</p>
        </div>
      </div>
      <button @click="goToConfirm" class="buy-now-btn">Proceed to Confirmation</button>
    </div>

    <!-- Confirmation Step -->
    <div v-if="currentStep === 2" class="order-confirmation">
  <h2>Confirm Your Order</h2>

  <!-- Product Information -->
  <div class="product-info">
    <p><strong>Product:</strong> {{ product.name }}</p>
    <p><strong>Price:</strong> ₱{{ product.price }}</p>
  </div>

  <!-- Address Selection -->
  <div class="address-section" style=" margin-top: 20px; border-radius: 10px;">
    <label for="saved-address" class="form-label" style="display: block; margin-bottom: 8px; font-weight: 600; color: #333;"
  >Choose an Address:</label>
    <select v-model="selectedAddress" class="form-select">
  <option v-for="address in savedAddresses" :value="address" :key="address.id">
    {{ address.label }} - {{ address.address }}
  </option>
  <option value="new">Input your address</option>
</select>

    <!-- New Address Form -->
    <div v-if="selectedAddress === 'new'" class="new-address-form">
      <h4 class="new-address-title">Enter New Address</h4>

      <div class="form-group">
        <label for="fullName" class="form-label">Full Name:</label>
        <input v-model="newAddress.fullName" type="text" id="fullName" class="form-input" placeholder="Enter full name" />
      </div>

      <div class="form-group">
        <label for="street" class="form-label">Street Address:</label>
        <input v-model="newAddress.street" type="text" id="street" class="form-input" placeholder="Enter street address" />
      </div>

      <div class="form-group">
        <label for="city" class="form-label">City:</label>
        <input v-model="newAddress.city" type="text" id="city" class="form-input" placeholder="Enter city" />
      </div>

      <div class="form-group">
        <label for="postalCode" class="form-label">Postal Code:</label>
        <input v-model="newAddress.postalCode" type="text" id="postalCode" class="form-input" placeholder="Enter postal code" />
      </div>
    </div>
  </div>
  
  <div class="shipping-method-section">
    <label for="shipping-method" class="form-label">Choose Shipping Method:</label>
    <select v-model="selectedShippingMethod" class="form-select">
      <option v-for="method in shippingMethods" :value="method" :key="method.id">
        {{ method.label }} - ₱{{ method.price }}
      </option>
    </select>
  </div>

    <!-- Payment Method Selection -->
    <div class="payment-method-section">
    <label for="payment-method" class="form-label">Choose Payment Method:</label>
    <select v-model="selectedPaymentMethod" class="form-select">
      <option v-for="method in paymentMethods" :value="method" :key="method.id">
        {{ method.label }}
      </option>
    </select>
  </div>
  <div class="payment-details" v-if="selectedPaymentMethod">
    <h4>Payment Details</h4>

    <!-- Credit Card Payment -->
    <div v-if="selectedPaymentMethod.label === 'Credit Card'" class="credit-card-form">
      <div class="form-group">
        <label for="cardNumber" class="form-label">Card Number:</label>
        <input v-model="paymentDetails.cardNumber" type="text" id="cardNumber" class="form-input" placeholder="Enter card number" />
      </div>

      <div class="form-group">
        <label for="expiryDate" class="form-label">Expiry Date:</label>
        <input v-model="paymentDetails.expiryDate" type="text" id="expiryDate" class="form-input" placeholder="MM/YY" />
      </div>

      <div class="form-group">
        <label for="cvv" class="form-label">CVV:</label>
        <input v-model="paymentDetails.cvv" type="text" id="cvv" class="form-input" placeholder="Enter CVV" />
      </div>
    </div>

    <!-- PayPal Payment -->
    <div v-if="selectedPaymentMethod.label === 'PayPal'" class="paypal-form">
      <div class="form-group">
        <label for="paypalEmail" class="form-label">PayPal Email:</label>
        <input v-model="paymentDetails.paypalEmail" type="email" id="paypalEmail" class="form-input" placeholder="Enter PayPal email" />
      </div>
    </div>

    <!-- Cash on Delivery (No Additional Details Required) -->
    <div v-if="selectedPaymentMethod.label === 'Cash on Delivery'" class="cod-info">
      <p>No additional details required for Cash on Delivery.</p>
    </div>
  </div>

  
  <!-- Action Buttons -->
  <div class="button-group">
    <button @click="goToBuy" class="btn btn-primary confirm-btn">Confirm Purchase</button>
    <button @click="goBackToSelect" class="btn btn-secondary back-btn">Back to Selection</button>
  </div>
</div>


    <!-- Final Purchase Step -->
    <div v-if="currentStep === 3" class="purchase-completion">
      <h2>Thank You for Your Purchase!</h2>
      <p>Your order for {{ product.name }} has been placed successfully.</p>
      <router-link to="/My-Purchases">
      <button class="purchase-btn" style="position:relative; left:75%; top:-80px;"> go to my purchase</button>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';

const product = ref({});
const currentStep = ref(1);  // Track which step the user is on
const route = useRoute();


// const userId = localStorage.getItem('userId');
// Add ref for selectedAddress, savedAddresses, and newAddress

const selectedAddress = ref(null);
const savedAddresses = ref([]);
const newAddress = ref({
  fullName: '',
  street: '',
  city: '',
  postalCode: ''
});

const shippingMethods = ref([
  { id: 1, label: 'Standard Shipping (3-5 days)', price: 50 },
  { id: 2, label: 'Express Shipping (1-2 days)', price: 100 },
  { id: 3, label: 'Same Day Delivery', price: 150 }
]);
const selectedShippingMethod = ref(null);

const paymentMethods = ref([
  { id: 1, label: 'Credit Card' },
  { id: 2, label: 'PayPal' },
  { id: 3, label: 'Cash on Delivery' }
]);
const selectedPaymentMethod = ref(null);

const paymentDetails = ref({
  cardNumber: '',
  expiryDate: '',
  cvv: '',
  paypalEmail: ''
});
// Fetch addresses when component is mounted
// onMounted(() => {
//   fetchAddresses();
// });
const fetchProductDetails = async () => {
  const productId = route.params.productId; 
  try {
    const response = await axios.get(`http://localhost:3001/item/${productId}`);
    product.value = response.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 404) {
        console.error("Product not found. Please check the product ID.");
      } else {
        console.error(`Error fetching product details: ${error.message}`);
      }
    } else {
      console.error("Error: Could not connect to the server.");
    }
  }
};

const goToConfirm = () => {
  currentStep.value = 2;  // Move to confirmation step
};
const goToBuy = () => {
  currentStep.value = 3;  // Move to confirmation step
};

const goBackToSelect = () => {
  currentStep.value = 1;  // Go back to selection step
};

// Handle address selection change
const handleAddressChange = () => {
  if (selectedAddress.value === 'new') {
    // Logic to show new address form
    console.log('New address selected');
  }
};

// Fetch product details on mount
handleAddressChange();
fetchProductDetails();
</script>

<style scoped>


.form-select {
  width: 100%;
  padding: 12px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  background-color: #fff;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  transition: border-color 0.3s ease;
}

.form-select:hover, .form-input:hover {
  border-color: #ff6f61;
}

.form-input {
  width: 100%;
  padding: 12px;
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  transition: border-color 0.3s ease;
}

.new-address-title {
  margin-top: 20px;
  font-size: 1.3rem;
  font-weight: bold;
  color: #ff6f61;
}

.new-address-form {
  margin-top: 15px;
}

/* Button Styling */
.button-group {
  margin-top: 20px;
  display: flex;
  gap: 10px;
}

.confirm-btn, .back-btn {
  padding: 12px 24px;
  font-size: 1.1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.confirm-btn {
  background-color: #ff6f61;
  color: #fff;
}

.back-btn {
  background-color: #ccc;
  color: #333;
}

.confirm-btn:hover {
  background-color: #e6554f;
  transform: translateY(-2px);
}

.back-btn:hover {
  background-color: #bbb;
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .button-group {
    flex-direction: column;
  }

  .confirm-btn, .back-btn {
    width: 100%;
    margin-bottom: 10px;
  }
}
/* General Styling */
.product-purchase-flow {
  max-width: 800px;
  margin: 50px auto;
  padding: 30px;
  border: 1px solid #e0e0e0;
  box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  background-color: #fff;
}

/* Step Indicator */
.purchase-steps {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.step {
  width: 100%;
  text-align: center;
}

.step.active h3 {
  font-weight: bold;
  color: #ff6f61;
}

/* Progress Bar */
.progress-bar {
  height: 5px;
  background-color: #e0e0e0;
  margin-bottom: 30px;
  border-radius: 10px;
}

.progress {
  height: 100%;
  background-color: #ff6f61;
  border-radius: 10px;
  transition: width 0.4s ease;
}

/* Product Details */
.product-header h1 {
  font-size: 2.5rem;
  font-weight: bold;
  color: #222;
  text-align: center;
}

.product-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 30px;
}

.product-image-container {
  flex: 1;
  text-align: center;
}

.product-image {
  max-width: 100%;
  height: auto;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

.product-info {
  flex: 1;
}

.product-price {
  font-size: 1.8rem;
  color: #ff6f61;
  font-weight: bold;
  margin: 20px 0;
}

/* Buttons */
.buy-now-btn, .confirm-btn, .back-btn {
  background-color: #ff6f61;
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;
}

.buy-now-btn:hover, .confirm-btn:hover, .back-btn:hover {
  background-color: #e6554f;
}

.back-btn {
  background-color: #ccc;
  margin-left: 20px;
}

.back-btn:hover {
  background-color: #bbb;
}

/* Responsive */
@media (max-width: 768px) {
  .product-content {
    flex-direction: column;
    align-items: center;
  }

  .product-header h1 {
    font-size: 2rem;
  }

  .buy-now-btn, .confirm-btn, .back-btn {
    width: 100%;
    padding: 10px;
    margin-top: 10px;
  }
}
</style>
