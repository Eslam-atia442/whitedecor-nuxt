<template>
  <Teleport to="body">
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-navy/60 backdrop-blur-sm" @click="$emit('close')" />

      <div class="relative w-full max-w-lg rounded-3xl border border-mist bg-card p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        <div class="mb-4 flex items-center justify-between border-b border-mist pb-3">
          <h3 class="text-base font-bold text-ink">{{ editingAddress ? $t('edit_address') : $t('add_new_address') }}</h3>
          <button type="button" class="flex size-7 items-center justify-center rounded-lg text-ink-muted hover:bg-surface" @click="$emit('close')">
            <span class="material-symbols-rounded text-lg">close</span>
          </button>
        </div>

        <form class="space-y-3.5" @submit.prevent="handleSave">
          <UiInput v-model="form.title" :label="$t('address_title_label')" placeholder="المنزل / المكتب" required />
          <UiInput v-model="form.name" :label="$t('address_recipient_name')" :placeholder="$t('name')" required />
          <UiInput v-model="form.phone" :label="$t('address_phone_number')" :placeholder="$t('phone')" required />
          <UiInput v-model="form.city" :label="$t('address_city')" placeholder="القاهرة / الجيزة" required />
          <UiInput v-model="form.address" :label="$t('address_details_label')" placeholder="الشارع، رقم العمارة، الشقة" required />

          <UiCheckbox v-model="form.is_default" :label="$t('set_as_default_address')" />

          <div class="flex justify-end gap-2 pt-2">
            <UiButton type="button" variant="outline" size="sm" @click="$emit('close')">{{ $t('cancel') }}</UiButton>
            <UiButton type="submit" variant="primary" size="sm">{{ $t('save') }}</UiButton>
          </div>
        </form>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import type { AddressDto } from '~/types/profile';

const props = defineProps<{
  editingAddress?: AddressDto | null;
}>();

const emit = defineEmits<{
  'close': [];
}>();

const authStore = useAuthStore();
const addressStore = useAddressStore();

const form = reactive({
  title: props.editingAddress?.title || '',
  name: props.editingAddress?.name || authStore.userName || '',
  phone: props.editingAddress?.phone || authStore.userPhone || '',
  city: props.editingAddress?.city || '',
  address: props.editingAddress?.address || '',
  is_default: props.editingAddress?.is_default || false,
});

const handleSave = () => {
  if (props.editingAddress) {
    addressStore.updateAddress(props.editingAddress.id, form);
  } else {
    addressStore.addAddress(form);
  }
  emit('close');
};
</script>
