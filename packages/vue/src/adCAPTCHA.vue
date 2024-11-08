<template>
    <div :data-adcaptcha="placementID"></div>
  </template>
  
  <script lang="ts">
  import { ref, onMounted, watch } from 'vue';
  import { loadScript } from './util';
  
  export default {
    name: 'AdCaptcha',
    props: {
      placementID: {
        type: String,
        required: true,
      },
      onComplete: {
        type: Function,
        default: undefined,
      },
    },
    setup(props) {
      const onCompleteRef = ref<(() => void) | undefined>(props.onComplete);
  
      watch(() => props.onComplete, (newOnComplete) => {
        onCompleteRef.value = newOnComplete;
      });
  
      onMounted(() => {
        loadScript().then(() => {
          if (onCompleteRef.value) {
            window.adcap.setupTriggers({
              onComplete: onCompleteRef.value,
            });
          }
        }).catch((err) => {
          console.error('Error loading adCAPTCHA script:', err);
        });
      });
  
      return {
        placementID: props.placementID,
      };
    },
  };
  
  export const setKeywords = (keywords: string[]) => {
    if (window.adcap) {
      window.adcap.setKeywords(keywords);
    }
  };
  
  export const getSuccessToken = () => window.adcap ? window.adcap.successToken : null;
  </script>