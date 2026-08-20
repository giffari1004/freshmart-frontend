import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getBogoOutput, createBogoOutput, updateBogoOutput } from "./schema";
import { createBogo, deleteBogo, fetchBogos, updateBogo } from "./bogo-api";
import { toast } from "sonner";
import { AxiosError } from "axios";

export function useGetAllBogo(query: getBogoOutput) {
  return useQuery({
    queryKey: ["bogo", query],
    queryFn: () => fetchBogos(query),
  });
}
export function useCreateBogo() {
  const mutate = useQueryClient();
  return useMutation({
    mutationFn: createBogo,
    onSuccess: () => {
      toast.success("Created BOGO successfully");
      mutate.invalidateQueries({ queryKey: ["bogo"] });
    },
    onError: (err: AxiosError<{ message: string }>) => {
      toast.error(err.response?.data.message || "Created BOGO unsuccessfully");
    },
  });
}
export function useUpdateBogo() {
  const mutate = useQueryClient();
  return useMutation({
    mutationFn: ({ id, body }: { id: string; body: updateBogoOutput }) => updateBogo(body, id),
    onSuccess: () => {
      toast.success("Update BOGO successfully");
      mutate.invalidateQueries({ queryKey: ["bogo"] });
    },
    onError: (err: AxiosError<{ message: string }>) => {
      toast.error(err.response?.data.message || "Update BOGO unsuccessfully");
    },
  });
}
export function useDeleteBogo() {
  const mutate = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteBogo(id),
    onSuccess: () => {
      toast.success("Delete BOGO successfully");
      mutate.invalidateQueries({ queryKey: ["bogo"] });
    },
    onError: (err: AxiosError<{ message: string }>) => {
      toast.error(err.response?.data.message || "Unsuccessfully delete BOGO");
    },
  });
}