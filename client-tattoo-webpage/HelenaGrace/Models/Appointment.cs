using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace HelenaGrace.Models
{
    public class Appointment
    {
        public int id { get; set; }
        [DisplayName("Email")]
        [Required(ErrorMessage = "Please enter your email")]
        public string email { get; set; }
        [DisplayName("Name")]
        [Required(ErrorMessage = "Please enter your name")]
        public string name { get; set; }
        [DisplayName("Datetime")]
        [Required(ErrorMessage = "Please enter the date and time")]
        public DateTime dateTime { get; set; }
        [DisplayName("Phone Number")]
        [Required(ErrorMessage = "Please enter your phone number")]
        public string phoneNumber { get; set; }

        public Appointment(int id, string email, string name, DateTime dateTime, string phoneNumber)
        {
            this.id = id;
            this.email = email;
            this.name = name;
            this.dateTime = dateTime;
            this.phoneNumber = phoneNumber;
        }

        public Appointment() { }
    }
}
