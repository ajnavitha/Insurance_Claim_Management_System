using InsuranceAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace InsuranceAPI.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Claim> Claims { get; set; }
        public DbSet<Policy> Policies { get; set; }
        public DbSet<Notification> Notifications { get; set; }

        public DbSet<SupportTicket> SupportTickets { get; set; }
        public DbSet<Payment> Payments { get; set; }
        public DbSet<UserPolicy> UserPolicies { get; set; }
        public DbSet<ClaimDocument> ClaimDocuments { get; set; }
        public DbSet<FavoritePolicy> FavoritePolicies { get; set; }
        public DbSet<FraudAlert> FraudAlerts { get; set; }
        public DbSet<CustomerActivity> CustomerActivities { get; set; }
        public DbSet<BankAccount> BankAccounts { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Claim>()
                .Property(c => c.Amount)
                .HasPrecision(18, 2);

            modelBuilder.Entity<Policy>()
                .Property(p => p.PremiumAmount)
                .HasPrecision(18, 2);

            modelBuilder.Entity<Policy>()
                .Property(p => p.CoverageAmount)
                .HasPrecision(18, 2);

            modelBuilder.Entity<Payment>()
                .Property(p => p.Amount)
                .HasPrecision(18, 2);

            modelBuilder.Entity<BankAccount>()
                .Property(b => b.Balance)
                .HasPrecision(18, 2);

            modelBuilder.Entity<BankAccount>()
                .Property(b => b.AvailableBalance)
                .HasPrecision(18, 2);
        }
    }
}