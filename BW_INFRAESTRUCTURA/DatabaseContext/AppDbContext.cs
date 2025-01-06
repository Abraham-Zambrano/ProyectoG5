using BW_DOMAIN.Entities;
using Microsoft.EntityFrameworkCore;

namespace BW_INFRAESTRUCTURA.DatabaseContext
{
    public class AppDbContext : DbContext
    {
        public DbSet<TransferenciaBancaria> Transferencias { get; set; }
        public DbSet<Cliente> Clientes { get; set; }

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Configura las relaciones entre TransferenciaBancaria y Cliente
            modelBuilder.Entity<TransferenciaBancaria>()
                .HasOne(t => t.ClienteOrigen)
                .WithMany()  // Si hay una relación de uno a muchos, puedes usar WithMany()
                .HasForeignKey(t => t.ClienteOrigenId);

            modelBuilder.Entity<TransferenciaBancaria>()
                .HasOne(t => t.ClienteDestino)
                .WithMany()  // Si hay una relación de uno a muchos, puedes usar WithMany()
                .HasForeignKey(t => t.ClienteDestinoId);
        }
    }
}
