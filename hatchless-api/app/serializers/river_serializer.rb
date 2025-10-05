class RiverSerializer < HatchlessSerializer
  attributes :id, :name, :description, :water_type, :designation, :designation_system, :latitude, :longitude, :created_at, :updated_at


  attribute :currently_hatching_insects do |river, params|
    InsectSerializer.serialize_collection(river.currently_hatching_insects, params: params)
  end
end
