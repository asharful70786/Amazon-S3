import express from "express";

import { getSignedUrl } from "@aws-sdk/cloudfront-signer"; // ESM
import { readFile } from "fs/promises";



const url = "http://d6bp7k8ckoxwn.cloudfront.net/Rehabana-logo.webp";
const privateKey =await  readFile("./private_key.pem", "utf-8");

const keyPairId = "K176HUBFCYBM2V";
const dateLessThan = "2025-11-23"; 

const signedUrl = getSignedUrl({
  url,
  keyPairId,
  dateLessThan,
  privateKey,
});

console.log(signedUrl)