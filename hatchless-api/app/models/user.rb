class User < HatchlessRecord
  devise :database_authenticatable, :registerable,
         :recoverable, :jwt_authenticatable, jwt_revocation_strategy: JwtDenylist

  has_many :hatch_reports, dependent: :nullify
  has_one :fly_shop, foreign_key: 'owner_id', dependent: :nullify

  validates :email, presence: true, uniqueness: true
  validates :password, presence: true, length: { minimum: 6 }

  enum :role, { user: 0, shop_owner: 1, admin: 2 }

  def name
    first_name + " " + last_name
  end
end
