<template>
    <div id="welcome">
        <div class="container">
            <h1 class="logo">XYNOTES</h1>
        </div>
    </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
#welcome {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    .container {
        width: auto;
        position: relative;
        top: -10%;
        h1.logo {
            font-size: 5em;
            letter-spacing: 0.2em;
            text-shadow: 4px -7px 4px #5a5a5a;
        }
    }
}
</style>