<nav class="navbar">
    <ul class="navbar-links">
      <li><a href="#home">Home</a></li>
      <li><a href="#contact">Contact</a></li>
    </ul>
</nav>
  
<style>
    .navbar {
      position: sticky;
      top: 0;
      width: 100%;
      padding: 1rem 0;
      display: flex;
      justify-content: flex-end;
      background-color: #0c0b0b;
      transition: background-color 0.3s ease;
      z-index: 1000;
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
</style>
