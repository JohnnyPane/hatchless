class PostSerializer < HatchlessSerializer
  attributes :id, :caption, :creator_type, :created_at, :updated_at

  attribute :image_urls do |post, params|
    post.image_urls(params[:image_size]) if post.images.attached?
  end

  attribute :creator do |post|
    case post.creator_type
    when "User"
      UserSerializer.shallow_serialize(post.creator)
    when "FlyShop"
      FlyShopSerializer.shallow_serialize(post.creator)
    else
      nil
    end
  end

  attribute :river do |post|
    if post.river
      RiverSerializer.shallow_serialize(post.river)
    else
      nil
    end
  end
end

