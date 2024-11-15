<script lang="ts">
    import { onMount } from 'svelte';
    import { loadScript } from './util.ts';

    type OnCompleteHandler = () => void;
  
    export let placementID: string;
    export let onComplete: OnCompleteHandler | undefined;

    onMount(() => {
      async function setupTriggers() {
        await loadScript();
        
        if (window.adcap && onComplete) {
          window.adcap.setupTriggers({ onComplete });
        }
      }
  
      setupTriggers();
    });
  </script>
  
  <div data-adcaptcha={placementID}></div>