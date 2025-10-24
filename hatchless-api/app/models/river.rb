class River < HatchlessRecord
  enum :water_type, { tailwater: 0, freestone: 1, spring_creek: 2 }

  validates :name, presence: true

  has_many :hatch_windows, dependent: :destroy
  has_many :insects, through: :hatch_windows
  has_many :shop_rivers, dependent: :destroy
  has_many :fly_shops, through: :shop_rivers
  has_many :hatch_reports, dependent: :nullify
  has_many :hot_flies, dependent: :nullify

  scope :by_fly_shop, ->(fly_shop_id) {
    joins(:shop_rivers).where(shop_rivers: { fly_shop_id: fly_shop_id })
  }
  scope :not_by_fly_shop, ->(fly_shop_id) {
    where.not(id: ShopRiver.select(:river_id).where(fly_shop_id: fly_shop_id))
  }

  searchable_by :name

  def currently_hatching_insects
    insects.joins(:hatch_windows)
           .where('hatch_windows.start_day_of_year <= ? AND hatch_windows.end_day_of_year >= ?', current_day_of_year, current_day_of_year)
           .select(:id, :common_name, :scientific_name, :description, :life_stage, :min_size, :max_size)
           .distinct
  end
end
