````md

## 🔹 1. ✅ Get Public Access Block Configuration

```bash
aws s3api get-public-access-block --bucket your-bucket-name
````

> 📌 Shows the current public access block settings (if any).

---

## 🔹 2. 🗑️ Delete Public Access Block Configuration (Unblock All)

```bash
aws s3api delete-public-access-block --bucket your-bucket-name
```

> ❗ Removes the public access block configuration. Useful if you plan to allow public policies (e.g., for static website hosting).

---

## 🔹 3. 🔐 Put Public Access Block Configuration

### ✅ Recommended: Block Public Access (For Private Buckets)

```bash
aws s3api put-public-access-block \
  --bucket your-bucket-name \
  --public-access-block-configuration '{
    "BlockPublicAcls": true,
    "IgnorePublicAcls": true,
    "BlockPublicPolicy": true,
    "RestrictPublicBuckets": true
  }'
```

### 🔓 Allow Public Access (For Public Buckets / Website Hosting)

```bash
aws s3api put-public-access-block \
  --bucket your-bucket-name \
  --public-access-block-configuration '{
    "BlockPublicAcls": false,
    "IgnorePublicAcls": false,
    "BlockPublicPolicy": false,
    "RestrictPublicBuckets": false
  }'
```

---

## 🔹 4. ✅ Get Bucket Policy

```bash
aws s3api get-bucket-policy --bucket your-bucket-name
```

> 📌 Retrieves the current bucket policy (if one is applied).

---

## 🔹 5. ✅ Put (Set/Update) Bucket Policy

### 📁 Prepare a file `bucket-policy.json`:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::your-bucket-name/*"
    }
  ]
}
```

### 🔧 Apply the policy:

```bash
aws s3api put-bucket-policy \
  --bucket your-bucket-name \
  --policy file://bucket-policy.json
```

> ⚠️ Make sure public access blocks are removed if you're allowing public access.

---

## 🔹 6. 🗑️ Delete Bucket Policy

```bash
aws s3api delete-bucket-policy --bucket your-bucket-name
```

> ❌ Removes the current bucket policy, falling back to IAM-only access controls.

---

## ✅ Tips

* 🛑 **Avoid public access in production** unless you're hosting a static site.
* 🧪 Test your policies with IAM users before applying to production.
* 📜 Use `arn:aws:s3:::bucket-name/*` to refer to all objects in the bucket.
* 🔐 Always follow the principle of least privilege.

---

## 📌 Example: Grant Access to Specific IAM User

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::ACCOUNT-ID:user/USERNAME"
      },
      "Action": "s3:*",
      "Resource": [
        "arn:aws:s3:::your-bucket-name",
        "arn:aws:s3:::your-bucket-name/*"
      ]
    }
  ]
}
```

---

> ✅ Replace `your-bucket-name`, `ACCOUNT-ID`, and `USERNAME` with real values before applying.

```

---


