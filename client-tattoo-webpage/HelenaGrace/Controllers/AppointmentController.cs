using HelenaGrace.Models;
using HelenaGrace.Models.Business;
using Microsoft.AspNetCore.Mvc;

namespace HelenaGrace.Controllers
{
    public class AppointmentController : Controller
    {
        CustomerBusinessService service = new CustomerBusinessService();

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult MakeAppointment(Appointment appointment) 
        {
            if (service.MakeAppointment(appointment))
            {
                service.SendApptEmails(appointment);
                ViewData.Add("Success", "Appointment scheduled successfully!");
            }
            else
            {
                ViewData.Add("Fail", "Appointment scheduling failed. Please try again.");
            }
            return View("Index");
        }

        public IActionResult AllAppointments()
        {
            return View(service.GetAll());
        }

        public IActionResult DeleteAppt(int id)
        {
            if (service.Delete(id))
            {
                ViewData.Add("Success", "Appointment deleted successfully");
            }
            else
            {
                ViewData.Add("Fail", "Appointment delete failed.");
            }
            return View("/Views/Appointment/AllAppointments.cshtml", service.GetAll());
        }
    }
}
