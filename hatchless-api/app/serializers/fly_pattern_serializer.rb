class FlyPatternSerializer < HatchlessSerializer
  attributes :id, :name, :description, :category

  def self.shallow_attributes_list
    [ :id, :name, :description, :category ]
  end
end
