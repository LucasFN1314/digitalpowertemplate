<template>
    <div class="card desktop" slide shadow radius-border>
        <h1 underline>
            <slot name="title"></slot>
        </h1>
        <slot name="body"></slot>
    </div>

    <!--
    <div class="card card-mobile mobile" slide shadow radius-border>
        <h1 underline>
            <slot name="title"></slot>
        </h1>
        <slot name="body"></slot>
    </div>
-->
</template>

<style scoped>
.card {
    width: 100%;
    height: 90vh;
    overflow-x: hidden;
    overflow-y: auto;
    padding: 2em;
}

@media screen and (max-width: 500px) {
    h1 {
        font-size: 1.5em;
    }

    .card {
        height: 95vh;
    }
}
</style>