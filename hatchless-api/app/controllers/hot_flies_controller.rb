class HotFliesController < HatchlessController

  protected

  def included_index_resources
    [ :fly_pattern, :river, :fly_shop ]
  end

  private

  def hot_fly_params
    params.require(:hot_fly).permit(:fly_pattern_id, :river_id, :fly_shop_id, :active, :expires_at, :notes, :min_size, :max_size)
  end
end
