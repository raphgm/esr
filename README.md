# ESTARR APP

ESTARR is a comprehensive platform for managing apprenticeships, gigs, and professional growth.

## Core Features
- **Apprenticeship Management**: Track gigs, skills, and progress.
- **Syncing & OAuth**: Synchronize with GitHub and LinkedIn.
- **Video Content**: Upload and manage video mini-vlogs (Powered by AWS).

## Setup Guides
- [Mobile & AWS Guide](./AWS_AND_MOBILE_GUIDE.md): Deep dive into Mobile app development and AWS Infrastructure.

---

## AWS Setup for Video Hosting
To enable video uploads for mini-vlogs, you need to configure an AWS S3 bucket.

### 1. Create an S3 Bucket
1. Sign in to the [AWS Management Console](https://console.aws.amazon.com/).
2. Navigate to **S3** and click **Create bucket**.
3. **Bucket name**: e.g., `estarrapp-videos` (must be globally unique).
4. **Region**: Choose a region (e.g., `us-east-1`).
5. **Object Ownership**: Recommended `ACLs disabled`.
6. **Block Public Access**: For simple setups, you can uncheck "Block all public access" if you intend to serve videos directly via public URLs (ensure you understand the security implications).

### 2. Configure CORS
In the S3 bucket **Permissions** tab, add the following CORS configuration:
```json
[
    {
        "AllowedHeaders": ["*"],
        "AllowedMethods": ["GET", "PUT", "POST", "DELETE"],
        "AllowedOrigins": ["https://estarrapp.com", "http://localhost:3000"],
        "ExposeHeaders": ["ETag"]
    }
]
```

### 3. Create an IAM User
1. Navigate to **IAM** > **Users** > **Create user**.
2. Name: `estarrapp-uploader`.
3. Select **Attach policies directly** and search for `AmazonS3FullAccess` (or create a custom policy for limited access).
4. Create the user and go to the **Security credentials** tab.
5. Create an **Access key** (Select "Application running outside AWS").
6. Save the **Access Key ID** and **Secret Access Key**.

### 4. Update AI Studio Secrets
Add the following to your environment variables in AI Studio:
- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `AWS_REGION` (e.g., `us-east-1`)
- `AWS_S3_BUCKET` (your bucket name)

### 5. How to connect in Code
The backend is already configured to handle secure uploads. You can use the `/api/upload/url` endpoint to generate a pre-signed URL.

**Example Client Usage (React):**
```typescript
const uploadVideo = async (file: File) => {
  // 1. Get pre-signed URL from your backend
  const response = await fetch('/api/upload/url', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ fileName: file.name, fileType: file.type })
  });
  const { uploadUrl, fileUrl } = await response.json();

  // 2. Upload file directly to S3 using the pre-signed URL
  await fetch(uploadUrl, {
    method: 'PUT',
    body: file,
    headers: { 'Content-Type': file.type }
  });

  return fileUrl; // This is the public URL of your video
};
```
