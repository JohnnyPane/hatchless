class FlyShop < HatchlessRecord
  belongs_to :owner, class_name: 'User', foreign_key: 'owner_id', optional: true
  has_many :shop_rivers, dependent: :destroy
  has_many :rivers, through: :shop_rivers
  has_many :hatch_reports, dependent: :nullify
  has_many :hot_flies, dependent: :destroy
  has_one :address, as: :addressable, dependent: :destroy

  accepts_nested_attributes_for :address, allow_destroy: true

  validates :name, presence: true
end
