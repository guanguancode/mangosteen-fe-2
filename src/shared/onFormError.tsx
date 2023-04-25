import { AxiosError } from "axios";
import { ResourceError } from "../env";

export const onFormError = (
  error: AxiosError<ResourceError>,
  fn: (errors: ResourceError) => void
) => {
  if (error.response?.status === 422) {
    fn(error.response.data);
  }
  throw error;
};