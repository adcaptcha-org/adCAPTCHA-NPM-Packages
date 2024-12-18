<template>
  <nav :class="['navbar']">
    <img src="../assets/logo_gradient.png" alt="Logo" class="navbar-logo" />
    <ul class="navbar-links">
      <li><a href="#home" >Home</a></li>
      <li><a href="#contact" >Contact</a></li>
    </ul>
  </nav>
</template>
  
<style scoped>
  .navbar {
    position: sticky;
    top: 0;
    width: 100%;
    padding: 1rem 0; 
    display: flex;
    align-items: center;
    justify-content: space-between; 
    background-color: #0c0b0b; 
    transition: background-color 0.3s ease;
    z-index: 1000; 
  }

  .navbar-logo {
    padding-left: 1.5rem;
    max-height: 50px; 
    width: auto;
  }

  .navbar-links {
    display: flex;
    gap: 2rem; 
    list-style: none;
    margin: 0;
    padding-right: 1.5rem;
  }

  .navbar-links a {
    color: #fff;
    text-decoration: none;
    font-size: 1.1rem;
    font-weight: 600; 
    transition: color 0.3s ease;
  }

  .navbar-links a:hover {
    color: #e63946; 
  }

  .navbar-scrolled {
    background-color: rgba(8, 7, 7, 0.9); 
  }
</style>
  