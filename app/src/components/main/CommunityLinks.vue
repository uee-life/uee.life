<template>
    <dock-item title="Community Links" mainClass="community-links">
        <div class="link"><a href="https://gallog.co" target="_blank">Galaxy Logistics</a></div>
    </dock-item>
</template>

<script>

export default {
    name: 'community-links',
    components: {
    }
}
</script>

<style>
    .community-links .content {
        opacity: 1;
    }

    .community-links .link::before {
      content: "> "
    }
    .community-links .link {
        margin-left: 10px;
        margin-right: 10px;
    }
    .community-links .link a {
      text-decoration: none;
      color: #39ced8;
    }
</style>