class FlyPackItem < HatchlessRecord
  belongs_to :fly_pack
  belongs_to :fly_pattern

  validates :quantity, numericality: { greater_than: 0 }
end
