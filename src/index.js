
import app from './app.js';
import connectDB from "./db/server.js";
import { config } from './utils/configEnv.js';

connectDB().then(() => {
    app.listen(config.port, () => {
        console.log(`App listening on port ${config.port}`)
    })
}).catch(err => {
    console.log("mongo connection err", err)
})


