<template>
    <div class="crew-record">
        <portrait :handle="crew.citizen" :showName="true" @finished="isLoaded()"></portrait>
        <div class="info">
            <div class="info-item">
                <span class="label">Role:</span>
                <span v-if="edit.role" class="value">
                    <input type="text" v-model="role" maxlength="20" />
                    <img @click="update" class="edit-button save" title="save" src="~/assets/tick.png">
                    <img @click="edit.role = false" class="edit-button cancel" title="cancel" src="~/assets/delete.png">
                </span>
                <span v-else class="value">{{ crew.role }}<img v-if="canEdit" @click="edit.role = true" class="edit-button edit" src="~/assets/edit.png"></span>
            </div>
            <div v-if="crew.joined" class="info-item">
                <span class="label">Joined:</span>
                <span class="value">{{ ueeDate(crew.joined) }}</span>
            </div>
        </div>
        <div v-if="canEdit" class="actions">
            <input type="button" class="remove" @click="remove" value="Remove" />
        </div>
    </div>
</template>

<script>
import { gsap } from 'gsap'

export default {
    name: "Crew",
    props: ['crew', 'canEdit'],
    data () {
        return {
            role: '',
            edit: {
                role: false
            }
        }
    },
    methods: {
        remove() {
            this.$emit('remove', this.crew.id)
        },
        update() {
            this.$emit('update', this.crew.id, this.role)
        },
        isLoaded() {
            const tl = gsap.timeline()
            tl.fromTo(
                ".crew-record",
                {duration: 1, height: '20px'},
                {height: '280px'}
            )
            tl.to(
                ".crew-record",
                {
                    duration: 1,
                    opacity: 1
                }
            )
        }
    },
    mounted () {
        this.role = this.crew.role
    }
}
</script>

<style scoped>
.crew-record {
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    opacity: 0;
    width: 300px;
    height: 20px;
}

.crew-record .info {
    width: calc(100% - 20px);
}

.info-item {
    display: flex;
    margin: 0;
}

.info-item .label {
    width: 60px;
}

.actions {
    display: flex;
    margin: 5px;
}

.actions input {
    margin: 5px;
}
.actions .remove {
    color: red;
    border-color: red;
}
</style>