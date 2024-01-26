using AutoMapper;
using Entities.Dtos.City;
using Entities.Models.Application;
using Microsoft.IdentityModel.Tokens;

namespace Services.MappingProfiles;

public class MappingProfiles : Profile
{
    public MappingProfiles()
    {
        // City
        CreateMap<CityCreateDto, City>()
            .ForMember(dest => dest.Id, opt => opt.Ignore())
            .ForMember(dest => dest.Name,
                opt => opt.Condition(src => !src.Name.IsNullOrEmpty()))
            .ForMember(dest => dest.Region,
                opt => opt.Condition(src => !src.Region.IsNullOrEmpty()))
            .ForMember(dest => dest.Status,
                opt => opt.Condition(src => !src.Status.IsNullOrEmpty()));
        CreateMap<CityUpdateDto, City>()
            .ForMember(dest => dest.Id, opt => opt.Ignore())
            .ForMember(dest => dest.Name,
                opt => opt.Condition(src => !src.Name.IsNullOrEmpty()))
            .ForMember(dest => dest.Region,
                opt => opt.Condition(src => !src.Region.IsNullOrEmpty()))
            .ForMember(dest => dest.Status,
                opt => opt.Condition(src => !src.Status.IsNullOrEmpty()));
    }
}