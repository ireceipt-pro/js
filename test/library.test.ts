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
    assert.equal(data instanceof ArrayBuffer, true);
    const uint8Array = new Uint8Array(data);
    assert.equal(uint8Array.includes(0x4a), true); // Check for 'J' from JFIF
    assert.equal(uint8Array.includes(0x46), true); // Check for 'F' from JFIF
    assert.equal(uint8Array.includes(0x49), true); // Check for 'I' from JFIF
    assert.equal(uint8Array.includes(0x46), true); // Check for 'F' from JFIF
  });

  it("createJpgFromPublicTemplate", async function () {
    const data = await irp.createJpgFromPublicTemplate(
      testTemplateId,
      testTemplateArgs,
      testTemplateSize
    );
    assert.equal(data instanceof ArrayBuffer, true);
    const uint8Array = new Uint8Array(data);
    assert.equal(uint8Array.includes(0x4a), true); // Check for 'J' from JFIF
    assert.equal(uint8Array.includes(0x46), true); // Check for 'F' from JFIF
    assert.equal(uint8Array.includes(0x49), true); // Check for 'I' from JFIF
    assert.equal(uint8Array.includes(0x46), true); // Check for 'F' from JFIF
  });

  it("createPdfFromPrivateTemplate", async function () {
    const data = await irp.createPdfFromPrivateTemplate(
      testTemplateId,
      testTemplateArgs,
      testTemplateSize
    );
    assert.equal(data instanceof ArrayBuffer, true);
    const uint8Array = new Uint8Array(data);
    assert.equal(uint8Array.includes(0x50), true); // Check for 'P' from PDF
    assert.equal(uint8Array.includes(0x44), true); // Check for 'D' from PDF
    assert.equal(uint8Array.includes(0x46), true); // Check for 'F' from PDF
  });

  it("createPdfFromPublicTemplate", async function () {
    const data = await irp.createPdfFromPublicTemplate(
      testTemplateId,
      testTemplateArgs,
      testTemplateSize
    );
    assert.equal(data instanceof ArrayBuffer, true);
    const uint8Array = new Uint8Array(data);
    assert.equal(uint8Array.includes(0x50), true); // Check for 'P' from PDF
    assert.equal(uint8Array.includes(0x44), true); // Check for 'D' from PDF
    assert.equal(uint8Array.includes(0x46), true); // Check for 'F' from PDF
  });

  it("createPngFromPrivateTemplate", async function () {
    const data = await irp.createPngFromPrivateTemplate(
      testTemplateId,
      testTemplateArgs,
      testTemplateSize
    );
    assert.equal(data instanceof ArrayBuffer, true);
    const uint8Array = new Uint8Array(data);
    assert.equal(uint8Array.includes(0x50), true); // Check for 'P' from PNG
    assert.equal(uint8Array.includes(0x4e), true); // Check for 'N' from PNG
    assert.equal(uint8Array.includes(0x47), true); // Check for 'G' from PNG
  });

  it("createPngFromPublicTemplate", async function () {
    const data = await irp.createPngFromPublicTemplate(
      testTemplateId,
      testTemplateArgs,
      testTemplateSize
    );
    assert.equal(data instanceof ArrayBuffer, true);
    const uint8Array = new Uint8Array(data);
    assert.equal(uint8Array.includes(0x50), true); // Check for 'P' from PNG
    assert.equal(uint8Array.includes(0x4e), true); // Check for 'N' from PNG
    assert.equal(uint8Array.includes(0x47), true); // Check for 'G' from PNG
  });

  it("createWebpFromPrivateTemplate", async function () {
    const data = await irp.createWebpFromPrivateTemplate(
      testTemplateId,
      testTemplateArgs,
      testTemplateSize
    );
    assert.equal(data instanceof ArrayBuffer, true);
    const uint8Array = new Uint8Array(data);
    assert.equal(uint8Array.includes(0x57), true); // Check for 'W' from WEBP
    assert.equal(uint8Array.includes(0x45), true); // Check for 'E' from WEBP
    assert.equal(uint8Array.includes(0x42), true); // Check for 'B' from WEBP
    assert.equal(uint8Array.includes(0x50), true); // Check for 'P' from WEBP
  });

  it("createWebpFromPublicTemplate", async function () {
    const data = await irp.createWebpFromPublicTemplate(
      testTemplateId,
      testTemplateArgs,
      testTemplateSize
    );
    assert.equal(data instanceof ArrayBuffer, true);
    const uint8Array = new Uint8Array(data);
    assert.equal(uint8Array.includes(0x57), true); // Check for 'W' from WEBP
    assert.equal(uint8Array.includes(0x45), true); // Check for 'E' from WEBP
    assert.equal(uint8Array.includes(0x42), true); // Check for 'B' from WEBP
    assert.equal(uint8Array.includes(0x50), true); // Check for 'P' from WEBP
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
