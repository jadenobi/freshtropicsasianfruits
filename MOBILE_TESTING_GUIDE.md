# 📱 Mobile Testing Quick Reference

## How to Test Mobile Responsiveness

### Option 1: Browser DevTools (Fastest)
1. **Open DevTools**: F12 or Ctrl+Shift+I
2. **Toggle Device Mode**: Ctrl+Shift+M (or click device icon)
3. **Select Device**: Choose iPhone SE, iPhone 14, Galaxy S21, etc.
4. **Test Interactions**:
   - Tap hamburger menu (should open fixed menu)
   - Scroll mobile menu (should be scrollable)
   - Click/tap product images (should enlarge or link)
   - Fill form inputs (should be 16px font, no zoom)
   - Click buttons (should have visual feedback)

### Option 2: Actual Device Testing (Recommended)
1. **Start dev server**: `npm run dev`
2. **Get your IP**: `ipconfig getifaddr en0` (Mac) or see terminal output
3. **On mobile**: Navigate to `http://YOUR_IP:3000`
4. **Test**:
   - Touch menu toggle → should animate smoothly
   - Scroll product grid → should show correct number of columns
   - Type in search → should not zoom (16px font)
   - Tap buttons → should have 44px+ touch targets

### Option 3: Remote Testing with ngrok
```bash
# In terminal 1: Start dev server
npm run dev

# In terminal 2: Create secure tunnel
ngrok http 3000

# Copy ngrok URL (https://xxxxx.ngrok.io)
# Test on any device with that URL
```

## Key Mobile Features to Verify

### Navigation ✓
- [x] Hamburger menu appears on small screens
- [x] Menu slides in from left with fixed positioning
- [x] Backdrop overlay dismisses menu on tap
- [x] Menu items are touch-friendly (44px height)
- [x] Menu scrolls if content exceeds viewport

### Forms ✓
- [x] No auto-zoom on input focus (16px font)
- [x] Inputs have proper padding (44px height)
- [x] Keyboard appears without zoom
- [x] Labels are readable and tappable
- [x] Error states are visible

### Products ✓
- [x] Grid: 1 col on mobile, 2 on tablet, 3-4 on desktop
- [x] Product images are responsive
- [x] Add to cart button: 44px+ touch target
- [x] Price is prominent and readable
- [x] Out of stock overlay is clear

### Checkout ✓
- [x] Cart page collapses to single column
- [x] Order summary is sticky and readable
- [x] Buttons are touch-friendly
- [x] Step indicators don't overflow
- [x] Total price is clearly visible

## Browser Viewport Sizes to Test

| Device | Width | Height |
|--------|-------|--------|
| iPhone SE | 375px | 667px |
| iPhone 12/13 | 390px | 844px |
| iPhone 14 Pro Max | 430px | 932px |
| Galaxy S21 | 360px | 800px |
| iPad | 768px | 1024px |
| iPad Pro | 1024px | 1366px |

## Common Mobile Issues Checklist

- [ ] **Horizontal Scroll**: Check for overflow on search bar, product cards, buttons
- [ ] **Touch Targets Too Small**: All buttons/links should be ≥44x44px
- [ ] **Input Zoom**: Inputs should have font-size: 16px or higher
- [ ] **Menu Issues**: Menu should be scrollable and dismissible
- [ ] **Image Issues**: Images should be responsive with proper srcset
- [ ] **Font Issues**: Text should be readable (not too small)
- [ ] **Color Contrast**: Text should be readable against background
- [ ] **Keyboard**: Should not cover important form fields

## CSS Classes Added for Mobile

```css
/* In globals.css */
touch-target    /* min-height: 44px */
-webkit-appearance: none  /* Remove iOS styling */
font-size: 16px  /* Prevent iOS zoom */
touch-action: manipulation  /* Disable double-tap zoom */
```

## Testing Commands

```bash
# Build for production
npm run build

# Start dev server (already running)
npm run dev

# Check for console errors (DevTools Console)
# Check Network tab for image sizes
# Check Performance tab for CLS, LCP, FID

# Test Lighthouse (after build)
npx lighthouse http://localhost:3000
```

## Quick Debugging Tips

### Input keeps zooming on iOS?
- Ensure font-size is ≥ 16px
- Check for -webkit-appearance: none
- Verify style={{ fontSize: '16px' }} is set

### Menu doesn't scroll on mobile?
- Check for overflow-y-auto on menu container
- Ensure fixed positioning is set correctly
- Verify height is not capped by parent

### Button text wraps unexpectedly?
- Check button width constraints
- Use white-space: nowrap if needed
- Adjust padding for mobile

### Images don't responsive?
- Verify max-w-full is set
- Check srcset attributes
- Ensure parent has proper width

## Device-Specific Issues

### iOS Safari (Most Common)
- Input zoom (FIXED: 16px font, -webkit-appearance)
- Bounce scroll (FIXED: -webkit-overflow-scrolling: touch)
- Viewport meta tag (FIXED: in layout.tsx)
- Safe area insets (FIXED: CSS variables)

### Android Chrome
- Touch feedback (FIXED: active:scale-95)
- Tap highlight (FIXED: -webkit-tap-highlight-color)
- Scrolling performance (FIXED: touch-action)

## Performance Targets for Mobile

- **First Paint**: < 1.5s
- **First Contentful Paint**: < 1.8s
- **Largest Contentful Paint**: < 2.5s
- **First Input Delay**: < 100ms
- **Cumulative Layout Shift**: < 0.1

## Next Steps

1. Test on actual iOS device (iPhone)
2. Test on actual Android device (Samsung/Pixel)
3. Test on tablet (iPad/Galaxy Tab)
4. Run Lighthouse for each device type
5. Monitor mobile analytics post-launch

## Resources

- [Chrome DevTools Mobile Emulation](https://developer.chrome.com/docs/devtools/device-mode/)
- [iOS Safari Compatibility](https://caniuse.com/usage-table)
- [Mobile Web Best Practices](https://web.dev/mobile-ux-checklist/)

---

**Site**: Fresh Tropics Asian Fruits  
**Framework**: Next.js 16 + React 19 + Tailwind CSS 4  
**Target**: Responsive, accessible, touch-friendly experience
