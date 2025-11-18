class FlyShop < HatchlessRecord
  include Imageable
  include Ownable

  belongs_to :owner, class_name: 'User', foreign_key: 'owner_id', optional: true
  has_one :address, as: :addressable, dependent: :destroy
  has_many :fly_patterns, as: :creator, dependent: :nullify
  has_many :hatch_reports, dependent: :nullify
  has_many :hot_flies, dependent: :destroy
  has_many :posts, as: :creator, dependent: :nullify
  has_many :shop_rivers, dependent: :destroy
  has_many :rivers, through: :shop_rivers
  has_many :fly_packs, dependent: :destroy

  scope :for_river, ->(river_id) {
    joins(:shop_rivers).where(shop_rivers: { river_id: river_id })
  }

  acts_as_imageable_one :logo

  accepts_nested_attributes_for :address, allow_destroy: true

  validates :name, presence: true

  searchable_by :name
  owned_by :owner

end
