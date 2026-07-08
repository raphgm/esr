# ESTARR APP: Enterprise Deployment & Mobile Conversion Guide

This document outlines how to host the ESTARR full-stack application on AWS and compile it for mobile.

## 🚀 Quick Start: AWS Video Infrastructure
To enable video mini-vlogs, you must set up these core AWS services.

### 1. S3 Bucket (Storage)
1. **Create Bucket**: Go to S3 and create a bucket (e.g., `estarrapp-videos`).
2. **CORS Policy**: In the Permissions tab, add:
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

### 2. IAM User (Access)
1. **Create User**: Go to IAM and create a user (e.g., `estarr-uploader`).
2. **Attach Policy**: Select `AmazonS3FullAccess`.
3. **Security Credentials**: Create an **Access Key** for "Local code" or "Application outside AWS".
4. **Save Keys**: Copy the **Access Key ID** and **Secret Access Key**.

### 3. Environment Secrets (AI Studio)
Add these to your AI Studio Settings:
- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `AWS_REGION` (e.g., `us-east-1`)
- `AWS_S3_BUCKET`

### 4. Connection & Usage
The Express backend in `server.ts` is already equipped with an S3 client and a pre-signed URL generator. 

**Endpoint**: `POST /api/upload/url`
- **Request Body**: `{ "fileName": "video.mp4", "fileType": "video/mp4" }`
- **Returns**: `uploadUrl` (for PUT request), `fileUrl` (permanent link).

---

## PART 1: High-Performance AWS Hosting & Video Playback Optimization

Serving high-definition video assets directly from a traditional web server results in high latency, video buffering, high egress costs, and a poor user experience. To guarantee butter-smooth video playback (including scrubbing, seeking, and adaptive quality adjustment), we implement a modern **CDN-backed Serverless/Containerized architecture** combined with **Adaptive Bitrate Streaming (HLS)**.

### 1.1 Architectural Overview

```
                      +------------------+
                      |   User Browser   |
                      +--------+---------+
                               |
         +---------------------+---------------------+
         | (Static Assets)                           | (API Requests)
         v                                           v
+--------+---------+                        +--------+---------+
| AWS CloudFront   |                        | AWS CloudFront   |
|   (CDN Edge)     |                        |   (API Cache)    |
+--------+---------+                        +--------+---------+
         |                                           |
         v                                           v
+--------+---------+                        +--------+---------+
|  AWS S3 Bucket   |                        | AWS App Runner   |
| (Static Website) |                        | (Express Server) |
+------------------+                        +--------+---------+
                                                     |
                                                     v
                                            +--------+---------+
                                            | Firebase / Auth  |
                                            +------------------+

[Video Pipeline]
+---------------+     +--------------------+     +---------------+     +----------------+
|  Uploader S3  +---->| AWS MediaConvert   +---->| Streaming S3  +---->| AWS CloudFront |
| (Raw .mp4)    |     | (HLS Transcoding)  |     | (.m3u8/.ts)   |     | (Video CDN)    |
+---------------+     +--------------------+     +---------------+     +----------------+
```

### 1.2 Step 1: Video Storage & CORS Configuration (Amazon S3)

To store video files, create a dedicated S3 bucket (e.g., `estrr-video-assets`). Mobile applications and web browsers require specific Cross-Origin Resource Sharing (CORS) permissions to buffer video chunks asynchronously.

1. Navigate to the **Amazon S3 Console** and click **Create bucket**.
2. Set the Bucket Name (e.g., `estrr-video-assets`) and choose your preferred region.
3. In the **Permissions** tab, scroll down to **Cross-origin resource sharing (CORS)** and paste the following configuration:

```json
[
  {
    "AllowedHeaders": [
      "*"
    ],
    "AllowedMethods": [
      "GET",
      "HEAD"
    ],
    "AllowedOrigins": [
      "*"
    ],
    "ExposeHeaders": [
      "Access-Control-Allow-Origin",
      "Access-Control-Allow-Methods",
      "Content-Range",
      "Accept-Ranges"
    ],
    "MaxAgeSeconds": 3000
  }
]
```
*Note: Exposing `Content-Range` and `Accept-Ranges` is vital for mobile video scrubbers to support fast-forwarding and seeking.*

### 1.3 Step 2: Adaptive Bitrate Streaming via AWS Elemental MediaConvert

Serving large, uncompressed `.mp4` files over mobile networks causes severe stuttering. We must transcode videos into **HTTP Live Streaming (HLS)**. HLS slices the video into short 2-to-6-second `.ts` chunks and creates a `.m3u8` index file. The client player dynamically swaps qualities based on bandwidth.

1. Open the **AWS Elemental MediaConvert** console.
2. Click **Create job**.
3. Under **Job settings** -> **Inputs**, select your raw video uploaded to S3 (e.g., `s3://estrr-raw-uploads/my-video.mp4`).
4. Under **Output groups**, click **Add** and select **Apple HLS**.
5. Set the output destination pointing to your public video S3 bucket: `s3://estrr-video-assets/hls/`.
6. Add multiple output resolutions (e.g., **1080p**, **720p**, **480p**) with corresponding bitrates. MediaConvert automatically generates a master playlist linking them.
7. Click **Create** to compile the HLS streaming package.

### 1.4 Step 3: Low-Latency Delivery via Amazon CloudFront (CDN)

Never serve S3 video links directly. S3 charges high data egress rates, and files load slowly from a single physical region. Instead, distribute them globally via CloudFront.

1. Open the **Amazon CloudFront** console and click **Create distribution**.
2. Set the **Origin domain** to your HLS S3 bucket (`estrr-video-assets.s3.amazonaws.com`).
3. For **S3 bucket access**, choose **Origin access control settings (OAC)** to keep your S3 bucket secure and private from direct public access. CloudFront will fetch files securely using an IAM policy.
4. Under **Cache key and query requests**, select the pre-configured policy **CachingOptimized**.
5. Under **Response headers policy**, create a custom policy or select one that includes CORS headers to support native HLS video players on iOS and Android.
6. Click **Create distribution**. Copy the generated Domain Name (e.g., `https://d3v1eo539b.cloudfront.net`). Your video URLs will now look like:
   `https://d3v1eo539b.cloudfront.net/hls/course-intro.m3u8`

### 1.5 Step 4: Hosting the Full-Stack Web Application

The frontend consists of static assets (built into `/dist`), while the backend is an Express.js server (`server.ts`).

#### Option A: Single-Container Deployment (AWS App Runner) - *Recommended*
AWS App Runner is a fully managed container service that connects directly to your GitHub repository, builds your Docker image, and hosts it with auto-scaling, HTTPS, and zero server maintenance.

1. Add a simple `Dockerfile` to the root of your project:
   ```dockerfile
   FROM node:18-alpine
   WORKDIR /app
   COPY package*.json ./
   RUN npm ci
   COPY . .
   RUN npm run build
   EXPOSE 3000
   ENV NODE_ENV=production
   CMD ["npm", "start"]
   ```
2. Navigate to the **AWS App Runner** console.
3. Click **Create service**, select **Source code repository**, and connect your GitHub account.
4. Select the repository and the main branch. Set the deployment trigger to **Automatic** (CI/CD).
5. Choose **Using a configuration file** (or define the runtime as `Node.js 18`, Build Command as `npm install && npm run build`, and Start Command as `npm start`).
6. Set the listening port to `3000`.
7. App Runner will provision an active, secure URL (e.g., `https://xyz123.awsapprunner.com`) with automated SSL certification.

---

## PART 2: Compiling to Native Android & iOS Apps via CapacitorJS

To convert your React, Tailwind, and Vite web application into native iOS and Android mobile apps without maintaining separate codebases, we use **CapacitorJS** (the modern, enterprise-grade successor to Cordova developed by Ionic).

Capacitor embeds your compiled web app inside a lightweight, highly optimized web view shell, providing absolute file-system access, high-fidelity native page transitions, and complete access to iOS/Android device APIs through simple JavaScript wrappers.

### 2.1 Step 1: Pre-requisites & Local Environment Setup

Before starting, install the platform development tools on your local machine:

- **For Android Development**:
  - Install the latest [Android Studio](https://developer.android.com/studio).
  - Open Android Studio, navigate to the **SDK Manager**, and install **Android SDK (API level 33 or 34)**, **SDK Platform-Tools**, and a virtual device emulator.
- **For iOS Development (requires macOS)**:
  - Install [Xcode](https://developer.apple.com/xcode/) from the Mac App Store.
  - Install CocoaPods (essential for native iOS dependencies):
    ```bash
    sudo gem install cocoapods
    ```

### 2.2 Step 2: Install and Initialize Capacitor

Run these commands in the root folder of your project:

1. Install the core Capacitor packages:
   ```bash
   npm install @capacitor/core @capacitor/cli
   ```
2. Initialize Capacitor in your project:
   ```bash
   npx cap init "ESTARR APP" "com.estrr.platform" --web-dir=dist
   ```
   - **AppName**: `ESTARR APP` (This is the user-facing app name displayed under the app icon).
   - **AppPackage ID**: `com.estrr.platform` (A unique reverse-DNS identifier used in the App Store & Google Play).
   - **Web Asset Directory**: `dist` (The built static asset folder generated by `npm run build`).

### 2.3 Step 3: Install Platform Packages & Add Native Projects

Install the native wrapper platform modules and generate the native platform folders:

```bash
# Install platform CLI tools
npm install @capacitor/android @capacitor/ios

# Build the latest optimized production web bundle
npm run build

# Generate native project structures
npx cap add android
npx cap add ios
```

After running these commands, you will notice two brand new directories created in your workspace root:
- `/android` (An fully formed Gradle-based Android project ready to open in Android Studio).
- `/ios` (A native CocoaPods-configured Xcode project).

### 2.4 Step 4: Asset Customization (App Icons and Splash Screens)

Capacitor provides an automated asset generator that handles all complex sizing configurations for Apple and Google devices.

1. Install the assets tool:
   ```bash
   npm install @capacitor/assets -D
   ```
2. Create an `assets` directory at the project root and add three base images:
   - `assets/icon-only.png` (Min 1024x1024px, no transparent background for Android).
   - `assets/splash.png` (Min 2732x2732px).
   - `assets/splash-dark.png` (Optional).
3. Run the generator to automatically crop, resize, and inject device assets:
   ```bash
   npx cordova-res --icon --splash
   # or using the newer Capacitor assets tool:
   npx cap assets generate
   ```

### 2.5 Step 5: Web-to-Mobile Synchronization Workflow

Whenever you modify any React component, CSS file, or layout in your development workspace, follow this simple 2-step synchronization workflow to refresh your mobile packages:

```bash
# Step 1: Re-compile the React Vite app
npm run build

# Step 2: Sync and copy files from /dist directly into native app bundles
npx cap sync
```

### 2.6 Step 6: Compiling & Running on Emulators or Physical Devices

#### 2.6.1 Running on Android

1. Open the Android project in Android Studio:
   ```bash
   npx cap open android
   ```
2. Wait for Gradle to finish indexing.
3. To test, select a virtual emulator or connect a physical Android device (with **USB Debugging** enabled in Developer Options).
4. Click the green **Run (Play)** button in Android Studio.
5. To generate a release APK/AAB for Google Play:
   - Navigate to **Build** -> **Generate Signed Bundle / APK**.
   - Select **Android App Bundle** (AAB), create a keystore credentials file, sign it, and find the release-ready file in `android/app/release/`.

#### 2.6.2 Running on iOS (macOS required)

1. Open the iOS project in Xcode:
   ```bash
   npx cap open ios
   ```
2. In Xcode, click on the **App** project on the left-hand menu.
3. In the **Signing & Capabilities** tab, select your Apple Developer Team and check **Automatically manage signing**.
4. Select your connected iPhone/iPad or an iOS Simulator.
5. Click the play button (or press `Cmd + R`) to compile and launch the app.
6. To generate a release for the App Store:
   - Select the target device as **Any iOS Device (arm64)**.
   - Click **Product** -> **Archive**.
   - Follow the prompt to sign, validate, and upload your native binary directly to **App Store Connect / TestFlight**.

---

## PART 3: Summary Checklist for Playback & Production Ready Apps

| AWS Task / Setting | Objective | Action to Take |
| :--- | :--- | :--- |
| **S3 CORS Rules** | Smooth scrub seeking & headers | Add `GET` & `HEAD` with `Content-Range`, `Accept-Ranges` exposed. |
| **MediaConvert HLS** | Adaptive multi-quality streams | Convert raw `.mp4` into streaming `.m3u8` index + `.ts` fragments. |
| **CloudFront Cache** | Low latency, bypass high S3 fees | Hook up CloudFront to S3 via OAC with `CachingOptimized` enabled. |
| **Capacitor Sync** | Mobile app state compilation | Always run `npm run build && npx cap sync` after making code updates. |
| **Android Bundle** | Google Play Store distribution | Generate a signed `.aab` package inside Android Studio's build menu. |
| **Xcode Archive** | Apple App Store distribution | Build via Xcode Archive with a valid Apple Developer Profile. |
