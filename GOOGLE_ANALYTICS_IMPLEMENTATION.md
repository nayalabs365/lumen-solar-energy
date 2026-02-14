# Google Analytics 4 Implementation Summary

**Date Implemented:** February 14, 2026
**Project:** Lumen Solar Energy
**Domains:** lumensolar.energy & start.lumensolar.energy

---

## Overview

This document summarizes the complete Google Analytics 4 (GA4) implementation for the Lumen Solar Energy website and lead form. The implementation uses **two separate data streams** under one GA4 property, with subdomain-based detection to load the correct Measurement ID.

---

## Architecture

### Two GA4 Data Streams

| Domain | Measurement ID | Purpose |
|--------|---------------|---------|
| `lumensolar.energy` | `G-XCEKPBK0EB` | Main website tracking |
| `start.lumensolar.energy` | `G-X6JTZKLKJV` | Lead form funnel tracking |

### How It Works

1. **Subdomain Detection**: The `GoogleAnalytics` component detects the current hostname in the browser
2. **Dynamic ID Loading**: Based on the hostname, it loads the appropriate Measurement ID
3. **Native Integration**: Uses native gtag.js with Next.js `<Script>` component (no third-party packages)
4. **Event Tracking**: Custom events tracked via a centralized `trackEvent()` utility function

---

## Files Created

### Core Infrastructure

```
components/GoogleAnalytics.tsx       # Client component that loads GA script
lib/analytics.ts                     # trackEvent() utility function
types/gtag.d.ts                      # TypeScript declarations for window.gtag
```

### Tracking Components

```
components/CTAButton.tsx             # Reusable CTA button with click tracking
components/SectionViewTracker.tsx    # IntersectionObserver for section views
```

### Files Modified

```
app/layout.tsx                       # Added GoogleAnalytics + SectionViewTracker
app/page.tsx                         # Added CTA tracking to main page
app/start/page.tsx                   # Added lead form event tracking
components/Navigation.tsx            # Added navbar CTA tracking
components/Footer.tsx                # Added footer CTA tracking
.env.local                           # Added GA measurement IDs
```

---

## Environment Variables

Added to `.env.local` and Vercel:

```bash
# Main website (lumensolar.energy)
NEXT_PUBLIC_GA_ID_MAIN=G-XCEKPBK0EB

# Lead form subdomain (start.lumensolar.energy)
NEXT_PUBLIC_GA_ID_FORM=G-X6JTZKLKJV
```

**Note:** The `NEXT_PUBLIC_` prefix makes these accessible in browser JavaScript.

---

## Events Tracked

### Main Site Events (`lumensolar.energy`)

#### CTA Click Tracking
**Event Name:** `cta_click`
**When:** User clicks any call-to-action button
**Parameters:**
- `button_location`: `"hero"` | `"navbar"` | `"footer"` | `"savings_section"`

**Locations Tracked:**
- Hero section "Get Started" button
- Navbar "Chat with Lumen Now" button (desktop + mobile)
- Footer "Free Solar Report" and "Chat with Lumen" links
- Final CTA section "Get Your Free Solar Report" button

#### Section View Tracking
**Event Name:** `page_section_view`
**When:** User scrolls a section into viewport (30% visible)
**Parameters:**
- `section_name`: `"hero"` | `"how_it_works"` | `"trust"`

**Implementation:** Uses IntersectionObserver API to detect when sections enter viewport. Fires only once per section per page load.

---

### Lead Form Events (`start.lumensolar.energy`)

#### Form Step View
**Event Name:** `form_step_view`
**When:** Each step of the form loads
**Parameters:**
- `step_number`: 1-4
- `step_name`: `"address"` | `"property_type"` | `"electric_bill"` | `"contact_info"`

#### Form Step Complete
**Event Name:** `form_step_complete`
**When:** User advances from one step to the next
**Parameters:**
- `step_number`: 1-4
- `step_name`: `"address"` | `"property_type"` | `"electric_bill"` | `"contact_info"`

#### Address Entered
**Event Name:** `address_entered`
**When:** User submits their address in Step 1
**Parameters:** None

#### Homeowner Confirmed
**Event Name:** `homeowner_confirmed`
**When:** User selects "I own my home" in Step 1
**Parameters:** None

#### Electric Bill Entered
**Event Name:** `electric_bill_entered`
**When:** User submits their monthly electric bill amount in Step 3
**Parameters:**
- `bill_range`: Dollar amount (e.g., `"$180"`)

#### Lead Form Submit (KEY CONVERSION)
**Event Name:** `lead_form_submit`
**When:** User completes final step and submits contact information
**Parameters:** None

**⚠️ IMPORTANT:** This is your primary conversion event. Mark this as a conversion in GA4.

#### Form Abandoned
**Event Name:** `form_abandoned`
**When:** User leaves the page before completing the form
**Parameters:**
- `last_step`: Step number where user left (1-3)
- `last_step_name`: Name of the step where user left

**Note:** Only fires if user hasn't reached Step 4 (final step).

---

## How to Verify Tracking

### Method 1: Browser Network Tab

1. **Open Chrome DevTools** (F12 or Right-click → Inspect)
2. **Go to Network tab**
3. **Filter by "gtag"**
4. **Visit your site** and watch for:
   - `gtag/js?id=G-XCEKPBK0EB` (main site) or `G-X6JTZKLKJV` (lead form)
   - `collect?` requests when events fire

### Method 2: GA4 Realtime Dashboard

1. **Go to Google Analytics 4**
2. **Select your Lumen Solar property**
3. **Click "Realtime"** in the left sidebar
4. **While testing** (site open in another tab):
   - See active users count
   - See events appearing in the event list
   - Click on event names to see parameters

### Method 3: GA4 DebugView (Advanced)

1. **Install GA Debugger Chrome Extension**
2. **Enable debug mode**
3. **Visit your site** and see detailed event debugging

---

## Testing Checklist

### Main Site (`lumensolar.energy`)
- [ ] GA script loads with correct ID (`G-XCEKPBK0EB`)
- [ ] Hero CTA click tracked
- [ ] Navbar CTA click tracked
- [ ] Footer CTA click tracked
- [ ] Final CTA click tracked
- [ ] Hero section view tracked
- [ ] How It Works section view tracked
- [ ] Trust section view tracked

### Lead Form (`start.lumensolar.energy`)
- [ ] GA script loads with correct ID (`G-X6JTZKLKJV`)
- [ ] Step 1 view tracked
- [ ] Step 1 complete tracked
- [ ] Address entered tracked
- [ ] Homeowner confirmed tracked (if selected)
- [ ] Step 2 view tracked
- [ ] Step 2 complete tracked
- [ ] Step 3 view tracked
- [ ] Step 3 complete tracked
- [ ] Electric bill entered tracked
- [ ] Step 4 view tracked
- [ ] Step 4 complete tracked
- [ ] Lead form submit tracked (CONVERSION)
- [ ] Form abandoned tracked (leave mid-form)

---

## GA4 Dashboard Setup

### Set Up Conversion Event

1. Go to **Admin** (bottom left gear icon)
2. Under **Data display**, click **Events**
3. Find `lead_form_submit` in the event list
4. Toggle **"Mark as conversion"** to ON
5. Event will now appear in Conversions reports

### Recommended Reports to Create

1. **CTA Performance Report**
   - Dimension: `button_location`
   - Metric: Event count for `cta_click`
   - Shows which CTAs drive the most engagement

2. **Form Funnel Report**
   - Events: `form_step_view`, `form_step_complete`, `lead_form_submit`
   - Shows drop-off rates at each step

3. **Form Abandonment Analysis**
   - Event: `form_abandoned`
   - Dimension: `last_step_name`
   - Shows where users abandon the form

---

## Code Examples

### Tracking a Custom Event

```typescript
import { trackEvent } from '@/lib/analytics';

// Basic event
trackEvent('button_click', {});

// Event with parameters
trackEvent('cta_click', {
  button_location: 'hero',
});

// Event with multiple parameters
trackEvent('form_step_complete', {
  step_number: 2,
  step_name: 'property_type',
});
```

### Adding a New CTA Button

```tsx
import CTAButton from '@/components/CTAButton';

<CTAButton
  href="https://start.lumensolar.energy"
  className="your-css-classes"
  location="hero" // or "navbar", "footer", "savings_section"
>
  Button Text
</CTAButton>
```

### Adding Section View Tracking

Add `data-section-name` attribute to any section:

```tsx
<section data-section-name="testimonials" className="...">
  {/* Section content */}
</section>
```

The `SectionViewTracker` component will automatically detect and track it.

---

## Technical Details

### Why Two Measurement IDs?

Separating main site and lead form into different data streams allows you to:
- Analyze main site engagement separately from lead form conversion funnel
- Set different event tracking configurations
- Create stream-specific audiences
- Compare performance across domains

### How Subdomain Detection Works

```typescript
// components/GoogleAnalytics.tsx (simplified)
const hostname = window.location.hostname;

if (hostname.includes('start.')) {
  gaId = 'G-X6JTZKLKJV'; // Lead form
} else {
  gaId = 'G-XCEKPBK0EB'; // Main site
}
```

### Safe Event Tracking

The `trackEvent()` function checks if gtag exists before calling it:

```typescript
export function trackEvent(eventName: string, params?: Record<string, unknown>) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, params);
  }
}
```

This prevents errors if:
- User has ad blockers enabled
- GA script fails to load
- Script is still loading

---

## Maintenance Notes

### Adding New Events

1. **Decide event name and parameters**
2. **Import trackEvent** where you need it
3. **Call trackEvent()** at the appropriate time
4. **Test in Network tab** to verify
5. **Check GA4 Realtime** to confirm data flowing

### Modifying Existing Events

1. **Update the trackEvent() call** with new parameters
2. **Test thoroughly** before deploying
3. **Document changes** in this file or code comments

### Environment Variables

If you need to change Measurement IDs:
1. Update `.env.local` locally
2. Update Vercel environment variables (Settings → Environment Variables)
3. Redeploy (or they'll apply on next deployment)

---

## Troubleshooting

### Events Not Appearing in GA4

**Check:**
- [ ] Is GA script loading? (Network tab should show gtag/js request)
- [ ] Is correct Measurement ID loading? (Check Network tab URL)
- [ ] Are events firing? (Network tab should show collect? requests)
- [ ] Is GA4 property ID correct in environment variables?
- [ ] Are you looking at the correct data stream in GA4?

### Wrong Measurement ID Loading

**Check:**
- [ ] Are you on the correct subdomain?
- [ ] Is `window.location.hostname` detecting correctly?
- [ ] Are environment variables set correctly in Vercel?

### Events Fire Locally but Not in Production

**Check:**
- [ ] Environment variables set in Vercel (not just locally)
- [ ] Latest code deployed to Vercel
- [ ] Clear browser cache and hard reload

---

## Future Enhancements

### Potential Additions

1. **User Journey Tracking**: Track the path users take through the site
2. **Scroll Depth Tracking**: Track how far down the page users scroll
3. **Video Engagement**: If you add videos, track play/pause/complete
4. **Link Clicks**: Track specific external link clicks
5. **Download Tracking**: If you add PDF downloads or resources
6. **Search Tracking**: If you add a search feature
7. **Error Tracking**: Track JavaScript errors or failed API calls

### Enhanced Conversion Tracking

1. **Revenue Tracking**: If you add pricing/payments
2. **Goal Completion Time**: Track how long it takes to complete the form
3. **Return User Analysis**: Track if converted leads return to the site
4. **Attribution Modeling**: Track which marketing channels drive conversions

---

## Resources

- [GA4 Documentation](https://support.google.com/analytics/topic/9303319)
- [GA4 Event Reference](https://developers.google.com/analytics/devguides/collection/ga4/events)
- [Next.js Script Component](https://nextjs.org/docs/app/api-reference/components/script)
- [IntersectionObserver API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)

---

## Git Commits

**Initial Implementation:**
- Commit: `864de30`
- Message: "Add Google Analytics 4 tracking with subdomain-specific measurement IDs"

**ESLint Fixes:**
- Commit: `1d61797`
- Message: "Fix ESLint errors: replace 'any' with 'unknown' and remove unused variable"

---

## Support

If you need to modify or extend this implementation, refer to:
- `lib/analytics.ts` - Core tracking utility
- `components/GoogleAnalytics.tsx` - GA initialization
- This documentation file

**Last Updated:** February 14, 2026
