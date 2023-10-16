using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using capstone_server_side.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authorization.Infrastructure;

namespace capstone_server_side.Data;
public class capstone_server_sideDbContext : IdentityDbContext<IdentityUser>
{
    private readonly IConfiguration _configuration;
    public DbSet<UserProfile> UserProfiles { get; set; }
    public DbSet<Property> Properties { get; set; }
    public DbSet<CleaningJob> CleaningJobs { get; set; }
    public DbSet<PropertyType> PropertyTypes { get; set; }
     

    public capstone_server_sideDbContext(DbContextOptions<capstone_server_sideDbContext> context, IConfiguration config) : base(context)
    {
        _configuration = config;
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<IdentityRole>().HasData(new IdentityRole[]
        {
            new IdentityRole
            {
            Id = "c3aaeb97-d2ba-4a53-a521-4eea61e59b35",
            Name = "Admin",
            NormalizedName = "admin"
            },
            new IdentityRole
            {
            Id = "1a6a6a8c-8e5c-4bf2-9cb5-9c93e4d17b36",
            Name = "Host",
            NormalizedName = "host"
            },
            new IdentityRole
            {
            Id = "f0a7b0d7-25ab-4f2e-a9a4-6e84e99897c5",
            Name = "Cleaner",
            NormalizedName = "cleaner"
            }
        });


        modelBuilder.Entity<IdentityUser>().HasData(new IdentityUser[]
        {
            new IdentityUser {
            Id = "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f",
            UserName = "Administrator",
            Email = "admina@strator.comx",
            PasswordHash = new PasswordHasher<IdentityUser>().HashPassword(null, _configuration["AdminPassword"])
            },
            new IdentityUser {
            Id = "a5fe6012-4e5d-4319-a5e3-62c0802f83b0",
            UserName = "bsanderson",
            Email = "barry@sanderson.comx",
            PasswordHash = new PasswordHasher<IdentityUser>().HashPassword(null, _configuration["AdminPassword"])
            },
            new IdentityUser {
            Id = "89b6e28a-98df-46b6-9dcb-3f7996f4d29f",
            UserName = "mbarrick",
            Email = "michael@barrick.comx",
            PasswordHash = new PasswordHasher<IdentityUser>().HashPassword(null, _configuration["AdminPassword"])
            },
            new IdentityUser {
            Id = "f9c38e11-ae67-483a-a2a7-88e1d3c917d6",
            UserName = "wsanderson",
            Email = "winnie@sanderson.comx",
            PasswordHash = new PasswordHasher<IdentityUser>().HashPassword(null, _configuration["AdminPassword"])
            },
            new IdentityUser {
            Id = "c451fa23-21d9-4959-9e08-2040a3a00a80",
            UserName = "jsampson",
            Email = "joe@sampson.comx",
            PasswordHash = new PasswordHasher<IdentityUser>().HashPassword(null, _configuration["AdminPassword"])
            },

        });


        modelBuilder.Entity<IdentityUserRole<string>>().HasData(new IdentityUserRole<string>[]
        {
            new IdentityUserRole<string>{
            RoleId = "c3aaeb97-d2ba-4a53-a521-4eea61e59b35",
            UserId = "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f"
            },
            new IdentityUserRole<string>{
            RoleId = "f0a7b0d7-25ab-4f2e-a9a4-6e84e99897c5",
            UserId = "a5fe6012-4e5d-4319-a5e3-62c0802f83b0"
            },
            new IdentityUserRole<string>{
            RoleId = "1a6a6a8c-8e5c-4bf2-9cb5-9c93e4d17b36",
            UserId = "89b6e28a-98df-46b6-9dcb-3f7996f4d29f"
            },
            new IdentityUserRole<string>{
            RoleId = "f0a7b0d7-25ab-4f2e-a9a4-6e84e99897c5",
            UserId = "f9c38e11-ae67-483a-a2a7-88e1d3c917d6"
            },
            new IdentityUserRole<string>{
            RoleId = "1a6a6a8c-8e5c-4bf2-9cb5-9c93e4d17b36",
            UserId = "c451fa23-21d9-4959-9e08-2040a3a00a80"
            }
            
        });
        modelBuilder.Entity<UserProfile>().HasData(new UserProfile[]
        {
            new UserProfile{
            Id = 1,
            IdentityUserId = "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f",
            FirstName = "Admina",
            LastName = "Strator",
            Address = "101 Main Street",
            },
            new UserProfile{
            Id = 2,
            IdentityUserId = "a5fe6012-4e5d-4319-a5e3-62c0802f83b0",
            FirstName = "Barry",
            LastName = "Sanderson",
            Address = "3517 Gerald L. Bates Drive",
            },
            new UserProfile{
            Id = 3,
            IdentityUserId = "89b6e28a-98df-46b6-9dcb-3f7996f4d29f",
            FirstName = "Michael",
            LastName = "Barrick",
            Address = "2706 Hamilton Avenue",
            },
            new UserProfile{
            Id = 4,
            IdentityUserId = "f9c38e11-ae67-483a-a2a7-88e1d3c917d6",
            FirstName = "Winnie",
            LastName = "Sanderson",
            Address = "3517 Gerald L. Bates Drive",
            },
            new UserProfile{
            Id = 5,
            IdentityUserId = "c451fa23-21d9-4959-9e08-2040a3a00a80",
            FirstName = "Joe",
            LastName = "Sampson",
            Address = "457 Haight Street",
            }

        });

        modelBuilder.Entity<PropertyType>().HasData(new PropertyType[] 
        {
            new PropertyType {
                Id = 1,
                Name = "Single-Family Home"
            },
            new PropertyType {
                Id = 2,
                Name = "Duplex"
            },
            new PropertyType {
                Id = 3,
                Name = "Condominium"
            },
            new PropertyType {
                Id = 4,
                Name = "Manufactured"
            },
            new PropertyType {
                Id = 5,
                Name = "Tiny Home"
            },
            new PropertyType {
                Id = 6,
                Name = "Cabin"
            }
            
        });

        modelBuilder.Entity<Property>().HasData(new Property[] {
            new Property {
                Id = 1,
                Address = "15142 Mulholland Dr, Los Angeles, CA, 90077",
                UserProfileId = 5,
                SqFt = 1542,
                Description = "Rodney Walker designed mid-century located within prestigious Bel Air. This renovated and updated architectural gem is set up a private drive and boasts panoramic glass wall views of rolling hills, valley, and city lights from every location of its open floor plan. Skylights mixed with elements of glass, steel, concrete, and wood contrasted with the scenery give this home the outdoor feeling sought after by this masterful architect.",
                PropertyTypeId = 1,
                ImageUrls = new List<string>
                {
                    "https://photos.zillowstatic.com/fp/6d17c3a534ab7a2ac07162af284921a1-uncropped_scaled_within_1536_1152.webp",
                    "https://photos.zillowstatic.com/fp/120013c596711cbe3e39b5e1bb8881a2-uncropped_scaled_within_1536_1152.webp",
                    "https://photos.zillowstatic.com/fp/f8502efdafe6a682646d832ad9c3641b-uncropped_scaled_within_1536_1152.webp",
                    "https://photos.zillowstatic.com/fp/b82e8bbc6ce240c94ee9fdd1735e6e0a-uncropped_scaled_within_1536_1152.webp",
                    "https://photos.zillowstatic.com/fp/0779ac588dfeecf20adb1ff91724fb9a-uncropped_scaled_within_1536_1152.webp",
                    "https://photos.zillowstatic.com/fp/607dab54c778c9c420d3a7d905fdb485-uncropped_scaled_within_1536_1152.webp"
                }
            },

        });

        modelBuilder.Entity<CleaningJob>().HasData(new CleaningJob[] 
        {
            new CleaningJob {
                Id = 1,
                PropertyId = 1,
                UserProfileId = 4
            }
        });

        
    }
}