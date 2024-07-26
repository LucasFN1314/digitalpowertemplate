<template>
    <div class="card desktop" slide shadow radius-border>
        <h1 underline>
            <slot name="title"></slot>
        </h1>
        <slot name="body"></slot>
    </div>

    <div class="card card-mobile mobile" slide shadow radius-border>
        <h1 underline>
            <slot name="title"></slot>
        </h1>
        <slot name="body"></slot>
    </div>
</template>

<style scoped>
.card {
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    padding: 2em;
}

.card-mobile {
    position: absolute;
    top: 0;
    right: 0;
    width: 85%;
}
</style>