<script lang="ts">
    export let responseMessage: string | null = null;
</script>
  
{#if responseMessage}
    <h3 class="response-message">{responseMessage}</h3>
{/if}
  
<style>
    .response-message {
      color: #e63946; 
      font-size: 1.1rem;
      margin-bottom: 1rem;
      text-align: center;
    }
</style>