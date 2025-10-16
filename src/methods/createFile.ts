import axios from "axios";
import { apiUrl } from "../utils/constants.js";
import { handleError } from "../utils/handleError.js";

export const createFile = async (
  apiKey: string,
  type: "jpg" | "png" | "webp" | "pdf",
  templateType: "public" | "private",
  templateId: string,
  args: { [key: string]: unknown },
  size?: { width: number; height: number }
): Promise<Buffer> => {
  let attempt = 1;
  let buffer: Buffer | undefined;
  let error: Error | undefined;
  while (attempt <= 5 && !buffer) {
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
    attempt += 1;
    if (!buffer)
      await new Promise((res) => {
        setTimeout(res, attempt * 1000);
      });
  }
  if (!buffer) throw error;
  return buffer;
};
