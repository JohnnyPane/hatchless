class HatchReportSerializer < HatchlessSerializer
  attributes :id, :notes, :observed_on, :verified

  attribute :fly_shop do |hatch_report|
    FlyShopSerializer.shallow_serialize(hatch_report.fly_shop) if hatch_report.fly_shop.present?
  end

  attribute :river do |hatch_report|
    RiverSerializer.shallow_serialize(hatch_report.river) if hatch_report.river.present?
  end

  attribute :user do |hatch_report|
    UserSerializer.shallow_serialize(hatch_report.user) if hatch_report.user.present?
  end

  attribute :insects do |hatch_report|
    InsectSerializer.shallow_serialize_collection(hatch_report.hatch_report_insects.map(&:insect))
  end

  attribute :author do |hatch_report|
    if hatch_report.fly_shop.present?
      { name: hatch_report.fly_shop.name, type: "Fly Shop" }
    elsif hatch_report.user.present?
      { name: hatch_report.user.name, type: "User" }
    else
      "Anonymous"
    end
  end

  def self.shallow_associations(hatch_report)
    {
      river: RiverSerializer.shallow_serialize(hatch_report.river),
      user: UserSerializer.shallow_serialize(hatch_report.user),
      fly_shop: FlyShopSerializer.shallow_serialize(hatch_report.fly_shop),
      insects: InsectSerializer.shallow_serialize_collection(hatch_report.hatch_report_insects.map(&:insect))
    }
  end
end
