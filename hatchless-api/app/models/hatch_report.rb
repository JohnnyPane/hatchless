class HatchReport < HatchlessRecord
  belongs_to :fly_shop, optional: true
  belongs_to :river, optional: true
  belongs_to :user, optional: true
  has_many :hatch_report_insects, dependent: :destroy
  has_many :insects, through: :hatch_report_insects
  has_many :fly_patterns, through: :insects

  validates :notes, presence: true
  before_create :set_observed_on

  scope :for_fly_shop, ->(fly_shop_id) { where(fly_shop_id: fly_shop_id) }
  scope :for_user, ->(user_id) { where(user_id: user_id) }
  scope :for_river, ->(river_id) {
    base = left_joins(fly_shop: :shop_rivers)

    direct = base.where("hatch_reports.river_id = :river_id", river_id: river_id)
    via_shop = base.where("hatch_reports.river_id IS NULL").where("shop_rivers.river_id = :river_id", river_id: river_id)
    direct.or(via_shop).distinct
  }

  private

  def set_observed_on
    self.observed_on ||= Date.today
  end
end
