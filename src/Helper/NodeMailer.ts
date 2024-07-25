import NodeMailer from "nodemailer"

const sendEmail = async ({ email, token }: any) => {
    try {
        let mailBody = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>Forgot Password</title>
    <style>
        body {
            background-color: #FFFFFF; padding: 0; margin: 0;
        }
    </style>
</head>
<body style="background-color: #FFFFFF; padding: 0; margin: 0;">
<table border="0" cellpadding="0" cellspacing="10" height="100%" bgcolor="#FFFFFF" width="100%" style="max-width: 650px;" id="bodyTable">
    <tr>
        <td align="center" valign="top">
            <table border="0" cellpadding="0" cellspacing="0" width="100%" id="emailContainer" style="font-family:Arial; color: #333333;">
                <!-- Logo -->
                <tr>
                    <td align="left" valign="top" colspan="2" style="border-bottom: 1px solid #CCCCCC; padding-bottom: 10px;">
                        <img alt="logo" border="0" src="https://res.cloudinary.com/dailynarratives/image/upload/v1721905059/hnbxvolgeusi4je71gqj.webp" title="Daily Narratives" class="sitelogo" width="60%" style="max-width:250px;" />
                    </td>
                </tr>
                <!-- Title -->
                <tr>
                    <td align="left" valign="top" colspan="2" style="border-bottom: 1px solid #CCCCCC; padding: 20px 0 10px 0;">
                        <span style="font-size: 18px; font-weight: normal;">FORGOT PASSWORD</span>
                    </td>
                </tr>
                <!-- Messages -->
                <tr>
                    <td align="left" valign="top" colspan="2" style="padding-top: 10px;">
                        <span style="font-size: 12px; line-height: 1.5; color: #333333;">
                            We have sent you this email in response to your request to reset your password on Daily Narratives.
                            <br/><br/>
                            To reset your password for <a href="${process.env.NEXT_PUBLIC_DOMAIN}/ForgotPassword?token=${token}">Daily Narratives</a>, please follow the link below:
                            <a href="${process.env.NEXT_PUBLIC_DOMAIN}/ForgotPassword?token=${token}">Click Here</a>
                            <br/><br/>
                            We recommend that you keep your password secure and not share it with anyone.If you feel your password has been compromised, you can change it by going to your Daily Narratives My Account Page and clicking on the "Change Email Address or Password" link.
                            <br/><br/>
                            If you need help, or you have any other questions, feel free to email dailynarratives08@gmail.com, or call 9044043750.
                            <br/><br/>
                            Daily Narratives Customer Service
                        </span>
                    </td>
                </tr>
            </table>
        </td>
    </tr>
</table>
</body>
</html>`

        const transporter = NodeMailer.createTransport({
            host: process.env.NEXT_PUBLIC_NODEMAILER_HOST,
            port: 587,
            secure: false,
            auth: {
                user: process.env.NEXT_PUBLIC_NODEMAILER_USER,
                pass: process.env.NEXT_PUBLIC_NODEMAILER_PASS
            }
        })

        const info = await transporter.sendMail({
            from: process.env.NEXT_PUBLIC_NODEMAILER_USER,
            to: email,
            html: mailBody
        })
        return info
    } catch (error) {
        console.log(error)
    }
}

export default sendEmail