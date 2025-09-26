import { describe, it } from "node:test";
import assert from "node:assert";
import { IReceiptPRO } from "../dist/esm/index.js";

describe("Testing ESM import.", function () {
  it("ESM constructor", async function () {
    const key = "test";
    const irp = new IReceiptPRO(key);
    assert.equal(irp instanceof IReceiptPRO, true);
    assert.equal(irp.apiKey, key);
  });

  it("ESM useApiKey", async function () {
    const key = "test";
    const irp = IReceiptPRO.useApiKey(key);
    assert.equal(irp instanceof IReceiptPRO, true);
    assert.equal(irp.apiKey, key);
  });
});
