# Syrian Renewables - Deployment Guide

## 🚀 Production Deployment to Vercel

This guide will help you deploy the Syrian Renewables application to Vercel with full functionality.

### Prerequisites

1. **GitHub Account** - Your code should be in a GitHub repository
2. **Vercel Account** - Sign up at [vercel.com](https://vercel.com)
3. **PostgreSQL Database** (Optional but recommended for production)

---

## Step 1: Prepare for Deployment

### Update Environment Variables

Before deploying, ensure you have the following environment variables ready:

**Required:**
- `ADMIN_PASSWORD` - Secure password for admin dashboard
- `NEXT_PUBLIC_BASE_URL` - Your production URL (e.g., `https://syrian-renewables.vercel.app`)

**Optional (for database):**
- `POSTGRES_URL`
- `POSTGRES_PRISMA_URL`
- `POSTGRES_URL_NO_SSL`
- `POSTGRES_URL_NON_POOLING`
- `POSTGRES_USER`
- `POSTGRES_HOST`
- `POSTGRES_PASSWORD`
- `POSTGRES_DATABASE`

---

## Step 2: Deploy to Vercel

### Option A: Deploy via Vercel Dashboard (Recommended)

1. **Go to Vercel**: Visit [vercel.com/new](https://vercel.com/new)

2. **Import Git Repository**:
   - Click "Import Git Repository"
   - Select your GitHub account
   - Choose the `my-codex-app` repository
   - Click "Import"

3. **Configure Project**:
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `.` (root)
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `.next` (default)

4. **Add Environment Variables**:
   Click "Environment Variables" and add:
   ```
   ADMIN_PASSWORD=your-secure-password-here
   NEXT_PUBLIC_BASE_URL=https://your-app.vercel.app
   ```

5. **Deploy**:
   - Click "Deploy"
   - Wait for build to complete (2-3 minutes)
   - Your app will be live!

### Option B: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
cd /path/to/my-codex-app
vercel

# Follow prompts:
# - Set up and deploy? Yes
# - Which scope? Select your account
# - Link to existing project? No
# - Project name? my-codex-app (or custom name)
# - Directory? ./
# - Override settings? No

# Add environment variables via CLI
vercel env add ADMIN_PASSWORD
vercel env add NEXT_PUBLIC_BASE_URL

# Deploy to production
vercel --prod
```

---

## Step 3: Set Up PostgreSQL Database (Optional)

### Using Vercel Postgres

1. **Go to your project on Vercel**

2. **Navigate to Storage**:
   - Click on your project
   - Go to "Storage" tab
   - Click "Create Database"
   - Select "Postgres"

3. **Create Database**:
   - Name: `syrian-renewables-db`
   - Region: Choose closest to your users
   - Click "Create"

4. **Environment Variables**:
   - Vercel automatically adds the database environment variables
   - Variables like `POSTGRES_URL` will be available

5. **Update Code** (if using database):
   - Uncomment database code in `lib/db.ts`
   - Run migrations if needed
   - Redeploy with `vercel --prod`

### Using External PostgreSQL

If you prefer to use external PostgreSQL (e.g., Supabase, Neon, Railway):

1. Create a PostgreSQL database on your provider
2. Get the connection string
3. Add environment variables to Vercel:
   - `POSTGRES_URL=postgresql://user:password@host:port/database`
   - Plus other connection strings as needed

---

## Step 4: Configure Custom Domain (Optional)

1. **Buy a Domain** (if you don't have one):
   - Purchase from Namecheap, GoDaddy, or use Vercel Domains

2. **Add Domain to Vercel**:
   - Go to Project Settings
   - Click "Domains"
   - Click "Add"
   - Enter your domain (e.g., `syrianrenewables.com`)
   - Follow DNS configuration instructions

3. **Update Environment Variable**:
   - Update `NEXT_PUBLIC_BASE_URL` to your custom domain
   - Redeploy if needed

---

## Step 5: Verify Deployment

### Test Core Functionality

1. **Home Page**: 
   - Visit your URL
   - Test language toggle (Arabic ↔ English)
   - Verify RTL layout for Arabic

2. **Submission Form**:
   - Go to `/submit`
   - Fill out form (only message required)
   - Test image upload
   - Submit and verify success message

3. **Admin Dashboard**:
   - Go to `/admin`
   - Login with credentials (username: `admin`, password: your env var)
   - Verify submitted request appears
   - Test status updates
   - Test admin notes

4. **Other Pages**:
   - Test `/services` page
   - Test `/about` page
   - Verify all navigation links work

---

## Step 6: Production Best Practices

### Security

1. **Change Default Admin Password**:
   ```bash
   vercel env add ADMIN_PASSWORD production
   # Enter a strong password
   ```

2. **Enable HTTPS** (automatic on Vercel)

3. **Review Rate Limiting**:
   - Default: 5 requests per minute
   - Adjust in `lib/rate-limit.ts` if needed

### Performance

1. **Enable Vercel Analytics**:
   - Go to Project Settings → Analytics
   - Enable Web Analytics

2. **Monitor Build Times**:
   - Check Vercel dashboard for build performance
   - Optimize if builds take >3 minutes

### Monitoring

1. **Set Up Vercel Monitoring**:
   - Go to Project → Monitoring
   - Review errors and performance

2. **Enable Email Notifications**:
   - Project Settings → Notifications
   - Get alerts for deployment failures

---

## Step 7: Update Database (If Using Postgres)

### Initial Database Setup

If you're using PostgreSQL, run this SQL to create the table:

```sql
CREATE TABLE IF NOT EXISTS consultation_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  full_name TEXT,
  phone TEXT,
  email TEXT,
  city TEXT,
  message TEXT NOT NULL,
  image_url TEXT,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'in_review', 'replied', 'closed')),
  admin_notes TEXT
);

CREATE INDEX idx_consultation_requests_created_at ON consultation_requests(created_at DESC);
CREATE INDEX idx_consultation_requests_status ON consultation_requests(status);
```

### Connect to Database

1. **Via Vercel Dashboard**:
   - Go to Storage → Your Database
   - Click "Connect"
   - Use web SQL editor or CLI

2. **Via CLI**:
   ```bash
   vercel env pull .env.local
   # This downloads all env vars locally
   
   # Then connect using your preferred PostgreSQL client
   psql $POSTGRES_URL
   ```

---

## Step 8: Post-Deployment Checklist

- [ ] Application loads correctly
- [ ] Language toggle works (Arabic ↔ English)
- [ ] RTL layout works for Arabic
- [ ] Form submission works
- [ ] File upload works
- [ ] Admin login works
- [ ] Admin can view and update requests
- [ ] All pages are accessible
- [ ] Mobile responsive design works
- [ ] SEO meta tags are correct
- [ ] Custom domain configured (if applicable)
- [ ] HTTPS is enabled
- [ ] Environment variables are set
- [ ] Database is connected (if applicable)

---

## Troubleshooting

### Build Fails

**Error**: `Module not found`
- **Solution**: Ensure all dependencies are in `package.json`
- Run `npm install` locally and commit `package-lock.json`

**Error**: `TypeScript compilation failed`
- **Solution**: Run `npm run build` locally first
- Fix any TypeScript errors before deploying

### Runtime Errors

**Error**: Admin login doesn't work
- **Solution**: Verify `ADMIN_PASSWORD` environment variable is set
- Check it's added to "Production" environment in Vercel

**Error**: Language toggle doesn't work
- **Solution**: This is a client-side feature using localStorage
- Ensure JavaScript is enabled in browser
- Check browser console for errors

**Error**: Form submission fails
- **Solution**: Check function logs in Vercel dashboard
- Verify rate limiting isn't blocking requests
- Check image file size (<10MB)

### Database Issues

**Error**: Cannot connect to database
- **Solution**: Verify all `POSTGRES_*` environment variables are set
- Check database is accessible from Vercel servers
- Ensure IP whitelist includes Vercel IPs (for external databases)

---

## Support & Maintenance

### Regular Updates

1. **Update Dependencies**:
   ```bash
   npm update
   npm audit fix
   git add package*.json
   git commit -m "Update dependencies"
   git push
   ```

2. **Monitor Vercel Dashboard**:
   - Check for deployment errors
   - Review analytics
   - Monitor database usage

### Backup Strategy

1. **Database Backups** (if using Postgres):
   - Set up automated backups via your database provider
   - Vercel Postgres includes automatic backups

2. **Code Backups**:
   - Your code is backed up in GitHub
   - Vercel keeps deployment history

---

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Postgres Documentation](https://vercel.com/docs/storage/vercel-postgres)
- [GitHub Repository](https://github.com/khaled931/my-codex-app)

---

## Production URL

After deployment, your app will be available at:
- **Default**: `https://your-project-name.vercel.app`
- **Custom Domain**: `https://yourdomain.com` (if configured)

---

**Congratulations! Your Syrian Renewables application is now live and ready to serve users! 🎉**
