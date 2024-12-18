<section id="home" class="hero-section">
    <div class="hero-content">
      <h1 class="hero-title">adCAPTCHA Svelte Test Ground</h1>
      <a href="#contact" class="get-started-btn">Get Started</a>
    </div>
</section>
  
<style>
    .hero-section {
      width: 100vw;
      height: 50vh;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff; 
      text-align: center;
      position: relative;
      overflow: hidden; 
    }
  
    .hero-section::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.6); 
      z-index: 1;
    }
  
    .hero-content {
      position: relative; 
      z-index: 2;
      padding: 3rem;
      text-align: center;
    }
  
    .hero-title {
      font-size: 3rem;
      font-weight: bold;
      margin-bottom: 1.5rem;
      color: #e63946;
    }
  
    .get-started-btn {
      display: inline-block;
      padding: 1rem 2rem;
      background-color: #e63946;
      color: #fff;
      font-size: 1.1rem;
      text-decoration: none;
      border-radius: 5px;
      transition: background-color 0.3s ease, transform 0.3s ease;
    }
  
    .get-started-btn:hover {
      background-color: #d62828;
      transform: scale(1.05);
    }
  
    @media (max-width: 768px) {
      .hero-title {
        font-size: 2.5rem;
      }
  
      .hero-content {
        padding: 2rem;
      }
    }
  
    @media (max-width: 480px) {
      .hero-title {
        font-size: 1.8rem;
      }
  
      .get-started-btn {
        padding: 0.5rem 1rem;
        font-size: 1rem;
      }
  
      .hero-content {
        padding: 1.5rem;
      }
    }
</style>
