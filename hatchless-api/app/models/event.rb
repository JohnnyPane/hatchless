class Event < HatchlessRecord
  include Imageable
  include Ownable

  belongs_to :fly_shop

  enum :status, { published: 0, cancelled: 1, completed: 2 }

  scope :for_fly_shop, ->(fly_shop_id) { where(fly_shop_id: fly_shop_id) }

  acts_as_imageable_one :banner_image

  owned_by :fly_shop

  def imageable_fallback_url
    fly_shop.image_urls(:thumbnail).first[:image_url]
  end
end
