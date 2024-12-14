import { reactive } from 'vue';

const toastState = reactive({
  visible: false,
  message: '',
  color: 'info',
  timeout: 2000,
});

const showToast = ({ message, color = 'info', timeout = 2000 }) => {
  toastState.message = message;
  toastState.color = color;
  toastState.timeout = timeout;
  toastState.visible = true;

  setTimeout(() => {
    toastState.visible = false;
  }, timeout);
};

export const useToast = () => {
  return { toastState, showToast };
};
