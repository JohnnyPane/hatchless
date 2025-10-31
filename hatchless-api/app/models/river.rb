class River < HatchlessRecord
  enum :water_type, { tailwater: 0, freestone: 1, spring_creek: 2 }

  validates :name, presence: true

  has_many :hatch_windows, dependent: :destroy
  has_many :insects, through: :hatch_windows
  has_many :shop_rivers, dependent: :destroy
  has_many :fly_shops, through: :shop_rivers
  has_many :hatch_reports, dependent: :nullify
  has_many :hot_flies, dependent: :nullify

  scope :for_fly_shop, ->(fly_shop_id) {
    joins(:shop_rivers).where(shop_rivers: { fly_shop_id: fly_shop_id })
  }
  scope :not_for_fly_shop, ->(fly_shop_id) {
    where.not(id: ShopRiver.select(:river_id).where(fly_shop_id: fly_shop_id))
  }

  searchable_by :name

end
