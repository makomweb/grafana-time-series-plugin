# Build a Grafana time series plugin

- Grafana as dashboard
- MySQL as data store
- PHP Symfony as emitter for measurements
- Adminer to access the MySQL db

## Start the containers

~~~bash
mkdir mysql-data
docker-compose up -d
~~~

## Login to Grafana dashboard

- http://localhost:3000
- default user "admin"
- default password "admin"

## Create schema using Doctrine / Symfony

~~~bash
cd emitter
php bin/console doctrine:database:create

# or|followed by

doctrine:schema:create
~~~

## Update schema using Doctrine / Symfony

~~~bash
cd emitter
php bin/console doctrine:schema:update --force
~~~

## Access Adminer (MySQL)

http://localhost:8080 

- connection:
    - dbms = MySQL
    - server = mysql_db_container
    - user = root
    - password = rootpassword
    - database = my_data

## Add MySQL DB as a Grafana data source

- Name = MySQL
- Connection
    - Host = mysql_db_container:3306
    - Database = my_data
    - user = root
    - password = rootpassword

## Run the Symfony CLI command to create measurements

~~~bash
cd emitter

php bin/console app:measure

# or

php bin\console app:measure
~~~
