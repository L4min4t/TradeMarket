using Entities.Dtos.Image;
using Services.Interfaces;
using System.Drawing.Imaging;
using TradeMarket.Models.ResultPattern;
using Microsoft.AspNetCore.Mvc;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Processing;
using SixLabors.ImageSharp.Formats.Jpeg;
using System.IO;
using System.Threading.Tasks;


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
                {
                    var jpegFileName = model.Id + ".jpg";
                    var jpegFilePath = Path.Combine("wwwroot/images", jpegFileName);

                    // Load and process the image with ImageSharp
                    using (var image = Image.Load(inputStream))
                    {
                        // Resize the image as needed or apply other transformations
                        // For example, if you need to ensure a specific width and height, you could do:
                        // image.Mutate(x => x.Resize(newWidth, newHeight));

                        // If you just want to save the image without modifications but ensuring it has a white background:
                        // Note: This step might not be necessary if you don't need to transform the image.
                        // image.Mutate(x => x.BackgroundColor(Color.SlateGray));

                        await image.SaveAsJpegAsync(jpegFilePath);
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