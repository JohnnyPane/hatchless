class HotFly < HatchlessRecord
  belongs_to :fly_shop
  belongs_to :fly_pattern
  belongs_to :river, optional: true

  validates :fly_shop, :fly_pattern, presence: true

  scope :by_fly_shop, ->(fly_shop_id) { where(fly_shop_id: fly_shop_id) }
  scope :active, -> { where(active: true) }
end
