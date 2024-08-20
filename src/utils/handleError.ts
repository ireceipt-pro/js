import { AxiosError } from "axios";

export const handleError = (err: AxiosError | Error | any) => {
  if (err instanceof AxiosError) {
    try {
      const respText = err.response?.data?.toString();
      const respJSON = respText
        ? (JSON.parse(respText) as { message: string })
        : { message: `Unknown error with status code ${err.code}` };
      return new Error(respJSON.message);
    } catch {
      return new Error(`Unknown error with status code ${err.code}`);
    }
  }
  if (err instanceof Error) return err;
  return new Error(
    err?.message || `Unknown error with status code ${err?.code}`
  );
};
