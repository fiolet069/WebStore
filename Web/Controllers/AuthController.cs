using System.Threading.Tasks;
using System.Collections.Generic;
using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Web.ViewModels;
using Business.Interfaces;

namespace Web.Controllers
{
    public class AuthController : Controller
    {
        private readonly IUser manageUser;

        public AuthController(IUser manageUser)
        {
            this.manageUser = manageUser;
        }

        [HttpGet]
        public IActionResult Login()
        {
            return View(new LoginViewModel());
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Login(LoginViewModel viewModel)
        {
            if(!ModelState.IsValid)
                return View(viewModel);
                
            var user = await manageUser.GetUserInfoAsync(viewModel.Email, viewModel.Password);
            if(user == null)
            {
                ModelState.AddModelError("", "Некорректные логин и(или) пароль");
                return View(viewModel);
            }
            else
            {
                await Authenticate(user.Email, user.Role.Name);
                return RedirectToAction("Index", "Home");
            }
        }

        [HttpGet]
        public IActionResult Registration()
        {
            return View(new RegistrationViewModel());
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Registration(RegistrationViewModel viewModel)
        {
            if(!ModelState.IsValid)
                return View(viewModel);

            if(await manageUser.ExistsUserAsync(viewModel.Email))
            {
                ModelState.AddModelError("", "Данная почта уже зарегестрирована");
                return View(viewModel);
            }
            else
            {
                await manageUser.AddCustomerAsync(viewModel.FormUser(), viewModel.FormCustomerInfo());
                await Authenticate(viewModel.Email, "Customer");
                return RedirectToAction("Index", "Home");
            }
        }

        [HttpGet]
        public async Task<IActionResult> Logout()
        {
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            return RedirectToAction("Index", "Home");
        }

        private async Task Authenticate(string userName, string role)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimsIdentity.DefaultNameClaimType, userName),
                new Claim(ClaimsIdentity.DefaultRoleClaimType, role)
            };
            var idClaims = new ClaimsIdentity(claims, "ApplicationCookie", ClaimsIdentity.DefaultNameClaimType, ClaimsIdentity.DefaultRoleClaimType);
            await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, new ClaimsPrincipal(idClaims));
        }
    }
}