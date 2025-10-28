class UserSerializer < HatchlessSerializer
  attributes :id, :email, :first_name, :last_name, :fly_shop

  attribute :name do |user|
    user.name
  end

  def self.shallow_attributes_list
    [:id, :email, :first_name, :last_name]
  end
end
