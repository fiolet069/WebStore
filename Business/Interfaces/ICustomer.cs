using System.Threading.Tasks;

namespace Business.Interfaces
{
    public interface ICustomer
    {
        Task<float> GetCustomerBalanceAsync(string email);
        Task<dynamic> GetHistoryPurchaseAsync(string email);
        Task<dynamic> GetCustomerDataAsync(string email);
        Task AddBalanceAsync(string email, float sum);
    }
}