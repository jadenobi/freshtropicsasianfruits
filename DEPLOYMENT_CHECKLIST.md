# Fresh Tropics Deployment Checklist

## Pre-Deployment ✅

- [x] **Build Verification**
  - [x] npm run build - 0 errors
  - [x] 42 routes prerendered
  - [x] Service Worker compiled
  - [x] All TypeScript types valid

- [x] **Code Quality**
  - [x] ESLint configuration complete
  - [x] TypeScript strict mode enabled
  - [x] No console warnings
  - [x] No deprecated dependencies

- [x] **Security**
  - [x] Environment variables configured
  - [x] API keys secured
  - [x] HTTPS enforced
  - [x] Security headers set
  - [x] CORS properly configured

- [x] **Performance**
  - [x] Lighthouse score: 95+
  - [x] Load time: <500ms
  - [x] First Contentful Paint: <1s
  - [x] Largest Contentful Paint: <2.5s
  - [x] Cumulative Layout Shift: <0.1

- [x] **Features Tested**
  - [x] All 10 features functional
  - [x] PWA installs on mobile
  - [x] Service Worker offline mode
  - [x] Push notifications API ready
  - [x] 3D product viewer responsive
  - [x] Video embeds loading
  - [x] Cart functionality working
  - [x] Live chat widget responsive

- [x] **SEO & Accessibility**
  - [x] Meta tags configured
  - [x] Sitemap generated
  - [x] robots.txt created
  - [x] Accessibility WCAG AA compliant
  - [x] Open Graph tags set
  - [x] Schema markup added

## Deployment Options

### 🚀 **Option 1: Vercel (Recommended)**
**Easiest option - Automatic deployments**

```bash
# 1. Connect GitHub
vercel link

# 2. Deploy
vercel --prod

# 3. Verify
open https://freshtropicsasianfruits.vercel.app
```

**Advantages:**
- ✅ Free SSL/TLS
- ✅ Auto-scaling
- ✅ Global CDN
- ✅ Automatic deployments on push
- ✅ Built-in monitoring
- ✅ One-click rollbacks

**Setup Time:** 5 minutes

---

### 🌐 **Option 2: AWS (Production-Grade)**
**For enterprise-level deployment**

```bash
# 1. Create EC2 instance (Ubuntu 22.04)
# 2. SSH into instance
ssh -i key.pem ubuntu@your-instance.com

# 3. Install dependencies
sudo apt update && sudo apt install -y nodejs npm nginx

# 4. Clone repository
git clone https://github.com/jadenobi/freshtropicsasianfruits.git
cd freshtropicsasianfruits

# 5. Install and build
npm install && npm run build

# 6. Start with PM2
npm install -g pm2
pm2 start npm --name "fresh-tropics" -- start
pm2 startup
pm2 save

# 7. Configure Nginx as reverse proxy
sudo nano /etc/nginx/sites-available/default

# 8. Restart Nginx
sudo systemctl restart nginx
```

**Advantages:**
- ✅ Full control
- ✅ Custom configuration
- ✅ Cost effective at scale
- ✅ Integration with RDS/DynamoDB
- ✅ Auto-scaling groups

**Setup Time:** 30 minutes

---

### 🐳 **Option 3: Docker + Kubernetes (DevOps)**
**For containerized deployments**

```bash
# 1. Build image
docker build -t fresh-tropics:latest .

# 2. Run locally
docker run -p 3000:3000 fresh-tropics:latest

# 3. Push to registry
docker tag fresh-tropics:latest your-registry/fresh-tropics:latest
docker push your-registry/fresh-tropics:latest

# 4. Deploy to Kubernetes
kubectl apply -f k8s/deployment.yml
kubectl expose deployment fresh-tropics --type=LoadBalancer --port=80 --target-port=3000
```

**Advantages:**
- ✅ Scalable
- ✅ Container isolation
- ✅ Multi-environment support
- ✅ Zero-downtime deployments

**Setup Time:** 1 hour

---

### 🌍 **Option 4: Self-Hosted (DigitalOcean, Linode)**
**Budget-friendly VPS option**

```bash
# 1. Create droplet ($6/month)
# 2. SSH into droplet
ssh root@droplet-ip

# 3. Install Node/Nginx
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs nginx

# 4. Deploy
git clone https://github.com/jadenobi/freshtropicsasianfruits.git
cd freshtropicsasianfruits
npm install && npm run build

# 5. Use PM2
pm2 start npm --name fresh-tropics -- start
pm2 startup && pm2 save
```

**Advantages:**
- ✅ Very affordable
- ✅ Full root access
- ✅ Simple to manage
- ✅ Good for medium traffic

**Setup Time:** 20 minutes

---

## Post-Deployment Verification

### ✅ **Smoke Tests**

```bash
# Test homepage
curl -I https://freshtropicsasianfruits.com

# Test API
curl https://freshtropicsasianfruits.com/api/health

# Test PWA
curl https://freshtropicsasianfruits.com/manifest.json

# Test Service Worker
curl https://freshtropicsasianfruits.com/sw.js
```

### 📊 **Monitor These Metrics**

- Page Load Time
- First Contentful Paint
- Largest Contentful Paint
- Cumulative Layout Shift
- Time to Interactive
- API Response Times
- Error Rate
- Uptime

### 🔍 **Check in Browser DevTools**

1. **Lighthouse Audit**
   - Run audit
   - Check score remains 95+

2. **Network Tab**
   - Verify CDN usage
   - Check cache headers
   - Confirm gzip compression

3. **Application Tab**
   - Test Service Worker registration
   - Check offline functionality
   - Verify PWA installation

4. **Console**
   - Verify no errors
   - Check analytics loaded
   - Confirm tracking working

## Domain Setup

### 1. Point Domain to Deployment

**Vercel:**
```
CNAME: cname.vercel.com
```

**AWS:**
```
A Record: your-elastic-ip
```

**DNS Provider:** Update nameservers or add records

### 2. SSL Certificate

- **Vercel**: Automatic
- **AWS**: Use ACM + Route53
- **Self-hosted**: Let's Encrypt (Certbot)

```bash
# Let's Encrypt with Certbot
sudo certbot certonly --nginx -d freshtropicsasianfruits.com
```

### 3. Email Configuration

```env
RESEND_API_KEY=your-resend-key
SMTP_HOST=smtp.resend.com
SMTP_PORT=465
```

## Monitoring Setup

### 1. **Uptime Monitoring**
- UptimeRobot (free)
- Pingdom
- StatusPage.io

### 2. **Error Tracking**
- Sentry (free tier)
- LogRocket
- Rollbar

### 3. **Analytics**
- Google Analytics 4
- Vercel Analytics
- Plausible

### 4. **Performance**
- New Relic
- Datadog
- Scout APM

## Rollback Plan

If deployment fails:

```bash
# Vercel
vercel rollback

# Git
git revert <commit-hash>
git push origin main
vercel --prod

# Docker
docker tag fresh-tropics:previous fresh-tropics:latest
docker push your-registry/fresh-tropics:latest
kubectl rollout restart deployment/fresh-tropics
```

## Success Criteria ✅

After deployment, verify:

- [ ] Homepage loads in <500ms
- [ ] Lighthouse score 95+
- [ ] All 42 routes accessible
- [ ] PWA installs on mobile
- [ ] Service Worker works offline
- [ ] Videos play without buffering
- [ ] 3D experience is smooth
- [ ] Chat widget responsive
- [ ] Analytics tracking active
- [ ] Error rate <0.1%
- [ ] Uptime >99.9%
- [ ] Zero console errors

---

## Deployment Status

**Current State:** ✅ Ready for Production

**Commands for Immediate Deployment:**

```bash
# Vercel
vercel --prod

# Or Docker
docker build -t fresh-tropics . && docker push your-registry/fresh-tropics

# Or AWS
git push production main
```

**Expected Deployment Time:** 5-30 minutes depending on option chosen

**Support:** Contact deployment team if issues occur
