using HelenaGrace.Models;
using HelenaGrace.Models.Business;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace HelenaGrace.Controllers
{
    public class ArtistController : Controller
    {
        private IWebHostEnvironment Environment;

        public ArtistController(IWebHostEnvironment _environment)
        {
            Environment = _environment;
        }
        public IActionResult Index()
        {
            UserBusinessService ubs = new UserBusinessService();
            return View(ubs.FindUser());
        }

        public IActionResult UpdateProfileView()
        {
            UserBusinessService ubs = new UserBusinessService();
            return View(ubs.FindUser());
        }

        public IActionResult UpdateProfile(User user)
        {
            UserBusinessService ubs = new UserBusinessService();
            if (ubs.UpdateProfile(user))
            {
                return View("Index", ubs.FindUser());
            }
            else
            {
                ViewData.Add("Fail", "Profile update failed.");
                return View("UpdateProfileView");
            }
        }

        public IActionResult UploadDesignView()
        {
            return View();
        }

        public IActionResult DesignView(int Id)
        {
            DesignBusinessService dbs = new DesignBusinessService();
            return View(dbs.GetById(Id));
        }

        public IActionResult UploadDesign(Design design)
        {
            DesignBusinessService dbs = new DesignBusinessService();

            string wwwPath = this.Environment.WebRootPath;

            string path = Path.Combine(wwwPath, "images");
            if (!Directory.Exists(path))
            {
                Directory.CreateDirectory(path);
            }

            string uniqueFileName = Guid.NewGuid().ToString() + Path.GetFileName(design.Picture.FileName);
            design.Path = uniqueFileName;
            using (FileStream stream = new FileStream(Path.Combine(path, uniqueFileName), FileMode.Create))
            {
                if (dbs.Insert(design))
                {
                    design.Picture.CopyTo(stream);
                    ViewData.Add("Success", "Photo upload successful!");
                }
                else
                {
                    ViewData.Add("Fail", "Photo upload failed.");
                }
            }

            return View("UploadDesignView");
        }

        public IActionResult DeleteDesign(Design design)
        {
            DesignBusinessService dbs = new DesignBusinessService();

            string wwwPath = this.Environment.WebRootPath;

            string path = Path.Combine(wwwPath, "images");
            FileInfo fp = new FileInfo(Path.Combine(path, design.Path));
            if (fp.Exists && dbs.Delete(design))
            {
                fp.Delete();
                ViewData.Add("Success", "Photo delete successful!");
            }
            else
            {
                ViewData.Add("Fail", "Photo delete failed.");
            }

            return View("/Views/Home/Index.cshtml", dbs.GetAll());
        }

        public IActionResult EditDescriptionView(Design design)
        {
            return View(design);
        }

        public IActionResult EditDescription(Design design)
        {
            DesignBusinessService dbs = new DesignBusinessService();
            if (dbs.UpdateDesign(design))
            {
                ViewData.Add("Success", "Description update successful!");
                return View("DesignView", dbs.GetById(design.Id));
            }
            else
            {
                ViewData.Add("Fail", "Description update failed.");
                return View("EditDescriptionView", design);
            }
        }
    }
}
