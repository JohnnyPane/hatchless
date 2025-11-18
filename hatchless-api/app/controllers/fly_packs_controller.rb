class FlyPacksController < HatchlessController

  private

  def included_index_resources
    [ { fly_pack_items: { fly_pattern: { photo_attachment: :blob } } }, :fish, :fly_shop ]
  end

  def fly_pack_params
    params.require(:fly_pack).permit(
      :name,
      :description,
      :price_cents,
      :available_from,
      :available_to,
      :active,
      fly_pack_items_attributes: [
        :id,
        :fly_pattern_id,
        :quantity,
        :_destroy
      ],
      fish_ids: []
    )
  end
end