using System;
using System.Collections.Generic;

namespace Data.Models
{
    public partial class Product
    {
        public Product()
        {
            ProductProperty = new HashSet<ProductProperty>();
            PurchaseProduct = new HashSet<PurchaseProduct>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public float Cost { get; set; }
        public int Amount { get; set; }
        public bool? IsActive { get; set; }

        public virtual ICollection<ProductProperty> ProductProperty { get; set; }
        public virtual ICollection<PurchaseProduct> PurchaseProduct { get; set; }
    }
}
