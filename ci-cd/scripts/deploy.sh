#!/bin/bash

# This script assumes it is run from the application root folder (where package.json is located)

set -e

FRONTEND_URL=$1
STACK_NAME=$2
CLOUDFRONT_ID=$3
AWS_ACCOUNT=$4

echo
echo '##############################'
echo 'Vars'
echo '##############################'
echo "Received vars: $FRONTEND_URL $STACK_NAME $CLOUDFRONT_ID $AWS_ACCOUNT";

echo
echo '##############################'
echo 'Env config'
echo '##############################'
pwd
which node
node -v

echo
echo '##############################'
echo 'Test Assume role'
echo '##############################'
aws sts get-caller-identity

echo
echo '##############################'
echo 'Route 53, cloudfront, buckets, policies'
echo '##############################'
aws cloudformation deploy --region ap-southeast-2 --template-file infra/ap-southeast-2/stage1.cfn.yaml --stack-name $STACK_NAME-stage-1 --parameter-overrides FrontendDnsRecord=$FRONTEND_URL
HOSTED_ZONE_ID=$(aws cloudformation describe-stacks --region ap-southeast-2 --stack-name $STACK_NAME-stage-1 --query "Stacks[0].Outputs[?OutputKey=='FrontendHostedZoneId'].OutputValue" --output text)
aws cloudformation deploy --region us-east-1 --template-file infra/us-east-1/stage2.cfn.yaml --stack-name $STACK_NAME-stage-2 --parameter-overrides FrontendDnsRecord=$FRONTEND_URL FrontendHostedZoneId=$HOSTED_ZONE_ID
ACM_CERTIFICATE_ARN=$(aws cloudformation describe-stacks --region us-east-1 --stack-name $STACK_NAME-stage-2 --query "Stacks[0].Outputs[?OutputKey=='AcmCertificateArn'].OutputValue" --output text)
APPLICATION_BUCKET_NAME=$(echo $FRONTEND_URL | tr '.' '-')"-$AWS_ACCOUNT"
aws cloudformation deploy --region ap-southeast-2 --template-file infra/ap-southeast-2/stage3.cfn.yaml --stack-name $STACK_NAME-stage-3 --parameter-overrides AcmCertificateArn=$ACM_CERTIFICATE_ARN ApplicationBucketName=$APPLICATION_BUCKET_NAME FrontendDnsRecord=$FRONTEND_URL FrontendHostedZoneId=$HOSTED_ZONE_ID

echo
echo '##############################'
echo 'Deploy to s3'
echo '##############################'
aws s3 rm s3://$APPLICATION_BUCKET_NAME --recursive
aws s3 cp ./storybook_8/storybook-static s3://$APPLICATION_BUCKET_NAME --recursive
aws cloudfront create-invalidation --distribution-id $CLOUDFRONT_ID --paths "/*"
