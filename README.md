Welcome to our JobBoard project !

We hope your like what we did, we put a ton of work into it.

To make this project work on your computer please follow the following steps:

- Open 2 separated terminals at the root of the project

- In the first one type "cd backend" and then "npm install" and then "nodemon server" or "npm start" (make sure you have node.js installed localy on your machine.)
After these steps, your should have the backend server working (you won't be able to connect to the MongoDb yet so please read this doc until the end.)



In the second terminal type "cd Jobboard", then "npm install" and then go to ".package.json" and replace the line "script" => "start" with this specific line => "start": "set PORT=8080 && react-scripts start", (in order to launch the front-end of the project on port 8080 (needed for the email confirmation and password reset functions)). Now you can type "npm start" and the project should run on port 8080.

From here you should have the frontend of the project working. It won't work with the API yet since your are not connected to the db.

Last step: 
- Now you have to rename the document ".env_sample" to ".env" and modify its contents.

In this document replace the fields as follows (dont actually type the <br> they are here to indicate a necessary linebreak): 

mail = 'jobboard.verifyemail@gmail.com' <br>
password = 'zmobnvixpgxugtln' <br>  
myDbConnection = 'mongodb+srv://JobBoard:iVSthtlIYzhy8or8@cluster0.zov8g.mongodb.net/JobBoard?retryWrites=true&w=majority' <br>
token = 'RANDOM_TOKEN_SECRET'


Now you should be all set, so go back to the first terminal in the backend folder and type  "nodemon server" again

The server should start on port 3000 and should connect to mongoDB.
We hope you appreciate our work.

The account lvl 2 (super admin/owner, the one that can grant or remove the admin of other users): 

email: jobboard.verifyemail73@yopmail.com
password: test


Don't hesitate to reach out to us in case you encounter any issues.


FYI : don't worry if you can't apply more than on time to the same Job-offer, we blocked it in the API.

Also you can check the email used to send emails to:
-  alert you that someone applied to your offer
-  verify your email when creating an account(necessary to have the rights to create a new job offer)
-  reset your password;
Right here ==> https://yopmail.com/fr/ and type "jobboard.verifyemail73" in the input, it is all functionnal (also you can check the previous test we did)


Enjoy
Arnaud & Julien