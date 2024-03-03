using AutoMapper;
using Entities.Dtos.City;
using Entities.Dtos.Poster;
using Entities.Dtos.User;
using Entities.Models.Application;
using Microsoft.IdentityModel.Tokens;
using Repositories.Interfaces;
using Services.Interfaces;

namespace Services.MappingProfiles;

public class MappingProfiles : Profile
{
    public MappingProfiles()
    {
        // City
        CreateMap<CityCreateDto, City>()
            .ForMember(dest => dest.Id, opt => opt.Ignore());
        CreateMap<CityUpdateDto, City>()
            .ForMember(dest => dest.Id, opt => opt.Ignore());

        // User
        CreateMap<UserCreateDto, User>()
            .ForMember(dest => dest.Id, opt => opt.Ignore());
        CreateMap<UserUpdateDto, User>()
            .ForMember(dest => dest.Id, opt => opt.Ignore());

        // Poster
        CreateMap<PosterCreateDto, Poster>()
            .ForMember(dest => dest.Id, opt => opt.Ignore());
        CreateMap<PosterUpdateDto, Poster>()
            .ForMember(dest => dest.Id, opt => opt.Ignore());
    }
}