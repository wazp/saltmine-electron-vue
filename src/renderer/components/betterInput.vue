<template>
    <div>
        <label>{{placeholder}}</label>
        <input :type="type" :text="text" :name="name" />
    </div>
</template>

<script>
export default {
  name: 'betterinput',
  props: ['placeholder', 'type', 'text', 'name'],
  data () {
    return {}
  }
}
</script>