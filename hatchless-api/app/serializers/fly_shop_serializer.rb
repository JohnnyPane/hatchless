class FlyShopSerializer < HatchlessSerializer
  attributes :id, :name, :description, :website_url, :phone_number, :email

  def self.shallow_attributes_list
    [ :id, :name, :description, :website_url ]
  end
end
