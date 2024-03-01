using System.Drawing;
using Entities.Dtos.Image;
using Services.Interfaces;
using System.Drawing.Imaging;
using TradeMarket.Models.ResultPattern;
using Microsoft.AspNetCore.Mvc;


namespace Services.Services;

public class ImageService : IImageService
{
    public async Task<Result> UploadAsync(UploadImageModel model)
    {
        try
        {
            if (model.ImageFile != null && model.ImageFile.Length > 0)
            {
                if (!model.ImageFile.ContentType.StartsWith("image/"))
                {
                    return Result.Fail("Invalid image file!");
                }
            
                using (var inputStream = model.ImageFile.OpenReadStream())
                using (var originalImage = Image.FromStream(inputStream))
                {
                    var jpegFileName = model.Id + ".jpg";
                    var jpegFilePath = Path.Combine("wwwroot/images", jpegFileName);
                    
                    using (var bitmapWithWhiteBg = new Bitmap(originalImage.Width, originalImage.Height))
                    {
                        using (var graphics = Graphics.FromImage(bitmapWithWhiteBg))
                        {
                            graphics.Clear(Color.SlateGray);
                            graphics.DrawImage(originalImage, 
                                new Rectangle(0, 0, originalImage.Width, originalImage.Height));
                        }

                        bitmapWithWhiteBg.Save(jpegFilePath, ImageFormat.Jpeg);
                    }
                    return Result.Ok();
                }

            }
            return Result.Fail("Invalid image file!");
        }
        catch (Exception ex)
        {
            return Result.Fail("ImageService Server Fail!");
        }
    }
    
    
    public async Task<Result<FileStreamResult>> GetImageAsync(string id)
    {
        try
        {
            var fileName = id.ToLower() + ".jpg";

            var filePath = Path.Combine("wwwroot/images", fileName);

            if (System.IO.File.Exists(filePath))
            {
                var memory = new MemoryStream();
                using (var stream = new FileStream(filePath, FileMode.Open))
                {
                    await stream.CopyToAsync(memory);
                }
                memory.Position = 0;

                var fileStreamResult = new FileStreamResult(memory, "image/jpeg")
                {
                    FileDownloadName = fileName
                };

                return Result.Ok(fileStreamResult);
            }
            return Result.Fail<FileStreamResult>($"Image not found");
        }
        catch (Exception ex)
        {
            return Result.Fail<FileStreamResult>("ImageService Server Fail!");
        }
    }
    
    public async Task<Result> DeleteImageAsync(Guid id)
    {
        try
        {
            var fileName = id.ToString().ToLower() + ".jpg";
            var filePath = Path.Combine("wwwroot/images", fileName.ToLower());

            if (System.IO.File.Exists(filePath))
            {
                System.IO.File.Delete(filePath);
                return Result.Ok();
            }
            else
            {
                return Result.Fail($"Image not found.");
            }
        }
        catch (Exception ex)
        {
            return Result.Fail("ImageService Server Fail!");
        }
    }
}