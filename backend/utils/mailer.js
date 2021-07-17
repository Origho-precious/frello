import nodemailer from "nodemailer";

export const sendMail = (subject, recipients, content, cb) => {
	const mailSender = async () => {
		// create reusable transporter object using the default SMTP transport
		let transporter = nodemailer.createTransport({
			host: "smtp.gmail.com",
			port: 587,
			secure: false,
			auth: {
				user: process.env.EMAIL_ADDRESS,
				pass: process.env.EMAIL_PASSWORD,
			},
		});

		// send mail with defined transport object
		let info = await transporter.sendMail({
			from: "Frello",
			to: recipients,
			subject: subject,
			html: content,
		});

		info && cb();
	};
	mailSender().catch(console.error);
};
