# Authentication-Api
Authentication-API

#open the terminal in Authentication-Api directory
1. npm init -y
2. npm install express mongoose bcryptjs jsonwebtoken passport passport-jwt passport-google-oauth20 passport-facebook passport-twitter passport-github
3. npm install dotenv body-parser

#change the .env file according to your config
#then you are ready to go
#to start the app run
node server.js

#Commands to run the API
-------------------------------------------------------------------------------
#For register the User:

curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "barath",
    "email": "barath@example.com",
    "password": "Barathk77"
  }'
-------------------------------------------------------------------------------
#For Login as a User:

curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "barath@example.com",
    "password": "Barathk77"
  }'

#After Login the Token will be send as an response
-------------------------------------------------------------------------------
#To promote the User to Admin:

curl -X POST http://localhost:3000/api/auth/promote \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <use the token generated after login>" \
  -d '{
    "email": "jeeva@example.com"
  }'
-------------------------------------------------------------------------------
#Search the user by Userid:

curl -X GET http://localhost:3000/api/profiles/admin/USER_ID_HERE \
  -H "Authorization: Bearer <enter token generated of after admin login>"
-------------------------------------------------------------------------------
#View the List of User:
#If you are the Admin you can see Public/private profile
#If you are the Non-admin user you can only able to see public profile

curl -X GET http://localhost:3000/api/auth/users \
  -H "Authorization: Bearer <enter token generated after login>"

-------------------------------------------------------------------------------
#To Update the User Profile:

curl -X PUT http://localhost:3000/api/auth/profile \
  -H "Authorization: Bearer <Token Generated after login>" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "jeeva",
    "bio": "Developer and tech enthusiast.",
    "phone": "123-456-7890",
    "photo": "https://example.com/photo.jpg"
  }'
-------------------------------------------------------------------------------
#To Switch between Public and private:

curl -X PUT http://localhost:3000/api/auth/profile/privacy \
  -H "Authorization: Bearer <Token Generated after login>" \
  -H "Content-Type: application/json" \
  -d '{
  "isPublic": false
  }'
 
-------------------------------------------------------------------------------





