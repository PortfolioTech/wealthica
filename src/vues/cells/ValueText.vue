<template>
  <span class="value-text" :class="{ underline: isNA }">
    {{ text }}
  </span>
</template>

<script>
import _ from "lodash";

export default {
  props: {
    value: {
      type: Number,
      default: null,
    },
    text: {
      type: String,
      default: "",
    },
    allowNil: {
      type: Boolean,
    },
  },

  computed: {
    isNA() {
      return !(this.allowNil || _.isFinite(this.value));
    },
    tooltipContent() {
      return this.isNA ? this.$t("n_a_tooltip") : "";
    },
  },
};
</script>

<style lang="scss" scoped>
.value-text {
  line-height: 1.25;

  &.highlighted {
    padding: 3px 6px;
    border-radius: 8px;

    &.green {
      background-color: rgba(#2ec623, 0.1);
    }

    &.red {
      background-color: rgba(#fe2700, 0.1);
    }
   
    &.black {
      background-color: rgba(#000000, 0.1);
    }
  }

  &.textColor {

    &.green {
      color: rgba(#2ec623, 1);
    }

    &.red {
      color: rgba(#fe2700, 1);
    }

    &.black {
      color: rgba(#000000, 1);
    }

  }
}
</style>
