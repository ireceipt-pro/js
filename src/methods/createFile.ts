import axios from "axios";
import { apiUrl } from "../utils/constants.js";
import { handleError } from "../utils/handleError.js";

const maxAttempts = 5;

/**
 * Retry only on failures that a later attempt could plausibly resolve:
 * transport errors (no response at all), server faults, and the two
 * 4xx codes that explicitly invite a retry.
 */
const isRetryable = (status?: number) => {
  if (typeof status !== "number") return true;
  if (status === 408 || status === 429) return true;
  return status >= 500;
};

export const createFile = async (
  apiKey: string,
  type: "jpg" | "png" | "webp" | "pdf",
  templateType: "public" | "private",
  templateId: string,
  args: { [key: string]: unknown },
  size?: { width: number; height: number }
): Promise<Buffer> => {
  let buffer: Buffer | undefined;
  let error: Error | undefined;
  for (let attempt = 1; attempt <= maxAttempts && !buffer; attempt += 1) {
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
        break;
      }
      error = new Error(res.data);
    } catch (err: any) {
      error = handleError(err);
      // A rejected request (bad key, unknown template, invalid variables)
      // fails the same way every time — surface it instead of retrying.
      if (!isRetryable(err?.response?.status)) throw error;
    }
    // No point sleeping after the final attempt.
    if (attempt < maxAttempts)
      await new Promise((res) => {
        setTimeout(res, (attempt + 1) * 1000);
      });
  }
  if (!buffer) throw error;
  return buffer;
};
