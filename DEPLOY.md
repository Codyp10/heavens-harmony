# Deploy to Google Cloud Run

This guide will help you deploy the Heavens Harmony app to Google Cloud Run.

## Prerequisites

1. **Google Cloud Account**: You need a Google Cloud account with billing enabled
2. **gcloud CLI**: Install the [Google Cloud SDK](https://cloud.google.com/sdk/docs/install)
3. **Docker**: Install [Docker](https://www.docker.com/get-started) (for local testing)
4. **Gemini API Key**: Your Google Gemini API key

## Initial Setup

1. **Authenticate with Google Cloud**:
   ```bash
   gcloud auth login
   ```

2. **Set your project**:
   ```bash
   gcloud config set project YOUR_PROJECT_ID
   ```

3. **Enable required APIs**:
   ```bash
   gcloud services enable cloudbuild.googleapis.com
   gcloud services enable run.googleapis.com
   ```

## Deployment Steps

### Option 1: Deploy using gcloud CLI (Recommended)

1. **Build and deploy in one command**:
   ```bash
   gcloud run deploy heavens-harmony \
     --source . \
     --platform managed \
     --region us-central1 \
     --allow-unauthenticated \
     --set-env-vars VITE_GEMINI_API_KEY=YOUR_GEMINI_API_KEY
   ```

   Replace:
   - `heavens-harmony` with your preferred service name
   - `us-central1` with your preferred region
   - `YOUR_GEMINI_API_KEY` with your actual Gemini API key

2. **The deployment will**:
   - Build the Docker image automatically
   - Push it to Google Container Registry
   - Deploy to Cloud Run
   - Provide you with a public URL

### Option 2: Build and deploy separately

1. **Build the Docker image**:
   ```bash
   gcloud builds submit --tag gcr.io/YOUR_PROJECT_ID/heavens-harmony
   ```

2. **Deploy to Cloud Run**:
   ```bash
   gcloud run deploy heavens-harmony \
     --image gcr.io/YOUR_PROJECT_ID/heavens-harmony \
     --platform managed \
     --region us-central1 \
     --allow-unauthenticated \
     --set-env-vars VITE_GEMINI_API_KEY=YOUR_GEMINI_API_KEY
   ```

## Setting Environment Variables

### Via gcloud CLI:
```bash
gcloud run services update heavens-harmony \
  --set-env-vars VITE_GEMINI_API_KEY=YOUR_GEMINI_API_KEY \
  --region us-central1
```

### Via Cloud Console:
1. Go to [Cloud Run Console](https://console.cloud.google.com/run)
2. Click on your service
3. Click "Edit & Deploy New Revision"
4. Go to "Variables & Secrets" tab
5. Add environment variable: `VITE_GEMINI_API_KEY` with your API key value
6. Click "Deploy"

### Using Secret Manager (Recommended for production):
1. **Create a secret**:
   ```bash
   echo -n "YOUR_GEMINI_API_KEY" | gcloud secrets create gemini-api-key --data-file=-
   ```

2. **Grant Cloud Run access**:
   ```bash
   gcloud secrets add-iam-policy-binding gemini-api-key \
     --member="serviceAccount:YOUR_PROJECT_NUMBER-compute@developer.gserviceaccount.com" \
     --role="roles/secretmanager.secretAccessor"
   ```

3. **Deploy with secret reference**:
   ```bash
   gcloud run deploy heavens-harmony \
     --image gcr.io/YOUR_PROJECT_ID/heavens-harmony \
     --update-secrets VITE_GEMINI_API_KEY=gemini-api-key:latest \
     --region us-central1
   ```

## Local Testing with Docker

Before deploying, you can test the Docker image locally:

1. **Build the image**:
   ```bash
   docker build -t heavens-harmony .
   ```

2. **Run the container**:
   ```bash
   docker run -p 8080:8080 -e VITE_GEMINI_API_KEY=YOUR_GEMINI_API_KEY heavens-harmony
   ```

3. **Test in browser**: Open `http://localhost:8080`

## Updating the Deployment

After making code changes:

1. **Rebuild and redeploy**:
   ```bash
   gcloud run deploy heavens-harmony --source . --region us-central1
   ```

   Or if you built separately:
   ```bash
   gcloud builds submit --tag gcr.io/YOUR_PROJECT_ID/heavens-harmony
   gcloud run deploy heavens-harmony \
     --image gcr.io/YOUR_PROJECT_ID/heavens-harmony \
     --region us-central1
   ```

## Viewing Logs

```bash
gcloud run services logs read heavens-harmony --region us-central1
```

## Custom Domain Configuration

To use your own custom domain (e.g., `yourdomain.com`) with your Cloud Run service:

### Step 1: Map Domain in Cloud Run

Map your custom domain to your Cloud Run service using the gcloud CLI:

```bash
gcloud run domain-mappings create \
  --service heavens-harmony \
  --domain yourdomain.com \
  --region us-central1
```

**Note**: Replace:
- `yourdomain.com` with your actual domain name
- `heavens-harmony` with your service name if different
- `us-central1` with your deployment region

**Alternative: Using Cloud Console**
1. Go to [Cloud Run Console](https://console.cloud.google.com/run)
2. Click on your service (`heavens-harmony`)
3. Click on the "Custom Domains" tab
4. Click "Add Mapping"
5. Enter your domain name
6. Click "Continue"

### Step 2: Verify Domain Ownership

After mapping, Google Cloud will provide DNS records that need to be added to your domain's DNS settings. You'll see output like:

```
Resource records:
  Name: yourdomain.com
  Type: A
  Data: 216.239.32.21
  ...
```

Or you may see CNAME records depending on your domain configuration.

### Step 3: Configure DNS Records in Squarespace

1. **Log in to Squarespace** and go to your domain settings
2. **Navigate to DNS Settings** for your domain
3. **Add the DNS records** provided by Google Cloud:

   **If you received A records:**
   - Type: `A`
   - Host: `@` (or leave blank for root domain)
   - Points to: The IP address provided by Cloud Run
   - TTL: `3600` (or default)

   **If you received CNAME records:**
   - Type: `CNAME`
   - Host: `@` (or leave blank for root domain)
   - Points to: The CNAME target provided by Cloud Run (e.g., `ghs.googlehosted.com`)
   - TTL: `3600` (or default)

4. **For www subdomain** (optional):
   - Add another CNAME record:
   - Host: `www`
   - Points to: `yourdomain.com` (or the Cloud Run CNAME target)
   - TTL: `3600`

5. **Save the DNS records**

### Step 4: Wait for SSL Certificate Provisioning

After adding DNS records:
- Google Cloud will automatically provision an SSL certificate
- This typically takes **15-60 minutes**
- You can check the status in Cloud Console under "Custom Domains"

**Check domain mapping status:**
```bash
gcloud run domain-mappings describe yourdomain.com --region us-central1
```

The status should show `ACTIVE` when everything is configured correctly.

### Step 5: Verify Your Domain

Once the SSL certificate is provisioned:
1. Visit `https://yourdomain.com` in your browser
2. You should see your app with a valid SSL certificate
3. The Cloud Run URL will still work, but your custom domain will also work

### Troubleshooting Domain Issues

**Domain mapping shows "Pending" for a long time:**
- Verify DNS records are correctly added in Squarespace
- Check that DNS propagation has completed (can take up to 48 hours, usually much faster)
- Use `dig` or `nslookup` to verify DNS records:
  ```bash
  dig yourdomain.com
  nslookup yourdomain.com
  ```

**SSL certificate not provisioning:**
- Ensure DNS records are correctly configured
- Wait at least 1 hour after DNS changes
- Check that your domain is accessible via DNS lookup
- Verify domain ownership in Google Cloud Console

**Domain not resolving:**
- Double-check DNS records in Squarespace match what Cloud Run provided
- Ensure you're using the correct record type (A or CNAME)
- Wait for DNS propagation (can take 24-48 hours, but usually faster)

**Getting 404 or service not found:**
- Verify the service name in the domain mapping matches your actual Cloud Run service
- Check that the service is deployed and running
- Ensure the region matches your deployment region

**View domain mapping details:**
```bash
gcloud run domain-mappings list --region us-central1
gcloud run domain-mappings describe yourdomain.com --region us-central1
```

## Troubleshooting

### Build fails
- Ensure all dependencies are listed in `package.json`
- Check that `Dockerfile` is in the project root
- Verify `.dockerignore` isn't excluding necessary files

### App doesn't work after deployment
- Check that `VITE_GEMINI_API_KEY` environment variable is set correctly
- View logs: `gcloud run services logs read heavens-harmony --region us-central1`
- Verify the service is accessible: `gcloud run services describe heavens-harmony --region us-central1`

### Port issues
- Cloud Run automatically sets `PORT` environment variable
- The `server.js` already uses `process.env.PORT || 8080`, so this should work automatically

## Cost Considerations

- Cloud Run charges per request and compute time
- Free tier includes: 2 million requests/month, 360,000 GB-seconds of memory, 180,000 vCPU-seconds
- For a small personal project, you'll likely stay within the free tier

## Additional Resources

- [Cloud Run Documentation](https://cloud.google.com/run/docs)
- [Cloud Run Pricing](https://cloud.google.com/run/pricing)
- [gcloud CLI Reference](https://cloud.google.com/sdk/gcloud/reference/run)

