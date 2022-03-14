using HelenaGrace.Models;
using HelenaGrace.Models.Business;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HelenaGrace.Controllers
{
    public class LoginController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Authenticate(User user)
        {
            UserBusinessService ubs = new UserBusinessService();
            if (ubs.Authenticate(user))
            {
                HttpContext.Session.SetInt32("loggedIn", 1);
                return View("/Views/Artist/Index.cshtml", ubs.FindUser());
            }
            else
            {
                ViewData.Add("Fail", "Login failed. Please try again.");
                return View("Index");
            }
        }

        public IActionResult Logout()
        {
            DesignBusinessService dbs = new DesignBusinessService();
            HttpContext.Session.Clear();
            return View("/Views/Home/Index.cshtml", dbs.GetAll());
        }
    }
}
