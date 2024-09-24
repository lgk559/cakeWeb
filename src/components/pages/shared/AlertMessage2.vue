<template>
    <div class="message-alert">
        <div class="alert alert-dismissible" role="alert" :class="'alert-' + item.status" v-for="(item, i) in messages"
            :key="i">
            {{ item.message }}
            <button type="button" class="btn-close" @click="removeMessage(i)" aria-label="Close">
                <span aria-hidden="true"></span>
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted, onBeforeMount, getCurrentInstance } from 'vue';
import emitter from '*/EventBus.js';
let messages = ref([])

function updateMessage(message, status) {
    const timestamp = Math.floor(new Date() / 1000);
    messages.value.push({
        message,
        status,
        timestamp,
    });
    removeMessageWithTiming(timestamp);
}
function removeMessage(num) {
    messages.value.splice(num, 1);
}
function removeMessageWithTiming(timestamp) {
    setTimeout(() => {
        messages.value.forEach((item, i) => {
            if (item.timestamp === timestamp) {
                messages.value.splice(i, 1);
            }
        });
    }, 5000);
}
onBeforeMount(() => {

    emitter.on('message:push', (message, status = 'warning') => {
        updateMessage(message, status);
    });
})


</script>

<style scope>
.message-alert {
    position: fixed;
    max-width: 50%;
    top: 56px;
    right: 20px;
    z-index: 1100;
}
</style>