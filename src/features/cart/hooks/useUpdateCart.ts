import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";
import { cartService } from "../cartService";
import {
  CartResponse,
  UpdateCartPayload,
} from "../cartType";

type UpdateInput = {
  itemId: string;
  payload: UpdateCartPayload;
};

type MutationContext = {
  previous?: CartResponse;
};

export function useUpdateCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["cart-update"],
    scope: {
      id: "cart-update",
    },
    mutationFn: updateCartItem,
    onMutate: (input) =>
      updateOptimisticCart(queryClient, input),
    onError: (_, __, context) =>
      rollbackCart(queryClient, context),
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
    },
  });
}

function updateCartItem({
  itemId,
  payload,
}: UpdateInput) {
  return cartService.updateCartItem(itemId, payload);
}

async function updateOptimisticCart(
  queryClient: ReturnType<typeof useQueryClient>,
  { itemId, payload }: UpdateInput,
): Promise<MutationContext> {
  await queryClient.cancelQueries({
    queryKey: ["cart"],
  });

  const previous =
    queryClient.getQueryData<CartResponse>(["cart"]);

  if (previous) {
    queryClient.setQueryData<CartResponse>(
      ["cart"],
      updateCartData(
        previous,
        itemId,
        payload.quantity,
      ),
    );
  }

  return { previous };
}

function updateCartData(
  cart: CartResponse,
  itemId: string,
  quantity: number,
): CartResponse {
  const items = cart.items.map((item) =>
    item.id === itemId
      ? {
          ...item,
          quantity,
          subtotal: item.unitPrice * quantity,
        }
      : item,
  );

  return {
    ...cart,
    items,
    totalItems: getTotalItems(items),
    subtotal: getSubtotal(items),
  };
}

function getTotalItems(
  items: CartResponse["items"],
) {
  return items.reduce(
    (total, item) => total + item.quantity,
    0,
  );
}

function getSubtotal(
  items: CartResponse["items"],
) {
  return items.reduce(
    (total, item) => total + item.subtotal,
    0,
  );
}

function rollbackCart(
  queryClient: ReturnType<typeof useQueryClient>,
  context?: MutationContext,
) {
  if (context?.previous) {
    queryClient.setQueryData(
      ["cart"],
      context.previous,
    );
  }

  toast.error("Failed to update cart");
}