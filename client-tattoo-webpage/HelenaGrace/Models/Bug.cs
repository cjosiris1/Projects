using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace HelenaGrace.Models
{
    public class Bug
    {
        public int id { get; set; }
        [DisplayName("Email")]
        [Required(ErrorMessage = "Please enter your email")]
        public string email { get; set; }
        [DisplayName("Feedback")]
        [Required(ErrorMessage = "Please enter some feedback &#9888; &#x26A0;")]
        public string feedback { get; set; }

        public Bug(int id, string email, string feedback)
        {
            this.id = id;
            this.email = email;
            this.feedback = feedback;
        }

        public Bug() { }
    }
}