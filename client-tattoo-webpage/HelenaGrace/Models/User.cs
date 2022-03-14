using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Threading.Tasks;

namespace HelenaGrace.Models
{
    public class User
    {
        [DisplayName("First Name")]
        public string FirstName { get; set; }
        [DisplayName("Last Name")]
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        [DisplayName("Phone Number")]
        public string PhoneNumber { get; set; }
        public string Bio { get; set; }
    }
}
