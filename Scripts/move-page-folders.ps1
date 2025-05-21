# PowerShell script to move page-specific folders to the Website Pages directory
# Created: May 21, 2025

# Set error action preference to stop on error
$ErrorActionPreference = "Stop"

# Define log file
$logFile = "move-page-folders-log.txt"

# Function to write to log file
function Write-Log {
    param (
        [string]$message
    )

    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    "$timestamp - $message" | Out-File -Append -FilePath $logFile
    Write-Host $message
}

# Clear log file if it exists
if (Test-Path $logFile) {
    Clear-Content $logFile
}

Write-Log "Starting page folder reorganization process..."

# Check if Website Pages directory exists, create it if not
if (-not (Test-Path "Website Pages")) {
    Write-Log "Creating Website Pages directory..."
    New-Item -Path "Website Pages" -ItemType Directory | Out-Null
    Write-Log "Website Pages directory created."
} else {
    Write-Log "Website Pages directory already exists."
}

# Remove existing junction points in the Website Pages directory
Write-Log "Removing existing junction points in Website Pages directory..."
try {
    Get-ChildItem -Path "Website Pages" -Directory | ForEach-Object {
        Write-Log "Removing junction point: $($_.Name)"
        Remove-Item -Path $_.FullName -Force
    }
    Write-Log "All junction points removed successfully."
} catch {
    Write-Log "Error removing junction points: $_"
    exit 1
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
            Write-Log "Moving folder: $folder to Website Pages/$folder"
            Move-Item -Path $folder -Destination "Website Pages/$folder" -Force
            Write-Log "Successfully moved: $folder"
            $successCount++
        } catch {
            Write-Log "Error moving folder $folder: $($_.Exception.Message)"
            $failCount++
        }
    } else {
        Write-Log "Folder not found, skipping: $folder"
        $skippedCount++
    }
}

# Summary
Write-Log "Folder move operation completed."
Write-Log "Summary:"
Write-Log "  - Successfully moved: $successCount folders"
Write-Log "  - Failed to move: $failCount folders"
Write-Log "  - Skipped (not found): $skippedCount folders"

if ($failCount -eq 0) {
    Write-Log "All folders were moved successfully or skipped."
} else {
    Write-Log "Some folders failed to move. Check the log for details."
}

Write-Log "Page folder reorganization process completed."
