import { NextResponse } from "next/server";
import  nodemailer  from 'nodemailer';


// Email sender configuration
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.NEXT_PUBLIC_EMAIL, // Your email address
    pass: process.env.NEXT_PUBLIC_EMAIL_PASS, // App password or email password
  },
});

export async function POST(req: Request) {
  try {
    const { email, status, location, rentAmount, moveInDate, phoneNo } = await req.json();
    // const em = "as9172191@gmail.com"

    const subject = status === "approved" ? "Your Rental Request is Approved!" : "Your Rental Request is Rejected!";
    const html = `
      <h2>Dear User,</h2>
      <p>Your rental request for the house at <strong>${location}</strong> has been <strong>${status}</strong>.</p>
      <p><strong>Rent Amount:</strong> ${rentAmount} Tk</p>
      <p><strong>Move-in Date:</strong> ${moveInDate}</p>
      <p><strong>Contact no:</strong> ${phoneNo}</p>
      <p>If you have any questions, please contact us.</p>
    `;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
    //   to: em,
      subject,
      html,
    });

    return NextResponse.json({ success: true, message: "Email sent successfully!" });
  } catch (error) {
    console.error("Email sending failed:", error);
    return NextResponse.json({ success: false, message: "Failed to send email" });
  }
}
