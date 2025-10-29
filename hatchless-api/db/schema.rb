# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.0].define(version: 2025_10_29_104010) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "pg_catalog.plpgsql"

  create_table "addresses", force: :cascade do |t|
    t.string "addressable_type", null: false
    t.bigint "addressable_id", null: false
    t.string "address_1", null: false
    t.string "address_2"
    t.string "city", null: false
    t.string "state", null: false
    t.string "zip_code", null: false
    t.string "country", default: "USA", null: false
    t.decimal "latitude", precision: 10, scale: 6
    t.decimal "longitude", precision: 10, scale: 6
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["addressable_type", "addressable_id"], name: "index_addresses_on_addressable"
  end

  create_table "fly_patterns", force: :cascade do |t|
    t.string "name", null: false
    t.text "notes"
    t.string "category"
    t.string "image_url"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "fly_shops", force: :cascade do |t|
    t.string "name", null: false
    t.text "description"
    t.string "website_url"
    t.string "phone_number"
    t.string "email"
    t.bigint "owner_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name"], name: "index_fly_shops_on_name", unique: true
    t.index ["owner_id"], name: "index_fly_shops_on_owner_id"
  end

  create_table "hatch_report_insects", force: :cascade do |t|
    t.bigint "hatch_report_id", null: false
    t.bigint "insect_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["hatch_report_id"], name: "index_hatch_report_insects_on_hatch_report_id"
    t.index ["insect_id"], name: "index_hatch_report_insects_on_insect_id"
  end

  create_table "hatch_reports", force: :cascade do |t|
    t.bigint "river_id"
    t.bigint "user_id", null: false
    t.bigint "fly_shop_id"
    t.text "notes"
    t.date "observed_on", null: false
    t.boolean "verified", default: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["fly_shop_id"], name: "index_hatch_reports_on_fly_shop_id"
    t.index ["river_id"], name: "index_hatch_reports_on_river_id"
    t.index ["user_id"], name: "index_hatch_reports_on_user_id"
  end

  create_table "hatch_windows", force: :cascade do |t|
    t.bigint "insect_id", null: false
    t.bigint "river_id", null: false
    t.integer "start_day_of_year", null: false
    t.integer "end_day_of_year", null: false
    t.text "notes"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["insect_id"], name: "index_hatch_windows_on_insect_id"
    t.index ["river_id"], name: "index_hatch_windows_on_river_id"
  end

  create_table "hot_flies", force: :cascade do |t|
    t.bigint "fly_shop_id", null: false
    t.bigint "fly_pattern_id", null: false
    t.bigint "river_id"
    t.boolean "active", default: true, null: false
    t.datetime "expires_at"
    t.text "notes"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "min_size"
    t.integer "max_size"
    t.index ["fly_pattern_id"], name: "index_hot_flies_on_fly_pattern_id"
    t.index ["fly_shop_id"], name: "index_hot_flies_on_fly_shop_id"
    t.index ["river_id"], name: "index_hot_flies_on_river_id"
  end

  create_table "insect_fly_patterns", force: :cascade do |t|
    t.bigint "insect_id", null: false
    t.bigint "fly_pattern_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["fly_pattern_id"], name: "index_insect_fly_patterns_on_fly_pattern_id"
    t.index ["insect_id"], name: "index_insect_fly_patterns_on_insect_id"
  end

  create_table "insects", force: :cascade do |t|
    t.string "common_name"
    t.string "scientific_name"
    t.text "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "life_stage"
    t.json "colors", default: []
    t.integer "min_size"
    t.integer "max_size"
    t.index ["common_name"], name: "index_insects_on_common_name"
  end

  create_table "jwt_denylists", force: :cascade do |t|
    t.string "jti"
    t.datetime "exp"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["jti"], name: "index_jwt_denylists_on_jti"
  end

  create_table "rivers", force: :cascade do |t|
    t.string "name"
    t.string "description"
    t.integer "water_type"
    t.string "designation"
    t.string "designation_system"
    t.float "latitude"
    t.float "longitude"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "shop_rivers", force: :cascade do |t|
    t.bigint "fly_shop_id", null: false
    t.bigint "river_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["fly_shop_id"], name: "index_shop_rivers_on_fly_shop_id"
    t.index ["river_id"], name: "index_shop_rivers_on_river_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.string "first_name"
    t.string "last_name"
    t.integer "role", default: 0
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "fly_shops", "users", column: "owner_id"
  add_foreign_key "hatch_report_insects", "hatch_reports"
  add_foreign_key "hatch_report_insects", "insects"
  add_foreign_key "hatch_reports", "fly_shops"
  add_foreign_key "hatch_reports", "rivers"
  add_foreign_key "hatch_reports", "users"
  add_foreign_key "hatch_windows", "insects"
  add_foreign_key "hatch_windows", "rivers"
  add_foreign_key "hot_flies", "fly_patterns"
  add_foreign_key "hot_flies", "fly_shops"
  add_foreign_key "hot_flies", "rivers"
  add_foreign_key "insect_fly_patterns", "fly_patterns"
  add_foreign_key "insect_fly_patterns", "insects"
  add_foreign_key "shop_rivers", "fly_shops"
  add_foreign_key "shop_rivers", "rivers"
end
