class FlyPackSerializer < HatchlessSerializer
  attributes :id, :name, :description, :price_cents, :created_at, :updated_at

  attribute :fly_pack_items do |fly_pack|
    FlyPackItemSerializer.shallow_serialize_collection(fly_pack.fly_pack_items)
  end

  attribute :fish do |fly_pack|
    FishSerializer.shallow_serialize_collection(fly_pack.fish)
  end

  attribute :image_urls do |fly_pack|
    fly_pack.fly_pack_items.map do |item|
      item.fly_pattern.thumbnail_image_urls.first
    end
  end
end

