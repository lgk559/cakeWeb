<template>
    
    <nav aria-label="Page navigation" v-if="paginationValue && paginationValue.total_pages>0" class="rol">
        <ul class="pagination">
            <li class="page-item" :class="{'disabled': !paginationValue.has_pre}">
                <a class="page-link" href="#" aria-label="Previous" @click.prevent="getPagination((paginationValue.current_page-1))">
                    <span aria-hidden="true">&laquo;</span>
                </a>
            </li>
            <li class="page-item" v-for="page in paginationValue.total_pages" :class="{'active': paginationValue.current_page === page}">
                <a class="page-link" href="#" @click.prevent="getPagination((page))">{{ page }}</a>
            </li>
            <li class="page-item" :class="{'disabled': !paginationValue.has_next}" @click.prevent="getPagination((paginationValue.current_page+1))">
                <a class="page-link" href="#" aria-label="Next">
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
    console.log(page)
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