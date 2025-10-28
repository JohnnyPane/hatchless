class RiverSerializer < HatchlessSerializer
  attributes :id, :name, :description, :water_type, :designation, :designation_system, :latitude, :longitude, :created_at, :updated_at


  attribute :currently_hatching_insects, if: proc { |_, params| show_only?(params) } do |river|
    InsectSerializer.shallow_serialize_collection(Insect.currently_hatching_for_river(river.id))
  end

  attribute :fly_shops do |river|
    FlyShopSerializer.shallow_serialize_collection(river.fly_shops)
  end

  def self.shallow_attributes_list
    [ :id, :name, :water_type, :designation, :designation_system, :latitude, :longitude ]
  end
end
