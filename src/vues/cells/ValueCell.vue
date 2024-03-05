<script setup>
import ValueText from "@/vues/cells/ValueText.vue";
import { iFormatValue } from "@/js/format.js";
</script>

<template>
  <td>
    <div style="text-align: right !important;">
      <div class="nowrap flex-container">
        <ValueText :class="[fontColor, { highlighted: highlighted }, { textColor: fontColor }]" :value="effectiveValue"
          :text="iFormatValue(effectiveValue, format)" />
        <svg v-if="showArrow" viewBox="0 0 9 16" fill="none" xmlns="http://www.w3.org/2000/svg" class="arrow-icon"
          :class="[fontColor]">
          <path data-v-ae951afa="" d="M5.79 15.013H3.778V7.806H.813L4.808.398l4.004 7.408H5.791v7.207z"
            fill="currentColor" />
        </svg>
      </div>
    </div>
  </td>
</template>

<script>
export default {
  components: { ValueText },
  props: {
    value: {
      type: Number,
      default: null,
    },
    colored: {
      type: Boolean,
      default: true,
    },
    absolute: {
      type: Boolean,
    },
    highlighted: {
      type: Boolean,
      default: false,
    },
    arrow: {
      type: Boolean,
      default: false,
    },
    format: {
      validator: function (value) {
        return ['number', 'money', 'percent'].includes(value);
      },
      default: 'number'
    },
  },
  computed: {
    effectiveValue() {
      return this.value;
    },
    isHighlighted() {
      return this.highlighted;
    },
    fontColor() {
      if (this.colored) {
        if (this.value > 0) return "green";
        if (this.value < 0) return "red";
        return "";
      }
      else {
        return "black";
      }
    },
    showArrow() {
      return this.arrow && this.value != 0;
    }
  }
};

</script>

<style scoped>
.justify-right {
  justify-content: flex-end !important;
  text-align: right;
}

.flex-container {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.arrow-icon {
  width: .5rem;
  height: .75rem;
  margin-left: .25rem;

  &.green {
    color: #2ec623 !important;
  }

  &.red {
    color: #fe2700 !important;
    transform: rotate(180deg);
  }

  &.black {
    color: #000000 !important;
  }
}
</style>