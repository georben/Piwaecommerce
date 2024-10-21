<template>
    <div class="my-favorites">
      <h2>My Favorites</h2>
      <div v-if="favorites.length === 0">
        <p>You have no favorite products yet.</p>
      </div>
      <div class="favorites-grid" v-else>
        <div v-for="product in favorites" :key="product.id" class="favorite-item">
          <img :src="product.image" :alt="product.name" />
          <h3>{{ product.name }}</h3>
          <p>{{ product.description }}</p>
          <button @click="removeFromFavorites(product.id)">Remove</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { mapState, mapActions } from 'vuex';
  
  export default {
    name: 'MyFavorites',
    computed: {
      ...mapState(['favorites']),
    },
    methods: {
      ...mapActions(['removeFromFavorites']),
    },
  };
  </script>
  
  <style scoped>
  .my-favorites {
    padding: 20px;
  }
  
  .favorites-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 20px;
  }
  
  .favorite-item {
    border: 1px solid #ddd;
    padding: 10px;
    text-align: center;
  }
  
  .favorite-item img {
    max-width: 100%;
    height: auto;
  }
  
  button {
    background-color: red;
    color: white;
    border: none;
    padding: 5px 10px;
    cursor: pointer;
  }
  </style>
  