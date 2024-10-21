<template>
    <div class="order-history">
      <h2>Order History</h2>
      <ul>
        <li v-for="order in orders" :key="order.id">
          Order #{{ order.id }} - {{ order.date }} - ${{ order.total }}
        </li>
      </ul>
    </div>
  </template>
  
  <script setup>
  import {ref} from 'vue';
  </script>
  
  <style scoped>
  .order-history {
    margin-bottom: 20px;
  }
  </style>
  