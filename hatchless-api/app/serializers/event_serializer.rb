class EventSerializer < HatchlessSerializer
  attributes :id, :name, :description, :start_time, :price_cents, :end_time, :location, :fly_shop_id

  attribute :fly_shop do |event|
    FlyShopSerializer.shallow_serialize(event.fly_shop)
  end

  attribute :image_url do |event|
    event.image_urls(:default).first[:image_url]
  end
end
