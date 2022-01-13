import { Handler } from "@netlify/functions";
import got from "got";

const handler: Handler = async (event) => {
  console.log("Path provided", event.path);

  const options = {
    headers: {
      "X-API-KEY": process.env.RESAS_KEY,
    },
  };

  const tail = event.path.split("/").slice(4).join("/");
  const path = "https://opendata.resas-portal.go.jp/api/v1/" + tail;
  console.log("Proxy destination:", path);

  try {
    const resp = await got(path, options);
    return {
      statusCode: resp.statusCode,
      body: resp.body,
    };
  } catch (e) {
    console.log(e);
    return {
      statusCode: 500,
      body: "internal server error in proxy",
    };
  }
};

export { handler };
