namespace BW_DOMAIN.Entities
{
    public class TransferenciaBancaria
    {
        public int Id_Tr { get; set; }  // Usar un nombre distinto al de la clase
        public int ClienteOrigenId { get; set; }
        public int ClienteDestinoId { get; set; }
        public decimal Monto { get; set; }
        public DateTime Fecha { get; set; }

        // Si es necesario agregar propiedades de navegación
        public Cliente ClienteOrigen { get; set; }
        public Cliente ClienteDestino { get; set; }
         public bool EsMontoValido()
        {
            return Monto > 0; // Verifica si el monto es mayor a 0
        }
    }
}
