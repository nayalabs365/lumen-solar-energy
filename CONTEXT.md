# Lumen Solar Energy - Development Context

## Project Overview
This is the **marketing website and lead form** for Lumen Solar. The main website is at lumensolar.energy, and the lead form is at start.lumensolar.energy (subdomain).

## Architecture

### Tech Stack
- **Framework**: Next.js 14 (App Router)
- **SMS Verification**: Twilio Verify API
- **Maps**: Google Maps JavaScript API (Places Autocomplete)
- **Report Integration**: Calls lumen-solar-report API
- **Deployment**: Vercel
- **Domains**:
  - lumensolar.energy (main website)
  - start.lumensolar.energy (lead form)

### Project Structure

```
/app
  /page.tsx              - Homepage (lumensolar.energy)
  /start/page.tsx        - Lead form (start.lumensolar.energy)
  /api
    /otp/send/route.ts   - Send OTP via Twilio
    /otp/verify/route.ts - Verify OTP code
/components
  /Navigation.tsx        - Site navigation
  /Footer.tsx           - Site footer
  /ChatWidget.tsx       - Floating chat button
  /start                - Lead form components
    /TopBar.tsx
    /ProgressBar.tsx
    /steps/*.tsx        - Step 1-4 components
    /OTPVerification.tsx
    /ProcessingLoader.tsx
/middleware.ts          - Subdomain routing logic
```

### Subdomain Routing

**Problem**: start.lumensolar.energy needs to show the lead form, not the homepage.

**Solution**: Middleware rewrites requests from start. subdomain to /start route.

**File**: `middleware.ts`
```typescript
if (hostname.startsWith('start.')) {
  if (request.nextUrl.pathname === '/') {
    return NextResponse.rewrite(new URL('/start', request.url));
  }
}
```

This keeps URLs clean (no /start visible in browser).

### Lead Form Flow

1. **Step 1**: Address + Ownership Status
   - Google Places Autocomplete for address
   - Validates address before continuing

2. **Step 2**: Property Type
   - Single Family, Townhouse, Condo, etc.
   - Shows satellite map preview

3. **Step 3**: Monthly Electric Bill
   - Slider from $30-$1000
   - Shows energy usage estimate

4. **Step 4**: Contact Information
   - Full name, email, phone number
   - Consent checkbox required

5. **Processing Loader** (3.5 seconds)
   - "Analyzing your home"

6. **OTP Verification** (if enabled)
   - Sends 6-digit code via Twilio SMS
   - 60-second resend timer
   - Auto-focuses inputs

7. **Second Loader** (2.5 seconds)
   - "Generating your solar report"

8. **Redirect to Report**
   - Calls report.lumensolar.energy/api/generate
   - Redirects to report page

### OTP Implementation (Twilio)

#### Send OTP
**Endpoint**: `/api/otp/send`
```typescript
// POST request
{
  "phone": "+12025551234"  // E.164 format required
}
```

**Process**:
1. Formats phone to E.164 (+1XXXXXXXXXX)
2. Calls Twilio Verify API to send SMS
3. Returns success/failure

**File**: `app/api/otp/send/route.ts`

#### Verify OTP
**Endpoint**: `/api/otp/verify`
```typescript
// POST request
{
  "phone": "+12025551234",
  "code": "123456"
}
```

**File**: `app/api/otp/verify/route.ts`

### Report Integration

**Endpoint**: Calls `NEXT_PUBLIC_REPORT_SERVICE_URL/api/generate`

**Request**:
```typescript
{
  firstName: formData.fullName.split(' ')[0],
  fullName: formData.fullName,
  email: formData.email,
  phone: formData.phone,
  address: formData.address,
  ownershipStatus: formData.ownership,
  propertyType: formData.propertyType,
  monthlyBill: formData.monthlyBill
}
```

**Response**:
```typescript
{
  success: true,
  reportUrl: "https://report.lumensolar.energy/r/uuid"
}
```

**File**: `app/start/page.tsx:106-140`

## Recent Issues Fixed (Feb 10, 2026)

### Issue 1: External Links Not Working
**Problem**: Clicking "Get Started" or "Chat with Lumen" navigated to wrong pages.

**Root Cause**: Next.js `<Link>` component doesn't work for external URLs (different domains).

**Fix**:
- Replaced `<Link href="https://start...">` with `<a href="https://start...">`
- Updated in Navigation, Footer, ChatWidget, and Homepage

**Files**:
- `components/Navigation.tsx:45, 94`
- `components/Footer.tsx:87-94`
- `components/ChatWidget.tsx:10`
- `app/page.tsx` (multiple locations)

### Issue 2: Subdomain Showing Homepage
**Problem**: start.lumensolar.energy showed "Meet Lumen" homepage instead of lead form.

**Root Cause**: No routing logic for subdomain.

**Fix**: Created middleware to rewrite start. subdomain to /start route.

**File**: `middleware.ts` (new file)

### Issue 3: TypeScript/ESLint Build Errors
**Problem**: Build failing in Vercel due to TypeScript errors.

**Errors Fixed**:
1. `error: any` → `error: unknown` with proper type checking
2. Missing react-hooks/exhaustive-deps (added eslint-disable)
3. Unused Link import after switching to <a> tags

**Files**:
- `app/api/otp/send/route.ts:46`
- `app/api/otp/verify/route.ts:57`
- `components/start/OTPVerification.tsx:35`

### Issue 4: Wrong Report Service URL
**Problem**: API calls failing with ERR_NAME_NOT_RESOLVED.

**Root Cause**: Vercel environment variable was set to `reports.lumensolar.energy` (plural).

**Fix**: Changed to `report.lumensolar.energy` (singular) in Vercel.

## Environment Variables (Vercel)

Required environment variables for production:

```bash
# Report Service Integration
NEXT_PUBLIC_REPORT_SERVICE_URL=https://report.lumensolar.energy

# Twilio OTP Configuration
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_twilio_auth_token_here
TWILIO_VERIFY_SERVICE_SID=VAxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Google Maps
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key

# Optional: Skip OTP for testing
NEXT_PUBLIC_SKIP_OTP=false
```

**Note**: Check `.env.local` file or Vercel dashboard for actual values.

## Current Status

### ✅ Working
- Main website (lumensolar.energy)
- Lead form (start.lumensolar.energy)
- Subdomain routing via middleware
- All 4 steps of lead form
- OTP verification via Twilio
- Report generation integration
- External navigation links
- Animated sun on homepage

### 🎨 Features
- **Animated Sun**: CSS animation on homepage hero
- **Chat Widget**: Floating button links to start.lumensolar.energy
- **Google Places Autocomplete**: For address input
- **Responsive Design**: Mobile + desktop optimized
- **Progress Indicator**: Shows steps 1-4
- **Processing Animations**: Between steps

### 📊 Analytics (Last 24 Hours)
- **6 leads** submitted successfully
- OTP verification working
- Reports generated for all leads

## Development Workflow

### Local Development
```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Access locally
open http://localhost:3000
```

### Testing Lead Form Locally
1. Access http://localhost:3000/start
2. Use approved phone number from Twilio dashboard
3. Set `NEXT_PUBLIC_SKIP_OTP=true` to skip SMS verification
4. Make sure report service is running on port 3001

### Deploy to Production
```bash
# Commit changes
git add -A
git commit -m "Your message"
git push

# Vercel auto-deploys from GitHub
```

## Related Projects

- **lumen-solar-report**: Report generation service at report.lumensolar.energy
  - Receives lead data from this form
  - Generates and displays solar reports
  - Returns report URL for redirect

## Next Steps / TODO

1. **Test OTP with more phone numbers** (add approved numbers in Twilio)
2. **Add form validation messages** for better UX
3. **Track conversion rates** (step dropoff analytics)
4. **A/B test** different CTA copy
5. **Add loading states** for API calls
6. **Error handling** for network failures
7. **Add Google Analytics** or similar tracking

## Important Notes

- **External URLs require <a> tags** - Don't use Next.js Link for different domains
- **Phone numbers must be E.164 format** - +1XXXXXXXXXX for Twilio
- **Middleware handles subdomain routing** - Don't add /start to URLs manually
- **CORS is handled by report service** - This frontend just makes POST requests
- **OTP can be skipped** - Set NEXT_PUBLIC_SKIP_OTP=true in development

## Contact & Resources

- **Vercel Project**: lumen-solar-energy
- **Production URLs**:
  - https://lumensolar.energy (main site)
  - https://start.lumensolar.energy (lead form)
- **GitHub Repo**: nayalabs365/lumen-solar-energy
- **Twilio Dashboard**: https://console.twilio.com

---

Last Updated: February 10, 2026
