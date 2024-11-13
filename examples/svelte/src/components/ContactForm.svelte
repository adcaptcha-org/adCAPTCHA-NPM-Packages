<script lang="ts">
    import { onMount } from "svelte";
    // import { AdCAPTCHA, getSuccessToken } from "@adcaptcha/vue"; 
    import ResponseMessage from './ResponseMessage.svelte';
    
    let form = {
      name: "",
      email: "",
      comments: ""
    };
  
    let token: string | null = null;
    let responseMessage: string | null = null;
    const PLACEMENT_ID = import.meta.env.VITE_APP_ADCAPTCHA_PLACEMENT_ID || "";
  
    // const handleComplete = () => {
    //   token = getSuccessToken();
    // };
  
    onMount(() => {
      if (!PLACEMENT_ID) {
        responseMessage = 'Placement ID has not been set. Please set the VITE_APP_ADCAPTCHA_PLACEMENT_ID environment variable.';
      }
    });
  
    const submitForm = () => {
      if (token) {
        console.log("Form submitted with token:", { ...form, token });
      } else {
        console.error("Form not submitted. Please complete the CAPTCHA.");
      }
    };
</script>
  
<section id="contact" class="contact-section">
    <div class="form-container">
      <h2 class="form-title">Contact Us</h2>
      <form on:submit|preventDefault={submitForm}>
        <input
          type="text"
          bind:value={form.name}
          placeholder="Name"
          class="form-input"
          required
        />
        <input
          type="email"
          bind:value={form.email}
          placeholder="Email"
          class="form-input"
          required
        />
        <textarea
          bind:value={form.comments}
          placeholder="Your Comments"
          class="form-input"
          rows="4"
          required
        ></textarea>
        
        {#if responseMessage}
          <ResponseMessage {responseMessage} />
        {/if}
        
        <!-- <AdCAPTCHA
          placementID={PLACEMENT_ID}
          on:complete={handleComplete}
        /> -->
        
        <button type="submit" class="form-button" disabled={!token}>Submit</button>
      </form>
    </div>
</section>
  
<style>
    .contact-section {
      background-color: #000; 
      padding: 4rem 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
    }
  
    .form-container {
      background-color: #333; 
      padding: 2rem;
      border-radius: 10px;
      width: 100%;
      max-width: 600px; 
      text-align: center;
      box-sizing: border-box; 
    }
  
    .form-title {
      color: #fff;
      font-size: 2rem;
      margin-bottom: 1.5rem;
    }
  
    .form-input {
      width: calc(100% - 2rem); 
      padding: 1rem;
      margin: 1rem auto; 
      border: 1px solid #ccc;
      border-radius: 5px;
      background-color: #222; 
      color: #fff;
      font-size: 1rem;
      transition: border-color 0.3s ease;
      display: block; 
    }
  
    .form-input:focus {
      outline: none;
      border-color: #e63946; 
    }
  
    .form-button {
      width: 100%;
      padding: 1rem;
      background-color: #e63946; 
      color: #fff;
      border: none;
      border-radius: 5px;
      font-size: 1.1rem;
      cursor: pointer;
      transition: background-color 0.3s ease;
      margin-top: 1rem;
      display: block; 
    }
  
    .form-button:hover {
      background-color: #d62828; 
    }
  
    @media (max-width: 768px) {
      .form-container {
        padding: 1rem; 
        width: 90%; 
      }
  
      .form-title {
        font-size: 1.5rem; 
        margin-bottom: 1rem; 
      }
  
      .form-input {
        font-size: 0.9rem; 
        padding: 0.8rem; 
      }
  
      .form-button {
        font-size: 1rem; 
        padding: 0.8rem; 
      }
    }
  
    @media (max-width: 480px) {
      .form-title {
        font-size: 1.3rem; 
        margin-bottom: 0.8rem;
      }
  
      .form-input {
        padding: 0.6rem; 
        font-size: 0.8rem; 
      }
  
      .form-button {
        padding: 0.6rem; 
        font-size: 0.9rem; 
      }
    }
</style>
