# Memoire

Cedric Levasseur-Laberge, 2015

This is a project I worked on as a part of my Master's thesis to complete my graduate Economics program at the Université de Sherbrooke (Sherbrooke, QC, Canada) under the supervision of Dorothée Boccanfuso and Kim Lehrer.  It is basically a quiz structured as thus:
- Warmup questions
- Game questions, where users have access to various external resources
- Personal questions

If you want to re-use it for your own purposes, feel free to.
It comes "as is" and without any kind of warranty.

This Package assumes the presence, in its client directory, of various client libraries and styling packages.
Those libraries and style packages are:
- jQuery
- Underscore.js
- Backbone.js
- Materialize.css
- FontAwesome

They are assumed to be structured as follows: 

- /public/Libraries/jquery.min.js
- /public/Libraries/underscore-min.js
- /public/Libraries/backbone-min.js
- /public/Libraries/materialize (contains all MaterializeCSS files)
- /public/Libraries/fa (contains FontAwesome)

Server-side, it is a NodeJS/Express app, relying on a MongoDB datastore.
Given that the package.json file is already there, you can simply use "npm install" to install the required dependencies.
