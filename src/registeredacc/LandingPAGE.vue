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
       
        <input type="text" placeholder="Search for products 🔍" class="search-bar" style=" width: 75%; padding: 8px; margin: 0 20px; border: 1px solid #ccc; border-radius: 4px;" 
          v-model="searchQuery" @keyup.enter="searchProducts"/>
        
          
        <div class="nav-links">
          <router-link to="/contacts" style="text-decoration:none;">Contact</router-link>
          <router-link to="/abouts" style="text-decoration:none;">About</router-link>
         <div class="social-icons" style=" display: flex; align-items: center;">
            <a href="/ProfilePage" class="profile-icon" style="cursor: pointer; position: absolute; right:30px; top:45px;">
                <img src="../assets/profile.png" alt="Profile Icon" class="profile-image"  style="width: 40px; height: 40px; border-radius: 50%;"/>
            </a>
        <div class="carticon">
            <a href="/add-to-cart" class="cart-icon" style="position:absolute; right:80px; top:60px;">
                <i class="fa fa-shopping-cart" style="margin: 0 5px; cursor: pointer; color:black;"></i>
                <span class="cart-count" v-if="cartCount > 0">{{ cartCount }}</span>
            </a>
        </div>
    </div>  
      </div>
    </nav>
  </header>
<div class="dropdown" style="margin-top: 20px; margin-bottom:0px;  padding:16px;">
  <ul class="categories" style="display: flex; left:25.7%; gap: 60px; justify-content: center; color:#555;  cursor: pointer;
   position: absolute; flex-direction: row; top:115px;">
    <li @click="navigate('LandingPage')">Featured</li>
    <li @click="navigate('clothes')">Clothes</li>
    <li @click="navigate('shoes')">Shoes</li> 
    <li @click="navigate('furniture')">Furniture</li>
    <li @click="navigate('craft');">Craft</li>
    <li @click="navigate('car')">Car</li>
    <li @click="navigate('toys')">Toys</li>
</ul>
</div>

<main class="main-area">
<!-- <div class="header">{{ currentPageTitle }}</div> -->
<div v-if="currentPage === 'LandingPage'" class="Landing">
      <div class="hero-section">
      <div class="hero-content" style="text-align: center; color: #fff;">
        <h2>10% OFF YOUR FIRST ORDER</h2>
        <h1>Fashionable Preloved Items</h1>
        <a href=""><button class="shop-now-btn" style="background-color: #957d79; border: none; padding: 10px 20px; color: #fff;  cursor: pointer; font-size: 16px; 
        border-radius: 5px; margin-top: 10px;">Shop Now</button></a>
      </div>
    </div>
      <div class="Featured" style="text-align: center;">
        <h2 class="featured-padding">Featured Section</h2>
      </div>
      <section class="product-section">
<div v-for="(product, index) in filteredProducts" :key="index" class="product-card" style=" position:relative; left:50px; display: inline-block;
   text-align: left; width: 230px; border: 1px solid #e1e1e1; border-radius: 8px; background-color: #f4f4f4;  margin: 10px;">
  <a href="/shopdetails">
    <img :src="product.image" :alt="product.alt" class="product-image" style=" width: 100%;  height: 200px; max-width: 200px;  border-radius: 8px; position: relative; left:15px;"/>
  </a>
    <h3 class="product-title" style=" font-size: 18px; margin: 10px 0;"></h3>
    <p class="product-price" style="font-size: 16px; color: #ff6f61; margin-bottom: 10px;"></p>
    <button>Buy Now</button>
    <button class="add-to-cart-btn"><a href="">Add to Cart</a></button>
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
 import '../assets/style.css';
 import { ref, onMounted} from 'vue';
 import axios from 'axios';
 import { useRouter } from 'vue-router';

 const router = useRouter();
 const searchQuery = ref('');
 const currentPage = ref('LandingPage');
 const items = ref([]);
 const cartCount = ref(0);
 const loggedInUserId = ref(1); // Assuming a static user ID for now
 const navigate = (page) => {
 currentPage.value = page;
 };

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
    await fetchCartCount();
  } catch (error) {
    console.error('Error fetching items:', error);
  }
});
function buyNow(item) {
 // Logic to handle the buying process
 alert(`You are buying: ${item.name} for ₱${item.price}`);
 // Redirect to a   checkout page
 router.push({ name: 'TRanSActIONpage', params: { productId: item.id } });
}

const addToCart = (itemId) => {
  const selectedItem = items.value.find(item => item.id === itemId);
  
  const cartData = {
    user_id: loggedInUserId.value,
    name: selectedItem.name,
    quantity: 1,
    price: selectedItem.price,
    image_path: selectedItem.imageUrl
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

const fetchCartCount = async () => {
  try {
    const response = await axios.get(`http://localhost:3001/api/cart/${loggedInUserId.value}`);
    cartCount.value = response.data.length; // Assuming the response is an array of cart items
  } catch (error) {
    console.error('Error fetching cart count:', error);
  }
};

// Function to add item to cart
const viewProductDetails = (item) => {
 if (item && item.id) {
   // Set a loading state or show a loading message (optional)
   // You might want to add a loading spinner or message here
   setTimeout(() => {
     router.push({ name: 'PRODUCTDETAILS', params: { id: item.id } });
   }, 2000); 
 } else {
   console.error('Invalid item or item.id is undefined');
   alert('Cannot view details of this item.');
 }
};


</script>

<style scoped>
 .clickable-image{
  transition: transform 0.3s ease;
  cursor:pointer;
 }
 .clickable-image:hover{
    transform: scale(1.1); /* Scale up by 10% */

 }
  .feature i {
    font-size: 24px;
    color: #957d79;
    margin-bottom: 5px;
  }
  
 .hero-section {
    background: url('../assets/prelovedclothes.jpg') center/cover no-repeat;
    height: 400px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
  }
  
.categories li {
  list-style-type: none;         
}
 
.cart-icon i {
font-size: 20px;
}

 .main-content {
   display: flex;
   padding: 20px;
 }
 

 .top-links a {
  color: black;
   text-decoration: none;
   margin-right: 5px;
 }
 
 .nav-links a {
   margin: 0 10px;
   text-decoration: none;
   color: #3b3a3a;
 }
 
 /* Product Section Styling */
 .product-section {
  margin-top: -10px;
  grid-template-columns: repeat(4, 1fr); /* Four equal-width columns */
  gap: 20px; /* Spacing between the product cards */
}
 
  .product-image:hover{
    transform: scale(1.05);
  }

 .add-to-cart-btn {
   padding: 10px 15px;
   background-color: #957d79;
   color: #fff;
   border: none;
   border-radius: 4px;
   cursor: pointer;
 }
 
 .add-to-cart-btn:hover {
   background-color: #665755;
 }

 .categories li:hover {
  color: #ff6f61;
}

 </style>
 