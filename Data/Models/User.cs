using System;
using System.Collections.Generic;

namespace Data.Models
{
    public partial class User
    {
        public User()
        {
            Purchase = new HashSet<Purchase>();
        }

        public int Id { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public int RoleId { get; set; }

        public virtual Role Role { get; set; }
        public virtual CustomerInfo CustomerInfo { get; set; }
        public virtual ICollection<Purchase> Purchase { get; set; }
    }
}
