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
To run your local dev, you can run `docker-compose up`. 

