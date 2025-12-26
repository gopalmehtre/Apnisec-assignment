import { Resend } from 'resend';

export class EmailService {
  private resend: Resend;
  private fromEmail: string;

  constructor() {
    this.resend = new Resend(process.env.RESEND_API_KEY);
    this.fromEmail = process.env.EMAIL_FROM || 'onboarding@resend.dev';
  }

  async sendWelcomeEmail(email: string, name: string): Promise<void> {
    try {
      await this.resend.emails.send({
        from: this.fromEmail,
        to: email,
        subject: 'Welcome to ApniSec - Your Cybersecurity Partner',
        html: this.getWelcomeEmailTemplate(name),
      });
    } catch (error) {
      console.error('Failed to send welcome email:', error);
      // Don't throw error - email failure shouldn't block registration
    }
  }

  async sendIssueCreatedEmail(
    email: string,
    name: string,
    issue: {
      type: string;
      title: string;
      description: string;
    }
  ): Promise<void> {
    try {
      await this.resend.emails.send({
        from: this.fromEmail,
        to: email,
        subject: `New Issue Created: ${issue.title}`,
        html: this.getIssueCreatedTemplate(name, issue),
      });
    } catch (error) {
      console.error('Failed to send issue created email:', error);
    }
  }

  private getWelcomeEmailTemplate(name: string): string {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white;
              padding: 30px;
              text-align: center;
              border-radius: 10px 10px 0 0;
            }
            .content {
              background: #f9f9f9;
              padding: 30px;
              border-radius: 0 0 10px 10px;
            }
            .button {
              display: inline-block;
              padding: 12px 30px;
              background: #667eea;
              color: white;
              text-decoration: none;
              border-radius: 5px;
              margin-top: 20px;
            }
            .footer {
              text-align: center;
              margin-top: 20px;
              color: #666;
              font-size: 12px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Welcome to ApniSec!</h1>
            </div>
            <div class="content">
              <h2>Hello ${name},</h2>
              <p>Thank you for joining ApniSec, your trusted partner in cybersecurity solutions.</p>
              <p>We're excited to have you on board! With ApniSec, you can:</p>
              <ul>
                <li>Manage Cloud Security issues</li>
                <li>Track Reteam Assessments</li>
                <li>Monitor VAPT activities</li>
              </ul>
              <p>Get started by logging into your dashboard and exploring our features.</p>
              <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard" class="button">Go to Dashboard</a>
            </div>
            <div class="footer">
              <p>© 2024 ApniSec. All rights reserved.</p>
              <p>This is an automated email. Please do not reply.</p>
            </div>
          </div>
        </body>
      </html>
    `;
  }

  private getIssueCreatedTemplate(
    name: string,
    issue: { type: string; title: string; description: string }
  ): string {
    const typeLabels: Record<string, string> = {
      CLOUD_SECURITY: 'Cloud Security',
      RETEAM_ASSESSMENT: 'Reteam Assessment',
      VAPT: 'VAPT',
    };

    return `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white;
              padding: 30px;
              text-align: center;
              border-radius: 10px 10px 0 0;
            }
            .content {
              background: #f9f9f9;
              padding: 30px;
              border-radius: 0 0 10px 10px;
            }
            .issue-box {
              background: white;
              padding: 20px;
              border-left: 4px solid #667eea;
              margin: 20px 0;
            }
            .label {
              font-weight: bold;
              color: #667eea;
              margin-bottom: 5px;
            }
            .button {
              display: inline-block;
              padding: 12px 30px;
              background: #667eea;
              color: white;
              text-decoration: none;
              border-radius: 5px;
              margin-top: 20px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>New Issue Created</h1>
            </div>
            <div class="content">
              <h2>Hello ${name},</h2>
              <p>Your issue has been successfully created and our team has been notified.</p>
              
              <div class="issue-box">
                <div class="label">Issue Type:</div>
                <p>${typeLabels[issue.type] || issue.type}</p>
                
                <div class="label">Title:</div>
                <p>${issue.title}</p>
                
                <div class="label">Description:</div>
                <p>${issue.description}</p>
              </div>
              
              <p>We'll review your issue and get back to you soon.</p>
              <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard" class="button">View Dashboard</a>
            </div>
          </div>
        </body>
      </html>
    `;
  }
}