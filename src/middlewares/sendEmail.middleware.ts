import nodemailer from "nodemailer";
import Product from "../models/product.model";

export const sendEmail = async () => {
    // Nodemailer
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.COMPANY_EMAIL,
            pass: process.env.COMPANY_EMAIL_PASS,
        },
    });
    try {
        const products = await Product.find({});
        const productQuantity = products.map((product) => {
            return product.quantity;
        })
        const ownerEmails = products.map((product) => {
            return product.ownerEmail;
        })
        for(let i = 0; i < ownerEmails.length; i++) {
            const mailOptions = {
                from: process.env.COMPANY_EMAIL,
                to: ownerEmails[i],
                subject: "Your Product Details",
                text: `Product Quantity left is ${productQuantity[i]}`,
            };
            try {
                transporter.sendMail(mailOptions, async (err, info) => {
                    console.log("Email sent successfully to product owners...")
                });
            } catch(error) {
                console.log("Error occured while sending emails to product owners...")
            }
        }
    } catch (err) {
        console.log("Error occured while sending email", err);
    }
}