class UserSerializer < HatchlessSerializer
  attributes :id, :email, :first_name, :last_name, :fly_shop

  def self.shallow_attributes_list
    [:id, :email, :first_name, :last_name]
  end
end
