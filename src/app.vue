<template>
    <div id="test">{{text}}</div>
</template>

<script>
export default {
    data(){
        return {
            text: 'abcd'
        }
    }
}
</script>

<style scoped>
#test {
    color: red;
}
</style>