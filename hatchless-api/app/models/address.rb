class Address < HatchlessRecord
  belongs_to :addressable, polymorphic: true

  validates :address_1, :city, :state, :zip_code, presence: true

  def full_address
    [ address_1, address_2, city, state, zip_code, country ].compact.join(", ")
  end
end
