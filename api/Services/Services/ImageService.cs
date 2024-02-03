using System.Drawing;
using Entities.Dtos.Image;
using Services.Interfaces;
using System.Drawing.Imaging;
using TradeMarket.Models.ResultPattern;
using Microsoft.AspNetCore.Mvc;


namespace Services.Services;

public class ImageService : IImageService
{
    public async Task<Result<bool>> UploadAsync(UploadImageModel model)
    {
        try
        {
            if (model.ImageFile != null && model.ImageFile.Length > 0)
            {
                if (!model.ImageFile.ContentType.StartsWith("image/"))
                {
                    return Result.Fail<bool>(
                        $"ImageService.UploadAsync ({model.GetType().Name}:{model.Id.ToString()})\n" +
                        $"Invalid image file"
                    );
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
                    return Result.Ok(true, $"/images/{jpegFileName}");
                }

            }
            return Result.Fail<bool>(
                $"ImageService.UploadAsync ({model.GetType().Name}:{model.Id.ToString()})\n" +
                $"Invalid image file"
            );
        }
        catch (Exception ex)
        {
            return Result.Fail<bool>(
                $"ImageService.UploadAsync ({model.GetType().Name}:{model.Id.ToString()})\n" +
                $"An exception occurred: {ex.Message}"
            );
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

                return Result.Ok(fileStreamResult, $"{filePath} image received.");
            }
            return Result.Fail<FileStreamResult>($"ImageService.GetImageAsync {fileName} not found.");
        }
        catch (Exception ex)
        {
            return Result.Fail<FileStreamResult>(
                $"ImageService.GetImageAsync ({id})\n" +
                $"An exception occurred: {ex.Message}"
            );
        }
    }
    
    public async Task<Result<bool>> DeleteImageAsync(Guid id)
    {
        try
        {
            var fileName = id.ToString().ToLower() + ".jpg";
            var filePath = Path.Combine("wwwroot/images", fileName.ToLower());

            if (System.IO.File.Exists(filePath))
            {
                System.IO.File.Delete(filePath);
                return Result.Ok(true, $"{filePath} image deleted successfully.");
            }
            else
            {
                return Result.Fail<bool>($"ImageService.DeleteImageAsync {fileName} not found.");
            }
        }
        catch (Exception ex)
        {
            return Result.Fail<bool>(
                $"ImageService.DeleteImageAsync ({id})\n" +
                $"An exception occurred: {ex.Message}"
            );
        }
    }
}