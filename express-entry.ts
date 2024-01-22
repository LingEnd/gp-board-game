import Email from "@auth/core/providers/email";
import GitHub from "@auth/core/providers/github";
import Google from "@auth/core/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { createMiddleware } from "@hattip/adapter-node";
import express from "express";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { telefunc } from "telefunc";
import { VikeAuth } from "vike-authjs";
import { renderPage } from "vike/server";
import { prisma } from "./database/prisma";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const isProduction = process.env.NODE_ENV === "production";
const root = __dirname;

startServer();

async function startServer() {
  const app = express();

  if (isProduction) {
    app.use(express.static(`${root}/dist/client`));
  } else {
    // Instantiate Vite's development server and integrate its middleware to our server.
    // ⚠️ We should instantiate it *only* in development. (It isn't needed in production
    // and would unnecessarily bloat our server in production.)
    const vite = await import("vite");
    const viteDevMiddleware = (
      await vite.createServer({
        root,
        server: { middlewareMode: true },
      })
    ).middlewares;
    app.use(viteDevMiddleware);
  }

  const Auth = VikeAuth({
    debug: true,
    secret: "be6cfb64a2387df4ba8050ff1ee2c646",
    trustHost: true,
    providers: [
      // @ts-ignore
      // CredentialsProvider({
      //   name: "Credentials",
      //   credentials: {
      //     username: { label: "Username", type: "text" },
      //     password: { label: "Password", type: "password" },
      //     email: { label: "Email", type: "email" },
      //   },
      //   async authorize(credentials, request) {
      //     let user = null;
      //     const dataOrignal =
      //       // make every empty string to undefined in credentials
      //       Object.fromEntries(
      //         Object.entries(credentials).map(([key, value]) => [
      //           key,
      //           value === "" ? undefined : value,
      //         ])
      //       );

      //     const signinParams = z
      //       .object({
      //         // password should be a string with length >= 6 <=32 and have number and chacarter
      //         password: z
      //           .string()
      //           .min(6)
      //           .max(32)
      //           .regex(/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/),
      //         // username should be a string with length >= 6
      //         username: z.optional(z.string().min(6)),
      //         // email should be a valid email
      //         email: z.optional(z.string().email()),
      //       })
      //       .safeParse(dataOrignal);
      //     if (!signinParams.success) {
      //       throw new Error(
      //         "signin params is not valid:" + signinParams.error.message
      //       );
      //     } else if (
      //       signinParams.data.username === undefined &&
      //       signinParams.data.email === undefined
      //     ) {
      //       throw new Error("username or email is required");
      //     } else {
      //       const { username, email, password } = signinParams.data;
      //       if (username) {
      //         user = await prisma.user.findUnique({
      //           where: {
      //             name: username,
      //           },
      //         });
      //         if (!user) {
      //           throw new Error("user not found with username" + username);
      //         }
      //       } else if (email) {
      //         user = await prisma.user.findUnique({
      //           where: {
      //             email: email,
      //           },
      //         });
      //         if (!user) {
      //           throw new Error("user not found with email" + email);
      //         }
      //       } else {
      //         throw new Error("username or email is required");
      //       }
      //       if (user.password !== password) {
      //         throw new Error("password is not correct");
      //       }
      //     }
      //     return user;
      //   },
      // }),
      // @ts-ignore
      GitHub({
        clientId: "8e88797efc0da230c557",
        clientSecret: "1b8307ae101195359321756948762ed702c8b7ad",
      }),
      // @ts-ignore
      Google({
        clientId:
          "576709814419-jubu3mvgk29ra4qhb6j5mhihhjdn3sum.apps.googleusercontent.com",
        clientSecret: "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",
      }),
      // @ts-ignore
      Email({
        server: {
          host: "smtp.qq.com",
          port: 587,
          auth: {
            user: "ling0end@qq.com",
            pass: "gznuaihsubdbebid",
          },
        },
        from: "ling0end@qq.com",
      }),
    ],
    // @ts-ignore
    adapter: PrismaAdapter(prisma),
    pages: {
      newUser: "/account",
      verifyRequest: "/verifyEmail",
    },
    callbacks: {
      session({ session, user }) {
        // @ts-ignore
        session.user.role = user.role;
        return session;
      },
    },
    cookies: {
      sessionToken: {
        name: "session",
        options: {
          httpOnly: true,
          sameSite: "lax",
          path: "/",
          secure: isProduction,
        },
      },
    },
  });

  app.all(
    "/api/auth/*",
    createMiddleware(Auth, {
      alwaysCallNext: false,
    })
  );

  app.post(
    "/_telefunc",
    createMiddleware(
      async (context) => {
        const httpResponse = await telefunc({
          url: context.request.url.toString(),
          method: context.request.method,
          body: await context.request.text(),
          context,
        });
        const { body, statusCode, contentType } = httpResponse;
        return new Response(body, {
          status: statusCode,
          headers: {
            "content-type": contentType,
          },
        });
      },
      {
        alwaysCallNext: false,
      }
    )
  );

  /**
   * Vike route
   *
   * @link {@see https://vike.dev}
   **/
  app.all("*", async (req, res, next) => {
    const session = req.headers.cookie?.split("session=")[1]?.split(";")[0];
    const pageContextInit = {
      urlOriginal: req.originalUrl,
      session: session,
    };
    const pageContext = await renderPage(pageContextInit);
    if (pageContext.httpResponse === null) return next();

    const { statusCode, headers, earlyHints } = pageContext.httpResponse;

    if (res.writeEarlyHints)
      res.writeEarlyHints({ link: earlyHints.map((e) => e.earlyHintLink) });
    res.status(statusCode);
    headers.forEach(([name, value]) => res.setHeader(name, value));
    pageContext.httpResponse.pipe(res);
  });

  app.listen(process.env.PORT ? parseInt(process.env.PORT) : 3000, () => {
    console.log("Server listening on http://localhost:3000");
  });
}
