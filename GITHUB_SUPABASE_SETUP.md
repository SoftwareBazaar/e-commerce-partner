# GitHub & Supabase Setup Guide

Complete guide to connect GitHub for automatic deployments and set up Supabase for data storage.

---

## Part 1: GitHub Integration with Vercel

### Step 1: Create GitHub Repository

1. Go to https://github.com/new
2. Create a new repository:
   - **Repository name:** `robert-trading-tools` (or your preferred name)
   - **Description:** Robert Trading Tools Platform
   - **Visibility:** Public or Private (your choice)
   - **Initialize with:** Add .gitignore (select Node)
   - Click **Create repository**

### Step 2: Initialize Git in Your Project

```bash
# Navigate to your project directory
cd C:\Users\.User\Desktop\NeuroAlgo\e-commerce-partner-main

# Initialize git
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Robert Trading Tools Platform with Supabase, SendGrid, and Vercel integration"

# Add remote repository (replace YOUR_USERNAME and REPO_NAME)
git remote add origin https://github.com/YOUR_USERNAME/robert-trading-tools.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 3: Connect Vercel to GitHub

1. Go to https://vercel.com/dashboard
2. Click on your project (Robert Trading Tools)
3. Go to **Settings** > **Git**
4. Click **Connect Git Repository**
5. Select **GitHub**
6. Authorize Vercel to access your GitHub account
7. Select your repository: `robert-trading-tools`
8. Click **Connect**

### Step 4: Configure Automatic Deployments

1. In Vercel project settings, go to **Git**
2. Under **Deploy on Push**, make sure it's enabled
3. Configure branch deployments:
   - **Production Branch:** `main`
   - **Preview Branches:** `develop`, `staging`
4. Save settings

### Step 5: Set Environment Variables in Vercel

1. Go to **Settings** > **Environment Variables**
2. Add all variables from your `.env` file:

```
VITE_SUPABASE_PROJECT_ID=zowfbftptnkypdwsnbkhh
VITE_SUPABASE_PUBLISHABLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
VITE_SUPABASE_URL=https://zowfbftptnkypdwsnbkhh.supabase.co
VITE_SENDGRID_API_KEY=SG.your_api_key_here
SENDGRID_FROM_EMAIL=neuroalgoforexedge@gmail.com
SUPABASE_SECRET_KEY=sb_secret_YGpw6w4ivFZH3g0uifUHAw_cTz5pSyRJWT
VERCEL_TOKEN=your_vercel_token_here
```

3. For each variable:
   - Select **Environment:** Production, Preview, Development
   - Click **Save**

### Step 6: Test GitHub Integration

1. Make a small change to a file in your project
2. Commit and push to GitHub:
   ```bash
   git add .
   git commit -m "test: verify github integration"
   git push origin main
   ```
3. Go to Vercel dashboard
4. You should see a new deployment starting automatically
5. Wait for deployment to complete
6. Visit your Vercel URL to verify

---

## Part 2: Supabase Connection for Data Storage

### Step 1: Verify Supabase Project

1. Go to https://app.supabase.com
2. Select your project: `zowfbftptnkypdwsnbkhh`
3. Go to **Settings** > **API**
4. Copy and verify these credentials:
   - **Project URL:** `https://zowfbftptnkypdwsnbkhh.supabase.co`
   - **Anon Key:** (your VITE_SUPABASE_PUBLISHABLE_KEY)
   - **Service Role Key:** (your SUPABASE_SECRET_KEY)

### Step 2: Run Database Migrations

```bash
# Navigate to project directory
cd C:\Users\.User\Desktop\NeuroAlgo\e-commerce-partner-main

# Install Supabase CLI if not already installed
npm install -g supabase

# Login to Supabase
supabase login

# Link to your project
supabase link --project-ref zowfbftptnkypdwsnbkhh

# Run migrations
supabase migration up
```

### Step 3: Deploy Edge Function

```bash
# Deploy the send-email function
supabase functions deploy send-email

# Set environment variable
supabase secrets set SENDGRID_API_KEY="SG.your_api_key_here"
```

### Step 4: Verify Database Tables

1. Go to Supabase dashboard
2. Click **Table Editor** in left sidebar
3. Verify these tables exist:
   - ✅ email_notifications
   - ✅ email_templates
   - ✅ orders
   - ✅ custom_ea_requests
   - ✅ bookings
   - ✅ contact_submissions

### Step 5: Configure Storage Buckets (for file uploads)

1. Go to **Storage** in Supabase dashboard
2. Click **Create a new bucket**
3. Create these buckets:

**Bucket 1: custom-ea-files**
- Name: `custom-ea-files`
- Public: No (private)
- File size limit: 10 MB

**Bucket 2: product-images**
- Name: `product-images`
- Public: Yes (public)
- File size limit: 5 MB

**Bucket 3: user-documents**
- Name: `user-documents`
- Public: No (private)
- File size limit: 20 MB

### Step 6: Configure Storage Policies

For each bucket, set up Row Level Security (RLS) policies:

**For custom-ea-files (Private):**
```sql
-- Allow authenticated users to upload their own files
CREATE POLICY "Users can upload their own files"
ON storage.objects
FOR INSERT
WITH CHECK (
  auth.role() = 'authenticated' AND
  bucket_id = 'custom-ea-files'
);

-- Allow users to read their own files
CREATE POLICY "Users can read their own files"
ON storage.objects
FOR SELECT
USING (
  auth.role() = 'authenticated' AND
  bucket_id = 'custom-ea-files'
);
```

**For product-images (Public):**
```sql
-- Allow public read access
CREATE POLICY "Public read access"
ON storage.objects
FOR SELECT
USING (bucket_id = 'product-images');

-- Allow authenticated users to upload
CREATE POLICY "Authenticated users can upload"
ON storage.objects
FOR INSERT
WITH CHECK (
  auth.role() = 'authenticated' AND
  bucket_id = 'product-images'
);
```

### Step 7: Create File Upload Service

Create `src/integrations/supabase/storageService.ts`:

```typescript
import { supabase } from "@/integrations/supabase/client";

export interface UploadResult {
  success: boolean;
  url?: string;
  path?: string;
  error?: string;
}

/**
 * Upload file to Supabase Storage
 */
export async function uploadFile(
  bucket: string,
  file: File,
  folder?: string
): Promise<UploadResult> {
  try {
    const fileName = `${Date.now()}-${file.name}`;
    const filePath = folder ? `${folder}/${fileName}` : fileName;

    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      throw error;
    }

    // Get public URL
    const { data: publicData } = supabase.storage
      .from(bucket)
      .getPublicUrl(filePath);

    return {
      success: true,
      url: publicData.publicUrl,
      path: filePath,
    };
  } catch (error) {
    console.error("Error uploading file:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Delete file from Supabase Storage
 */
export async function deleteFile(
  bucket: string,
  filePath: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase.storage
      .from(bucket)
      .remove([filePath]);

    if (error) {
      throw error;
    }

    return { success: true };
  } catch (error) {
    console.error("Error deleting file:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Get public URL for file
 */
export function getPublicUrl(bucket: string, filePath: string): string {
  const { data } = supabase.storage.from(bucket).getPublicUrl(filePath);
  return data.publicUrl;
}

/**
 * List files in bucket
 */
export async function listFiles(
  bucket: string,
  folder?: string
): Promise<{ success: boolean; files?: any[]; error?: string }> {
  try {
    const { data, error } = await supabase.storage
      .from(bucket)
      .list(folder || "", {
        limit: 100,
        offset: 0,
        sortBy: { column: "name", order: "asc" },
      });

    if (error) {
      throw error;
    }

    return { success: true, files: data };
  } catch (error) {
    console.error("Error listing files:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
```

### Step 8: Update Custom EA Form to Handle File Uploads

Update `src/pages/CustomEA.tsx` to include file upload:

```typescript
import { uploadFile } from "@/integrations/supabase/storageService";

// In the form submission handler:
const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setBusy(true);
  const fd = new FormData(e.currentTarget);
  
  // ... existing code ...
  
  // Handle file upload if present
  let fileUrl = null;
  const file = fd.get("file") as File;
  if (file && file.size > 0) {
    const uploadResult = await uploadFile(
      "custom-ea-files",
      file,
      "requests"
    );
    if (uploadResult.success) {
      fileUrl = uploadResult.url;
    }
  }
  
  // Insert to database with file URL
  const { data, error } = await supabase.from("custom_ea_requests").insert({
    // ... existing fields ...
    file_url: fileUrl,
  }).select();
  
  // ... rest of code ...
};
```

---

## Part 3: Git Workflow

### Daily Development Workflow

```bash
# 1. Pull latest changes
git pull origin main

# 2. Create a feature branch
git checkout -b feature/your-feature-name

# 3. Make changes and commit
git add .
git commit -m "feat: add your feature description"

# 4. Push to GitHub
git push origin feature/your-feature-name

# 5. Create Pull Request on GitHub
# Go to https://github.com/YOUR_USERNAME/robert-trading-tools
# Click "Compare & pull request"
# Add description and click "Create pull request"

# 6. After PR is merged, pull main
git checkout main
git pull origin main
```

### Commit Message Convention

```
feat: add new feature
fix: fix a bug
docs: update documentation
style: code style changes
refactor: refactor code
test: add tests
chore: maintenance tasks
```

---

## Part 4: Verify Everything Works

### Test GitHub Integration

1. Make a change to a file
2. Commit and push:
   ```bash
   git add .
   git commit -m "test: verify integration"
   git push origin main
   ```
3. Check Vercel dashboard - deployment should start automatically
4. Wait for deployment to complete
5. Visit your Vercel URL to verify

### Test Supabase Connection

1. Go to http://localhost:5173/custom-ea
2. Fill out the form with test data
3. Submit the form
4. Check Supabase dashboard:
   - Go to **Table Editor**
   - Click **custom_ea_requests**
   - Verify your submission appears

### Test File Upload

1. Go to http://localhost:5173/custom-ea
2. Fill out the form
3. Upload a test file
4. Submit
5. Check Supabase dashboard:
   - Go to **Storage**
   - Click **custom-ea-files**
   - Verify your file appears

---

## Part 5: Environment Variables Checklist

### Local Development (.env)
```env
VITE_SUPABASE_PROJECT_ID=zowfbftptnkypdwsnbkhh
VITE_SUPABASE_PUBLISHABLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
VITE_SUPABASE_URL=https://zowfbftptnkypdwsnbkhh.supabase.co
VITE_SENDGRID_API_KEY=SG.your_api_key_here
SENDGRID_FROM_EMAIL=neuroalgoforexedge@gmail.com
SUPABASE_SECRET_KEY=sb_secret_YGpw6w4ivFZH3g0uifUHAw_cTz5pSyRJWT
VERCEL_TOKEN=your_vercel_token_here
```

### Vercel Environment Variables
- ✅ VITE_SUPABASE_PROJECT_ID
- ✅ VITE_SUPABASE_PUBLISHABLE_KEY
- ✅ VITE_SUPABASE_URL
- ✅ VITE_SENDGRID_API_KEY
- ✅ SENDGRID_FROM_EMAIL
- ✅ SUPABASE_SECRET_KEY

### Supabase Secrets
- ✅ SENDGRID_API_KEY (for Edge Function)

---

## Troubleshooting

### Git Push Fails
```bash
# Check remote URL
git remote -v

# Update remote if needed
git remote set-url origin https://github.com/YOUR_USERNAME/robert-trading-tools.git

# Try push again
git push -u origin main
```

### Vercel Deployment Fails
1. Check build logs in Vercel dashboard
2. Verify all environment variables are set
3. Run `npm run build` locally to test
4. Check for TypeScript errors: `npm run lint`

### Supabase Connection Issues
1. Verify credentials in `.env`
2. Check project is active in Supabase dashboard
3. Verify RLS policies are configured
4. Check browser console for CORS errors

### File Upload Not Working
1. Verify storage bucket exists
2. Check RLS policies are configured
3. Verify file size is within limit
4. Check browser console for errors

---

## Next Steps

1. ✅ Create GitHub repository
2. ✅ Initialize git in your project
3. ✅ Connect Vercel to GitHub
4. ✅ Set environment variables in Vercel
5. ✅ Run Supabase migrations
6. ✅ Deploy Edge Function
7. ✅ Create storage buckets
8. ✅ Test everything

---

## Support

- **GitHub Docs:** https://docs.github.com
- **Vercel Docs:** https://vercel.com/docs
- **Supabase Docs:** https://supabase.com/docs

