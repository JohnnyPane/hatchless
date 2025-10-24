class HatchReport < HatchlessRecord
  belongs_to :fly_shop, optional: true
  belongs_to :river, optional: true
  belongs_to :user, optional: true
  has_many :hatch_report_insects, dependent: :destroy
  has_many :insects, through: :hatch_report_insects
  has_many :fly_patterns, through: :insects

  validates :notes, presence: true
  before_create :set_observed_on

  scope :by_fly_shop, ->(fly_shop_id) { where(fly_shop_id: fly_shop_id) }
  scope :for_river, ->(river_id) {
    joins("LEFT JOIN fly_shops ON fly_shops.id = hatch_reports.fly_shop_id")
      .joins("LEFT JOIN shop_rivers ON shop_rivers.fly_shop_id = fly_shops.id")
      .where(
        "hatch_reports.river_id = :river_id OR (hatch_reports.river_id IS NULL AND shop_rivers.river_id = :river_id)",
        river_id: river_id
      )
  }

  private

  def set_observed_on
    self.observed_on ||= Date.today
  end
end
