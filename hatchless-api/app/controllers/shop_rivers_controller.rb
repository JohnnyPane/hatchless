class ShopRiversController < HatchlessController

  protected

  def included_show_resources
    [ :fly_shop, :river ]
  end

  def included_index_resources
    [ :fly_shop, :river ]
  end

  private

  def shop_river_params
    params.require(:shop_river).permit(:fly_shop_id, :river_id)
  end
end
