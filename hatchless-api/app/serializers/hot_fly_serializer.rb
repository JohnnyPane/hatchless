class HotFlySerializer < HatchlessSerializer
  attributes :id, :active, :expires_at, :notes, :min_size, :max_size, :created_at

  attribute :fly_pattern do |hot_fly|
    FlyPatternSerializer.shallow_serialize(hot_fly.fly_pattern)
  end

  attribute :image_url do |hot_fly|
    hot_fly.fly_pattern.image_urls(:thumbnail).first[:image_url]
  end

  attribute :river do |hot_fly|
    if hot_fly.river.present?
      RiverSerializer.shallow_serialize(hot_fly.river)
    else
      nil
    end
  end

  attribute :fly_shop do |hot_fly|
    FlyShopSerializer.shallow_serialize(hot_fly.fly_shop)
  end

  def self.shallow_attributes_list
    [ :id, :active, :expires_at, :notes, :min_size, :max_size ]
  end
end
