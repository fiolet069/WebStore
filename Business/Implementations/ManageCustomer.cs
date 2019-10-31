using System.Threading.Tasks;
using System.Linq;
using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Data.Models;
using Business.Interfaces;

namespace Business.Implementations
{
    public class ManageCustomer : ICustomer
    {
        private WebStoreContext context;

        public ManageCustomer()
        {
            context = new WebStoreContext();
        }

        private async Task<User> GetUserAsync(string email) => await context.User.Include(a => a.CustomerInfo).FirstAsync(a => a.Email == email); 

        public async Task<float> GetCustomerBalanceAsync(string email)
        {
            var user = await GetUserAsync(email);        
            return user.CustomerInfo.Balance.Value;
        }

        public async Task<dynamic> GetHistoryPurchaseAsync(string email)
        {
            var user = await GetUserAsync(email);
            var purchaseWithProducts = await context.Purchase
                .Include(a => a.PurchaseProduct)
                .ThenInclude(a => a.Product)
                .Where(a => a.UserId == user.Id)
                .OrderByDescending(a => a.DateAndTime)
                .ToListAsync();

            var history = new List<dynamic>();
            purchaseWithProducts.ForEach(a => 
            {
                var itemHistory = new {
                    DateAndTime = a.DateAndTime,
                    ListProducts = new List<dynamic>()
                };

                a.PurchaseProduct.ToList().ForEach(b =>
                {
                    itemHistory.ListProducts.Add(new 
                    {
                        Name = b.Product.Name,
                        Cost = b.Product.Cost,
                        Amount = b.ProductAmount
                    });
                });

                history.Add(itemHistory);
            });

            return history;
        }

        public async Task<dynamic> GetCustomerDataAsync(string email)
        {
            var user = await GetUserAsync(email);
            return new 
            {
                user.Email,
                user.CustomerInfo.Surname,
                user.CustomerInfo.Name,
                user.CustomerInfo.Balance
            };
        }

        public async Task AddBalanceAsync(string email, float sum)
        {
            if(sum == 0)
                throw new Exception("Введите сумму на которую желаете увеличить баланс");

            var user = await GetUserAsync(email);
            user.CustomerInfo.Balance += sum;
            await context.SaveChangesAsync();
        }
    }
}