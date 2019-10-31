using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Business.Interfaces;
using Data.Models;
using Data.Enums;

namespace Business.Implementations
{
    public class ManageStaff : IStaff
    {
        private WebStoreContext context;

        public ManageStaff()
        {
            context = new WebStoreContext();
        }

        public async Task AddSellerAsync(User user)
        {
            await context.User.AddAsync(user);
            await context.SaveChangesAsync();
        }

        public async Task<List<User>> GetListSellersAsync() => await context.User.Where(a => a.RoleId == (int)RoleEnum.Seller).ToListAsync();

        public async Task DeleteSellerAsync(int id)
        {
            var user = await context.User.FirstAsync(a => a.Id == id);
            context.User.Remove(user);
            await context.SaveChangesAsync();
        }
    }
}