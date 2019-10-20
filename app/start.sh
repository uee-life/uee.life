sudo docker build -t uee-life:prod .
sudo docker run -d --restart unless-stopped  -p 127.0.0.1:8080:80 --name uee-life uee-life:prod