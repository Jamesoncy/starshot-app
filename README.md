# STARSHOT BACK-END

First is to go to the starshot-back directory.

To run the starshot backend

1. Create an .env file under starshot-back
2. Copy the .env.example text and paste it to your created .env
3. run npm install to install node_modules
4. If you have pm2 installed, you can just run npm run start or if not, node server.js

To stop the starshot-back, simply type npm run delete

PS: if run first time, it will seed 10 employees and a user as well, for the hard coded user, test-dev is the username and starshot-dev is the password
# STARSHOT FRONT-END

First is to go to the starshot-front directory.

To run the starshot frontend

1. Create an .env file under starshot-front
2. Copy the .env.example text and paste it to your created .env
3. run npm install to install node_modules
4. Run ng build first to make a compiled app
5. if you have pm2 installed, you can just run npm run start:prod or if not, node server.js

To stop the starshot-front, simply type npm run delete

The UI App by .env default will run at http://localhost:4200


NG-CLI

Angular CLI: 7.0.7
Node: 8.11.3
OS: darwin x64
Angular: 
... 

Package                      Version
------------------------------------------------------
@angular-devkit/architect    0.10.7
@angular-devkit/core         7.0.7
@angular-devkit/schematics   7.0.7
@schematics/angular          7.0.7
@schematics/update           0.10.7
rxjs                         6.3.3
typescript                   3.1.6

NODE-VERSION

v8.11.3


