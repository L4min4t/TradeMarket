using System.Globalization;
using System.Text;
using Context.Context;
using CsvHelper;
using Entities.Models.Application;
using Microsoft.EntityFrameworkCore;

namespace Context.Seeders;

public class CitySeeder
{
    public static async Task Seed(ApplicationContext context)
    {
        const string fileName = "Ukrainian_Cities.csv";
        var cities = new List<City>();
        var path = Path.Combine(Directory.GetCurrentDirectory(), fileName);

        using (var reader = new StreamReader(path, Encoding.UTF8))
        using (var csv = new CsvReader(reader, CultureInfo.InvariantCulture))
        {
            while (await csv.ReadAsync())
            {
                var city = new City { Name = csv[0], Region = csv[1], Status = csv[2] };
                cities.Add(city);
            }
        }
        
        if (cities.Any())
        {
            foreach (var city in cities)
            {
                var existingCity = await context.Cities
                    .FirstOrDefaultAsync(c => c.Name == city.Name &&
                                              c.Region == city.Region &&
                                              c.Status == city.Status);

                if (existingCity == null)
                {
                    await context.Cities.AddAsync(city);
                }
            }

            await context.SaveChangesAsync();
        }
    }
}