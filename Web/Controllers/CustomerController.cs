using System.Threading.Tasks;
using System;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Business.Interfaces;

namespace Web.Controllers
{
    [Authorize(Roles = "Customer")]
    public class CustomerController : Controller
    {
        private ICustomer manageCustomer;

        public CustomerController(ICustomer manageCustomer)
        {
            this.manageCustomer = manageCustomer;
        }

        [HttpGet]
        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public async Task<JsonResult> GetHistory() => Json(await manageCustomer.GetHistoryPurchaseAsync(User.Identity.Name));

        [HttpPost]
        public async Task<JsonResult> GetCustomerData() => Json(await manageCustomer.GetCustomerDataAsync(User.Identity.Name));

        [HttpPost]
        public async Task<JsonResult> AddBalance(float sum)
        {
            try
            {
                await manageCustomer.AddBalanceAsync(User.Identity.Name, sum);
                return Json(new {
                    ok = true,
                    error = string.Empty
                });
            }
            catch(Exception exception)
            {
                return Json(new {
                    ok = false,
                    error = exception.Message
                });
            }
        }
    }
}