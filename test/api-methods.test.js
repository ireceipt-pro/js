"use strict";
require("mocha");
const { IReceiptPRO } = require("../lib/index");

describe("Testing of all API methods.", function () {
  const irp = new IReceiptPRO(process.env.IRECEIPTPRO_API_KEY);
  const testTemplateId = "check";
  const testTemplateArgs = { ping: "pong" };
  const testTemplateSize = { width: 100, height: 210 };

  this.timeout(60000);

  it("createJpgFromPrivateTemplate", async function () {
    const data = await irp.createJpgFromPrivateTemplate(
      testTemplateId,
      testTemplateArgs,
      testTemplateSize
    );
    expect(data).to.be.instanceof(Buffer);
    expect(data.includes("JFIF")).to.be.true;
  });

  it("createJpgFromPublicTemplate", async function () {
    const data = await irp.createJpgFromPublicTemplate(
      testTemplateId,
      testTemplateArgs,
      testTemplateSize
    );
    expect(data).to.be.instanceof(Buffer);
    expect(data.includes("JFIF")).to.be.true;
  });

  it("createPdfFromPrivateTemplate", async function () {
    const data = await irp.createPdfFromPrivateTemplate(
      testTemplateId,
      testTemplateArgs,
      testTemplateSize
    );
    expect(data).to.be.instanceof(Buffer);
    expect(data.includes("PDF")).to.be.true;
  });

  it("createPdfFromPublicTemplate", async function () {
    const data = await irp.createPdfFromPublicTemplate(
      testTemplateId,
      testTemplateArgs,
      testTemplateSize
    );
    expect(data).to.be.instanceof(Buffer);
    expect(data.includes("PDF")).to.be.true;
  });

  it("createPngFromPrivateTemplate", async function () {
    const data = await irp.createPngFromPrivateTemplate(
      testTemplateId,
      testTemplateArgs,
      testTemplateSize
    );
    expect(data).to.be.instanceof(Buffer);
    expect(data.includes("PNG")).to.be.true;
  });

  it("createPngFromPublicTemplate", async function () {
    const data = await irp.createPngFromPublicTemplate(
      testTemplateId,
      testTemplateArgs,
      testTemplateSize
    );
    expect(data).to.be.instanceof(Buffer);
    expect(data.includes("PNG")).to.be.true;
  });

  it("createWebpFromPrivateTemplate", async function () {
    const data = await irp.createWebpFromPrivateTemplate(
      testTemplateId,
      testTemplateArgs,
      testTemplateSize
    );
    expect(data).to.be.instanceof(Buffer);
    expect(data.includes("WEBP")).to.be.true;
  });

  it("createWebpFromPublicTemplate", async function () {
    const data = await irp.createWebpFromPublicTemplate(
      testTemplateId,
      testTemplateArgs,
      testTemplateSize
    );
    expect(data).to.be.instanceof(Buffer);
    expect(data.includes("WEBP")).to.be.true;
  });
});
