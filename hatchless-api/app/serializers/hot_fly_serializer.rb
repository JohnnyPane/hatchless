class HotFlySerializer < HatchlessSerializer
  attributes :id, :active, :expires_at, :notes

  attribute :fly_pattern do |hot_fly|
    FlyPatternSerializer.shallow_serialize(hot_fly.fly_pattern)
  end

  attribute :river do |hot_fly|
    if hot_fly.river.present?
      RiverSerializer.shallow_serialize(hot_fly.river)
    else
      nil
    end
  end

  def self.shallow_attributes_list
    [ :id, :active, :expires_at, :notes ]
  end
end
