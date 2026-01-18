#!/bin/bash

# Configuration
GENERATED_DIR="generated_citations"

# Check if gh cli is installed
if ! command -v gh &> /dev/null;
    then
    echo "Error: GitHub CLI (gh) is not installed."
    exit 1
fi

# Ensure we are logged in
if ! gh auth status &> /dev/null;
    then
    echo "Error: You are not logged in to GitHub CLI. Run 'gh auth login' first."
    exit 1
fi

echo "Starting CITATION.cff PR creation process..."

# Iterate through generated CFF files
for cff_file in "$GENERATED_DIR"/*.cff; do
    [ -e "$cff_file" ] || continue

    # Extract repo URL from CFF content
    repo_url=$(grep "repository-code:" "$cff_file" | awk '{print $2}')

    if [ -z "$repo_url" ]; then
        echo "  Warning: No repository-code found in $cff_file. Skipping."
        continue
    fi

    # Extract owner/repo from URL (remove https://github.com/ and .git if present)
    # Also handle trailing slashes just in case
    full_repo_name=$(echo "$repo_url" | sed -e 's/https:\/\/github.com\///' -e 's/\.git$//' -e 's/\/$//')
    
    echo "Processing $full_repo_name..."

    # Check if repo exists/accessible
    if ! gh repo view "$full_repo_name" &> /dev/null; then
         echo "  Warning: Repository $full_repo_name not found or not accessible. Skipping."
         continue
    fi

    # Clone the repo to a temp directory
    # Use just the repo name for the directory to avoid nested dirs
    repo_slug=$(basename "$full_repo_name")
    temp_repo_dir="_temp_repos/$repo_slug"
    
    if [ -d "$temp_repo_dir" ]; then
        rm -rf "$temp_repo_dir"
    fi
    
    echo "  Cloning $full_repo_name..."
    gh repo clone "$full_repo_name" "$temp_repo_dir" -- -q

    # Copy the new CFF file
    cp "$cff_file" "$temp_repo_dir/CITATION.cff"

    # Navigate to temp repo
    pushd "$temp_repo_dir" > /dev/null

    # Check for changes
    if git diff --quiet CITATION.cff;
        then
        echo "  No changes detected in CITATION.cff. Skipping."
    else
        # Create branch
        branch_name="update-citation-cff-$(date +%Y%m%d-%H%M%S)"
        git checkout -b "$branch_name"

        # Commit changes
        git add CITATION.cff
        git commit -m "chore: update CITATION.cff with latest metadata"

        # Push branch (this might fail if we don't have write access, so we capture that)
        if git push origin "$branch_name"; then
            # Create Pull Request
            gh pr create \
                --title "chore: update CITATION.cff metadata" \
                --body "This PR updates the CITATION.cff file with the latest metadata from the central website configuration. This ensures accurate citations for this lesson." \
                --base main \
                --head "$branch_name"

            echo "  Pull Request created successfully!"
        else
            echo "  Error: Could not push to '$full_repo_name'. You might not have write access. If this is an external repo, you would need to fork it first."
        fi
    fi

    # Cleanup
    popd > /dev/null
    rm -rf "$temp_repo_dir"
done

echo "All PRs processed."