using System.Threading.Tasks;
using System.Collections.Generic;
using Data.Models;

namespace Business.Interfaces
{
    public interface IPurchase
    {
        Task ExecutePurchase(List<Product> boxItems, string email);   
    }
}