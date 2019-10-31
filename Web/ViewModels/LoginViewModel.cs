using System.ComponentModel.DataAnnotations;

namespace Web.ViewModels
{
    public class LoginViewModel
    {
        [Required(ErrorMessage = "Введите почту")]
        public string Email { get; set; } 

        [Required(ErrorMessage = "Введиие пароль")]
        [DataType(DataType.Password)]
        public string Password { get; set; }
    }
}