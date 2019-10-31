using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;
using System;
using Microsoft.EntityFrameworkCore;
using Business.Interfaces;
using Data.Models;

namespace Business.Implementations
{
    public class ManagePurchase : IPurchase
    {
        private WebStoreContext context;

        public ManagePurchase()
        {
            context = new WebStoreContext();
        }

        public async Task ExecutePurchase(List<Product> boxItems, string email)
        {
            var user = await context.User.Include(a => a.CustomerInfo).FirstAsync(a => a.Email == email);
            var products = await context.Product.Where(a => boxItems.Select(b => b.Id).Contains(a.Id)).ToListAsync();

            var costPurchase = 0.0f;
            boxItems.ForEach(a => 
            {
                var prod = products.Find(b => b.Id == a.Id);
                if(prod.Amount < a.Amount)
                    throw new Exception($"Товара \"{prod.Name}\" недостаточно в магазине");
                else
                {
                    prod.Amount -= a.Amount;
                    costPurchase += a.Amount * prod.Cost;
                }
            });

            if(costPurchase > user.CustomerInfo.Balance)
                throw new Exception("У вас недостаточно средств на счёте");
            else
                user.CustomerInfo.Balance -= costPurchase;

            await context.SaveChangesAsync();


            var purchase = new Purchase
            {
                DateAndTime = DateTime.Now,
                UserId = user.Id
            };
            await context.Purchase.AddAsync(purchase);
            await context.SaveChangesAsync();

            var purchaseItems = new List<PurchaseProduct>();
            boxItems.ForEach(a => 
            {
                purchaseItems.Add(new PurchaseProduct
                {
                    PurchaseId = purchase.Id,
                    ProductId = a.Id,
                    ProductAmount = a.Amount
                });
            });
            await context.PurchaseProduct.AddRangeAsync(purchaseItems);
            await context.SaveChangesAsync();
        }
    }
}