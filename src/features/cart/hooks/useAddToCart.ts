import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { cartService } from "../cartService";
import { AddToCartPayload } from "../cartType";
export function useAddToCart() { const queryClient = useQueryClient(); return useMutation({ mutationFn: (payload: AddToCartPayload) => cartService.addToCart(payload), onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["cart"] }); toast.success("Product added to cart"); }, onError: () => toast.error("Failed to add product") }); }
