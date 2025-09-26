import { describe, it } from "node:test";
import assert from "node:assert";
import { IReceiptPRO } from "../src/index.js";

describe("Testing lib.", function () {
  it("constructor", async function () {
    const key = "test";
    const irp = new IReceiptPRO(key);
    assert.equal(irp instanceof IReceiptPRO, true);
    // @ts-expect-error - accessing private property for test
    assert.equal(irp.apiKey, key);
  });

  it("useApiKey", async function () {
    const key = "test";
    const irp = IReceiptPRO.useApiKey(key);
    assert.equal(irp instanceof IReceiptPRO, true);
    // @ts-expect-error - accessing private property for test
    assert.equal(irp.apiKey, key);
  });
});

describe("Testing of all API methods.", function () {
  const irp = new IReceiptPRO(process.env.IRECEIPTPRO_API_KEY || "");
  const testTemplateId = "check";
  const testTemplateArgs = { ping: "pong" };
  const testTemplateSize = { width: 100, height: 210 };

  it("createJpgFromPrivateTemplate", async function () {
    const data = await irp.createJpgFromPrivateTemplate(
      testTemplateId,
      testTemplateArgs,
      testTemplateSize
    );
    assert.equal(Buffer.isBuffer(data), true);
    assert.equal(data.includes("JFIF"), true);
  });

  it("createJpgFromPublicTemplate", async function () {
    const data = await irp.createJpgFromPublicTemplate(
      testTemplateId,
      testTemplateArgs,
      testTemplateSize
    );
    assert.equal(Buffer.isBuffer(data), true);
    assert.equal(data.includes("JFIF"), true);
  });

  it("createPdfFromPrivateTemplate", async function () {
    const data = await irp.createPdfFromPrivateTemplate(
      testTemplateId,
      testTemplateArgs,
      testTemplateSize
    );
    assert.equal(Buffer.isBuffer(data), true);
    assert.equal(data.includes("PDF"), true);
  });

  it("createPdfFromPublicTemplate", async function () {
    const data = await irp.createPdfFromPublicTemplate(
      testTemplateId,
      testTemplateArgs,
      testTemplateSize
    );
    assert.equal(Buffer.isBuffer(data), true);
    assert.equal(data.includes("PDF"), true);
  });

  it("createPngFromPrivateTemplate", async function () {
    const data = await irp.createPngFromPrivateTemplate(
      testTemplateId,
      testTemplateArgs,
      testTemplateSize
    );
    assert.equal(Buffer.isBuffer(data), true);
    assert.equal(data.includes("PNG"), true);
  });

  it("createPngFromPublicTemplate", async function () {
    const data = await irp.createPngFromPublicTemplate(
      testTemplateId,
      testTemplateArgs,
      testTemplateSize
    );
    assert.equal(Buffer.isBuffer(data), true);
    assert.equal(data.includes("PNG"), true);
  });

  it("createWebpFromPrivateTemplate", async function () {
    const data = await irp.createWebpFromPrivateTemplate(
      testTemplateId,
      testTemplateArgs,
      testTemplateSize
    );
    assert.equal(Buffer.isBuffer(data), true);
    assert.equal(data.includes("WEBP"), true);
  });

  it("createWebpFromPublicTemplate", async function () {
    const data = await irp.createWebpFromPublicTemplate(
      testTemplateId,
      testTemplateArgs,
      testTemplateSize
    );
    assert.equal(Buffer.isBuffer(data), true);
    assert.equal(data.includes("WEBP"), true);
  });
});

describe("Testing errors.", function () {
  const irp = new IReceiptPRO("test");
  const testTemplateId = "check";
  const testTemplateArgs = { ping: "pong" };
  const testTemplateSize = { width: 100, height: 210 };

  it("Token invalid", async function () {
    let error: Error | undefined;
    try {
      await irp.createWebpFromPublicTemplate(
        testTemplateId,
        testTemplateArgs,
        testTemplateSize
      );
    } catch (err) {
      error = err as Error;
    }
    assert.equal(error instanceof Error, true);
    assert.equal(typeof error!.message, "string");
    assert.equal(error!.message, "Token invalid");
  });
});

describe("Testing of all API methods.", function () {
  const irp = new IReceiptPRO(process.env.IRECEIPTPRO_API_KEY || "");
  const testTemplateId = "check";
  const testTemplateArgs = { ping: "pong" };
  const testTemplateSize = { width: 100, height: 210 };

  it("createJpgFromPrivateTemplate", async function () {
    const data = await irp.createJpgFromPrivateTemplate(
      testTemplateId,
      testTemplateArgs,
      testTemplateSize
    );
    assert.equal(Buffer.isBuffer(data), true);
    assert.equal(data.includes("JFIF"), true);
  });

  it("createJpgFromPublicTemplate", async function () {
    const data = await irp.createJpgFromPublicTemplate(
      testTemplateId,
      testTemplateArgs,
      testTemplateSize
    );
    assert.equal(Buffer.isBuffer(data), true);
    assert.equal(data.includes("JFIF"), true);
  });

  it("createPdfFromPrivateTemplate", async function () {
    const data = await irp.createPdfFromPrivateTemplate(
      testTemplateId,
      testTemplateArgs,
      testTemplateSize
    );
    assert.equal(Buffer.isBuffer(data), true);
    assert.equal(data.includes("PDF"), true);
  });

  it("createPdfFromPublicTemplate", async function () {
    const data = await irp.createPdfFromPublicTemplate(
      testTemplateId,
      testTemplateArgs,
      testTemplateSize
    );
    assert.equal(Buffer.isBuffer(data), true);
    assert.equal(data.includes("PDF"), true);
  });

  it("createPngFromPrivateTemplate", async function () {
    const data = await irp.createPngFromPrivateTemplate(
      testTemplateId,
      testTemplateArgs,
      testTemplateSize
    );
    assert.equal(Buffer.isBuffer(data), true);
    assert.equal(data.includes("PNG"), true);
  });

  it("createPngFromPublicTemplate", async function () {
    const data = await irp.createPngFromPublicTemplate(
      testTemplateId,
      testTemplateArgs,
      testTemplateSize
    );
    assert.equal(Buffer.isBuffer(data), true);
    assert.equal(data.includes("PNG"), true);
  });

  it("createWebpFromPrivateTemplate", async function () {
    const data = await irp.createWebpFromPrivateTemplate(
      testTemplateId,
      testTemplateArgs,
      testTemplateSize
    );
    assert.equal(Buffer.isBuffer(data), true);
    assert.equal(data.includes("WEBP"), true);
  });

  it("createWebpFromPublicTemplate", async function () {
    const data = await irp.createWebpFromPublicTemplate(
      testTemplateId,
      testTemplateArgs,
      testTemplateSize
    );
    assert.equal(Buffer.isBuffer(data), true);
    assert.equal(data.includes("WEBP"), true);
  });
});

describe("Testing errors.", function () {
  const irp = new IReceiptPRO("test");
  const testTemplateId = "check";
  const testTemplateArgs = { ping: "pong" };
  const testTemplateSize = { width: 100, height: 210 };

  it("Token invalid", async function () {
    let error: Error | undefined;
    try {
      await irp.createWebpFromPublicTemplate(
        testTemplateId,
        testTemplateArgs,
        testTemplateSize
      );
    } catch (err) {
      error = err as Error;
    }
    assert.equal(error instanceof Error, true);
    assert.equal(typeof error!.message, "string");
    assert.equal(error!.message, "Token invalid");
  });
});
