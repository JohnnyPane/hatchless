class FlyPatternSerializer < HatchlessSerializer
  attributes :id, :name, :notes, :category

  def self.shallow_attributes_list
    [ :id, :name, :notes, :category ]
  end
end
