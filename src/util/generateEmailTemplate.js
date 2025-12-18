export default (
	name,
	actionURL,
	buttonText,
	subject,
	messageText,
	warningText = "This link will expire in <strong>10 minutes</strong> for security reasons.",
) => {
	const temp = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${subject}</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f7fa;">
      <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f4f7fa; padding: 40px 0;">
        <tr>
          <td align="center">
            <table role="presentation" style="max-width: 600px; width: 100%; border-collapse: collapse; background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
              <!-- Header -->
              <tr>
                <td style="padding: 40px 40px 20px; text-align: center; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 8px 8px 0 0;">
                  <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 600;">Chat App</h1>
                </td>
              </tr>
              
              <!-- Content -->
              <tr>
                <td style="padding: 40px;">
                  <h2 style="margin: 0 0 20px; color: #333333; font-size: 22px; font-weight: 600;">Hi ${name},</h2>
                  <p style="margin: 0 0 20px; color: #666666; font-size: 16px; line-height: 1.6;">
                    ${messageText}
                  </p>
                  
                  <!-- Button -->
                  <table role="presentation" style="width: 100%; border-collapse: collapse; margin: 30px 0;">
                    <tr>
                      <td align="center">
                        <a href="${actionURL}" style="display: inline-block; padding: 16px 40px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #ffffff; text-decoration: none; border-radius: 6px; font-size: 16px; font-weight: 600; box-shadow: 0 4px 6px rgba(102, 126, 234, 0.4); transition: all 0.3s ease;">
                          ${buttonText}
                        </a>
                      </td>
                    </tr>
                  </table>
                  
                  <p style="margin: 20px 0 0; color: #666666; font-size: 14px; line-height: 1.6;">
                    Or copy and paste this link into your browser:
                  </p>
                  <p style="margin: 10px 0 20px; padding: 12px; background-color: #f8f9fa; border-left: 4px solid #667eea; color: #667eea; font-size: 13px; word-break: break-all; border-radius: 4px;">
                    ${actionURL}
                  </p>
                  
                  <div style="margin: 30px 0 0; padding: 20px; background-color: #fff9e6; border-left: 4px solid #ffc107; border-radius: 4px;">
                    <p style="margin: 0; color: #856404; font-size: 14px; line-height: 1.6;">
                      <strong>⚠️ Important:</strong> ${warningText}
                    </p>
                  </div>
                  
                  <p style="margin: 30px 0 0; color: #999999; font-size: 13px; line-height: 1.6;">
                    If you didn't request this action, please ignore this email or contact our support team if you have concerns.
                  </p>
                </td>
              </tr>
              
              <!-- Footer -->
              <tr>
                <td style="padding: 30px 40px; background-color: #f8f9fa; border-radius: 0 0 8px 8px; text-align: center;">
                  <p style="margin: 0 0 10px; color: #333333; font-size: 16px; font-weight: 600;">
                    Best regards,<br>The Chat App Team
                  </p>
                  <p style="margin: 10px 0 0; color: #999999; font-size: 12px;">
                    © ${new Date().getFullYear()} Chat App. All rights reserved.
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
      `;

	return temp;
};
