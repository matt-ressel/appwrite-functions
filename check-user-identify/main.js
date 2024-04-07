import { Client, Users, Query } from "node-appwrite";

export default async ({ req, res, log, error }) => {
  const client = new Client()
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject(process.env.APPWRITE_PROJECT_ID)
    .setKey(process.env.APPWRITE_API_KEY);

  const users = new Users(client);

  if (req.method == "POST") {
    const { type, identifier } = JSON.parse(req.body);
    // check if user exist with provided identifier
    const response = await users.list([Query.equal(type, [identifier])]);
    // show response in function Executions
    log(response); // res
    log(error); // error
    // if response.total > 0 then identifier exist
    if (response.total) {
      return res.json({ value: true });
    } else {
      return res.json({ value: false });
    }
  }

  return res.empty();
};
