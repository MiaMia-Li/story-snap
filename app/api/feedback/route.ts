import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    type: "OAuth2",
    user: "work@ahaapple.com", // Your email address
    serviceClient: process.env.EMAIL_CLIENT || "",
    privateKey: process.env.EMAIL_KEY || "",
    accessUrl: process.env.EMAIL_URL || "",
  },
});

export async function POST(request: NextRequest) {
  try {
    // 获取请求体数据
    const body = await request.json();
    const { email, name, message, category, subject } = body;

    // 验证请求体数据
    if (!email || !name || !message || !category || !subject) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing required fields",
        },
        { status: 400 }
      );
    }

    // 验证邮件传输器
    await transporter.verify();

    const mailOptions = {
      from: '"ahaapple" <work@ahaapple.com>',
      to: "superlmy.913@gmail.com",
      subject: "User web message",
      text: message,
      html: `<h1>user name: ${name}</h1> <h1>user email: ${email}</h1><p> content: ${message} </p><p> category: ${category} </p><p> subject: ${subject} </p>  `,
    };

    // 发送邮件
    await transporter.sendMail(mailOptions);

    // 返回成功响应
    return NextResponse.json(
      {
        success: true,
        message: "ok",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to send feedback:", error);
    return NextResponse.json(
      {
        success: false,
        message: `${error}`,
      },
      { status: 400 }
    );
  }
}
