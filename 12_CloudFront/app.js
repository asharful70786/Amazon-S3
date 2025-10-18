import { CloudFrontClient, CreateInvalidationCommand, ListDistributionsCommand} from "@aws-sdk/client-cloudfront";

const client = new CloudFrontClient({ profile: "nodejs" });

const command = new CreateInvalidationCommand({
  DistributionId: "E1KSIRWX9M42K6",
  InvalidationBatch: {
    CallerReference: "bitto", // anything for create on Invalidation 
    Paths: {
      Quantity: 1,
      Items: ["/aadhar_Back.jpg"],
    },
  }
});


try {
  const response = await client.send(command);
console.log(response);
} catch (error) {
console.log(error.message)
}