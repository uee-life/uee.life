sudo docker build -t uee-life:test .
sudo docker run --rm -p 0.0.0.0:8090:80 --name uee-life-test uee-life:test