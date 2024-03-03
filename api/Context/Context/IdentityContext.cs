using System.Data.Common;
using Entities.Models.Application;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Context.Context;

public class IdentityContext : IdentityDbContext<AuthUser>
{
    public IdentityContext(DbContextOptions<IdentityContext> options) : base(options)
    {
    }
}