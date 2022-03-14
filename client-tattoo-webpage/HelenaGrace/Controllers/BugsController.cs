using HelenaGrace.Models;
using HelenaGrace.Models.Business;
using Microsoft.AspNetCore.Mvc;

namespace HelenaGrace.Controllers
{
    public class BugsController : Controller
    {
        BugBusinessService service = new BugBusinessService();

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult ReportBug(Bug bug) 
        {
            if (service.ReportBug(bug))
            {
                ViewData.Add("Success", "Bug report sent successfully!");
                service.SendReport(bug);
            }
            else
            {
                ViewData.Add("Fail", "Bug report failed.");
            }
            return View("Index");
        }
    }
}
