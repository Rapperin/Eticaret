using API.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<StoreContext>(opt => {
    opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});

builder.Services.AddCors(); //Origin servisi(yerel bilgisayarın bağlantısını değiştirmek için ilk adım sayılabilir.)
var app = builder.Build();  


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
//burada origin servisinin gösterdiği locali değiştiriyorum
// lambda ifadesi ile tüm yöntemlere izin verip değiştirdim
app.UseCors(opt=>{opt.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:3000");});



app.UseAuthorization();

app.MapControllers();
var scope =app.Services.CreateScope();
var context = scope.ServiceProvider.GetRequiredService<StoreContext>();
var logger =scope.ServiceProvider.GetRequiredService<ILogger<Program>>();
try
{
    context.Database.Migrate();
    DbInitializer.Initialize(context);

}
catch (Exception ex)
{
   logger.LogError(ex , "Geçiş sırasında bir problemimiz var");

}

app.Run();
