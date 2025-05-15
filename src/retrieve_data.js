import { generateClient } from "aws-amplify/data";


class  DB_Data{
    client = generateClient({
  authMode: "userPool",
});





}