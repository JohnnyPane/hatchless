class UserSerializer < HatchlessSerializer
  attributes :id, :email, :first_name, :last_name, :fly_shop

  attribute :name do |user|
    user.name
  end

  attribute :avatar_url do |user|
    user.image_urls(:thumbnail).first[:image_url] if user.avatar.attached?
  end

  def self.shallow_attributes_list
    [ :id, :email, :first_name, :last_name ]
  end

  def self.shallow_associations(user)
    {
      name: user.name
    }
  end
end
