class EventsController < HatchlessController
  private

  def included_show_resources
    [ fly_shop: [ logo_attachment: [ blob: :variant_records ] ], banner_image_attachment: [ blob: :variant_records ] ]
  end

  def included_index_resources
    [ fly_shop: [ logo_attachment: [ blob: :variant_records ] ], banner_image_attachment: [ blob: :variant_records ] ]
  end

  def event_params
    params.require(:event).permit(
      :name,
      :description,
      :start_time,
      :end_time,
      :location,
      :price_cents,
      :capacity,
      :banner_image
    )
  end
end
