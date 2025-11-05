class Post < HatchlessRecord
  include Imageable

  belongs_to :creator, polymorphic: true
  belongs_to :river, optional: true

  acts_as_imageable_many :images

  scope :for_river, ->(river_id) { where(river_id: river_id) }
  scope :for_fly_shop, ->(fly_shop_id) {
    where(creator_type: "FlyShop", creator_id: fly_shop_id)
  }
  scope :for_user, ->(user_id) {
    direct = where(creator_type: "User", creator_id: user_id)
    indirect = where(creator_type: "FlyShop", creator_id: FlyShop.where(owner_id: user_id))
    direct.or(indirect)
  }

end
