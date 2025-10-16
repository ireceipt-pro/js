import { createFile } from "./methods/index.js";

export class IReceiptPRO {
  /**
   *
   * @param apiKey - IReceipt PRO API KEY, you can get it on <https://dashboard.ireceipt.pro>
   */
  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  private apiKey: string;

  /**
   *
   * @param apiKey - IReceipt PRO API KEY, you can get it on <https://dashboard.ireceipt.pro>
   * @returns
   */
  public static useApiKey(apiKey: string) {
    return new IReceiptPRO(apiKey);
  }

  /**
   * Create JPG Image from public template
   *
   * @param templateId - template id, you can find it on <https://dashboard.ireceipt.pro>
   * @param args - arguments for substitution in the template
   * @param size - the size of the file being created
   * @returns
   */
  public createJpgFromPublicTemplate(
    templateId: string,
    args: { [key: string]: unknown },
    size?: { width: number; height: number }
  ) {
    if (!this.apiKey) throw new Error("Initialization is required before use");
    return createFile(this.apiKey, "jpg", "public", templateId, args, size);
  }

  /**
   * Create PDF File from public template
   *
   * @param templateId - template id, you can find it on <https://dashboard.ireceipt.pro>
   * @param args - arguments for substitution in the template
   * @param size - the size of the file being created
   * @returns
   */
  public createPdfFromPublicTemplate(
    templateId: string,
    args: { [key: string]: unknown },
    size?: { width: number; height: number }
  ) {
    if (!this.apiKey) throw new Error("Initialization is required before use");
    return createFile(this.apiKey, "pdf", "public", templateId, args, size);
  }

  /**
   * Create PNG Image from public template
   *
   * @param templateId - template id, you can find it on <https://dashboard.ireceipt.pro>
   * @param args - arguments for substitution in the template
   * @param size - the size of the file being created
   * @returns
   */
  public createPngFromPublicTemplate(
    templateId: string,
    args: { [key: string]: unknown },
    size?: { width: number; height: number }
  ) {
    if (!this.apiKey) throw new Error("Initialization is required before use");
    return createFile(this.apiKey, "png", "public", templateId, args, size);
  }

  /**
   * Create WEBP Image from public template
   *
   * @param templateId - template id, you can find it on <https://dashboard.ireceipt.pro>
   * @param args - arguments for substitution in the template
   * @param size - the size of the file being created
   * @returns
   */
  public createWebpFromPublicTemplate(
    templateId: string,
    args: { [key: string]: unknown },
    size?: { width: number; height: number }
  ) {
    if (!this.apiKey) throw new Error("Initialization is required before use");
    return createFile(this.apiKey, "webp", "public", templateId, args, size);
  }

  /**
   * Create JPG Image from private template,
   * you can manage it on <https://dashboard.ireceipt.pro>
   *
   * @param templateId - template id, you can find it on <https://dashboard.ireceipt.pro>
   * @param args - arguments for substitution in the template
   * @param size - the size of the file being created
   * @returns
   */
  public createJpgFromPrivateTemplate(
    templateId: string,
    args: { [key: string]: unknown },
    size?: { width: number; height: number }
  ) {
    if (!this.apiKey) throw new Error("Initialization is required before use");
    return createFile(this.apiKey, "jpg", "private", templateId, args, size);
  }

  /**
   * Create PDF File from private template,
   * you can manage it on <https://dashboard.ireceipt.pro>
   *
   * @param templateId - template id, you can find it on <https://dashboard.ireceipt.pro>
   * @param args - arguments for substitution in the template
   * @param size - the size of the file being created
   * @returns
   */
  public createPdfFromPrivateTemplate(
    templateId: string,
    args: { [key: string]: unknown },
    size?: { width: number; height: number }
  ) {
    if (!this.apiKey) throw new Error("Initialization is required before use");
    return createFile(this.apiKey, "pdf", "private", templateId, args, size);
  }

  /**
   * Create PNG Image from private template,
   * you can manage it on <https://dashboard.ireceipt.pro>
   *
   * @param templateId - template id, you can find it on <https://dashboard.ireceipt.pro>
   * @param args - arguments for substitution in the template
   * @param size - the size of the file being created
   * @returns
   */
  public createPngFromPrivateTemplate(
    templateId: string,
    args: { [key: string]: unknown },
    size?: { width: number; height: number }
  ) {
    if (!this.apiKey) throw new Error("Initialization is required before use");
    return createFile(this.apiKey, "png", "private", templateId, args, size);
  }

  /**
   * Create WEBP Image from private template,
   * you can manage it on <https://dashboard.ireceipt.pro>
   *
   * @param templateId - template id, you can find it on <https://dashboard.ireceipt.pro>
   * @param args - arguments for substitution in the template
   * @param size - the size of the file being created
   * @returns
   */
  public createWebpFromPrivateTemplate(
    templateId: string,
    args: { [key: string]: unknown },
    size?: { width: number; height: number }
  ) {
    if (!this.apiKey) throw new Error("Initialization is required before use");
    return createFile(this.apiKey, "webp", "private", templateId, args, size);
  }
}
