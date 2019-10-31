using System.Threading.Tasks;
using System.Collections.Generic;
using Data.Models;

namespace Business.Interfaces
{
    public interface IStaff
    {
        Task AddSellerAsync(User user);
        Task<List<User>> GetListSellersAsync();
        Task DeleteSellerAsync(int id);
    }
}