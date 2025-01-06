using BW_DOMAIN.Entities;
using BW_DOMAIN.Interfaces;
using System;
using System.Collections.Generic;

namespace BW_INFRAESTRUCTURA.Services
{
    public class TransaccionService : ITransaccionService
    {
        private readonly ITransaccionRepository _transaccionRepository;

        public TransaccionService(ITransaccionRepository transaccionRepository)
        {
            _transaccionRepository = transaccionRepository;
        }

        // Realiza una transacción bancaria
        public void RealizarTransaccion(TransferenciaBancaria transferencia)
        {
            if (transferencia == null)
                throw new ArgumentNullException(nameof(transferencia));

            if (!transferencia.EsMontoValido())
                throw new ArgumentException("El monto debe ser mayor que cero.");

            _transaccionRepository.GuardarTransferencia(transferencia);
        }

        // Obtiene el historial de transferencias de un cliente
        public IEnumerable<TransferenciaBancaria> ObtenerHistorialTransacciones(int clienteId)
        {
            if (clienteId <= 0)
                throw new ArgumentException("El ID del cliente debe ser válido.");

            return _transaccionRepository.ObtenerTransferenciasPorCliente(clienteId);
        }
    }
}
