using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Business.Interfaces;
using Web.ViewModels;

namespace Web.Controllers
{
    [Authorize(Roles = "Seller")]
    public class ProductController : Controller
    {
        private IProduct manageProduct;

        public ProductController(IProduct manageProduct)
        {
            this.manageProduct = manageProduct;
        }

        public IActionResult Index() => View();

        [HttpPost]
        public async Task<JsonResult> AddProduct(AddProductViewModel viewModel)
        {
            var ok = true;
            var errors = new List<string>();

            if(!ModelState.IsValid)
            {
                ok = false;
                ModelState.Values.ToList().ForEach(value => {
                    value.Errors.ToList().ForEach(error => {
                        errors.Add(error.ErrorMessage);
                    });
                });   
            }
            if(await manageProduct.ExistsProductAsync(viewModel.Name))
            {
                ok = false;
                errors.Add("Данный товар уже добавлен в базу");
            }            
            
            if(ok)
                await manageProduct.AddProductAsync(viewModel.FormProduct(), viewModel.Chars);

            return Json(new {
                ok,
                errors
            });
        }

        [HttpPost]
        public async Task<JsonResult> GetListProducts() => Json(await manageProduct.GetListProductsAsync());

        [HttpPost]
        public async Task ActivateProduct(int id) => await manageProduct.ActivateProductAsync(id);

        [HttpPost]
        public async Task DeactivateProduct(int id) => await manageProduct.DeactivateProductAsync(id);
    }
}