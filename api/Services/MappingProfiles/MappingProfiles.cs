using AutoMapper;
using Entities.Dtos.City;
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
        CreateMap<CityDto, City>()
            .ForMember(dest => dest.Id, opt => opt.Ignore())
            .ForMember(dest => dest.Name,
                opt => opt.Condition(src => !src.Name.IsNullOrEmpty()))
            .ForMember(dest => dest.Region,
                opt => opt.Condition(src => !src.Region.IsNullOrEmpty()))
            .ForMember(dest => dest.Status,
                opt => opt.Condition(src => !src.Status.IsNullOrEmpty()));
        
        // User
        CreateMap<UserDto, User>()
            .ForMember(dest => dest.Id, opt => opt.Ignore())
            .ForMember(dest => dest.Name,
                opt => opt.Condition(src => !src.Name.IsNullOrEmpty()));
            
    }
    
    
}