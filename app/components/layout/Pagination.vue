<template>
    <div class="pagination">
        <PageButton
            :disabled="isPreviousButtonDisabled"
            @click.native="prevPage"
            >
            ←
        </PageButton>
        <span v-if="hiddenBefore">
        <PageNumber
            v-if="hiddenBefore"
            :pageNumber="1"
            :currentPage="currentPage"
            @loadPage="onLoadPage"/>
            ...
        </span>
        <PageNumber
            v-for="page in pages"
            :key="page"
            :pageNumber="page"
            :currentPage="currentPage"
            @loadPage="onLoadPage"
            />
        
        <span v-if="hiddenAfter">    
            ...
        <PageNumber
            v-if="hiddenAfter"
            :pageNumber="pageCount"
            :currentPage="currentPage"
            @loadPage="onLoadPage"/>
        </span>
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
    data() {
        return {
            maxPageNums: 8
        }
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
        hiddenBefore() {
            return this.currentPage >= this.maxPageNums / 2
        },
        hiddenAfter() {
            return this.currentPage <= this.pageCount - (this.maxPageNums / 2) + 1
        },
        pages() {
            // eslint-disable-next-line
            console.log(this.pageCount)
            let end = this.pageCount
            let offset = 1
            if(this.pageCount > this.maxPageNums) {
                end = this.maxPageNums - 3
                if(this.currentPage < (this.maxPageNums / 2)) {
                    //
                } else {
                    offset = this.currentPage - (this.maxPageNums / 2) + 2
                    if(offset > this.pageCount - (this.maxPageNums / 2)) {
                        offset = this.pageCount - (this.maxPageNums / 2)
                    }
                }
            }
            return Array.from([...Array(end).keys()].map(x => x + offset));
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