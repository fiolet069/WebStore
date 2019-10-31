using System.Threading.Tasks;
using System.Collections.Generic;
using Data.Models;

namespace Business.Interfaces
{
    public interface IProduct
    {
        Task<bool> ExistsProductAsync(string name);
        Task AddProductAsync(Product product, List<ProductProperty> chars);
        Task<IEnumerable<dynamic>> GetListProductsAsync(bool? active = null);
        Task ActivateProductAsync(int id);
        Task DeactivateProductAsync(int id);
    }
}