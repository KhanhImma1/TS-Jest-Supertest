import { app } from './app'
import https from 'https'

// app.listen(3000, () => {
//     console.log("Example app listening urlbae.com");
// });
// https://urlbae.com

// https.createServer(app).listen(80, function () {
//     console.log("App listening urlbae.com");
// });
// import randomstring from 'randomstring'
// const randomName = randomstring.generate(7);
const randomName = Math.random().toString(36).substring(3, 10);
console.log(randomName);