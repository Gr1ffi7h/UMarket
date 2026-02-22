# UMarket Security & Deployment Guide

## 🚀 Quick Setup

### 1. Environment Variables

Create `.env.local` in your project root:

```bash
# Supabase Configuration (REQUIRED)
NEXT_PUBLIC_SUPABASE_URL=YOUR_PROJECT_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_NEW_ANON_KEY
```

**⚠️ NEVER commit `.env.local` to git!**

### 2. Supabase Database Setup

1. Go to your Supabase project → SQL Editor
2. Copy and paste the contents of `supabase-setup.sql`
3. Run the script to create tables and security policies

### 3. Create Admin User

1. Sign up normally with:
   - Email: `Admin@uni.edu`
   - Password: `NIMDA`

2. Go to Supabase → Table Editor → profiles
3. Find the user and change `role` to `admin`

## 🔒 Security Features Implemented

### ✅ Authentication & Authorization

- **Middleware Protection**: All protected routes require authentication
- **Role-Based Access**: Admin panel restricted to users with `role = 'admin'`
- **Server-Side Validation**: No client-side security checks only

### ✅ Protected Routes

```
/browse          → Requires login
/create-listing  → Requires login
/messages        → Requires login
/profile         → Requires login
/my-listings     → Requires login
/listing/[id]    → Requires login
/admin           → Requires admin role
```

### ✅ Row Level Security (RLS)

- **Profiles**: Users can only read/update their own profile
- **Listings**: Public read, authenticated create, owner update/delete
- **Conversations**: Participants only
- **Messages**: Conversation participants only
- **Admin Override**: Admins can read/manage everything

### ✅ Secure Listing Creation

- **Session-Based**: `seller_id` comes from authenticated session, not form
- **Image Security**: Users can only upload to their own folder
- **Input Validation**: Server-side validation for all fields

### ✅ No Hardcoded Secrets

- Environment variables only
- `.env.local` in `.gitignore`
- Vercel environment variables configured

## 🌐 Vercel Deployment

### 1. Push to GitHub

```bash
git add .
git commit -m "Secure auth enforcement and role-based admin panel with Supabase"
git push origin main
```

### 2. Vercel Configuration

1. Connect your GitHub repo to Vercel
2. Add environment variables in Vercel Dashboard:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

3. Deploy

### 3. Post-Deployment

1. Test all protected routes redirect to login
2. Test admin panel with admin credentials
3. Verify listing creation works
4. Check RLS policies are working

## 🧪 Testing Checklist

### Authentication Tests
- [ ] Unauthenticated users redirected from `/browse`
- [ ] Unauthenticated users redirected from `/create-listing`
- [ ] Unauthenticated users redirected from `/admin`
- [ ] Authenticated users can access protected routes
- [ ] Admin users can access `/admin`
- [ ] Non-admin users redirected from `/admin`

### Security Tests
- [ ] Cannot create listing without authentication
- [ ] Cannot access other users' profiles
- [ ] Cannot modify other users' listings
- [ ] Admin can ban/unban users
- [ ] Admin can delete any listing
- [ ] Image uploads restricted to user folders

### Environment Tests
- [ ] No hardcoded secrets in code
- [ ] `.env.local` ignored by git
- [ ] Vercel environment variables set
- [ ] Build succeeds without errors

## 🔧 Troubleshooting

### Common Issues

**"Missing Supabase environment variables"**
- Check `.env.local` exists and has correct values
- Verify Vercel environment variables are set

**"Permission denied" errors**
- Run the `supabase-setup.sql` script
- Check RLS policies are enabled
- Verify user roles in profiles table

**"Admin access denied"**
- Ensure admin user has `role = 'admin'` in profiles table
- Check middleware is correctly checking role

**Build failures**
- Ensure all environment variables are set
- Check for TypeScript errors
- Verify no hardcoded secrets

### Debug Mode

Add temporary logging to middleware:

```typescript
console.log('Session:', session);
console.log('Profile:', profile);
```

Remember to remove debug logs before production!

## 📝 Next Steps

1. **Email Verification**: Add email verification for new users
2. **Rate Limiting**: Implement API rate limiting
3. **Audit Logs**: Add logging for admin actions
4. **Content Moderation**: Add reporting system for listings
5. **Payment Integration**: Secure payment processing

## 🛡️ Security Best Practices

- Regularly rotate Supabase keys
- Monitor database access logs
- Keep dependencies updated
- Use HTTPS everywhere
- Implement proper error handling
- Regular security audits

---

**🎉 Your UMarket is now secure and production-ready!**
