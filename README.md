# boulder-tracker

This is a full stack web development application that keeps track of the bouldering problems that I have either completed or are still working on. While the project is still far from being complete, you can view the current production version [here](https://jamiema1.github.io/boulder-tracker/) (Note that features involving manipulating the database (add, remove, update) have been disabled for the production version as I have not setup a verification system yet to prevent unauthorized users from altering the database). 

- In the backend, I used the Express.js framework along with MySQL to manage the databases. 
- In the frontend, I used React to build the UI.
- To deploy the application, I am using GitHub Pages for the frontend and Amazon Web Services to host the server, APIs and database.

### Available Features
- Adding a new boulder problem to the database
- Deleting and updating existing boulder problems from the database
- Sorting and filtering boulder problems by various categories

### API Documentation
To support the backend of this project, I created my own RESTful API and corresponding [documentation](https://github.com/jamiema1/boulder-tracker/blob/master/API%20Documentation.md). This document details all the information related to each of the endpoints, such as attributes, status codes, and example queries and responses.

### Future Plans and Improvements
You can always check out the [Issues tab](https://github.com/jamiema1/boulder-tracker/issues) to see what ideas I will be working on and have planned for the future. Feel free to let me know if there is anything that needs improvement and isn't already there!
