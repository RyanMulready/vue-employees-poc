<template>
 <div>
    <q-fixed-position corner="bottom-right" :offset="[18, 18]">
        <q-fab color="green" icon="keyboard_arrow_up" direction="up">
            <slot name="action"></slot>
        </q-fab>
    </q-fixed-position>
    </div>
</template>
<script>
export default {}
</script>
<style scoped>

</style>
