class FishSerializer < HatchlessSerializer
  attributes :id, :common_name, :scientific_name, :description

  def self.shallow_attributes_list
    [ :id, :common_name, :scientific_name, :description ]
  end
end