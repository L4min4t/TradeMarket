using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Context.Migrations
{
    /// <inheritdoc />
    public partial class UpdatedForeingkeyRelationship : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_LikedPosters_Posters_PosterId",
                table: "LikedPosters");

            migrationBuilder.DropForeignKey(
                name: "FK_LikedPosters_Users_UserId",
                table: "LikedPosters");

            migrationBuilder.AddForeignKey(
                name: "FK_LikedPosters_Posters_PosterId",
                table: "LikedPosters",
                column: "PosterId",
                principalTable: "Posters",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_LikedPosters_Users_UserId",
                table: "LikedPosters",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_LikedPosters_Posters_PosterId",
                table: "LikedPosters");

            migrationBuilder.DropForeignKey(
                name: "FK_LikedPosters_Users_UserId",
                table: "LikedPosters");

            migrationBuilder.AddForeignKey(
                name: "FK_LikedPosters_Posters_PosterId",
                table: "LikedPosters",
                column: "PosterId",
                principalTable: "Posters",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_LikedPosters_Users_UserId",
                table: "LikedPosters",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
