using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Business.Interfaces;
using Data.Models;
using Data.Enums;

namespace Business.Implementations
{
    public class AuthUser : IUser
    {
        private WebStoreContext context;

        public AuthUser()
        {
            context = new WebStoreContext();
        }

        public async Task<User> GetUserInfoAsync(string email, string password)
        {
            return await context.User.Include(a => a.Role).FirstOrDefaultAsync(a => a.Email == email && a.Password == password);
        }

        public async Task<bool> ExistsUserAsync(string email)
        {
            return (await context.User.FirstOrDefaultAsync(a => a.Email == email)) != null;
        }

        public async Task AddCustomerAsync(User user, CustomerInfo customerInfo)
        {
            await context.AddAsync(user);
            await context.SaveChangesAsync();

            customerInfo.Id = user.Id;
            await context.CustomerInfo.AddAsync(customerInfo);
            await context.SaveChangesAsync();
        }
    }
}