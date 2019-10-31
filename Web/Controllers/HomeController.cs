using System.Threading.Tasks;
using System.Linq;
using System;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Business.Interfaces;
using Data.Models;

namespace Web.Controllers
{
    public class HomeController : Controller
    {
        private IProduct manageProduct;
        private ICustomer manageCustomer;
        private IPurchase managePurchase;

        public HomeController(IProduct manageProduct, ICustomer manageCustomer, IPurchase managePurchase)
        {
            this.manageProduct = manageProduct;
            this.manageCustomer = manageCustomer;
            this.managePurchase = managePurchase;
        }

        [HttpGet]
        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public async Task<JsonResult> GetListProducts() => Json(await manageProduct.GetListProductsAsync(true));

        [HttpPost]
        public async Task<JsonResult> GetCustomerInfo()
        {
            if(User.Identity.IsAuthenticated && User.IsInRole("Customer"))
                return Json(new {
                    isAuth = true,
                    balance = await manageCustomer.GetCustomerBalanceAsync(User.Identity.Name)
                });
            else
                return Json(new {
                    isAuth = false,
                    balance = 0
                });
        }

        [HttpPost]
        [Authorize(Roles = "Customer")]
        public async Task<JsonResult> ExecutePurchase(Product[] boxItems)
        {
            try
            {
                await managePurchase.ExecutePurchase(boxItems.ToList(), User.Identity.Name);
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