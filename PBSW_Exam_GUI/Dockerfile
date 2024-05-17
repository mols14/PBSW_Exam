FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src
COPY ["PBSW_Exam_GUI/PBSW_Exam_GUI.csproj", "PBSW_Exam_GUI/"]
RUN dotnet restore "PBSW_Exam_GUI/PBSW_Exam_GUI.csproj"
COPY . .
WORKDIR "/src/PBSW_Exam_GUI"
RUN dotnet build "PBSW_Exam_GUI.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "PBSW_Exam_GUI.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "PBSW_Exam_GUI.dll"]
