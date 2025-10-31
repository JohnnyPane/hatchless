class FlyShopSerializer < HatchlessSerializer
  attributes :id, :name, :description, :website_url, :phone_number, :email

  attribute :address, if: proc { |_, params| show_only?(params) } do |fly_shop|
    fly_shop.address.formatted_address if fly_shop.address.present?
  end

  def self.shallow_attributes_list
    [ :id, :name, :description, :website_url ]
  end
end
