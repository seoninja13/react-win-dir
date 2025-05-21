# PowerShell script to update import paths in src/app pages
# Created: May 21, 2025

# Set error action preference to stop on error
$ErrorActionPreference = "Stop"

# Define log file
$logFile = "update-import-paths-log.txt"

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

Write-Log "Starting import path update process..."

# Define the src/app directory
$srcAppDir = "src/app"

# Check if src/app directory exists
if (-not (Test-Path $srcAppDir)) {
    Write-Log "Error: src/app directory not found."
    exit 1
}

# Define list of page-specific folders that were moved
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

# Get all TypeScript and JavaScript files in src/app directory
$files = Get-ChildItem -Path $srcAppDir -Recurse -Include "*.ts", "*.tsx", "*.js", "*.jsx"

$updatedCount = 0
$errorCount = 0
$unchangedCount = 0

foreach ($file in $files) {
    Write-Log "Processing file: $($file.FullName)"
    
    # Read file content
    $content = Get-Content -Path $file.FullName -Raw
    $originalContent = $content
    $updated = $false
    
    # Check for imports from each page folder
    foreach ($folder in $pageFolders) {
        # Define regex patterns for different import styles
        $patterns = @(
            "from\s+['\"]\.\.\/\.\.\/\.\.\/($folder)['\"]",
            "from\s+['\"]\.\.\/\.\.\/\.\.\/($folder)\/",
            "from\s+['\"]\.\.\/\.\.\/($folder)['\"]",
            "from\s+['\"]\.\.\/\.\.\/($folder)\/",
            "from\s+['\"]\.\.\/($folder)['\"]",
            "from\s+['\"]\.\.\/($folder)\/"
        )
        
        foreach ($pattern in $patterns) {
            if ($content -match $pattern) {
                Write-Log "  Found import from $folder"
                
                # Replace the import path
                $newPattern = $pattern -replace "\(\$folder\)", "Website Pages/$folder"
                $content = $content -replace $pattern, $newPattern
                $updated = $true
            }
        }
    }
    
    # Save the file if it was updated
    if ($updated) {
        try {
            Set-Content -Path $file.FullName -Value $content
            Write-Log "  Updated import paths in: $($file.FullName)"
            $updatedCount++
        } catch {
            Write-Log "  Error updating file $($file.FullName): $_"
            $errorCount++
        }
    } else {
        Write-Log "  No import paths to update in: $($file.FullName)"
        $unchangedCount++
    }
}

# Summary
Write-Log "Import path update process completed."
Write-Log "Summary:"
Write-Log "  - Updated: $updatedCount files"
Write-Log "  - Unchanged: $unchangedCount files"
Write-Log "  - Errors: $errorCount files"

if ($errorCount -eq 0) {
    Write-Log "All files were processed successfully."
} else {
    Write-Log "Some files had errors during processing. Check the log for details."
}

Write-Log "Import path update process completed."
