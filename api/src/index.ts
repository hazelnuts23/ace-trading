import config from "./config/app";
import app from "./app";
// Start bind and listen connection on specific port
app.listen(config.port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${config.port}`);
});
