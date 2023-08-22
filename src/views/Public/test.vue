<template>
    <MazPicker
      v-model="dateValue"
      label="Select date"
      color="secondary"
      format="YYYY"
    />
  </template>
  
  <script setup lang="ts">
    import MazPicker from 'maz-ui/components/MazPicker'
    import { ref } from 'vue'
    const dateValue = ref()
  </script>