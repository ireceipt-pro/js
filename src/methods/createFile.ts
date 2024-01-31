import axios from "axios";
import { apiUrl } from "../utils/constants";
import { handleError } from "../utils/handleError";

export const createFile = async (
  apiKey: string,
  type: "jpg" | "png" | "webp" | "pdf",
  templateType: "public" | "private",
  templateId: string,
  args: { [key: string]: unknown },
  size?: { width: number; height: number }
): Promise<ArrayBuffer> => {
  let attempt = 5;
  let buffer: ArrayBuffer | undefined;
  let error: Error | undefined;
  while (attempt > 0 && !buffer) {
    attempt--;
    try {
      const res = await axios.post(
        `${apiUrl}${type}/${templateType}/${templateId}`,
        {
          variables: args || {},
          size,
        },
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "User-Agent": "IReceipt PRO JS Library",
          },
          responseType: "arraybuffer",
        }
      );
      if (res.status === 201) {
        buffer = res.data;
      } else {
        error = new Error(res.data);
      }
    } catch (err: any) {
      error = handleError(err);
    }
  }
  if (!buffer) throw error;
  return buffer;
};
