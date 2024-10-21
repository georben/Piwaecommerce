<template>
    <header class="header" style="border-bottom: 1px solid #e1e1e1;">
    <div class="top-bar" style="display: flex; justify-content: space-between; padding: 10px 20px; font-size: 12px; background-color:rgb(114, 114, 114);">
      <div class="top-links">
         <a href="#">FAQs</a> | <a href="#">Help</a> | <a href="#">Support</a>
      </div>
      </div>
      <nav class="main-nav" style=" display: flex; align-items: center; padding: 20px; border-bottom: 2px solid rgb(67, 66, 66); background-color:#f5f5f7;"> 
       <div class="logo">
         <h1 style="font-size: 24px; margin: 0;"> PI <span style="color: #ff6f61;"> WA </span></h1>
       </div>
        <input type="text" placeholder="Search for products" class="search-bar" style=" width: 72%; padding: 8px; margin: 0 20px; border: 1px solid #ccc; border-radius: 4px;"/>
        <div class="nav-links">
            <a href="/LandingPages">Home</a>
            <a href="#">Contact</a>
            <a href="#">About</a>
        </div>    
        <div class="social-icons" style=" display: flex; align-items: center;">
            <a href="/ProfilePage" class="profile-icon" style="cursor: pointer; position: absolute; right:30px; top:45px;">
                <img src="../assets/profile.png" alt="Profile Icon" class="profile-image"  style="width: 40px; height: 40px; border-radius: 50%;"/>
            </a>
            <div class="carticon">
            <a href="/add-to-cart" class="cart-icon" style="position:absolute; right:86px; top:60px; color:black; font-size:19px;">
                <i class="fa fa-shopping-cart" style="margin: 0 5px; cursor: pointer;"></i>
                <span class="cart-count" v-if="cartCount > 0">{{ cartCount }}</span>
            </a>
        </div>
    </div>  
    </nav>
  </header>
    <div class="product-details" style="  max-width: 700px; margin: 50px auto; padding: 30px; border: 1px solid #e0e0e0;
    box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.1); border-radius: 5px;">
      <div class="product-header" style=" text-align: center; margin-bottom: 30px;">
        <h1 style="position:relative; left:140px; top:20px; font-size: 2rem; font-weight: bold;color: #222;">
          {{ item.name }}</h1>
      </div>
      <div class="product-content" style="display: flex; justify-content: space-between; align-items: flex-start; gap: 30px;">
        <div class="product-image-container" style="flex: 1; text-align: center;">
            <img :src="item.imageUrl" alt="Product Image" style="position:relative; background-color: #d6d4d4; bottom:70px; width: 100%; padding:50px 10px; max-width: 450px; 
            height: auto; border-radius: 10px; box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);" />
        </div>
        <div class="product-info" style="flex: 1;">
          <p class="product-description" style="font-size: 1.4rem;color: #555; margin-bottom: 20px;">
            {{ item.description }}</p>
  
          <div class="product-specs" style="margin-bottom: 10px;">
            <h3>Product Specifications</h3>
            <ul>
              <li>Category: {{ item.category }}</li>
              <li>Brand: {{ item.brand }}</li>
              <li>Stock: {{ item.stock > 0 ? 'In Stock' : 'Out of Stock' }}</li>
            </ul>
          </div>
          <div>
            <router-link to="/visit" style="text-decoration: none; color:black;">
            <p style="border:2px solid black; display:flex; align-items:center; justify-content:center; background-color:gray; cursor: pointer;">
              {{ item.userFullName }}</p>
          </router-link>
          </div>
          <p class="product-price">Price: ₱{{ item.price }}</p>
  
          <div class="product-actions">
            <button @click="buyNow(item)">Buy Now</button>
            <button @click="addToCart(item.id)">Add to cart</button>
          </div>
          <div class="Contact-seller" alt="Contact Seller Icon" style="position:relative; bottom:-10px;">
            <router-link to="/contact-seller" style="text-decoration: none;">
              <button style="display: flex; align-items: center; justify-content: center; padding:0 10px;">
                <img src="../assets/contact-seller.png" style="position:relative; left:-10px; top:2px;width:40px; height:40px; ">
                Contact Seller</button>
              </router-link>
            </div> 
        </div>
      </div>
  
      <div class="product-reviews">
        <h3>Customer Reviews</h3>
        <!-- Add reviews or a message if there are no reviews -->
        <p>No reviews yet. Be the first to review this product!</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import axios from 'axios';
  
  const route = useRoute();
  const router = useRouter();
  const id = route.params.id;
  const loggedInUserId = ref(1);
  const cartCount = ref(0);
  const item = ref({});

  function buyNow(item) {
  // Logic to handle the buying process
  alert(`You are buying: ${item.name} for ₱${item.price}`);
  // Redirect to a checkout page
  router.push({ name: 'TRanSActIONpage', params: { productId: item.id } });
}

  const fetchProductDetails = async () => {
    if (!id) {
      console.error('Product ID is undefined.');
      return;
    }
  
    try {
      const response = await axios.get(`http://localhost:3001/item/${id}`);
      item.value = response.data;
      await fetchCartCount();
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  };
  
  const fetchCartCount = async () => {
   try {
     const response = await axios.get(`http://localhost:3001/api/cart/${loggedInUserId.value}`);
     cartCount.value = response.data.length; // Assuming the response is an array of cart items
   } catch (error) {
     console.error('Error fetching cart count:', error);
   }
 };

  const addToCart = () => {
  const cartData = {
    user_id: loggedInUserId.value,
    product_id: item.value.id,
    name: item.value.name,
    quantity: 1,
    price: item.value.price,
    image_path: item.value.imageUrl
  };

  axios.post('http://localhost:3001/api/add-to-cart', cartData)
    .then(response => {
      console.log(response.data);
      alert('Item added to cart successfully!');
      fetchCartCount();
    })
    .catch(error => {
      console.error('Error adding item to cart:', error);
      alert('Failed to add item to cart.');
    });
 };
  onMounted(fetchProductDetails);
  </script>
  
  <style scoped>
  .nav-links a {
   margin: 0 5px;
   text-decoration: none;
   color: #3b3a3a;
 }
 
  
  
  .product-specs h3 {
    font-size: 1.6rem;
    color: #444;
    margin-bottom: 10px;
  }
  
  .product-specs ul {
    list-style-type: none;
    padding: 0;
  }
  
  .product-specs li {
    font-size: 1.2rem;
    color: #777;
    margin-bottom: 8px;
  }
  
  .product-price {
    font-size: 2rem;
    font-weight: bold;
    color: #ff6f61;
    margin-bottom: 20px;
  }
  
  .product-actions {
    display: flex;
    gap: 20px;
  }
  
  .add-to-cart-btn:hover, .buy-now-btn:hover {
    opacity: 0.8;
  }
  
  .product-reviews {
    margin-top: 40px;
  }
  
  .product-reviews h3 {
    font-size: 1.8rem;
    color: #444;
  }
  
  .product-reviews p {
    font-size: 1.2rem;
    color: #777;
  }
  </style>
  