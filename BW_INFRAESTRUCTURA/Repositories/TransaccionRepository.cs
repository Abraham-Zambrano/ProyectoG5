using BW_DOMAIN.Entities;
using BW_DOMAIN.Interfaces;
using BW_INFRAESTRUCTURA.DatabaseContext;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace BW_INFRAESTRUCTURA.Repositories
{
    public class TransaccionRepository : ITransaccionRepository
    {
        private readonly AppDbContext _context;

        public TransaccionRepository(AppDbContext context)
        {
            _context = context;
        }

        public void GuardarTransferencia(TransferenciaBancaria transferencia)
        {
            _context.Transferencias.Add(transferencia);
            _context.SaveChanges();
        }

        public IEnumerable<TransferenciaBancaria> ObtenerTransferenciasPorCliente(int clienteId)
        {
            return _context.Transferencias
                           .Where(t => t.ClienteOrigenId == clienteId || t.ClienteDestinoId == clienteId)
                           .ToList();
        }
    }
}
