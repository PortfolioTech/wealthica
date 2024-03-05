<script setup>
import ValueCell from "@/vues/cells/ValueCell.vue";
</script>

<template>
  <ValueCell :format="'money'" class="justify-right" />
</template>

<script>
export default {
  components: { ValueCell },
};
</script>