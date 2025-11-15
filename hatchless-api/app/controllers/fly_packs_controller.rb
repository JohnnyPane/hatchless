class FlyPacksController < HatchlessController

  private

  def included_index_resources
    [ { fly_pack_items: { fly_pattern: { photo_attachment: :blob } } }, :fish ]
  end

  def fly_pack_params
    permitted_params = params.require(:fly_pack).permit(
      :name,
      :description,
      :price_cents,
      :available_from,
      :available_to,
      fly_pack_items_attributes: [
        :id,
        :fly_pattern_id,
        :quantity,
        :_destroy
      ],
      fish_ids: []
    )

    fly_shop = current_user.fly_shop

    permitted_params.merge(fly_shop_id: fly_shop.id)
  end
end