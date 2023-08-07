# Inventory application

Live link: TBC

## Summary

StockMgr is a CRUD application that allows users to add, view, edit and delete products and categories utilising the Model View Controller (MVC) design pattern.

Users can upload and edit images of their products, and critical changes (editing and deleting) are protected by an authorisation password.

This app was built using Node JS, Express, Mongoose, Mongo DB Atlas, Mutler and DotEnv on the back-end and (limited) vanilla JavaScript and CSS on the front-end.

## Key skills employed

**Express & Node JS**

- Handling asynchronous HTTP requests using `async/await` syntax
- Separating application concerns with the Model-View Controller (MVC) design pattern
- Utilised the `Router` method to create logical groupings of routes for different parts of the site
- Created a public folder to hold CSS files, images and uploads with the `static` middleware method
- Built custom middleware to check the users password which is sent via HTTP headers
- Generating a 404 error page which is rendered anytime the server receives a 404 response via the `status` method

**Mongoose & Mongo DB**

- Created and configured database collections using Mongo DB Atlas and Mongoose Schemas
- Making asynchronous calls to the database using Mongoose methods such as `find`, `save` and `findByIdAndDelete`
- Using the `dotenv` npm package to securely store and access database credentials on the environment variable
- Uploaded files using the 'Mutler' package to store an entry in the data base with the location of image saved in the public directory

**EJS**

- Embedded JavaScript (EJS) to generate HTML markup on the back-end, with partials to simplify templates
- Passing data into templates with the `render` Express method and locals object
