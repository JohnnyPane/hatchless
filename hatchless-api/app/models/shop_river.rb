class ShopRiver < HatchlessRecord
  belongs_to :fly_shop
  belongs_to :river

  validates :fly_shop_id, presence: true
  validates :river_id, presence: true
end
