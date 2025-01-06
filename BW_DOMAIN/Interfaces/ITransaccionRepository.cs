using BW_DOMAIN.Entities;
using System.Collections.Generic;

namespace BW_DOMAIN.Interfaces
{
    public interface ITransaccionRepository
    {
        void GuardarTransferencia(TransferenciaBancaria transferencia);
        IEnumerable<TransferenciaBancaria> ObtenerTransferenciasPorCliente(int clienteId);
    }
}


