
sudo docker run --name ueelife-db -e MYSQL_ROOT_PASSWORD_FILE=mysql_root_pass_config.txt --net ueelife -d mariadb