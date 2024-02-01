using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Context.Migrations
{
    /// <inheritdoc />
    public partial class RestrictOnLikedPostersDeletionAdded : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_LikedPosters_Posters_PosterId",
                table: "LikedPosters");

            migrationBuilder.AddForeignKey(
                name: "FK_LikedPosters_Posters_PosterId",
                table: "LikedPosters",
                column: "PosterId",
                principalTable: "Posters",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_LikedPosters_Posters_PosterId",
                table: "LikedPosters");

            migrationBuilder.AddForeignKey(
                name: "FK_LikedPosters_Posters_PosterId",
                table: "LikedPosters",
                column: "PosterId",
                principalTable: "Posters",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
