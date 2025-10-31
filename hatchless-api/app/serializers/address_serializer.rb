class AddressSerializer < HatchlessSerializer
  attributes :address_1, :address_2, :city, :state, :zip_code, :country, :latitude, :longitude

  def self.shallow_attributes_list
    [ :address_1, :address_2, :city, :state, :zip_code, :country, :zip_code ]
  end
end
