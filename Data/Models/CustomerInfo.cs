using System;
using System.Collections.Generic;

namespace Data.Models
{
    public partial class CustomerInfo
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public float? Balance { get; set; }

        public virtual User IdNavigation { get; set; }
    }
}
