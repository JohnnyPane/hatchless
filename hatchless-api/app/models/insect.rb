class Insect < HatchlessRecord
  has_many :hatch_windows, dependent: :destroy
  has_many :rivers, through: :hatch_windows
end
