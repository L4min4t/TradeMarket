using Entities.Dtos.Image;
using Microsoft.AspNetCore.Mvc;
using TradeMarket.Models.ResultPattern;

namespace Services.Interfaces;

public interface IImageService
{
    Task<Result<bool>> UploadAsync(UploadImageModel model);
    Task<Result<FileStreamResult>> GetImageAsync(string fileName);
    Task<Result<bool>> DeleteImageAsync(string id);
}