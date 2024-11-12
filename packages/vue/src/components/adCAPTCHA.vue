<template>
  <div :data-adcaptcha="placementID" data-testid="adCaptcha"></div>
</template>

<script lang="ts">
import { ref, onMounted, watch, PropType, defineComponent } from 'vue';
import { loadScript } from '../util';  

export default defineComponent({
  name: 'AdCaptcha',
  props: {
    placementID: {
      type: String,
      required: true,
    },
    onComplete: {
      type: Function as PropType<(() => void) | undefined>,
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
});
</script>