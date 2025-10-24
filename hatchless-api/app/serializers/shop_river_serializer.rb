class ShopRiverSerializer < HatchlessSerializer
  attributes :id, :fly_shop_id, :river_id

  attribute :river do |shop_river|
    RiverSerializer.shallow_serialize(shop_river.river)
  end

  attribute :fly_shop do |shop_river|
    FlyShopSerializer.shallow_serialize(shop_river.fly_shop)
  end
end
