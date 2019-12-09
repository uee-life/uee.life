<template>
    <div class="tabs">
        <header class="tab-header">
            <ul class="tab-titles">
                <li
                    class="tab-title"
                    v-for="tab in tabs"
                    :key="tab"
                    :class="{'tab-title-active': activeTab === tab}"
                    v-on:click="switchTab(tab);">
                    <slot :name="tabTitleSlotName(tab)">
                        {{ tab }}
                    </slot>
                </li>
            </ul>
        </header>
        <main class="tab-body">
            <div class="tab-panel">
                <slot :name="tabPanelSlotName"></slot>
            </div>
        </main>
    </div>
</template>

<script>
export default {
    name: 'tabs',
    props: ['tabs', 'initialTab'],
    data() {
        return {
            activeTab: this.initialTab
        }
    },
    computed: {
        tabPanelSlotName() {
            return `tab-content-${this.activeTab}`;
        }
    },
    methods: {
        tabTitleSlotName(tabName) {
            return `tab-title-${tabName}`;
        },

        switchTab(tabName) {
            this.activeTab = tabName;
        }
    }
}
</script>

<style>

    .tab-titles {
        margin-bottom: 10px;
    }

    .tab-title {
        display: inline-block;
        margin: 0 5px;
        padding: 10px;
        padding-bottom: 8px;
        font-size: 16px;
        font-family: 'Michroma';
        letter-spacing: 0.8px;
        text-decoration: none;
        border-bottom: 2px solid transparent;
        cursor: pointer;
        transition: all 0.25s;
    }

    .tab-title:hover {
        border-bottom: 2px solid #39ced8;
    }

    .tab-title-active {
        border-bottom: 2px solid #39ced8;
    }

</style>