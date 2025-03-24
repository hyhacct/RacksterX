<script setup>
import { ref } from 'vue';
import CardSearch from './modules/card-search.vue';
import DataTables from './modules/data-tables.vue';
import DialogCreateOrUpdate from './modules/dialog-createOrUpdate.vue';

const showModelRef = ref(null);

const openDialog = (row) => {
  showModelRef?.value?.open(row);
}
</script>

<template>
  <div>
    <div>
      <DialogCreateOrUpdate ref="showModelRef" />
    </div>
    <div>
      <n-flex vertical>
        <CardSearch />
        <DataTables :openDialog="openDialog" />
      </n-flex>
    </div>
  </div>
</template>
