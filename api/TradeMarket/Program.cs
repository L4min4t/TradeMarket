using Context.Context;
using Context.Seeders;
using Microsoft.EntityFrameworkCore;
using Repositories.Interfaces;
using Repositories.Repositories;
using Services.Interfaces;
using Services.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<ApplicationContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("ApplicationConnection")));

builder.Services.AddScoped<IPosterRepository, PosterRepository>();
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<ICityRepository, CityRepository>();

builder.Services.AddScoped<IPosterService, PosterService>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<ICityService, CityService>();

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;

    var applicationContext = services.GetRequiredService<ApplicationContext>();

    if (applicationContext.Database.GetPendingMigrations().Any())
    {
        applicationContext.Database.Migrate();
    }

    await CitySeeder.Seed(applicationContext);
}

app.UseSwagger();
app.UseSwaggerUI();

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();