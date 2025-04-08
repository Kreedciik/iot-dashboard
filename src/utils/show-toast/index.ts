import { toast } from 'react-toastify';

type ShowToastProps = { message: string };

export const showErrorToast = ({ message }: ShowToastProps) => toast.error(message);
export const showSuccessToast = ({ message }: ShowToastProps) => toast.success(message);
