import jwt from "jsonwebtoken";
import { FastifyRequest, FastifyReply } from "fastify";
import { conn } from "./db";
import bcrypt from "bcrypt";

//Function to generate a JWT token (generate once and store in .env)
export function generateToken(requestBody: any): string {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }
  const token = jwt.sign(
    { username: requestBody.username, password: requestBody.password },
    process.env.JWT_SECRET!,
    { expiresIn: "1h" }
  );
  return token;
}


export function authenticate(req: FastifyRequest, res: FastifyReply, done: () => void) {

  const header = req.headers.authorization;

  if (!header?.startsWith("Bearer ")) {
    res.code(401).send({ error: "Unauthorized" });
    return;
  }

  const tokenReceived: any = header.split(" ")[1];

  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }
  if (!tokenReceived) {
    return res.status(401).send({ error: "No token provided" });
  }

  try {
    const decoded = jwt.verify(tokenReceived, process.env.JWT_SECRET!);
    console.log("Decoded JWT:", decoded);
    done();
  } catch (err) {
    return res.status(403).send({ error: "Invalid token" });
  }
}

export async function verifyUserCredentials(reqBody: any): Promise<boolean> {
  const connection = (await conn()) as any;
  const { username, password } = reqBody;

  console.log({ "Verifying user": username, "password": password });
  const [result] = await connection.execute('SELECT * FROM users WHERE username = ?', [username]);
  console.log("verified user: ", result);
  if ((result as any[]).length === 0) {
    return false;
  }

  const user = result[0];

  const valid = await bcrypt.compare(password, user.password);
  
  if(valid){
    return true;
  }else{
    return false;
  }

}