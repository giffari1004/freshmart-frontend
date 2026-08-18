import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { addToCart } from "./api";

interface ApiErrorResponse {
  response?: { status?: number; data?: { message?: string } };
}

export function useAddToCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addToCart,
    onSuccess: () => {
      toast.success("Added to cart");
      // "cart" query (badge count di navbar, halaman cart) jadi stale,
      // biar refetch dan angkanya update tanpa perlu reload halaman.
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (error: ApiErrorResponse) => {
      const status = error.response?.status;
      const message = error.response?.data?.message;

      // 403 dari requireVerified middleware -> pesan spesifik, bukan
      // pesan error generik, supaya user tau harus verifikasi email dulu.
      if (status === 403) {
        toast.error(message ?? "Please verify your email to add items to cart");
        return;
      }

      toast.error(message ?? "Failed to add item to cart");
    },
  });
}
