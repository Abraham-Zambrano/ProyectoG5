using BW_DOMAIN.Entities;

namespace BW_DOMAIN.Interfaces
{
    public interface ITransaccionService
    {
        void RealizarTransaccion(TransferenciaBancaria transferencia);
        IEnumerable<TransferenciaBancaria> ObtenerHistorialTransacciones(int clienteId);
    }
}
