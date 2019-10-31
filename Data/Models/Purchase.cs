using System;
using System.Collections.Generic;

namespace Data.Models
{
    public partial class Purchase
    {
        public Purchase()
        {
            PurchaseProduct = new HashSet<PurchaseProduct>();
        }

        public int Id { get; set; }
        public DateTime DateAndTime { get; set; }
        public int UserId { get; set; }

        public virtual User User { get; set; }
        public virtual ICollection<PurchaseProduct> PurchaseProduct { get; set; }
    }
}
