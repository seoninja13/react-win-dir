# Simple script to move page-specific folders to the Website Pages directory

# Create Website Pages directory if it doesn't exist
if (-not (Test-Path "Website Pages")) {
    New-Item -Path "Website Pages" -ItemType Directory
    Write-Host "Created Website Pages directory"
} else {
    Write-Host "Website Pages directory already exists"
}

# Remove existing junction points in the Website Pages directory
Get-ChildItem -Path "Website Pages" -Directory | ForEach-Object {
    Remove-Item -Path $_.FullName -Force
    Write-Host "Removed: $($_.Name)"
}

# Define list of page-specific folders to move
$pageFolders = @(
    # Window Pages
    "windows", "awning", "bay-bow", "casement", "double-hung", "double-hung-new",
    "energy-efficient", "picture-window", "sliding", "wood-windows",
    
    # Door Pages
    "doors", "entry", "garage", "garden", "hinged-patio-doors", "patio",
    
    # Vinyl Siding Pages
    "vinyl-siding", "1000-series", "1500-series", "2000-series", "3000-series",
    "4000-series", "5000-series", "5000-series-backup",
    
    # Roofing Pages
    "roofing",
    
    # Information Pages
    "about", "blog", "blog-post", "contact", "faqs", "financing", "free-estimate-request",
    "gallery", "giving-back", "installation", "press", "recognition", "referral-program",
    "reviews", "satisfaction-survey", "service-areas", "shutters", "styles",
    "virtual-repair-center", "warranty", "warranty-new", "why-window-world", "window-style-finder",
    
    # Other Pages
    "custom", "home"
)

# Move each folder
$successCount = 0
$failCount = 0
$skippedCount = 0

foreach ($folder in $pageFolders) {
    if (Test-Path $folder) {
        try {
            Move-Item -Path $folder -Destination "Website Pages/$folder" -Force
            Write-Host "Successfully moved: $folder"
            $successCount++
        } catch {
            Write-Host "Error moving folder $folder: $($_.Exception.Message)"
            $failCount++
        }
    } else {
        Write-Host "Folder not found, skipping: $folder"
        $skippedCount++
    }
}

# Summary
Write-Host "Folder move operation completed."
Write-Host "Summary:"
Write-Host "  - Successfully moved: $successCount folders"
Write-Host "  - Failed to move: $failCount folders"
Write-Host "  - Skipped (not found): $skippedCount folders"
