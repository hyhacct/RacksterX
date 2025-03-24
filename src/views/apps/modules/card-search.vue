<script setup>
import { useStoreApps } from '@/store/modules/apps';

const appsStore = useStoreApps();
</script>

<template>
  <div>
    <n-card size="small">
      <n-collapse :default-expanded-names="['1']">
        <n-collapse-item title="搜索" name="1">
          <div>
            <n-flex>
              <n-input v-model:value="appsStore.searchKey" type="text" placeholder="请搜索" :style="{ width: '200px' }">
                <template #prefix>
                  <icon-mdi:magnify />
                </template>
              </n-input>
              <n-button strong secondary @click="appsStore.resetSearch">
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
