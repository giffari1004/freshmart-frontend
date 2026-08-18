import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { cartService } from "../cartService";
export function useRemoveCart() { const queryClient = useQueryClient(); return useMutation({ mutationFn: cartService.removeCartItem, onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["cart"] }); toast.success("Item removed"); }, onError: () => toast.error("Failed to remove item") }); }
