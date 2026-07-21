using FluentValidation;
using FluentValidation.AspNetCore;
using InsuranceAPI.Data;
using InsuranceAPI.DTOs;
using InsuranceAPI.Helpers;
using InsuranceAPI.Interfaces;
using InsuranceAPI.Middleware;
using InsuranceAPI.Services;
using InsuranceAPI.Validators;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;


var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

builder.Services.AddValidatorsFromAssemblyContaining<Program>();
builder.Services.AddScoped<IValidator<RegisterDto>, RegisterRequestValidator>();

builder.Services.AddFluentValidationAutoValidation();

builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<IAIChatService, AIChatService>();
builder.Services.AddSingleton<GeminiService>();
builder.Services.AddSingleton<AIService>();
builder.Services.AddScoped<JwtHelper>();

// Database
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(
        builder.Configuration.GetConnectionString("DefaultConnection")
    ));

// JWT Authentication
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,

            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],

            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]!))
        };
    });

// Authorization
builder.Services.AddAuthorization();

// Swagger
// Swagger
builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "InsuranceAPI",
        Version = "v1"
    });

    // JWT Authentication in Swagger
    options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Name = "Authorization",
        Description = "Enter JWT Token like: Bearer {your token}",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.Http,
        Scheme = "bearer",
        BearerFormat = "JWT"
    });

    options.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            Array.Empty<string>()
        }
    });
});

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReact", policy =>
    {
        policy
            .AllowAnyOrigin()
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
}); 

var app = builder.Build();

// Configure HTTP request pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


app.UseMiddleware<ExceptionMiddleware>();

//app.UseHttpsRedirection();
app.UseCors("AllowReact");

app.UseAuthentication();
app.UseAuthorization();
app.UseStaticFiles();
app.MapControllers();

using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();

    await DbInitializer.SeedAdmin(context);
}
app.Run();