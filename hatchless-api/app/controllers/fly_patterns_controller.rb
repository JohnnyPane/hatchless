class FlyPatternsController < HatchlessController
  before_action :authenticate_user!, only: [ :create, :update, :destroy, :upload_images ]

  protected

  def included_index_resources
    [ :insects ]
  end

  private

  def fly_pattern_params
    permitted_params = params.require(:fly_pattern).permit(:name, :notes, :category, :public, :approved)

    creator = if current_user.fly_shop.present?
                current_user.fly_shop
              else
                current_user
              end

    permitted_params.merge(creator: creator)
  end
end
