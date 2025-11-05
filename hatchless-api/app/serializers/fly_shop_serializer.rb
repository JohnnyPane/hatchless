class FlyShopSerializer < HatchlessSerializer
  attributes :id, :name, :description, :website_url, :phone_number, :email

  attribute :formatted_address, if: proc { |_, params| show_only?(params) } do |fly_shop|
    fly_shop.address.formatted_address if fly_shop.address.present?
  end

  attribute :address, if: proc { |_, params| show_only?(params) } do |fly_shop|
    AddressSerializer.shallow_serialize(fly_shop.address) if fly_shop.address.present?
  end

  attribute :logo_url do |fly_shop, params|
    image_type = params && params[:image_type] ? params[:image_type] : :default

    if fly_shop.logo.attached?
      fly_shop.image_urls(image_type).first[:image_url]
    else
      nil
    end
  end

  def self.shallow_attributes_list
    [ :id, :name, :description, :website_url ]
  end
end
