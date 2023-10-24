using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace capstone_server_side.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AspNetRoles",
                columns: table => new
                {
                    Id = table.Column<string>(type: "text", nullable: false),
                    Name = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    NormalizedName = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    ConcurrencyStamp = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetRoles", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUsers",
                columns: table => new
                {
                    Id = table.Column<string>(type: "text", nullable: false),
                    UserName = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    NormalizedUserName = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    Email = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    NormalizedEmail = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    EmailConfirmed = table.Column<bool>(type: "boolean", nullable: false),
                    PasswordHash = table.Column<string>(type: "text", nullable: true),
                    SecurityStamp = table.Column<string>(type: "text", nullable: true),
                    ConcurrencyStamp = table.Column<string>(type: "text", nullable: true),
                    PhoneNumber = table.Column<string>(type: "text", nullable: true),
                    PhoneNumberConfirmed = table.Column<bool>(type: "boolean", nullable: false),
                    TwoFactorEnabled = table.Column<bool>(type: "boolean", nullable: false),
                    LockoutEnd = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: true),
                    LockoutEnabled = table.Column<bool>(type: "boolean", nullable: false),
                    AccessFailedCount = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUsers", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "PropertyTypes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PropertyTypes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AspNetRoleClaims",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    RoleId = table.Column<string>(type: "text", nullable: false),
                    ClaimType = table.Column<string>(type: "text", nullable: true),
                    ClaimValue = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetRoleClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspNetRoleClaims_AspNetRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserClaims",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    UserId = table.Column<string>(type: "text", nullable: false),
                    ClaimType = table.Column<string>(type: "text", nullable: true),
                    ClaimValue = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspNetUserClaims_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserLogins",
                columns: table => new
                {
                    LoginProvider = table.Column<string>(type: "text", nullable: false),
                    ProviderKey = table.Column<string>(type: "text", nullable: false),
                    ProviderDisplayName = table.Column<string>(type: "text", nullable: true),
                    UserId = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserLogins", x => new { x.LoginProvider, x.ProviderKey });
                    table.ForeignKey(
                        name: "FK_AspNetUserLogins_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserRoles",
                columns: table => new
                {
                    UserId = table.Column<string>(type: "text", nullable: false),
                    RoleId = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserRoles", x => new { x.UserId, x.RoleId });
                    table.ForeignKey(
                        name: "FK_AspNetUserRoles_AspNetRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AspNetUserRoles_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserTokens",
                columns: table => new
                {
                    UserId = table.Column<string>(type: "text", nullable: false),
                    LoginProvider = table.Column<string>(type: "text", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Value = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserTokens", x => new { x.UserId, x.LoginProvider, x.Name });
                    table.ForeignKey(
                        name: "FK_AspNetUserTokens_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UserProfiles",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    FirstName = table.Column<string>(type: "text", nullable: false),
                    LastName = table.Column<string>(type: "text", nullable: false),
                    Address = table.Column<string>(type: "text", nullable: false),
                    IdentityUserId = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserProfiles", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserProfiles_AspNetUsers_IdentityUserId",
                        column: x => x.IdentityUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Properties",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Address = table.Column<string>(type: "text", nullable: false),
                    UserProfileId = table.Column<int>(type: "integer", nullable: false),
                    SqFt = table.Column<int>(type: "integer", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: false),
                    PropertyTypeId = table.Column<int>(type: "integer", nullable: false),
                    isActive = table.Column<bool>(type: "boolean", nullable: false),
                    CleaningCost = table.Column<decimal>(type: "numeric", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Properties", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Properties_PropertyTypes_PropertyTypeId",
                        column: x => x.PropertyTypeId,
                        principalTable: "PropertyTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Properties_UserProfiles_UserProfileId",
                        column: x => x.UserProfileId,
                        principalTable: "UserProfiles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CleaningJobs",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    PropertyId = table.Column<int>(type: "integer", nullable: false),
                    UserProfileId = table.Column<int>(type: "integer", nullable: false),
                    Date = table.Column<DateTime>(type: "timestamp without time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CleaningJobs", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CleaningJobs_Properties_PropertyId",
                        column: x => x.PropertyId,
                        principalTable: "Properties",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CleaningJobs_UserProfiles_UserProfileId",
                        column: x => x.UserProfileId,
                        principalTable: "UserProfiles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Images",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Url = table.Column<string>(type: "text", nullable: false),
                    PropertyId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Images", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Images_Properties_PropertyId",
                        column: x => x.PropertyId,
                        principalTable: "Properties",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "1a6a6a8c-8e5c-4bf2-9cb5-9c93e4d17b36", "1d2aaf1f-08cd-412f-b8b6-6094cdb68f66", "Host", "host" },
                    { "c3aaeb97-d2ba-4a53-a521-4eea61e59b35", "b123b2ce-a22d-4602-9d04-6436a87f51dd", "Admin", "admin" },
                    { "f0a7b0d7-25ab-4f2e-a9a4-6e84e99897c5", "4c76a2c9-3146-491b-8daf-ca5ccbd6a8d7", "Cleaner", "cleaner" }
                });

            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AccessFailedCount", "ConcurrencyStamp", "Email", "EmailConfirmed", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "SecurityStamp", "TwoFactorEnabled", "UserName" },
                values: new object[,]
                {
                    { "89b6e28a-98df-46b6-9dcb-3f7996f4d29f", 0, "3b72a51d-a209-4e25-9878-a7c1f17f7660", "michael@barrick.comx", false, false, null, null, null, "AQAAAAEAACcQAAAAEKPtlOpzF61YIXlftl0nxPYcT/xSR7uL+iAem/XmR1YG4S7zafu0hjtM1nbyfen1jQ==", null, false, "77014b18-2f6b-4324-914b-31a10b3ceee0", false, "mbarrick" },
                    { "a5fe6012-4e5d-4319-a5e3-62c0802f83b0", 0, "a2982db0-5a5f-4e55-a54a-6a23b0a12e3a", "barry@sanderson.comx", false, false, null, null, null, "AQAAAAEAACcQAAAAEENFwNageIfx81UIuWjbudFaLjIeGLFgqdkpIBAdgQuVuG3K9ah2e1118uZen/HAwQ==", null, false, "8bf23152-0616-4fd3-a2e6-3e0e7ae1a19e", false, "bsanderson" },
                    { "c451fa23-21d9-4959-9e08-2040a3a00a80", 0, "da51de76-3d83-44e8-930d-b1a437223c89", "joe@sampson.comx", false, false, null, null, null, "AQAAAAEAACcQAAAAEPpIGVY/ddTSTja9PXdNuMv1Ruewjlp3iQ1/Lfb/aFhhXVemCK7l6RloO2888cOz3A==", null, false, "3640334b-6a5e-4659-b34d-242730d2a568", false, "jsampson" },
                    { "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f", 0, "d2e6f0c3-fa34-4c70-b1a3-94013d424584", "admina@strator.comx", false, false, null, null, null, "AQAAAAEAACcQAAAAEDCrNs3Q1Ta5fIxjONb5btsSm6mXmZKyoJYmIKFuSq+FvXMg9QGKWRzTyxKGhUOrHA==", null, false, "5b8902b7-c974-4148-97c9-8429a55885bb", false, "Administrator" },
                    { "f9c38e11-ae67-483a-a2a7-88e1d3c917d6", 0, "1907324d-0cc2-4b8f-9517-c8abb532952c", "winnie@sanderson.comx", false, false, null, null, null, "AQAAAAEAACcQAAAAEOuD+hatFgJHV5RCpaINREmQktetrQOo017n+CTz2oIGGiL0YzLYU+MDiC1LSD2ctg==", null, false, "b3620a1c-12c2-4b22-869a-fef0e503e9f5", false, "wsanderson" }
                });

            migrationBuilder.InsertData(
                table: "PropertyTypes",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { 1, "Single-Family Home" },
                    { 2, "Duplex" },
                    { 3, "Condominium" },
                    { 4, "Manufactured" },
                    { 5, "Tiny Home" },
                    { 6, "Cabin" }
                });

            migrationBuilder.InsertData(
                table: "AspNetUserRoles",
                columns: new[] { "RoleId", "UserId" },
                values: new object[,]
                {
                    { "1a6a6a8c-8e5c-4bf2-9cb5-9c93e4d17b36", "89b6e28a-98df-46b6-9dcb-3f7996f4d29f" },
                    { "f0a7b0d7-25ab-4f2e-a9a4-6e84e99897c5", "a5fe6012-4e5d-4319-a5e3-62c0802f83b0" },
                    { "1a6a6a8c-8e5c-4bf2-9cb5-9c93e4d17b36", "c451fa23-21d9-4959-9e08-2040a3a00a80" },
                    { "c3aaeb97-d2ba-4a53-a521-4eea61e59b35", "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f" },
                    { "f0a7b0d7-25ab-4f2e-a9a4-6e84e99897c5", "f9c38e11-ae67-483a-a2a7-88e1d3c917d6" }
                });

            migrationBuilder.InsertData(
                table: "UserProfiles",
                columns: new[] { "Id", "Address", "FirstName", "IdentityUserId", "LastName" },
                values: new object[,]
                {
                    { 1, "101 Main Street", "Admina", "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f", "Strator" },
                    { 2, "3517 Gerald L. Bates Drive", "Barry", "a5fe6012-4e5d-4319-a5e3-62c0802f83b0", "Sanderson" },
                    { 3, "2706 Hamilton Avenue", "Michael", "89b6e28a-98df-46b6-9dcb-3f7996f4d29f", "Barrick" },
                    { 4, "3517 Gerald L. Bates Drive", "Winnie", "f9c38e11-ae67-483a-a2a7-88e1d3c917d6", "Sanderson" },
                    { 5, "457 Haight Street", "Joe", "c451fa23-21d9-4959-9e08-2040a3a00a80", "Sampson" }
                });

            migrationBuilder.InsertData(
                table: "Properties",
                columns: new[] { "Id", "Address", "CleaningCost", "Description", "PropertyTypeId", "SqFt", "UserProfileId", "isActive" },
                values: new object[] { 1, "15142 Mulholland Dr, Los Angeles, CA, 90077", 150.00m, "Rodney Walker designed mid-century located within prestigious Bel Air. This renovated and updated architectural gem is set up a private drive and boasts panoramic glass wall views of rolling hills, valley, and city lights from every location of its open floor plan. Skylights mixed with elements of glass, steel, concrete, and wood contrasted with the scenery give this home the outdoor feeling sought after by this masterful architect.", 1, 1542, 5, true });

            migrationBuilder.InsertData(
                table: "CleaningJobs",
                columns: new[] { "Id", "Date", "PropertyId", "UserProfileId" },
                values: new object[] { 1, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, 4 });

            migrationBuilder.InsertData(
                table: "Images",
                columns: new[] { "Id", "PropertyId", "Url" },
                values: new object[,]
                {
                    { 1, 1, "https://photos.zillowstatic.com/fp/6d17c3a534ab7a2ac07162af284921a1-uncropped_scaled_within_1536_1152.webp" },
                    { 2, 1, "https://photos.zillowstatic.com/fp/120013c596711cbe3e39b5e1bb8881a2-uncropped_scaled_within_1536_1152.webp" },
                    { 3, 1, "https://photos.zillowstatic.com/fp/f8502efdafe6a682646d832ad9c3641b-uncropped_scaled_within_1536_1152.webp" },
                    { 4, 1, "https://photos.zillowstatic.com/fp/6d17c3a534ab7a2ac07162af284921a1-uncropped_scaled_within_1536_1152.webp" },
                    { 5, 1, "https://photos.zillowstatic.com/fp/0779ac588dfeecf20adb1ff91724fb9a-uncropped_scaled_within_1536_1152.webp" },
                    { 6, 1, "https://photos.zillowstatic.com/fp/607dab54c778c9c420d3a7d905fdb485-uncropped_scaled_within_1536_1152.webp" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_AspNetRoleClaims_RoleId",
                table: "AspNetRoleClaims",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "RoleNameIndex",
                table: "AspNetRoles",
                column: "NormalizedName",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserClaims_UserId",
                table: "AspNetUserClaims",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserLogins_UserId",
                table: "AspNetUserLogins",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserRoles_RoleId",
                table: "AspNetUserRoles",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "EmailIndex",
                table: "AspNetUsers",
                column: "NormalizedEmail");

            migrationBuilder.CreateIndex(
                name: "UserNameIndex",
                table: "AspNetUsers",
                column: "NormalizedUserName",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_CleaningJobs_PropertyId",
                table: "CleaningJobs",
                column: "PropertyId");

            migrationBuilder.CreateIndex(
                name: "IX_CleaningJobs_UserProfileId",
                table: "CleaningJobs",
                column: "UserProfileId");

            migrationBuilder.CreateIndex(
                name: "IX_Images_PropertyId",
                table: "Images",
                column: "PropertyId");

            migrationBuilder.CreateIndex(
                name: "IX_Properties_PropertyTypeId",
                table: "Properties",
                column: "PropertyTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_Properties_UserProfileId",
                table: "Properties",
                column: "UserProfileId");

            migrationBuilder.CreateIndex(
                name: "IX_UserProfiles_IdentityUserId",
                table: "UserProfiles",
                column: "IdentityUserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AspNetRoleClaims");

            migrationBuilder.DropTable(
                name: "AspNetUserClaims");

            migrationBuilder.DropTable(
                name: "AspNetUserLogins");

            migrationBuilder.DropTable(
                name: "AspNetUserRoles");

            migrationBuilder.DropTable(
                name: "AspNetUserTokens");

            migrationBuilder.DropTable(
                name: "CleaningJobs");

            migrationBuilder.DropTable(
                name: "Images");

            migrationBuilder.DropTable(
                name: "AspNetRoles");

            migrationBuilder.DropTable(
                name: "Properties");

            migrationBuilder.DropTable(
                name: "PropertyTypes");

            migrationBuilder.DropTable(
                name: "UserProfiles");

            migrationBuilder.DropTable(
                name: "AspNetUsers");
        }
    }
}
