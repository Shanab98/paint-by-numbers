# paint-by-numbers

Users can upload an image and request a Paint By Numbers portrait. 
Our software will generate this portrait. 
Users can save this to their profile, view all custom portraits on their profile, and browse standard drawings that we have available. 


## Database migrations
knexfile.ts configures the database settings for each environment 

to create a new migration file, run:
`knex migrate:make migration_name -x ts` 

to migrate latest run: 
`knex migrate:latest`

to rollback last batch of migrations, run: 
`knex migrate:rollback`


## Docker compose 
To run your local dev, you can run `docker-compose -f docker-compose.yml up -d`

  To ensure it spins up the database correctly, run: 
  `docker exec -it paint_by_numbers_mysql_container mysql -u root -p` and enter the MYSQL_ROOT_PASSWORD (found in the docker-compose.yml) 

  -- docker exec: This command is used to execute a command inside a running container
  -- the container name (paint_by_numbers_mysql_container) was setup in docker-compose.yml 
  -- the command we are executing here is `mysql -u root -p`

  Now we are logged into the MySQL interface inside the specified Docker container. This means it worked! 

If you want to use a MySQL Client GUI like MySQLWorkbench to view the docker database, create a new connection with: 
- hostname: 127.0.0.1
- port: 3307 (note that this was setup in the docker-compose.yml port mapping)
- username: root
- password: rootpassword (note that this was setup in the docker-compose.yml environment variables)


