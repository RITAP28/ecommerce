import { getUser } from "@/app/lib/session";
import { NextApiRequest, NextApiResponse } from "next";
import { cookies } from "next/headers";

export default async function GET(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
  try {
    const token = cookies().get('token')?.value;
    if (!token)
      return res.status(401).json({
        msg: "User is not authenticated",
      });
      console.log(token);

    const user = await getUser(token);
    if (!user)
      return res.status(404).json({
        msg: "Invalid token",
        token: token
      });

    return res.status(200).json({ user });
  } catch (error) {
    console.error("Error while validating user: ", error);
    return res.status(500).json({
      msg: "Internal Server Error",
    });
  }
};
