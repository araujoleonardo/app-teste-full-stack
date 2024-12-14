import { reactive } from 'vue';

const state = reactive({
  visible: false,
  title: '',
  message: '',
  resolveCallback: null,
});

const open = (options) => {
  state.title = options.title || 'Confirmação';
  state.message = options.message || 'Você tem certeza?';
  state.visible = true;

  return new Promise((resolve) => {
    state.resolveCallback = resolve;
  });
};

const confirm = () => {
  state.visible = false;
  if (state.resolveCallback) state.resolveCallback(true);
};

const cancel = () => {
  state.visible = false;
  if (state.resolveCallback) state.resolveCallback(false);
};

export function useConfirmDialog() {
  return {
    state,
    open,
    confirm,
    cancel,
  };
}
