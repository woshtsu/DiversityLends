export function runServer(app) {
    var _a;
    const desiredPort = Number((_a = process.env.PORT) !== null && _a !== void 0 ? _a : 1234);
    app.listen(desiredPort, () => {
        console.log(`Server running on http://localhost:${desiredPort}`);
    });
}
