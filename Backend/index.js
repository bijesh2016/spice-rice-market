const http=require("http");

const httpServer=http.createServer();

const PORT=3000
const HOST="localhost";


httpServer.listen(PORT,HOST,()=>{
    console.log(`Server is listening on http://${HOST}:${PORT}`);
    console.log("Backend is running...");
    console.log("Press Ctrl+C to stop the server.");
});

