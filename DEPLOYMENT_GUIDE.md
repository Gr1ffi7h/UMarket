# UMarket Deployment Guide

## 🚀 Quick Setup

### 1. Environment Variables

Create `.env.local` in your project root:

```bash
# Supabase Configuration (REQUIRED)
NEXT_PUBLIC_SUPABASE_URL=YOUR_PROJECT_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_ANON_KEY
```

**⚠️ NEVER commit `.env.local` to git!**

### 2. Supabase Database Setup

1. Go to your Supabase project → SQL Editor
2. Copy and paste contents of `database-setup.sql`
3. Run the script to create tables and security policies

### 3. Create Admin User

1. Sign up normally with:
   - Email: `Admin@uni.edu`
   - Password: Choose any password (8+ characters)

2. Go to Supabase → Table Editor → profiles
3. Find your user and change `role` to `admin`

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

### ✅ Admin Panel Features
- View all users with role management (ban/unban)
- View all listings with deletion capability
- View all conversations with deletion capability
- Clean, minimal UI with dark mode support

### ✅ Real-Time Messaging
- Cross-device synchronization using Supabase Realtime
- Instant message updates across all logged-in devices
- Secure conversation access control

### ✅ Modern UI Features
- Minimal, clean design with no emojis
- Light/dark mode toggle with localStorage persistence
- Fully responsive design
- Smooth transitions and micro-interactions

## 🌐 Vercel Deployment

### 1. Push to GitHub

```bash
git add .
git commit -m "Implement secure UMarket with Supabase auth and real-time messaging"
git push origin main
```

### 2. Vercel Configuration

1. Connect your GitHub repo to Vercel
2. Add environment variables in Vercel Dashboard:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 3. Deploy

Vercel will automatically deploy when you push to main branch.

## 🧪 Testing Checklist

### Authentication Tests
- [ ] Unauthenticated users redirected from protected routes
- [ ] Authenticated users can access all features
- [ ] Admin users can access `/admin`
- [ ] Non-admin users redirected from `/admin`

### Security Tests
- [ ] No hardcoded secrets in code
- [ ] Environment variables properly configured
- [ ] RLS policies working correctly
- [ ] Admin functions properly secured

### UI Tests
- [ ] Light/dark mode toggle works
- [ ] Responsive design on mobile/tablet
- [ ] No emojis or placeholder content
- [ ] Clean, minimal interface

### Functionality Tests
- [ ] User registration and login
- [ ] Listing creation and management
- [ ] Real-time messaging between devices
- [ ] Admin panel functions correctly

## 🛡️ Production Considerations

### Security
- All sensitive data uses environment variables
- Row Level Security prevents unauthorized access
- Admin actions properly logged and validated
- No hardcoded credentials anywhere

### Performance
- Optimized images and fonts
- Efficient database queries with proper indexes
- Minimal JavaScript bundle size

### Accessibility
- Semantic HTML5 structure
- ARIA labels on all interactive elements
- Keyboard navigation support
- Screen reader compatibility

---

**🎉 Your UMarket is now production-ready with modern security and real-time features!**
