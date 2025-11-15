class FlyPackItemSerializer < HatchlessSerializer
  attributes :id, :quantity, :created_at, :updated_at

  attribute :fly_pattern do |fly_pack_item|
    FlyPatternSerializer.shallow_serialize(fly_pack_item.fly_pattern)
  end

  def self.shallow_attributes_list
    [ :id, :quantity ]
  end

  def self.shallow_associations(fly_pack_item)
    {
      fly_pattern: FlyPatternSerializer.shallow_serialize(fly_pack_item.fly_pattern)
    }
  end
end