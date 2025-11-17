# Fresh Tropics Product Scraper
# Run this to fetch real product data from tropicalfruitbox.com

Write-Host "`n🍎 Fresh Tropics Product Scraper" -ForegroundColor Green
Write-Host "================================`n" -ForegroundColor Green

# Check if Node.js is installed
$nodeVersion = node --version 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Error: Node.js is not installed or not in PATH" -ForegroundColor Red
    Write-Host "Please install Node.js from https://nodejs.org/" -ForegroundColor Yellow
    exit 1
}

Write-Host "✓ Node.js detected: $nodeVersion`n" -ForegroundColor Green

# Run the scraper
Write-Host "Starting product scraper..." -ForegroundColor Cyan
Write-Host "(This may take 30-60 seconds...)`n" -ForegroundColor Cyan

node "$PSScriptRoot\scrape-products.js"

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n✅ Scraping complete!" -ForegroundColor Green
    Write-Host "Your products have been imported into src/lib/data.ts" -ForegroundColor Green
    Write-Host "`nNext steps:" -ForegroundColor Cyan
    Write-Host "1. Restart the dev server (Ctrl+C then 'npm run dev')" -ForegroundColor White
    Write-Host "2. Visit http://localhost:3000/shop to see your products" -ForegroundColor White
    Write-Host "3. Edit src/lib/data.ts to refine prices, images, or descriptions`n" -ForegroundColor White
} else {
    Write-Host "`n❌ Scraper failed. Check the error above." -ForegroundColor Red
    exit 1
}
