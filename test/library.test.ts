import { describe, it } from "node:test";
import assert from "node:assert";
import { IReceiptPRO } from "../src/index.js";

describe("Testing IReceiptPRO library", function () {
  it("should create instance with constructor", async function () {
    const key = "test-api-key";
    const irp = new IReceiptPRO(key);
    assert.equal(irp instanceof IReceiptPRO, true);
    // @ts-expect-error - accessing private property for test
    assert.equal(irp.apiKey, key);
  });

  it("should create instance with static method", async function () {
    const key = "test-api-key";
    const irp = IReceiptPRO.useApiKey(key);
    assert.equal(irp instanceof IReceiptPRO, true);
    // @ts-expect-error - accessing private property for test
    assert.equal(irp.apiKey, key);
  });

  it("should have all expected methods", async function () {
    const irp = new IReceiptPRO("test");
    
    // Check all public methods exist
    const methods = [
      "createJpgFromPublicTemplate",
      "createPdfFromPublicTemplate", 
      "createPngFromPublicTemplate",
      "createWebpFromPublicTemplate",
      "createJpgFromPrivateTemplate",
      "createPdfFromPrivateTemplate",
      "createPngFromPrivateTemplate",
      "createWebpFromPrivateTemplate"
    ];

    methods.forEach(method => {
      assert.equal(typeof irp[method as keyof IReceiptPRO], "function");
    });
  });

  it("should throw error when apiKey is empty", async function () {
    const irp = new IReceiptPRO("");
    
    try {
      await irp.createPdfFromPublicTemplate("test", {});
      assert.fail("Should have thrown an error");
    } catch (error) {
      assert.equal((error as Error).message, "Initialization is required before use");
    }
  });
});