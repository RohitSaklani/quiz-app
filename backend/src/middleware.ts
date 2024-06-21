import jwt from "jsonwebtoken";
export const authVerification = (req: any, res: any, next: any) => {
  try {
    const headers = req.headers;

    console.log(
      ` REQUEST : ${req.protocol}://${req.get("host")}${
        req.originalUrl
      }  Method: ${req.method},`
    );

    if (headers.token) {
      const token = Array.isArray(headers.token)
        ? headers.token[0]
        : headers.token;
      const verify = jwt.verify(
        token,
        process.env.JWT_KEY || "qwerty",
        (err: any, data: any) => {
          if (err) {
            res.status(401).json({ message: "Unauthorized", error: err?.name });
          } else {
            next();
          }
        }
      );

      // console.log("verify : ", verify);
    } else {
      res.status(401).json({ message: "JWT token missing" });
    }
  } catch (error: any) {
    console.log("[VERIFY_ERROR] : ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
