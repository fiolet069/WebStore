using System;
using System.Collections.Generic;

namespace Data.Models
{
    public partial class ProductProperty
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Value { get; set; }
        public int ProductId { get; set; }

        public virtual Product Product { get; set; }
    }
}
