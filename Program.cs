using Microsoft.EntityFrameworkCore;
using BW_DOMAIN.Interfaces;
using BW_INFRAESTRUCTURA.DatabaseContext;
using BW_INFRAESTRUCTURA.Repositories;
using BW_INFRAESTRUCTURA.Services;

public class Program
{   public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        // Configuración de la conexión a la base de datos
        builder.Services.AddDbContext<AppDbContext>(options =>
            options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

        // Registro de servicios (repositorios y lógica de negocio)
        builder.Services.AddScoped<ITransaccionRepository, TransaccionRepository>();
        builder.Services.AddScoped<ITransaccionService, TransaccionService>();

        // Configuración de servicios adicionales (controladores, Swagger)
        builder.Services.AddControllers();
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();

        // Crear la aplicación
        var app = builder.Build();

        // Condicional para desarrollo (Swagger)
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }

        // Configuración del pipeline de la API
        app.UseHttpsRedirection();
        app.UseAuthorization();
        app.MapControllers();

        // Ejecutar la aplicación
        app.Run();
    }
}


