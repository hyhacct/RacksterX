<script setup>
import { ref } from 'vue';
import CardSearch from './modules/card-search.vue';
import DataTables from './modules/data-tables.vue';
import DialogCreate from './modules/dialog-create.vue';
import DrawerEditor from './modules/drawer-editor.vue';

const showModelRef = ref(null);
const showDrawerRef = ref(null);

const openDialog = () => {
  showModelRef?.value?.open();
}

const openDrawer = (row) => {
  showDrawerRef?.value?.open(row);
}
</script>

<template>
  <div>
    <div>
      <DialogCreate ref="showModelRef" />
      <DrawerEditor ref="showDrawerRef" />
    </div>
    <div>
      <n-flex vertical>
        <CardSearch />
        <DataTables :openDialog="openDialog" :openDrawer="openDrawer" />
      </n-flex>
    </div>
  </div>
</template>
