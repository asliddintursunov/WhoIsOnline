import { createServer } from "./app";

const PORT = 8000

async function main() {
    const app = createServer();

    app.listen(PORT, () => {
        console.log("=================================");
        console.log(`Server is running on http://localhost:${PORT}`);
        console.log("=================================");
    });
}

main().catch((err) => {
    console.error("Failed to start:", err);
    process.exit(1);
});