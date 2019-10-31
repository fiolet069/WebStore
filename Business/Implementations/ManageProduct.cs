using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Business.Interfaces;
using Data.Models;

namespace Business.Implementations
{
    public class ManageProduct : IProduct
    {
        private WebStoreContext context;

        public ManageProduct()
        {
            context = new WebStoreContext();
        }

        public async Task<bool> ExistsProductAsync(string name) => await context.Product.AnyAsync(a => a.Name == name);

        public async Task AddProductAsync(Product product, List<ProductProperty> chars)
        {
            await context.Product.AddAsync(product);
            await context.SaveChangesAsync();

            chars.ForEach(item => item.ProductId = product.Id);
            await context.AddRangeAsync(chars);
            await context.SaveChangesAsync();
        }

        public async Task<IEnumerable<dynamic>> GetListProductsAsync(bool? active = null)
        {
            var list = new List<dynamic>();

            List<Product> products;
            if(active != null)
                products = await context.Product.Include(a => a.ProductProperty).Where(a => a.IsActive == active).ToListAsync();
            else
                products = await context.Product.Include(a => a.ProductProperty).ToListAsync();

            products.ForEach(product => {
                var item = new {
                    Id = product.Id,
                    Name = product.Name,
                    Cost = product.Cost,
                    Amount = product.Amount,
                    IsActive = product.IsActive,
                    Chars = new List<dynamic>()
                };

                product.ProductProperty.ToList().ForEach(prop => {
                    item.Chars.Add(new {
                        Id = prop.Id,
                        Name = prop.Name,
                        Value = prop.Value
                    });
                });

                list.Add(item);
            });

            return list;
        }

        public async Task ActivateProductAsync(int id)
        {
            var prod = await context.Product.FindAsync(id);
            prod.IsActive = true;
            await context.SaveChangesAsync();
        }

        public async Task DeactivateProductAsync(int id)
        {
            var prod = await context.Product.FindAsync(id);
            prod.IsActive = false;
            await context.SaveChangesAsync();
        }
    }
}