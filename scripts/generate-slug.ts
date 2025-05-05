import crypto from "crypto";

// slugを生成 (crypto.randomBytesを使用)
const randomSlug = crypto.randomBytes(7).toString("hex");
console.log(randomSlug);
