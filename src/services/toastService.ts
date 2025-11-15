import toast from "react-hot-toast";

export default function showToastError(message: string) {
  toast.error(message);
}
