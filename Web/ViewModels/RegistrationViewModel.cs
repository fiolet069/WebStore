using System.ComponentModel.DataAnnotations;
using Data.Models;
using Data.Enums;

namespace Web.ViewModels
{
    public class RegistrationViewModel
    {
        [Required(ErrorMessage = "Введите почту")]
        [EmailAddress(ErrorMessage = "Некорректный почтовый адрес")]
        public string Email { get; set; } 

        [Required(ErrorMessage = "Введиие пароль")]
        [MinLength(6, ErrorMessage = "Минимальная длина 6 символов")]
        [MaxLength(50, ErrorMessage = "Максимальная длина 50 символов")]
        [DataType(DataType.Password)]
        public string Password { get; set; }

        [DataType(DataType.Password)]
        [Compare("Password", ErrorMessage = "Пароли не совпадают")]
        public string ConfirmPassword { get; set; }

        [Required(ErrorMessage = "Введиие фамилию")]
        [MaxLength(30, ErrorMessage = "Максимальная длина 30 символов")]
        public string Surname { get; set;}

        [Required(ErrorMessage = "Введиие имя")]
        [MaxLength(30, ErrorMessage = "Максимальная длина 30 символов")]
        public string Name { get; set; }

        public User FormUser()
        {
            return new User
            {
                Email = Email,
                Password = Password,
                RoleId = (int)RoleEnum.Customer
            };
        }

        public CustomerInfo FormCustomerInfo()
        {
            return new CustomerInfo
            {
                Surname = Surname,
                Name = Name
            };
        }
    }
}