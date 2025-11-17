class FlyPack < HatchlessRecord
  belongs_to :fly_shop
  has_many :fly_pack_items, dependent: :destroy
  has_many :fly_patterns, through: :fly_pack_items
  has_many :fly_packs_fishes, dependent: :destroy
  has_many :fish, through: :fly_packs_fishes
  has_many :rivers, through: :fly_shop

  validates :name, presence: true, uniqueness: true
  validates :price_cents, numericality: { greater_than_or_equal_to: 0 }

  accepts_nested_attributes_for :fly_pack_items, allow_destroy: true

  scope :for_fly_shop, ->(fly_shop_id) { where(fly_shop_id: fly_shop_id) }
  scope :for_river, ->(river_id) {
    joins(fly_shop: :rivers).where(rivers: { id: river_id })
  }
end
