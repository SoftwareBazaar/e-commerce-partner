# 📦 Storage Buckets Setup Guide

Complete guide to create and configure Supabase Storage buckets for file uploads.

---

## 📋 What You'll Create

### 3 Storage Buckets

| Bucket | Purpose | Public | Max Size | Use Case |
|--------|---------|--------|----------|----------|
| **custom-ea-files** | Custom EA uploads | No | 10 MB | Client EA files, references |
| **product-images** | Product images | Yes | 5 MB | Product photos, screenshots |
| **user-documents** | User documents | No | 20 MB | User profiles, documents |

---

## 🚀 Step-by-Step Setup

### Step 1: Open Supabase Dashboard

1. Go to https://app.supabase.com
2. Select your project: `zowfbftptnkypdwsnbkhh`
3. Click **Storage** in the left sidebar

---

### Step 2: Create Bucket 1 - custom-ea-files

#### 2.1 Create Bucket
1. Click **Create a new bucket**
2. Fill in:
   - **Bucket name:** `custom-ea-files`
   - **Public bucket:** Toggle OFF (private)
   - Click **Create bucket**

#### 2.2 Configure Settings
1. Click the bucket name: `custom-ea-files`
2. Go to **Settings**
3. Set:
   - **File size limit:** 10 MB
   - **Allowed MIME types:** (leave empty for all)

#### 2.3 Set Policies
1. Go to **Policies** tab
2. Click **New policy**
3. Create policy for uploads:
   - **Policy name:** `Allow authenticated users to upload`
   - **Operation:** INSERT
   - **Target roles:** authenticated
   - **Policy expression:**
   ```sql
   bucket_id = 'custom-ea-files'
   ```
   - Click **Create**

4. Create policy for reads:
   - **Policy name:** `Allow users to read own files`
   - **Operation:** SELECT
   - **Target roles:** authenticated
   - **Policy expression:**
   ```sql
   bucket_id = 'custom-ea-files'
   ```
   - Click **Create**

---

### Step 3: Create Bucket 2 - product-images

#### 3.1 Create Bucket
1. Click **Create a new bucket**
2. Fill in:
   - **Bucket name:** `product-images`
   - **Public bucket:** Toggle ON (public)
   - Click **Create bucket**

#### 3.2 Configure Settings
1. Click the bucket name: `product-images`
2. Go to **Settings**
3. Set:
   - **File size limit:** 5 MB
   - **Allowed MIME types:** `image/*`

#### 3.3 Set Policies
1. Go to **Policies** tab
2. Create policy for public read:
   - **Policy name:** `Allow public read access`
   - **Operation:** SELECT
   - **Target roles:** public
   - **Policy expression:**
   ```sql
   bucket_id = 'product-images'
   ```
   - Click **Create**

3. Create policy for authenticated uploads:
   - **Policy name:** `Allow authenticated users to upload`
   - **Operation:** INSERT
   - **Target roles:** authenticated
   - **Policy expression:**
   ```sql
   bucket_id = 'product-images'
   ```
   - Click **Create**

---

### Step 4: Create Bucket 3 - user-documents

#### 4.1 Create Bucket
1. Click **Create a new bucket**
2. Fill in:
   - **Bucket name:** `user-documents`
   - **Public bucket:** Toggle OFF (private)
   - Click **Create bucket**

#### 4.2 Configure Settings
1. Click the bucket name: `user-documents`
2. Go to **Settings**
3. Set:
   - **File size limit:** 20 MB
   - **Allowed MIME types:** (leave empty for all)

#### 4.3 Set Policies
1. Go to **Policies** tab
2. Create policy for uploads:
   - **Policy name:** `Allow authenticated users to upload`
   - **Operation:** INSERT
   - **Target roles:** authenticated
   - **Policy expression:**
   ```sql
   bucket_id = 'user-documents'
   ```
   - Click **Create**

3. Create policy for reads:
   - **Policy name:** `Allow users to read own files`
   - **Operation:** SELECT
   - **Target roles:** authenticated
   - **Policy expression:**
   ```sql
   bucket_id = 'user-documents'
   ```
   - Click **Create**

---

## 🔐 Security Policies Explained

### Public Bucket (product-images)
- Anyone can read files
- Only authenticated users can upload
- Good for product images, screenshots

### Private Buckets (custom-ea-files, user-documents)
- Only authenticated users can access
- Users can only access their own files
- Good for sensitive documents

---

## 📝 File Upload Implementation

### Upload File to Bucket

```typescript
import { supabase } from "@/integrations/supabase/client";

async function uploadFile(bucket: string, file: File, folder?: string) {
  try {
    const fileName = `${Date.now()}-${file.name}`;
    const filePath = folder ? `${folder}/${fileName}` : fileName;

    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) throw error;

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
    console.error("Upload error:", error);
    return { success: false, error };
  }
}
```

### Download File

```typescript
async function downloadFile(bucket: string, filePath: string) {
  try {
    const { data, error } = await supabase.storage
      .from(bucket)
      .download(filePath);

    if (error) throw error;

    // Create download link
    const url = URL.createObjectURL(data);
    const link = document.createElement("a");
    link.href = url;
    link.download = filePath.split("/").pop();
    link.click();
  } catch (error) {
    console.error("Download error:", error);
  }
}
```

### Delete File

```typescript
async function deleteFile(bucket: string, filePath: string) {
  try {
    const { error } = await supabase.storage
      .from(bucket)
      .remove([filePath]);

    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error("Delete error:", error);
    return { success: false, error };
  }
}
```

### Get Public URL

```typescript
function getPublicUrl(bucket: string, filePath: string) {
  const { data } = supabase.storage.from(bucket).getPublicUrl(filePath);
  return data.publicUrl;
}
```

---

## 🧪 Testing Uploads

### Test 1: Upload to custom-ea-files
```typescript
// Create a test file
const file = new File(["test content"], "test.txt", { type: "text/plain" });

// Upload
const result = await uploadFile("custom-ea-files", file, "requests");
console.log(result);
// Expected: { success: true, url: "...", path: "requests/..." }
```

### Test 2: Upload to product-images
```typescript
// Create a test image
const file = new File(["image data"], "test.jpg", { type: "image/jpeg" });

// Upload
const result = await uploadFile("product-images", file);
console.log(result);
// Expected: { success: true, url: "...", path: "..." }
```

### Test 3: Get Public URL
```typescript
const url = getPublicUrl("product-images", "test.jpg");
console.log(url);
// Expected: https://zowfbftptnkypdwsnbkhh.supabase.co/storage/v1/object/public/product-images/test.jpg
```

---

## 📊 Bucket Usage Examples

### Custom EA Request with File
```typescript
// User uploads EA reference file
const file = document.getElementById("file-input").files[0];
const uploadResult = await uploadFile("custom-ea-files", file, "requests");

// Save to database
await supabase.from("custom_ea_requests").insert({
  client_name: "John Doe",
  client_email: "john@example.com",
  strategy: "Scalping EA",
  file_url: uploadResult.url,
  file_name: file.name,
});
```

### Product Image Upload
```typescript
// Admin uploads product image
const file = document.getElementById("image-input").files[0];
const uploadResult = await uploadFile("product-images", file);

// Save to database
await supabase.from("products").insert({
  name: "Smart Reversal Pro",
  image_url: uploadResult.url,
  category: "Indicator",
});
```

### User Document Upload
```typescript
// User uploads trading journal
const file = document.getElementById("document-input").files[0];
const uploadResult = await uploadFile("user-documents", file, "journals");

// Save to database
await supabase.from("user_documents").insert({
  user_id: userId,
  document_url: uploadResult.url,
  document_name: file.name,
});
```

---

## ✅ Verification Checklist

After creating buckets, verify:

- [ ] Bucket `custom-ea-files` created (private)
- [ ] Bucket `product-images` created (public)
- [ ] Bucket `user-documents` created (private)
- [ ] File size limits set correctly
- [ ] RLS policies configured
- [ ] Can upload files
- [ ] Can download files
- [ ] Can get public URLs
- [ ] Public bucket accessible without auth
- [ ] Private buckets require authentication

---

## 🚀 Next Steps

### Step 1: Create Buckets
1. Follow the setup steps above
2. Verify all 3 buckets created

### Step 2: Test Uploads
1. Upload test files
2. Verify files appear in Storage
3. Test download links

### Step 3: Integrate with Forms
1. Add file upload to Custom EA form
2. Add image upload to product admin
3. Test end-to-end

### Step 4: Deploy
1. Push to GitHub
2. Vercel deploys automatically
3. Test on production

---

## 📞 Troubleshooting

### Error: "Bucket already exists"
- Bucket name is taken
- Use a different name

### Error: "Permission denied"
- Check RLS policies
- Verify user is authenticated
- Check bucket is public/private correctly

### Error: "File too large"
- File exceeds bucket size limit
- Reduce file size or increase limit

### Error: "Invalid MIME type"
- File type not allowed
- Check MIME type restrictions

### Can't access public URL
- Bucket might be private
- Check public bucket setting
- Verify file exists

---

## 📚 Additional Resources

- **Supabase Storage Docs:** https://supabase.com/docs/guides/storage
- **Storage Security:** https://supabase.com/docs/guides/storage/security
- **File Upload Best Practices:** https://supabase.com/docs/guides/storage/uploads

---

## 🎉 Storage Setup Complete!

Your storage buckets are now ready for:
- ✅ Custom EA file uploads
- ✅ Product image uploads
- ✅ User document uploads
- ✅ Public file access
- ✅ Private file access

**Next:** Deploy Edge Function and test everything!

