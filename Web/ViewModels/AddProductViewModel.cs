using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using Data.Models;

namespace Web.ViewModels
{
    public class AddProductViewModel
    {
        [Required(ErrorMessage = "Введите название товара")]
        public string Name { get; set; }

        [Required(ErrorMessage = "Введите стоимость товара")]
        public float? Cost { get; set; }

        [Required(ErrorMessage = "Введите количество товара")]
        public int? Amount { get; set; }

        [Required(ErrorMessage = "Добавьте хотя бы одну характеристику")]
        [MinLength(1, ErrorMessage = "Добавьте хотя бы одну характеристику")]
        public List<ProductProperty> Chars { get; set; }

        public Product FormProduct()
        {
            return new Product
            {
                Name = Name,
                Cost = Cost.Value,
                Amount = Amount.Value
            };
        }
    }
}