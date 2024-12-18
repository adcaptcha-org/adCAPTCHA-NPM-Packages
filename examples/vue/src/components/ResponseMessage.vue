<template>
    <h3 v-if="responseMessage" class="response-message">
      {{ responseMessage }}
    </h3>
</template>
  
<script setup lang="ts">
  defineProps<{
    responseMessage?: string | null;
  }>();
</script>
  
<style scoped>
  .response-message {
    color: #e63946; 
    font-size: 1.1rem;
    margin-bottom: 1rem;
    text-align: center;
  }
  </style>
  