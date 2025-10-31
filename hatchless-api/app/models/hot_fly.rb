class HotFly < HatchlessRecord
  belongs_to :fly_shop
  belongs_to :fly_pattern
  belongs_to :river, optional: true

  validates :fly_shop, :fly_pattern, presence: true

  scope :active, -> { where(active: true) }
  scope :for_fly_shop, ->(fly_shop_id) { where(fly_shop_id: fly_shop_id) }
  scope :for_river, ->(river_id) {
    base = joins(fly_shop: :shop_rivers)

    direct = base.where(hot_flies: { river_id: river_id })
    via_shop = base.where(hot_flies: { river_id: nil }).where(shop_rivers: { river_id: river_id })

    direct.or(via_shop).distinct
  }
end
