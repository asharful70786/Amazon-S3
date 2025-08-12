import { ListObjectsV2Command, DeleteObjectsCommand, S3Client } from "@aws-sdk/client-s3";

const client = new S3Client({ profile: "nodejs" });

async function deleteFolder(bucket, prefix) {
  const listCommand = new ListObjectsV2Command({
    Bucket: bucket,
    Prefix: prefix,
  });

  const listedObjects = await client.send(listCommand);

  if (!listedObjects.Contents || listedObjects.Contents.length === 0) {
    console.log("No files found to delete.");
    return;
  }

  const deleteCommand = new DeleteObjectsCommand({
    Bucket: bucket,
    Delete: {
      Objects: listedObjects.Contents.map(obj => ({ Key: obj.Key })),
    },
  });

  const data = await client.send(deleteCommand);
  console.log("Deleted:", data.Deleted);
}

await deleteFolder("bucketusingnodejs", "folder1/");
