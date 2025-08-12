import { S3Client } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import { createReadStream } from "fs";

const s3Client = new S3Client({
  profile: "nodejs",
});

const fileReadStream = createReadStream(
  "C:\\Users\\ashraful7076\\OneDrive\\Desktop\\CapCut.lnk"
);

const upload = new Upload({
  client: s3Client,
  params: {
    Bucket: "bucketusingnodejs",
    Key: "folder/CapCut.lnk",
    Body: fileReadStream,
    ContentType: "application/octet-stream",
  },
});

upload.on("httpUploadProgress", (progress) => {
  process.stdout.write(
    `\r${((progress.loaded / progress.total) * 100).toFixed(2)}% Uploaded`
  );
});

const response = await upload.done();

console.log(response);
