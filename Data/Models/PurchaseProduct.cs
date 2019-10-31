using System;
using System.Collections.Generic;

namespace Data.Models
{
    public partial class PurchaseProduct
    {
        public int PurchaseId { get; set; }
        public int ProductId { get; set; }
        public int ProductAmount { get; set; }

        public virtual Product Product { get; set; }
        public virtual Purchase Purchase { get; set; }
    }
}
