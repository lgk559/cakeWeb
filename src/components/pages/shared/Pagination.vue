<template>
    
    <nav aria-label="Page navigation" v-if="paginationValue && paginationValue.total_pages>0" class="col-12 d-flex px-3">
        <ul class="pagination">
            <li class="page-item" :class="{'disabled': !paginationValue.has_pre}">
                <a class="page-link text-brown border-brown" href="#" aria-label="Previous" @click.prevent="getPagination((paginationValue.current_page-1))">
                    <span aria-hidden="true">&laquo;</span>
                </a>
            </li>
            <li class="page-item" v-for="page in paginationValue.total_pages" :class="{'active': paginationValue.current_page === page}">
                <a class="page-link bg-white text-brown border-brown" href="#" @click.prevent="getPagination((page))">{{ page }}</a>
            </li>
            <li class="page-item" :class="{'disabled': !paginationValue.has_next}">
                <a class="page-link text-brown border-brown" href="#" aria-label="Next" @click.prevent="getPagination((paginationValue.current_page+1))">
                    <span aria-hidden="true">&raquo;</span>
                </a>
            </li>
        </ul>
    </nav>
</template>

<script setup>
import { ref, onMounted} from 'vue';
import emitter from '*/EventBus';

let paginationValue = ref(null)

function getPagination(page) {
    emitter.emit('pagination:chage',page);
}

onMounted(() => {
    emitter.on('pagination:init', (pagination) => {
        paginationValue.value = pagination
    });
})
// watch(paginationValue,(newValue, oldValue) => {
//   console.log('sum 改變了', newValue, oldValue)
//   alert(paginationValue.value)
// })
</script>