class HatchReportSerializer < HatchlessSerializer
  attributes :id, :notes, :observed_on, :verified

  def self.shallow_associations(hatch_report)
    {
      river: RiverSerializer.shallow_serialize(hatch_report.river),
      user: UserSerializer.shallow_serialize(hatch_report.user),
      fly_shop: FlyShopSerializer.shallow_serialize(hatch_report.fly_shop),
      insects: InsectSerializer.shallow_serialize_collection(hatch_report.insects)
    }
  end
end