<script setup>

</script>
<template>
  <router-link to="/LandingPage"><img src="@/assets/arrow-back-icon-18.jpg" alt="arrow" style="height:20px; width:50px;"></router-link>
  <div style="font-size: 30px; text-align:center; color:gray;">
    <h1>WANT TO KNOW MORE?</h1>
    <h2 >REACH OUT TO US.</h2>
  </div>
  <div class="Contact">
    <div class="Email" style="position:absolute; padding:20px 50px; background-color:#e2dede; top:60%; left: 30%; border-radius:10px;">
      <img src="@/assets/email.png" alt="email icon" class="emailicon" style="height:120px; width:120px;">
      <span style="display:flex;  justify-content: center; align-items: center; margin-bottom: 10px;">Email</span>
      <span>piwa@gmail.com</span>
    </div>
    <div class="Phone" style="position:absolute; padding:20px 50px; background-color:#e2dede; top:60%; left:52%; border-radius:10px;">
      <img src="@/assets/cellphone-remove-bg.png" alt="phone icon" class="phoneicon" style="height:120px; width:120px;">
      <span style="display:flex; text-align: center; justify-content: center; margin-bottom: 10px;">Phone</span>
      <span>12345678901</span>
    </div>
  </div>
</template>


<style scoped>

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

</style>
