const express = require('express');
const app = express();

const indexRoutes = require('./routes/index');



app.use(indexRoutes);


// listener ==============================
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is listening at port ${port}...`);
})