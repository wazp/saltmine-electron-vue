<template>
    <label class="betterInput">
        <span>{{label}}</span>
        <input :type="type" :value="value" @input="onInput" @focus="onFocus" @blur="onBlur" />
    </label>
</template>

<script>
export default {
  name: 'betterinput',
  props: ['label', 'type', 'value'],
  mounted () {
    let input = this.$el.querySelector('input')
    if (input.value) this.$el.classList.add('has-value')
  },
  methods: {
    onInput (e) {
      if (e.target.value) {
        this.$el.classList.add('has-value')
      } else {
        this.$el.classList.remove('has-value')
      }
      this.$emit('input', e.target.value)
    },
    onFocus (e) {
      this.$el.classList.add('is-focused')
    },
    onBlur (e) {
      this.$el.classList.remove('is-focused')
    }
  }
}
</script>

<style lang="less" scoped>
  label{
    position: relative;
    display: inline-block;
    width: 100%;
    margin-bottom: 10px;

    span{
      position: absolute;
      font-size: .875rem;
      left: 13px;
      top: 50%;
      transform: translateY(-50%);
      cursor: text;
      transition: all .15s ease-out;
      color: #aaa;
    }

    &.is-focused, &.has-value{
      span{
        transform: translateY(-130%);
        font-size: .6875rem;
      }
    }

    input{
      border-radius: 5px;
      padding: 1.4rem 0.7rem .8rem;
      width:100%;
    }
  }
</style>