<script setup>
import { useStoreVars } from '@/store/modules/vars';

const codeStore = useStoreCode();
</script>

<template>
  <div>
    <n-card size="small">
      <n-collapse :default-expanded-names="['1']">
        <n-collapse-item title="搜索" name="1">
          <div>
            <n-flex>
              <n-input v-model:value="codeStore.search.keyword" type="text" placeholder="请搜索"
                :style="{ width: '200px' }">
                <template #prefix>
                  <icon-mdi:magnify />
                </template>
              </n-input>
              <n-select v-model:value="codeStore.search.uuid" placeholder="选择应用" :options="codeStore.appsOptions"
                :style="{ width: '200px' }" />
              <n-button strong secondary @click="codeStore.resetSearch">
                <template #icon>
                  <icon-mdi:reload />
                </template>
                重置
              </n-button>
            </n-flex>
          </div>
        </n-collapse-item>
      </n-collapse>
    </n-card>
  </div>
</template>
