#!/usr/bin/env bash
git_commit=$(git rev-parse HEAD)

echo "Making the S3 bucket and uploading the Dockerfile"
bucket="s3://javascript-on-aws-${git_commit}"
aws s3 mb $bucket
aws s3 cp deployment/Dockerfile $bucket

echo "Creating version $git_commit of the application"
aws elasticbeanstalk
