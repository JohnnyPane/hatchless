class Fish < HatchlessRecord
  has_many :fly_packs_fish, dependent: :destroy
  has_many :fly_packs, through: :fly_packs_fish

  enum :water_type, { freshwater: 0, saltwater: 1, coldwater: 2, warmwater: 3 }

  searchable_by :common_name, :scientific_name
end
