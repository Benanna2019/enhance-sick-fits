import multipart from "lambda-multipart-parser";
import crypto from "crypto";
import data from "@begin/data";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
const env = process.env.ARC_ENV;
const isLocal = env === "testing";
const staticDir = process.env.ARC_STATIC_BUCKET;
const imageFolder = ".uploaded-images";
const REGION = process.env.AWS_REGION;
// import { html } from "../../lib/html-helper.mjs";
// import { resize } from "./resize-image.mjs"
import gm from "gm";

function getImageBuffer(productPicture) {
  return new Promise((resolve, reject) => {
    gm(productPicture).toBuffer("JPEG", (err, buffer) => {
      if (err) {
        console.log("error", err);
        reject(err);
      } else {
        console.log("created new image buffer", buffer);
        resolve(buffer);
      }
    });
  });
}

export let post = [uploadImage];

async function uploadImage(req) {
  const parsedForm = await multipart.parse({
    ...req,
    body: req.rawBody.base64,
  });

  console.log("parsedForm", parsedForm);

  // Get uploaded image

  const unprocessed = parsedForm.files?.find(
    (file) => file.fieldname === "productImage"
  );

  console.log("unprocessed", unprocessed);
  const productPicture = unprocessed.content;

  const convertImageBuffer = await getImageBuffer(productPicture)
    .then((buffer) => {
      const newImageBuffer = buffer;
      return newImageBuffer;
    })
    .catch((err) => {
      // Handle potential errors
      console.error(err);
    });

  const filename = crypto.randomUUID();
  // Save the image to S3 bucket (or temp folder for local dev)
  if (isLocal) {
    const { writeFileSync, mkdirSync } = await import("fs");
    const { join } = await import("path");
    const { default: url } = await import("url");
    const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
    const imageDir = join(__dirname, "..", "..", "..", imageFolder);
    try {
      mkdirSync(imageDir);
    } catch (e) {}
    writeFileSync(join(imageDir, filename + ".jpg"), convertImageBuffer);
  } else {
    const client = new S3Client({ region: REGION });
    const command = new PutObjectCommand({
      Bucket: staticDir,
      Key: `${imageFolder}/${filename}.jpg`,
      Body: convertImageBuffer,
    });
    await client.send(command);
  }

  let processedImageHTML = `
    <div id="processedImageDiv">
      <img
        src="/image/${filename}.jpg"
        alt="product picture"
        class="uploadedImage"
      />
      <input
        type="hidden"
        name="productImage"
        id="uploadedProductImageUrl"
        value="${filename}"
      />
    </div>
  `;

  return {
    html: processedImageHTML,
  };
}
