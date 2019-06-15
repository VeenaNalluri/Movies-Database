## Movies-api

### Installation
    - Install Node v8  ```sudo apt-get install nodejs```
    - Install npm 
    - Install nodemon  npm install -g nodemon
    - npm i
    - npm start

### Test
    - Movies Api is running on local host port 3000. 
    - You can import the collection and test it on Postman from https://www.getpostman.com/collections/6226ef0d286dccc6840d or by using the file "movies-api.postman_collection.json"

### Source Code and Implementation
    - 2 users has been created namely Veena and Anudeep (password is hashed)
    - credentials: 
    User1:
    username: anudeep
    password: anudeep123

    User2:
    username: veena
    password: veena123
    - Upon successful login the users will be redirected to movies page. 
    - Implemented the pagination for Movies database using Materials table 
    - The movies data can be viewed in data->movies.json

    ![](images/movies.PNG)

    - Each movie has an id, title, description, average rating and comments by users
    - Admin can add, edit, delete the movie - localhost/3001/admin
    - When the user clicks on the movie title they will be redirected to title/id page which is implemented using materials table
    - 
