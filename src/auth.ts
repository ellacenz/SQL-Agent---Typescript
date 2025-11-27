import jwt from "jsonwebtoken";
import { FastifyRequest, FastifyReply } from "fastify";

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

const token = process.env.JWT_TOKEN; 

export function authenticate(req: FastifyRequest, res: FastifyReply, done: () => void) {
  
  const header = req.headers.authorization;

  if (!header?.startsWith("Bearer ")) {
    res.code(401).send({ error: "Unauthorized" });
    return;
  }

  const tokenReceived = header.split(" ")[1];

  if (tokenReceived !== token) {
    res.code(403).send({ error: "Forbidden" });
    return;
  }
  done();
}
