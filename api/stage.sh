sudo docker build -t uee-life-api:staging .
sudo docker run -d -p 127.0.0.1:3002:3001 --name uee-life-api-staging uee-life-api:staging