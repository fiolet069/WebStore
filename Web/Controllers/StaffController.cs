using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Web.ViewModels;
using Business.Interfaces;

namespace Web.Controllers
{
    [Authorize(Roles = "Admin")]
    public class StaffController : Controller
    {
        private IStaff manageStaff;

        public StaffController(IStaff manageStaff)
        {
            this.manageStaff = manageStaff;
        }

        public IActionResult Index()
        {
            return View();
        }

        public async Task<JsonResult> AddSeller(AddSellerViewModel viewModel)
        {
            var ok = true;
            var errors = new List<string>();

            if(ModelState.IsValid)
            {
                await manageStaff.AddSellerAsync(viewModel.FormUser());
            }
            else
            {
                ok = false;
                ModelState.Values.ToList().ForEach(value => 
                {
                    value.Errors.ToList().ForEach(error => 
                    {
                        errors.Add(error.ErrorMessage);
                    });
                });
            }

            return Json(new {
                ok,
                errors
            });
        }

        public async Task<JsonResult> GetListSellers() => Json(await manageStaff.GetListSellersAsync());

        public async Task DeleteSeller(int id) => await manageStaff.DeleteSellerAsync(id);
    }
}