using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Context.Migrations
{
    /// <inheritdoc />
    public partial class UpdatedForeingKeyCreatorIdInPoster : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Posters_CreatorId",
                table: "Posters");

            migrationBuilder.CreateIndex(
                name: "IX_Posters_CreatorId",
                table: "Posters",
                column: "CreatorId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Posters_CreatorId",
                table: "Posters");

            migrationBuilder.CreateIndex(
                name: "IX_Posters_CreatorId",
                table: "Posters",
                column: "CreatorId",
                unique: true);
        }
    }
}
