"use strict";
const { describe, it } = require("node:test");
const assert = require("node:assert");
const { IReceiptPRO } = require("../dist/cjs/index");

describe("Testing errors.", function () {
  const irp = new IReceiptPRO("test");
  const testTemplateId = "check";
  const testTemplateArgs = { ping: "pong" };
  const testTemplateSize = { width: 100, height: 210 };

  it("Token invalid", async function () {
    let error;
    try {
      await irp.createWebpFromPublicTemplate(
        testTemplateId,
        testTemplateArgs,
        testTemplateSize
      );
    } catch (err) {
      error = err;
    }
    assert.equal(error instanceof Error, true);
    assert.equal(typeof error.message, "string");
    assert.equal(error.message, "Token invalid");
  });
});
