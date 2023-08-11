# Inventory application

Live link: https://misty-hill-10.fly.dev/

## Summary

StockMgr is a CRUD application that allows users to add, view, edit and delete products and categories. Users can upload and edit images of their products, and critical changes (editing and deleting) are protected by an authorisation password.

This app was built using Node JS, Express & Express Validator, Mongoose, Mongo DB Atlas, Mutler and DotEnv on the back-end and (limited) vanilla JavaScript and CSS on the front-end. Back-end code follows the Model View Controller (MVC) design pattern.

Hosted and deployed on fly.io.

## Key skills employed

**Express & Node JS**

- Handling asynchronous HTTP requests using `async/await` syntax
- Separating application concerns with the Model-View Controller (MVC) design pattern
- Utilised the `Router` method to create logical groupings of routes for different parts of the site
- Exposed a public folder to hold CSS files, images, uploads and scripts with the `static` middleware method
- Back-end form validation using the Express Validator npm package, including `custom` validators
- Generating a 404 error page which is rendered anytime the server receives a 404 response via the `status` method

**Mongoose & Mongo DB**

- Created and configured database collections using Mongo DB Atlas and Mongoose Schemas
- Making asynchronous calls to the database using Mongoose methods such as `find`, `save` and `findByIdAndDelete`
- Using the dotenv package to securely store and access database credentials on the environment variable
- Uploaded files using the Mutler package to store the image in Clodinary and URL in the database so images persist

**EJS**

- Embedded JavaScript (EJS) to generate HTML markup on the back-end, with partials to simplify templates
- Passing data into templates with the `render` Express method and optional locals object
