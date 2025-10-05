class HatchWindowSerializer < HatchlessSerializer
  attributes :id, :river_id, :insect_id, :start_day_of_year, :end_day_of_year, :created_at, :updated_at

  attribute :is_active do |hatch_window|
    hatch_window.hatching?
  end

  attribute :insect do |hatch_window, params|
    InsectSerializer.serialize_object(hatch_window.insect, params: params)
  end
end
