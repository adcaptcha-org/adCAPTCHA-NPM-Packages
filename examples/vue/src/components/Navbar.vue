<template>
    <nav :class="['navbar', { 'navbar-scrolled': isScrolled }]">
      <ul class="navbar-links">
        <li><a href="#home" >Home</a></li>
        <li><a href="#contact" >Contact</a></li>
      </ul>
    </nav>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted, onUnmounted } from 'vue';
  
  const isScrolled = ref(false);
  let lastScrollPosition = 0;
  
  function smoothScroll(sectionId: string) {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  }
  
  function handleScroll() {
    const currentScrollPosition = window.scrollY;
  
    // Check if scrolling down and apply opacity, else set it back to full color
    isScrolled.value = currentScrollPosition > 0 && currentScrollPosition > lastScrollPosition;
  
    lastScrollPosition = currentScrollPosition;
  }
  
  onMounted(() => {
    window.addEventListener('scroll', handleScroll);
  });
  
  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
  });
  </script>
  
  <style scoped>
  /* Navbar base styles */
.navbar {
  position: sticky;
  top: 0;
  width: 100%;
  padding: 1rem 0; /* Add some space on the sides */
  display: flex;
  justify-content: flex-end; /* Align items to the left */
  background-color: #0c0b0b; /* Dark background */
  transition: background-color 0.3s ease;
  z-index: 1000; /* Ensure it's above the hero section */
}

/* Navbar links container */
.navbar-links {
  display: flex;
  gap: 2rem; /* Space between items */
  list-style: none;
  margin: 0;
  padding-right: 1.5rem;
}

/* Styling for each navbar link */
.navbar-links a {
  color: #fff; /* White text */
  text-decoration: none;
  font-size: 1.1rem; /* Slightly larger font size */
  font-weight: 600; /* Slightly bold for contrast */
  transition: color 0.3s ease; /* Smooth transition for hover */
}

/* Hover effect for navbar links */
.navbar-links a:hover {
  color: #e63946; /* Slightly yellow color on hover */
}

/* Change navbar background when scrolling down */
.navbar-scrolled {
  background-color: rgba(8, 7, 7, 0.9); /* Darker semi-transparent background when scrolled */
}
  </style>