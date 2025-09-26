"use strict";
const { describe, it } = require("node:test");
const assert = require("node:assert");
const { IReceiptPRO } = require("../lib/index");

describe("Testing of all API methods.", function () {
  const irp = new IReceiptPRO(process.env.IRECEIPTPRO_API_KEY);
  const testTemplateId = "check";
  const testTemplateArgs = { ping: "pong" };
  const testTemplateSize = { width: 100, height: 210 };

  it("createJpgFromPrivateTemplate", async function () {
    const data = await irp.createJpgFromPrivateTemplate(
      testTemplateId,
      testTemplateArgs,
      testTemplateSize
    );
    assert.equal(data instanceof Buffer, true);
    assert.equal(data.includes("JFIF"), true);
  });

  it("createJpgFromPublicTemplate", async function () {
    const data = await irp.createJpgFromPublicTemplate(
      testTemplateId,
      testTemplateArgs,
      testTemplateSize
    );
    assert.equal(data instanceof Buffer, true);
    assert.equal(data.includes("JFIF"), true);
  });

  it("createPdfFromPrivateTemplate", async function () {
    const data = await irp.createPdfFromPrivateTemplate(
      testTemplateId,
      testTemplateArgs,
      testTemplateSize
    );
    assert.equal(data instanceof Buffer, true);
    assert.equal(data.includes("PDF"), true);
  });

  it("createPdfFromPublicTemplate", async function () {
    const data = await irp.createPdfFromPublicTemplate(
      testTemplateId,
      testTemplateArgs,
      testTemplateSize
    );
    assert.equal(data instanceof Buffer, true);
    assert.equal(data.includes("PDF"), true);
  });

  it("createPngFromPrivateTemplate", async function () {
    const data = await irp.createPngFromPrivateTemplate(
      testTemplateId,
      testTemplateArgs,
      testTemplateSize
    );
    assert.equal(data instanceof Buffer, true);
    assert.equal(data.includes("PNG"), true);
  });

  it("createPngFromPublicTemplate", async function () {
    const data = await irp.createPngFromPublicTemplate(
      testTemplateId,
      testTemplateArgs,
      testTemplateSize
    );
    assert.equal(data instanceof Buffer, true);
    assert.equal(data.includes("PNG"), true);
  });

  it("createWebpFromPrivateTemplate", async function () {
    const data = await irp.createWebpFromPrivateTemplate(
      testTemplateId,
      testTemplateArgs,
      testTemplateSize
    );
    assert.equal(data instanceof Buffer, true);
    assert.equal(data.includes("WEBP"), true);
  });

  it("createWebpFromPublicTemplate", async function () {
    const data = await irp.createWebpFromPublicTemplate(
      testTemplateId,
      testTemplateArgs,
      testTemplateSize
    );
    assert.equal(data instanceof Buffer, true);
    assert.equal(data.includes("WEBP"), true);
  });
});
