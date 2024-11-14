<script lang="ts">
    import { onMount, afterUpdate } from 'svelte';
    import { loadScript } from '../util'; 
  
    export let placementID: string;
    export let onComplete: (() => void) | undefined;
  
    let onCompleteRef: (() => void) | undefined = onComplete;
  
    afterUpdate(() => {
      onCompleteRef = onComplete;
    });
  
    onMount(() => {
      loadScript()
        .then(() => {
          if (onCompleteRef) {
            window.adcap.setupTriggers({
              onComplete: onCompleteRef,
            });
          }
        })
        .catch((err) => {
          console.error('Error loading adCAPTCHA script:', err);
        });
    });
  </script>
  
  <div data-adcaptcha={placementID} data-testid="adCaptcha"></div>