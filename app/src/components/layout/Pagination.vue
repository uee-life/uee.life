<template>
    <div class="pagination">
        <PageButton
            :disabled="isPreviousButtonDisabled"
            @click.native="prevPage"
            >
            ←
        </PageButton>
        <PageNumber
            v-for="page in pages"
            :key="page"
            :pageNumber="page"
            :currentPage="currentPage"
            @loadPage="onLoadPage"
            />
        <PageButton
            :disabled="isNextButtonDisabled"
            @click.native="nextPage"
            >
            →
        </PageButton>
    </div>
</template>

<script>
import PageButton from "./PageButton.vue"
import PageNumber from "./PageNumber.vue"

export default {
    name: "pagination",
    props: {
        currentPage: {
            type: Number,
            required: true
        }, 
        pageCount: {
            type: Number,
            required: true
        }
    },
    components: {
        PageButton,
        PageNumber
    },
    methods: {
        nextPage() {
            this.$emit('nextPage')
        },
        onLoadPage(value) {
            this.$emit('loadPage', value)
        },
        prevPage() {
            this.$emit('prevPage')
        }
    },
    computed: {
        isPreviousButtonDisabled() {
            return this.currentPage === 1
        },
        isNextButtonDisabled() {
            return this.currentPage === this.pageCount
        },
        pages() {
            // eslint-disable-next-line
            console.log(this.pageCount)
            return Array.from([...Array(this.pageCount).keys()].map(x => ++x));
        }
    }
}
</script>

<style>
    .pagination {
        display: flex;
        justify-content: center;
    }
</style>