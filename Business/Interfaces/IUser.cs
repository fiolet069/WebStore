using System.Threading.Tasks;
using Data.Models;

namespace Business.Interfaces 
{
    public interface IUser
    {
        Task<User> GetUserInfoAsync(string email, string password);
        Task<bool> ExistsUserAsync(string email);
        Task AddCustomerAsync(User user, CustomerInfo customerInfo);
    }
}