sudo docker build -t uee-life-api:test .
sudo docker run --rm -p 0.0.0.0:3002:3001 --name uee-life-api-test uee-life-api:test