using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace HelenaGrace.Models
{
    public class Design
    {
        public int Id { get; set; }
        public string Description { get; set; }
        [Required(ErrorMessage = "Please select a file")]
        public IFormFile Picture { get; set; }
        public string Path { get; set; }
        public DateTime DateTime { get; set; }
    }
}
