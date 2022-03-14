using HelenaGrace.Models.Data;
using MailKit.Net.Smtp;
using MimeKit;
using System;

namespace HelenaGrace.Models.Business
{
    public class BugBusinessService
    {
        BugDataService service = new BugDataService();

        public bool ReportBug(Bug bug) 
        {
            return service.addNewBug(bug);
        }

        public void SendReport(Bug bug)
        {
            var mailMessage = new MimeMessage();
            mailMessage.From.Add(new MailboxAddress("noreply.inklink", "noreply.inklink@gmail.com"));
            mailMessage.To.Add(new MailboxAddress("Dev", bug.email));
            mailMessage.Subject = "Ink Link Bug Report";
            mailMessage.Body = new TextPart("plain")
            {
                Text = bug.feedback
            };

            using (var smtpClient = new SmtpClient())
            {
                smtpClient.Connect("smtp.gmail.com", 587);
                smtpClient.AuthenticationMechanisms.Remove("XOAUTH2");
                smtpClient.Authenticate("noreply.inklink@gmail.com", "helenagrace");
                smtpClient.Send(mailMessage);
                smtpClient.Disconnect(true);
            }
        }
    }
}
