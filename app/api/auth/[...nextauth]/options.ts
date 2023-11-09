import type { NextAuthOptions,Theme } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { GithubProfile } from "next-auth/providers/github";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/prisma/client";
import GoogleProvider from "next-auth/providers/google";
import { randomBytes, randomUUID } from "crypto";
import nodemailer from "nodemailer";
import EmailProvider from "next-auth/providers/email";
import { createTransport } from "nodemailer";
import { CustomsendVerificationRequest } from "./signinemail";
interface SendVerificationRequestParams {
    identifier: string;
    url: string;
    provider: {
      server: nodemailer.TransportOptions;
      from: string;
    };
  }


export const options: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      checks: ["none"],
    }),
    EmailProvider({
        server: {
        service: 'gmail',
          host: 'smtp.gmail.com',
          port: 465,
          secure: true,
          auth: {
            user: 'azzammahmoudtest@gmail.com',
            pass: 'Test@12345',
          },
        },
        from: process.env.EMAIL_FROM,
        sendVerificationRequest({ identifier, url, provider }) {
        //   CustomsendVerificationRequest({ identifier, url, provider })
        async function sendRequest({identifier,url,provider} : any)  {
            const transport = createTransport(provider.server)
            const result = await transport.sendMail({
              to: identifier,
              from: provider.from,
              subject: `Sign in to`,
              text: `Sign in to`,
              html: ` <!DOCTYPE html>
              <html lang="en" xmlns:v="urn:schemas-microsoft-com:vml">
              <head>
                <meta charset="utf-8">
                <meta name="x-apple-disable-message-reformatting">
                <meta http-equiv="x-ua-compatible" content="ie=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <meta name="format-detection" content="telephone=no, date=no, address=no, email=no">
                <meta name="color-scheme" content="light dark">
                <meta name="supported-color-schemes" content="light dark">
                <!--[if mso]> </head>
                <body>Hello From Email</body>`,  
            })
             
        }
        sendRequest({identifier,url,provider})
        },
      }),
  ],
  
debug: true,
  session: {
    strategy: "database", // => jwt or database
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
    generateSessionToken: () => {
      return randomUUID?.() ?? randomBytes(32).toString("hex");
    },
  },
};




function html(params: { url: string; host: string; theme: Theme }) {
  const { url, host, theme } = params;

  const escapedHost = host.replace(/\./g, "&#8203;.");

  const brandColor = theme.brandColor || "#346df1";
  const color = {
    background: "#f9f9f9",
    text: "#444",
    mainBackground: "#fff",
    buttonBackground: brandColor,
    buttonBorder: brandColor,
    buttonText: theme.buttonText || "#fff",
  };

  return `
<body style="background: ${color.background};">
  <table width="100%" border="0" cellspacing="20" cellpadding="0"
    style="background: ${color.mainBackground}; max-width: 600px; margin: auto; border-radius: 10px;">
    <tr>
      <td align="center"
        style="padding: 10px 0px; font-size: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
        Sign in to <strong>${escapedHost}</strong>
      </td>
    </tr>
    <tr>
      <td align="center" style="padding: 20px 0;">
        <table border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td align="center" style="border-radius: 5px;" bgcolor="${color.buttonBackground}"><a href="${url}"
                target="_blank"
                style="font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: ${color.buttonText}; text-decoration: none; border-radius: 5px; padding: 10px 20px; border: 1px solid ${color.buttonBorder}; display: inline-block; font-weight: bold;">Sign
                in</a></td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td align="center"
        style="padding: 0px 0px 10px 0px; font-size: 16px; line-height: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
        If you did not request this email you can safely ignore it.
      </td>
    </tr>
  </table>
</body>
`;
}

/** Email Text body (fallback for email clients that don't render HTML, e.g. feature phones) */
function text({ url, host }: { url: string; host: string }) {
  return `Sign in to ${host}\n${url}\n\n`;
}
