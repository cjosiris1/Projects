using HelenaGrace.Models.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HelenaGrace.Models.Business
{
    public class DesignBusinessService
    {
        DesignDataService dds = new DesignDataService();
        public List<Design> GetAll()
        {
            return dds.GetAll();
        }

        public Design GetById(int id)
        {
            return dds.GetById(id);
        }

        public bool Insert(Design design)
        {
            design.DateTime = DateTime.Now;

            //make sure file has an image extention
            if (!string.Equals(design.Picture.ContentType, "image/jpg", StringComparison.OrdinalIgnoreCase) &&
            !string.Equals(design.Picture.ContentType, "image/jpeg", StringComparison.OrdinalIgnoreCase) &&
            !string.Equals(design.Picture.ContentType, "image/pjpeg", StringComparison.OrdinalIgnoreCase) &&
            !string.Equals(design.Picture.ContentType, "image/gif", StringComparison.OrdinalIgnoreCase) &&
            !string.Equals(design.Picture.ContentType, "image/x-png", StringComparison.OrdinalIgnoreCase) &&
            !string.Equals(design.Picture.ContentType, "image/png", StringComparison.OrdinalIgnoreCase))
            {
                return false;
            }
            design.Description = design.Description != null ? design.Description : "";
            return dds.Insert(design);
        }

        public bool Delete(Design design)
        {
            return dds.Delete(design);
        }

        public bool UpdateDesign(Design design)
        {
            return dds.UpdateDesign(design);
        }
    }
}
