<script lang="ts">
	import { onMount } from 'svelte';
    import { adCAPTCHA as AdCAPTCHA , getSuccessToken } from '../lib/index.ts'; 
    import { PUBLIC_SVELTE_APP_PLACEMENT_ID } from '$env/static/public'

    let PLACEMENT_ID = PUBLIC_SVELTE_APP_PLACEMENT_ID;
    
    let responseMessage = "";
    let username = '';
    let comments = '';
  
    function handleComplete() {
      const token = getSuccessToken();
      console.log("CAPTCHA completed successfully, token:", token);
    }

    function handleSubmit() {
        console.log('Form submitted:', { username, comments });
    }

    $: if (!PLACEMENT_ID) {
        responseMessage = 'Placement ID has not been set. Please set the PLACEMENT_ID variable.';
    } else {
        responseMessage = ''; 
    }
</script>

<div class="container">
    <h1>Welcome to Svelte library project</h1>
    <p>Create your package using @sveltejs/package and preview/showcase your work with SvelteKit</p>
    <p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>
    <form on:submit|preventDefault={handleSubmit} class="form-container">
        <div class="form-field">
            <label for="username">Username:</label>
            <input
            type="text"
            id="username"
            bind:value={username}
            placeholder="Enter your username"
            required
            />
        </div>

        <div class="form-field">
            <label for="comments">Comments:</label>
            <textarea
            id="comments"
            bind:value={comments}
            placeholder="Enter your comments"
            required
            ></textarea>
        </div>
        {#if responseMessage}
            <h3>{responseMessage}</h3>
        {/if}
        <AdCAPTCHA placementID={PLACEMENT_ID} onComplete={handleComplete} />
        <div class="form-field">
            <button type="submit">Submit</button>
        </div>
    </form>
</div>

<style>
    .container {
        width: 100vw;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .form-container {
      display: flex;
      flex-direction: column;
      gap: 10px;
      margin-top: 20px;
      width: 300px;
      max-width: 100%;
    }
  
    .form-field {
      display: flex;
      flex-direction: column;
    }
  
    label {
      font-size: 14px;
      margin-bottom: 5px;
    }
  
    input,
    textarea {
      padding: 8px;
      font-size: 14px;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
  
    button {
      padding: 10px;
      font-size: 16px;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
  
    button:hover {
      background-color: #0056b3;
    }
  </style>
