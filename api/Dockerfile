FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src

COPY ["Constants/Constants.csproj", "Constants/"]
COPY ["Context/Context.csproj", "Context/"]
COPY ["Entities/Entities.csproj", "Entities/"]
COPY ["Repositories/Repositories.csproj", "Repositories/"]
COPY ["Services/Services.csproj", "Services/"]
COPY ["TradeMarket/TradeMarket.csproj", "TradeMarket/"]

RUN dotnet restore "TradeMarket/TradeMarket.csproj"

COPY . .
WORKDIR "/src/TradeMarket"
RUN dotnet build "TradeMarket.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "TradeMarket.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
COPY ["TradeMarket/Ukrainian_Cities.csv", "./Ukrainian_Cities.csv"]
ENTRYPOINT ["dotnet", "TradeMarket.dll"]