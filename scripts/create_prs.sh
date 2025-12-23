#!/bin/bash
# Auto-generated script to create CFF PRs

mkdir -p _temp_repos
cd _temp_repos

echo 'Processing lc-open-reproducible-research-cloud...
gh repo fork https://github.com/kerchner/lc-open-reproducible-research-cloud --clone --default-branch-only
cd lc-open-reproducible-research-cloud || exit
git checkout -b add-citation-cff
cp '/Users/timdennis/websites/ucla-imls-open-sci.github.io/generated_citations/CITATION-open-and-reproducible-research-cloud-workflows-a-firsthand-experience-for-librarians.cff' CITATION.cff
git add CITATION.cff
git commit -m 'Docs: Add CITATION.cff file'
git push -u origin add-citation-cff
gh pr create --title 'Docs: Add CITATION.cff' --body 'This PR adds a CITATION.cff file to make the lesson citable, generated from the IMLS Open Science project metadata.' --repo https://github.com/kerchner/lc-open-reproducible-research-cloud
cd ..
rm -rf lc-open-reproducible-research-cloud
echo '--------------------------------'

echo 'Processing lc-multilingual-search-discovery-system...
gh repo fork https://github.com/ucla-imls-open-sci/lc-multilingual-search-discovery-system --clone --default-branch-only
cd lc-multilingual-search-discovery-system || exit
git checkout -b add-citation-cff
cp '/Users/timdennis/websites/ucla-imls-open-sci.github.io/generated_citations/CITATION-collaborative-multilingual-search-and-discovery-systems.cff' CITATION.cff
git add CITATION.cff
git commit -m 'Docs: Add CITATION.cff file'
git push -u origin add-citation-cff
gh pr create --title 'Docs: Add CITATION.cff' --body 'This PR adds a CITATION.cff file to make the lesson citable, generated from the IMLS Open Science project metadata.' --repo https://github.com/ucla-imls-open-sci/lc-multilingual-search-discovery-system
cd ..
rm -rf lc-multilingual-search-discovery-system
echo '--------------------------------'

echo 'Processing lc-authoring-open-science...
gh repo fork https://github.com/ucla-imls-open-sci/lc-authoring-open-science --clone --default-branch-only
cd lc-authoring-open-science || exit
git checkout -b add-citation-cff
cp '/Users/timdennis/websites/ucla-imls-open-sci.github.io/generated_citations/CITATION-authoring-open-science.cff' CITATION.cff
git add CITATION.cff
git commit -m 'Docs: Add CITATION.cff file'
git push -u origin add-citation-cff
gh pr create --title 'Docs: Add CITATION.cff' --body 'This PR adds a CITATION.cff file to make the lesson citable, generated from the IMLS Open Science project metadata.' --repo https://github.com/ucla-imls-open-sci/lc-authoring-open-science
cd ..
rm -rf lc-authoring-open-science
echo '--------------------------------'

echo 'Processing lc-open-science-community-of-practice...
gh repo fork https://github.com/ucla-imls-open-sci/lc-open-science-community-of-practice --clone --default-branch-only
cd lc-open-science-community-of-practice || exit
git checkout -b add-citation-cff
cp '/Users/timdennis/websites/ucla-imls-open-sci.github.io/generated_citations/CITATION-building-an-open-science-community-of-practice.cff' CITATION.cff
git add CITATION.cff
git commit -m 'Docs: Add CITATION.cff file'
git push -u origin add-citation-cff
gh pr create --title 'Docs: Add CITATION.cff' --body 'This PR adds a CITATION.cff file to make the lesson citable, generated from the IMLS Open Science project metadata.' --repo https://github.com/ucla-imls-open-sci/lc-open-science-community-of-practice
cd ..
rm -rf lc-open-science-community-of-practice
echo '--------------------------------'

echo 'Processing lc-containers_vms...
gh repo fork https://github.com/UAL-RE/lc-containers_vms --clone --default-branch-only
cd lc-containers_vms || exit
git checkout -b add-citation-cff
cp '/Users/timdennis/websites/ucla-imls-open-sci.github.io/generated_citations/CITATION-a-gentle-hands-on-introduction-to-containers-and-virtual-machines.cff' CITATION.cff
git add CITATION.cff
git commit -m 'Docs: Add CITATION.cff file'
git push -u origin add-citation-cff
gh pr create --title 'Docs: Add CITATION.cff' --body 'This PR adds a CITATION.cff file to make the lesson citable, generated from the IMLS Open Science project metadata.' --repo https://github.com/UAL-RE/lc-containers_vms
cd ..
rm -rf lc-containers_vms
echo '--------------------------------'

echo 'Processing lc-scix-open-science...
gh repo fork https://github.com/ucla-imls-open-sci/lc-scix-open-science --clone --default-branch-only
cd lc-scix-open-science || exit
git checkout -b add-citation-cff
cp '/Users/timdennis/websites/ucla-imls-open-sci.github.io/generated_citations/CITATION-open-science-discovery-engines-empowering-librarian-use-through-a-case-study-exploration-of-the-nasa-science-explorer.cff' CITATION.cff
git add CITATION.cff
git commit -m 'Docs: Add CITATION.cff file'
git push -u origin add-citation-cff
gh pr create --title 'Docs: Add CITATION.cff' --body 'This PR adds a CITATION.cff file to make the lesson citable, generated from the IMLS Open Science project metadata.' --repo https://github.com/ucla-imls-open-sci/lc-scix-open-science
cd ..
rm -rf lc-scix-open-science
echo '--------------------------------'

echo 'Processing data-dashboard-carpentries...
gh repo fork https://github.com/aranganath24/data-dashboard-carpentries --clone --default-branch-only
cd data-dashboard-carpentries || exit
git checkout -b add-citation-cff
cp '/Users/timdennis/websites/ucla-imls-open-sci.github.io/generated_citations/CITATION-creating-data-dashboards-for-open-science-using-the-r-programming-language.cff' CITATION.cff
git add CITATION.cff
git commit -m 'Docs: Add CITATION.cff file'
git push -u origin add-citation-cff
gh pr create --title 'Docs: Add CITATION.cff' --body 'This PR adds a CITATION.cff file to make the lesson citable, generated from the IMLS Open Science project metadata.' --repo https://github.com/aranganath24/data-dashboard-carpentries
cd ..
rm -rf data-dashboard-carpentries
echo '--------------------------------'

echo 'Processing LC_ORCID...
gh repo fork https://github.com/firbolg/LC_ORCID --clone --default-branch-only
cd LC_ORCID || exit
git checkout -b add-citation-cff
cp '/Users/timdennis/websites/ucla-imls-open-sci.github.io/generated_citations/CITATION-leveraging-open-research-and-contributor-ids-orcid-for-librarians.cff' CITATION.cff
git add CITATION.cff
git commit -m 'Docs: Add CITATION.cff file'
git push -u origin add-citation-cff
gh pr create --title 'Docs: Add CITATION.cff' --body 'This PR adds a CITATION.cff file to make the lesson citable, generated from the IMLS Open Science project metadata.' --repo https://github.com/firbolg/LC_ORCID
cd ..
rm -rf LC_ORCID
echo '--------------------------------'

echo 'Processing lc-team-agreements...
gh repo fork https://github.com/LibraryCarpentry/lc-team-agreements --clone --default-branch-only
cd lc-team-agreements || exit
git checkout -b add-citation-cff
cp '/Users/timdennis/websites/ucla-imls-open-sci.github.io/generated_citations/CITATION-research-community-outreach-with-open-science-team-agreements.cff' CITATION.cff
git add CITATION.cff
git commit -m 'Docs: Add CITATION.cff file'
git push -u origin add-citation-cff
gh pr create --title 'Docs: Add CITATION.cff' --body 'This PR adds a CITATION.cff file to make the lesson citable, generated from the IMLS Open Science project metadata.' --repo https://github.com/LibraryCarpentry/lc-team-agreements
cd ..
rm -rf lc-team-agreements
echo '--------------------------------'

echo 'Processing lc-collaborative-science...
gh repo fork https://github.com/LibraryCarpentry/lc-collaborative-science --clone --default-branch-only
cd lc-collaborative-science || exit
git checkout -b add-citation-cff
cp '/Users/timdennis/websites/ucla-imls-open-sci.github.io/generated_citations/CITATION-a-path-to-open-inclusive-and-collaborative-science-for-librarians.cff' CITATION.cff
git add CITATION.cff
git commit -m 'Docs: Add CITATION.cff file'
git push -u origin add-citation-cff
gh pr create --title 'Docs: Add CITATION.cff' --body 'This PR adds a CITATION.cff file to make the lesson citable, generated from the IMLS Open Science project metadata.' --repo https://github.com/LibraryCarpentry/lc-collaborative-science
cd ..
rm -rf lc-collaborative-science
echo '--------------------------------'

echo 'Processing lc-dmp101...
gh repo fork https://github.com/LibraryCarpentry/lc-dmp101 --clone --default-branch-only
cd lc-dmp101 || exit
git checkout -b add-citation-cff
cp '/Users/timdennis/websites/ucla-imls-open-sci.github.io/generated_citations/CITATION-data-management-and-sharing-plans-for-librarians-101.cff' CITATION.cff
git add CITATION.cff
git commit -m 'Docs: Add CITATION.cff file'
git push -u origin add-citation-cff
gh pr create --title 'Docs: Add CITATION.cff' --body 'This PR adds a CITATION.cff file to make the lesson citable, generated from the IMLS Open Science project metadata.' --repo https://github.com/LibraryCarpentry/lc-dmp101
cd ..
rm -rf lc-dmp101
echo '--------------------------------'

echo 'Processing lc-open-qualitative-research...
gh repo fork https://github.com/LibraryCarpentry/lc-open-qualitative-research --clone --default-branch-only
cd lc-open-qualitative-research || exit
git checkout -b add-citation-cff
cp '/Users/timdennis/websites/ucla-imls-open-sci.github.io/generated_citations/CITATION-open-qualitative-research-taguette.cff' CITATION.cff
git add CITATION.cff
git commit -m 'Docs: Add CITATION.cff file'
git push -u origin add-citation-cff
gh pr create --title 'Docs: Add CITATION.cff' --body 'This PR adds a CITATION.cff file to make the lesson citable, generated from the IMLS Open Science project metadata.' --repo https://github.com/LibraryCarpentry/lc-open-qualitative-research
cd ..
rm -rf lc-open-qualitative-research
echo '--------------------------------'

echo 'Processing open-qualitative-research-qualcoder...
gh repo fork https://github.com/LibraryCarpentry/open-qualitative-research-qualcoder --clone --default-branch-only
cd open-qualitative-research-qualcoder || exit
git checkout -b add-citation-cff
cp '/Users/timdennis/websites/ucla-imls-open-sci.github.io/generated_citations/CITATION-open-qualitative-research-qualcoder.cff' CITATION.cff
git add CITATION.cff
git commit -m 'Docs: Add CITATION.cff file'
git push -u origin add-citation-cff
gh pr create --title 'Docs: Add CITATION.cff' --body 'This PR adds a CITATION.cff file to make the lesson citable, generated from the IMLS Open Science project metadata.' --repo https://github.com/LibraryCarpentry/open-qualitative-research-qualcoder
cd ..
rm -rf open-qualitative-research-qualcoder
echo '--------------------------------'

echo 'Processing lc-reproducible-research...
gh repo fork https://github.com/LibraryCarpentry/lc-reproducible-research --clone --default-branch-only
cd lc-reproducible-research || exit
git checkout -b add-citation-cff
cp '/Users/timdennis/websites/ucla-imls-open-sci.github.io/generated_citations/CITATION-reproducible-research-workflows.cff' CITATION.cff
git add CITATION.cff
git commit -m 'Docs: Add CITATION.cff file'
git push -u origin add-citation-cff
gh pr create --title 'Docs: Add CITATION.cff' --body 'This PR adds a CITATION.cff file to make the lesson citable, generated from the IMLS Open Science project metadata.' --repo https://github.com/LibraryCarpentry/lc-reproducible-research
cd ..
rm -rf lc-reproducible-research
echo '--------------------------------'

echo 'Processing lc-open-hw...
gh repo fork https://github.com/ucla-imls-open-sci/lc-open-hw --clone --default-branch-only
cd lc-open-hw || exit
git checkout -b add-citation-cff
cp '/Users/timdennis/websites/ucla-imls-open-sci.github.io/generated_citations/CITATION-open-science-hardware-an-introduction-for-librarians.cff' CITATION.cff
git add CITATION.cff
git commit -m 'Docs: Add CITATION.cff file'
git push -u origin add-citation-cff
gh pr create --title 'Docs: Add CITATION.cff' --body 'This PR adds a CITATION.cff file to make the lesson citable, generated from the IMLS Open Science project metadata.' --repo https://github.com/ucla-imls-open-sci/lc-open-hw
cd ..
rm -rf lc-open-hw
echo '--------------------------------'

