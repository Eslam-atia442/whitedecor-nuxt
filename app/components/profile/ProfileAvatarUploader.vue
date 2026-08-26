<template>
  <input
    ref="fileInputRef"
    type="file"
    accept="image/*"
    class="hidden"
    @change="handleFileChange"
  >
</template>

<script setup lang="ts">
import { toast } from 'vue-sonner';

const emit = defineEmits<{
  'avatar-selected': [file: File, previewUrl: string];
}>();

const { t } = useI18n();
const fileInputRef = ref<HTMLInputElement | null>(null);

const trigger = () => {
  fileInputRef.value?.click();
};

const handleFileChange = (e: Event) => {
  const target = e.target as HTMLInputElement;
  const file = target.files?.[0];
  if (!file) return;

  const sizeInMB = file.size / (1024 * 1024);
  if (sizeInMB > 2) {
    toast.error(t('image_too_large'));
    if (fileInputRef.value) fileInputRef.value.value = '';
    return;
  }

  const previewUrl = URL.createObjectURL(file);
  emit('avatar-selected', file, previewUrl);
};

defineExpose({ trigger });
</script>
