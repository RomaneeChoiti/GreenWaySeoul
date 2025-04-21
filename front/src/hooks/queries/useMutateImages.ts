import { useMutation } from "@tanstack/react-query";
import { UseMutationCustomOptions } from "./common";
import { uploadImages } from "@/api/image";

function useMutateImages(mutationOptions?: UseMutationCustomOptions) {


  return useMutation({
    mutationFn: uploadImages,
    ...mutationOptions,
  });
}
export default useMutateImages;