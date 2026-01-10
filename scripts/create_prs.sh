#!/bin/bash

# Configuration
GITHUB_ORG="ucla-imls-open-sci"
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

    # Extract repo name from filename (assuming format CITATION-repo-name.cff)
    # This matches the output format of our python script
    filename=$(basename "$cff_file")
    repo_name_with_prefix="${filename%.cff}"
    repo_name="${repo_name_with_prefix#CITATION-}"

    # Special handling for known repos if naming doesn't match exactly
    # Ideally, generate_lesson_cffs.py should output exact repo names
    # For now, let's assume the python script does a good job of slugifying to match repo names
    # or we can maintain a mapping here if needed.

    echo "Processing $repo_name..."

    # Check if repo exists
    if ! gh repo view "$GITHUB_ORG/$repo_name" &> /dev/null;
        then
        echo "  Warning: Repository $GITHUB_ORG/$repo_name not found. Skipping."
        continue
    fi

    # Clone the repo to a temp directory
    temp_repo_dir="_temp_repos/$repo_name"
    if [ -d "$temp_repo_dir" ]; then
        rm -rf "$temp_repo_dir"
    fi
    
    echo "  Cloning $GITHUB_ORG/$repo_name..."
    gh repo clone "$GITHUB_ORG/$repo_name" "$temp_repo_dir" -- -q

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
        branch_name="update-citation-cff-$(date +%Y%m%d)"
        git checkout -b "$branch_name"

        # Commit changes
        git add CITATION.cff
        git commit -m "chore: update CITATION.cff with latest metadata"

        # Push branch
        git push origin "$branch_name"

        # Create Pull Request
        gh pr create \
            --title "chore: update CITATION.cff metadata" \
            --body "This PR updates the CITATION.cff file with the latest metadata from the central website configuration. This ensures accurate citations for this lesson." \
            --base main \
            --head "$branch_name"

        echo "  Pull Request created successfully!"
    fi

    # Cleanup
    popd > /dev/null
    rm -rf "$temp_repo_dir"
done

echo "All PRs processed."