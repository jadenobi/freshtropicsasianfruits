# Script to add image galleries to products in data.ts
$filePath = "c:\Users\OBI AKOM\OneDrive\Documents\fruit-selling-website\src\lib\data.ts"

# Read file with UTF-8 encoding
$content = Get-Content $filePath -Raw -Encoding UTF8

# Define product galleries to add
$galleries = @{
    '8083148669113' = @(
        'https://cdn.shopify.com/s/files/1/0054/9512/8152/files/HappyBirthday_PG2.jpg?v=1762459650',
        'https://cdn.shopify.com/s/files/1/0054/9512/8152/files/Photoroom_20250426_100512.jpg?v=1762459650',
        'https://cdn.shopify.com/s/files/1/0054/9512/8152/files/PinkGlowDM_Lifestyle_V1.jpg?v=1762459123',
        'https://cdn.shopify.com/s/files/1/0054/9512/8152/files/Photoroom_20250524_105459.jpg?v=1762457858'
    )
    '7602635440313' = @(
        'https://cdn.shopify.com/s/files/1/0054/9512/8152/files/HoneyKiss12lbs3.jpg?v=1759439190',
        'https://cdn.shopify.com/s/files/1/0054/9512/8152/files/Rainbow_Mangos_8lbs_3.jpg?v=1762458371',
        'https://cdn.shopify.com/s/files/1/0054/9512/8152/files/Francismangos_2_3lbs_V1.jpg?v=1759439243'
    )
    '7598847131833' = @(
        'https://cdn.shopify.com/s/files/1/0054/9512/8152/files/CoconutCream16lbs3.jpg?v=1759439178',
        'https://cdn.shopify.com/s/files/1/0054/9512/8152/files/HoneyKiss12lbs3.jpg?v=1759439190',
        'https://cdn.shopify.com/s/files/1/0054/9512/8152/files/Francismangos_2_3lbs_V1.jpg?v=1759439243',
        'https://cdn.shopify.com/s/files/1/0054/9512/8152/files/Ataulfo_Mango_8lbs_3.jpg?v=1762457857'
    )
    '7876200169657' = @(
        'https://cdn.shopify.com/s/files/1/0054/9512/8152/files/Pineappleguava3lbs2.jpg?v=1762459269',
        'https://cdn.shopify.com/s/files/1/0054/9512/8152/files/MixedGuava8lbs2.jpg?v=1762458153',
        'https://cdn.shopify.com/s/files/1/0054/9512/8152/products/Chinese-Guava-Box-3.jpg?v=1759439125'
    )
    '6931366936761' = @(
        'https://cdn.shopify.com/s/files/1/0054/9512/8152/products/5MiniPineappleDiag.jpg?v=1759439112',
        'https://cdn.shopify.com/s/files/1/0054/9512/8152/files/Photoroom_20250524_105459.jpg?v=1762457858',
        'https://cdn.shopify.com/s/files/1/0054/9512/8152/products/pineappletrioboxdiag.jpg?v=1759439111'
    )
    '7630127202489' = @(
        'https://cdn.shopify.com/s/files/1/0054/9512/8152/files/Greendragonapples5lbs3.jpg?v=1759439198',
        'https://cdn.shopify.com/s/files/1/0054/9512/8152/products/Temdadfaplate.jpg?v=1762457627',
        'https://cdn.shopify.com/s/files/1/0054/9512/8152/files/Manzanos8lbs3.jpg?v=1762458065'
    )
    '7275495260345' = @(
        'https://cdn.shopify.com/s/files/1/0054/9512/8152/files/Red_Dragon_3lbs_3.jpg?v=1759439126',
        'https://cdn.shopify.com/s/files/1/0054/9512/8152/files/YellowDragon5lbs2.jpg?v=1762457592',
        'https://cdn.shopify.com/s/files/1/0054/9512/8152/files/Red_Dragon_Flesh_5lbs_2.jpg?v=1762457603'
    )
    '7471531425977' = @(
        'https://cdn.shopify.com/s/files/1/0054/9512/8152/files/Tropikids_3_V1.jpg?v=1762458456',
        'https://cdn.shopify.com/s/files/1/0054/9512/8152/files/TropiSpringMOM3_07f3091b-bd05-4382-bf46-a082086bcd63.jpg?v=1759439265',
        'https://cdn.shopify.com/s/files/1/0054/9512/8152/files/Photoroom_20250425_080737.png?v=1762459231'
    )
}

# Process each product
$modified = 0
foreach ($productId in $galleries.Keys) {
    $imageUrls = $galleries[$productId]
    $imageLines = @()
    foreach ($url in $imageUrls) {
        $imageLines += "      '$url'"
    }
    $imageArray = $imageLines -join ",`n"
    
    # Find and replace empty images arrays for this product
    $pattern = "(id: '$productId',[\s\S]*?image: '[^']+',\s*)images: \[\s*\],"
    $replacement = "`$1images: [`n$imageArray`n    ],"
    
    if ($content -match $pattern) {
        $content = $content -replace $pattern, $replacement
        $modified++
        Write-Host "Added gallery to product $productId"
    } else {
        Write-Host "Could not find product $productId with empty images array"
    }
}

# Save the file
Set-Content $filePath -Value $content -Encoding UTF8
Write-Host "Modified $modified products"
