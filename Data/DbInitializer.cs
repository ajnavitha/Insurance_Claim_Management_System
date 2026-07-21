using InsuranceAPI.Models;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;

namespace InsuranceAPI.Data
{
    public static class DbInitializer
    {
        public static async Task SeedAdmin(ApplicationDbContext context)
        {
            await context.Database.MigrateAsync();

            if (!await context.Users.AnyAsync(u => u.Email == "admin@gmail.com"))
            {
                var admin = new User
                {
                    Name = "Administrator",
                    Age = 30,
                    Work = "System Administrator",
                    Email = "admin@gmail.com",
                    Phone = "9999999999",
                    Password = HashPassword("admin123"),
                    Role = "Admin"
                };

                context.Users.Add(admin);
            }

            // Seed Policies
            if (!await context.Policies.AnyAsync())
            {
                context.Policies.AddRange(
                    new Policy
                    {
                        PolicyName = "Health Secure Plus",
                        PolicyType = "Health",
                        PremiumAmount = 12000,
                        CoverageAmount = 1000000,
                        DurationInYears = 1,
                        Description = "Comprehensive health insurance for individuals and families."
                    },
                    new Policy
                    {
                        PolicyName = "Life Protect Gold",
                        PolicyType = "Life",
                        PremiumAmount = 18000,
                        CoverageAmount = 5000000,
                        DurationInYears = 20,
                        Description = "Life insurance with accidental coverage."
                    },
                    new Policy
                    {
                        PolicyName = "Car Shield Premium",
                        PolicyType = "Vehicle",
                        PremiumAmount = 9500,
                        CoverageAmount = 1500000,
                        DurationInYears = 1,
                        Description = "Comprehensive insurance for four-wheelers."
                    },
                    new Policy
                    {
                        PolicyName = "Bike Care Plan",
                        PolicyType = "Vehicle",
                        PremiumAmount = 3500,
                        CoverageAmount = 200000,
                        DurationInYears = 1,
                        Description = "Affordable insurance for two-wheelers."
                    },
                    new Policy
                    {
                        PolicyName = "Travel Safe International",
                        PolicyType = "Travel",
                        PremiumAmount = 5000,
                        CoverageAmount = 2500000,
                        DurationInYears = 1,
                        Description = "Worldwide travel insurance."
                    },
                    new Policy
                    {
                        PolicyName = "Home Secure Elite",
                        PolicyType = "Home",
                        PremiumAmount = 8500,
                        CoverageAmount = 4000000,
                        DurationInYears = 5,
                        Description = "Protection against fire, theft and natural disasters."
                    }
                );
            }

            await context.SaveChangesAsync();
        }

        private static string HashPassword(string password)
        {
            using var sha = SHA256.Create();
            var hash = sha.ComputeHash(Encoding.UTF8.GetBytes(password));
            return Convert.ToBase64String(hash);
        }
    }
}