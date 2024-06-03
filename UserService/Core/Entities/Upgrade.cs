namespace UserService.Core.Entities;

public class Upgrade
{
    public int Id { get; set; }
    public string Img { get; set; }
    public string Name { get; set; }
    public string Desc { get; set; }
    public int Amount { get; set; }
    public int Cost { get; set; }
}