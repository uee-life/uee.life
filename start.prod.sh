git checkout master
git pull
sudo docker-compose -p prod -f docker-compose.prod.yml build
sudo docker-compose -p prod -f docker-compose.prod.yml up -d