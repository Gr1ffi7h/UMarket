#!/bin/bash

echo "UMarket Git Setup and Deployment Script"
echo "====================================="
echo

# Check if Git is available
if ! command -v git &> /dev/null; then
    echo "ERROR: Git is not installed or not in PATH"
    echo "Please install Git from https://git-scm.com"
    echo "Then run this script again"
    exit 1
fi

echo "Git found. Setting up repository..."
echo

# Initialize Git repository
echo "Initializing Git repository..."
git init
git branch -M main

# Add all files to staging
echo "Staging all files..."
git add .

# Create initial commit
echo "Creating commit..."
git commit -m "Ready for Vercel deploy"

echo
echo "Git repository is ready!"
echo
echo "NEXT STEPS:"
echo "1. Create a new repository on GitHub: https://github.com/new"
echo "2. Name it 'umarket' (or your preferred name)"
echo "3. Copy the repository URL"
echo "4. Run these commands (replace YOUR_USERNAME with your GitHub username):"
echo "   git remote add origin https://github.com/YOUR_USERNAME/umarket.git"
echo "   git push -u origin main"
echo
echo "After pushing to GitHub, you can deploy on Vercel:"
echo "1. Go to https://vercel.com"
echo "2. Click 'New Project'"
echo "3. Import your GitHub repository"
echo "4. Click 'Deploy'"
echo
