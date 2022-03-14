using HelenaGrace.Models.Data;
using MailKit.Net.Smtp;
using MimeKit;
using System;
using System.Collections.Generic;

namespace HelenaGrace.Models.Business
{
    public class CustomerBusinessService
    {
        CustomerDataService service = new CustomerDataService();

        public bool MakeAppointment(Appointment appointment) 
        {
            return service.addNewAppointment(appointment);
        }

        public void SendApptEmails(Appointment appointment)
        {
            var mailMessage = new MimeMessage();
            mailMessage.From.Add(new MailboxAddress("noreply.inklink", "noreply.inklink@gmail.com"));
            mailMessage.To.Add(new MailboxAddress("Helena", "abend07@gmail.com"));
            mailMessage.Subject = "New Tattoo Appointment";
            mailMessage.Body = new TextPart("plain")
            {
                Text = appointment.name + " has scheduled an appointment for " + appointment.dateTime + ". You can contact them at " + appointment.email + " or " + appointment.phoneNumber + " if there are any issues."
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

        public bool Delete(int id)
        {
            return service.Delete(id);
        }

        public List<Appointment> GetAll()
        {
            return service.GetAll();
        }
    }
}
