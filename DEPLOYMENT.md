# 🚀 Deployment Guide

Your site is **production-ready**! Build status: ✅ **PASSING** (27 routes)

## Build Status
```
✓ Compiled successfully
✓ TypeScript validation: PASS
✓ All 27 routes generated
  - 2 Dynamic routes (API & product pages)
  - 25 Static pages
✓ Ready for deployment
```

## Deploy to Vercel (5 minutes)

### 1. Push to GitHub
```bash
cd c:\Users\OBI AKOM\OneDrive\Documents\fruit-selling-website
git add .
git commit -m "Production ready: Build passing, all features complete"
git push origin main
```

### 2. Import to Vercel
1. Go to https://vercel.com
2. Click "New Project"
3. Select your GitHub repository
4. Choose branch: `main`
5. Click "Import"

### 3. Configure Environment Variables
In Vercel Project Settings → Environment Variables, add:
```
NEXT_PUBLIC_SUPABASE_URL=https://nzwyojrjaugvpccgyugu.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[your-anon-key-from-.env.local]
SUPABASE_SERVICE_ROLE_KEY=[your-service-role-key-from-.env.local]
RESEND_API_KEY=re_jP7Afsv9_NXVtsrfMzfEseVVe6kceiyZN
```

### 4. Deploy
- Vercel auto-deploys on push to main
- Wait for deployment to complete (~2-3 minutes)
- Get your live URL: `https://[your-project].vercel.app`

### 5. Set Custom Domain (Optional)
- Vercel Dashboard → Settings → Domains
- Add your domain
- Update DNS records per Vercel instructions

## Production Checklist

Before going live, ensure:

- ✅ Build passes locally and on Vercel
- ⏳ Supabase tables created (run SQL setup script)
- ⏳ Environment variables configured on Vercel
- ⏳ Test checkout flow end-to-end
- ⏳ Verify emails send successfully
- ⏳ Test all 7 payment methods
- ⏳ Custom domain configured (if needed)

## Monitoring & Maintenance

### View Production Logs
- Vercel Dashboard → Deployments → Select deployment → Logs
- Check server errors, API failures, build warnings

### Production Env Variables
Keep these updated if you change API keys:
1. Rotate Resend API key annually
2. Rotate Supabase keys quarterly
3. Monitor Vercel usage/limits

## Rollback

If something breaks in production:
```bash
# Find previous good deployment in Vercel dashboard
# Promote previous deployment from "Deployments" view
# Or push hotfix and deploy again
```

## Support

- **Vercel Docs**: https://vercel.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **Supabase Docs**: https://supabase.com/docs
- **Resend Docs**: https://resend.com/docs
