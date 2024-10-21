<template>
  <header class="header">
    <div class="top-bar" style="display: flex;  justify-content: space-between; padding: 10px 20px;  font-size: 12px; background-color: #727272;">
      <div class="top-links" style=" color: black; text-decoration: none; margin-right: 5px;">
        <a href="#">FAQs</a> | <a href="#">Help</a> | <a href="#">Support</a>
      </div>
    </div>
  <nav class="main-nav" style=" display: flex; align-items: center; padding: 10px; border-bottom: 2px solid #434242; background-color: #f5f5f7;">
    <div class="logo">
      <h1>PI <span>WA</span></h1>
    </div>
    <input type="text" placeholder="Search for products 🔍" class="search-bar" style=" width: 68%; padding: 8px; margin: 0 20px; border: 1px solid #ccc; border-radius: 4px;" 
          v-model="searchQuery" @keyup.enter="searchProducts"/>
     
        <ul class="nav-links" style="list-style: none; display: flex;  gap: 20px;">
            <router-link to="/contact" style="text-decoration:none; color:black;">Contact</router-link>
            <router-link to="/about" style="text-decoration:none; color:black;">About</router-link>
            <li><a href="/login" style="text-decoration: none; color:black;">login</a></li>
            <li><a href="/register" style="text-decoration:none; color:black;">Register</a></li>
            <a href="/login" class="cart-icon" style="color:black;">
            <i class="fa fa-shopping-cart"></i>
          </a>
        </ul>
  </nav>
  </header>
  <div class="dropdown" style="margin-top: 20px;">
    <ul class="categories" style="display: flex; gap: 60px; justify-content: center; color:#555;">
      <li @click="navigate('featured')">Featured</li>
      <li @click="navigate('clothes')">Clothes</li>
      <li @click="navigate('shoes')">Shoes</li>
      <li @click="navigate('furniture')">Furniture</li>
      <li @click="navigate('craft')">Craft</li>
      <li @click="navigate('car')">Car</li>
      <li @click="navigate('toys')">Toys</li>
    </ul>
  </div>

<main class="main-area">
<div class="header">{{ currentPageTitle }}</div>
<div v-if="currentPage === 'landingpage'" class="landing">
      <div class="hero-section">
      <div class="hero-content" style="text-align: center; color: #fff;">
        <h2>10% OFF YOUR FIRST ORDER</h2>
        <h1>Fashionable Preloved Items</h1>
        <a href=""><button class="shop-now-btn" style="background-color: #957d79; border: none; padding: 10px 20px; color: #fff;  cursor: pointer; font-size: 16px; 
        border-radius: 5px; margin-top: 10px;">Shop Now</button></a>
      </div>
    </div>
      <div class="Featured">
        <h2 class="featured-padding">Featured Section</h2>
      </div>
      <section class="product-section">
<div v-for="(product, index) in products" :key="index" class="product-card" style=" position:relative; left:50px; display: inline-block;
   text-align: left; width: 230px; border: 1px solid #e1e1e1; border-radius: 8px; background-color: #f4f4f4;  margin: 10px;">
  <a href="/shopdetails">
    <img :src="product.image" :alt="product.alt" class="product-image" />
  </a>
    <h3 class="product-title">{{ product.title }}</h3>
    <p class="product-price">{{ product.price }}</p>
    <button class="Buy-now" @click="buyNow">Buy Now</button>
    <button class="add-to-cart-btn"><a href="/login">Add to Cart</a></button>
  </div>
  </section>
  </div>
  </main>
  <div v-if="currentPage === 'clothes'" class="clothes" style="display: flex; justify-content: center; align-items: flex-start; padding-top: 50px;">
    <ul class="item-list" style="display: flex; flex-wrap: wrap; gap: 20px; padding: 0; list-style-type: none; justify-content: center;">
    <li v-for="item in filteredItems('Clothes')" :key="item.id" class="product-card" 
    style="display: flex; flex-direction: column; width: 250px; border: 2px solid gray; padding: 20px; 
        border-radius: 8px; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);">
      <img :src="item.imageUrl" alt="item image" 
           style="width: 100%; height: auto; max-height: 150px; object-fit: contain; margin-bottom: 15px;" 
           @click="viewProductDetails(item)" class="clickable-image">
      
      <h4 class="product-title" style="margin: 5px 0; font-size: 1.2rem; ">{{ item.name }}</h4>
      
      <h3 class="product-price" style="margin: 5px 0; font-weight: bold; font-size: 1.3rem; color: #ff6f61;">
        ₱{{ item.price }}
      </h3>
      
      <p class="product-description" style="font-size: 0.9rem; color: #555; margin-bottom: 5px;">
        {{ item.description }}
      </p>
      <p>{{item.userFullName}}</p>
      <div style="display: flex; gap: 10px; margin-top: auto;">
        <button @click="buyNow(item)">Buy Now</button>
        <button @click="addToCart(item.id)">Add to Cart</button>
      </div>
    </li>
  </ul>
</div>
<div v-if="currentPage === 'shoes'" class="shoes" style="display: flex; justify-content: center; align-items: flex-start; padding-top: 50px;">
  <ul class="item-list" style="display: flex; flex-wrap: wrap; gap: 20px; padding: 0; list-style-type: none; justify-content: center;">
    <li v-for="item in filteredItems('Shoes')" :key="item.id" class="product-card" 
    style="display: flex; flex-direction: column; width: 250px; border: 2px solid gray; padding: 20px; 
        border-radius: 8px; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);">
      <img :src="item.imageUrl" alt="item image" 
           style="width: 100%; height: auto; max-height: 150px; object-fit: contain; margin-bottom: 15px;" 
           @click="viewProductDetails(item)" class="clickable-image">
      
      <h4 class="product-title" style="margin: 5px 0; font-size: 1.2rem; ">{{ item.name }}</h4>
      
      <h3 class="product-price" style="margin: 5px 0; font-weight: bold; font-size: 1.3rem; color: #ff6f61;">
        ₱{{ item.price }}
      </h3>
      
      <p class="product-description" style="font-size: 0.9rem; color: #555; margin-bottom: 5px;">
        {{ item.description }}
      </p>
      <p>{{item.userFullName}}</p>
      <div style="display: flex; gap: 10px; margin-top: auto;">
        <button @click="buyNow(item)">Buy Now</button>
        <button @click="addToCart(item.id)">Add to Cart</button>
      </div>
    </li>
  </ul>
</div>
<div v-if="currentPage === 'furniture'" class="furniture" style="display: flex; justify-content: center; align-items: flex-start; padding-top: 50px;">
  <ul class="item-list" style="display: flex; flex-wrap: wrap; gap: 20px; padding: 0; list-style-type: none; justify-content: center;">
    <li v-for="item in filteredItems('Furniture')" :key="item.id" class="product-card" 
    style="display: flex; flex-direction: column; width: 250px; border: 2px solid gray; padding: 20px; 
        border-radius: 8px; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);">
      <img :src="item.imageUrl" alt="item image" 
           style="width: 100%; height: auto; max-height: 150px; object-fit: contain; margin-bottom: 15px;" 
           @click="viewProductDetails(item)" class="clickable-image">
      
      <h4 class="product-title" style="margin: 5px 0; font-size: 1.2rem; ">{{ item.name }}</h4>
      
      <h3 class="product-price" style="margin: 5px 0; font-weight: bold; font-size: 1.3rem; color: #ff6f61;">
        ₱{{ item.price }}
      </h3>
      
      <p class="product-description" style="font-size: 0.9rem; color: #555; margin-bottom: 5px;">
        {{ item.description }}
      </p>
      <p>{{item.userFullName}}</p>
      <div style="display: flex; gap: 10px; margin-top: auto;">
        <button @click="buyNow(item)">Buy Now</button>
        <button @click="addToCart(item.id)">Add to Cart</button>
      </div>
    </li>
  </ul>
</div>
  <div v-if="currentPage === 'craft'" class="craft" style="display: flex; justify-content: center; align-items: flex-start; padding-top: 50px;">
    <ul class="item-list" style="display: flex; flex-wrap: wrap; gap: 20px; padding: 0; list-style-type: none; justify-content: center;">
    <li v-for="item in filteredItems('Craft')" :key="item.id" class="product-card" 
    style="display: flex; flex-direction: column; width: 250px; border: 2px solid gray; padding: 20px; 
        border-radius: 8px; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);">
      <img :src="item.imageUrl" alt="item image" 
           style="width: 100%; height: auto; max-height: 150px; object-fit: contain; margin-bottom: 15px;" 
           @click="viewProductDetails(item)" class="clickable-image">
      
      <h4 class="product-title" style="margin: 5px 0; font-size: 1.2rem; ">{{ item.name }}</h4>
      
      <h3 class="product-price" style="margin: 5px 0; font-weight: bold; font-size: 1.3rem; color: #ff6f61;">
        ₱{{ item.price }}
      </h3>
      
      <p class="product-description" style="font-size: 0.9rem; color: #555; margin-bottom: 5px;">
        {{ item.description }}
      </p>
      <p>{{item.userFullName}}</p>
      <div style="display: flex; gap: 10px; margin-top: auto;">
        <button @click="buyNow(item)">Buy Now</button>
        <button @click="addToCart(item.id)">Add to Cart</button>
      </div>
    </li>
  </ul>
</div>
  <div v-if="currentPage === 'car'" class="car" style="display: flex; justify-content: center; align-items: flex-start; padding-top: 50px;">
    <ul class="item-list" style="display: flex; flex-wrap: wrap; gap: 20px; padding: 0; list-style-type: none; justify-content: center;">
    <li v-for="item in filteredItems('Car')" :key="item.id"  class="product-card" 
    style="display: flex; flex-direction: column; width: 250px; border: 2px solid gray; padding: 20px; 
        border-radius: 8px; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);">
      <img :src="item.imageUrl" alt="item image" 
           style="width: 100%; height: auto; max-height: 150px; object-fit: contain; margin-bottom: 15px;" 
           @click="viewProductDetails(item)" class="clickable-image">
      
      <h4 class="product-title" style="margin: 5px 0; font-size: 1.2rem; ">{{ item.name }}</h4>
      
      <h3 class="product-price" style="margin: 5px 0; font-weight: bold; font-size: 1.3rem; color: #ff6f61;">
        ₱{{ item.price }}
      </h3>
      
      <p class="product-description" style="font-size: 0.9rem; color: #555; margin-bottom: 5px;">
        {{ item.description }}
      </p>
      <p>{{item.userFullName}}</p>
      <div style="display: flex; gap: 10px; margin-top: auto;">
        <button @click="buyNow(item)">Buy Now</button>
        <button @click="addToCart(item.id)">Add to Cart</button>
      </div>
    </li>
  </ul>
</div>
  <div v-if="currentPage === 'toys'" class="toys" style="display: flex; justify-content: center; align-items: flex-start; padding-top: 50px;">
    <ul class="item-list" style="display: flex; flex-wrap: wrap; gap: 20px; padding: 0; list-style-type: none; justify-content: center;">
    <li v-for="item in filteredItems('Toys')" :key="item.id" class="product-card" 
    style="display: flex; flex-direction: column; width: 250px; border: 2px solid gray; padding: 20px; 
        border-radius: 8px; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);">
      <img :src="item.imageUrl" alt="item image" 
           style="width: 100%; height: auto; max-height: 150px; object-fit: contain; margin-bottom: 15px;" 
           @click="viewProductDetails(item)" class="clickable-image">
      
      <h4 class="product-title" style="margin: 5px 0; font-size: 1.2rem; ">{{ item.name }}</h4>
      
      <h3 class="product-price" style="margin: 5px 0; font-weight: bold; font-size: 1.3rem; color: #ff6f61;">
        ₱{{ item.price }}
      </h3>
      
      <p class="product-description" style="font-size: 0.9rem; color: #555; margin-bottom: 5px;">
        {{ item.description }}
      </p>
      <p>{{item.userFullName}}</p>
      <div style="display: flex; gap: 10px; margin-top: auto;">
        <button @click="buyNow(item)">Buy Now</button>
        <button @click="addToCart(item.id)">Add to Cart</button>
      </div>
    </li>
  </ul>
</div>
</template>

<script setup>
import { ref, onMounted } from 'vue'; // Added onMounted here
import axios from 'axios';

const items = ref([]);

// Page navigation and content
const currentPage = ref('landingpage');
const searchQuery = ref('');
const filteredItems = (category) => {
  return items.value.filter((item) => {
    return (
      item.category === category &&
      (!searchQuery.value || item.name.toLowerCase().includes(searchQuery.value.toLowerCase()))
    );
  }); 
};

// Function to handle search action
const searchProducts = () => {
  // The search is handled automatically through computed filtering in filteredItems
};

onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:3001/approved-itemss');
    items.value = response.data;
  } catch (error) {
    console.error('Error fetching items:', error);
  }
});

const navigate = (page) => {
  currentPage.value = page;
};

</script>
<style scoped>
.add-btn-cart{
  text-decoration:none;
  color:black;
}
.hero-section {
    background: url('../assets/prelovedclothes.jpg') center/cover no-repeat;
    height: 400px;
    width:100%;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
  }

/* Header & Nav */


.nav-links li {
  cursor: pointer;
  font-size: 16px;
  color: #3b3a3a;
}

.logo h1 {
  font-size: 24px;
  margin: 0;
}

.logo span {
  color: #ff6f61;
}


.cart-icon i {
  font-size: 20px;
}

/* Product Section */
.product-section {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-top: 20px;
}



.product-image {
  width: 100%;
  height: 200px;
  border-radius: 8px;
  transition: transform 0.3s ease;
}

.product-image:hover {
  transform: scale(1.05);
}

.product-title {
  font-size: 18px;
  margin: 10px 0;
}

.product-price {
  font-size: 16px;
  color: #ff6f61;
  margin-bottom: 10px;
}

.categories li {
  list-style-type: none;
  cursor: pointer;
}

.categories li:hover {
  color: #ff6f61;
}

</style>
