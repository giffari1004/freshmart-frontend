import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { cartService } from "../cartService";
import { UpdateCartPayload } from "../cartType";
type UpdateInput = { itemId: string; payload: UpdateCartPayload };
export function useUpdateCart() { const queryClient = useQueryClient(); return useMutation({ mutationFn: ({ itemId, payload }: UpdateInput) => cartService.updateCartItem(itemId, payload), onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["cart"] }); toast.success("Cart updated"); }, onError: () => toast.error("Failed to update cart") }); }
