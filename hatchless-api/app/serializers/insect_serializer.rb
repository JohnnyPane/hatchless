class InsectSerializer < HatchlessSerializer
  attributes :id, :common_name, :scientific_name, :description, :min_size, :max_size, :colors

  def self.shallow_attributes_list
    [ :id, :common_name, :scientific_name, :description, :min_size, :max_size, :colors ]
  end

  def self.shallow_associations(insect)
    {
      fly_patterns: FlyPatternSerializer.shallow_serialize_collection(insect.fly_patterns)
    }
  end
end
