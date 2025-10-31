class FlyShopsController < HatchlessController
  before_action :authenticate_user!, only: [ :create ]

  protected

  def included_show_resources
    [ :address, :rivers, :hatch_reports ]
  end

  def included_index_resources
    [ :user, :rivers, :hatch_reports ]
  end

  private

  def fly_shop_params
    params.require(:fly_shop).permit(
      :name,
      :description,
      :website_url,
      :phone_number,
      :email,
      address_attributes: [
        :address_1,
        :address_2,
        :city,
        :state,
        :zip_code,
        :country
      ]
    )
  end
end