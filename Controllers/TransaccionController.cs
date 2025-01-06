using BW_DOMAIN.Entities;
using BW_DOMAIN.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace BW_API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TransaccionController : ControllerBase
    {
        private readonly ITransaccionService _transaccionService;

        public TransaccionController(ITransaccionService transaccionService)
        {
            _transaccionService = transaccionService;
        }

        [HttpPost]
        public IActionResult RealizarTransaccion([FromBody] TransferenciaBancaria transferencia)
        {
            try
            {
                _transaccionService.RealizarTransaccion(transferencia);
                return Ok("Transacción realizada con éxito.");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{clienteId}")]
        public IActionResult ObtenerHistorial(int clienteId)
        {
            try
            {
                var historial = _transaccionService.ObtenerHistorialTransacciones(clienteId);
                return Ok(historial);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
